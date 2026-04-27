module {
  public type MemberId = Nat;
  public type StoryId = Nat;
  public type AnnouncementId = Nat;
  public type MessageId = Nat;
  public type ChatMessageId = Nat;
  public type Timestamp = Int;

  // Admin credentials stored in canister state for secure admin login.
  // passwordHash is stored as "hashed_<password>" prefix for demo (MVP).
  // lockUntil: ?Timestamp — if set, admin is locked until that timestamp.
  public type AdminCredentials = {
    var username : Text;
    var passwordHash : Text;  // "hashed_<plaintext>" for MVP
    var adminMobile : Text;
    var failedAttempts : Nat;
    var lockUntil : ?Timestamp;
  };

  // Mutable counters and admin principal — passed as a record to mixins.
  // NOTE: Adding fields here requires migration. New counters should be
  // added as separate holder objects in main.mo to avoid migration complexity.
  public type AppState = {
    var nextMemberId : Nat;
    var nextStoryId : Nat;
    var nextAnnouncementId : Nat;
    var nextMessageId : Nat;
    var adminPrincipal : Principal;
  };

  // Chat message ID counter — separate holder to avoid migration of AppState.
  public type ChatIdHolder = {
    var nextChatMessageId : Nat;
  };

  // Payment configuration — holds UPI ID and QR code image asset details.
  // Stored as a mutable holder to avoid AppState migration.
  public type PaymentConfig = {
    var upiId : Text;
    var qrImageUrl : Text;
    var qrImageAssetId : Text;
    var updatedAt : Timestamp;
  };

  // Shared (immutable) version of PaymentConfig for API responses.
  public type PaymentConfigPublic = {
    upiId : Text;
    qrImageUrl : Text;
    qrImageAssetId : Text;
    updatedAt : Timestamp;
  };
};
