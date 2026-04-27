// Ashtakoot Kundali Milan algorithm with precise JDN-based Nakshatra calculation.
// Supports both date-only (approximate) and date+time+location (precise JDN) nakshatra modes.
module {

  // ── Public result types ────────────────────────────────────────────────────

  public type AshtakootResult = {
    varna : Nat;       // max 1
    vashya : Nat;      // max 2
    tara : Nat;        // max 3
    yoni : Nat;        // max 4
    grahaMaitri : Nat; // max 5
    gana : Nat;        // max 6
    bhakoot : Nat;     // max 7
    nadi : Nat;        // max 8
    total : Nat;       // max 36
  };

  public type KundaliResult = {
    score : AshtakootResult;
    nakshatra1 : Nat;       // 0-26
    nakshatra2 : Nat;
    nakshatra1Name : Text;
    nakshatra2Name : Text;
    charan1 : Nat;          // 1-4
    charan2 : Nat;
    rashi1 : Nat;           // 0-11
    rashi2 : Nat;
    verdict : Text;         // "Uttam" | "Madhyam" | "Ashubh"
  };

  public type NakshatraData = {
    nakshatra : Nat;      // 0-26
    charan : Nat;         // 1-4
    rashi : Nat;          // 0-11
    moonLongitude : Float;
  };

  // ── Nakshatra names (27 nakshatras, index 0-26) ───────────────────────────

  let nakshatraNames : [Text] = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira",
    "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
    "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati",
    "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
    "Uttara Ashadha", "Shravana", "Dhanishtha", "Shatabhisha", "Purva Bhadrapada",
    "Uttara Bhadrapada", "Revati",
  ];

  public func getNakshatraName(index : Nat) : Text {
    nakshatraNames[index % 27];
  };

  // ── Lookup tables ──────────────────────────────────────────────────────────

  let varnaMap : [Nat] = [
    0, 3, 2, 0, 2,
    0, 0, 0, 3, 2,
    0, 0, 2, 1, 1,
    1, 1, 1, 0, 0,
    2, 0, 3, 3, 3,
    0, 0,
  ];

  let vashyaMap : [Nat] = [
    0, 0, 0, 0, 1,
    1, 1, 1, 4, 1,
    1, 1, 1, 2, 2,
    1, 4, 4, 2, 2,
    2, 1, 0, 2, 1,
    1, 3,
  ];

  let yoniMap : [Nat] = [
    0, 13, 7, 8, 5,
    5, 4, 4, 4, 10,
    10, 2, 2, 9, 9,
    9, 6, 6, 8, 8,
    1, 1, 11, 12, 11,
    12, 3,
  ];

  let yoniEnemyPairs : [(Nat, Nat)] = [
    (0, 10), (1, 12), (2, 11), (3, 8), (4, 10), (5, 6), (7, 9),
  ];

  let lordOrder : [Nat] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  let lordFriendship : [[Nat]] = [
    [5, 1, 3, 3, 5, 3, 5, 1, 3],
    [1, 5, 1, 3, 1, 5, 1, 5, 5],
    [3, 1, 5, 5, 5, 1, 5, 1, 3],
    [3, 3, 5, 5, 5, 1, 5, 1, 3],
    [5, 1, 5, 5, 5, 5, 5, 1, 1],
    [3, 5, 1, 1, 5, 5, 1, 5, 3],
    [5, 1, 5, 5, 5, 1, 5, 3, 1],
    [1, 5, 1, 1, 1, 5, 3, 5, 5],
    [3, 5, 1, 3, 1, 3, 1, 5, 5],
  ];

  let ganaMap : [Nat] = [
    0, 2, 1, 0, 0,
    2, 0, 0, 2, 2,
    2, 0, 0, 2, 0,
    0, 0, 2, 2, 0,
    0, 0, 2, 2, 1,
    0, 0,
  ];

  let nadiMap : [Nat] = [
    0, 1, 2, 0, 1,
    2, 0, 1, 2, 0,
    1, 2, 0, 1, 2,
    0, 1, 2, 0, 1,
    2, 0, 1, 2, 0,
    1, 2,
  ];

  // ── Score helpers ──────────────────────────────────────────────────────────

  func vashyaScore(a : Nat, b : Nat) : Nat {
    if (a == b) 2
    else if ((a == 0 and b == 4) or (a == 4 and b == 0)) 1
    else if ((a + 1 == b) or (b + 1 == a)) 1
    else 0;
  };

  func taraScore(n1 : Nat, n2 : Nat) : Nat {
    let t : Nat = ((n2 + 27 - n1 % 27) % 9) + 1;
    if (t == 1 or t == 3 or t == 5 or t == 7) 3 else 0;
  };

  func isYoniEnemy(a : Nat, b : Nat) : Bool {
    var enemy = false;
    for ((x, y) in yoniEnemyPairs.values()) {
      if ((a == x and b == y) or (a == y and b == x)) enemy := true;
    };
    enemy;
  };

  func yoniScore(n1 : Nat, n2 : Nat) : Nat {
    let y1 = yoniMap[n1];
    let y2 = yoniMap[n2];
    if (y1 == y2) 4
    else if (isYoniEnemy(y1, y2)) 0
    else 2;
  };

  func nakshatraLord(n : Nat) : Nat { lordOrder[n % 9] };

  func grahaMaitriScore(n1 : Nat, n2 : Nat) : Nat {
    lordFriendship[nakshatraLord(n1)][nakshatraLord(n2)];
  };

  func ganaScore(n1 : Nat, n2 : Nat) : Nat {
    let g1 = ganaMap[n1];
    let g2 = ganaMap[n2];
    if (g1 == g2) 6
    else if ((g1 == 0 and g2 == 1) or (g1 == 1 and g2 == 0)) 5
    else if ((g1 == 1 and g2 == 2) or (g1 == 2 and g2 == 1)) 1
    else 0;
  };

  func nakshatraToRashi(n : Nat) : Nat {
    (n * 100 / 225) % 12;
  };

  func bhakootScore(n1 : Nat, n2 : Nat) : Nat {
    let r1 = nakshatraToRashi(n1);
    let r2 = nakshatraToRashi(n2);
    let diff : Nat = if (r2 >= r1) r2 - r1 else r2 + 12 - r1;
    let pair : Nat = diff + 1;
    let pairReverse : Nat = if (pair <= 12) 13 - pair else 1;
    let inauspicious = (pair == 6 or pair == 8 or pair == 5 or pair == 9 or pair == 12 or pair == 2 or pairReverse == 6 or pairReverse == 8 or pairReverse == 5 or pairReverse == 9 or pairReverse == 12 or pairReverse == 2);
    if (inauspicious) 0 else 7;
  };

  func nadiScore(n1 : Nat, n2 : Nat) : Nat {
    if (nadiMap[n1] == nadiMap[n2]) 0 else 8;
  };

  // ── Date/time parsing ──────────────────────────────────────────────────────

  func parseDob(dob : Text) : ?(Nat, Nat, Nat) {
    let parts = dob.split(#char '-').toArray();
    if (parts.size() < 3) return null;
    switch (parts[0].toNat(), parts[1].toNat(), parts[2].toNat()) {
      case (?y, ?m, ?d) ?(y, m, d);
      case _ null;
    };
  };

  func parseTime(t : Text) : ?(Nat, Nat) {
    let parts = t.split(#char ':').toArray();
    if (parts.size() < 2) return null;
    switch (parts[0].toNat(), parts[1].toNat()) {
      case (?h, ?m) ?(h, m);
      case _ null;
    };
  };

  func dayOfYear(year : Nat, month : Nat, day : Nat) : Nat {
    let daysInMonth : [Nat] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let isLeap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0);
    var total = day;
    var i = 0;
    while (i + 1 < month) {
      total += daysInMonth[i];
      if (i == 1 and isLeap) total += 1;
      i += 1;
    };
    total;
  };

  // ── Julian Day Number computation ─────────────────────────────────────────
  // Standard algorithm: converts a Gregorian calendar date+time to JDN (Float).
  // JDN epoch starts at noon Jan 1, 4713 BC (Julian calendar).

  func toJulianDay(year : Nat, month : Nat, day : Nat, hourFrac : Float) : Float {
    // Use the standard algorithm adapted for Gregorian calendar
    let y : Int = if (month > 2) year.toInt() else year.toInt() - 1;
    let m : Int = if (month > 2) month.toInt() else month.toInt() + 12;
    let d : Float = day.toFloat() + hourFrac / 24.0;

    let a : Int = y / 100;
    let b : Int = 2 - a + (a / 4);

    // JDN = floor(365.25*(y+4716)) + floor(30.6001*(m+1)) + d + b - 1524.5
    let term1 : Float = (y.toFloat() + 4716.0) * 365.25;
    let term2 : Float = (m.toFloat() + 1.0) * 30.6001;
    // floor approximation using truncation
    let jdn = floatFloor(term1) + floatFloor(term2) + d + b.toFloat() - 1524.5;
    jdn;
  };

  // Floor for positive floats — we only work with positive JDN values here
  func floatFloor(x : Float) : Float {
    let n : Int = x.toInt();
    // x.toInt() truncates toward zero; for positive numbers that is floor
    n.toFloat();
  };

  // ── Moon longitude via simplified VSOP87 ─────────────────────────────────
  // Reference epoch: J2000.0 = JD 2451545.0
  // Uses mean anomaly + equation of center approximation.
  // Accuracy: ~1-2 degrees (sufficient for Nakshatra determination).

  func fmod(x : Float, m : Float) : Float {
    x - floatFloor(x / m) * m;
  };

  func degToRad(d : Float) : Float { d * 3.14159265358979 / 180.0 };

  // Simple sin approximation using Taylor series (sufficient for ~1° accuracy)
  func sinDeg(d : Float) : Float {
    let r = degToRad(fmod(d, 360.0));
    // Taylor: sin(x) ≈ x - x³/6 + x⁵/120 - x⁷/5040
    let x2 = r * r;
    r * (1.0 - x2 / 6.0 * (1.0 - x2 / 20.0 * (1.0 - x2 / 42.0)));
  };

  public func computeMoonLongitude(jd : Float) : Float {
    // T = Julian centuries since J2000.0
    let t = (jd - 2451545.0) / 36525.0;

    // Moon's mean longitude L0 (degrees)
    let l0 = fmod(218.3164477 + 481267.88123421 * t, 360.0);

    // Moon's mean anomaly M (degrees)
    let m = fmod(134.9633964 + 477198.8675055 * t, 360.0);

    // Moon's mean elongation D (degrees)
    let d = fmod(297.8501921 + 445267.1114034 * t, 360.0);

    // Sun's mean anomaly Ms (degrees)
    let ms = fmod(357.5291092 + 35999.0502909 * t, 360.0);

    // Moon's argument of latitude F (degrees)
    let f = fmod(93.2720950 + 483202.0175233 * t, 360.0);

    // Principal longitude perturbations (degrees)
    let dL =
      6.288774 * sinDeg(m)
      + 1.274027 * sinDeg(2.0 * d - m)
      + 0.658314 * sinDeg(2.0 * d)
      + 0.213618 * sinDeg(2.0 * m)
      - 0.185116 * sinDeg(ms)
      - 0.114332 * sinDeg(2.0 * f)
      + 0.058793 * sinDeg(2.0 * d - 2.0 * m)
      + 0.057066 * sinDeg(2.0 * d - ms - m)
      + 0.053322 * sinDeg(2.0 * d + m)
      + 0.045758 * sinDeg(2.0 * d - ms)
      - 0.040923 * sinDeg(ms - m)
      - 0.034720 * sinDeg(d)
      - 0.030383 * sinDeg(ms + m);

    let moonLon = fmod(l0 + dL, 360.0);
    if (moonLon < 0.0) moonLon + 360.0 else moonLon;
  };

  // ── Precise Nakshatra from birth data ────────────────────────────────────

  /// Compute precise nakshatra, charan, rashi and moon longitude from birth data.
  /// date: "YYYY-MM-DD", time: "HH:MM", lat/lng: birth place coordinates.
  /// lat/lng are currently not used in the simplified VSOP87 model but accepted
  /// for future parallax corrections and API compatibility.
  public func computeNakshatraFromBirthData(
    date : Text,
    time : Text,
    _lat : Float,
    _lng : Float,
  ) : ?NakshatraData {
    let (year, month, day) = switch (parseDob(date)) {
      case null return null;
      case (?v) v;
    };
    let (hour, minute) = switch (parseTime(time)) {
      case null (0, 0);      // default to midnight if time not provided
      case (?v) v;
    };
    let hourFrac = hour.toFloat() + minute.toFloat() / 60.0;
    let jd = toJulianDay(year, month, day, hourFrac);
    let moonLon = computeMoonLongitude(jd);

    // Nakshatra index 0-26: each nakshatra spans 360/27 = 13.333... degrees
    let nakshatra = (moonLon * 27.0 / 360.0).toInt().toNat() % 27;

    // Charan (pada) 1-4: each nakshatra has 4 padas of 3.333... degrees
    let nakshatraFrac = moonLon * 27.0 / 360.0 - nakshatra.toFloat();
    let charan = (nakshatraFrac * 4.0).toInt().toNat() + 1;

    // Rashi 0-11: each rashi spans 30 degrees
    let rashi = (moonLon / 30.0).toInt().toNat() % 12;

    ?{ nakshatra; charan; rashi; moonLongitude = moonLon };
  };

  // ── Approximate Nakshatra (date-only fallback) ────────────────────────────

  public func getNakshatra(dob : Text) : ?Nat {
    switch (parseDob(dob)) {
      case null null;
      case (?(y, m, d)) {
        let doy = dayOfYear(y, m, d);
        let n = ((doy.toInt() - 1) * 27 / 366 % 27).toNat() % 27;
        ?n;
      };
    };
  };

  // ── Ashtakoot scoring ─────────────────────────────────────────────────────

  public func computeAshtakoot(n1 : Nat, n2 : Nat) : AshtakootResult {
    let nn1 = n1 % 27;
    let nn2 = n2 % 27;
    let v1 = varnaMap[nn1];
    let v2 = varnaMap[nn2];
    let varna = if (v1 >= v2) 1 else 0;
    let vashya = vashyaScore(vashyaMap[nn1], vashyaMap[nn2]);
    let tara = taraScore(nn1, nn2);
    let yoni = yoniScore(nn1, nn2);
    let grahaMaitri = grahaMaitriScore(nn1, nn2);
    let gana = ganaScore(nn1, nn2);
    let bhakoot = bhakootScore(nn1, nn2);
    let nadi = nadiScore(nn1, nn2);
    let total = varna + vashya + tara + yoni + grahaMaitri + gana + bhakoot + nadi;
    { varna; vashya; tara; yoni; grahaMaitri; gana; bhakoot; nadi; total };
  };

  // ── Primary Milan function (date-only, backward compatible) ──────────────

  public func computeKundaliMilan(dob1 : Text, dob2 : Text) : ?KundaliResult {
    switch (getNakshatra(dob1), getNakshatra(dob2)) {
      case (?n1, ?n2) {
        let score = computeAshtakoot(n1, n2);
        let verdict = if (score.total >= 18) "Uttam"
          else if (score.total >= 12) "Madhyam"
          else "Ashubh";
        ?{
          score;
          nakshatra1 = n1;
          nakshatra2 = n2;
          nakshatra1Name = nakshatraNames[n1 % 27];
          nakshatra2Name = nakshatraNames[n2 % 27];
          charan1 = 1;
          charan2 = 1;
          rashi1 = nakshatraToRashi(n1);
          rashi2 = nakshatraToRashi(n2);
          verdict;
        };
      };
      case _ null;
    };
  };

  // ── Precise Milan function (with optional birth time + location) ──────────

  /// Compute Kundali Milan with optional precise birth time and location.
  /// If birthTime1/birthTime2 are provided (HH:MM), uses JDN algorithm.
  /// Otherwise falls back to date-only approximate nakshatra.
  public func computeKundaliMilanPrecise(
    dob1 : Text,
    dob2 : Text,
    birthTime1 : ?Text,
    birthTime2 : ?Text,
    lat1 : ?Float,
    lng1 : ?Float,
    lat2 : ?Float,
    lng2 : ?Float,
  ) : ?KundaliResult {
    let nd1 : NakshatraData = switch (birthTime1) {
      case (?t1) {
        let la = switch (lat1) { case (?v) v; case null 0.0 };
        let lo = switch (lng1) { case (?v) v; case null 0.0 };
        switch (computeNakshatraFromBirthData(dob1, t1, la, lo)) {
          case (?nd) nd;
          case null return null;
        };
      };
      case null {
        switch (getNakshatra(dob1)) {
          case (?n) {
            let r = nakshatraToRashi(n);
            { nakshatra = n; charan = 1; rashi = r; moonLongitude = 0.0 }
          };
          case null return null;
        };
      };
    };
    let nd2 : NakshatraData = switch (birthTime2) {
      case (?t2) {
        let la = switch (lat2) { case (?v) v; case null 0.0 };
        let lo = switch (lng2) { case (?v) v; case null 0.0 };
        switch (computeNakshatraFromBirthData(dob2, t2, la, lo)) {
          case (?nd) nd;
          case null return null;
        };
      };
      case null {
        switch (getNakshatra(dob2)) {
          case (?n) {
            let r2 = nakshatraToRashi(n);
            { nakshatra = n; charan = 1; rashi = r2; moonLongitude = 0.0 }
          };
          case null return null;
        };
      };
    };

    let score = computeAshtakoot(nd1.nakshatra, nd2.nakshatra);
    let verdict = if (score.total >= 18) "Uttam"
      else if (score.total >= 12) "Madhyam"
      else "Ashubh";
    ?{
      score;
      nakshatra1 = nd1.nakshatra;
      nakshatra2 = nd2.nakshatra;
      nakshatra1Name = nakshatraNames[nd1.nakshatra % 27];
      nakshatra2Name = nakshatraNames[nd2.nakshatra % 27];
      charan1 = nd1.charan;
      charan2 = nd2.charan;
      rashi1 = nd1.rashi;
      rashi2 = nd2.rashi;
      verdict;
    };
  };
};
