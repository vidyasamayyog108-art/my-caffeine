import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

import Common "../types/common";
import Types "../types/chatbot";
import MatrimonyTypes "../types/matrimony-core";
import Lib "../lib/chatbot";

// Mixin exposing the chatbot API.
mixin (
  chatMessages : List.List<Types.ChatMessage>,
  members : List.List<MatrimonyTypes.MemberInternal>,
  state : Common.AppState,
  chatIdHolder : Common.ChatIdHolder,
) {

  func callerChatMemberId(caller : Principal) : ?Common.MemberId {
    switch (members.find(func(m) { Principal.equal(m.owner, caller) })) {
      case (?m) ?m.id;
      case null null;
    };
  };

  // ── Public chatbot API ────────────────────────────────────────────────────

  /// Send a message to the chatbot. Returns bot reply text.
  public shared ({ caller }) func sendChatMessage(
    sessionId : Text,
    message : Text,
    language : Text,
  ) : async Text {
    if (sessionId.size() == 0) Runtime.trap("sessionId cannot be empty");
    if (message.size() == 0) Runtime.trap("message cannot be empty");

    let now = Time.now();
    let userId = callerChatMemberId(caller);
    let lang = switch (language) {
      case "mr" "mr";
      case "hi" "hi";
      case "kn" "kn";
      case _ "en";
    };

    // Store user message
    let userMsgId = chatIdHolder.nextChatMessageId;
    chatIdHolder.nextChatMessageId += 1;
    ignore Lib.addMessage(chatMessages, userMsgId, sessionId, userId, message, false, lang, now);

    // Generate and store bot reply
    let reply = Lib.generateReply(message, lang);
    let botMsgId = chatIdHolder.nextChatMessageId;
    chatIdHolder.nextChatMessageId += 1;
    ignore Lib.addMessage(chatMessages, botMsgId, sessionId, userId, reply, true, lang, now + 1);

    reply;
  };

  /// Get chat history for a session.
  public query func getChatHistory(sessionId : Text) : async [Types.ChatMessage] {
    Lib.getSessionMessages(chatMessages, sessionId);
  };

  /// Get greeting message in the specified language.
  public query func getChatGreeting(language : Text) : async Text {
    let lang = switch (language) {
      case "mr" "mr";
      case "hi" "hi";
      case "kn" "kn";
      case _ "en";
    };
    Lib.greetingMessage(lang);
  };

  // ── Admin chatbot API ─────────────────────────────────────────────────────

  /// Admin: list all chat conversations with summary info (paginated).
  public query ({ caller }) func adminGetAllChatConversations(
    cursor : Nat,
    limit : Nat,
  ) : async { conversations : [Types.ChatConversationSummary]; total : Nat } {
    if (not Principal.equal(caller, state.adminPrincipal)) {
      Runtime.trap("Unauthorized: admin only");
    };
    Lib.buildConversationSummaries(chatMessages, cursor, limit);
  };

  /// Admin: get all messages for a specific session.
  public query ({ caller }) func adminGetChatSession(sessionId : Text) : async [Types.ChatMessage] {
    if (not Principal.equal(caller, state.adminPrincipal)) {
      Runtime.trap("Unauthorized: admin only");
    };
    Lib.getSessionMessages(chatMessages, sessionId);
  };
};
