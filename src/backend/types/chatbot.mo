import Common "common";

module {
  public type MemberId = Common.MemberId;
  public type Timestamp = Common.Timestamp;
  public type ChatMessageId = Nat;

  // A single chatbot message
  public type ChatMessage = {
    id : ChatMessageId;
    sessionId : Text;
    userId : ?MemberId;
    message : Text;
    isBot : Bool;
    language : Text;   // "mr" | "hi" | "kn" | "en"
    createdAt : Timestamp;
  };

  // Summary for admin panel chat listing
  public type ChatConversationSummary = {
    sessionId : Text;
    userId : ?MemberId;
    messageCount : Nat;
    lastActivity : Timestamp;
    firstMessage : Text;
  };
};
