import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AdsTypes "../types/ads";
import AdsLib "../lib/ads";

/// Advertisement API mixin
/// Receives: ads list and ad ID holder injected from main.mo
mixin (
  ads : List.List<AdsTypes.AdInternal>,
  adIdHolder : AdsTypes.AdIdHolder,
) {

  // ── Admin: Create ────────────────────────────────────────────────

  /// Create a new advertisement (admin only)
  public shared ({ caller }) func adminCreateAd(
    input : AdsTypes.CreateAdInput,
  ) : async AdsTypes.Ad {
    if (caller.isAnonymous()) Runtime.trap("Not authorized");
    AdsLib.createAd(ads, adIdHolder, input);
  };

  // ── Admin: Update ────────────────────────────────────────────────

  /// Update an existing advertisement (admin only)
  public shared ({ caller }) func adminUpdateAd(
    input : AdsTypes.UpdateAdInput,
  ) : async ?AdsTypes.Ad {
    if (caller.isAnonymous()) Runtime.trap("Not authorized");
    AdsLib.updateAd(ads, input);
  };

  // ── Admin: Delete ────────────────────────────────────────────────

  /// Delete an advertisement by ID (admin only)
  public shared ({ caller }) func adminDeleteAd(
    id : AdsTypes.AdId,
  ) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Not authorized");
    AdsLib.deleteAd(ads, id);
  };

  // ── Admin: List all ──────────────────────────────────────────────

  /// List all advertisements including inactive/expired (admin only)
  public shared ({ caller }) func adminListAllAds() : async [AdsTypes.Ad] {
    if (caller.isAnonymous()) Runtime.trap("Not authorized");
    AdsLib.listAllAds(ads);
  };

  // ── Admin: Toggle active ──────────────────────────────────────────

  /// Toggle active status of an advertisement (admin only)
  public shared ({ caller }) func adminToggleAdActive(
    id : AdsTypes.AdId,
  ) : async ?AdsTypes.Ad {
    if (caller.isAnonymous()) Runtime.trap("Not authorized");
    AdsLib.toggleAdActive(ads, id);
  };

  // ── Public: Active ads ───────────────────────────────────────────

  /// Get all active, non-expired advertisements (public)
  public query func getActiveAds() : async [AdsTypes.Ad] {
    AdsLib.listActiveAds(ads);
  };

  // ── Public: Record view ──────────────────────────────────────────

  /// Record an ad view impression (public)
  public shared func recordAdView(id : AdsTypes.AdId) : async () {
    AdsLib.recordAdView(ads, id);
  };

  // ── Public: Record click ─────────────────────────────────────────

  /// Record an ad click (public)
  public shared func recordAdClick(id : AdsTypes.AdId) : async () {
    AdsLib.recordAdClick(ads, id);
  };
};
