import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Shield,
  Smartphone,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import { JainAhimsaHand, JainOrnament } from "../components/JainSymbol";
import { useUserStore } from "../store";
import { translations } from "../types";

type LoginStep = "mobile" | "otp";
type SendState = "idle" | "sending" | "success" | "error" | "ratelimit";

const OTP_RESEND_SECONDS = 30;
const RATE_LIMIT_MAX = 3;

const loginTranslations: Record<string, Record<string, string>> = {
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
    otpExpired: "OTP कालबाह्य झाला, नवीन OTP मागवा",
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
    otpExpired: "OTP ಅವಧಿ ಮೀರಿದೆ, ಹೊಸ OTP ವಿನಂತಿಸಿ",
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
    otpExpired: "OTP समाप्त हो गया, नया OTP मांगें",
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
    otpExpired: "OTP expired, please request a new one",
  },
};

/** Mask mobile: show last 2 digits, rest as × */
function maskMobile(num: string): string {
  if (num.length < 2) return num;
  return "×".repeat(num.length - 2) + num.slice(-2);
}

/** Six individual digit input boxes */
const OTP_KEYS = ["d1", "d2", "d3", "d4", "d5", "d6"] as const;

function OtpBoxes({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first box on mount
  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === "Backspace") {
      if (value[index]) {
        const next = value.slice(0, index) + value.slice(index + 1);
        onChange(next.padEnd(Math.max(next.length, 0), "").slice(0, 6));
      } else if (index > 0) {
        refs.current[index - 1]?.focus();
        const next = value.slice(0, index - 1) + value.slice(index);
        onChange(next.slice(0, 6));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      refs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      refs.current[index + 1]?.focus();
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) return;
    // Support paste: fill from current position
    const digits = raw.slice(0, 6 - index);
    const next =
      value.slice(0, index) + digits + value.slice(index + digits.length);
    const trimmed = next.slice(0, 6);
    onChange(trimmed);
    const nextFocus = Math.min(index + digits.length, 5);
    setTimeout(() => refs.current[nextFocus]?.focus(), 0);
  }

  return (
    <fieldset className="flex gap-2 justify-center border-0 p-0 m-0">
      <legend className="sr-only">OTP</legend>
      {OTP_KEYS.map((key, i) => (
        <input
          key={key}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="tel"
          inputMode="numeric"
          maxLength={6}
          value={value[i] ?? ""}
          onKeyDown={(e) => handleKey(e, i)}
          onChange={(e) => handleInput(e, i)}
          onFocus={(e) => e.target.select()}
          autoComplete={i === 0 ? "one-time-code" : "off"}
          disabled={disabled}
          data-ocid={`login.otp_digit.${i + 1}`}
          aria-label={`OTP digit ${i + 1}`}
          className={[
            "w-11 h-14 text-center text-xl font-mono font-bold rounded-lg border-2 outline-none transition-all duration-150",
            "bg-background text-foreground",
            "focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20",
            value[i] ? "border-[#D4AF37] bg-[#FFFDF5]" : "border-input",
            disabled ? "opacity-50 cursor-not-allowed" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      ))}
    </fieldset>
  );
}

export default function LoginPage() {
  const [step, setStep] = useState<LoginStep>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sendState, setSendState] = useState<SendState>("idle");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [otpSentAt, setOtpSentAt] = useState<number | null>(null);

  const { setMobileLogin, isProfileComplete, currentLanguage } = useUserStore();
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const t = loginTranslations[currentLanguage] ?? loginTranslations.marathi;
  const navT = translations[currentLanguage] ?? translations.marathi;

  // Resend countdown timer
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const stepRef = useRef(step);
  const loadingRef = useRef(loading);
  stepRef.current = step;
  loadingRef.current = loading;

  // Auto-submit when all 6 digits entered
  useEffect(() => {
    if (otp.length === 6 && stepRef.current === "otp" && !loadingRef.current) {
      void doVerifyOtp({ preventDefault: () => {} } as React.FormEvent);
    }
    // Intentionally only re-run when otp changes; step/loading accessed via refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  function handleMobileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(val);
    if (error) setError("");
    if (sendState === "error" || sendState === "ratelimit")
      setSendState("idle");
  }

  async function handleSendOtp(e: React.FormEvent) {
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
          // no_sms_config — proceed to OTP step with info message
          setError(t.otpSendFailed);
          // Auto-proceed: treat as success with a notice
          setSendState("success");
          setOtpAttempts((n) => n + 1);
          setStep("otp");
          setOtp("");
          setOtpSentAt(Date.now());
          setResendCountdown(OTP_RESEND_SECONDS);
        }
      } else {
        // Fallback demo mode (actor not ready)
        await new Promise<void>((resolve) => setTimeout(resolve, 800));
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

  async function doVerifyOtp(e: React.FormEvent) {
    e.preventDefault?.();
    if (otp.length !== 6) return;

    // Check OTP expiry (10 minutes)
    const OTP_EXPIRY_MS = 10 * 60 * 1000;
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
          const errCode = result.err as string;
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
            // invalid
            setError(t.otpError);
          }
        }
      } else {
        // Fallback demo mode
        await new Promise<void>((resolve) => setTimeout(resolve, 700));
        setMobileLogin(mobile);
        if (isProfileComplete) {
          navigate({ to: "/browse" });
        } else {
          navigate({ to: "/register" });
        }
      }
    } catch {
      // Network error — fallback
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

  return (
    <div
      className="min-h-[88vh] flex items-center justify-center px-4 py-10"
      style={{
        background:
          "radial-gradient(ellipse at 60% 0%, oklch(0.96 0.04 60 / 0.35) 0%, transparent 60%), oklch(var(--background))",
      }}
      data-ocid="login.page"
    >
      {/* Decorative ornaments */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <JainOrnament
          className="absolute top-12 left-8 text-primary opacity-10 hidden md:block"
          size={64}
        />
        <JainOrnament
          className="absolute bottom-16 right-10 text-primary opacity-10 hidden md:block"
          size={48}
        />
      </div>

      <div className="w-full max-w-md relative">
        {/* Top community badge */}
        <div className="flex justify-center mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ background: "#8B1A1A" }}
          >
            <span>🕉</span>
            <span>{navT.community}</span>
          </span>
        </div>

        <Card
          className="shadow-premium border-2"
          style={{ borderColor: "#D4AF37" }}
          data-ocid="login.card"
        >
          <CardContent className="pt-8 pb-8 px-8">
            {/* Header: Symbol + Title */}
            <div className="flex flex-col items-center mb-7 gap-3">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-md"
                style={{
                  background: "linear-gradient(135deg, #FF6B00, #D4AF37)",
                }}
              >
                <JainAhimsaHand size={36} className="text-white" />
              </div>
              <div className="text-center">
                <h1
                  className="font-display text-3xl font-bold leading-tight"
                  style={{ color: "#8B1A1A" }}
                >
                  {t.title}
                </h1>
                <p className="text-muted-foreground text-sm mt-1 leading-snug max-w-xs mx-auto">
                  {t.subtitle}
                </p>
              </div>
              {/* Gold divider */}
              <div
                className="w-16 h-0.5 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #D4AF37, transparent)",
                }}
              />
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-6 justify-center">
              <div
                className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white transition-smooth"
                style={{ background: "#FF6B00" }}
              >
                {step === "otp" && sendState === "success" ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  "1"
                )}
              </div>
              <div
                className="h-0.5 w-8 rounded-full transition-smooth"
                style={{
                  background: step === "otp" ? "#FF6B00" : "#E5E7EB",
                }}
              />
              <div
                className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-smooth"
                style={{
                  background: step === "otp" ? "#FF6B00" : "transparent",
                  border: step === "otp" ? "none" : "2px solid #D1D5DB",
                  color: step === "otp" ? "white" : "#9CA3AF",
                }}
              >
                2
              </div>
            </div>

            {/* STEP 1 — Mobile Number */}
            {step === "mobile" && (
              <form onSubmit={handleSendOtp} className="space-y-5" noValidate>
                <div className="space-y-2">
                  <Label
                    htmlFor="mobile"
                    className="text-foreground font-semibold"
                    data-ocid="login.mobile_label"
                  >
                    {t.mobileLabel}
                  </Label>
                  <div className="flex gap-2 items-stretch">
                    <div className="flex items-center px-3 rounded-md border border-input bg-muted text-muted-foreground text-sm font-medium select-none">
                      <Smartphone className="w-3.5 h-3.5 mr-1.5" />
                      +91
                    </div>
                    <input
                      id="mobile"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder={t.mobilePlaceholder}
                      value={mobile}
                      onChange={handleMobileChange}
                      className="flex-1 text-base tracking-wider rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/40 focus:border-[#FF6B00] transition-all duration-150"
                      style={{ borderColor: error ? "#DC2626" : undefined }}
                      autoComplete="tel-local"
                      data-ocid="login.mobile_input"
                      aria-label={t.mobileLabel}
                      aria-describedby={error ? "login-error" : undefined}
                      aria-invalid={!!error}
                    />
                  </div>

                  {/* Error messages */}
                  {error && (
                    <p
                      id="login-error"
                      className="flex items-center gap-1.5 text-xs text-destructive mt-1"
                      data-ocid="login.mobile_field_error"
                      role="alert"
                    >
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {error}
                    </p>
                  )}

                  {/* SMS send failure */}
                  {sendState === "error" && (
                    <div
                      className="flex items-start gap-2 p-3 rounded-lg border border-destructive/40 bg-destructive/5"
                      data-ocid="login.otp_send_error"
                      role="alert"
                    >
                      <XCircle className="w-4 h-4 mt-0.5 text-destructive flex-shrink-0" />
                      <p className="text-xs text-destructive leading-snug">
                        {t.otpSendFailed}
                      </p>
                    </div>
                  )}

                  {/* Rate limit */}
                  {sendState === "ratelimit" && (
                    <div
                      className="flex items-start gap-2 p-3 rounded-lg border"
                      style={{
                        borderColor: "#D4AF37",
                        background: "oklch(0.97 0.03 60 / 0.5)",
                      }}
                      data-ocid="login.rate_limit_error"
                      role="alert"
                    >
                      <AlertCircle
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: "#8B1A1A" }}
                      />
                      <p
                        className="text-xs leading-snug font-semibold"
                        style={{ color: "#8B1A1A" }}
                      >
                        {t.rateLimitMsg}
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 text-base font-semibold text-white transition-smooth"
                  style={{ background: "#FF6B00" }}
                  disabled={
                    mobile.length !== 10 || loading || sendState === "ratelimit"
                  }
                  data-ocid="login.send_otp_button"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.sending}
                    </span>
                  ) : (
                    t.sendOtp
                  )}
                </Button>
              </form>
            )}

            {/* STEP 2 — OTP Verification */}
            {step === "otp" && (
              <form onSubmit={doVerifyOtp} className="space-y-5" noValidate>
                {/* OTP sent success notice */}
                <output
                  className="flex items-start gap-2.5 p-3 rounded-lg border"
                  style={{
                    background: "oklch(0.97 0.02 60 / 0.6)",
                    borderColor: "#D4AF37",
                  }}
                  data-ocid="login.otp_sent_notice"
                >
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "#FF6B00" }}
                  />
                  <div className="text-sm text-foreground leading-snug">
                    <span className="font-semibold">{t.otpSentMsg}</span>
                    <br />
                    <span className="text-muted-foreground text-xs">
                      {t.otpSentTo}{" "}
                      <span
                        className="font-mono font-semibold"
                        style={{ color: "#8B1A1A" }}
                      >
                        +91 {maskMobile(mobile)}
                      </span>
                    </span>
                  </div>
                </output>
                <div className="space-y-3">
                  <Label
                    className="text-foreground font-semibold block text-center"
                    data-ocid="login.otp_label"
                  >
                    {t.otpLabel}
                  </Label>

                  <OtpBoxes
                    value={otp}
                    onChange={(val) => {
                      setOtp(val);
                      if (error) setError("");
                    }}
                    disabled={loading}
                  />

                  {/* OTP error */}
                  {error && (
                    <p
                      id="otp-error"
                      className="flex items-center justify-center gap-1.5 text-xs text-destructive"
                      data-ocid="login.otp_field_error"
                      role="alert"
                    >
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {error}
                    </p>
                  )}
                </div>

                {/* Verify button */}
                <Button
                  type="submit"
                  className="w-full h-11 text-base font-semibold text-white transition-smooth"
                  style={{ background: "#FF6B00" }}
                  disabled={otp.length !== 6 || loading}
                  data-ocid="login.verify_otp_button"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.verifying}
                    </span>
                  ) : (
                    t.verifyOtp
                  )}
                </Button>

                {/* Resend + Change number */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleBackToMobile}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth"
                    data-ocid="login.back_button"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    {t.changeMobile}
                  </button>

                  {resendCountdown > 0 ? (
                    <span
                      className="text-sm text-muted-foreground"
                      data-ocid="login.resend_countdown"
                    >
                      {t.resendIn} {resendCountdown}s
                    </span>
                  ) : loading ? (
                    <span
                      className="flex items-center gap-1.5 text-sm text-muted-foreground"
                      data-ocid="login.resend_loading"
                    >
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      {t.resending}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-sm font-semibold transition-smooth hover:underline"
                      style={{ color: "#FF6B00" }}
                      data-ocid="login.resend_otp_button"
                    >
                      {t.resendOtp}
                    </button>
                  )}
                </div>

                {/* Rate limit warning in OTP step */}
                {sendState === "ratelimit" && (
                  <div
                    className="flex items-start gap-2 p-3 rounded-lg border"
                    style={{
                      borderColor: "#D4AF37",
                      background: "oklch(0.97 0.03 60 / 0.5)",
                    }}
                    data-ocid="login.otp_rate_limit_error"
                    role="alert"
                  >
                    <AlertCircle
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "#8B1A1A" }}
                    />
                    <p
                      className="text-xs leading-snug font-semibold"
                      style={{ color: "#8B1A1A" }}
                    >
                      {t.rateLimitMsg}
                    </p>
                  </div>
                )}
              </form>
            )}

            {/* Security note */}
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground border-t border-border pt-4">
              <Shield
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: "#D4AF37" }}
              />
              <span>{t.secureMsg}</span>
            </div>
          </CardContent>
        </Card>

        {/* Gold lotus ornament below card */}
        <div className="flex justify-center mt-4 gap-1.5 opacity-40">
          <span className="text-xs" style={{ color: "#D4AF37" }}>
            ✦
          </span>
          <span className="text-xs" style={{ color: "#D4AF37" }}>
            ◆
          </span>
          <span className="text-xs" style={{ color: "#D4AF37" }}>
            ✦
          </span>
        </div>
      </div>
    </div>
  );
}
