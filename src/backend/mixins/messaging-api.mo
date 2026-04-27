import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

import Common "../types/common";
import Types "../types/messaging";
import MatrimonyTypes "../types/matrimony-core";
import MatrimonyLib "../lib/matrimony-core";
import Lib "../lib/messaging";

// Mixin exposing the public messaging API.
// State slices are injected: messages, conversations, members, smsConfig, otpLog, state.
mixin (
  messages : List.List<Types.MessageInternal>,
  conversations : List.List<Types.ConversationInternal>,
  members : List.List<MatrimonyTypes.MemberInternal>,
  smsConfig : { var config : ?Types.SmsConfig },
  otpLog : List.List<Types.SmsOtpLogEntry>,
  state : Common.AppState,
) {

  // ── Authorization helper ─────────────────────────────────────────────

  func requireMsgAdmin(caller : Principal) {
    if (not Principal.equal(caller, state.adminPrincipal)) {
      Runtime.trap("Unauthorized: admin only");
    };
  };

  func callerMemberId(caller : Principal) : ?Common.MemberId {
    switch (members.find(func(m) { Principal.equal(m.owner, caller) })) {
      case (?m) ?m.id;
      case null null;
    };
  };

  func isMemberPremium(memberId : Common.MemberId) : Bool {
    switch (members.find(func(m) { m.id == memberId })) {
      case (?m) m.membership == #Premium;
      case null false;
    };
  };

  // ── Messaging API ────────────────────────────────────────────────────

  /// Send a message to another member (caller must have an active profile).
  /// Free-tier senders are limited to 10 messages per 24-hour rolling window.
  public shared ({ caller }) func sendMessage(
    receiverMemberId : Common.MemberId,
    content : Text,
  ) : async { #ok : Common.MessageId; #err : Text } {
    if (caller.isAnonymous()) return #err("Anonymous caller not allowed");
    if (content == "") return #err("Message cannot be empty");

    let senderId = switch (callerMemberId(caller)) {
      case (?id) id;
      case null return #err("Sender profile not found");
    };
    if (senderId == receiverMemberId) return #err("Cannot message yourself");

    // Receiver must exist and be active
    switch (members.find(func(m) { m.id == receiverMemberId and m.isActive })) {
      case null return #err("Receiver not found");
      case (?_) {};
    };

    let now = Time.now();

    // Enforce free-tier 24h rolling window quota
    if (not isMemberPremium(senderId)) {
      let conv = Lib.getOrCreateConversation(conversations, senderId, receiverMemberId, now);
      switch (Lib.checkFreeTierQuota(conv, now)) {
        case (#exceeded({ resetAt })) {
          return #err("QuotaExceeded:" # resetAt.toText());
        };
        case (#allowed) {};
      };
    };

    let msgId = state.nextMessageId;
    state.nextMessageId += 1;
    ignore Lib.createMessage(messages, msgId, senderId, receiverMemberId, content, now);

    let conv = Lib.getOrCreateConversation(conversations, senderId, receiverMemberId, now);
    conv.messageCount += 1;
    conv.lastMessageAt := now;

    // Track rolling window for free-tier senders
    if (not isMemberPremium(senderId)) {
      Lib.recordFreeTierMessage(conv, now);
    };

    #ok(msgId);
  };

  /// Get paginated messages in a conversation with another member.
  public query ({ caller }) func getConversation(
    otherMemberId : Common.MemberId,
    offset : Nat,
    limit : Nat,
  ) : async [Types.Message] {
    let myId = switch (callerMemberId(caller)) {
      case (?id) id;
      case null return [];
    };
    Lib.getConversationMessages(messages, myId, otherMemberId, offset, limit);
  };

  /// Mark all messages from a specific sender as read.
  public shared ({ caller }) func markAsRead(
    fromMemberId : Common.MemberId,
  ) : async { #ok; #err : Text } {
    let myId = switch (callerMemberId(caller)) {
      case (?id) id;
      case null return #err("Profile not found");
    };
    Lib.markAllRead(messages, myId, fromMemberId);
    #ok;
  };

  /// Get the number of messages sent by the caller in the last 24 hours.
  public query ({ caller }) func getDailyMessageCount() : async Nat {
    let myId = switch (callerMemberId(caller)) {
      case (?id) id;
      case null return 0;
    };
    Lib.countTodayMessages(messages, myId, Time.now());
  };

  /// Get the caller's conversation summaries (inbox list).
  public query ({ caller }) func getMyConversations() : async [Types.ConversationSummary] {
    let myId = switch (callerMemberId(caller)) {
      case (?id) id;
      case null return [];
    };
    Lib.buildConversationSummaries(conversations, messages, members, myId);
  };

  // ── Photo API ────────────────────────────────────────────────────────

  /// Returns a placeholder upload token for the object-storage extension.
  public shared ({ caller }) func getProfilePhotoUploadUrl() : async { #ok : Text; #err : Text } {
    if (caller.isAnonymous()) return #err("Anonymous caller not allowed");
    switch (members.find(func(m) { Principal.equal(m.owner, caller) })) {
      case null #err("Profile not found");
      case (?m) {
        let token = "profile-photo-" # m.id.toText();
        m.photoAssetId := ?token;
        m.photoModerationStatus := #Pending;
        #ok(token);
      };
    };
  };

  // ── Photo Moderation API ─────────────────────────────────────────────

  /// Admin: list all members that have uploaded a profile photo, for moderation.
  public query ({ caller }) func adminListAllPhotos() : async [MatrimonyTypes.PhotoModerationInfo] {
    requireMsgAdmin(caller);
    let result = List.empty<MatrimonyTypes.PhotoModerationInfo>();
    members.forEach(func(m) {
      switch (m.photoAssetId) {
        case (?assetId) {
          result.add(MatrimonyLib.toPhotoModerationInfo(m, assetId));
        };
        case null {};
      };
    });
    result.toArray();
  };

  /// Admin: approve a member's profile photo.
  public shared ({ caller }) func adminApproveProfilePhoto(memberId : Common.MemberId) : async { #ok; #err : Text } {
    requireMsgAdmin(caller);
    switch (members.find(func(m) { m.id == memberId })) {
      case null #err("Member not found");
      case (?m) {
        m.photoModerationStatus := #Approved;
        m.updatedAt := Time.now();
        #ok;
      };
    };
  };

  /// Admin: reject a member's profile photo (clears the asset id and resets moderation status).
  public shared ({ caller }) func adminRejectProfilePhoto(memberId : Common.MemberId) : async { #ok; #err : Text } {
    requireMsgAdmin(caller);
    switch (members.find(func(m) { m.id == memberId })) {
      case null #err("Member not found");
      case (?m) {
        m.photoModerationStatus := #Rejected;
        m.photoAssetId := null;
        m.updatedAt := Time.now();
        #ok;
      };
    };
  };

  // ── SMS Config API ───────────────────────────────────────────────────

  /// Admin: set or update the SMS gateway configuration.
  public shared ({ caller }) func adminSetSmsConfig(
    config : Types.SmsConfig,
  ) : async { #ok; #err : Text } {
    requireMsgAdmin(caller);
    if (config.apiKey == "") return #err("apiKey cannot be empty");
    smsConfig.config := ?config;
    #ok;
  };

  /// Admin: get the current SMS gateway configuration (apiKey masked to last 4 chars).
  public query ({ caller }) func adminGetSmsConfig() : async ?Types.SmsConfig {
    requireMsgAdmin(caller);
    switch (smsConfig.config) {
      case null null;
      case (?cfg) {
        let key = cfg.apiKey;
        let keyLen = key.size();
        let maskedKey = if (keyLen <= 4) "****"
          else {
            let cutoff : Nat = (keyLen.toInt() - 4).toNat();
            var suffix = "";
            var i = 0;
            for (ch in key.toIter()) {
              if (i >= cutoff) {
                suffix #= Text.fromChar(ch);
              };
              i += 1;
            };
            "****" # suffix;
          };
        ?{ cfg with apiKey = maskedKey };
      };
    };
  };

  /// Admin: send a test SMS to verify the gateway configuration.
  public shared ({ caller }) func adminTestSms(
    mobile : Text,
  ) : async { #ok : Text; #err : Text } {
    requireMsgAdmin(caller);
    if (mobile.size() < 10) return #err("Invalid mobile number");
    let now = Time.now();
    await Lib.dispatchSmsWithLog(smsConfig.config, mobile, "123456", otpLog, now);
  };

  /// Admin: get the SMS OTP send log (most recent entries last).
  public query ({ caller }) func adminGetSmsOtpLogs() : async [Types.SmsOtpLogEntry] {
    requireMsgAdmin(caller);
    otpLog.toArray();
  };

  // ── Admin Messaging Operations ───────────────────────────────────────

  /// Admin: get the full conversation between any two members.
  public query ({ caller }) func adminGetConversation(
    memberId1 : Common.MemberId,
    memberId2 : Common.MemberId,
    offset : Nat,
    limit : Nat,
  ) : async [Types.Message] {
    requireMsgAdmin(caller);
    Lib.getConversationMessages(messages, memberId1, memberId2, offset, limit);
  };

  /// Admin: soft-delete a specific message.
  public shared ({ caller }) func adminDeleteMessage(
    messageId : Common.MessageId,
  ) : async { #ok; #err : Text } {
    requireMsgAdmin(caller);
    switch (messages.find(func(m) { m.id == messageId })) {
      case null #err("Message not found");
      case (?m) {
        m.isDeleted := true;
        #ok;
      };
    };
  };

  /// Admin: mute or un-mute a conversation between two members.
  public shared ({ caller }) func adminMuteConversation(
    memberId1 : Common.MemberId,
    memberId2 : Common.MemberId,
    muted : Bool,
  ) : async { #ok; #err : Text } {
    requireMsgAdmin(caller);
    switch (Lib.findConversation(conversations, memberId1, memberId2)) {
      case null #err("Conversation not found");
      case (?c) {
        c.isMuted := muted;
        #ok;
      };
    };
  };
};
