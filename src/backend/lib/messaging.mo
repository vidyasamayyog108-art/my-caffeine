import List "mo:core/List";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Types "../types/messaging";
import MatrimonyTypes "../types/matrimony-core";

module {

  // 24 hours in nanoseconds
  let DAY_NS : Int = 86_400_000_000_000;
  // 1 hour in nanoseconds (for OTP rate limiting)
  let HOUR_NS : Int = 3_600_000_000_000;
  // Free tier daily message limit
  let FREE_TIER_LIMIT : Nat = 10;

  // ── IC Management Canister actor (for HTTP outcalls) ─────────────────────

  type HttpHeader = { name : Text; value : Text };

  let IC = actor "aaaaa-aa" : actor {
    http_request : {
      url : Text;
      max_response_bytes : ?Nat64;
      method : { #get; #head; #post };
      headers : [HttpHeader];
      body : ?Blob;
      transform : ?{
        function : shared query ({
          response : { status : Nat; headers : [HttpHeader]; body : Blob };
          context : Blob;
        }) -> async { status : Nat; headers : [HttpHeader]; body : Blob };
        context : Blob;
      };
      is_replicated : ?Bool;
    } -> async { status : Nat; headers : [HttpHeader]; body : Blob };
  };

  // ── OTP Pad helper ───────────────────────────────────────────────────────

  public func padOtp(n : Nat) : Text {
    let s = n.toText();
    let len = s.size();
    if (len >= 6) s
    else {
      let padCount : Nat = (6 : Int - len.toInt()).toNat();
      var prefix = "";
      var i = 0;
      while (i < padCount) { prefix #= "0"; i += 1 };
      prefix # s;
    };
  };

  public func buildOtpMessage(otp : Text) : Text {
    "Your Vivah Setu OTP is " # otp # ". Valid for 5 minutes. Do not share.";
  };

  // ── Internal raw SMS send (single attempt, no retry) ─────────────────────
  // Used for non-OTP notifications (payment confirmation, rejection SMS).

  func sendRawViaFast2SmsOnce(apiKey : Text, mobile : Text, message : Text) : async { #ok : Text; #err : Text } {
    let bodyText =
      "{\"route\":\"q\",\"message\":\"" # message #
      "\",\"language\":\"english\",\"flash\":0,\"numbers\":\"" # mobile # "\"}";
    let bodyBlob = bodyText.encodeUtf8();
    try {
      let resp = await IC.http_request({
        url = "https://www.fast2sms.com/dev/bulkV2";
        max_response_bytes = ?2000;
        method = #post;
        headers = [
          { name = "authorization"; value = apiKey },
          { name = "Content-Type"; value = "application/json" },
        ];
        body = ?bodyBlob;
        transform = null;
        is_replicated = ?false;
      });
      if (resp.status >= 200 and resp.status < 300) {
        #ok("SMS sent via Fast2SMS");
      } else {
        let detail = switch (resp.body.decodeUtf8()) { case (?t) t; case null "?" };
        #err("Fast2SMS HTTP " # resp.status.toText() # ": " # detail);
      };
    } catch (_e) {
      #err("Fast2SMS request failed");
    };
  };

  func sendRawViaMSG91Once(apiKey : Text, templateId : Text, mobile : Text, message : Text) : async { #ok : Text; #err : Text } {
    let bodyText =
      "{\"template_id\":\"" # templateId #
      "\",\"mobile\":\"91" # mobile #
      "\",\"message\":\"" # message # "\"}";
    let bodyBlob = bodyText.encodeUtf8();
    try {
      let resp = await IC.http_request({
        url = "https://api.msg91.com/api/v5/otp";
        max_response_bytes = ?2000;
        method = #post;
        headers = [
          { name = "authkey"; value = apiKey },
          { name = "Content-Type"; value = "application/json" },
        ];
        body = ?bodyBlob;
        transform = null;
        is_replicated = ?false;
      });
      if (resp.status >= 200 and resp.status < 300) {
        #ok("SMS sent via MSG91");
      } else {
        let detail = switch (resp.body.decodeUtf8()) { case (?t) t; case null "?" };
        #err("MSG91 HTTP " # resp.status.toText() # ": " # detail);
      };
    } catch (_e) {
      #err("MSG91 request failed");
    };
  };

  /// Dispatch a raw text SMS (for notifications, not OTP). No OTP wrapper.
  public func dispatchRawSms(
    config : ?Types.SmsConfig,
    mobile : Text,
    message : Text,
  ) : async { #ok : Text; #err : Text } {
    switch (config) {
      case null { #ok("SMS (simulated): " # message) };
      case (?cfg) {
        if (not cfg.enabled or cfg.apiKey == "") {
          return #ok("SMS (simulated): " # message);
        };
        switch (cfg.provider) {
          case (#Fast2SMS) {
            var attempt = 0;
            var lastErr = "";
            label retryLoop while (attempt < 3) {
              let result = await sendRawViaFast2SmsOnce(cfg.apiKey, mobile, message);
              switch (result) {
                case (#ok(msg)) return #ok(msg);
                case (#err(e)) {
                  lastErr := e;
                  attempt += 1;
                };
              };
            };
            #err("Fast2SMS failed after 3 attempts: " # lastErr);
          };
          case (#MSG91) {
            switch (cfg.templateId) {
              case (?tid) {
                var attempt = 0;
                var lastErr = "";
                label retryLoop while (attempt < 3) {
                  let result = await sendRawViaMSG91Once(cfg.apiKey, tid, mobile, message);
                  switch (result) {
                    case (#ok(msg)) return #ok(msg);
                    case (#err(e)) {
                      lastErr := e;
                      attempt += 1;
                    };
                  };
                };
                #err("MSG91 failed after 3 attempts: " # lastErr);
              };
              case null { #err("MSG91 requires a templateId") };
            };
          };
          case (#Custom) { #err("Custom SMS provider not supported") };
        };
      };
    };
  };

  // ── Internal SMS send (single attempt, no retry) ─────────────────────────

  func sendViaFast2SmsOnce(apiKey : Text, mobile : Text, otp : Text) : async { #ok : Text; #err : Text } {
    // Fast2SMS OTP route via GET: https://www.fast2sms.com/dev/bulkV2?authorization=KEY&variables_values=OTP&route=otp&numbers=MOBILE
    let url =
      "https://www.fast2sms.com/dev/bulkV2?authorization=" # apiKey #
      "&variables_values=" # otp #
      "&route=otp&numbers=" # mobile;
    try {
      let resp = await IC.http_request({
        url;
        max_response_bytes = ?2000;
        method = #get;
        headers = [
          { name = "Cache-Control"; value = "no-cache" },
        ];
        body = null;
        transform = null;
        is_replicated = ?false;
      });
      if (resp.status >= 200 and resp.status < 300) {
        #ok("OTP SMS sent via Fast2SMS");
      } else {
        let detail = switch (resp.body.decodeUtf8()) { case (?t) t; case null "?" };
        #err("Fast2SMS HTTP " # resp.status.toText() # ": " # detail);
      };
    } catch (_e) {
      #err("Fast2SMS request failed");
    };
  };

  func sendViaMSG91Once(apiKey : Text, templateId : Text, mobile : Text, otp : Text) : async { #ok : Text; #err : Text } {
    let bodyText =
      "{\"template_id\":\"" # templateId #
      "\",\"mobile\":\"91" # mobile #
      "\",\"otp\":\"" # otp # "\"}";
    let bodyBlob = bodyText.encodeUtf8();
    try {
      let resp = await IC.http_request({
        url = "https://api.msg91.com/api/v5/otp";
        max_response_bytes = ?2000;
        method = #post;
        headers = [
          { name = "authkey"; value = apiKey },
          { name = "Content-Type"; value = "application/json" },
        ];
        body = ?bodyBlob;
        transform = null;
        is_replicated = ?false;
      });
      if (resp.status >= 200 and resp.status < 300) {
        #ok("SMS sent via MSG91");
      } else {
        let detail = switch (resp.body.decodeUtf8()) { case (?t) t; case null "?" };
        #err("MSG91 HTTP " # resp.status.toText() # ": " # detail);
      };
    } catch (_e) {
      #err("MSG91 request failed");
    };
  };

  // ── SMS dispatch with retry (up to 3 total attempts) ─────────────────────

  public func sendViaFast2Sms(apiKey : Text, mobile : Text, otp : Text) : async { #ok : Text; #err : Text } {
    var attempt = 0;
    var lastErr = "";
    label retryLoop while (attempt < 3) {
      let result = await sendViaFast2SmsOnce(apiKey, mobile, otp);
      switch (result) {
        case (#ok(msg)) return #ok(msg);
        case (#err(e)) {
          lastErr := e;
          attempt += 1;
        };
      };
    };
    #err("Fast2SMS failed after 3 attempts: " # lastErr);
  };

  public func sendViaMSG91(apiKey : Text, templateId : Text, mobile : Text, otp : Text) : async { #ok : Text; #err : Text } {
    var attempt = 0;
    var lastErr = "";
    label retryLoop while (attempt < 3) {
      let result = await sendViaMSG91Once(apiKey, templateId, mobile, otp);
      switch (result) {
        case (#ok(msg)) return #ok(msg);
        case (#err(e)) {
          lastErr := e;
          attempt += 1;
        };
      };
    };
    #err("MSG91 failed after 3 attempts: " # lastErr);
  };

  /// Dispatch OTP SMS using the stored config. Logs the attempt. Returns simulated result if not configured.
  public func dispatchSms(
    config : ?Types.SmsConfig,
    mobile : Text,
    otp : Text,
  ) : async { #ok : Text; #err : Text } {
    switch (config) {
      case null { #ok("OTP (simulated): " # otp) };
      case (?cfg) {
        if (not cfg.enabled or cfg.apiKey == "") {
          return #ok("OTP (simulated): " # otp);
        };
        switch (cfg.provider) {
          case (#Fast2SMS) { await sendViaFast2Sms(cfg.apiKey, mobile, otp) };
          case (#MSG91) {
            switch (cfg.templateId) {
              case (?tid) { await sendViaMSG91(cfg.apiKey, tid, mobile, otp) };
              case null { #err("MSG91 requires a templateId") };
            };
          };
          case (#Custom) { #err("Custom SMS provider not supported") };
        };
      };
    };
  };

  /// Dispatch SMS and append a log entry.
  public func dispatchSmsWithLog(
    config : ?Types.SmsConfig,
    mobile : Text,
    otp : Text,
    otpLog : List.List<Types.SmsOtpLogEntry>,
    now : Types.Timestamp,
  ) : async { #ok : Text; #err : Text } {
    let providerName = switch (config) {
      case null "simulated";
      case (?cfg) {
        switch (cfg.provider) {
          case (#Fast2SMS) "Fast2SMS";
          case (#MSG91) "MSG91";
          case (#Custom) "Custom";
        };
      };
    };
    let result = await dispatchSms(config, mobile, otp);
    let entry : Types.SmsOtpLogEntry = {
      timestamp = now;
      phone = mobile;
      provider = providerName;
      success = switch (result) { case (#ok _) true; case (#err _) false };
      errorCode = switch (result) { case (#ok _) null; case (#err e) ?e };
    };
    otpLog.add(entry);
    result;
  };

  // ── OTP rate-limit helpers ────────────────────────────────────────────────

  public func checkOtpRateLimit(
    rateLimits : { var data : [(Text, Nat, Int)] },
    mobile : Text,
    now : Int,
  ) : Bool {
    let windowStart = now - HOUR_NS;
    var count = 0;
    for (entry in rateLimits.data.values()) {
      let (m, _cnt, ts) = entry;
      if (m == mobile and ts >= windowStart) {
        count += 1;
      };
    };
    count < 3;
  };

  public func recordOtpRequest(
    rateLimits : { var data : [(Text, Nat, Int)] },
    mobile : Text,
    now : Int,
  ) {
    let windowStart = now - HOUR_NS;
    let pruned = rateLimits.data.filter(func(entry) {
      let (_m, _cnt, ts) = entry;
      ts >= windowStart
    });
    rateLimits.data := pruned.concat([(mobile, 1, now)]);
  };

  // ── Rolling 24h window quota check ───────────────────────────────────────

  public type QuotaCheckResult = {
    #allowed;
    #exceeded : { resetAt : Types.Timestamp };
  };

  /// Check free-tier rolling 24h message quota for a sender in a conversation.
  /// Returns #allowed if the message can be sent, or #exceeded with resetAt timestamp.
  public func checkFreeTierQuota(
    conv : Types.ConversationInternal,
    now : Types.Timestamp,
  ) : QuotaCheckResult {
    switch (conv.freeTierWindowStart) {
      case null {
        // No window started yet — always allowed (first message starts it)
        #allowed;
      };
      case (?windowStart) {
        let windowEnd = windowStart + DAY_NS;
        if (now >= windowEnd) {
          // Window has expired — allowed, caller must reset
          #allowed;
        } else if (conv.freeTierSenderCount >= FREE_TIER_LIMIT) {
          // Still in window and at limit
          #exceeded({ resetAt = windowEnd });
        } else {
          #allowed;
        };
      };
    };
  };

  /// Record a free-tier message send. Resets window if expired.
  public func recordFreeTierMessage(
    conv : Types.ConversationInternal,
    now : Types.Timestamp,
  ) {
    switch (conv.freeTierWindowStart) {
      case null {
        // Start the window on first message
        conv.freeTierWindowStart := ?now;
        conv.freeTierSenderCount := 1;
      };
      case (?windowStart) {
        let windowEnd = windowStart + DAY_NS;
        if (now >= windowEnd) {
          // Reset window
          conv.freeTierWindowStart := ?now;
          conv.freeTierSenderCount := 1;
        } else {
          conv.freeTierSenderCount += 1;
        };
      };
    };
  };

  // ── Message helpers ──────────────────────────────────────────────────────

  public func createMessage(
    messages : List.List<Types.MessageInternal>,
    nextId : Nat,
    senderId : Types.MemberId,
    receiverId : Types.MemberId,
    content : Text,
    now : Types.Timestamp,
  ) : Types.MessageInternal {
    let m : Types.MessageInternal = {
      id = nextId;
      senderId;
      receiverId;
      var content = content;
      createdAt = now;
      var isRead = false;
      var isDeleted = false;
    };
    messages.add(m);
    m;
  };

  public func toPublicMessage(m : Types.MessageInternal) : Types.Message {
    {
      id = m.id;
      senderId = m.senderId;
      receiverId = m.receiverId;
      content = m.content;
      createdAt = m.createdAt;
      isRead = m.isRead;
      isDeleted = m.isDeleted;
    };
  };

  public func getConversationMessages(
    messages : List.List<Types.MessageInternal>,
    memberId1 : Types.MemberId,
    memberId2 : Types.MemberId,
    offset : Nat,
    limit : Nat,
  ) : [Types.Message] {
    let conv = messages.filter(func(m) {
      not m.isDeleted
      and (
        (m.senderId == memberId1 and m.receiverId == memberId2)
        or (m.senderId == memberId2 and m.receiverId == memberId1)
      )
    });
    let total = conv.size();
    if (offset >= total) { return [] };
    let toExcl : Int = Int.min(Int.fromNat(offset + limit), Int.fromNat(total));
    conv.sliceToArray(Int.fromNat(offset), toExcl)
      .map<Types.MessageInternal, Types.Message>(func(m) { toPublicMessage(m) });
  };

  public func countUnread(
    messages : List.List<Types.MessageInternal>,
    forMemberId : Types.MemberId,
    fromMemberId : Types.MemberId,
  ) : Nat {
    messages.foldLeft<Nat, Types.MessageInternal>(0, func(acc, m) {
      if (
        m.receiverId == forMemberId
        and m.senderId == fromMemberId
        and not m.isRead
        and not m.isDeleted
      ) acc + 1 else acc
    });
  };

  public func markAllRead(
    messages : List.List<Types.MessageInternal>,
    forMemberId : Types.MemberId,
    fromMemberId : Types.MemberId,
  ) {
    messages.mapInPlace(func(m) {
      if (
        m.receiverId == forMemberId
        and m.senderId == fromMemberId
        and not m.isRead
      ) {
        m.isRead := true;
      };
      m;
    });
  };

  // Legacy helper kept for backward compatibility — rolling window is now on ConversationInternal
  public func countTodayMessages(
    messages : List.List<Types.MessageInternal>,
    senderId : Types.MemberId,
    now : Types.Timestamp,
  ) : Nat {
    let windowStart : Int = now - DAY_NS;
    messages.foldLeft<Nat, Types.MessageInternal>(0, func(acc, m) {
      if (m.senderId == senderId and m.createdAt >= windowStart) acc + 1 else acc
    });
  };

  // ── Conversation helpers ─────────────────────────────────────────────────

  public func conversationKey(a : Types.MemberId, b : Types.MemberId) : (Types.MemberId, Types.MemberId) {
    if (a <= b) (a, b) else (b, a);
  };

  public func findConversation(
    conversations : List.List<Types.ConversationInternal>,
    a : Types.MemberId,
    b : Types.MemberId,
  ) : ?Types.ConversationInternal {
    let (m1, m2) = conversationKey(a, b);
    conversations.find(func(c) { c.member1 == m1 and c.member2 == m2 });
  };

  public func getOrCreateConversation(
    conversations : List.List<Types.ConversationInternal>,
    a : Types.MemberId,
    b : Types.MemberId,
    now : Types.Timestamp,
  ) : Types.ConversationInternal {
    switch (findConversation(conversations, a, b)) {
      case (?c) c;
      case null {
        let (m1, m2) = conversationKey(a, b);
        let c : Types.ConversationInternal = {
          member1 = m1;
          member2 = m2;
          var messageCount = 0;
          var lastMessageAt = now;
          var isMuted = false;
          var freeTierSenderCount = 0;
          var freeTierWindowStart = null;
        };
        conversations.add(c);
        c;
      };
    };
  };

  public func buildConversationSummaries(
    conversations : List.List<Types.ConversationInternal>,
    messages : List.List<Types.MessageInternal>,
    members : List.List<MatrimonyTypes.MemberInternal>,
    forMemberId : Types.MemberId,
  ) : [Types.ConversationSummary] {
    let myConvs = conversations.filter(func(c) {
      c.member1 == forMemberId or c.member2 == forMemberId
    });

    let sorted = myConvs.sort(func(a : Types.ConversationInternal, b : Types.ConversationInternal) : { #less; #equal; #greater } {
      Int.compare(b.lastMessageAt, a.lastMessageAt)
    });

    sorted.map<Types.ConversationInternal, Types.ConversationSummary>(func(c) {
      let otherMemberId : Types.MemberId = if (c.member1 == forMemberId) c.member2 else c.member1;
      let otherName = switch (members.find(func(m) { m.id == otherMemberId })) {
        case (?m) m.name;
        case null "Unknown";
      };
      let convMsgs = messages.filter(func(m) {
        not m.isDeleted
        and (
          (m.senderId == c.member1 and m.receiverId == c.member2)
          or (m.senderId == c.member2 and m.receiverId == c.member1)
        )
      });
      let lastMsg = switch (convMsgs.last()) {
        case (?m) m.content;
        case null "";
      };
      let unread = countUnread(messages, forMemberId, otherMemberId);
      {
        otherMemberId;
        otherMemberName = otherName;
        lastMessage = lastMsg;
        lastMessageAt = c.lastMessageAt;
        unreadCount = unread;
      };
    }).toArray();
  };
};
