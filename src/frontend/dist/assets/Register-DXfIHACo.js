import { d as createLucideIcon, r as reactExports, j as jsxRuntimeExports, k as useComposedRefs, l as cn, e as useNavigate, f as useUserStore, g as useActor, a as JainOrnament, t as translations, X, B as Badge, b as Button, F as FamilyType, G as Gender, C as Crown, h as createActor } from "./index-CkCNqozh.js";
import { P as Primitive, u as useControllableState, c as composeEventHandlers, a as createContextScope } from "./Combination-BMMvFAE9.js";
import { u as usePrevious, a as useSize } from "./index-BJGIhklg.js";
import { P as Presence } from "./index-C49Lig9R.js";
import { C as Check, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-U2a700E-.js";
import { I as Input } from "./input-GQzGS8vR.js";
import { L as Label } from "./label-D8rR7I0u.js";
import { u as ue } from "./index-Blqxl4xO.js";
import { U as User } from "./user-B_vlDFlY.js";
import { U as Users } from "./users-I61Bioj6.js";
import { S as ShieldCheck } from "./shield-check-BTxvbtrM.js";
import { G as GraduationCap } from "./graduation-cap-Ck9csJB0.js";
import { H as House } from "./house-CNj4sAKF.js";
import { C as Camera } from "./camera-Bijeno3g.js";
import { U as Upload } from "./upload-aS-DvHO4.js";
import { C as ChevronRight } from "./chevron-right-Cn4b47xN.js";
import "./index-YQgpYIn2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode);
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
const INITIAL_FORM = {
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
  membershipTier: "Premium"
};
const STEPS = [
  { label: "Personal", labelHi: "व्यक्तिगत", icon: User },
  { label: "Community", labelHi: "समाज", icon: Users },
  { label: "Verification", labelHi: "सत्यापन", icon: ShieldCheck },
  { label: "Education", labelHi: "शिक्षण", icon: GraduationCap },
  { label: "Family", labelHi: "परिवार", icon: House },
  { label: "Photo", labelHi: "फोटो", icon: Camera }
];
const TOTAL_STEPS = STEPS.length;
function validateStep(step, form) {
  const errors = [];
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
function FieldError({ show, message }) {
  if (!show) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "p",
    {
      "data-ocid": "register.field_error",
      className: "text-destructive text-xs mt-1",
      children: message
    }
  );
}
function Field({
  label,
  required,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium", children: [
      label,
      " ",
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    children
  ] });
}
function StepIndicator({ current, total }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-1.5 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-1.5 rounded-full gradient-primary transition-all duration-500",
        style: { width: `${(current - 1) / (total - 1) * 100}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between", children: STEPS.map((step, i) => {
      const num = i + 1;
      const Icon = step.icon;
      const done = num < current;
      const active = num === current;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-8 h-8 rounded-full flex items-center justify-center border-2 transition-smooth ${done ? "bg-primary border-primary text-primary-foreground" : active ? "bg-primary/10 border-primary text-primary" : "bg-card border-border text-muted-foreground"}`,
            children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-[9px] font-medium hidden sm:block ${active ? "text-primary" : done ? "text-primary/60" : "text-muted-foreground"}`,
            children: step.labelHi
          }
        )
      ] }, num);
    }) })
  ] });
}
function ProfileCompleteScreen({ onContinue }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-8 space-y-6 text-center",
      "data-ocid": "register.profile_complete.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🎉" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-secondary", children: "प्रोफाइल पूर्ण झाली!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mx-auto", children: "Profile complete! Unlock unlimited access with ₹499 Premium membership." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/5 border border-accent/30 rounded-xl p-5 w-full max-w-sm space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 20, className: "text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-accent text-lg", children: "₹499 प्रीमियम सदस्यता" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-sm space-y-1.5 text-left", children: [
            "अमर्यादित प्रोफाइल पाहणे",
            "थेट संपर्क माहिती",
            "प्राधान्य यादी",
            "Express Interest पाठवा",
            "Premium ✓ बॅज",
            "Advanced filters"
          ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12, className: "text-primary shrink-0" }),
            f
          ] }, f)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "एक वेळ भरणा · One-time payment" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "register.premium_cta.primary_button",
            onClick: onContinue,
            className: "w-full max-w-sm bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base py-5 flex items-center justify-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 18 }),
              "प्रीमियम सदस्यता घ्या — ₹499"
            ]
          }
        )
      ]
    }
  );
}
function RegisterPage() {
  var _a, _b;
  const navigate = useNavigate();
  const { setCurrentUser, setIsProfileComplete, currentLanguage } = useUserStore();
  const t = translations[currentLanguage];
  const { actor } = useActor(createActor);
  const [step, setStep] = reactExports.useState(1);
  const [form, setForm] = reactExports.useState(INITIAL_FORM);
  const [touched, setTouched] = reactExports.useState(/* @__PURE__ */ new Set());
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [showSuccess, setShowSuccess] = reactExports.useState(false);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const errors = validateStep(step, form);
  const hasError = (field) => touched.has(field) && errors.includes(field);
  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
  function touchAllCurrentFields() {
    const fieldsByStep = {
      1: ["fullName", "dateOfBirth", "gender", "maritalStatus"],
      2: ["nativePlace"],
      3: ["isDigambarJain"],
      4: ["education", "occupation", "annualIncome"],
      5: ["familyType", "fatherOccupation", "motherOccupation"],
      6: []
    };
    setTouched(new Set(fieldsByStep[step] ?? []));
  }
  function handleNext() {
    touchAllCurrentFields();
    if (validateStep(step, form).length > 0) return;
    if (step === TOTAL_STEPS) {
      handleFinalSubmit();
      return;
    }
    setTouched(/* @__PURE__ */ new Set());
    setStep((s) => s + 1);
  }
  function handleBack() {
    if (showSuccess) {
      setShowSuccess(false);
      return;
    }
    setTouched(/* @__PURE__ */ new Set());
    setStep((s) => Math.max(1, s - 1));
  }
  function handleFinalSubmit() {
    const memberId = `member_${Date.now()}`;
    const dobYear = form.dateOfBirth ? new Date(form.dateOfBirth).getFullYear() : 1995;
    const age = (/* @__PURE__ */ new Date()).getFullYear() - dobYear;
    const frontendMember = {
      id: memberId,
      name: form.fullName,
      age,
      gender: form.gender,
      dateOfBirth: form.dateOfBirth,
      height: form.heightFt ? `${form.heightFt}'${form.heightIn}"` : `5'5"`,
      city: form.nativePlace,
      state: "Maharashtra",
      nativePlace: form.nativePlace,
      upjati: form.upjati,
      education: form.education || "Bachelor's",
      occupation: form.occupation,
      annualIncome: form.annualIncome || "5-10 LPA",
      maritalStatus: form.maritalStatus || "Never Married",
      familyType: form.familyType || "Nuclear",
      fatherOccupation: form.fatherOccupation,
      motherOccupation: form.motherOccupation,
      siblings: Number.parseInt(form.totalSiblings || "0"),
      about: `${form.fullName} — ${form.nativePlace} येथील दिगंबर जैन समाजाचे सदस्य.`,
      membershipTier: form.membershipTier,
      photoUrl: form.photoPreview || void 0,
      photoAssetId: form.photoAssetId,
      interests: [],
      isActive: true,
      joinedDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      partnerAgeMin: 22,
      partnerAgeMax: 35,
      paymentStatus: "Pending"
    };
    setCurrentUser(frontendMember);
    setIsProfileComplete(true);
    if (actor) {
      const incomeMap = {
        "Below 2 LPA": BigInt(1e5),
        "2-5 LPA": BigInt(3e5),
        "5-10 LPA": BigInt(75e4),
        "10-15 LPA": BigInt(125e4),
        "15-25 LPA": BigInt(2e6),
        "25-50 LPA": BigInt(375e4),
        "50+ LPA": BigInt(6e6)
      };
      const heightParts = form.heightFt ? Number.parseInt(form.heightFt) * 30 + Number.parseInt(form.heightIn || "0") * 2 : 165;
      actor.createProfile({
        name: form.fullName,
        gender: form.gender === "Female" ? Gender.Female : Gender.Male,
        dateOfBirth: form.dateOfBirth || "1995-01-01",
        birthTime: form.birthTime || void 0,
        birthPlace: form.birthPlace || void 0,
        birthPlaceLat: void 0,
        birthPlaceLng: void 0,
        age: BigInt(age),
        heightCm: BigInt(heightParts),
        city: form.nativePlace || "Pune",
        nativePlace: form.nativePlace || "Pune",
        education: form.education || "Bachelor's",
        occupation: form.occupation || "",
        annualIncomeINR: incomeMap[form.annualIncome || "5-10 LPA"] ?? BigInt(5e5),
        familyType: form.familyType === "Joint" ? FamilyType.Joint : form.familyType === "Extended" ? FamilyType.Extended : FamilyType.Nuclear,
        fatherOccupation: form.fatherOccupation || "",
        motherOccupation: form.motherOccupation || "",
        siblingsCount: BigInt(Number.parseInt(form.totalSiblings || "0")),
        upjati: form.upjati || void 0,
        photoUrl: form.photoPreview || "",
        mobileNumber: void 0,
        partnerPreferences: {
          minAge: BigInt(22),
          maxAge: BigInt(40),
          minHeight: void 0,
          maxHeight: void 0,
          minIncome: void 0,
          maxIncome: void 0,
          preferredEducation: [],
          preferredOccupation: [],
          preferredLocations: [],
          preferredUpjati: []
        }
      }).catch(() => {
      });
    }
    ue.success("🎉 प्रोफाइल पूर्ण झाली! Profile saved successfully.", {
      duration: 4e3
    });
    setShowSuccess(true);
  }
  const handlePhotoFile = reactExports.useCallback(async (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      ue.error(
        "फक्त JPG/PNG फाईल चालेल | Only JPG/PNG allowed | केवल JPG/PNG | ಜೆಪಿಜಿ/ಪಿಎನ್ಜಿ ಮಾತ್ರ"
      );
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      ue.error(
        "फाईल 5MB पेक्षा जास्त आहे | File > 5MB | फ़ाइल 5MB से बड़ी | ಫೈಲ್ 5MB ಮೀರಿದೆ"
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a2;
      const dataUrl = (_a2 = e.target) == null ? void 0 : _a2.result;
      setForm((prev) => ({
        ...prev,
        photoPreview: dataUrl,
        photoFile: file,
        uploadProgress: 0
      }));
    };
    reader.readAsDataURL(file);
    setIsUploading(true);
    setForm((prev) => ({ ...prev, uploadProgress: 10 }));
    for (let p = 20; p <= 90; p += 20) {
      await new Promise((res) => setTimeout(res, 150));
      setForm((prev) => ({ ...prev, uploadProgress: p }));
    }
    setForm((prev) => ({ ...prev, uploadProgress: 100 }));
    setIsUploading(false);
    ue.success("✓ फोटो तयार | Photo ready for upload");
  }, []);
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handlePhotoFile(file);
    },
    [handlePhotoFile]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background py-8 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JainOrnament, { className: "text-accent", size: 28 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-secondary", children: "विवाह सेतू" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "दिगंबर जैन समाज — नोंदणी (Digambar Jain Registration)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-premium border border-border p-6 sm:p-8", children: [
      !showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-medium", children: [
            "Step ",
            step,
            " of ",
            TOTAL_STEPS
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-primary", children: [
            (_a = STEPS[step - 1]) == null ? void 0 : _a.labelHi,
            " — ",
            (_b = STEPS[step - 1]) == null ? void 0 : _b.label
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step, total: TOTAL_STEPS })
      ] }),
      showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProfileCompleteScreen,
        {
          onContinue: () => navigate({ to: "/plans" })
        }
      ),
      step === 1 && !showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "register.step1.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-secondary mb-1", children: "व्यक्तिगत माहिती" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "पूर्ण नाव (Full Name)", required: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "register.fullname.input",
              placeholder: "उदा. Rajesh Kumar Jain / राजेश कुमार जैन",
              value: form.fullName,
              onChange: (e) => setField("fullName", e.target.value),
              onBlur: () => setTouched((s) => new Set(s).add("fullName")),
              className: hasError("fullName") ? "border-destructive" : ""
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldError,
            {
              show: hasError("fullName"),
              message: "नाव आवश्यक आहे"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "जन्मतारीख (Date of Birth)", required: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              "data-ocid": "register.dob.input",
              value: form.dateOfBirth,
              onChange: (e) => setField("dateOfBirth", e.target.value),
              onBlur: () => setTouched((s) => new Set(s).add("dateOfBirth")),
              className: hasError("dateOfBirth") ? "border-destructive" : ""
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldError,
            {
              show: hasError("dateOfBirth"),
              message: "जन्मतारीख आवश्यक आहे"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t.birth_time ?? "जन्म वेळ (ऐच्छिक)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "time",
                "data-ocid": "register.birth_time.input",
                placeholder: "HH:MM",
                value: form.birthTime,
                onChange: (e) => setField("birthTime", e.target.value)
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary mt-1 font-medium", children: t.birthTimeHelper ?? "जन्म वेळ अचूक कुंडली मिलनसाठी आवश्यक आहे" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t.birth_place ?? "जन्म स्थळ (ऐच्छिक)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "register.birth_place.input",
              placeholder: "उदा. Pune, Nagpur...",
              value: form.birthPlace,
              onChange: (e) => setField("birthPlace", e.target.value)
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "लिंग (Gender)", required: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.gender,
              onValueChange: (v) => setField("gender", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    "data-ocid": "register.gender.select",
                    className: hasError("gender") ? "border-destructive" : "",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "लिंग निवडा" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Male", children: "पुरुष (Male)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Female", children: "महिला (Female)" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { show: hasError("gender"), message: "लिंग निवडा" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "उंची (Height)", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.heightFt,
              onValueChange: (v) => setField("heightFt", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    "data-ocid": "register.height_ft.select",
                    className: "flex-1",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Feet" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [4, 5, 6, 7].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(f), children: [
                  f,
                  " ft"
                ] }, f)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.heightIn,
              onValueChange: (v) => setField("heightIn", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    "data-ocid": "register.height_in.select",
                    className: "flex-1",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Inches" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Array.from({ length: 12 }, (_, i) => {
                  const inch = String(i);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: inch, children: [
                    i,
                    " in"
                  ] }, inch);
                }) })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "वैवाहिक स्थिती (Marital Status)", required: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.maritalStatus,
              onValueChange: (v) => setField("maritalStatus", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    "data-ocid": "register.marital_status.select",
                    className: hasError("maritalStatus") ? "border-destructive" : "",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "स्थिती निवडा" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Never Married", children: "अविवाहित (Never Married)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Divorced", children: "घटस्फोटित (Divorced)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Widowed", children: "विधवा / विधुर (Widowed)" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldError,
            {
              show: hasError("maritalStatus"),
              message: "वैवाहिक स्थिती निवडा"
            }
          )
        ] })
      ] }),
      step === 2 && !showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "register.step2.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-secondary mb-1", children: "समाज माहिती" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 18, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5", children: "समाज (Community)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base", children: "दिगंबर जैन समाज" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Digambar Jain Community" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "उपजात (Upjati)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "register.upjati.input",
              placeholder: "उदा. Khandelwal, Golalare, Oswal, Maheshwari...",
              value: form.upjati,
              onChange: (e) => setField("upjati", e.target.value)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "आपली उपजात हाताने लिहा (Type your sub-community freely)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "मूळ गाव / शहर (Native Place)", required: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "register.native_place.input",
              placeholder: "उदा. Pune, Nagpur, Jalgaon, Solapur...",
              value: form.nativePlace,
              onChange: (e) => setField("nativePlace", e.target.value),
              onBlur: () => setTouched((s) => new Set(s).add("nativePlace")),
              className: hasError("nativePlace") ? "border-destructive" : ""
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldError,
            {
              show: hasError("nativePlace"),
              message: "मूळ गाव आवश्यक आहे"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "मातृभाषा (Mother Tongue)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "register.mother_tongue.input",
            placeholder: "उदा. Hindi, Marathi, Gujarati...",
            value: form.motherTongue,
            onChange: (e) => setField("motherTongue", e.target.value)
          }
        ) })
      ] }),
      step === 3 && !showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "register.step3.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-secondary mb-1", children: "समाज सत्यापन" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "🛡️ हे पोर्टल केवळ दिगंबर जैन समाजासाठी आहे" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This platform is exclusively for Digambar Jain community members. Verification ensures authenticity of every profile." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-start gap-3 p-4 rounded-xl border transition-smooth ${hasError("isDigambarJain") ? "bg-destructive/5 border-destructive" : "bg-muted/40 border-border"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: "isDigambarJain",
                  "data-ocid": "register.community_confirm.checkbox",
                  checked: form.isDigambarJain,
                  onCheckedChange: (v) => {
                    setField("isDigambarJain", v === true);
                    setTouched((s) => new Set(s).add("isDigambarJain"));
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "isDigambarJain",
                  className: "text-sm leading-relaxed cursor-pointer",
                  children: [
                    "मी",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "दिगंबर जैन समाजाचा/ची सदस्य आहे" }),
                    " ",
                    "आणि ही माहिती खरी असल्याची पुष्टी करतो/करते.",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(I am a member of Digambar Jain community and confirm this information is true)" })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldError,
          {
            show: hasError("isDigambarJain"),
            message: "कृपया दिगंबर जैन समाज सदस्यत्व पुष्टी करा"
          }
        )
      ] }),
      step === 4 && !showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "register.step4.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-secondary mb-1", children: "शिक्षण व करिअर" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "शिक्षण (Education)", required: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.education,
              onValueChange: (v) => setField("education", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    "data-ocid": "register.education.select",
                    className: hasError("education") ? "border-destructive" : "",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "शिक्षण निवडा" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [
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
                ].map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: e, children: e }, e)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldError,
            {
              show: hasError("education"),
              message: "शिक्षण निवडा"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "कॉलेज / विद्यापीठ (College / University)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "register.university.input",
            placeholder: "उदा. Pune University, IIT Mumbai, COEP...",
            value: form.university,
            onChange: (e) => setField("university", e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "व्यवसाय (Occupation)", required: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "register.occupation.input",
              placeholder: "उदा. Software Engineer, Doctor, Businessman...",
              value: form.occupation,
              onChange: (e) => setField("occupation", e.target.value),
              onBlur: () => setTouched((s) => new Set(s).add("occupation")),
              className: hasError("occupation") ? "border-destructive" : ""
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldError,
            {
              show: hasError("occupation"),
              message: "व्यवसाय आवश्यक आहे"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "कंपनी / संस्था (Company)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "register.company.input",
            placeholder: "उदा. Infosys, Tata Motors, Self-employed...",
            value: form.company,
            onChange: (e) => setField("company", e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "वार्षिक उत्पन्न (Annual Income)", required: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.annualIncome,
              onValueChange: (v) => setField("annualIncome", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    "data-ocid": "register.income.select",
                    className: hasError("annualIncome") ? "border-destructive" : "",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "उत्पन्न श्रेणी निवडा" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [
                  "Below 2 LPA",
                  "2-5 LPA",
                  "5-10 LPA",
                  "10-15 LPA",
                  "15-25 LPA",
                  "25-50 LPA",
                  "50+ LPA"
                ].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: r, children: [
                  "₹ ",
                  r
                ] }, r)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldError,
            {
              show: hasError("annualIncome"),
              message: "उत्पन्न श्रेणी निवडा"
            }
          )
        ] })
      ] }),
      step === 5 && !showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "register.step5.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-secondary mb-1", children: "कुटुंब माहिती" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "कुटुंब प्रकार (Family Type)", required: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.familyType,
              onValueChange: (v) => setField("familyType", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    "data-ocid": "register.family_type.select",
                    className: hasError("familyType") ? "border-destructive" : "",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "कुटुंब प्रकार निवडा" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Nuclear", children: "एकल कुटुंब (Nuclear)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Joint", children: "एकत्र कुटुंब (Joint)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Extended", children: "विस्तारित कुटुंब (Extended)" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldError,
            {
              show: hasError("familyType"),
              message: "कुटुंब प्रकार निवडा"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "वडिलांचा व्यवसाय (Father's Occupation)", required: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "register.father_occupation.input",
              placeholder: "उदा. Business, Retired, Government Service...",
              value: form.fatherOccupation,
              onChange: (e) => setField("fatherOccupation", e.target.value),
              onBlur: () => setTouched((s) => new Set(s).add("fatherOccupation")),
              className: hasError("fatherOccupation") ? "border-destructive" : ""
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldError,
            {
              show: hasError("fatherOccupation"),
              message: "वडिलांचा व्यवसाय आवश्यक"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "आईचा व्यवसाय (Mother's Occupation)", required: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "register.mother_occupation.input",
              placeholder: "उदा. Homemaker, Teacher, Doctor...",
              value: form.motherOccupation,
              onChange: (e) => setField("motherOccupation", e.target.value),
              onBlur: () => setTouched((s) => new Set(s).add("motherOccupation")),
              className: hasError("motherOccupation") ? "border-destructive" : ""
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldError,
            {
              show: hasError("motherOccupation"),
              message: "आईचा व्यवसाय आवश्यक"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "एकूण भावंडे", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              max: "15",
              "data-ocid": "register.siblings.input",
              placeholder: "0",
              value: form.totalSiblings,
              onChange: (e) => setField("totalSiblings", e.target.value)
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "भाऊ (Brothers)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              max: "10",
              "data-ocid": "register.brothers.input",
              placeholder: "0",
              value: form.brothers,
              onChange: (e) => setField("brothers", e.target.value)
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "बहीण (Sisters)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              max: "10",
              "data-ocid": "register.sisters.input",
              placeholder: "0",
              value: form.sisters,
              onChange: (e) => setField("sisters", e.target.value)
            }
          ) })
        ] })
      ] }),
      step === 6 && !showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "register.step6.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-secondary mb-1", children: "फोटो अपलोड" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground -mt-2", children: "JPG / PNG फक्त · Max 5MB · केवल JPG/PNG · ಜೆಪಿಜಿ/ಪಿಎನ್ಜಿ ಮಾತ್ರ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium mb-2 block", children: "मुख्य फोटो (Main Photo)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "register.photo.dropzone",
              disabled: isUploading,
              onDragOver: (e) => {
                e.preventDefault();
                setIsDragging(true);
              },
              onDragLeave: () => setIsDragging(false),
              onDrop: handleDrop,
              onClick: () => {
                var _a2;
                return (_a2 = document.getElementById("photoInput")) == null ? void 0 : _a2.click();
              },
              className: `w-full relative border-2 border-dashed rounded-xl p-8 text-center transition-smooth cursor-pointer disabled:opacity-70 disabled:cursor-wait ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/20"}`,
              children: [
                form.photoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: form.photoPreview,
                        alt: "Profile preview",
                        className: "w-28 h-28 rounded-full object-cover border-4 border-primary/30 mx-auto shadow-premium"
                      }
                    ),
                    !isUploading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "register.photo.remove_button",
                        className: "absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center shadow",
                        onClick: (ev) => {
                          ev.stopPropagation();
                          setForm((prev) => ({
                            ...prev,
                            photoPreview: "",
                            photoFile: null,
                            photoAssetId: null,
                            uploadProgress: 0
                          }));
                        },
                        "aria-label": "फोटो काढा / Remove photo",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 })
                      }
                    )
                  ] }),
                  isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xs space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary font-medium text-center", children: [
                      "अपलोड होत आहे... (",
                      form.uploadProgress,
                      "%)"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-2 rounded-full bg-primary transition-all duration-200",
                        style: { width: `${form.uploadProgress}%` },
                        "data-ocid": "register.photo.loading_state"
                      }
                    ) })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-primary font-medium flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }),
                      "फोटो तयार आहे · Photo ready"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "बदलण्यासाठी क्लिक करा · Click to change" })
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 24, className: "text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "फोटो ड्रॅग करा किंवा क्लिक करा" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Drag & drop or click to upload · ಡ್ರ್ಯಾಗ್ ಮಾಡಿ ಅಥವಾ ಕ್ಲಿಕ್ ಮಾಡಿ" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "JPG / PNG" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Max 5MB" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "photoInput",
                    type: "file",
                    accept: "image/jpeg,image/png",
                    className: "hidden",
                    "data-ocid": "register.photo.upload_button",
                    onChange: (e) => {
                      var _a2;
                      const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
                      if (file) handlePhotoFile(file);
                      e.target.value = "";
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "💡 स्पष्ट चेहर्‍याचा फोटो असल्यास ३ पट अधिक रिस्पॉन्स मिळतो." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium mb-2 block", children: "अतिरिक्त फोटो — Optional (up to 4)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                var _a2;
                return (_a2 = document.getElementById("additionalPhotos")) == null ? void 0 : _a2.click();
              },
              className: "w-full border border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:bg-muted/20 transition-smooth",
              "data-ocid": "register.additional_photos.dropzone",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center justify-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 14 }),
                  "अतिरिक्त फोटो जोडा (Add more photos)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "additionalPhotos",
                    type: "file",
                    accept: "image/jpeg,image/png",
                    multiple: true,
                    className: "hidden",
                    "data-ocid": "register.additional_photos.upload_button",
                    onChange: (e) => {
                      const files = Array.from(e.target.files ?? []);
                      setField("additionalPhotos", files.slice(0, 4));
                    }
                  }
                )
              ]
            }
          ),
          form.additionalPhotos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 10, className: "inline mr-1" }),
            form.additionalPhotos.length,
            " अतिरिक्त फोटो निवडले"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "फोटो ऐच्छिक आहे — नंतर जोडता येतो · Photo is optional, can be added later" })
      ] }),
      !showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-8 pt-5 border-t border-border", children: [
        step > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            "data-ocid": "register.back.button",
            onClick: handleBack,
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
              "मागे (Back)"
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "register.next.button",
            onClick: handleNext,
            disabled: isUploading,
            className: "flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold disabled:opacity-60",
            children: [
              isUploading ? "अपलोड होत आहे..." : step === TOTAL_STEPS ? "प्रोफाइल सेव्ह करा" : "पुढे (Next)",
              !isUploading && (step === TOTAL_STEPS ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 }))
            ]
          }
        )
      ] }),
      showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "register.back_to_browse.link",
          className: "text-sm text-muted-foreground underline hover:no-underline",
          onClick: () => navigate({ to: "/browse" }),
          children: "आधी प्रोफाइल पाहा (Browse profiles first)"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-4 pb-4", children: [
      t.community,
      " ·",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "register.login.link",
          className: "text-primary underline hover:no-underline",
          onClick: () => navigate({ to: "/" }),
          children: "मुख्यपृष्ठावर जा"
        }
      )
    ] })
  ] }) });
}
export {
  RegisterPage as default
};
