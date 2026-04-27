import { r as reactExports, j as jsxRuntimeExports, B as Badge, X, b as Button } from "./index-CkCNqozh.js";
import { I as Input } from "./input-GQzGS8vR.js";
import { L as Label } from "./label-D8rR7I0u.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-U2a700E-.js";
import { S as Separator } from "./separator-pMgFIsP0.js";
import { P as ProfileCard } from "./ProfileCard-CPDvFsC2.js";
import { s as sampleMembers } from "./sampleData-Bygj8EpR.js";
import { S as Sparkles } from "./sparkles-lL-_5BAP.js";
import { S as Search } from "./search-C1hXDeq2.js";
import "./index-YQgpYIn2.js";
import "./Combination-BMMvFAE9.js";
import "./index-BJGIhklg.js";
import "./circle-check-DyfLjrSe.js";
import "./share-2-CqQsbMng.js";
import "./graduation-cap-Ck9csJB0.js";
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
const MARITAL_STATUS = ["Never Married", "Divorced", "Widowed"];
const CITIES = Array.from(new Set(sampleMembers.map((m) => m.city))).sort();
const defaultForm = {
  keyword: "",
  gender: "",
  ageMin: "",
  ageMax: "",
  upjati: "",
  city: "",
  education: "",
  income: "",
  maritalStatus: ""
};
function SearchPage() {
  const [form, setForm] = reactExports.useState(defaultForm);
  const [results, setResults] = reactExports.useState(null);
  const [hasSearched, setHasSearched] = reactExports.useState(false);
  function updateForm(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
  function handleSearch(e) {
    e.preventDefault();
    const filtered = sampleMembers.filter((m) => {
      if (form.keyword) {
        const kw = form.keyword.toLowerCase();
        const matches = m.name.toLowerCase().includes(kw) || m.occupation.toLowerCase().includes(kw) || m.city.toLowerCase().includes(kw);
        if (!matches) return false;
      }
      if (form.gender && m.gender !== form.gender) return false;
      if (form.ageMin && m.age < Number.parseInt(form.ageMin)) return false;
      if (form.ageMax && m.age > Number.parseInt(form.ageMax)) return false;
      if (form.upjati && !(m.upjati ?? "").toLowerCase().includes(form.upjati.toLowerCase()))
        return false;
      if (form.city && m.city !== form.city) return false;
      if (form.education && m.education !== form.education) return false;
      if (form.income && m.annualIncome !== form.income) return false;
      if (form.maritalStatus && m.maritalStatus !== form.maritalStatus)
        return false;
      return true;
    });
    setResults(filtered);
    setHasSearched(true);
  }
  function handleReset() {
    setForm(defaultForm);
    setResults(null);
    setHasSearched(false);
  }
  const activeFilterCount = [
    form.keyword,
    form.gender,
    form.ageMin,
    form.ageMax,
    form.upjati,
    form.city,
    form.education,
    form.income,
    form.maritalStatus
  ].filter(Boolean).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "search.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "एडवांस्ड सर्च" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "उपजात, शहर, शिक्षा के आधार पर अपना जीवनसाथी खोजें" })
      ] }),
      hasSearched && results !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "secondary",
          className: "shrink-0 text-sm px-3 py-1 bg-primary/10 text-primary border-primary/20",
          children: [
            results.length,
            " परिणाम"
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSearch,
          className: "bg-card border border-border rounded-xl shadow-subtle overflow-hidden",
          "data-ocid": "search.form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "text",
                  placeholder: "नाम, व्यवसाय या शहर से खोजें...",
                  value: form.keyword,
                  onChange: (e) => updateForm("keyword", e.target.value),
                  className: "pl-9 h-11 text-base bg-background",
                  "data-ocid": "search.keyword_input"
                }
              ),
              form.keyword && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                  onClick: () => updateForm("keyword", ""),
                  "aria-label": "खाली करें",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block", children: "लिंग" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: ["", "Male", "Female"].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => updateForm("gender", g),
                    className: `flex-1 text-xs py-2 rounded-lg border transition-smooth font-medium ${form.gender === g ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-foreground hover:border-primary/60"}`,
                    "data-ocid": `search.gender_${g || "all"}_button`,
                    children: g === "" ? "सभी" : g === "Male" ? "पुरुष" : "महिला"
                  },
                  g
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block", children: "आयु सीमा (वर्ष)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      placeholder: "न्यूनतम",
                      min: 18,
                      max: 60,
                      value: form.ageMin,
                      onChange: (e) => updateForm("ageMin", e.target.value),
                      className: "h-9 text-sm",
                      "data-ocid": "search.age_min_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground shrink-0", children: "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      placeholder: "अधिकतम",
                      min: 18,
                      max: 60,
                      value: form.ageMax,
                      onChange: (e) => updateForm("ageMax", e.target.value),
                      className: "h-9 text-sm",
                      "data-ocid": "search.age_max_input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block", children: "उपजात" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "text",
                    placeholder: "Khandelwal, Oswal...",
                    value: form.upjati,
                    onChange: (e) => updateForm("upjati", e.target.value),
                    className: "h-9 text-sm",
                    "data-ocid": "search.upjati_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block", children: "शहर" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.city || "_all",
                    onValueChange: (v) => updateForm("city", v === "_all" ? "" : v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "h-9 text-sm",
                          "data-ocid": "search.city_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "सभी शहर" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "_all", children: "सभी शहर" }),
                        CITIES.map((city) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: city, children: city }, city))
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block", children: "शिक्षा" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.education || "_all",
                    onValueChange: (v) => updateForm(
                      "education",
                      v === "_all" ? "" : v
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "h-9 text-sm",
                          "data-ocid": "search.education_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "सभी" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "_all", children: "सभी" }),
                        EDUCATION_OPTIONS.map((edu) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: edu, children: edu }, edu))
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block", children: "वार्षिक आय" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.income || "_all",
                    onValueChange: (v) => updateForm("income", v === "_all" ? "" : v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "h-9 text-sm",
                          "data-ocid": "search.income_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "सभी" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "_all", children: "सभी" }),
                        INCOME_OPTIONS.map((inc) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: inc, children: inc }, inc))
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block", children: "वैवाहिक स्थिति" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.maritalStatus || "_all",
                    onValueChange: (v) => updateForm("maritalStatus", v === "_all" ? "" : v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "h-9 text-sm",
                          "data-ocid": "search.marital_status_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "सभी" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "_all", children: "सभी" }),
                        MARITAL_STATUS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
                      ] })
                    ]
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 flex items-center justify-between gap-3 border-t border-border pt-4 bg-muted/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: activeFilterCount }),
                " ",
                "फिल्टर सक्रिय"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: handleReset,
                    "data-ocid": "search.reset_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 mr-1" }),
                      "रीसेट"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "submit",
                    className: "bg-primary text-primary-foreground hover:bg-primary/90 px-6",
                    "data-ocid": "search.submit_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 mr-2" }),
                      "खोजें"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      hasSearched && results !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "search.results_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg", children: "खोज परिणाम" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: results.length }),
            " ",
            "प्रोफाइल मिले"
          ] })
        ] }) }),
        results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-16 bg-card rounded-xl border border-border",
            "data-ocid": "search.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🔍" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "कोई प्रोफाइल नहीं मिला" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-5 text-center max-w-sm", children: "आपके फिल्टर से मेल खाने वाले कोई सदस्य नहीं हैं। कुछ फिल्टर हटाएं और दोबारा खोजें।" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: handleReset,
                  "data-ocid": "search.empty_reset_button",
                  children: "फिल्टर साफ़ करें"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
            "data-ocid": "search.results_grid",
            children: results.map((member, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileCard, { member, index: idx }, member.id))
          }
        )
      ] }),
      !hasSearched && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-6",
          "data-ocid": "search.suggestions_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-accent" }),
              "त्वरित खोज सुझाव"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-5", children: [
              {
                label: "पुणे की महिलाएं",
                action: () => setForm({ ...defaultForm, city: "Pune", gender: "Female" })
              },
              {
                label: "मुंबई के पुरुष",
                action: () => setForm({ ...defaultForm, city: "Mumbai", gender: "Male" })
              },
              {
                label: "Khandelwal",
                action: () => setForm({ ...defaultForm, upjati: "Khandelwal" })
              },
              {
                label: "25–30 आयु",
                action: () => setForm({ ...defaultForm, ageMin: "25", ageMax: "30" })
              },
              {
                label: "Oswal",
                action: () => setForm({ ...defaultForm, upjati: "Oswal" })
              },
              {
                label: "नागपुर",
                action: () => setForm({ ...defaultForm, city: "Nagpur" })
              }
            ].map(({ label, action }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: action,
                className: "text-sm px-4 py-2 rounded-full border border-border bg-muted/40 text-foreground hover:border-primary hover:text-primary transition-smooth",
                children: label
              },
              label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
              {
                emoji: "🏙️",
                title: "शहर के अनुसार",
                desc: "पुणे, मुंबई, नागपुर और अन्य शहरों के सदस्य"
              },
              {
                emoji: "🎓",
                title: "शिक्षा के अनुसार",
                desc: "CA, डॉक्टर, इंजीनियर और अन्य पेशेवर"
              },
              {
                emoji: "🏡",
                title: "उपजात के अनुसार",
                desc: "Khandelwal, Oswal, Agrawal जैसी उपजातियों से खोजें"
              }
            ].map(({ emoji, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 p-3 rounded-lg bg-muted/30 border border-border/50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl shrink-0", children: emoji }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: desc })
                  ] })
                ]
              },
              title
            )) })
          ]
        }
      )
    ] })
  ] });
}
export {
  SearchPage as default
};
