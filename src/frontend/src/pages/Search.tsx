import { Badge } from "@/components/ui/badge";
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
import { Search as SearchIcon, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { ProfileCard } from "../components/ProfileCard";
import { sampleMembers } from "../data/sampleData";
import type { EducationLevel, Gender, IncomeRange } from "../types";

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
const MARITAL_STATUS = ["Never Married", "Divorced", "Widowed"];
const CITIES = Array.from(new Set(sampleMembers.map((m) => m.city))).sort();

interface SearchForm {
  keyword: string;
  gender: Gender | "";
  ageMin: string;
  ageMax: string;
  upjati: string;
  city: string;
  education: EducationLevel | "";
  income: IncomeRange | "";
  maritalStatus: string;
}

const defaultForm: SearchForm = {
  keyword: "",
  gender: "",
  ageMin: "",
  ageMax: "",
  upjati: "",
  city: "",
  education: "",
  income: "",
  maritalStatus: "",
};

export default function SearchPage() {
  const [form, setForm] = useState<SearchForm>(defaultForm);
  const [results, setResults] = useState<typeof sampleMembers | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  function updateForm<K extends keyof SearchForm>(
    key: K,
    value: SearchForm[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const filtered = sampleMembers.filter((m) => {
      if (form.keyword) {
        const kw = form.keyword.toLowerCase();
        const matches =
          m.name.toLowerCase().includes(kw) ||
          m.occupation.toLowerCase().includes(kw) ||
          m.city.toLowerCase().includes(kw);
        if (!matches) return false;
      }
      if (form.gender && m.gender !== form.gender) return false;
      if (form.ageMin && m.age < Number.parseInt(form.ageMin)) return false;
      if (form.ageMax && m.age > Number.parseInt(form.ageMax)) return false;
      if (
        form.upjati &&
        !(m.upjati ?? "").toLowerCase().includes(form.upjati.toLowerCase())
      )
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
    form.maritalStatus,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background" data-ocid="search.page">
      {/* Page header */}
      <div className="bg-card border-b border-border shadow-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-primary" />
                <h1 className="font-display text-2xl font-bold text-foreground">
                  एडवांस्ड सर्च
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                उपजात, शहर, शिक्षा के आधार पर अपना जीवनसाथी खोजें
              </p>
            </div>
            {hasSearched && results !== null && (
              <Badge
                variant="secondary"
                className="shrink-0 text-sm px-3 py-1 bg-primary/10 text-primary border-primary/20"
              >
                {results.length} परिणाम
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Search form */}
        <form
          onSubmit={handleSearch}
          className="bg-card border border-border rounded-xl shadow-subtle overflow-hidden"
          data-ocid="search.form"
        >
          {/* Keyword */}
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="नाम, व्यवसाय या शहर से खोजें..."
                value={form.keyword}
                onChange={(e) => updateForm("keyword", e.target.value)}
                className="pl-9 h-11 text-base bg-background"
                data-ocid="search.keyword_input"
              />
              {form.keyword && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => updateForm("keyword", "")}
                  aria-label="खाली करें"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Primary filters */}
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Gender */}
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  लिंग
                </Label>
                <div className="flex gap-1.5">
                  {(["", "Male", "Female"] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => updateForm("gender", g)}
                      className={`flex-1 text-xs py-2 rounded-lg border transition-smooth font-medium ${
                        form.gender === g
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border text-foreground hover:border-primary/60"
                      }`}
                      data-ocid={`search.gender_${g || "all"}_button`}
                    >
                      {g === "" ? "सभी" : g === "Male" ? "पुरुष" : "महिला"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  आयु सीमा (वर्ष)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="न्यूनतम"
                    min={18}
                    max={60}
                    value={form.ageMin}
                    onChange={(e) => updateForm("ageMin", e.target.value)}
                    className="h-9 text-sm"
                    data-ocid="search.age_min_input"
                  />
                  <span className="text-muted-foreground shrink-0">—</span>
                  <Input
                    type="number"
                    placeholder="अधिकतम"
                    min={18}
                    max={60}
                    value={form.ageMax}
                    onChange={(e) => updateForm("ageMax", e.target.value)}
                    className="h-9 text-sm"
                    data-ocid="search.age_max_input"
                  />
                </div>
              </div>

              {/* Upjati */}
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  उपजात
                </Label>
                <Input
                  type="text"
                  placeholder="Khandelwal, Oswal..."
                  value={form.upjati}
                  onChange={(e) => updateForm("upjati", e.target.value)}
                  className="h-9 text-sm"
                  data-ocid="search.upjati_input"
                />
              </div>

              {/* City */}
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  शहर
                </Label>
                <Select
                  value={form.city || "_all"}
                  onValueChange={(v) =>
                    updateForm("city", v === "_all" ? "" : v)
                  }
                >
                  <SelectTrigger
                    className="h-9 text-sm"
                    data-ocid="search.city_select"
                  >
                    <SelectValue placeholder="सभी शहर" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_all">सभी शहर</SelectItem>
                    {CITIES.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Education */}
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  शिक्षा
                </Label>
                <Select
                  value={form.education || "_all"}
                  onValueChange={(v) =>
                    updateForm(
                      "education",
                      v === "_all" ? "" : (v as EducationLevel),
                    )
                  }
                >
                  <SelectTrigger
                    className="h-9 text-sm"
                    data-ocid="search.education_select"
                  >
                    <SelectValue placeholder="सभी" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_all">सभी</SelectItem>
                    {EDUCATION_OPTIONS.map((edu) => (
                      <SelectItem key={edu} value={edu}>
                        {edu}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Income */}
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  वार्षिक आय
                </Label>
                <Select
                  value={form.income || "_all"}
                  onValueChange={(v) =>
                    updateForm("income", v === "_all" ? "" : (v as IncomeRange))
                  }
                >
                  <SelectTrigger
                    className="h-9 text-sm"
                    data-ocid="search.income_select"
                  >
                    <SelectValue placeholder="सभी" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_all">सभी</SelectItem>
                    {INCOME_OPTIONS.map((inc) => (
                      <SelectItem key={inc} value={inc}>
                        {inc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Marital Status */}
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  वैवाहिक स्थिति
                </Label>
                <Select
                  value={form.maritalStatus || "_all"}
                  onValueChange={(v) =>
                    updateForm("maritalStatus", v === "_all" ? "" : v)
                  }
                >
                  <SelectTrigger
                    className="h-9 text-sm"
                    data-ocid="search.marital_status_select"
                  >
                    <SelectValue placeholder="सभी" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_all">सभी</SelectItem>
                    {MARITAL_STATUS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Form actions */}
          <div className="px-4 pb-4 flex items-center justify-between gap-3 border-t border-border pt-4 bg-muted/20">
            <div>
              {activeFilterCount > 0 && (
                <span className="text-xs text-muted-foreground">
                  <span className="font-semibold text-primary">
                    {activeFilterCount}
                  </span>{" "}
                  फिल्टर सक्रिय
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {activeFilterCount > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  data-ocid="search.reset_button"
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  रीसेट
                </Button>
              )}
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6"
                data-ocid="search.submit_button"
              >
                <SearchIcon className="w-4 h-4 mr-2" />
                खोजें
              </Button>
            </div>
          </div>
        </form>

        {/* Results */}
        {hasSearched && results !== null && (
          <div data-ocid="search.results_section">
            <Separator className="mb-6" />
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display font-semibold text-foreground text-lg">
                  खोज परिणाम
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  <span className="font-semibold text-primary">
                    {results.length}
                  </span>{" "}
                  प्रोफाइल मिले
                </p>
              </div>
            </div>

            {results.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-16 bg-card rounded-xl border border-border"
                data-ocid="search.empty_state"
              >
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  कोई प्रोफाइल नहीं मिला
                </h3>
                <p className="text-muted-foreground text-sm mb-5 text-center max-w-sm">
                  आपके फिल्टर से मेल खाने वाले कोई सदस्य नहीं हैं। कुछ फिल्टर हटाएं और दोबारा
                  खोजें।
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  data-ocid="search.empty_reset_button"
                >
                  फिल्टर साफ़ करें
                </Button>
              </div>
            ) : (
              <div
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                data-ocid="search.results_grid"
              >
                {results.map((member, idx) => (
                  <ProfileCard key={member.id} member={member} index={idx} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Suggestions when no search */}
        {!hasSearched && (
          <div
            className="bg-card border border-border rounded-xl p-6"
            data-ocid="search.suggestions_section"
          >
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              त्वरित खोज सुझाव
            </h3>
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                {
                  label: "पुणे की महिलाएं",
                  action: () =>
                    setForm({ ...defaultForm, city: "Pune", gender: "Female" }),
                },
                {
                  label: "मुंबई के पुरुष",
                  action: () =>
                    setForm({ ...defaultForm, city: "Mumbai", gender: "Male" }),
                },
                {
                  label: "Khandelwal",
                  action: () =>
                    setForm({ ...defaultForm, upjati: "Khandelwal" }),
                },
                {
                  label: "25–30 आयु",
                  action: () =>
                    setForm({ ...defaultForm, ageMin: "25", ageMax: "30" }),
                },
                {
                  label: "Oswal",
                  action: () => setForm({ ...defaultForm, upjati: "Oswal" }),
                },
                {
                  label: "नागपुर",
                  action: () => setForm({ ...defaultForm, city: "Nagpur" }),
                },
              ].map(({ label, action }) => (
                <button
                  key={label}
                  type="button"
                  onClick={action}
                  className="text-sm px-4 py-2 rounded-full border border-border bg-muted/40 text-foreground hover:border-primary hover:text-primary transition-smooth"
                >
                  {label}
                </button>
              ))}
            </div>

            <Separator className="mb-5" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  emoji: "🏙️",
                  title: "शहर के अनुसार",
                  desc: "पुणे, मुंबई, नागपुर और अन्य शहरों के सदस्य",
                },
                {
                  emoji: "🎓",
                  title: "शिक्षा के अनुसार",
                  desc: "CA, डॉक्टर, इंजीनियर और अन्य पेशेवर",
                },
                {
                  emoji: "🏡",
                  title: "उपजात के अनुसार",
                  desc: "Khandelwal, Oswal, Agrawal जैसी उपजातियों से खोजें",
                },
              ].map(({ emoji, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                >
                  <span className="text-2xl shrink-0">{emoji}</span>
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">
                      {title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
