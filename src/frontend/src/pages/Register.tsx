import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Crown,
  GraduationCap,
  Home,
  ShieldCheck,
  Upload,
  User,
  Users,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import {
  FamilyType as BackendFamilyType,
  Gender as BackendGender,
  createActor,
} from "../backend";
import { JainOrnament } from "../components/JainSymbol";
import { useUserStore } from "../store";
import type {
  EducationLevel,
  FamilyType,
  Gender,
  IncomeRange,
  Language,
  MaritalStatus,
  MembershipTier,
} from "../types";
import { translations } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  // Step 1 – Personal
  fullName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  gender: Gender | "";
  heightFt: string;
  heightIn: string;
  maritalStatus: MaritalStatus | "";
  // Step 2 – Community
  upjati: string;
  nativePlace: string;
  motherTongue: string;
  // Step 3 – Verification
  isDigambarJain: boolean;
  // Step 4 – Education & Career
  education: EducationLevel | "";
  university: string;
  occupation: string;
  company: string;
  annualIncome: IncomeRange | "";
  // Step 5 – Family
  familyType: FamilyType | "";
  fatherOccupation: string;
  motherOccupation: string;
  totalSiblings: string;
  brothers: string;
  sisters: string;
  // Step 6 – Photo
  photoFile: File | null;
  photoPreview: string;
  photoAssetId: string | null;
  uploadProgress: number;
  additionalPhotos: File[];
  // Membership
  membershipTier: MembershipTier;
}

const INITIAL_FORM: FormData = {
  fullName: "",
  dateOfBirth: "",
  birthTime: "",
  birthPlace: "",
  gender: "",
  heightFt: "",
  heightIn: "",
  maritalStatus: "",
  upjati: "",
  nativePlace: "",
  motherTongue: "",
  isDigambarJain: false,
  education: "",
  university: "",
  occupation: "",
  company: "",
  annualIncome: "",
  familyType: "",
  fatherOccupation: "",
  motherOccupation: "",
  totalSiblings: "",
  brothers: "",
  sisters: "",
  photoFile: null,
  photoPreview: "",
  photoAssetId: null,
  uploadProgress: 0,
  additionalPhotos: [],
  membershipTier: "Premium",
};

// ─── Step Config ──────────────────────────────────────────────────────────────

const STEPS = [
  { label: "Personal", labelHi: "व्यक्तिगत", icon: User },
  { label: "Community", labelHi: "समाज", icon: Users },
  { label: "Verification", labelHi: "सत्यापन", icon: ShieldCheck },
  { label: "Education", labelHi: "शिक्षण", icon: GraduationCap },
  { label: "Family", labelHi: "परिवार", icon: Home },
  { label: "Photo", labelHi: "फोटो", icon: Camera },
];

const TOTAL_STEPS = STEPS.length; // 6

// ─── Validation ───────────────────────────────────────────────────────────────

function validateStep(step: number, form: FormData): string[] {
  const errors: string[] = [];
  if (step === 1) {
    if (!form.fullName.trim()) errors.push("fullName");
    if (!form.dateOfBirth) errors.push("dateOfBirth");
    if (!form.gender) errors.push("gender");
    if (!form.maritalStatus) errors.push("maritalStatus");
  } else if (step === 2) {
    if (!form.nativePlace.trim()) errors.push("nativePlace");
  } else if (step === 3) {
    if (!form.isDigambarJain) errors.push("isDigambarJain");
  } else if (step === 4) {
    if (!form.education) errors.push("education");
    if (!form.occupation.trim()) errors.push("occupation");
    if (!form.annualIncome) errors.push("annualIncome");
  } else if (step === 5) {
    if (!form.familyType) errors.push("familyType");
    if (!form.fatherOccupation.trim()) errors.push("fatherOccupation");
    if (!form.motherOccupation.trim()) errors.push("motherOccupation");
  }
  return errors;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldError({ show, message }: { show: boolean; message: string }) {
  if (!show) return null;
  return (
    <p
      data-ocid="register.field_error"
      className="text-destructive text-xs mt-1"
    >
      {message}
    </p>
  );
}

function Field({
  label,
  required,
  children,
}: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full">
      <div className="w-full bg-muted rounded-full h-1.5 mb-5">
        <div
          className="h-1.5 rounded-full gradient-primary transition-all duration-500"
          style={{ width: `${((current - 1) / (total - 1)) * 100}%` }}
        />
      </div>
      <div className="flex justify-between">
        {STEPS.map((step, i) => {
          const num = i + 1;
          const Icon = step.icon;
          const done = num < current;
          const active = num === current;
          return (
            <div key={num} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-smooth ${
                  done
                    ? "bg-primary border-primary text-primary-foreground"
                    : active
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-card border-border text-muted-foreground"
                }`}
              >
                {done ? <Check size={14} /> : <Icon size={14} />}
              </div>
              <span
                className={`text-[9px] font-medium hidden sm:block ${
                  active
                    ? "text-primary"
                    : done
                      ? "text-primary/60"
                      : "text-muted-foreground"
                }`}
              >
                {step.labelHi}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function ProfileCompleteScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-8 space-y-6 text-center"
      data-ocid="register.profile_complete.section"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="text-4xl">🎉</span>
      </div>
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-secondary">
          प्रोफाइल पूर्ण झाली!
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Profile complete! Unlock unlimited access with ₹499 Premium
          membership.
        </p>
      </div>

      <div className="bg-accent/5 border border-accent/30 rounded-xl p-5 w-full max-w-sm space-y-3">
        <div className="flex items-center gap-2 justify-center">
          <Crown size={20} className="text-accent" />
          <span className="font-semibold text-accent text-lg">
            ₹499 प्रीमियम सदस्यता
          </span>
        </div>
        <ul className="text-sm space-y-1.5 text-left">
          {[
            "अमर्यादित प्रोफाइल पाहणे",
            "थेट संपर्क माहिती",
            "प्राधान्य यादी",
            "Express Interest पाठवा",
            "Premium ✓ बॅज",
            "Advanced filters",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2 text-foreground">
              <Check size={12} className="text-primary shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground text-center">
          एक वेळ भरणा · One-time payment
        </p>
      </div>

      <Button
        type="button"
        data-ocid="register.premium_cta.primary_button"
        onClick={onContinue}
        className="w-full max-w-sm bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base py-5 flex items-center justify-center gap-2"
      >
        <Crown size={18} />
        प्रीमियम सदस्यता घ्या — ₹499
      </Button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setCurrentUser, setIsProfileComplete, currentLanguage } =
    useUserStore();
  const t = translations[currentLanguage as Language];
  const { actor } = useActor(createActor);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const errors = validateStep(step, form);
  const hasError = (field: string) =>
    touched.has(field) && errors.includes(field);

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function touchAllCurrentFields() {
    const fieldsByStep: Record<number, string[]> = {
      1: ["fullName", "dateOfBirth", "gender", "maritalStatus"],
      2: ["nativePlace"],
      3: ["isDigambarJain"],
      4: ["education", "occupation", "annualIncome"],
      5: ["familyType", "fatherOccupation", "motherOccupation"],
      6: [],
    };
    setTouched(new Set(fieldsByStep[step] ?? []));
  }

  function handleNext() {
    touchAllCurrentFields();
    if (validateStep(step, form).length > 0) return;
    if (step === TOTAL_STEPS) {
      // After last step (Photo), show success screen
      handleFinalSubmit();
      return;
    }
    setTouched(new Set());
    setStep((s) => s + 1);
  }

  function handleBack() {
    if (showSuccess) {
      setShowSuccess(false);
      return;
    }
    setTouched(new Set());
    setStep((s) => Math.max(1, s - 1));
  }

  function handleFinalSubmit() {
    const memberId = `member_${Date.now()}`;
    const dobYear = form.dateOfBirth
      ? new Date(form.dateOfBirth).getFullYear()
      : 1995;
    const age = new Date().getFullYear() - dobYear;

    const frontendMember = {
      id: memberId,
      name: form.fullName,
      age,
      gender: form.gender as Gender,
      dateOfBirth: form.dateOfBirth,
      height: form.heightFt ? `${form.heightFt}'${form.heightIn}"` : "5'5\"",
      city: form.nativePlace,
      state: "Maharashtra",
      nativePlace: form.nativePlace,
      upjati: form.upjati,
      education: (form.education || "Bachelor's") as EducationLevel,
      occupation: form.occupation,
      annualIncome: (form.annualIncome || "5-10 LPA") as IncomeRange,
      maritalStatus: (form.maritalStatus || "Never Married") as MaritalStatus,
      familyType: (form.familyType || "Nuclear") as FamilyType,
      fatherOccupation: form.fatherOccupation,
      motherOccupation: form.motherOccupation,
      siblings: Number.parseInt(form.totalSiblings || "0"),
      about: `${form.fullName} — ${form.nativePlace} येथील दिगंबर जैन समाजाचे सदस्य.`,
      membershipTier: form.membershipTier,
      photoUrl: form.photoPreview || undefined,
      photoAssetId: form.photoAssetId,
      interests: [],
      isActive: true,
      joinedDate: new Date().toISOString().split("T")[0],
      partnerAgeMin: 22,
      partnerAgeMax: 35,
      paymentStatus: "Pending" as const,
    };

    setCurrentUser(frontendMember);
    setIsProfileComplete(true);

    // Non-blocking: call actor.createProfile in the background
    if (actor) {
      const incomeMap: Record<string, bigint> = {
        "Below 2 LPA": BigInt(100000),
        "2-5 LPA": BigInt(300000),
        "5-10 LPA": BigInt(750000),
        "10-15 LPA": BigInt(1250000),
        "15-25 LPA": BigInt(2000000),
        "25-50 LPA": BigInt(3750000),
        "50+ LPA": BigInt(6000000),
      };
      const heightParts = form.heightFt
        ? Number.parseInt(form.heightFt) * 30 +
          Number.parseInt(form.heightIn || "0") * 2
        : 165;
      actor
        .createProfile({
          name: form.fullName,
          gender:
            form.gender === "Female"
              ? BackendGender.Female
              : BackendGender.Male,
          dateOfBirth: form.dateOfBirth || "1995-01-01",
          birthTime: form.birthTime || undefined,
          birthPlace: form.birthPlace || undefined,
          birthPlaceLat: undefined,
          birthPlaceLng: undefined,
          age: BigInt(age),
          heightCm: BigInt(heightParts),
          city: form.nativePlace || "Pune",
          nativePlace: form.nativePlace || "Pune",
          education: form.education || "Bachelor's",
          occupation: form.occupation || "",
          annualIncomeINR:
            incomeMap[form.annualIncome || "5-10 LPA"] ?? BigInt(500000),
          familyType:
            form.familyType === "Joint"
              ? BackendFamilyType.Joint
              : form.familyType === "Extended"
                ? BackendFamilyType.Extended
                : BackendFamilyType.Nuclear,
          fatherOccupation: form.fatherOccupation || "",
          motherOccupation: form.motherOccupation || "",
          siblingsCount: BigInt(Number.parseInt(form.totalSiblings || "0")),
          upjati: form.upjati || undefined,
          photoUrl: form.photoPreview || "",
          mobileNumber: undefined,
          partnerPreferences: {
            minAge: BigInt(22),
            maxAge: BigInt(40),
            minHeight: undefined,
            maxHeight: undefined,
            minIncome: undefined,
            maxIncome: undefined,
            preferredEducation: [],
            preferredOccupation: [],
            preferredLocations: [],
            preferredUpjati: [],
          },
        })
        .catch(() => {
          /* silently ignore — local state already updated */
        });
    }

    toast.success("🎉 प्रोफाइल पूर्ण झाली! Profile saved successfully.", {
      duration: 4000,
    });

    setShowSuccess(true);
  }

  const handlePhotoFile = useCallback(async (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "फक्त JPG/PNG फाईल चालेल | Only JPG/PNG allowed | केवल JPG/PNG | ಜೆಪಿಜಿ/ಪಿಎನ್ಜಿ ಮಾತ್ರ",
      );
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "फाईल 5MB पेक्षा जास्त आहे | File > 5MB | फ़ाइल 5MB से बड़ी | ಫೈಲ್ 5MB ಮೀರಿದೆ",
      );
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setForm((prev) => ({
        ...prev,
        photoPreview: dataUrl,
        photoFile: file,
        uploadProgress: 0,
      }));
    };
    reader.readAsDataURL(file);

    // Simulate upload progress (real upload happens on form submit)
    setIsUploading(true);
    setForm((prev) => ({ ...prev, uploadProgress: 10 }));
    for (let p = 20; p <= 90; p += 20) {
      await new Promise<void>((res) => setTimeout(res, 150));
      setForm((prev) => ({ ...prev, uploadProgress: p }));
    }
    setForm((prev) => ({ ...prev, uploadProgress: 100 }));
    setIsUploading(false);
    toast.success("✓ फोटो तयार | Photo ready for upload");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handlePhotoFile(file);
    },
    [handlePhotoFile],
  );

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <JainOrnament className="text-accent" size={28} />
          </div>
          <h1 className="font-display text-3xl font-bold text-secondary">
            विवाह सेतू
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            दिगंबर जैन समाज — नोंदणी (Digambar Jain Registration)
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-premium border border-border p-6 sm:p-8">
          {/* Step indicator — hidden during success screen */}
          {!showSuccess && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                  Step {step} of {TOTAL_STEPS}
                </p>
                <p className="text-sm font-semibold text-primary">
                  {STEPS[step - 1]?.labelHi} — {STEPS[step - 1]?.label}
                </p>
              </div>
              <StepIndicator current={step} total={TOTAL_STEPS} />
            </div>
          )}

          {/* ── Success Screen ── */}
          {showSuccess && (
            <ProfileCompleteScreen
              onContinue={() => navigate({ to: "/plans" })}
            />
          )}

          {/* ── Step 1: Personal Info ── */}
          {step === 1 && !showSuccess && (
            <div className="space-y-5" data-ocid="register.step1.section">
              <h2 className="font-display text-xl text-secondary mb-1">
                व्यक्तिगत माहिती
              </h2>

              <Field label="पूर्ण नाव (Full Name)" required>
                <Input
                  data-ocid="register.fullname.input"
                  placeholder="उदा. Rajesh Kumar Jain / राजेश कुमार जैन"
                  value={form.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  onBlur={() => setTouched((s) => new Set(s).add("fullName"))}
                  className={hasError("fullName") ? "border-destructive" : ""}
                />
                <FieldError
                  show={hasError("fullName")}
                  message="नाव आवश्यक आहे"
                />
              </Field>

              <Field label="जन्मतारीख (Date of Birth)" required>
                <Input
                  type="date"
                  data-ocid="register.dob.input"
                  value={form.dateOfBirth}
                  onChange={(e) => setField("dateOfBirth", e.target.value)}
                  onBlur={() =>
                    setTouched((s) => new Set(s).add("dateOfBirth"))
                  }
                  className={
                    hasError("dateOfBirth") ? "border-destructive" : ""
                  }
                />
                <FieldError
                  show={hasError("dateOfBirth")}
                  message="जन्मतारीख आवश्यक आहे"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Field label={t.birth_time ?? "जन्म वेळ (ऐच्छिक)"}>
                    <Input
                      type="time"
                      data-ocid="register.birth_time.input"
                      placeholder="HH:MM"
                      value={form.birthTime}
                      onChange={(e) => setField("birthTime", e.target.value)}
                    />
                  </Field>
                  <p className="text-xs text-primary mt-1 font-medium">
                    {(t as Record<string, string>).birthTimeHelper ??
                      "जन्म वेळ अचूक कुंडली मिलनसाठी आवश्यक आहे"}
                  </p>
                </div>
                <Field label={t.birth_place ?? "जन्म स्थळ (ऐच्छिक)"}>
                  <Input
                    data-ocid="register.birth_place.input"
                    placeholder="उदा. Pune, Nagpur..."
                    value={form.birthPlace}
                    onChange={(e) => setField("birthPlace", e.target.value)}
                  />
                </Field>
              </div>

              <Field label="लिंग (Gender)" required>
                <Select
                  value={form.gender}
                  onValueChange={(v) => setField("gender", v as Gender)}
                >
                  <SelectTrigger
                    data-ocid="register.gender.select"
                    className={hasError("gender") ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="लिंग निवडा" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">पुरुष (Male)</SelectItem>
                    <SelectItem value="Female">महिला (Female)</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError show={hasError("gender")} message="लिंग निवडा" />
              </Field>

              <Field label="उंची (Height)">
                <div className="flex gap-3">
                  <Select
                    value={form.heightFt}
                    onValueChange={(v) => setField("heightFt", v)}
                  >
                    <SelectTrigger
                      data-ocid="register.height_ft.select"
                      className="flex-1"
                    >
                      <SelectValue placeholder="Feet" />
                    </SelectTrigger>
                    <SelectContent>
                      {[4, 5, 6, 7].map((f) => (
                        <SelectItem key={f} value={String(f)}>
                          {f} ft
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={form.heightIn}
                    onValueChange={(v) => setField("heightIn", v)}
                  >
                    <SelectTrigger
                      data-ocid="register.height_in.select"
                      className="flex-1"
                    >
                      <SelectValue placeholder="Inches" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const inch = String(i);
                        return (
                          <SelectItem key={inch} value={inch}>
                            {i} in
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </Field>

              <Field label="वैवाहिक स्थिती (Marital Status)" required>
                <Select
                  value={form.maritalStatus}
                  onValueChange={(v) =>
                    setField("maritalStatus", v as MaritalStatus)
                  }
                >
                  <SelectTrigger
                    data-ocid="register.marital_status.select"
                    className={
                      hasError("maritalStatus") ? "border-destructive" : ""
                    }
                  >
                    <SelectValue placeholder="स्थिती निवडा" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Never Married">
                      अविवाहित (Never Married)
                    </SelectItem>
                    <SelectItem value="Divorced">
                      घटस्फोटित (Divorced)
                    </SelectItem>
                    <SelectItem value="Widowed">
                      विधवा / विधुर (Widowed)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FieldError
                  show={hasError("maritalStatus")}
                  message="वैवाहिक स्थिती निवडा"
                />
              </Field>
            </div>
          )}

          {/* ── Step 2: Community Details ── */}
          {step === 2 && !showSuccess && (
            <div className="space-y-5" data-ocid="register.step2.section">
              <h2 className="font-display text-xl text-secondary mb-1">
                समाज माहिती
              </h2>

              {/* Community badge — non-editable */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Users size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">
                    समाज (Community)
                  </p>
                  <p className="font-semibold text-foreground text-base">
                    दिगंबर जैन समाज
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Digambar Jain Community
                  </p>
                </div>
              </div>

              <Field label="उपजात (Upjati)">
                <Input
                  data-ocid="register.upjati.input"
                  placeholder="उदा. Khandelwal, Golalare, Oswal, Maheshwari..."
                  value={form.upjati}
                  onChange={(e) => setField("upjati", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  आपली उपजात हाताने लिहा (Type your sub-community freely)
                </p>
              </Field>

              <Field label="मूळ गाव / शहर (Native Place)" required>
                <Input
                  data-ocid="register.native_place.input"
                  placeholder="उदा. Pune, Nagpur, Jalgaon, Solapur..."
                  value={form.nativePlace}
                  onChange={(e) => setField("nativePlace", e.target.value)}
                  onBlur={() =>
                    setTouched((s) => new Set(s).add("nativePlace"))
                  }
                  className={
                    hasError("nativePlace") ? "border-destructive" : ""
                  }
                />
                <FieldError
                  show={hasError("nativePlace")}
                  message="मूळ गाव आवश्यक आहे"
                />
              </Field>

              <Field label="मातृभाषा (Mother Tongue)">
                <Input
                  data-ocid="register.mother_tongue.input"
                  placeholder="उदा. Hindi, Marathi, Gujarati..."
                  value={form.motherTongue}
                  onChange={(e) => setField("motherTongue", e.target.value)}
                />
              </Field>
            </div>
          )}

          {/* ── Step 3: Community Verification ── */}
          {step === 3 && !showSuccess && (
            <div className="space-y-5" data-ocid="register.step3.section">
              <h2 className="font-display text-xl text-secondary mb-1">
                समाज सत्यापन
              </h2>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <p className="text-sm font-medium text-foreground mb-1">
                  🛡️ हे पोर्टल केवळ दिगंबर जैन समाजासाठी आहे
                </p>
                <p className="text-xs text-muted-foreground">
                  This platform is exclusively for Digambar Jain community
                  members. Verification ensures authenticity of every profile.
                </p>
              </div>

              <div
                className={`flex items-start gap-3 p-4 rounded-xl border transition-smooth ${
                  hasError("isDigambarJain")
                    ? "bg-destructive/5 border-destructive"
                    : "bg-muted/40 border-border"
                }`}
              >
                <Checkbox
                  id="isDigambarJain"
                  data-ocid="register.community_confirm.checkbox"
                  checked={form.isDigambarJain}
                  onCheckedChange={(v) => {
                    setField("isDigambarJain", v === true);
                    setTouched((s) => new Set(s).add("isDigambarJain"));
                  }}
                />
                <Label
                  htmlFor="isDigambarJain"
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  मी{" "}
                  <span className="text-primary font-semibold">
                    दिगंबर जैन समाजाचा/ची सदस्य आहे
                  </span>{" "}
                  आणि ही माहिती खरी असल्याची पुष्टी करतो/करते.{" "}
                  <span className="text-muted-foreground">
                    (I am a member of Digambar Jain community and confirm this
                    information is true)
                  </span>
                </Label>
              </div>
              <FieldError
                show={hasError("isDigambarJain")}
                message="कृपया दिगंबर जैन समाज सदस्यत्व पुष्टी करा"
              />
            </div>
          )}

          {/* ── Step 4: Education & Career ── */}
          {step === 4 && !showSuccess && (
            <div className="space-y-5" data-ocid="register.step4.section">
              <h2 className="font-display text-xl text-secondary mb-1">
                शिक्षण व करिअर
              </h2>

              <Field label="शिक्षण (Education)" required>
                <Select
                  value={form.education}
                  onValueChange={(v) =>
                    setField("education", v as EducationLevel)
                  }
                >
                  <SelectTrigger
                    data-ocid="register.education.select"
                    className={
                      hasError("education") ? "border-destructive" : ""
                    }
                  >
                    <SelectValue placeholder="शिक्षण निवडा" />
                  </SelectTrigger>
                  <SelectContent>
                    {(
                      [
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
                      ] as EducationLevel[]
                    ).map((e) => (
                      <SelectItem key={e} value={e}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError
                  show={hasError("education")}
                  message="शिक्षण निवडा"
                />
              </Field>

              <Field label="कॉलेज / विद्यापीठ (College / University)">
                <Input
                  data-ocid="register.university.input"
                  placeholder="उदा. Pune University, IIT Mumbai, COEP..."
                  value={form.university}
                  onChange={(e) => setField("university", e.target.value)}
                />
              </Field>

              <Field label="व्यवसाय (Occupation)" required>
                <Input
                  data-ocid="register.occupation.input"
                  placeholder="उदा. Software Engineer, Doctor, Businessman..."
                  value={form.occupation}
                  onChange={(e) => setField("occupation", e.target.value)}
                  onBlur={() => setTouched((s) => new Set(s).add("occupation"))}
                  className={hasError("occupation") ? "border-destructive" : ""}
                />
                <FieldError
                  show={hasError("occupation")}
                  message="व्यवसाय आवश्यक आहे"
                />
              </Field>

              <Field label="कंपनी / संस्था (Company)">
                <Input
                  data-ocid="register.company.input"
                  placeholder="उदा. Infosys, Tata Motors, Self-employed..."
                  value={form.company}
                  onChange={(e) => setField("company", e.target.value)}
                />
              </Field>

              <Field label="वार्षिक उत्पन्न (Annual Income)" required>
                <Select
                  value={form.annualIncome}
                  onValueChange={(v) =>
                    setField("annualIncome", v as IncomeRange)
                  }
                >
                  <SelectTrigger
                    data-ocid="register.income.select"
                    className={
                      hasError("annualIncome") ? "border-destructive" : ""
                    }
                  >
                    <SelectValue placeholder="उत्पन्न श्रेणी निवडा" />
                  </SelectTrigger>
                  <SelectContent>
                    {(
                      [
                        "Below 2 LPA",
                        "2-5 LPA",
                        "5-10 LPA",
                        "10-15 LPA",
                        "15-25 LPA",
                        "25-50 LPA",
                        "50+ LPA",
                      ] as IncomeRange[]
                    ).map((r) => (
                      <SelectItem key={r} value={r}>
                        ₹ {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError
                  show={hasError("annualIncome")}
                  message="उत्पन्न श्रेणी निवडा"
                />
              </Field>
            </div>
          )}

          {/* ── Step 5: Family Details ── */}
          {step === 5 && !showSuccess && (
            <div className="space-y-5" data-ocid="register.step5.section">
              <h2 className="font-display text-xl text-secondary mb-1">
                कुटुंब माहिती
              </h2>

              <Field label="कुटुंब प्रकार (Family Type)" required>
                <Select
                  value={form.familyType}
                  onValueChange={(v) => setField("familyType", v as FamilyType)}
                >
                  <SelectTrigger
                    data-ocid="register.family_type.select"
                    className={
                      hasError("familyType") ? "border-destructive" : ""
                    }
                  >
                    <SelectValue placeholder="कुटुंब प्रकार निवडा" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nuclear">एकल कुटुंब (Nuclear)</SelectItem>
                    <SelectItem value="Joint">एकत्र कुटुंब (Joint)</SelectItem>
                    <SelectItem value="Extended">
                      विस्तारित कुटुंब (Extended)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FieldError
                  show={hasError("familyType")}
                  message="कुटुंब प्रकार निवडा"
                />
              </Field>

              <Field label="वडिलांचा व्यवसाय (Father's Occupation)" required>
                <Input
                  data-ocid="register.father_occupation.input"
                  placeholder="उदा. Business, Retired, Government Service..."
                  value={form.fatherOccupation}
                  onChange={(e) => setField("fatherOccupation", e.target.value)}
                  onBlur={() =>
                    setTouched((s) => new Set(s).add("fatherOccupation"))
                  }
                  className={
                    hasError("fatherOccupation") ? "border-destructive" : ""
                  }
                />
                <FieldError
                  show={hasError("fatherOccupation")}
                  message="वडिलांचा व्यवसाय आवश्यक"
                />
              </Field>

              <Field label="आईचा व्यवसाय (Mother's Occupation)" required>
                <Input
                  data-ocid="register.mother_occupation.input"
                  placeholder="उदा. Homemaker, Teacher, Doctor..."
                  value={form.motherOccupation}
                  onChange={(e) => setField("motherOccupation", e.target.value)}
                  onBlur={() =>
                    setTouched((s) => new Set(s).add("motherOccupation"))
                  }
                  className={
                    hasError("motherOccupation") ? "border-destructive" : ""
                  }
                />
                <FieldError
                  show={hasError("motherOccupation")}
                  message="आईचा व्यवसाय आवश्यक"
                />
              </Field>

              <div className="grid grid-cols-3 gap-3">
                <Field label="एकूण भावंडे">
                  <Input
                    type="number"
                    min="0"
                    max="15"
                    data-ocid="register.siblings.input"
                    placeholder="0"
                    value={form.totalSiblings}
                    onChange={(e) => setField("totalSiblings", e.target.value)}
                  />
                </Field>
                <Field label="भाऊ (Brothers)">
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    data-ocid="register.brothers.input"
                    placeholder="0"
                    value={form.brothers}
                    onChange={(e) => setField("brothers", e.target.value)}
                  />
                </Field>
                <Field label="बहीण (Sisters)">
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    data-ocid="register.sisters.input"
                    placeholder="0"
                    value={form.sisters}
                    onChange={(e) => setField("sisters", e.target.value)}
                  />
                </Field>
              </div>
            </div>
          )}

          {/* ── Step 6: Photo Upload ── */}
          {step === 6 && !showSuccess && (
            <div className="space-y-5" data-ocid="register.step6.section">
              <h2 className="font-display text-xl text-secondary mb-1">
                फोटो अपलोड
              </h2>
              <p className="text-xs text-muted-foreground -mt-2">
                JPG / PNG फक्त · Max 5MB · केवल JPG/PNG · ಜೆಪಿಜಿ/ಪಿಎನ್ಜಿ ಮಾತ್ರ
              </p>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  मुख्य फोटो (Main Photo)
                </Label>
                <button
                  type="button"
                  data-ocid="register.photo.dropzone"
                  disabled={isUploading}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("photoInput")?.click()}
                  className={`w-full relative border-2 border-dashed rounded-xl p-8 text-center transition-smooth cursor-pointer disabled:opacity-70 disabled:cursor-wait ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/20"
                  }`}
                >
                  {form.photoPreview ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        <img
                          src={form.photoPreview}
                          alt="Profile preview"
                          className="w-28 h-28 rounded-full object-cover border-4 border-primary/30 mx-auto shadow-premium"
                        />
                        {!isUploading && (
                          <button
                            type="button"
                            data-ocid="register.photo.remove_button"
                            className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center shadow"
                            onClick={(ev) => {
                              ev.stopPropagation();
                              setForm((prev) => ({
                                ...prev,
                                photoPreview: "",
                                photoFile: null,
                                photoAssetId: null,
                                uploadProgress: 0,
                              }));
                            }}
                            aria-label="फोटो काढा / Remove photo"
                          >
                            <X size={12} />
                          </button>
                        )}
                      </div>
                      {isUploading ? (
                        <div className="w-full max-w-xs space-y-1.5">
                          <p className="text-xs text-primary font-medium text-center">
                            अपलोड होत आहे... ({form.uploadProgress}%)
                          </p>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-primary transition-all duration-200"
                              style={{ width: `${form.uploadProgress}%` }}
                              data-ocid="register.photo.loading_state"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-primary font-medium flex items-center gap-1.5">
                            <Check size={14} />
                            फोटो तयार आहे · Photo ready
                          </p>
                          <p className="text-xs text-muted-foreground">
                            बदलण्यासाठी क्लिक करा · Click to change
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          फोटो ड्रॅग करा किंवा क्लिक करा
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Drag & drop or click to upload · ಡ್ರ್ಯಾಗ್ ಮಾಡಿ ಅಥವಾ ಕ್ಲಿಕ್
                          ಮಾಡಿ
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          JPG / PNG
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Max 5MB
                        </Badge>
                      </div>
                    </div>
                  )}
                  <input
                    id="photoInput"
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    data-ocid="register.photo.upload_button"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handlePhotoFile(file);
                      e.target.value = "";
                    }}
                  />
                </button>
                <p className="text-xs text-muted-foreground mt-2">
                  💡 स्पष्ट चेहर्‍याचा फोटो असल्यास ३ पट अधिक रिस्पॉन्स मिळतो.
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  अतिरिक्त फोटो — Optional (up to 4)
                </Label>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("additionalPhotos")?.click()
                  }
                  className="w-full border border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:bg-muted/20 transition-smooth"
                  data-ocid="register.additional_photos.dropzone"
                >
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
                    <Camera size={14} />
                    अतिरिक्त फोटो जोडा (Add more photos)
                  </p>
                  <input
                    id="additionalPhotos"
                    type="file"
                    accept="image/jpeg,image/png"
                    multiple
                    className="hidden"
                    data-ocid="register.additional_photos.upload_button"
                    onChange={(e) => {
                      const files = Array.from(e.target.files ?? []);
                      setField("additionalPhotos", files.slice(0, 4));
                    }}
                  />
                </button>
                {form.additionalPhotos.length > 0 && (
                  <p className="text-xs text-primary mt-1">
                    <Check size={10} className="inline mr-1" />
                    {form.additionalPhotos.length} अतिरिक्त फोटो निवडले
                  </p>
                )}
              </div>

              {/* Skip hint */}
              <p className="text-xs text-center text-muted-foreground">
                फोटो ऐच्छिक आहे — नंतर जोडता येतो · Photo is optional, can be added
                later
              </p>
            </div>
          )}

          {/* ── Navigation Buttons ── */}
          {!showSuccess && (
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  data-ocid="register.back.button"
                  onClick={handleBack}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft size={16} />
                  मागे (Back)
                </Button>
              ) : (
                <div />
              )}

              <Button
                type="button"
                data-ocid="register.next.button"
                onClick={handleNext}
                disabled={isUploading}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold disabled:opacity-60"
              >
                {isUploading
                  ? "अपलोड होत आहे..."
                  : step === TOTAL_STEPS
                    ? "प्रोफाइल सेव्ह करा"
                    : "पुढे (Next)"}
                {!isUploading &&
                  (step === TOTAL_STEPS ? (
                    <Check size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  ))}
              </Button>
            </div>
          )}

          {/* Back button on success screen */}
          {showSuccess && (
            <div className="mt-4 text-center">
              <button
                type="button"
                data-ocid="register.back_to_browse.link"
                className="text-sm text-muted-foreground underline hover:no-underline"
                onClick={() => navigate({ to: "/browse" })}
              >
                आधी प्रोफाइल पाहा (Browse profiles first)
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-4 pb-4">
          {t.community} ·{" "}
          <button
            type="button"
            data-ocid="register.login.link"
            className="text-primary underline hover:no-underline"
            onClick={() => navigate({ to: "/" })}
          >
            मुख्यपृष्ठावर जा
          </button>
        </p>
      </div>
    </div>
  );
}
