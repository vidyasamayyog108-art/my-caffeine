import { d as createLucideIcon, u as useSearch, e as useNavigate, r as reactExports, f as useUserStore, g as useActor, j as jsxRuntimeExports, t as translations, b as Button, X, L as Link, S as Skeleton, C as Crown, h as createActor } from "./index-CkCNqozh.js";
import { I as Input } from "./input-GQzGS8vR.js";
import { L as Label } from "./label-D8rR7I0u.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-U2a700E-.js";
import { S as Separator } from "./separator-pMgFIsP0.js";
import { A as AdBanner } from "./AdBanner-B5_VbEX9.js";
import { P as ProfileCard } from "./ProfileCard-CPDvFsC2.js";
import { s as sampleMembers } from "./sampleData-Bygj8EpR.js";
import { L as Lock } from "./lock-BKENGVXz.js";
import "./index-YQgpYIn2.js";
import "./Combination-BMMvFAE9.js";
import "./index-BJGIhklg.js";
import "./megaphone-Cf6gxdqi.js";
import "./download-GSbrD0yi.js";
import "./circle-check-DyfLjrSe.js";
import "./share-2-CqQsbMng.js";
import "./graduation-cap-Ck9csJB0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const AD_INSERT_AFTER = 6;
const EDUCATION_OPTIONS = [
  "10th Pass",
  "12th Pass",
  "Diploma",
  "Bachelor's",
  "Master's",
  "PhD",
  "CA",
  "MBBS",
  "MD",
  "LLB"
];
const INCOME_OPTIONS = [
  "Below 2 LPA",
  "2-5 LPA",
  "5-10 LPA",
  "10-15 LPA",
  "15-25 LPA",
  "25-50 LPA",
  "50+ LPA"
];
const CITIES = Array.from(new Set(sampleMembers.map((m) => m.city))).sort();
function parseFiltersFromSearch(search) {
  return {
    ageMin: search.ageMin ?? "",
    ageMax: search.ageMax ?? "",
    gender: search.gender ?? "All",
    upjati: search.upjati ?? "",
    city: search.city ?? "",
    education: search.education ?? "",
    income: search.income ?? "",
    sortBy: search.sortBy ?? "newest"
  };
}
function filtersToSearchParams(filters) {
  const params = {};
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
function mapBackendMember(m) {
  return {
    id: String(m.id),
    name: m.name,
    age: Number(m.age),
    gender: m.gender,
    dateOfBirth: m.dateOfBirth,
    birthTime: m.birthTime,
    birthPlace: m.birthPlace,
    height: `${m.heightCm}cm`,
    city: m.city,
    state: "",
    nativePlace: m.nativePlace,
    upjati: m.upjati ?? "",
    education: m.education,
    occupation: m.occupation,
    annualIncome: "5-10 LPA",
    maritalStatus: "Never Married",
    familyType: m.familyType,
    fatherOccupation: m.fatherOccupation,
    motherOccupation: m.motherOccupation,
    siblings: Number(m.siblingsCount),
    about: "",
    membershipTier: m.membership,
    photoUrl: m.photoUrl,
    photoAssetId: m.photoAssetId,
    photoModerationStatus: m.photoModerationStatus,
    isVerified: m.isVerified,
    interests: [],
    isActive: m.isActive,
    joinedDate: new Date(Number(m.createdAt) / 1e6).toISOString(),
    partnerAgeMin: 18,
    partnerAgeMax: 50,
    mobileNumber: m.mobileNumber,
    paymentStatus: m.paymentStatus
  };
}
function FilterChip({
  label,
  onRemove
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full border border-primary/20", children: [
    label,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onRemove,
        className: "ml-0.5 hover:text-destructive transition-colors",
        "aria-label": "हटाएं",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
      }
    )
  ] });
}
function LockedCard({ index }) {
  const { currentLanguage } = useUserStore();
  const t = translations[currentLanguage];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "bg-card rounded-xl overflow-hidden border-2 border-accent/40 shadow-premium relative",
      "data-ocid": `browse.locked_card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] bg-gradient-to-br from-accent/20 via-primary/10 to-secondary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl opacity-30", children: "👤" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm mb-1", children: t.premiumPlan ?? "Premium Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3 leading-snug", children: t.upgradeNow ?? "Upgrade to view" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/register",
              className: "inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm hover:bg-accent/90 transition-smooth",
              "data-ocid": `browse.upgrade_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3 h-3" }),
                t.joinNow
              ]
            }
          )
        ] })
      ]
    }
  );
}
function BrowsePage() {
  const rawSearch = useSearch({ strict: false });
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = reactExports.useState(false);
  const { currentLanguage, currentUser } = useUserStore();
  const t = translations[currentLanguage];
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const [activeAds, setActiveAds] = reactExports.useState([]);
  const [members, setMembers] = reactExports.useState(sampleMembers);
  const [membersLoading, setMembersLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!actor || actorLoading) return;
    const fetchAds = () => {
      actor.getActiveAds().then(setActiveAds).catch(() => setActiveAds([]));
    };
    fetchAds();
    const interval = setInterval(fetchAds, 6e4);
    return () => clearInterval(interval);
  }, [actor, actorLoading]);
  reactExports.useEffect(() => {
    if (!actor || actorLoading) {
      if (!actor && !actorLoading) setMembersLoading(false);
      return;
    }
    setMembersLoading(true);
    actor.listProfiles(BigInt(0), BigInt(50)).then((result) => {
      if (result.length > 0) {
        setMembers(result.map(mapBackendMember));
      } else {
        setMembers(sampleMembers);
      }
    }).catch(() => setMembers(sampleMembers)).finally(() => setMembersLoading(false));
  }, [actor, actorLoading]);
  const filters = parseFiltersFromSearch(rawSearch);
  function updateFilters(updates) {
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
    if (filters.upjati && !(m.upjati ?? "").toLowerCase().includes(filters.upjati.toLowerCase()))
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
  const hasActiveFilters = !!filters.ageMin || !!filters.ageMax || filters.gender !== "All" || !!filters.upjati || !!filters.city || !!filters.education || !!filters.income;
  const isViewerPremium = (currentUser == null ? void 0 : currentUser.membershipTier) === "Premium";
  const isGuest = !currentUser;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "browse.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: t.searchProfiles }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: filtered.length }),
          " ",
          t.community,
          " ",
          t.profiles
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: filters.sortBy,
            onValueChange: (v) => updateFilters({ sortBy: v }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-48 h-9 text-sm",
                  "data-ocid": "browse.sort_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "newest", children: t.newest }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: "age_asc", children: [
                  t.minAge,
                  " →"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: "age_desc", children: [
                  t.maxAge,
                  " →"
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "lg:hidden flex items-center gap-2",
            onClick: () => setFiltersOpen(!filtersOpen),
            "data-ocid": "browse.filter_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4" }),
              t.filterBy,
              hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-0.5 h-4 w-4 text-xs bg-primary text-primary-foreground rounded-full flex items-center justify-center", children: "!" })
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "aside",
        {
          className: `${filtersOpen ? "fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto p-4" : "hidden"} lg:static lg:block lg:w-64 lg:shrink-0`,
          "data-ocid": "browse.filter_panel",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-subtle overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-border bg-secondary/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground text-sm", children: t.filterBy })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "h-7 text-xs text-muted-foreground hover:text-destructive",
                    onClick: resetFilters,
                    "data-ocid": "browse.reset_filter_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3 h-3 mr-1" }),
                      t.reset ?? t.clearFilters
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "h-7 w-7 p-0 lg:hidden",
                    onClick: () => setFiltersOpen(false),
                    "data-ocid": "browse.close_filter_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block", children: t.genderFilter }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["All", "Male", "Female"].map((g) => {
                  var _a;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateFilters({ gender: g }),
                      className: `flex-1 text-xs py-1.5 rounded-lg border transition-smooth font-medium ${filters.gender === g ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-foreground hover:border-primary/60"}`,
                      "data-ocid": `browse.gender_${g.toLowerCase()}_button`,
                      children: g === "All" ? ((_a = t.allProfiles) == null ? void 0 : _a.slice(0, 4)) ?? "All" : g === "Male" ? t.male : t.female
                    },
                    g
                  );
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block", children: t.ageRange }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      placeholder: t.minAge,
                      min: 18,
                      max: 60,
                      value: filters.ageMin,
                      onChange: (e) => updateFilters({ ageMin: e.target.value }),
                      className: "h-8 text-sm",
                      "data-ocid": "browse.age_min_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm shrink-0", children: "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      placeholder: t.maxAge,
                      min: 18,
                      max: 60,
                      value: filters.ageMax,
                      onChange: (e) => updateFilters({ ageMax: e.target.value }),
                      className: "h-8 text-sm",
                      "data-ocid": "browse.age_max_input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block", children: t.upjati }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "text",
                    placeholder: t.upjati,
                    value: filters.upjati,
                    onChange: (e) => updateFilters({ upjati: e.target.value }),
                    className: "h-8 text-sm",
                    "data-ocid": "browse.upjati_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block", children: t.cityFilter }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: filters.city || "_all",
                    onValueChange: (v) => updateFilters({ city: v === "_all" ? "" : v }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "h-8 text-sm w-full",
                          "data-ocid": "browse.city_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: t.allProfiles })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "_all", children: t.allProfiles }),
                        CITIES.map((city) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: city, children: city }, city))
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block", children: t.educationFilter }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: filters.education || "_all",
                    onValueChange: (v) => updateFilters({
                      education: v === "_all" ? "" : v
                    }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "h-8 text-sm w-full",
                          "data-ocid": "browse.education_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: t.allProfiles })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "_all", children: t.allProfiles }),
                        EDUCATION_OPTIONS.map((edu) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: edu, children: edu }, edu))
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block", children: t.income }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: filters.income || "_all",
                    onValueChange: (v) => updateFilters({
                      income: v === "_all" ? "" : v
                    }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "h-8 text-sm w-full",
                          "data-ocid": "browse.income_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: t.allProfiles })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "_all", children: t.allProfiles }),
                        INCOME_OPTIONS.map((inc) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: inc, children: inc }, inc))
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  className: "w-full lg:hidden",
                  onClick: () => setFiltersOpen(false),
                  "data-ocid": "browse.apply_filter_button",
                  children: [
                    filtered.length,
                    " ",
                    t.profiles
                  ]
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 min-w-0", children: [
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-wrap gap-2 mb-4",
            "data-ocid": "browse.active_filters",
            children: [
              filters.gender !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                FilterChip,
                {
                  label: filters.gender === "Male" ? t.male : t.female,
                  onRemove: () => updateFilters({ gender: "All" })
                }
              ),
              filters.ageMin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                FilterChip,
                {
                  label: `${t.minAge}: ${filters.ageMin}`,
                  onRemove: () => updateFilters({ ageMin: "" })
                }
              ),
              filters.ageMax && /* @__PURE__ */ jsxRuntimeExports.jsx(
                FilterChip,
                {
                  label: `${t.maxAge}: ${filters.ageMax}`,
                  onRemove: () => updateFilters({ ageMax: "" })
                }
              ),
              filters.upjati && /* @__PURE__ */ jsxRuntimeExports.jsx(
                FilterChip,
                {
                  label: `${t.upjati}: ${filters.upjati}`,
                  onRemove: () => updateFilters({ upjati: "" })
                }
              ),
              filters.city && /* @__PURE__ */ jsxRuntimeExports.jsx(
                FilterChip,
                {
                  label: filters.city,
                  onRemove: () => updateFilters({ city: "" })
                }
              ),
              filters.education && /* @__PURE__ */ jsxRuntimeExports.jsx(
                FilterChip,
                {
                  label: filters.education,
                  onRemove: () => updateFilters({ education: "" })
                }
              ),
              filters.income && /* @__PURE__ */ jsxRuntimeExports.jsx(
                FilterChip,
                {
                  label: filters.income,
                  onRemove: () => updateFilters({ income: "" })
                }
              )
            ]
          }
        ),
        isGuest && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mb-5 rounded-xl border-2 border-primary/30 bg-primary/5 p-4 flex flex-col sm:flex-row items-center gap-4",
            "data-ocid": "browse.guest_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center sm:text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-base", children: t.premiumPlan ?? "Premium Profiles" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: currentLanguage === "marathi" ? "प्रोफाइल्स पाहण्यासाठी लॉगिन करा" : currentLanguage === "hindi" ? "प्रोफाइल देखने के लिए लॉगिन करें" : currentLanguage === "kannada" ? "ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ನೋಡಲು ಲಾಗಿನ್ ಮಾಡಿ" : "Login to view full profiles and contact details" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/login",
                  className: "shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-smooth text-sm",
                  "data-ocid": "browse.guest_login_button",
                  children: t.login
                }
              )
            ]
          }
        ),
        membersLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4",
            "data-ocid": "browse.loading_state",
            children: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl overflow-hidden bg-card border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/5] w-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
                  ] })
                ]
              },
              i
            ))
          }
        ),
        !membersLoading && filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 bg-card rounded-xl border border-border",
            "data-ocid": "browse.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🔍" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: t.noResultsFound }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-5", children: t.tryAgain }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: resetFilters,
                  "data-ocid": "browse.empty_reset_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 mr-2" }),
                    t.clearFilters
                  ]
                }
              )
            ]
          }
        ) : !membersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4",
            "data-ocid": "browse.profiles_list",
            children: filtered.flatMap((member, idx) => {
              const isLocked = (!isViewerPremium || isGuest) && idx >= 5;
              const card = isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(LockedCard, { index: idx }, member.id) : /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileCard, { member, index: idx }, member.id);
              if (idx === AD_INSERT_AFTER - 1 && activeAds.length > 0) {
                return [
                  card,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AdBanner,
                    {
                      ads: activeAds,
                      placement: "profiles-card"
                    },
                    "ad-banner-mid"
                  )
                ];
              }
              return [card];
            })
          }
        ) : null,
        (!isViewerPremium || isGuest) && filtered.length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-xl border-2 border-accent/40 bg-accent/5 p-5 flex flex-col sm:flex-row items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center sm:text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-foreground text-base flex items-center gap-2 justify-center sm:justify-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5 text-accent" }),
              t.allProfiles
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              t.upgradeNow,
              " — ",
              t.joinNow
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/register",
              className: "shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-smooth text-sm",
              "data-ocid": "browse.premium_upsell_button",
              children: t.joinNow
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  BrowsePage as default
};
