import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  Crown,
  Filter,
  Lock,
  RotateCcw,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Ad, Member as BackendMember } from "../backend";
import { createActor } from "../backend";
import { AdBanner } from "../components/AdBanner";
import { ProfileCard } from "../components/ProfileCard";
import { sampleMembers } from "../data/sampleData";
import { useUserStore } from "../store";
import type { EducationLevel, Gender, IncomeRange, Member } from "../types";
import { translations } from "../types";

const AD_INSERT_AFTER = 6;

const EDUCATION_OPTIONS: EducationLevel[] = [
  "10th Pass",
  "12th Pass",
  "Diploma",
  "Bachelor's",
  "Master's",
  "PhD",
  "CA",
  "MBBS",
  "MD",
  "LLB",
];
const INCOME_OPTIONS: IncomeRange[] = [
  "Below 2 LPA",
  "2-5 LPA",
  "5-10 LPA",
  "10-15 LPA",
  "15-25 LPA",
  "25-50 LPA",
  "50+ LPA",
];
const CITIES = Array.from(new Set(sampleMembers.map((m) => m.city))).sort();

type SortOption = "newest" | "age_asc" | "age_desc";

interface FilterState {
  ageMin: string;
  ageMax: string;
  gender: Gender | "All";
  upjati: string;
  city: string;
  education: EducationLevel | "";
  income: IncomeRange | "";
  sortBy: SortOption;
}

function parseFiltersFromSearch(search: Record<string, string>): FilterState {
  return {
    ageMin: search.ageMin ?? "",
    ageMax: search.ageMax ?? "",
    gender: (search.gender as Gender | "All") ?? "All",
    upjati: search.upjati ?? "",
    city: search.city ?? "",
    education: (search.education as EducationLevel) ?? "",
    income: (search.income as IncomeRange) ?? "",
    sortBy: (search.sortBy as SortOption) ?? "newest",
  };
}

function filtersToSearchParams(filters: FilterState): Record<string, string> {
  const params: Record<string, string> = {};
  if (filters.ageMin) params.ageMin = filters.ageMin;
  if (filters.ageMax) params.ageMax = filters.ageMax;
  if (filters.gender !== "All") params.gender = filters.gender;
  if (filters.upjati) params.upjati = filters.upjati;
  if (filters.city) params.city = filters.city;
  if (filters.education) params.education = filters.education;
  if (filters.income) params.income = filters.income;
  if (filters.sortBy !== "newest") params.sortBy = filters.sortBy;
  return params;
}

/** Map backend Member to frontend Member type */
function mapBackendMember(m: BackendMember): Member {
  return {
    id: String(m.id),
    name: m.name,
    age: Number(m.age),
    gender: m.gender as Gender,
    dateOfBirth: m.dateOfBirth,
    birthTime: m.birthTime,
    birthPlace: m.birthPlace,
    height: `${m.heightCm}cm`,
    city: m.city,
    state: "",
    nativePlace: m.nativePlace,
    upjati: m.upjati ?? "",
    education: m.education as EducationLevel,
    occupation: m.occupation,
    annualIncome: "5-10 LPA" as IncomeRange,
    maritalStatus: "Never Married",
    familyType: m.familyType as "Nuclear" | "Joint" | "Extended",
    fatherOccupation: m.fatherOccupation,
    motherOccupation: m.motherOccupation,
    siblings: Number(m.siblingsCount),
    about: "",
    membershipTier: m.membership as "Free" | "Premium",
    photoUrl: m.photoUrl,
    photoAssetId: m.photoAssetId,
    photoModerationStatus: m.photoModerationStatus as
      | "Pending"
      | "Approved"
      | "Rejected",
    isVerified: m.isVerified,
    interests: [],
    isActive: m.isActive,
    joinedDate: new Date(Number(m.createdAt) / 1_000_000).toISOString(),
    partnerAgeMin: 18,
    partnerAgeMax: 50,
    mobileNumber: m.mobileNumber,
    paymentStatus: m.paymentStatus as
      | "Pending"
      | "Uploaded"
      | "Approved"
      | "Rejected",
  };
}

function FilterChip({
  label,
  onRemove,
}: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full border border-primary/20">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="ml-0.5 hover:text-destructive transition-colors"
        aria-label="हटाएं"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

function LockedCard({ index }: { index: number }) {
  const { currentLanguage } = useUserStore();
  const t = translations[currentLanguage];
  return (
    <article
      className="bg-card rounded-xl overflow-hidden border-2 border-accent/40 shadow-premium relative"
      data-ocid={`browse.locked_card.${index + 1}`}
    >
      <div className="aspect-[4/5] bg-gradient-to-br from-accent/20 via-primary/10 to-secondary/20 flex items-center justify-center">
        <div className="text-4xl opacity-30">👤</div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm p-3 text-center">
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mb-3">
          <Lock className="w-5 h-5 text-accent" />
        </div>
        <p className="font-display font-bold text-foreground text-sm mb-1">
          {t.premiumPlan ?? "Premium Profile"}
        </p>
        <p className="text-xs text-muted-foreground mb-3 leading-snug">
          {t.upgradeNow ?? "Upgrade to view"}
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm hover:bg-accent/90 transition-smooth"
          data-ocid={`browse.upgrade_button.${index + 1}`}
        >
          <Crown className="w-3 h-3" />
          {t.joinNow}
        </Link>
      </div>
    </article>
  );
}

export default function BrowsePage() {
  const rawSearch = useSearch({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { currentLanguage, currentUser } = useUserStore();
  const t = translations[currentLanguage];
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const [activeAds, setActiveAds] = useState<Ad[]>([]);
  const [members, setMembers] = useState<Member[]>(sampleMembers);
  const [membersLoading, setMembersLoading] = useState(false);

  // Load ads and set up a 60-second refresh interval
  useEffect(() => {
    if (!actor || actorLoading) return;
    const fetchAds = () => {
      actor
        .getActiveAds()
        .then(setActiveAds)
        .catch(() => setActiveAds([]));
    };
    fetchAds();
    const interval = setInterval(fetchAds, 60_000);
    return () => clearInterval(interval);
  }, [actor, actorLoading]);

  // Load members from actor
  useEffect(() => {
    if (!actor || actorLoading) {
      // No actor (unauthenticated) — use sample data immediately
      if (!actor && !actorLoading) setMembersLoading(false);
      return;
    }
    setMembersLoading(true);
    actor
      .listProfiles(BigInt(0), BigInt(50))
      .then((result) => {
        if (result.length > 0) {
          setMembers(result.map(mapBackendMember));
        } else {
          setMembers(sampleMembers);
        }
      })
      .catch(() => setMembers(sampleMembers))
      .finally(() => setMembersLoading(false));
  }, [actor, actorLoading]);

  const filters = parseFiltersFromSearch(rawSearch);

  function updateFilters(updates: Partial<FilterState>) {
    const newFilters = { ...filters, ...updates };
    void navigate({ to: "/browse", search: filtersToSearchParams(newFilters) });
  }

  function resetFilters() {
    void navigate({ to: "/browse", search: {} });
  }

  let filtered = members.filter((m) => {
    if (filters.ageMin && m.age < Number.parseInt(filters.ageMin)) return false;
    if (filters.ageMax && m.age > Number.parseInt(filters.ageMax)) return false;
    if (filters.gender !== "All" && m.gender !== filters.gender) return false;
    if (
      filters.upjati &&
      !(m.upjati ?? "").toLowerCase().includes(filters.upjati.toLowerCase())
    )
      return false;
    if (filters.city && m.city !== filters.city) return false;
    if (filters.education && m.education !== filters.education) return false;
    if (filters.income && m.annualIncome !== filters.income) return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    if (filters.sortBy === "age_asc") return a.age - b.age;
    if (filters.sortBy === "age_desc") return b.age - a.age;
    return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
  });

  const hasActiveFilters =
    !!filters.ageMin ||
    !!filters.ageMax ||
    filters.gender !== "All" ||
    !!filters.upjati ||
    !!filters.city ||
    !!filters.education ||
    !!filters.income;

  const isViewerPremium = currentUser?.membershipTier === "Premium";

  // Guest mode: show sample profiles with login overlay
  const isGuest = !currentUser;

  return (
    <div className="min-h-screen bg-background" data-ocid="browse.page">
      {/* Page header */}
      <div className="bg-card border-b border-border shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                {t.searchProfiles}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                <span className="font-semibold text-primary">
                  {filtered.length}
                </span>{" "}
                {t.community} {t.profiles}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select
                value={filters.sortBy}
                onValueChange={(v) =>
                  updateFilters({ sortBy: v as SortOption })
                }
              >
                <SelectTrigger
                  className="w-48 h-9 text-sm"
                  data-ocid="browse.sort_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t.newest}</SelectItem>
                  <SelectItem value="age_asc">{t.minAge} →</SelectItem>
                  <SelectItem value="age_desc">{t.maxAge} →</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="lg:hidden flex items-center gap-2"
                onClick={() => setFiltersOpen(!filtersOpen)}
                data-ocid="browse.filter_toggle"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {t.filterBy}
                {hasActiveFilters && (
                  <span className="ml-0.5 h-4 w-4 text-xs bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    !
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside
            className={`${
              filtersOpen
                ? "fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto p-4"
                : "hidden"
            } lg:static lg:block lg:w-64 lg:shrink-0`}
            data-ocid="browse.filter_panel"
          >
            <div className="bg-card border border-border rounded-xl shadow-subtle overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/5">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  <span className="font-display font-semibold text-foreground text-sm">
                    {t.filterBy}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasActiveFilters && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-muted-foreground hover:text-destructive"
                      onClick={resetFilters}
                      data-ocid="browse.reset_filter_button"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      {t.reset ?? t.clearFilters}
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 lg:hidden"
                    onClick={() => setFiltersOpen(false)}
                    data-ocid="browse.close_filter_button"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-5">
                {/* Gender */}
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    {t.genderFilter}
                  </Label>
                  <div className="flex gap-2">
                    {(["All", "Male", "Female"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => updateFilters({ gender: g })}
                        className={`flex-1 text-xs py-1.5 rounded-lg border transition-smooth font-medium ${
                          filters.gender === g
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-foreground hover:border-primary/60"
                        }`}
                        data-ocid={`browse.gender_${g.toLowerCase()}_button`}
                      >
                        {g === "All"
                          ? (t.allProfiles?.slice(0, 4) ?? "All")
                          : g === "Male"
                            ? t.male
                            : t.female}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Age range */}
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    {t.ageRange}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder={t.minAge}
                      min={18}
                      max={60}
                      value={filters.ageMin}
                      onChange={(e) =>
                        updateFilters({ ageMin: e.target.value })
                      }
                      className="h-8 text-sm"
                      data-ocid="browse.age_min_input"
                    />
                    <span className="text-muted-foreground text-sm shrink-0">
                      —
                    </span>
                    <Input
                      type="number"
                      placeholder={t.maxAge}
                      min={18}
                      max={60}
                      value={filters.ageMax}
                      onChange={(e) =>
                        updateFilters({ ageMax: e.target.value })
                      }
                      className="h-8 text-sm"
                      data-ocid="browse.age_max_input"
                    />
                  </div>
                </div>

                <Separator />

                {/* Upjati */}
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    {t.upjati}
                  </Label>
                  <Input
                    type="text"
                    placeholder={t.upjati}
                    value={filters.upjati}
                    onChange={(e) => updateFilters({ upjati: e.target.value })}
                    className="h-8 text-sm"
                    data-ocid="browse.upjati_input"
                  />
                </div>

                <Separator />

                {/* City */}
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    {t.cityFilter}
                  </Label>
                  <Select
                    value={filters.city || "_all"}
                    onValueChange={(v) =>
                      updateFilters({ city: v === "_all" ? "" : v })
                    }
                  >
                    <SelectTrigger
                      className="h-8 text-sm w-full"
                      data-ocid="browse.city_select"
                    >
                      <SelectValue placeholder={t.allProfiles} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_all">{t.allProfiles}</SelectItem>
                      {CITIES.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Education */}
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    {t.educationFilter}
                  </Label>
                  <Select
                    value={filters.education || "_all"}
                    onValueChange={(v) =>
                      updateFilters({
                        education: v === "_all" ? "" : (v as EducationLevel),
                      })
                    }
                  >
                    <SelectTrigger
                      className="h-8 text-sm w-full"
                      data-ocid="browse.education_select"
                    >
                      <SelectValue placeholder={t.allProfiles} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_all">{t.allProfiles}</SelectItem>
                      {EDUCATION_OPTIONS.map((edu) => (
                        <SelectItem key={edu} value={edu}>
                          {edu}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Income */}
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    {t.income}
                  </Label>
                  <Select
                    value={filters.income || "_all"}
                    onValueChange={(v) =>
                      updateFilters({
                        income: v === "_all" ? "" : (v as IncomeRange),
                      })
                    }
                  >
                    <SelectTrigger
                      className="h-8 text-sm w-full"
                      data-ocid="browse.income_select"
                    >
                      <SelectValue placeholder={t.allProfiles} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_all">{t.allProfiles}</SelectItem>
                      {INCOME_OPTIONS.map((inc) => (
                        <SelectItem key={inc} value={inc}>
                          {inc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="button"
                  className="w-full lg:hidden"
                  onClick={() => setFiltersOpen(false)}
                  data-ocid="browse.apply_filter_button"
                >
                  {filtered.length} {t.profiles}
                </Button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Active chips */}
            {hasActiveFilters && (
              <div
                className="flex flex-wrap gap-2 mb-4"
                data-ocid="browse.active_filters"
              >
                {filters.gender !== "All" && (
                  <FilterChip
                    label={filters.gender === "Male" ? t.male : t.female}
                    onRemove={() => updateFilters({ gender: "All" })}
                  />
                )}
                {filters.ageMin && (
                  <FilterChip
                    label={`${t.minAge}: ${filters.ageMin}`}
                    onRemove={() => updateFilters({ ageMin: "" })}
                  />
                )}
                {filters.ageMax && (
                  <FilterChip
                    label={`${t.maxAge}: ${filters.ageMax}`}
                    onRemove={() => updateFilters({ ageMax: "" })}
                  />
                )}
                {filters.upjati && (
                  <FilterChip
                    label={`${t.upjati}: ${filters.upjati}`}
                    onRemove={() => updateFilters({ upjati: "" })}
                  />
                )}
                {filters.city && (
                  <FilterChip
                    label={filters.city}
                    onRemove={() => updateFilters({ city: "" })}
                  />
                )}
                {filters.education && (
                  <FilterChip
                    label={filters.education}
                    onRemove={() => updateFilters({ education: "" })}
                  />
                )}
                {filters.income && (
                  <FilterChip
                    label={filters.income}
                    onRemove={() => updateFilters({ income: "" })}
                  />
                )}
              </div>
            )}

            {/* Guest login banner */}
            {isGuest && (
              <div
                className="mb-5 rounded-xl border-2 border-primary/30 bg-primary/5 p-4 flex flex-col sm:flex-row items-center gap-4"
                data-ocid="browse.guest_banner"
              >
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-display font-bold text-foreground text-base">
                    {t.premiumPlan ?? "Premium Profiles"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {currentLanguage === "marathi"
                      ? "प्रोफाइल्स पाहण्यासाठी लॉगिन करा"
                      : currentLanguage === "hindi"
                        ? "प्रोफाइल देखने के लिए लॉगिन करें"
                        : currentLanguage === "kannada"
                          ? "ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ನೋಡಲು ಲಾಗಿನ್ ಮಾಡಿ"
                          : "Login to view full profiles and contact details"}
                  </p>
                </div>
                <Link
                  to="/login"
                  className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-smooth text-sm"
                  data-ocid="browse.guest_login_button"
                >
                  {t.login}
                </Link>
              </div>
            )}

            {/* Loading skeleton */}
            {membersLoading && (
              <div
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                data-ocid="browse.loading_state"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden bg-card border border-border"
                  >
                    <Skeleton className="aspect-[4/5] w-full" />
                    <div className="p-3 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!membersLoading && filtered.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border border-border"
                data-ocid="browse.empty_state"
              >
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {t.noResultsFound}
                </h3>
                <p className="text-muted-foreground text-sm mb-5">
                  {t.tryAgain}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetFilters}
                  data-ocid="browse.empty_reset_button"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t.clearFilters}
                </Button>
              </div>
            ) : !membersLoading ? (
              <div
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                data-ocid="browse.profiles_list"
              >
                {filtered.flatMap((member, idx) => {
                  const isLocked = (!isViewerPremium || isGuest) && idx >= 5;
                  const card = isLocked ? (
                    <LockedCard key={member.id} index={idx} />
                  ) : (
                    <ProfileCard key={member.id} member={member} index={idx} />
                  );

                  if (idx === AD_INSERT_AFTER - 1 && activeAds.length > 0) {
                    return [
                      card,
                      <AdBanner
                        key="ad-banner-mid"
                        ads={activeAds}
                        placement="profiles-card"
                      />,
                    ];
                  }
                  return [card];
                })}
              </div>
            ) : null}

            {/* Premium upsell banner */}
            {(!isViewerPremium || isGuest) && filtered.length > 5 && (
              <div className="mt-8 rounded-xl border-2 border-accent/40 bg-accent/5 p-5 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-display font-bold text-foreground text-base flex items-center gap-2 justify-center sm:justify-start">
                    <Crown className="w-5 h-5 text-accent" />
                    {t.allProfiles}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.upgradeNow} — {t.joinNow}
                  </p>
                </div>
                <Link
                  to="/register"
                  className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-smooth text-sm"
                  data-ocid="browse.premium_upsell_button"
                >
                  {t.joinNow}
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
