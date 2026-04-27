import Prim "mo:⛔";
import Types "../types/matrimony-core";
import MessagingTypes "../types/messaging";

module {

  // ── Old ConversationInternal — includes freeTierSenderCount/freeTierWindowStart ─
  // This matches the shape currently deployed on-chain.
  public type OldConversationInternal = {
    member1 : MessagingTypes.MemberId;
    member2 : MessagingTypes.MemberId;
    var messageCount : Nat;
    var lastMessageAt : MessagingTypes.Timestamp;
    var isMuted : Bool;
    var freeTierSenderCount : Nat;
    var freeTierWindowStart : ?MessagingTypes.Timestamp;
  };

  // ── Old MemberInternal — includes birthPlaceLat/Lng/nakshatra/rashi/charan ──
  // This matches the shape currently deployed on-chain.
  public type OldMemberInternal = {
    id : Types.MemberId;
    owner : Principal;
    var name : Text;
    var age : Nat;
    var gender : Types.Gender;
    var dateOfBirth : Text;
    var heightCm : Nat;
    var upjati : ?Text;
    var nativePlace : Text;
    var city : Text;
    var education : Text;
    var occupation : Text;
    var annualIncomeINR : Nat;
    var familyType : Types.FamilyType;
    var fatherOccupation : Text;
    var motherOccupation : Text;
    var siblingsCount : Nat;
    var partnerPreferences : Types.PartnerPreferences;
    var photoUrl : Text;
    var photoAssetId : ?Text;
    var photoModerationStatus : Types.PhotoModerationStatus;
    var membership : Types.MembershipTier;
    var isActive : Bool;
    var isVerified : Bool;
    var profileViews : Nat;
    var mobileNumber : ?Text;
    var paymentStatus : Types.PaymentStatus;
    var paymentScreenshotUrl : ?Text;
    var paymentUpiRef : ?Text;
    var birthTime : ?Text;
    var birthPlace : ?Text;
    var birthPlaceLat : ?Float;
    var birthPlaceLng : ?Float;
    var nakshatra : ?Nat;
    var rashi : ?Nat;
    var charan : ?Nat;
    createdAt : Types.Timestamp;
    var updatedAt : Types.Timestamp;
  };

  // List<T> internal structure (matches mo:core/Types.List<T>)
  type ListStruct<T> = {
    var blocks : [var [var ?T]];
    var blockIndex : Nat;
    var elementIndex : Nat;
  };

  // Convert old conversation to new type — fields are identical, pass through
  func convertConversation(c : OldConversationInternal) : MessagingTypes.ConversationInternal {
    {
      member1 = c.member1;
      member2 = c.member2;
      var messageCount = c.messageCount;
      var lastMessageAt = c.lastMessageAt;
      var isMuted = c.isMuted;
      var freeTierSenderCount = c.freeTierSenderCount;
      var freeTierWindowStart = c.freeTierWindowStart;
    }
  };

  // Convert old member to new type — fields are identical, pass through
  func convertMember(m : OldMemberInternal) : Types.MemberInternal {
    {
      id = m.id;
      owner = m.owner;
      var name = m.name;
      var age = m.age;
      var gender = m.gender;
      var dateOfBirth = m.dateOfBirth;
      var heightCm = m.heightCm;
      var upjati = m.upjati;
      var nativePlace = m.nativePlace;
      var city = m.city;
      var education = m.education;
      var occupation = m.occupation;
      var annualIncomeINR = m.annualIncomeINR;
      var familyType = m.familyType;
      var fatherOccupation = m.fatherOccupation;
      var motherOccupation = m.motherOccupation;
      var siblingsCount = m.siblingsCount;
      var partnerPreferences = m.partnerPreferences;
      var photoUrl = m.photoUrl;
      var photoAssetId = m.photoAssetId;
      var photoModerationStatus = m.photoModerationStatus;
      var membership = m.membership;
      var isActive = m.isActive;
      var isVerified = m.isVerified;
      var profileViews = m.profileViews;
      var mobileNumber = m.mobileNumber;
      var paymentStatus = m.paymentStatus;
      var paymentScreenshotUrl = m.paymentScreenshotUrl;
      var paymentUpiRef = m.paymentUpiRef;
      var birthTime = m.birthTime;
      var birthPlace = m.birthPlace;
      var birthPlaceLat = m.birthPlaceLat;
      var birthPlaceLng = m.birthPlaceLng;
      var nakshatra = m.nakshatra;
      var rashi = m.rashi;
      var charan = m.charan;
      createdAt = m.createdAt;
      var updatedAt = m.updatedAt;
    }
  };

  // Walk the List block structure and transform each OldMemberInternal → MemberInternal
  func migrateList(old : ListStruct<OldMemberInternal>) : ListStruct<Types.MemberInternal> {
    let oldBlocks = old.blocks;
    let newBlocks = Prim.Array_tabulateVar(
      oldBlocks.size(),
      func(bi) {
        let oldBlock = oldBlocks[bi];
        Prim.Array_tabulateVar<?Types.MemberInternal>(
          oldBlock.size(),
          func(ei) {
            switch (oldBlock[ei]) {
              case null null;
              case (?m) ?convertMember(m);
            }
          },
        )
      },
    );
    {
      var blocks = newBlocks;
      var blockIndex = old.blockIndex;
      var elementIndex = old.elementIndex;
    }
  };

  // Walk the List block structure and transform each OldConversationInternal → ConversationInternal
  func migrateConversationList(old : ListStruct<OldConversationInternal>) : ListStruct<MessagingTypes.ConversationInternal> {
    let oldBlocks = old.blocks;
    let newBlocks = Prim.Array_tabulateVar(
      oldBlocks.size(),
      func(bi) {
        let oldBlock = oldBlocks[bi];
        Prim.Array_tabulateVar<?MessagingTypes.ConversationInternal>(
          oldBlock.size(),
          func(ei) {
            switch (oldBlock[ei]) {
              case null null;
              case (?c) ?convertConversation(c);
            }
          },
        )
      },
    );
    {
      var blocks = newBlocks;
      var blockIndex = old.blockIndex;
      var elementIndex = old.elementIndex;
    }
  };

  // ── Migration function — applied only on upgrade ────────────────────
  public func migration(old : {
    var members : ListStruct<OldMemberInternal>;
    var conversations : ListStruct<OldConversationInternal>;
  }) : {
    var members : ListStruct<Types.MemberInternal>;
    var conversations : ListStruct<MessagingTypes.ConversationInternal>;
  } {
    {
      var members = migrateList(old.members);
      var conversations = migrateConversationList(old.conversations);
    }
  };

};
