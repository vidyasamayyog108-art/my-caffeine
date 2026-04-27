import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

import Common "../types/common";
import Types "../types/matrimony-core";
import MessagingTypes "../types/messaging";
import Lib "../lib/matrimony-core";
import MessagingLib "../lib/messaging";

// Mixin exposing the public API for the matrimony-core domain.
// State slices (members, stories, announcements, otpStore, state, smsConfig, otpRateLimits, adminCreds) are injected.
mixin (
  members : List.List<Types.MemberInternal>,
  stories : List.List<Types.SuccessStoryInternal>,
  announcements : List.List<Types.AnnouncementInternal>,
  otpStore : List.List<Types.MobileOtp>,
  state : Common.AppState,
  smsConfig : { var config : ?MessagingTypes.SmsConfig },
  otpRateLimits : { var data : [(Text, Nat, Int)] },
  adminCreds : Common.AdminCredentials,
  paymentConfig : Common.PaymentConfig,
  otpLog : List.List<MessagingTypes.SmsOtpLogEntry>,
) {

  // ── Member CRUD ─────────────────────────────────────────────────────

  /// Create a new member profile for the caller.
  public shared ({ caller }) func createProfile(input : Types.MemberInput) : async Types.MemberId {
    if (caller.isAnonymous()) Runtime.trap("Anonymous caller not allowed");
    // Only one profile per principal
    switch (members.find(func(m) { Principal.equal(m.owner, caller) })) {
      case (?_) Runtime.trap("Profile already exists for this principal");
      case null {};
    };
    let id = state.nextMemberId;
    state.nextMemberId += 1;
    let now = Time.now();
    ignore Lib.createMember(members, id, caller, input, now);
    id;
  };

  /// Get the caller's own profile.
  public query ({ caller }) func getMyProfile() : async ?Types.Member {
    switch (members.find(func(m) { Principal.equal(m.owner, caller) })) {
      case (?m) ?Lib.toPublicMember(m);
      case null null;
    };
  };

  /// Get any member profile by id (public listing).
  public query func getMemberProfile(id : Types.MemberId) : async ?Types.Member {
    switch (Lib.findMemberById(members, id)) {
      case (?m) {
        if (m.isActive) ?Lib.toPublicMember(m) else null;
      };
      case null null;
    };
  };

  /// Update the caller's own profile.
  public shared ({ caller }) func updateProfile(input : Types.MemberInput) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Anonymous caller not allowed");
    switch (members.find(func(m) { Principal.equal(m.owner, caller) })) {
      case (?m) {
        Lib.updateMember(m, input, Time.now());
        true;
      };
      case null false;
    };
  };

  /// Delete the caller's own profile.
  public shared ({ caller }) func deleteProfile() : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Anonymous caller not allowed");
    switch (members.findIndex(func(m) { Principal.equal(m.owner, caller) })) {
      case (?idx) {
        // Mark as inactive rather than removing to preserve id continuity
        let m = members.at(idx);
        m.isActive := false;
        true;
      };
      case null false;
    };
  };

  /// Upgrade the caller's membership to Premium (admin-approved flow sets paymentStatus to Approved).
  public shared ({ caller }) func upgradeToPremium() : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Anonymous caller not allowed");
    switch (members.find(func(m) { Principal.equal(m.owner, caller) })) {
      case (?m) {
        m.membership := #Premium;
        true;
      };
      case null false;
    };
  };

  // ── Payment Management ───────────────────────────────────────────────

  /// Submit payment screenshot URL and UPI reference for admin review.
  public shared ({ caller }) func submitPaymentScreenshot(screenshotUrl : Text, upiRef : Text) : async { #ok; #err : Text } {
    if (caller.isAnonymous()) return #err("Anonymous caller not allowed");
    switch (members.find(func(m) { Principal.equal(m.owner, caller) })) {
      case (?m) {
        m.paymentScreenshotUrl := ?screenshotUrl;
        m.paymentUpiRef := ?upiRef;
        m.paymentStatus := #Uploaded;
        #ok;
      };
      case null #err("Profile not found");
    };
  };

  /// Admin: approve a member's payment and activate Premium membership.
  /// Also sends SMS confirmation to the member's mobile.
  public shared ({ caller }) func adminApprovePayment(memberId : Types.MemberId) : async { #ok; #err : Text } {
    requireAdmin(caller);
    switch (Lib.findMemberById(members, memberId)) {
      case (?m) {
        m.paymentStatus := #Approved;
        m.membership := #Premium;
        // Send SMS confirmation if mobile number is available
        switch (m.mobileNumber) {
          case (?mobile) {
            let smsText = "Vivah Setu: Your Rs.499 Premium membership is now active! All profiles and contacts are now unlocked. - Vivah Setu Team";
            ignore await MessagingLib.dispatchRawSms(smsConfig.config, mobile, smsText);
          };
          case null {};
        };
        #ok;
      };
      case null #err("Member not found");
    };
  };

  /// Admin: reject a member's payment with a reason. Also sends SMS notification.
  public shared ({ caller }) func adminRejectPayment(memberId : Types.MemberId, _reason : Text) : async { #ok; #err : Text } {
    requireAdmin(caller);
    switch (Lib.findMemberById(members, memberId)) {
      case (?m) {
        m.paymentStatus := #Rejected;
        m.paymentScreenshotUrl := null;
        m.paymentUpiRef := null;
        // Send rejection SMS if mobile number is available
        switch (m.mobileNumber) {
          case (?mobile) {
            let smsText = "Vivah Setu: Your payment could not be verified. Please re-upload a clear screenshot of your Rs.499 UPI payment to vivahsetu@ptaxis. Contact admin for help.";
            ignore await MessagingLib.dispatchRawSms(smsConfig.config, mobile, smsText);
          };
          case null {};
        };
        #ok;
      };
      case null #err("Member not found");
    };
  };

  /// Admin: list all members with Uploaded payment status pending review.
  public query ({ caller }) func listPendingPayments() : async [Types.Member] {
    requireAdmin(caller);
    members.filter(func(m) {
      switch (m.paymentStatus) { case (#Uploaded) true; case _ false };
    })
    .map<Types.MemberInternal, Types.Member>(func(m) { Lib.toPublicMember(m) })
    .toArray();
  };

  // ── Mobile OTP Login ─────────────────────────────────────────────────

  /// Send OTP to a mobile number.
  /// Enforces max 3 requests per mobile per hour.
  /// If SMS gateway is configured and enabled, sends a real SMS; otherwise stores OTP for bypass.
  /// Returns #ok("sent") on success, or #ok("no_sms_config") when SMS not configured (frontend handles gracefully).
  public shared func sendOtp(mobile : Text) : async { #ok : Text; #err : Text } {
    if (mobile.size() < 10) return #err("Invalid mobile number");
    let now = Time.now();

    // Rate-limit check: max 3 OTPs per mobile per hour
    if (not MessagingLib.checkOtpRateLimit(otpRateLimits, mobile, now)) {
      return #err("Too many OTP requests. Please wait before requesting again.");
    };

    // Generate 6-digit OTP
    let otpNat = ((now.toNat() / 1000) % 1000000);
    let otp = MessagingLib.padOtp(otpNat);

    // Store / replace OTP entry — 10 minute expiry (600 billion nanoseconds)
    switch (otpStore.findIndex(func(o) { o.mobile == mobile })) {
      case (?idx) {
        otpStore.put(idx, {
          mobile;
          otp;
          createdAt = now;
          expiresAt = now + 600_000_000_000; // 10 minutes in nanoseconds
        });
      };
      case null {
        otpStore.add({
          mobile;
          otp;
          createdAt = now;
          expiresAt = now + 600_000_000_000;
        });
      };
    };

    // Record rate-limit usage
    MessagingLib.recordOtpRequest(otpRateLimits, mobile, now);

    // Dispatch SMS (real or simulated) — log the attempt
    let smsResult = await MessagingLib.dispatchSmsWithLog(smsConfig.config, mobile, otp, otpLog, now);
    switch (smsResult) {
      case (#ok(_msg)) #ok("sent");
      case (#err(_e)) {
        // SMS config not set or failed — OTP still stored for bypass flow
        #ok("no_sms_config");
      };
    };
  };

  /// Verify OTP for a mobile number.
  /// Returns #ok(isNewUser) on success, #err("invalid"), #err("expired"), or #err("rate_limited").
  /// Increments rate-limit counter on wrong OTP attempts; locks after 3 failures.
  public shared func verifyOtp(mobile : Text, otp : Text) : async { #ok : Bool; #err : Text } {
    let now = Time.now();

    // Check if locked due to too many wrong attempts
    if (not MessagingLib.checkOtpRateLimit(otpRateLimits, mobile, now)) {
      return #err("rate_limited");
    };

    switch (otpStore.find(func(o) { o.mobile == mobile })) {
      case null return #err("invalid");
      case (?entry) {
        if (entry.expiresAt < now) {
          return #err("expired");
        };
        if (entry.otp == otp) {
          // Remove used OTP
          let remaining = otpStore.filter(func(o) { o.mobile != mobile });
          otpStore.clear();
          otpStore.append(remaining);
          // Determine if this is a new user (no existing profile with this mobile)
          let isNewUser = switch (Lib.findMemberByMobile(members, mobile)) {
            case null true;
            case (?_) false;
          };
          #ok(isNewUser);
        } else {
          // Wrong OTP — record as failed attempt (reuse rate-limit tracker)
          MessagingLib.recordOtpRequest(otpRateLimits, mobile, now);
          #err("invalid");
        };
      };
    };
  };

  // ── Search & Browse ─────────────────────────────────────────────────

  /// Search/filter members by various criteria.
  public query func searchProfiles(filter : Types.SearchFilter) : async [Types.Member] {
    Lib.searchMembers(members, filter);
  };

  /// List all active member profiles (paginated by offset + limit).
  public query func listProfiles(offset : Nat, limit : Nat) : async [Types.Member] {
    let active = members.filter(func(m) { m.isActive });
    let total = active.size();
    if (offset >= total) return [];
    let end = if (offset + limit > total) total else offset + limit;
    active.sliceToArray(offset, end)
      .map<Types.MemberInternal, Types.Member>(func(m) { Lib.toPublicMember(m) });
  };

  /// Get premium-only profiles.
  public query func listPremiumProfiles() : async [Types.Member] {
    members.filter(func(m) {
      let isPremium = switch (m.membership) { case (#Premium) true; case _ false };
      m.isActive and isPremium;
    })
    .map<Types.MemberInternal, Types.Member>(func(m) { Lib.toPublicMember(m) })
    .toArray();
  };

  // ── Matches ─────────────────────────────────────────────────────────

  /// Get compatibility matches for the calling member.
  public query ({ caller }) func getMyMatches() : async [Types.Member] {
    switch (members.find(func(m) { Principal.equal(m.owner, caller) })) {
      case (?me) Lib.getMatches(members, me);
      case null [];
    };
  };

  /// Get today's featured matches (subset of compatible profiles, deterministic by date + caller hash).
  public query ({ caller }) func getTodaysMatches() : async [Types.Member] {
    switch (members.find(func(m) { Principal.equal(m.owner, caller) })) {
      case (?me) {
        let allMatches = Lib.getMatches(members, me);
        let n = allMatches.size();
        if (n == 0) return [];
        // Deterministic daily subset: use caller principal hash XOR day number
        let callerHash = caller.hash().toNat();
        let dayNs : Int = 86_400_000_000_000; // 1 day in nanoseconds
        let dayNum : Nat = (Time.now() / dayNs).toNat();
        let seed : Nat = callerHash + dayNum;
        let count = if (n <= 5) n else 5;
        // Pick 'count' profiles deterministically
        let result = List.empty<Types.Member>();
        var i = 0;
        while (i < count) {
          let idx = (seed + i * 7) % n;
          result.add(allMatches[idx]);
          i += 1;
        };
        result.toArray();
      };
      case null [];
    };
  };

  /// Get members near the caller's city.
  public query ({ caller }) func getNearbyMatches() : async [Types.Member] {
    switch (members.find(func(m) { Principal.equal(m.owner, caller) })) {
      case (?me) {
        members.filter(func(m) {
          m.isActive and m.id != me.id and m.city == me.city
        })
        .map<Types.MemberInternal, Types.Member>(func(m) { Lib.toPublicMember(m) })
        .toArray();
      };
      case null [];
    };
  };

  // ── Success Stories ─────────────────────────────────────────────────

  /// List all success stories.
  public query func listSuccessStories() : async [Types.SuccessStory] {
    stories.map<Types.SuccessStoryInternal, Types.SuccessStory>(func(s) { Lib.toPublicStory(s) }).toArray();
  };

  /// List featured success stories.
  public query func listFeaturedStories() : async [Types.SuccessStory] {
    stories.filter(func(s) { s.featured })
      .map<Types.SuccessStoryInternal, Types.SuccessStory>(func(s) { Lib.toPublicStory(s) })
      .toArray();
  };

  /// Get a specific success story.
  public query func getSuccessStory(id : Types.StoryId) : async ?Types.SuccessStory {
    switch (Lib.findStoryById(stories, id)) {
      case (?s) ?Lib.toPublicStory(s);
      case null null;
    };
  };

  // ── Community Announcements ─────────────────────────────────────────

  /// List all active community announcements.
  public query func listAnnouncements() : async [Types.Announcement] {
    announcements.filter(func(a) { a.isActive })
      .map<Types.AnnouncementInternal, Types.Announcement>(func(a) { Lib.toPublicAnnouncement(a) })
      .toArray();
  };

  /// Get a specific announcement.
  public query func getAnnouncement(id : Types.AnnouncementId) : async ?Types.Announcement {
    switch (Lib.findAnnouncementById(announcements, id)) {
      case (?a) ?Lib.toPublicAnnouncement(a);
      case null null;
    };
  };

  // ── Stats ────────────────────────────────────────────────────────────

  /// Get community statistics (public).
  public query func getStats() : async Types.Stats {
    Lib.computeStats(members, stories);
  };

  // ── Admin Operations ─────────────────────────────────────────────────

  func requireAdmin(caller : Principal) {
    if (not Principal.equal(caller, state.adminPrincipal)) {
      Runtime.trap("Unauthorized: admin only");
    };
  };

  /// Admin: list all members (active + inactive).
  public query ({ caller }) func adminListAllMembers() : async [Types.Member] {
    requireAdmin(caller);
    members.map<Types.MemberInternal, Types.Member>(func(m) { Lib.toPublicMember(m) }).toArray();
  };

  /// Admin: list all members with profile completeness indicators.
  public query ({ caller }) func listAllMembers() : async [Types.MemberAdminSummary] {
    requireAdmin(caller);
    members.map<Types.MemberInternal, Types.MemberAdminSummary>(func(m) { Lib.toAdminSummary(m) }).toArray();
  };

  /// Admin: delete any member profile by id (marks inactive).
  public shared ({ caller }) func adminDeleteProfile(memberId : Types.MemberId) : async { #ok; #err : Text } {
    requireAdmin(caller);
    switch (Lib.findMemberById(members, memberId)) {
      case (?m) {
        m.isActive := false;
        m.updatedAt := Time.now();
        #ok;
      };
      case null #err("Member not found");
    };
  };

  /// Admin: delete any member profile by id.
  public shared ({ caller }) func adminDeleteMember(id : Types.MemberId) : async Bool {
    requireAdmin(caller);
    switch (members.findIndex(func(m) { m.id == id })) {
      case (?idx) {
        let m = members.at(idx);
        m.isActive := false;
        true;
      };
      case null false;
    };
  };

  /// Admin: mark a member's profile as verified (trust badge).
  public shared ({ caller }) func adminVerifyProfile(memberId : Types.MemberId) : async { #ok; #err : Text } {
    requireAdmin(caller);
    switch (Lib.findMemberById(members, memberId)) {
      case (?m) {
        m.isVerified := true;
        m.updatedAt := Time.now();
        #ok;
      };
      case null #err("Member not found");
    };
  };

  /// Admin: remove the verified badge from a member's profile.
  public shared ({ caller }) func adminUnverifyProfile(memberId : Types.MemberId) : async { #ok; #err : Text } {
    requireAdmin(caller);
    switch (Lib.findMemberById(members, memberId)) {
      case (?m) {
        m.isVerified := false;
        m.updatedAt := Time.now();
        #ok;
      };
      case null #err("Member not found");
    };
  };

  // ── Profile Photo Management ─────────────────────────────────────────

  /// Save the asset id of the caller's uploaded profile photo.
  /// Called after the frontend has uploaded the file to object-storage and
  /// received back an asset id. No premium membership required.
  public shared ({ caller }) func updateProfilePhoto(assetId : Text) : async { #ok; #err : Text } {
    if (caller.isAnonymous()) return #err("Anonymous caller not allowed");
    if (assetId.size() == 0) return #err("Asset id must not be empty");
    switch (members.find(func(m) { Principal.equal(m.owner, caller) })) {
      case (?m) {
        m.photoAssetId := ?assetId;
        m.updatedAt := Time.now();
        #ok;
      };
      case null #err("Profile not found");
    };
  };

  /// Admin: clear a member's profile photo (remove photoAssetId).
  public shared ({ caller }) func adminDeleteMemberPhoto(memberId : Types.MemberId) : async { #ok; #err : Text } {
    requireAdmin(caller);
    switch (Lib.findMemberById(members, memberId)) {
      case (?m) {
        m.photoAssetId := null;
        m.updatedAt := Time.now();
        #ok;
      };
      case null #err("Member not found");
    };
  };

  /// Admin: activate or deactivate a member.
  public shared ({ caller }) func adminSetMemberActive(id : Types.MemberId, active : Bool) : async Bool {
    requireAdmin(caller);
    switch (Lib.findMemberById(members, id)) {
      case (?m) {
        m.isActive := active;
        true;
      };
      case null false;
    };
  };

  /// Admin: create a success story.
  public shared ({ caller }) func adminCreateSuccessStory(input : Types.SuccessStoryInput) : async Types.StoryId {
    requireAdmin(caller);
    let id = state.nextStoryId;
    state.nextStoryId += 1;
    ignore Lib.createStory(stories, id, input, Time.now());
    id;
  };

  /// Admin: update a success story.
  public shared ({ caller }) func adminUpdateSuccessStory(id : Types.StoryId, input : Types.SuccessStoryInput) : async Bool {
    requireAdmin(caller);
    switch (Lib.findStoryById(stories, id)) {
      case (?s) {
        Lib.updateStory(s, input, Time.now());
        true;
      };
      case null false;
    };
  };

  /// Admin: delete a success story.
  public shared ({ caller }) func adminDeleteSuccessStory(id : Types.StoryId) : async Bool {
    requireAdmin(caller);
    switch (stories.findIndex(func(s) { s.id == id })) {
      case (?_idx) {
        let remaining = stories.filter(func(s) { s.id != id });
        stories.clear();
        stories.append(remaining);
        true;
      };
      case null false;
    };
  };

  /// Admin: create a community announcement.
  public shared ({ caller }) func adminCreateAnnouncement(input : Types.AnnouncementInput) : async Types.AnnouncementId {
    requireAdmin(caller);
    let id = state.nextAnnouncementId;
    state.nextAnnouncementId += 1;
    ignore Lib.createAnnouncement(announcements, id, input, Time.now());
    id;
  };

  /// Admin: update a community announcement.
  public shared ({ caller }) func adminUpdateAnnouncement(id : Types.AnnouncementId, input : Types.AnnouncementInput) : async Bool {
    requireAdmin(caller);
    switch (Lib.findAnnouncementById(announcements, id)) {
      case (?a) {
        Lib.updateAnnouncement(a, input, Time.now());
        true;
      };
      case null false;
    };
  };

  /// Admin: delete a community announcement.
  public shared ({ caller }) func adminDeleteAnnouncement(id : Types.AnnouncementId) : async Bool {
    requireAdmin(caller);
    switch (announcements.findIndex(func(a) { a.id == id })) {
      case (?_idx) {
        let remaining = announcements.filter(func(a) { a.id != id });
        announcements.clear();
        announcements.append(remaining);
        true;
      };
      case null false;
    };
  };

  /// Admin: set the admin principal.
  public shared ({ caller }) func adminSetAdmin(newAdmin : Principal) : async Bool {
    // Allow first call from anonymous (bootstrap), or require current admin
    if (state.adminPrincipal.isAnonymous() or Principal.equal(caller, state.adminPrincipal)) {
      state.adminPrincipal := newAdmin;
      true;
    } else {
      Runtime.trap("Unauthorized: admin only");
    };
  };

  // ── Admin Stats ────────────────────────────────────────────────────────────

  /// Admin: get detailed statistics.
  public query ({ caller }) func adminGetStats() : async Types.Stats {
    requireAdmin(caller);
    Lib.computeStats(members, stories);
  };

  /// Admin: search members by name or city substring.
  public query ({ caller }) func adminSearchMembers(query_ : Text) : async [Types.Member] {
    requireAdmin(caller);
    let lower = query_.toLower();
    members.filter(func(m) {
      m.name.toLower().contains(#text lower) or m.city.toLower().contains(#text lower)
    })
    .map<Types.MemberInternal, Types.Member>(func(m) { Lib.toPublicMember(m) })
    .toArray();
  };

  // ── Admin Block Member ─────────────────────────────────────────────────────

  /// Admin: block a member (sets isActive=false).
  public shared ({ caller }) func adminBlockMember(memberId : Types.MemberId) : async { #ok; #err : Text } {
    requireAdmin(caller);
    switch (Lib.findMemberById(members, memberId)) {
      case (?m) {
        m.isActive := false;
        m.updatedAt := Time.now();
        #ok;
      };
      case null #err("Member not found");
    };
  };

  /// Admin: approve a member — sets membership to Premium and paymentStatus to Approved.
  public shared ({ caller }) func adminApproveMember(memberId : Types.MemberId) : async { #ok; #err : Text } {
    requireAdmin(caller);
    switch (Lib.findMemberById(members, memberId)) {
      case (?m) {
        m.membership := #Premium;
        m.paymentStatus := #Approved;
        m.isActive := true;
        m.updatedAt := Time.now();
        #ok;
      };
      case null #err("Member not found");
    };
  };

  /// Admin: reject a member — sets isActive to false with optional reason (logged but not stored).
  public shared ({ caller }) func adminRejectMember(memberId : Types.MemberId, _reason : ?Text) : async { #ok; #err : Text } {
    requireAdmin(caller);
    switch (Lib.findMemberById(members, memberId)) {
      case (?m) {
        m.isActive := false;
        m.updatedAt := Time.now();
        #ok;
      };
      case null #err("Member not found");
    };
  };

  /// Admin: update a member's payment status directly.
  public shared ({ caller }) func updatePaymentStatus(memberId : Types.MemberId, status : Types.PaymentStatus) : async { #ok; #err : Text } {
    requireAdmin(caller);
    switch (Lib.findMemberById(members, memberId)) {
      case (?m) {
        m.paymentStatus := status;
        // Auto-upgrade to Premium when approved
        switch (status) {
          case (#Approved) {
            m.membership := #Premium;
          };
          case _ {};
        };
        m.updatedAt := Time.now();
        #ok;
      };
      case null #err("Member not found");
    };
  };

  // ── Secure Admin Authentication ────────────────────────────────────────────

  // Lock duration: 30 minutes in nanoseconds
  let ADMIN_LOCK_DURATION : Int = 1_800_000_000_000;

  func checkAdminPassword(password : Text) : Bool {
    // MVP: passwords stored as "hashed_<plaintext>"
    adminCreds.passwordHash == "hashed_" # password;
  };

  /// Admin login Step 1: verify username + password.
  /// If valid, triggers OTP SMS to admin mobile.
  /// Returns: #ok("proceed_to_otp") | #locked(unlockTime text) | #invalid
  public shared func adminLogin_Step1_CheckPassword(
    username : Text,
    password : Text,
  ) : async { #ok : Text; #locked : Text; #invalid } {
    let now = Time.now();

    // Check lock
    switch (adminCreds.lockUntil) {
      case (?lockTime) {
        if (now < lockTime) {
          return #locked("Admin account locked. Try again after " # (lockTime - now).toText() # " nanoseconds.");
        } else {
          // Lock expired — reset
          adminCreds.lockUntil := null;
          adminCreds.failedAttempts := 0;
        };
      };
      case null {};
    };

    if (adminCreds.username != username or not checkAdminPassword(password)) {
      adminCreds.failedAttempts += 1;
      if (adminCreds.failedAttempts >= 3) {
        adminCreds.lockUntil := ?(now + ADMIN_LOCK_DURATION);
        adminCreds.failedAttempts := 0;
        return #locked("Admin account locked for 30 minutes due to 3 failed attempts.");
      };
      return #invalid;
    };

    // Password correct — reset failures, send OTP to admin mobile
    adminCreds.failedAttempts := 0;

    // If SMS API is not configured, bypass OTP step
    let smsConfigured = switch (smsConfig.config) {
      case null false;
      case (?cfg) cfg.enabled and cfg.apiKey != "";
    };

    if (not smsConfigured) {
      return #ok("bypass_otp");
    };

    // Generate OTP and store in otpStore
    let otpNat = ((now.toNat() / 1000) % 1000000);
    let otp = MessagingLib.padOtp(otpNat);
    let adminMobile = adminCreds.adminMobile;

    switch (otpStore.findIndex(func(o) { o.mobile == adminMobile })) {
      case (?idx) {
        otpStore.put(idx, {
          mobile = adminMobile;
          otp;
          createdAt = now;
          expiresAt = now + 600_000_000_000;
        });
      };
      case null {
        otpStore.add({
          mobile = adminMobile;
          otp;
          createdAt = now;
          expiresAt = now + 600_000_000_000;
        });
      };
    };

    // Dispatch SMS
    ignore await MessagingLib.dispatchSms(
      smsConfig.config,
      adminMobile,
      otp,
    );

    #ok("proceed_to_otp");
  };

  /// Admin login Step 2: verify OTP sent to admin mobile.
  /// If SMS is not configured, any 6-digit code (or "bypass") is accepted.
  public shared func adminLogin_Step2_VerifyOtp(
    username : Text,
    otp : Text,
  ) : async { #ok; #invalid; #expired } {
    if (adminCreds.username != username) return #invalid;
    let now = Time.now();
    let adminMobile = adminCreds.adminMobile;

    // Bypass mode: SMS not configured — accept any submission
    let smsConfigured = switch (smsConfig.config) {
      case null false;
      case (?cfg) cfg.enabled and cfg.apiKey != "";
    };
    if (not smsConfigured) {
      return #ok;
    };

    switch (otpStore.find(func(o) { o.mobile == adminMobile })) {
      case (?entry) {
        if (entry.expiresAt < now) return #expired;
        if (entry.otp == otp) {
          // Remove used OTP
          let remaining = otpStore.filter(func(o) { o.mobile != adminMobile });
          otpStore.clear();
          otpStore.append(remaining);
          #ok;
        } else {
          #invalid;
        };
      };
      case null {
        // No OTP in store — accept if not configured (belt-and-suspenders)
        #invalid;
      };
    };
  };

  /// Admin: get current admin credentials info (mobile masked, no password).
  public query ({ caller }) func adminGetCredentialInfo() : async { username : Text; adminMobile : Text; isLocked : Bool } {
    requireAdmin(caller);
    let isLocked = switch (adminCreds.lockUntil) {
      case (?lt) Time.now() < lt;
      case null false;
    };
    let mobile = adminCreds.adminMobile;
    let mLen = mobile.size();
    let maskedMobile = if (mLen <= 4) "****" else {
      let cutoff : Nat = (mLen.toInt() - 4).toNat();
      var suffix = "";
      var i = 0;
      for (ch in mobile.toIter()) {
        if (i >= cutoff) suffix #= Text.fromChar(ch);
        i += 1;
      };
      "******" # suffix;
    };
    { username = adminCreds.username; adminMobile = maskedMobile; isLocked };
  };

  /// Admin: update admin password and/or mobile number.
  public shared ({ caller }) func adminUpdateCredentials(
    newPassword : ?Text,
    newMobile : ?Text,
  ) : async { #ok; #err : Text } {
    requireAdmin(caller);
    switch (newPassword) {
      case (?p) {
        if (p.size() < 6) return #err("Password must be at least 6 characters");
        adminCreds.passwordHash := "hashed_" # p;
      };
      case null {};
    };
    switch (newMobile) {
      case (?mob) {
        if (mob.size() < 10) return #err("Invalid mobile number");
        adminCreds.adminMobile := mob;
      };
      case null {};
    };
    #ok;
  };

  /// Admin: update the UPI QR code configuration shown on the payment page.
  /// Pass the object-storage asset id obtained after uploading the QR image.
  public shared ({ caller }) func adminSetPaymentConfig(
    upiId : Text,
    qrImageUrl : Text,
    qrImageAssetId : Text,
  ) : async { #ok; #err : Text } {
    requireAdmin(caller);
    if (upiId.size() == 0) return #err("UPI ID must not be empty");
    paymentConfig.upiId := upiId;
    paymentConfig.qrImageUrl := qrImageUrl;
    paymentConfig.qrImageAssetId := qrImageAssetId;
    paymentConfig.updatedAt := Time.now();
    #ok;
  };

  /// Get the current payment configuration (UPI ID + QR code image).
  /// Public query — no auth required so the payment page can read it.
  public query func adminGetPaymentConfig() : async Common.PaymentConfigPublic {
    {
      upiId = paymentConfig.upiId;
      qrImageUrl = paymentConfig.qrImageUrl;
      qrImageAssetId = paymentConfig.qrImageAssetId;
      updatedAt = paymentConfig.updatedAt;
    };
  };
};
