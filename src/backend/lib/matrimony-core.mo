import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Types "../types/matrimony-core";

module {

  // ── Member helpers ──────────────────────────────────────────────────

  public func createMember(
    members : List.List<Types.MemberInternal>,
    nextId : Nat,
    caller : Principal,
    input : Types.MemberInput,
    now : Types.Timestamp,
  ) : Types.MemberInternal {
    let m : Types.MemberInternal = {
      id = nextId;
      owner = caller;
      var name = input.name;
      var age = input.age;
      var gender = input.gender;
      var dateOfBirth = input.dateOfBirth;
      var heightCm = input.heightCm;
      var upjati = input.upjati;
      var nativePlace = input.nativePlace;
      var city = input.city;
      var education = input.education;
      var occupation = input.occupation;
      var annualIncomeINR = input.annualIncomeINR;
      var familyType = input.familyType;
      var fatherOccupation = input.fatherOccupation;
      var motherOccupation = input.motherOccupation;
      var siblingsCount = input.siblingsCount;
      var partnerPreferences = input.partnerPreferences;
      var photoUrl = input.photoUrl;
      var photoAssetId = null;
      var photoModerationStatus = #Pending;
      var membership = #Free;
      var isActive = true;
      var isVerified = false;
      var profileViews = 0;
      var mobileNumber = input.mobileNumber;
      var paymentStatus = #Pending;
      var paymentScreenshotUrl = null;
      var paymentUpiRef = null;
      var birthTime = input.birthTime;
      var birthPlace = input.birthPlace;
      var birthPlaceLat = input.birthPlaceLat;
      var birthPlaceLng = input.birthPlaceLng;
      var nakshatra = null;
      var rashi = null;
      var charan = null;
      createdAt = now;
      var updatedAt = now;
    };
    members.add(m);
    m;
  };

  public func toPublicMember(m : Types.MemberInternal) : Types.Member {
    {
      id = m.id;
      owner = m.owner;
      name = m.name;
      age = m.age;
      gender = m.gender;
      dateOfBirth = m.dateOfBirth;
      heightCm = m.heightCm;
      upjati = m.upjati;
      nativePlace = m.nativePlace;
      city = m.city;
      education = m.education;
      occupation = m.occupation;
      annualIncomeINR = m.annualIncomeINR;
      familyType = m.familyType;
      fatherOccupation = m.fatherOccupation;
      motherOccupation = m.motherOccupation;
      siblingsCount = m.siblingsCount;
      partnerPreferences = m.partnerPreferences;
      photoUrl = m.photoUrl;
      photoAssetId = m.photoAssetId;
      photoModerationStatus = m.photoModerationStatus;
      membership = m.membership;
      isActive = m.isActive;
      isVerified = m.isVerified;
      profileViews = m.profileViews;
      mobileNumber = m.mobileNumber;
      paymentStatus = m.paymentStatus;
      paymentScreenshotUrl = m.paymentScreenshotUrl;
      paymentUpiRef = m.paymentUpiRef;
      birthTime = m.birthTime;
      birthPlace = m.birthPlace;
      birthPlaceLat = m.birthPlaceLat;
      birthPlaceLng = m.birthPlaceLng;
      nakshatra = m.nakshatra;
      rashi = m.rashi;
      charan = m.charan;
      createdAt = m.createdAt;
      updatedAt = m.updatedAt;
    };
  };

  public func updateMember(
    m : Types.MemberInternal,
    input : Types.MemberInput,
    now : Types.Timestamp,
  ) {
    m.name := input.name;
    m.age := input.age;
    m.gender := input.gender;
    m.dateOfBirth := input.dateOfBirth;
    m.heightCm := input.heightCm;
    m.upjati := input.upjati;
    m.nativePlace := input.nativePlace;
    m.city := input.city;
    m.education := input.education;
    m.occupation := input.occupation;
    m.annualIncomeINR := input.annualIncomeINR;
    m.familyType := input.familyType;
    m.fatherOccupation := input.fatherOccupation;
    m.motherOccupation := input.motherOccupation;
    m.siblingsCount := input.siblingsCount;
    m.partnerPreferences := input.partnerPreferences;
    m.photoUrl := input.photoUrl;
    switch (input.mobileNumber) {
      case (?mob) { m.mobileNumber := ?mob };
      case null {};
    };
    m.birthTime := input.birthTime;
    m.birthPlace := input.birthPlace;
    m.birthPlaceLat := input.birthPlaceLat;
    m.birthPlaceLng := input.birthPlaceLng;
    m.updatedAt := now;
  };

  public func findMemberById(
    members : List.List<Types.MemberInternal>,
    id : Types.MemberId,
  ) : ?Types.MemberInternal {
    members.find(func(m) { m.id == id });
  };

  public func findMemberByMobile(
    members : List.List<Types.MemberInternal>,
    mobile : Text,
  ) : ?Types.MemberInternal {
    members.find(func(m) {
      switch (m.mobileNumber) {
        case (?mob) mob == mobile;
        case null false;
      }
    });
  };

  public func matchesFilter(m : Types.MemberInternal, f : Types.SearchFilter) : Bool {
    let ageMinOk = switch (f.minAge) { case (?mn) m.age >= mn; case null true };
    let ageMaxOk = switch (f.maxAge) { case (?mx) m.age <= mx; case null true };
    let ageOk = ageMinOk and ageMaxOk;
    let genderOk = switch (f.gender) { case (?g) m.gender == g; case null true };
    let upjatiOk = switch (f.upjati) {
      case (?u) {
        let ul = u.toLower();
        switch (m.upjati) {
          case (?mu) mu.toLower().contains(#text ul);
          case null false;
        };
      };
      case null true;
    };
    let cityOk = switch (f.city) {
      case (?c) {
        let ml = m.city.toLower();
        let cl = c.toLower();
        ml.contains(#text cl);
      };
      case null true;
    };
    let educationOk = switch (f.education) {
      case (?e) {
        let ml = m.education.toLower();
        let el = e.toLower();
        ml.contains(#text el);
      };
      case null true;
    };
    let occupationOk = switch (f.occupation) {
      case (?o) {
        let ml = m.occupation.toLower();
        let ol = o.toLower();
        ml.contains(#text ol);
      };
      case null true;
    };
    let incomeMinOk = switch (f.minIncome) { case (?mn) m.annualIncomeINR >= mn; case null true };
    let incomeMaxOk = switch (f.maxIncome) { case (?mx) m.annualIncomeINR <= mx; case null true };
    let incomeOk = incomeMinOk and incomeMaxOk;

    m.isActive and ageOk and genderOk and upjatiOk and cityOk and educationOk and occupationOk and incomeOk;
  };

  public func searchMembers(
    members : List.List<Types.MemberInternal>,
    filter : Types.SearchFilter,
  ) : [Types.Member] {
    members.filter(func(m) { matchesFilter(m, filter) })
      .map<Types.MemberInternal, Types.Member>(func(m) { toPublicMember(m) })
      .toArray();
  };

  public func getMatches(
    members : List.List<Types.MemberInternal>,
    forMember : Types.MemberInternal,
  ) : [Types.Member] {
    let oppositeGender : Types.Gender = switch (forMember.gender) {
      case (#Male) #Female;
      case (#Female) #Male;
    };
    members.filter(func(m) {
      m.isActive
      and m.id != forMember.id
      and m.gender == oppositeGender
    })
    .map<Types.MemberInternal, Types.Member>(func(m) { toPublicMember(m) })
    .toArray();
  };

  // ── Success story helpers ───────────────────────────────────────────

  public func createStory(
    stories : List.List<Types.SuccessStoryInternal>,
    nextId : Nat,
    input : Types.SuccessStoryInput,
    now : Types.Timestamp,
  ) : Types.SuccessStoryInternal {
    let s : Types.SuccessStoryInternal = {
      id = nextId;
      var groomName = input.groomName;
      var brideName = input.brideName;
      var photoUrl = input.photoUrl;
      var testimonial = input.testimonial;
      var marriageDate = input.marriageDate;
      var featured = input.featured;
      createdAt = now;
      var updatedAt = now;
    };
    stories.add(s);
    s;
  };

  public func toPublicStory(s : Types.SuccessStoryInternal) : Types.SuccessStory {
    {
      id = s.id;
      groomName = s.groomName;
      brideName = s.brideName;
      photoUrl = s.photoUrl;
      testimonial = s.testimonial;
      marriageDate = s.marriageDate;
      featured = s.featured;
      createdAt = s.createdAt;
      updatedAt = s.updatedAt;
    };
  };

  public func updateStory(
    s : Types.SuccessStoryInternal,
    input : Types.SuccessStoryInput,
    now : Types.Timestamp,
  ) {
    s.groomName := input.groomName;
    s.brideName := input.brideName;
    s.photoUrl := input.photoUrl;
    s.testimonial := input.testimonial;
    s.marriageDate := input.marriageDate;
    s.featured := input.featured;
    s.updatedAt := now;
  };

  public func findStoryById(
    stories : List.List<Types.SuccessStoryInternal>,
    id : Types.StoryId,
  ) : ?Types.SuccessStoryInternal {
    stories.find(func(s) { s.id == id });
  };

  // ── Announcement helpers ────────────────────────────────────────────

  public func createAnnouncement(
    announcements : List.List<Types.AnnouncementInternal>,
    nextId : Nat,
    input : Types.AnnouncementInput,
    now : Types.Timestamp,
  ) : Types.AnnouncementInternal {
    let a : Types.AnnouncementInternal = {
      id = nextId;
      var title = input.title;
      var content = input.content;
      var author = input.author;
      var isActive = true;
      createdAt = now;
      var updatedAt = now;
    };
    announcements.add(a);
    a;
  };

  public func toPublicAnnouncement(a : Types.AnnouncementInternal) : Types.Announcement {
    {
      id = a.id;
      title = a.title;
      content = a.content;
      author = a.author;
      isActive = a.isActive;
      createdAt = a.createdAt;
      updatedAt = a.updatedAt;
    };
  };

  public func updateAnnouncement(
    a : Types.AnnouncementInternal,
    input : Types.AnnouncementInput,
    now : Types.Timestamp,
  ) {
    a.title := input.title;
    a.content := input.content;
    a.author := input.author;
    a.updatedAt := now;
  };

  public func findAnnouncementById(
    announcements : List.List<Types.AnnouncementInternal>,
    id : Types.AnnouncementId,
  ) : ?Types.AnnouncementInternal {
    announcements.find(func(a) { a.id == id });
  };

  // ── Stats helpers ───────────────────────────────────────────────────

  /// Returns true if the profile has all key fields filled in.
  public func isProfileComplete(m : Types.MemberInternal) : Bool {
    m.name != ""
    and m.education != ""
    and m.occupation != ""
    and m.city != ""
    and m.dateOfBirth != ""
    and m.nativePlace != ""
  };

  public func toAdminSummary(m : Types.MemberInternal) : Types.MemberAdminSummary {
    {
      id = m.id;
      owner = m.owner;
      name = m.name;
      gender = m.gender;
      city = m.city;
      membership = m.membership;
      paymentStatus = m.paymentStatus;
      photoModerationStatus = m.photoModerationStatus;
      isActive = m.isActive;
      isVerified = m.isVerified;
      hasPhoto = m.photoAssetId != null;
      isProfileComplete = isProfileComplete(m);
      createdAt = m.createdAt;
    };
  };

  public func toPhotoModerationInfo(m : Types.MemberInternal, assetId : Text) : Types.PhotoModerationInfo {
    {
      memberId = m.id;
      photoAssetId = assetId;
      photoModerationStatus = m.photoModerationStatus;
      memberName = m.name;
    };
  };

  public func computeStats(
    members : List.List<Types.MemberInternal>,
    stories : List.List<Types.SuccessStoryInternal>,
  ) : Types.Stats {
    var totalMembers = 0;
    var premiumMembers = 0;
    var activeMembers = 0;
    members.forEach(func(m) {
      totalMembers += 1;
      if (m.isActive) { activeMembers += 1 };
      switch (m.membership) { case (#Premium) premiumMembers += 1; case _ {} };
    });
    {
      totalMembers;
      premiumMembers;
      successfulMarriages = stories.size();
      activeMembers;
    };
  };

  // ── Seed helpers (called once at init) ────────────────────────────

  public func seedSampleData(
    members : List.List<Types.MemberInternal>,
    stories : List.List<Types.SuccessStoryInternal>,
    announcements : List.List<Types.AnnouncementInternal>,
    state : { var nextMemberId : Nat; var nextStoryId : Nat; var nextAnnouncementId : Nat; var adminPrincipal : Principal },
  ) {
    if (members.size() > 0) { return }; // idempotent

    let now : Types.Timestamp = Time.now();
    let anon = Principal.anonymous();

    // 22 sample profiles — upjati as free text, no gotra/diet/paryushan
    // (name, age, gender, dob, heightCm, upjati, nativePlace, city, education, occupation, income, familyType)
    let sampleMembers : [(Text, Nat, Types.Gender, Text, Nat, Text, Text, Text, Text, Text, Nat, Types.FamilyType)] = [
      ("Aarav Jain", 27, #Male, "1997-03-15", 175, "Golalare", "Pune", "Pune", "B.Tech", "Software Engineer", 1200000, #Nuclear),
      ("Priya Shah", 24, #Female, "2000-06-20", 160, "Khandelwal", "Mumbai", "Mumbai", "MBA", "Marketing Manager", 900000, #Joint),
      ("Rohan Mehta", 30, #Male, "1994-11-08", 178, "Oswal", "Nagpur", "Nagpur", "MBBS", "Doctor", 1800000, #Nuclear),
      ("Sneha Kothari", 26, #Female, "1998-01-25", 163, "Golalare", "Jalgaon", "Jalgaon", "B.Com", "Chartered Accountant", 1000000, #Joint),
      ("Vikram Doshi", 32, #Male, "1992-07-12", 172, "Khandelwal", "Solapur", "Solapur", "M.Tech", "Civil Engineer", 1500000, #Extended),
      ("Anjali Patni", 25, #Female, "1999-09-30", 158, "Porwal", "Kolhapur", "Kolhapur", "BDS", "Dentist", 1100000, #Nuclear),
      ("Rahul Jain", 28, #Male, "1996-04-18", 180, "Golalare", "Pune", "Pune", "CA", "Finance Analyst", 1600000, #Nuclear),
      ("Kavita Singhal", 23, #Female, "2001-12-05", 162, "Oswal", "Aurangabad", "Mumbai", "B.Sc", "Pharmacist", 750000, #Joint),
      ("Deepak Oswal", 35, #Male, "1989-08-22", 174, "Oswal", "Nagpur", "Nagpur", "MBA", "Business Owner", 3000000, #Joint),
      ("Ritika Jain", 27, #Female, "1997-02-14", 165, "Khandelwal", "Nashik", "Pune", "M.Sc", "Research Scientist", 1300000, #Nuclear),
      ("Suresh Firodia", 33, #Male, "1991-10-03", 176, "Porwal", "Jalgaon", "Jalgaon", "LLB", "Advocate", 1400000, #Extended),
      ("Pooja Bhandari", 22, #Female, "2002-05-17", 157, "Golalare", "Solapur", "Solapur", "BCA", "Web Developer", 600000, #Nuclear),
      ("Anil Mehta", 38, #Male, "1986-01-29", 171, "Khandelwal", "Kolhapur", "Kolhapur", "B.Com", "Accountant", 1000000, #Joint),
      ("Sunita Ranka", 29, #Female, "1995-07-11", 161, "Oswal", "Mumbai", "Mumbai", "M.Com", "Professor", 1200000, #Nuclear),
      ("Nitin Kotecha", 31, #Male, "1993-03-27", 177, "Porwal", "Aurangabad", "Aurangabad", "M.Tech", "Architect", 1700000, #Nuclear),
      ("Neha Lodha", 26, #Female, "1998-11-09", 164, "Golalare", "Pune", "Pune", "MBA", "HR Manager", 1100000, #Joint),
      ("Pankaj Shah", 34, #Male, "1990-06-16", 173, "Khandelwal", "Nagpur", "Nagpur", "MD", "Specialist Doctor", 2500000, #Nuclear),
      ("Meena Jain", 24, #Female, "2000-08-23", 159, "Oswal", "Jalgaon", "Jalgaon", "B.Pharm", "Pharmacist", 700000, #Joint),
      ("Sandeep Oswal", 29, #Male, "1995-04-02", 179, "Oswal", "Solapur", "Solapur", "MBA", "Operations Manager", 1400000, #Nuclear),
      ("Varsha Kothari", 25, #Female, "1999-10-19", 162, "Porwal", "Kolhapur", "Kolhapur", "BBA", "Bank Officer", 800000, #Extended),
      ("Gaurav Jain", 27, #Male, "1997-12-31", 175, "Golalare", "Mumbai", "Mumbai", "B.Tech", "Data Analyst", 1300000, #Nuclear),
      ("Shilpa Doshi", 23, #Female, "2001-03-08", 160, "Khandelwal", "Pune", "Pune", "B.Sc IT", "System Admin", 650000, #Joint),
    ];

    for ((name, age, gender, dob, ht, upjati, native, city, edu, occ, income, family) in sampleMembers.values()) {
      let prefs : Types.PartnerPreferences = {
        minAge = ?(if (age > 5) age - 5 else 18);
        maxAge = ?(age + 5);
        minHeight = null;
        maxHeight = null;
        preferredUpjati = [];
        preferredEducation = [];
        preferredOccupation = [];
        preferredLocations = [city];
        minIncome = null;
        maxIncome = null;
      };
      let input : Types.MemberInput = {
        name;
        age;
        gender;
        dateOfBirth = dob;
        heightCm = ht;
        upjati = ?upjati;
        nativePlace = native;
        city;
        education = edu;
        occupation = occ;
        annualIncomeINR = income;
        familyType = family;
        fatherOccupation = "Business";
        motherOccupation = "Homemaker";
        siblingsCount = 1;
        partnerPreferences = prefs;
        photoUrl = "";
        mobileNumber = null;
        birthTime = null;
        birthPlace = null;
        birthPlaceLat = null;
        birthPlaceLng = null;
      };
      let id = state.nextMemberId;
      state.nextMemberId += 1;
      let m = createMember(members, id, anon, input, now);
      // All sample members are Premium with approved payment
      m.membership := #Premium;
      m.paymentStatus := #Approved;
    };

    // 5 success stories
    let sampleStories : [(Text, Text, Text, Bool)] = [
      ("Rajesh Jain", "Kavya Shah", "2022-02-14", true),
      ("Amit Doshi", "Prachi Kothari", "2021-11-20", true),
      ("Vikash Mehta", "Aarti Singhal", "2023-04-09", false),
      ("Deepak Firodia", "Nisha Oswal", "2022-08-15", true),
      ("Sachin Ranka", "Mansi Bhandari", "2023-01-28", false),
    ];
    let storyTestimonials = [
      "Vivah Setu ne amhe ek doosre se milvayla madad keli. Aaplyala khup anand aahe!",
      "We found each other through this wonderful platform. Our families are grateful.",
      "A perfect match within our Digambar Jain community. Thank you Vivah Setu!",
      "The community values and shared beliefs brought us together. Highly recommended.",
      "Vivah Setu ne amche swapna purah kele. Ek sundar Jain parivar banayla madad zali.",
    ];
    var storyIdx = 0;
    for ((groom, bride, date, featured) in sampleStories.values()) {
      let input : Types.SuccessStoryInput = {
        groomName = groom;
        brideName = bride;
        photoUrl = "";
        testimonial = storyTestimonials[storyIdx];
        marriageDate = date;
        featured;
      };
      ignore createStory(stories, state.nextStoryId, input, now);
      state.nextStoryId += 1;
      storyIdx += 1;
    };

    // 3 community announcements
    let sampleAnnouncements : [(Text, Text, Text)] = [
      (
        "Vivah Setu Premium Membership Launch",
        "We are pleased to announce our ₹499 premium membership plan for Digambar Jain community members. Premium members get unlimited profile views, direct contact access, and priority listing. Upgrade today to find your perfect match!",
        "Vivah Setu Team"
      ),
      (
        "New Premium Features Launched",
        "We have launched new premium features for our ₹499 membership holders. Premium members can now access unlimited profile views, direct messaging, and priority listing in search results. Upgrade today to find your perfect match!",
        "Vivah Setu Team"
      ),
      (
        "Community Verification Update",
        "We are strengthening our community verification process to ensure all profiles belong to authentic Digambar Jain community members. Please ensure your profile is complete and payment is verified. Unverified profiles will be temporarily hidden.",
        "Admin"
      ),
    ];
    for ((title, content, author) in sampleAnnouncements.values()) {
      let input : Types.AnnouncementInput = { title; content; author };
      ignore createAnnouncement(announcements, state.nextAnnouncementId, input, now);
      state.nextAnnouncementId += 1;
    };
  };
};
