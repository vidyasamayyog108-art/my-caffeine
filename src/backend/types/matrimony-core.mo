import Common "common";

module {
  public type MemberId = Common.MemberId;
  public type StoryId = Common.StoryId;
  public type AnnouncementId = Common.AnnouncementId;
  public type Timestamp = Common.Timestamp;

  // Membership tiers
  public type MembershipTier = {
    #Free;
    #Premium;
  };

  // Payment status for ₹499 membership payment verification
  public type PaymentStatus = {
    #Pending;
    #Uploaded;
    #Approved;
    #Rejected;
  };

  // Photo moderation status — admin reviews uploaded profile photos
  public type PhotoModerationStatus = {
    #Pending;
    #Approved;
    #Rejected;
  };

  // Gender
  public type Gender = {
    #Male;
    #Female;
  };

  // Family type
  public type FamilyType = {
    #Nuclear;
    #Joint;
    #Extended;
  };

  // Partner preferences
  public type PartnerPreferences = {
    minAge : ?Nat;
    maxAge : ?Nat;
    minHeight : ?Nat;   // cm
    maxHeight : ?Nat;
    preferredUpjati : [Text];
    preferredEducation : [Text];
    preferredOccupation : [Text];
    preferredLocations : [Text];
    minIncome : ?Nat;
    maxIncome : ?Nat;
  };

  // Full member profile (internal — has var fields)
  public type MemberInternal = {
    id : MemberId;
    owner : Principal;
    var name : Text;
    var age : Nat;
    var gender : Gender;
    var dateOfBirth : Text;   // ISO date string YYYY-MM-DD
    var heightCm : Nat;
    var upjati : ?Text;       // optional free-text sub-community
    var nativePlace : Text;
    var city : Text;
    var education : Text;
    var occupation : Text;
    var annualIncomeINR : Nat;
    var familyType : FamilyType;
    var fatherOccupation : Text;
    var motherOccupation : Text;
    var siblingsCount : Nat;
    var partnerPreferences : PartnerPreferences;
    var photoUrl : Text;
    var photoAssetId : ?Text;  // object-storage asset id for uploaded profile photo
    var photoModerationStatus : PhotoModerationStatus;
    var membership : MembershipTier;
    var isActive : Bool;
    var isVerified : Bool;     // admin-verified profile badge
    var profileViews : Nat;
    var mobileNumber : ?Text;
    var paymentStatus : PaymentStatus;
    var paymentScreenshotUrl : ?Text;
    var paymentUpiRef : ?Text;
    var birthTime : ?Text;      // optional HH:MM for Kundali Milan
    var birthPlace : ?Text;     // optional birth place text for Kundali Milan
    var birthPlaceLat : ?Float; // latitude for precise Nakshatra calculation
    var birthPlaceLng : ?Float; // longitude for precise Nakshatra calculation
    var nakshatra : ?Nat;       // computed Nakshatra index 0-26 (stored on profile completion)
    var rashi : ?Nat;           // computed Rashi index 0-11
    var charan : ?Nat;          // computed Charan (pada) 1-4
    createdAt : Timestamp;
    var updatedAt : Timestamp;
  };

  // Public-facing member profile (shared type — no var fields)
  public type Member = {
    id : MemberId;
    owner : Principal;
    name : Text;
    age : Nat;
    gender : Gender;
    dateOfBirth : Text;
    heightCm : Nat;
    upjati : ?Text;
    nativePlace : Text;
    city : Text;
    education : Text;
    occupation : Text;
    annualIncomeINR : Nat;
    familyType : FamilyType;
    fatherOccupation : Text;
    motherOccupation : Text;
    siblingsCount : Nat;
    partnerPreferences : PartnerPreferences;
    photoUrl : Text;
    photoAssetId : ?Text;
    photoModerationStatus : PhotoModerationStatus;
    membership : MembershipTier;
    isActive : Bool;
    isVerified : Bool;
    profileViews : Nat;
    mobileNumber : ?Text;
    paymentStatus : PaymentStatus;
    paymentScreenshotUrl : ?Text;
    paymentUpiRef : ?Text;
    birthTime : ?Text;
    birthPlace : ?Text;
    birthPlaceLat : ?Float;
    birthPlaceLng : ?Float;
    nakshatra : ?Nat;
    rashi : ?Nat;
    charan : ?Nat;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  // Input type for creating/updating a member
  public type MemberInput = {
    name : Text;
    age : Nat;
    gender : Gender;
    dateOfBirth : Text;
    heightCm : Nat;
    upjati : ?Text;       // optional free-text sub-community
    nativePlace : Text;
    city : Text;
    education : Text;
    occupation : Text;
    annualIncomeINR : Nat;
    familyType : FamilyType;
    fatherOccupation : Text;
    motherOccupation : Text;
    siblingsCount : Nat;
    partnerPreferences : PartnerPreferences;
    photoUrl : Text;
    mobileNumber : ?Text;
    birthTime : ?Text;
    birthPlace : ?Text;
    birthPlaceLat : ?Float;
    birthPlaceLng : ?Float;
  };

  // Search/filter parameters
  public type SearchFilter = {
    minAge : ?Nat;
    maxAge : ?Nat;
    gender : ?Gender;
    upjati : ?Text;
    city : ?Text;
    education : ?Text;
    occupation : ?Text;
    minIncome : ?Nat;
    maxIncome : ?Nat;
  };

  // Mobile OTP record
  public type MobileOtp = {
    mobile : Text;
    otp : Text;
    createdAt : Int;
    expiresAt : Int;
  };

  // Success story (internal)
  public type SuccessStoryInternal = {
    id : StoryId;
    var groomName : Text;
    var brideName : Text;
    var photoUrl : Text;
    var testimonial : Text;
    var marriageDate : Text;   // ISO date string
    var featured : Bool;
    createdAt : Timestamp;
    var updatedAt : Timestamp;
  };

  // Success story (shared)
  public type SuccessStory = {
    id : StoryId;
    groomName : Text;
    brideName : Text;
    photoUrl : Text;
    testimonial : Text;
    marriageDate : Text;
    featured : Bool;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  // Input for creating/updating a success story
  public type SuccessStoryInput = {
    groomName : Text;
    brideName : Text;
    photoUrl : Text;
    testimonial : Text;
    marriageDate : Text;
    featured : Bool;
  };

  // Community announcement (internal)
  public type AnnouncementInternal = {
    id : AnnouncementId;
    var title : Text;
    var content : Text;
    var author : Text;
    var isActive : Bool;
    createdAt : Timestamp;
    var updatedAt : Timestamp;
  };

  // Community announcement (shared)
  public type Announcement = {
    id : AnnouncementId;
    title : Text;
    content : Text;
    author : Text;
    isActive : Bool;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  // Input for creating/updating an announcement
  public type AnnouncementInput = {
    title : Text;
    content : Text;
    author : Text;
  };

  // Admin stats
  public type Stats = {
    totalMembers : Nat;
    premiumMembers : Nat;
    successfulMarriages : Nat;
    activeMembers : Nat;
  };

  // Admin summary for listing all members with completeness indicators
  public type MemberAdminSummary = {
    id : MemberId;
    owner : Principal;
    name : Text;
    gender : Gender;
    city : Text;
    membership : MembershipTier;
    paymentStatus : PaymentStatus;
    photoModerationStatus : PhotoModerationStatus;
    isActive : Bool;
    isVerified : Bool;
    hasPhoto : Bool;      // true if photoAssetId is set
    isProfileComplete : Bool; // true if key fields are filled
    createdAt : Timestamp;
  };

  // Photo moderation info for admin photo tab
  public type PhotoModerationInfo = {
    memberId : MemberId;
    photoAssetId : Text;
    photoModerationStatus : PhotoModerationStatus;
    memberName : Text;
  };
};
