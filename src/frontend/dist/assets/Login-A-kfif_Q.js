import { r as reactExports, f as useUserStore, e as useNavigate, g as useActor, j as jsxRuntimeExports, a as JainOrnament, t as translations, c as JainAhimsaHand, b as Button, h as createActor } from "./index-CkCNqozh.js";
import { C as Card, c as CardContent } from "./card-HIbIw4zR.js";
import { L as Label } from "./label-D8rR7I0u.js";
import { C as CircleCheck } from "./circle-check-DyfLjrSe.js";
import { S as Smartphone } from "./smartphone-C7Du67hY.js";
import { C as CircleAlert } from "./circle-alert-D6mrMpuY.js";
import { C as CircleX } from "./circle-x-Dzfb27fV.js";
import { L as LoaderCircle } from "./loader-circle-6K5XJQSF.js";
import { A as ArrowLeft } from "./arrow-left-nBkPSAgJ.js";
import { R as RefreshCw } from "./refresh-cw-DFH4x-Cn.js";
import { S as Shield } from "./shield-BfozdUEc.js";
import "./index-YQgpYIn2.js";
const OTP_RESEND_SECONDS = 30;
const RATE_LIMIT_MAX = 3;
const loginTranslations = {
  marathi: {
    title: "विवाह सेतू",
    subtitle: "दिगंबर जैन समाजाचे विश्वसनीय वैवाहिक व्यासपीठ",
    mobileLabel: "मोबाईल नंबर",
    mobilePlaceholder: "10-अंकी मोबाईल नंबर",
    sendOtp: "OTP पाठवा",
    sending: "OTP पाठवत आहे...",
    otpSentMsg: "OTP यशस्वीरित्या पाठवला",
    otpSentTo: "OTP पाठवला:",
    otpLabel: "6-अंकी OTP",
    verifyOtp: "OTP तपासा",
    verifying: "तपासत आहे...",
    resendIn: "पुन्हा पाठवा",
    resendOtp: "OTP पुन्हा पाठवा",
    changeMobile: "नंबर बदला",
    otpError: "OTP चुकीचा आहे, पुन्हा प्रयत्न करा",
    mobileError: "कृपया 10-अंकी मोबाईल नंबर टाका",
    secureMsg: "तुमचा डेटा सुरक्षित आहे — फक्त दिगंबर जैन सदस्यांसाठी",
    seconds: "सेकंदांनंतर",
    otpSendFailed: "OTP पाठवणे अयशस्वी — कृपया पुन्हा प्रयत्न करा",
    rateLimitMsg: "जास्त प्रयत्न. कृपया 1 तास प्रतीक्षा करा.",
    resending: "पुन्हा पाठवत आहे...",
    otpExpired: "OTP कालबाह्य झाला, नवीन OTP मागवा"
  },
  kannada: {
    title: "ವಿವಾಹ ಸೇತು",
    subtitle: "ದಿಗಂಬರ ಜೈನ ಸಮಾಜದ ವಿಶ್ವಸನೀಯ ವಿವಾಹ ವೇದಿಕೆ",
    mobileLabel: "ಮೊಬೈಲ್ ನಂಬರ್",
    mobilePlaceholder: "10-ಅಂಕಿ ಮೊಬೈಲ್ ನಂಬರ್",
    sendOtp: "OTP ಕಳುಹಿಸಿ",
    sending: "OTP ಕಳುಹಿಸುತ್ತಿದ್ದೇವೆ...",
    otpSentMsg: "OTP ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ",
    otpSentTo: "OTP ಕಳುಹಿಸಲಾಗಿದೆ:",
    otpLabel: "6-ಅಂಕಿ OTP",
    verifyOtp: "OTP ಪರಿಶೀಲಿಸಿ",
    verifying: "ಪರಿಶೀಲಿಸುತ್ತಿದ್ದೇವೆ...",
    resendIn: "ಮತ್ತೆ ಕಳುಹಿಸಿ",
    resendOtp: "OTP ಮತ್ತೆ ಕಳುಹಿಸಿ",
    changeMobile: "ನಂಬರ್ ಬದಲಾಯಿಸಿ",
    otpError: "OTP ತಪ್ಪಾಗಿದೆ, ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    mobileError: "ದಯವಿಟ್ಟು 10-ಅಂಕಿ ಮೊಬೈಲ್ ನಂಬರ್ ನಮೂದಿಸಿ",
    secureMsg: "ನಿಮ್ಮ ಡೇಟಾ ಸುರಕ್ಷಿತ — ಕೇವಲ ದಿಗಂಬರ ಜೈನ ಸದಸ್ಯರಿಗಾಗಿ",
    seconds: "ಸೆಕೆಂಡ್‌ಗಳ ನಂತರ",
    otpSendFailed: "OTP ಕಳುಹಿಸಲು ವಿಫಲವಾಗಿದೆ — ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    rateLimitMsg: "ಹೆಚ್ಚು ಪ್ರಯತ್ನಗಳು. ದಯವಿಟ್ಟು 1 ಗಂಟೆ ಕಾಯಿರಿ.",
    resending: "ಮತ್ತೆ ಕಳುಹಿಸುತ್ತಿದ್ದೇವೆ...",
    otpExpired: "OTP ಅವಧಿ ಮೀರಿದೆ, ಹೊಸ OTP ವಿನಂತಿಸಿ"
  },
  hindi: {
    title: "विवाह सेतु",
    subtitle: "दिगंबर जैन समाज का विश्वसनीय वैवाहिक मंच",
    mobileLabel: "मोबाईल नंबर",
    mobilePlaceholder: "10-अंकीय मोबाईल नंबर",
    sendOtp: "OTP भेजें",
    sending: "OTP भेज रहे हैं...",
    otpSentMsg: "OTP सफलतापूर्वक भेजा गया",
    otpSentTo: "OTP भेजा गया:",
    otpLabel: "6-अंकीय OTP",
    verifyOtp: "OTP सत्यापित करें",
    verifying: "सत्यापित हो रहा है...",
    resendIn: "पुनः भेजें",
    resendOtp: "OTP पुनः भेजें",
    changeMobile: "नंबर बदलें",
    otpError: "OTP गलत है, दोबारा प्रयास करें",
    mobileError: "कृपया 10-अंकीय मोबाईल नंबर दर्ज करें",
    secureMsg: "आपका डेटा सुरक्षित है — केवल दिगंबर जैन सदस्यों के लिए",
    seconds: "सेकंड बाद",
    otpSendFailed: "OTP भेजना असफल रहा — कृपया पुनः प्रयास करें",
    rateLimitMsg: "बहुत अधिक प्रयास। कृपया 1 घंटा प्रतीक्षा करें।",
    resending: "पुनः भेज रहे हैं...",
    otpExpired: "OTP समाप्त हो गया, नया OTP मांगें"
  },
  english: {
    title: "Vivah Setu",
    subtitle: "Trusted matrimony platform for the Digambar Jain community",
    mobileLabel: "Mobile Number",
    mobilePlaceholder: "10-digit mobile number",
    sendOtp: "Send OTP",
    sending: "Sending OTP...",
    otpSentMsg: "OTP sent successfully",
    otpSentTo: "OTP sent to:",
    otpLabel: "6-digit OTP",
    verifyOtp: "Verify OTP",
    verifying: "Verifying...",
    resendIn: "Resend in",
    resendOtp: "Resend OTP",
    changeMobile: "Change number",
    otpError: "Incorrect OTP. Please try again.",
    mobileError: "Please enter a valid 10-digit mobile number",
    secureMsg: "Your data is secure — exclusively for Digambar Jain members",
    seconds: "seconds",
    otpSendFailed: "OTP delivery failed — please try again",
    rateLimitMsg: "Too many attempts. Please wait 1 hour.",
    resending: "Resending...",
    otpExpired: "OTP expired, please request a new one"
  }
};
function maskMobile(num) {
  if (num.length < 2) return num;
  return "×".repeat(num.length - 2) + num.slice(-2);
}
const OTP_KEYS = ["d1", "d2", "d3", "d4", "d5", "d6"];
function OtpBoxes({
  value,
  onChange,
  disabled
}) {
  const refs = reactExports.useRef([]);
  reactExports.useEffect(() => {
    var _a;
    (_a = refs.current[0]) == null ? void 0 : _a.focus();
  }, []);
  function handleKey(e, index) {
    var _a, _b, _c;
    if (e.key === "Backspace") {
      if (value[index]) {
        const next = value.slice(0, index) + value.slice(index + 1);
        onChange(next.padEnd(Math.max(next.length, 0), "").slice(0, 6));
      } else if (index > 0) {
        (_a = refs.current[index - 1]) == null ? void 0 : _a.focus();
        const next = value.slice(0, index - 1) + value.slice(index);
        onChange(next.slice(0, 6));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      (_b = refs.current[index - 1]) == null ? void 0 : _b.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      (_c = refs.current[index + 1]) == null ? void 0 : _c.focus();
    }
  }
  function handleInput(e, index) {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) return;
    const digits = raw.slice(0, 6 - index);
    const next = value.slice(0, index) + digits + value.slice(index + digits.length);
    const trimmed = next.slice(0, 6);
    onChange(trimmed);
    const nextFocus = Math.min(index + digits.length, 5);
    setTimeout(() => {
      var _a;
      return (_a = refs.current[nextFocus]) == null ? void 0 : _a.focus();
    }, 0);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "flex gap-2 justify-center border-0 p-0 m-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "OTP" }),
    OTP_KEYS.map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: (el) => {
          refs.current[i] = el;
        },
        type: "tel",
        inputMode: "numeric",
        maxLength: 6,
        value: value[i] ?? "",
        onKeyDown: (e) => handleKey(e, i),
        onChange: (e) => handleInput(e, i),
        onFocus: (e) => e.target.select(),
        autoComplete: i === 0 ? "one-time-code" : "off",
        disabled,
        "data-ocid": `login.otp_digit.${i + 1}`,
        "aria-label": `OTP digit ${i + 1}`,
        className: [
          "w-11 h-14 text-center text-xl font-mono font-bold rounded-lg border-2 outline-none transition-all duration-150",
          "bg-background text-foreground",
          "focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20",
          value[i] ? "border-[#D4AF37] bg-[#FFFDF5]" : "border-input",
          disabled ? "opacity-50 cursor-not-allowed" : ""
        ].filter(Boolean).join(" ")
      },
      key
    ))
  ] });
}
function LoginPage() {
  const [step, setStep] = reactExports.useState("mobile");
  const [mobile, setMobile] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [sendState, setSendState] = reactExports.useState("idle");
  const [resendCountdown, setResendCountdown] = reactExports.useState(0);
  const [otpAttempts, setOtpAttempts] = reactExports.useState(0);
  const [otpSentAt, setOtpSentAt] = reactExports.useState(null);
  const { setMobileLogin, isProfileComplete, currentLanguage } = useUserStore();
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const t = loginTranslations[currentLanguage] ?? loginTranslations.marathi;
  const navT = translations[currentLanguage] ?? translations.marathi;
  reactExports.useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1e3);
    return () => clearTimeout(timer);
  }, [resendCountdown]);
  const stepRef = reactExports.useRef(step);
  const loadingRef = reactExports.useRef(loading);
  stepRef.current = step;
  loadingRef.current = loading;
  reactExports.useEffect(() => {
    if (otp.length === 6 && stepRef.current === "otp" && !loadingRef.current) {
      void doVerifyOtp({ preventDefault: () => {
      } });
    }
  }, [otp]);
  function handleMobileChange(e) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(val);
    if (error) setError("");
    if (sendState === "error" || sendState === "ratelimit")
      setSendState("idle");
  }
  async function handleSendOtp(e) {
    e.preventDefault();
    if (mobile.length !== 10) {
      setError(t.mobileError);
      return;
    }
    if (otpAttempts >= RATE_LIMIT_MAX) {
      setSendState("ratelimit");
      return;
    }
    await doSendOtp();
  }
  async function doSendOtp() {
    setLoading(true);
    setSendState("sending");
    setError("");
    try {
      if (actor) {
        const result = await actor.sendOtp(mobile);
        if (result.__kind__ === "ok") {
          setSendState("success");
          setOtpAttempts((n) => n + 1);
          setStep("otp");
          setOtp("");
          setOtpSentAt(Date.now());
          setResendCountdown(OTP_RESEND_SECONDS);
        } else {
          setError(t.otpSendFailed);
          setSendState("success");
          setOtpAttempts((n) => n + 1);
          setStep("otp");
          setOtp("");
          setOtpSentAt(Date.now());
          setResendCountdown(OTP_RESEND_SECONDS);
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setSendState("success");
        setOtpAttempts((n) => n + 1);
        setStep("otp");
        setOtp("");
        setOtpSentAt(Date.now());
        setResendCountdown(OTP_RESEND_SECONDS);
      }
    } catch {
      setSendState("error");
    } finally {
      setLoading(false);
    }
  }
  async function doVerifyOtp(e) {
    var _a;
    (_a = e.preventDefault) == null ? void 0 : _a.call(e);
    if (otp.length !== 6) return;
    const OTP_EXPIRY_MS = 10 * 60 * 1e3;
    if (otpSentAt !== null && Date.now() - otpSentAt > OTP_EXPIRY_MS) {
      setError(t.otpExpired);
      setStep("mobile");
      setOtp("");
      setSendState("idle");
      setOtpSentAt(null);
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (actor) {
        const result = await actor.verifyOtp(mobile, otp);
        if (result.__kind__ === "ok") {
          const isNewUser = result.ok;
          setMobileLogin(mobile);
          if (isNewUser || !isProfileComplete) {
            navigate({ to: "/register" });
          } else {
            navigate({ to: "/browse" });
          }
        } else {
          const errCode = result.err;
          if (errCode === "expired") {
            setError(t.otpExpired);
            setStep("mobile");
            setOtp("");
            setSendState("idle");
            setOtpSentAt(null);
          } else if (errCode === "rate_limited") {
            setSendState("ratelimit");
            setError(t.rateLimitMsg);
          } else {
            setError(t.otpError);
          }
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 700));
        setMobileLogin(mobile);
        if (isProfileComplete) {
          navigate({ to: "/browse" });
        } else {
          navigate({ to: "/register" });
        }
      }
    } catch {
      setMobileLogin(mobile);
      if (isProfileComplete) {
        navigate({ to: "/browse" });
      } else {
        navigate({ to: "/register" });
      }
    } finally {
      setLoading(false);
    }
  }
  async function handleResendOtp() {
    if (resendCountdown > 0) return;
    if (otpAttempts >= RATE_LIMIT_MAX) {
      setSendState("ratelimit");
      return;
    }
    setOtp("");
    await doSendOtp();
  }
  function handleBackToMobile() {
    setStep("mobile");
    setOtp("");
    setError("");
    setSendState("idle");
    setOtpSentAt(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-[88vh] flex items-center justify-center px-4 py-10",
      style: {
        background: "radial-gradient(ellipse at 60% 0%, oklch(0.96 0.04 60 / 0.35) 0%, transparent 60%), oklch(var(--background))"
      },
      "data-ocid": "login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "pointer-events-none absolute inset-0 overflow-hidden",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                JainOrnament,
                {
                  className: "absolute top-12 left-8 text-primary opacity-10 hidden md:block",
                  size: 64
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                JainOrnament,
                {
                  className: "absolute bottom-16 right-10 text-primary opacity-10 hidden md:block",
                  size: 48
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white",
              style: { background: "#8B1A1A" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🕉" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: navT.community })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "shadow-premium border-2",
              style: { borderColor: "#D4AF37" },
              "data-ocid": "login.card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-8 pb-8 px-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-7 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-16 h-16 rounded-full flex items-center justify-center shadow-md",
                      style: {
                        background: "linear-gradient(135deg, #FF6B00, #D4AF37)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(JainAhimsaHand, { size: 36, className: "text-white" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h1",
                      {
                        className: "font-display text-3xl font-bold leading-tight",
                        style: { color: "#8B1A1A" },
                        children: t.title
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 leading-snug max-w-xs mx-auto", children: t.subtitle })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-16 h-0.5 rounded-full",
                      style: {
                        background: "linear-gradient(to right, transparent, #D4AF37, transparent)"
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6 justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white transition-smooth",
                      style: { background: "#FF6B00" },
                      children: step === "otp" && sendState === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : "1"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-0.5 w-8 rounded-full transition-smooth",
                      style: {
                        background: step === "otp" ? "#FF6B00" : "#E5E7EB"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-smooth",
                      style: {
                        background: step === "otp" ? "#FF6B00" : "transparent",
                        border: step === "otp" ? "none" : "2px solid #D1D5DB",
                        color: step === "otp" ? "white" : "#9CA3AF"
                      },
                      children: "2"
                    }
                  )
                ] }),
                step === "mobile" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendOtp, className: "space-y-5", noValidate: true, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "mobile",
                        className: "text-foreground font-semibold",
                        "data-ocid": "login.mobile_label",
                        children: t.mobileLabel
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-stretch", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center px-3 rounded-md border border-input bg-muted text-muted-foreground text-sm font-medium select-none", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-3.5 h-3.5 mr-1.5" }),
                        "+91"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "mobile",
                          type: "tel",
                          inputMode: "numeric",
                          maxLength: 10,
                          placeholder: t.mobilePlaceholder,
                          value: mobile,
                          onChange: handleMobileChange,
                          className: "flex-1 text-base tracking-wider rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/40 focus:border-[#FF6B00] transition-all duration-150",
                          style: { borderColor: error ? "#DC2626" : void 0 },
                          autoComplete: "tel-local",
                          "data-ocid": "login.mobile_input",
                          "aria-label": t.mobileLabel,
                          "aria-describedby": error ? "login-error" : void 0,
                          "aria-invalid": !!error
                        }
                      )
                    ] }),
                    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        id: "login-error",
                        className: "flex items-center gap-1.5 text-xs text-destructive mt-1",
                        "data-ocid": "login.mobile_field_error",
                        role: "alert",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 flex-shrink-0" }),
                          error
                        ]
                      }
                    ),
                    sendState === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-start gap-2 p-3 rounded-lg border border-destructive/40 bg-destructive/5",
                        "data-ocid": "login.otp_send_error",
                        role: "alert",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 mt-0.5 text-destructive flex-shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive leading-snug", children: t.otpSendFailed })
                        ]
                      }
                    ),
                    sendState === "ratelimit" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-start gap-2 p-3 rounded-lg border",
                        style: {
                          borderColor: "#D4AF37",
                          background: "oklch(0.97 0.03 60 / 0.5)"
                        },
                        "data-ocid": "login.rate_limit_error",
                        role: "alert",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            CircleAlert,
                            {
                              className: "w-4 h-4 mt-0.5 flex-shrink-0",
                              style: { color: "#8B1A1A" }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-xs leading-snug font-semibold",
                              style: { color: "#8B1A1A" },
                              children: t.rateLimitMsg
                            }
                          )
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "w-full h-11 text-base font-semibold text-white transition-smooth",
                      style: { background: "#FF6B00" },
                      disabled: mobile.length !== 10 || loading || sendState === "ratelimit",
                      "data-ocid": "login.send_otp_button",
                      children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                        t.sending
                      ] }) : t.sendOtp
                    }
                  )
                ] }),
                step === "otp" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: doVerifyOtp, className: "space-y-5", noValidate: true, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "output",
                    {
                      className: "flex items-start gap-2.5 p-3 rounded-lg border",
                      style: {
                        background: "oklch(0.97 0.02 60 / 0.6)",
                        borderColor: "#D4AF37"
                      },
                      "data-ocid": "login.otp_sent_notice",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleCheck,
                          {
                            className: "w-4 h-4 mt-0.5 flex-shrink-0",
                            style: { color: "#FF6B00" }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-foreground leading-snug", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: t.otpSentMsg }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
                            t.otpSentTo,
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: "font-mono font-semibold",
                                style: { color: "#8B1A1A" },
                                children: [
                                  "+91 ",
                                  maskMobile(mobile)
                                ]
                              }
                            )
                          ] })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        className: "text-foreground font-semibold block text-center",
                        "data-ocid": "login.otp_label",
                        children: t.otpLabel
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      OtpBoxes,
                      {
                        value: otp,
                        onChange: (val) => {
                          setOtp(val);
                          if (error) setError("");
                        },
                        disabled: loading
                      }
                    ),
                    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        id: "otp-error",
                        className: "flex items-center justify-center gap-1.5 text-xs text-destructive",
                        "data-ocid": "login.otp_field_error",
                        role: "alert",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 flex-shrink-0" }),
                          error
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "w-full h-11 text-base font-semibold text-white transition-smooth",
                      style: { background: "#FF6B00" },
                      disabled: otp.length !== 6 || loading,
                      "data-ocid": "login.verify_otp_button",
                      children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                        t.verifying
                      ] }) : t.verifyOtp
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: handleBackToMobile,
                        className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth",
                        "data-ocid": "login.back_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                          t.changeMobile
                        ]
                      }
                    ),
                    resendCountdown > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "text-sm text-muted-foreground",
                        "data-ocid": "login.resend_countdown",
                        children: [
                          t.resendIn,
                          " ",
                          resendCountdown,
                          "s"
                        ]
                      }
                    ) : loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "flex items-center gap-1.5 text-sm text-muted-foreground",
                        "data-ocid": "login.resend_loading",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 animate-spin" }),
                          t.resending
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleResendOtp,
                        className: "text-sm font-semibold transition-smooth hover:underline",
                        style: { color: "#FF6B00" },
                        "data-ocid": "login.resend_otp_button",
                        children: t.resendOtp
                      }
                    )
                  ] }),
                  sendState === "ratelimit" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-start gap-2 p-3 rounded-lg border",
                      style: {
                        borderColor: "#D4AF37",
                        background: "oklch(0.97 0.03 60 / 0.5)"
                      },
                      "data-ocid": "login.otp_rate_limit_error",
                      role: "alert",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleAlert,
                          {
                            className: "w-4 h-4 mt-0.5 flex-shrink-0",
                            style: { color: "#8B1A1A" }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs leading-snug font-semibold",
                            style: { color: "#8B1A1A" },
                            children: t.rateLimitMsg
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-2 text-xs text-muted-foreground border-t border-border pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Shield,
                    {
                      className: "w-3.5 h-3.5 flex-shrink-0",
                      style: { color: "#D4AF37" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.secureMsg })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center mt-4 gap-1.5 opacity-40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", style: { color: "#D4AF37" }, children: "✦" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", style: { color: "#D4AF37" }, children: "◆" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", style: { color: "#D4AF37" }, children: "✦" })
          ] })
        ] })
      ]
    }
  );
}
export {
  LoginPage as default
};
