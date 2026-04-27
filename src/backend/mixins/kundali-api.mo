import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Common "../types/common";
import MatrimonyTypes "../types/matrimony-core";
import KundaliLib "../lib/kundali";

// Mixin exposing the Kundali Milan API.
mixin (
  _state : Common.AppState,
  members : List.List<MatrimonyTypes.MemberInternal>,
) {

  // ── Kundali Milan API ─────────────────────────────────────────────────────

  /// Compute Kundali Milan using date-only (approximate nakshatra).
  public query func computeKundaliMilan(
    dob1 : Text,
    dob2 : Text,
  ) : async ?KundaliLib.KundaliResult {
    KundaliLib.computeKundaliMilan(dob1, dob2);
  };

  /// Compute Kundali Milan with optional precise birth time and location.
  /// If birthTime1/birthTime2 are provided (HH:MM), uses JDN-based precise algorithm.
  /// Falls back to date-only approximate nakshatra when time is omitted.
  public query func computeKundaliScore(
    dob1 : Text,
    dob2 : Text,
    birthTime1 : ?Text,
    birthTime2 : ?Text,
    birthLat1 : ?Float,
    birthLng1 : ?Float,
    birthLat2 : ?Float,
    birthLng2 : ?Float,
  ) : async ?KundaliLib.KundaliResult {
    KundaliLib.computeKundaliMilanPrecise(
      dob1, dob2,
      birthTime1, birthTime2,
      birthLat1, birthLng1,
      birthLat2, birthLng2,
    );
  };

  /// Get nakshatra index (0-26) for a birth date using the approximate method.
  public query func getNakshatraForDob(dob : Text) : async ?Nat {
    KundaliLib.getNakshatra(dob);
  };

  /// Get nakshatra name for a given nakshatra index (0-26).
  public query func getNakshatraName(index : Nat) : async Text {
    KundaliLib.getNakshatraName(index);
  };

  /// Compute precise nakshatra data (nakshatra, charan, rashi, moon longitude)
  /// from birth date, time and coordinates.
  public query func computePreciseNakshatra(
    date : Text,
    time : Text,
    lat : Float,
    lng : Float,
  ) : async ?KundaliLib.NakshatraData {
    KundaliLib.computeNakshatraFromBirthData(date, time, lat, lng);
  };

  /// Compute and store nakshatra/rashi/charan on a member's profile.
  /// Should be called when a member completes registration with birth details.
  public shared ({ caller }) func updateMemberNakshatra() : async { #ok; #err : Text } {
    switch (members.find(func(m) { Principal.equal(m.owner, caller) })) {
      case null #err("Profile not found");
      case (?m) {
        let time = switch (m.birthTime) { case (?t) t; case null "00:00" };
        let lat = switch (m.birthPlaceLat) { case (?v) v; case null 0.0 };
        let lng = switch (m.birthPlaceLng) { case (?v) v; case null 0.0 };
        switch (KundaliLib.computeNakshatraFromBirthData(m.dateOfBirth, time, lat, lng)) {
          case null #err("Could not compute nakshatra — check birth date format");
          case (?nd) {
            m.nakshatra := ?nd.nakshatra;
            m.rashi := ?nd.rashi;
            m.charan := ?nd.charan;
            m.updatedAt := Time.now();
            #ok;
          };
        };
      };
    };
  };
};
