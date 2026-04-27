import List "mo:core/List";
import Time "mo:core/Time";
import AdsTypes "../types/ads";

module {
  // ── Conversions ────────────────────────────────────────────────────

  /// Convert internal mutable ad to shared public ad
  public func toPublic(self : AdsTypes.AdInternal) : AdsTypes.Ad {
    {
      id = self.id;
      companyName = self.companyName;
      adText = self.adText;
      contactNumber = self.contactNumber;
      websiteLink = self.websiteLink;
      imageUrl = self.imageUrl;
      imageAssetId = self.imageAssetId;
      adType = self.adType;
      startDate = self.startDate;
      endDate = self.endDate;
      isActive = self.isActive;
      views = self.views;
      clicks = self.clicks;
      langText = self.langText;
      createdAt = self.createdAt;
      updatedAt = self.updatedAt;
    };
  };

  // ── CRUD ──────────────────────────────────────────────────────────

  /// Create a new advertisement and add it to the list
  public func createAd(
    ads : List.List<AdsTypes.AdInternal>,
    idHolder : AdsTypes.AdIdHolder,
    input : AdsTypes.CreateAdInput,
  ) : AdsTypes.Ad {
    let now = Time.now();
    let ad : AdsTypes.AdInternal = {
      id = idHolder.nextAdId;
      var companyName = input.companyName;
      var adText = input.adText;
      var contactNumber = input.contactNumber;
      var websiteLink = input.websiteLink;
      var imageUrl = input.imageUrl;
      var imageAssetId = input.imageAssetId;
      var adType = input.adType;
      var startDate = input.startDate;
      var endDate = input.endDate;
      var isActive = true;
      var views = 0;
      var clicks = 0;
      var langText = input.langText;
      var updatedAt = now;
      createdAt = now;
    };
    idHolder.nextAdId += 1;
    ads.add(ad);
    toPublic(ad);
  };

  /// Get a single ad by ID
  public func getAd(
    ads : List.List<AdsTypes.AdInternal>,
    id : AdsTypes.AdId,
  ) : ?AdsTypes.Ad {
    switch (ads.find(func(a) { a.id == id })) {
      case (?a) ?toPublic(a);
      case null null;
    };
  };

  /// Update an existing ad by ID; returns updated ad or null if not found
  public func updateAd(
    ads : List.List<AdsTypes.AdInternal>,
    input : AdsTypes.UpdateAdInput,
  ) : ?AdsTypes.Ad {
    switch (ads.find(func(a) { a.id == input.id })) {
      case (?a) {
        a.companyName := input.companyName;
        a.adText := input.adText;
        a.contactNumber := input.contactNumber;
        a.websiteLink := input.websiteLink;
        a.imageUrl := input.imageUrl;
        a.imageAssetId := input.imageAssetId;
        a.adType := input.adType;
        a.startDate := input.startDate;
        a.endDate := input.endDate;
        a.isActive := input.isActive;
        a.langText := input.langText;
        a.updatedAt := Time.now();
        ?toPublic(a);
      };
      case null null;
    };
  };

  /// Delete an ad by ID; returns true if deleted, false if not found
  public func deleteAd(
    ads : List.List<AdsTypes.AdInternal>,
    id : AdsTypes.AdId,
  ) : Bool {
    switch (ads.findIndex(func(a) { a.id == id })) {
      case (?idx) {
        // Swap with last and truncate to avoid shifting
        let size = ads.size();
        if (size > 0 and idx < size - 1) {
          let last = ads.at(size - 1);
          ads.put(idx, last);
        };
        ignore ads.removeLast();
        true;
      };
      case null false;
    };
  };

  // ── Queries ───────────────────────────────────────────────────────

  /// List all ads (admin view — includes inactive and expired)
  public func listAllAds(
    ads : List.List<AdsTypes.AdInternal>,
  ) : [AdsTypes.Ad] {
    ads.map<AdsTypes.AdInternal, AdsTypes.Ad>(func(a) { toPublic(a) }).toArray();
  };

  /// List only active, non-expired ads (public view)
  /// Filters: isActive == true AND endDate >= now AND startDate <= now
  public func listActiveAds(
    ads : List.List<AdsTypes.AdInternal>,
  ) : [AdsTypes.Ad] {
    let now = Time.now();
    ads.filter(func(a) {
      a.isActive and a.startDate <= now and a.endDate >= now
    }).map<AdsTypes.AdInternal, AdsTypes.Ad>(func(a) { toPublic(a) }).toArray();
  };

  // ── Counters ──────────────────────────────────────────────────────

  /// Increment view count for an ad
  public func recordAdView(
    ads : List.List<AdsTypes.AdInternal>,
    id : AdsTypes.AdId,
  ) : () {
    switch (ads.find(func(a) { a.id == id })) {
      case (?a) { a.views += 1 };
      case null {};
    };
  };

  /// Increment click count for an ad
  public func recordAdClick(
    ads : List.List<AdsTypes.AdInternal>,
    id : AdsTypes.AdId,
  ) : () {
    switch (ads.find(func(a) { a.id == id })) {
      case (?a) { a.clicks += 1 };
      case null {};
    };
  };

  // ── Toggle ────────────────────────────────────────────────────────

  /// Toggle isActive flag for an ad; returns updated ad or null if not found
  public func toggleAdActive(
    ads : List.List<AdsTypes.AdInternal>,
    id : AdsTypes.AdId,
  ) : ?AdsTypes.Ad {
    switch (ads.find(func(a) { a.id == id })) {
      case (?a) {
        a.isActive := not a.isActive;
        a.updatedAt := Time.now();
        ?toPublic(a);
      };
      case null null;
    };
  };
};
