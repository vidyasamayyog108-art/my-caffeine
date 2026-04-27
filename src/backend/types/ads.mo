import Common "common";

module {
  public type AdId = Nat;

  // Multilingual text for ad content
  public type AdLangText = {
    mr : Text;  // Marathi
    hi : Text;  // Hindi
    kn : Text;  // Kannada
    en : Text;  // English
  };

  // Ad type variant: image-only, text-only, or both
  public type AdType = {
    #image;
    #text;
    #both;
  };

  // Internal mutable ad record (stored in canister state)
  public type AdInternal = {
    id : AdId;
    var companyName : Text;
    var adText : Text;
    var contactNumber : Text;
    var websiteLink : Text;
    var imageUrl : Text;
    var imageAssetId : Text;
    var adType : AdType;
    var startDate : Common.Timestamp;
    var endDate : Common.Timestamp;
    var isActive : Bool;
    var views : Nat;
    var clicks : Nat;
    var langText : AdLangText;
    var updatedAt : Common.Timestamp;
    createdAt : Common.Timestamp;
  };

  // Shared (immutable) ad record for API responses
  public type Ad = {
    id : AdId;
    companyName : Text;
    adText : Text;
    contactNumber : Text;
    websiteLink : Text;
    imageUrl : Text;
    imageAssetId : Text;
    adType : AdType;
    startDate : Common.Timestamp;
    endDate : Common.Timestamp;
    isActive : Bool;
    views : Nat;
    clicks : Nat;
    langText : AdLangText;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  // Input type for creating a new ad
  public type CreateAdInput = {
    companyName : Text;
    adText : Text;
    contactNumber : Text;
    websiteLink : Text;
    imageUrl : Text;
    imageAssetId : Text;
    adType : AdType;
    startDate : Common.Timestamp;
    endDate : Common.Timestamp;
    langText : AdLangText;
  };

  // Input type for updating an existing ad
  public type UpdateAdInput = {
    id : AdId;
    companyName : Text;
    adText : Text;
    contactNumber : Text;
    websiteLink : Text;
    imageUrl : Text;
    imageAssetId : Text;
    adType : AdType;
    startDate : Common.Timestamp;
    endDate : Common.Timestamp;
    isActive : Bool;
    langText : AdLangText;
  };

  // Ad ID counter holder — separate from AppState to avoid migration
  public type AdIdHolder = {
    var nextAdId : Nat;
  };
};
