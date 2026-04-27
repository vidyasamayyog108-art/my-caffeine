import Common "common";

module {
  public type MemberId = Common.MemberId;
  public type MessageId = Common.MessageId;
  public type Timestamp = Common.Timestamp;

  // SMS provider configuration
  public type SmsProvider = {
    #Fast2SMS;
    #MSG91;
    #Custom;
  };

  public type SmsConfig = {
    provider : SmsProvider;
    apiKey : Text;
    senderName : Text;
    enabled : Bool;
    templateId : ?Text; // optional DLT template id (required by MSG91)
  };

  // A single chat message (internal — has var fields)
  public type MessageInternal = {
    id : MessageId;
    senderId : MemberId;
    receiverId : MemberId;
    var content : Text;
    createdAt : Timestamp;
    var isRead : Bool;
    var isDeleted : Bool;
  };

  // Public-facing message (shared — no var fields)
  public type Message = {
    id : MessageId;
    senderId : MemberId;
    receiverId : MemberId;
    content : Text;
    createdAt : Timestamp;
    isRead : Bool;
    isDeleted : Bool;
  };

  // Conversation between exactly two members
  public type ConversationInternal = {
    member1 : MemberId;   // lower id
    member2 : MemberId;   // higher id
    var messageCount : Nat;
    var lastMessageAt : Timestamp;
    var isMuted : Bool;
    // Rolling 24-hour window tracking for free-tier quota
    var freeTierSenderCount : Nat;        // messages sent by free-tier sender in current window
    var freeTierWindowStart : ?Timestamp; // when the current 24h window started (null = not yet started)
  };

  // Summary of a conversation for the inbox list
  public type ConversationSummary = {
    otherMemberId : MemberId;
    otherMemberName : Text;
    lastMessage : Text;
    lastMessageAt : Timestamp;
    unreadCount : Nat;
  };

  // OTP send attempt log entry (for admin audit)
  public type SmsOtpLogEntry = {
    timestamp : Timestamp;
    phone : Text;
    provider : Text;
    success : Bool;
    errorCode : ?Text;
  };
};
