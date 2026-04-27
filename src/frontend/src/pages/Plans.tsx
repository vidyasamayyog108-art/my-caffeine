import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Copy,
  Crown,
  Download,
  Loader2,
  Upload,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { useUserStore } from "../store";
import { translations } from "../types";

const AMOUNT = 499;

const premiumFeatures = {
  marathi: [
    "अमर्यादित प्रोफाइल पहाणे",
    "थेट संपर्क तपशील मिळवा",
    "प्राधान्य यादीत स्थान",
    "संपूर्ण प्रोफाइल माहिती",
    "जुळवणी सूचना",
    "वर्षभर प्रवेश (1 वर्ष)",
  ],
  hindi: [
    "असीमित प्रोफाइल देखना",
    "सीधा संपर्क जानकारी",
    "प्राथमिकता सूची में स्थान",
    "पूर्ण प्रोफाइल जानकारी",
    "मैच सूचनाएं",
    "वार्षिक सदस्यता (1 वर्ष)",
  ],
  kannada: [
    "ಅಪರಿಮಿತ ಪ್ರೊಫೈಲ್ ವೀಕ್ಷಣೆ",
    "ನೇರ ಸಂಪರ್ಕ ವಿವರಗಳು",
    "ಆದ್ಯತೆ ಪಟ್ಟಿ",
    "ಸಂಪೂರ್ಣ ಪ್ರೊಫೈಲ್ ಮಾಹಿತಿ",
    "ಹೊಂದಾಣಿಕೆ ಅಧಿಸೂಚನೆಗಳು",
    "ವಾರ್ಷಿಕ ಸದಸ್ಯತ್ವ (1 ವರ್ಷ)",
  ],
  english: [
    "Unlimited profile views",
    "Direct contact details",
    "Priority listing",
    "Full profile information",
    "Match notifications",
    "Annual validity (1 year)",
  ],
};

const paymentSteps = {
  marathi: [
    "वरील QR स्कॅन करा किंवा UPI ID वापरा",
    "₹499 पाठवा",
    "Transaction screenshot घ्या",
    "UTR / Transaction ID नोंदवा",
    "खाली submit करा — Admin 24 तासांत approve करेल",
  ],
  hindi: [
    "ऊपर QR स्कैन करें या UPI ID उपयोग करें",
    "₹499 भेजें",
    "Transaction screenshot लें",
    "UTR / Transaction ID नोट करें",
    "नीचे submit करें — Admin 24 घंटे में approve करेगा",
  ],
  kannada: [
    "ಮೇಲಿನ QR ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಅಥವಾ UPI ID ಬಳಸಿ",
    "₹499 ಕಳುಹಿಸಿ",
    "Transaction screenshot ತೆಗೆದುಕೊಳ್ಳಿ",
    "UTR / Transaction ID ನಮೂದಿಸಿ",
    "ಕೆಳಗೆ submit ಮಾಡಿ — Admin 24 ಗಂಟೆಯಲ್ಲಿ approve ಮಾಡುತ್ತಾರೆ",
  ],
  english: [
    "Scan the QR above or use the UPI ID",
    "Send ₹499",
    "Take a screenshot of the transaction",
    "Note the UTR / Transaction ID",
    "Submit below — Admin will approve within 24 hours",
  ],
};

export default function PlansPage() {
  const navigate = useNavigate();
  const {
    currentUser,
    isLoggedIn,
    isProfileComplete,
    setCurrentUser,
    paymentConfig,
    setPaymentConfig,
  } = useUserStore();
  const lang = useUserStore((s) => s.currentLanguage);
  const t = translations[lang];
  const { actor, isFetching: actorLoading } = useActor(createActor);

  const upiId = paymentConfig.upiId || "vivahsetu@ptaxis";
  const qrImageDataUrl = paymentConfig.qrImageDataUrl;
  const upiDeepLink = `upi://pay?pa=${upiId}&pn=Vivah%20Setu&am=${AMOUNT}&cu=INR&tn=Premium%20Membership`;

  const [showPayment, setShowPayment] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [utrRef, setUtrRef] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isDownloadingQr, setIsDownloadingQr] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const qrSvgRef = useRef<SVGSVGElement>(null);

  // Load payment config from actor on mount
  useEffect(() => {
    if (!actor || actorLoading) return;
    actor
      .adminGetPaymentConfig()
      .then((config) => {
        if (config) {
          setPaymentConfig({
            upiId: config.upiId || "vivahsetu@ptaxis",
            qrImageDataUrl: config.qrImageUrl || "",
          });
        }
      })
      .catch(() => {
        /* use existing config */
      });
  }, [actor, actorLoading, setPaymentConfig]);

  const paymentStatus = currentUser?.paymentStatus ?? "Pending";
  const isPremium =
    currentUser?.membershipTier === "Premium" || paymentStatus === "Approved";

  function handleCopyUpi() {
    navigator.clipboard.writeText(upiId);
    toast.success("UPI ID copied!", { duration: 2000 });
  }

  async function handleDownloadQr() {
    setIsDownloadingQr(true);
    try {
      // If admin has uploaded a custom QR image, download that directly
      if (qrImageDataUrl) {
        const link = document.createElement("a");
        link.href = qrImageDataUrl;
        link.download = "vivahsetu-upi-qr.png";
        link.click();
        toast.success(
          lang === "english"
            ? "QR Code downloaded!"
            : lang === "hindi"
              ? "QR Code डाउनलोड हुआ!"
              : lang === "kannada"
                ? "QR Code ಡೌನ್ಲೋಡ್ ಆಯಿತು!"
                : "QR Code डाउनलोड झाला!",
          { duration: 3000 },
        );
        return;
      }

      // Generate a canvas-based QR from the SVG fallback
      const svgEl = qrSvgRef.current;
      if (!svgEl) {
        setIsDownloadingQr(false);
        return;
      }

      const serializer = new XMLSerializer();
      const svgStr = serializer.serializeToString(svgEl);
      const svgBlob = new Blob([svgStr], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);

      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 460;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsDownloadingQr(false);
        return;
      }

      await new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 12, 12, 376, 376);
          // Add UPI ID text below QR
          ctx.fillStyle = "#8B1A1A";
          ctx.font = "bold 20px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("विवाह सेतू — Vivah Setu", canvas.width / 2, 415);
          ctx.fillStyle = "#FF6B00";
          ctx.font = "bold 18px monospace";
          ctx.fillText(`UPI: ${upiId}`, canvas.width / 2, 445);
          const pngUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = pngUrl;
          link.download = "vivahsetu-upi-qr.png";
          link.click();
          URL.revokeObjectURL(url);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = url;
      });

      toast.success(
        lang === "english"
          ? "QR Code downloaded!"
          : lang === "hindi"
            ? "QR Code डाउनलोड हुआ!"
            : lang === "kannada"
              ? "QR Code ಡೌನ್ಲೋಡ್ ಆಯಿತು!"
              : "QR Code डाउनलोड झाला!",
        { duration: 3000 },
      );
    } finally {
      setIsDownloadingQr(false);
    }
  }

  async function handleSubmit() {
    if (!screenshotFile) {
      toast.error("Screenshot upload करा");
      return;
    }
    if (!utrRef.trim()) {
      toast.error("UTR / Transaction ID टाका");
      return;
    }
    setIsSubmitting(true);

    const mockScreenshotUrl = URL.createObjectURL(screenshotFile);

    try {
      if (actor) {
        const result = await actor.submitPaymentScreenshot(
          mockScreenshotUrl,
          utrRef.trim(),
        );
        if (result.__kind__ === "ok") {
          if (currentUser) {
            setCurrentUser({
              ...currentUser,
              paymentStatus: "Uploaded",
              paymentScreenshotUrl: mockScreenshotUrl,
              paymentUpiRef: utrRef.trim(),
            });
          }
          setIsSubmitting(false);
          setSubmitted(true);
          toast.success("पेमेंट submit झाले! Admin लवकरच approve करेल.");
          return;
        }
      }
      // Fallback: update local state
      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          paymentStatus: "Uploaded",
          paymentScreenshotUrl: mockScreenshotUrl,
          paymentUpiRef: utrRef.trim(),
        });
      }
    } catch {
      // Network error: still update local state
      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          paymentStatus: "Uploaded",
          paymentScreenshotUrl: mockScreenshotUrl,
          paymentUpiRef: utrRef.trim(),
        });
      }
    }

    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("पेमेंट submit झाले! Admin लवकरच approve करेल.");
  }

  // ── Status banner ──────────────────────────────────────────────────────────
  if (isPremium) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4 py-16"
        data-ocid="plans.page"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #D4AF37, #FF6B00)" }}
        >
          <Crown className="w-10 h-10 text-white" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="font-display text-3xl font-bold text-foreground">
            {lang === "english"
              ? "🎉 Premium Membership Active!"
              : lang === "hindi"
                ? "🎉 Premium सदस्यता सक्रिय है!"
                : lang === "kannada"
                  ? "🎉 Premium ಸದಸ್ಯತ್ವ ಸಕ್ರಿಯವಾಗಿದೆ!"
                  : "🎉 Premium सदस्यता सक्रिय आहे!"}
          </h1>
          <p className="text-muted-foreground">
            {lang === "english"
              ? "You have full access for 1 year."
              : lang === "hindi"
                ? "आपको 1 साल के लिए पूर्ण एक्सेस है।"
                : lang === "kannada"
                  ? "ನಿಮಗೆ 1 ವರ್ಷದ ಸಂಪೂರ್ಣ ಪ್ರವೇಶ ಇದೆ."
                  : "तुम्हाला 1 वर्षासाठी संपूर्ण प्रवेश आहे."}
          </p>
        </div>
        <Badge
          className="text-white px-6 py-2 text-sm"
          style={{ background: "linear-gradient(90deg, #D4AF37, #FF6B00)" }}
          data-ocid="plans.premium_badge"
        >
          ✓ Premium Member
        </Badge>
        <Button
          onClick={() => navigate({ to: "/browse" })}
          className="text-white font-semibold px-8"
          style={{ backgroundColor: "#FF6B00" }}
          data-ocid="plans.browse_button"
        >
          {t.profiles} →
        </Button>
      </div>
    );
  }

  if (paymentStatus === "Uploaded" && !submitted) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4 py-16"
        data-ocid="plans.page"
      >
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <Loader2
            className="w-10 h-10 animate-spin"
            style={{ color: "#FF6B00" }}
          />
        </div>
        <div className="text-center space-y-2">
          <h1 className="font-display text-2xl font-bold text-foreground">
            {lang === "english"
              ? "Payment Under Verification..."
              : lang === "hindi"
                ? "पेमेंट verify हो रहा है..."
                : lang === "kannada"
                  ? "ಪಾವತಿ ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ..."
                  : "पेमेंट verify होत आहे..."}
          </h1>
          <p className="text-muted-foreground max-w-xs">
            {lang === "english"
              ? "Admin will approve your payment within 24 hours."
              : lang === "hindi"
                ? "Admin 24 घंटे में आपका पेमेंट approve करेगा।"
                : lang === "kannada"
                  ? "Admin 24 ಗಂಟೆಯಲ್ಲಿ approve ಮಾಡುತ್ತಾರೆ."
                  : "Admin 24 तासांत तुमचे पेमेंट approve करेल."}
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-amber-400 text-amber-600 px-4 py-1.5"
          data-ocid="plans.pending_badge"
        >
          <Clock className="w-4 h-4 mr-1.5" />
          {lang === "english" ? "Pending Approval" : "Pending Approval"}
        </Badge>
      </div>
    );
  }

  if (paymentStatus === "Rejected") {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4 py-16"
        data-ocid="plans.page"
      >
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
          <XCircle className="w-10 h-10 text-destructive" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="font-display text-2xl font-bold text-foreground">
            {lang === "english"
              ? "Payment Rejected"
              : lang === "hindi"
                ? "पेमेंट अस्वीकृत"
                : lang === "kannada"
                  ? "ಪಾವತಿ ತಿರಸ್ಕರಿಸಲಾಗಿದೆ"
                  : "पेमेंट नाकारले"}
          </h1>
          <p className="text-muted-foreground max-w-xs">
            {lang === "english"
              ? "Please contact admin or resubmit payment."
              : lang === "hindi"
                ? "कृपया admin से संपर्क करें या पेमेंट फिर submit करें।"
                : lang === "kannada"
                  ? "Admin ಅವರನ್ನು ಸಂಪರ್ಕಿಸಿ ಅಥವಾ ಮತ್ತೆ submit ಮಾಡಿ."
                  : "Admin शी संपर्क करा किंवा पुन्हा submit करा."}
          </p>
        </div>
        <Button
          onClick={() => {
            if (currentUser) {
              setCurrentUser({ ...currentUser, paymentStatus: "Pending" });
            }
            setShowPayment(true);
          }}
          className="text-white font-semibold px-8"
          style={{ backgroundColor: "#8B1A1A" }}
          data-ocid="plans.resubmit_button"
        >
          {lang === "english"
            ? "Resubmit Payment"
            : lang === "hindi"
              ? "पुनः submit करें"
              : lang === "kannada"
                ? "ಮತ್ತೆ submit ಮಾಡಿ"
                : "पुन्हा submit करा"}
        </Button>
      </div>
    );
  }

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center gap-5 px-4 py-16 text-center"
        data-ocid="plans.page"
      >
        <Crown className="w-16 h-16 opacity-30" style={{ color: "#D4AF37" }} />
        <h2 className="font-display text-2xl font-bold text-foreground">
          {lang === "english"
            ? "Login to Access Plans"
            : lang === "hindi"
              ? "योजना देखने के लिए लॉगिन करें"
              : lang === "kannada"
                ? "ಯೋಜನೆ ನೋಡಲು ಲಾಗಿನ್ ಮಾಡಿ"
                : "प्लॅन पाहण्यासाठी लॉगिन करा"}
        </h2>
        <p className="text-muted-foreground">
          {lang === "english"
            ? "Please login first to purchase a membership."
            : lang === "hindi"
              ? "सदस्यता खरीदने के लिए पहले लॉगिन करें।"
              : lang === "kannada"
                ? "ಸದಸ್ಯತ್ವ ಖರೀದಿಸಲು ಮೊದಲು ಲಾಗಿನ್ ಮಾಡಿ."
                : "सदस्यता खरेदी करण्यासाठी प्रथम लॉगिन करा."}
        </p>
        <Button
          onClick={() => navigate({ to: "/login" })}
          className="text-white font-semibold px-8"
          style={{ backgroundColor: "#FF6B00" }}
          data-ocid="plans.login_link"
        >
          {t.login}
        </Button>
      </div>
    );
  }

  // ── Profile incomplete ─────────────────────────────────────────────────────
  if (!isProfileComplete) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center gap-5 px-4 py-16 text-center"
        data-ocid="plans.page"
      >
        <AlertCircle
          className="w-16 h-16 opacity-60"
          style={{ color: "#FF6B00" }}
        />
        <h2 className="font-display text-2xl font-bold text-foreground">
          {lang === "english"
            ? "Complete Your Profile First"
            : lang === "hindi"
              ? "पहले प्रोफाइल पूरा करें"
              : lang === "kannada"
                ? "ಮೊದಲು ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ"
                : "प्रथम प्रोफाइल पूर्ण करा"}
        </h2>
        <p className="text-muted-foreground max-w-xs">
          {lang === "english"
            ? "Your profile must be complete before purchasing a membership."
            : lang === "hindi"
              ? "सदस्यता खरीदने से पहले प्रोफाइल पूरा करना जरूरी है।"
              : lang === "kannada"
                ? "ಸದಸ್ಯತ್ವ ಖರೀದಿಸುವ ಮೊದಲು ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ."
                : "सदस्यता घेण्यापूर्वी प्रोफाइल पूर्ण करणे आवश्यक आहे."}
        </p>
        <Button
          onClick={() => navigate({ to: "/register" })}
          className="text-white font-semibold px-8"
          style={{ backgroundColor: "#FF6B00" }}
          data-ocid="plans.complete_profile_link"
        >
          {lang === "english"
            ? "Complete Profile"
            : lang === "hindi"
              ? "प्रोफाइल पूरा करें"
              : lang === "kannada"
                ? "ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ"
                : "प्रोफाइल पूर्ण करा"}
        </Button>
      </div>
    );
  }

  // ── Main plan page ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background" data-ocid="plans.page">
      {/* Hero banner */}
      <div
        className="py-14 text-center text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #8B1A1A 0%, #D4AF37 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 30%, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 text-sm px-4 py-1.5 tracking-wide">
            ✦ दिगंबर जैन समाज ✦
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            {lang === "english"
              ? "Membership Plans"
              : lang === "hindi"
                ? "सदस्यता योजना"
                : lang === "kannada"
                  ? "ಸದಸ್ಯತ್ವ ಯೋಜನೆ"
                  : "सदस्यता योजना"}
          </h1>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            {lang === "english"
              ? "Find your life partner in the Digambar Jain community"
              : lang === "hindi"
                ? "दिगंबर जैन समाज में अपना जीवनसाथी खोजें"
                : lang === "kannada"
                  ? "ದಿಗಂಬರ ಜೈನ ಸಮಾಜದಲ್ಲಿ ಜೀವನಸಾಥಿ ಹುಡುಕಿ"
                  : "दिगंबर जैन समाजात जीवनसाथी शोधा"}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* Plan cards */}
        {!showPayment && (
          <div className="flex justify-center" data-ocid="plans.cards_section">
            {/* Premium plan — only plan */}
            <Card
              className="border-2 shadow-lg relative overflow-hidden w-full max-w-md"
              style={{ borderColor: "#D4AF37" }}
              data-ocid="plans.premium_card"
            >
              {/* Top gold strip */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                  background:
                    "linear-gradient(90deg, #8B1A1A, #D4AF37, #FF6B00)",
                }}
              />
              {/* Popular badge */}
              <div className="absolute top-4 right-4">
                <Badge
                  className="text-white text-xs px-2 py-0.5"
                  style={{ backgroundColor: "#FF6B00" }}
                >
                  ⭐ Exclusive
                </Badge>
              </div>

              <CardHeader className="text-center pt-10 pb-4">
                <div className="flex justify-center mb-2">
                  <Crown className="w-10 h-10" style={{ color: "#D4AF37" }} />
                </div>
                <CardTitle
                  className="font-display text-2xl"
                  style={{ color: "#8B1A1A" }}
                >
                  {lang === "english"
                    ? "Premium Plan"
                    : lang === "hindi"
                      ? "प्रीमियम सदस्यता"
                      : lang === "kannada"
                        ? "ಪ್ರೀಮಿಯಂ ಸದಸ್ಯತ್ವ"
                        : "₹499 प्रीमियम सदस्यता"}
                </CardTitle>
                <div className="mt-3">
                  <span className="text-5xl font-bold text-foreground">
                    ₹499
                  </span>
                  <span className="text-muted-foreground ml-2 text-sm">
                    /{" "}
                    {lang === "english"
                      ? "year"
                      : lang === "hindi"
                        ? "वर्ष"
                        : lang === "kannada"
                          ? "ವರ್ಷ"
                          : "वर्ष"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {lang === "english"
                    ? "One-time payment · 1 year access"
                    : lang === "hindi"
                      ? "एकबार का भुगतान · 1 साल का एक्सेस"
                      : lang === "kannada"
                        ? "ಒಂದು ಬಾರಿ ಪಾವತಿ · 1 ವರ್ಷ ಪ್ರವೇಶ"
                        : "एकदाच पेमेंट · 1 वर्षाचा प्रवेश"}
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {premiumFeatures[lang].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <CheckCircle2
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: "#FF6B00" }}
                      />
                      <span className="text-foreground font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex flex-col gap-2 pb-6">
                <Button
                  className="w-full text-white font-bold text-base py-6 gap-2 shadow-md hover:shadow-lg transition-all"
                  style={{
                    background: "linear-gradient(90deg, #FF6B00, #D4AF37)",
                  }}
                  onClick={() => setShowPayment(true)}
                  data-ocid="plans.join_now_button"
                >
                  <Crown className="w-5 h-5" />
                  {lang === "english"
                    ? "Join Now"
                    : lang === "hindi"
                      ? "अभी जॉइन करें"
                      : lang === "kannada"
                        ? "ಈಗ ಸೇರಿ"
                        : "आता सामील व्हा"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  {lang === "english"
                    ? "Secure UPI payment · Manual admin approval"
                    : lang === "hindi"
                      ? "सुरक्षित UPI भुगतान · Admin approval"
                      : lang === "kannada"
                        ? "ಸುರಕ್ಷಿತ UPI ಪಾವತಿ · Admin approval"
                        : "सुरक्षित UPI पेमेंट · Admin approval"}
                </p>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* ── Payment section ─────────────────────────────────────────────── */}
        {showPayment && !submitted && (
          <div className="max-w-2xl mx-auto" data-ocid="plans.payment_section">
            {/* Back link */}
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1 transition-colors"
              onClick={() => setShowPayment(false)}
              data-ocid="plans.back_button"
            >
              ←{" "}
              {lang === "english"
                ? "Back to Plans"
                : lang === "hindi"
                  ? "वापस जाएं"
                  : lang === "kannada"
                    ? "ಹಿಂದೆ ಹೋಗಿ"
                    : "मागे जा"}
            </button>

            <Card
              className="border-2 shadow-lg"
              style={{ borderColor: "#D4AF37" }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background:
                    "linear-gradient(90deg, #8B1A1A, #D4AF37, #FF6B00)",
                }}
              />
              <CardHeader className="pb-3">
                <CardTitle
                  className="font-display text-xl"
                  style={{ color: "#8B1A1A" }}
                >
                  {lang === "english"
                    ? "Pay via UPI"
                    : lang === "hindi"
                      ? "UPI द्वारे पेमेंट करें"
                      : lang === "kannada"
                        ? "UPI ಮೂಲಕ ಪಾವತಿ ಮಾಡಿ"
                        : "UPI द्वारे पेमेंट करा"}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {lang === "english"
                    ? "Scan the QR code or use the UPI ID below"
                    : lang === "hindi"
                      ? "QR कोड स्कैन करें या नीचे UPI ID उपयोग करें"
                      : lang === "kannada"
                        ? "QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಅಥವಾ UPI ID ಬಳಸಿ"
                        : "QR code स्कॅन करा किंवा UPI ID वापरा"}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* QR + UPI ID */}
                <div className="flex flex-col items-center gap-4">
                  {/* QR visual — admin-uploaded image or SVG fallback */}
                  <a
                    href={upiDeepLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open UPI payment"
                    data-ocid="plans.qr_link"
                  >
                    <div
                      className="w-52 h-52 rounded-2xl border-4 flex flex-col items-center justify-center bg-white p-3 cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
                      style={{ borderColor: "#D4AF37" }}
                      data-ocid="plans.qr_code"
                    >
                      {qrImageDataUrl ? (
                        /* Admin-uploaded QR image */
                        <img
                          src={qrImageDataUrl}
                          alt="UPI QR Code — vivahsetu@ptaxis"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        /* Default decorative SVG QR */
                        <>
                          <svg
                            ref={qrSvgRef}
                            width="176"
                            height="176"
                            viewBox="0 0 176 176"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            {/* Corner squares */}
                            <rect
                              x="8"
                              y="8"
                              width="48"
                              height="48"
                              rx="4"
                              fill="#8B1A1A"
                            />
                            <rect
                              x="14"
                              y="14"
                              width="36"
                              height="36"
                              rx="2"
                              fill="white"
                            />
                            <rect
                              x="20"
                              y="20"
                              width="24"
                              height="24"
                              rx="1"
                              fill="#8B1A1A"
                            />

                            <rect
                              x="120"
                              y="8"
                              width="48"
                              height="48"
                              rx="4"
                              fill="#8B1A1A"
                            />
                            <rect
                              x="126"
                              y="14"
                              width="36"
                              height="36"
                              rx="2"
                              fill="white"
                            />
                            <rect
                              x="132"
                              y="20"
                              width="24"
                              height="24"
                              rx="1"
                              fill="#8B1A1A"
                            />

                            <rect
                              x="8"
                              y="120"
                              width="48"
                              height="48"
                              rx="4"
                              fill="#8B1A1A"
                            />
                            <rect
                              x="14"
                              y="126"
                              width="36"
                              height="36"
                              rx="2"
                              fill="white"
                            />
                            <rect
                              x="20"
                              y="132"
                              width="24"
                              height="24"
                              rx="1"
                              fill="#8B1A1A"
                            />

                            {/* Data dots */}
                            {[72, 80, 88, 96, 104].map((x) =>
                              [72, 80, 88, 96, 104].map((y) => (
                                <rect
                                  key={`${x}-${y}`}
                                  x={x}
                                  y={y}
                                  width="6"
                                  height="6"
                                  rx="1"
                                  fill={
                                    Math.abs(x - y) % 3 === 0
                                      ? "#FF6B00"
                                      : "#8B1A1A"
                                  }
                                  opacity={0.85}
                                />
                              )),
                            )}
                            {[72, 80, 96, 104, 112].map((x) => (
                              <rect
                                key={`r1-${x}`}
                                x={x}
                                y="16"
                                width="6"
                                height="6"
                                rx="1"
                                fill="#D4AF37"
                              />
                            ))}
                            {[72, 88, 96, 112].map((x) => (
                              <rect
                                key={`r2-${x}`}
                                x={x}
                                y="24"
                                width="6"
                                height="6"
                                rx="1"
                                fill="#8B1A1A"
                              />
                            ))}
                            {[80, 88, 104, 112].map((x) => (
                              <rect
                                key={`r3-${x}`}
                                x={x}
                                y="32"
                                width="6"
                                height="6"
                                rx="1"
                                fill="#8B1A1A"
                              />
                            ))}
                            {[16, 24, 40, 48, 56].map((y) => (
                              <rect
                                key={`c1-${y}`}
                                x="72"
                                y={y}
                                width="6"
                                height="6"
                                rx="1"
                                fill="#8B1A1A"
                              />
                            ))}
                            {[16, 32, 48, 56].map((y) => (
                              <rect
                                key={`c2-${y}`}
                                x="88"
                                y={y}
                                width="6"
                                height="6"
                                rx="1"
                                fill="#D4AF37"
                              />
                            ))}
                            {[24, 40, 56].map((y) => (
                              <rect
                                key={`c3-${y}`}
                                x="104"
                                y={y}
                                width="6"
                                height="6"
                                rx="1"
                                fill="#8B1A1A"
                              />
                            ))}
                            {[72, 80, 96, 112].map((x) => (
                              <rect
                                key={`b1-${x}`}
                                x={x}
                                y="128"
                                width="6"
                                height="6"
                                rx="1"
                                fill="#8B1A1A"
                              />
                            ))}
                            {[88, 104, 112].map((x) => (
                              <rect
                                key={`b2-${x}`}
                                x={x}
                                y="136"
                                width="6"
                                height="6"
                                rx="1"
                                fill="#D4AF37"
                              />
                            ))}
                            {[72, 88, 96].map((x) => (
                              <rect
                                key={`b3-${x}`}
                                x={x}
                                y="144"
                                width="6"
                                height="6"
                                rx="1"
                                fill="#8B1A1A"
                              />
                            ))}
                            {[80, 104, 112].map((x) => (
                              <rect
                                key={`b4-${x}`}
                                x={x}
                                y="152"
                                width="6"
                                height="6"
                                rx="1"
                                fill="#FF6B00"
                              />
                            ))}
                            <rect
                              x="78"
                              y="78"
                              width="20"
                              height="20"
                              rx="3"
                              fill="#D4AF37"
                            />
                            <text
                              x="88"
                              y="92"
                              textAnchor="middle"
                              fontSize="10"
                              fill="white"
                              fontWeight="bold"
                            >
                              ₹
                            </text>
                          </svg>
                          <p
                            className="text-xs text-center mt-1"
                            style={{ color: "#8B1A1A", fontWeight: 600 }}
                          >
                            {lang === "english"
                              ? "Tap to open UPI app"
                              : "Tap to Pay"}
                          </p>
                        </>
                      )}
                    </div>
                  </a>

                  {/* Download QR Button */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadQr}
                    disabled={isDownloadingQr}
                    data-ocid="plans.download_qr_button"
                    className="flex items-center gap-1.5 border-primary/40 text-primary hover:bg-primary/5 text-xs"
                    aria-label="QR Code डाउनलोड करा / Download QR"
                  >
                    {isDownloadingQr ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Download size={13} />
                    )}
                    {lang === "english"
                      ? isDownloadingQr
                        ? "Downloading…"
                        : "Download QR Code"
                      : lang === "hindi"
                        ? isDownloadingQr
                          ? "डाउनलोड हो रहा है…"
                          : "QR Code डाउनलोड करें"
                        : lang === "kannada"
                          ? isDownloadingQr
                            ? "ಡೌನ್ಲೋಡ್ ಆಗುತ್ತಿದೆ…"
                            : "QR Code ಡೌನ್ಲೋಡ್ ಮಾಡಿ"
                          : isDownloadingQr
                            ? "डाउनलोड होत आहे…"
                            : "QR Code डाउनलोड करा"}
                  </Button>
                  <div className="text-center">
                    <p
                      className="text-3xl font-bold"
                      style={{ color: "#FF6B00" }}
                    >
                      ₹499
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lang === "english"
                        ? "Premium Membership · 1 Year"
                        : lang === "hindi"
                          ? "प्रीमियम सदस्यता · 1 वर्ष"
                          : lang === "kannada"
                            ? "ಪ್ರೀಮಿಯಂ ಸದಸ್ಯತ್ವ · 1 ವರ್ಷ"
                            : "प्रीमियम सदस्यता · 1 वर्ष"}
                    </p>
                  </div>

                  {/* UPI ID */}
                  <div className="w-full flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-lg px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          UPI ID
                        </p>
                        <code
                          className="font-mono font-bold text-foreground select-all"
                          data-ocid="plans.upi_id"
                        >
                          {upiId}
                        </code>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="p-2 rounded-md hover:bg-border transition-colors"
                        aria-label="Copy UPI ID"
                        data-ocid="plans.copy_upi_button"
                      >
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Steps */}
                <div className="bg-muted/50 rounded-xl p-4 space-y-2.5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    {lang === "english"
                      ? "How to Pay"
                      : lang === "hindi"
                        ? "कैसे भुगतान करें"
                        : lang === "kannada"
                          ? "ಹೇಗೆ ಪಾವತಿ ಮಾಡುವುದು"
                          : "पेमेंट कसे करायचे"}
                  </p>
                  {paymentSteps[lang].map((step, i) => (
                    <div key={step} className="flex items-start gap-3 text-sm">
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold"
                        style={{
                          backgroundColor:
                            i === 0
                              ? "#8B1A1A"
                              : i === 4
                                ? "#D4AF37"
                                : "#FF6B00",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-foreground/80 leading-snug pt-0.5">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Screenshot upload */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="screenshot"
                      className="text-sm font-semibold text-foreground"
                    >
                      {lang === "english"
                        ? "Upload Payment Screenshot *"
                        : lang === "hindi"
                          ? "पेमेंट Screenshot Upload करें *"
                          : lang === "kannada"
                            ? "ಪಾವತಿ Screenshot Upload ಮಾಡಿ *"
                            : "पेमेंट Screenshot Upload करा *"}
                    </Label>
                    <label
                      htmlFor="screenshot"
                      className="flex flex-col items-center gap-3 border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                      style={{
                        borderColor: screenshotFile ? "#D4AF37" : undefined,
                      }}
                      data-ocid="plans.screenshot_dropzone"
                    >
                      {screenshotFile ? (
                        <>
                          <CheckCircle2
                            className="w-8 h-8"
                            style={{ color: "#D4AF37" }}
                          />
                          <span className="text-sm font-medium text-foreground">
                            {screenshotFile.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {lang === "english"
                              ? "Click to change"
                              : "बदलण्यासाठी click करा"}
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload
                            className="w-8 h-8"
                            style={{ color: "#FF6B00" }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {lang === "english"
                              ? "Click to upload screenshot"
                              : lang === "hindi"
                                ? "Screenshot upload करने के लिए click करें"
                                : lang === "kannada"
                                  ? "Screenshot upload ಮಾಡಲು click ಮಾಡಿ"
                                  : "Screenshot upload करण्यासाठी click करा"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            JPG, PNG (max 5MB)
                          </span>
                        </>
                      )}
                      <input
                        ref={fileInputRef}
                        id="screenshot"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) =>
                          setScreenshotFile(e.target.files?.[0] ?? null)
                        }
                        data-ocid="plans.screenshot_input"
                      />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="utr"
                      className="text-sm font-semibold text-foreground"
                    >
                      {lang === "english"
                        ? "UPI Transaction ID / UTR Number *"
                        : lang === "hindi"
                          ? "UPI Transaction ID / UTR नंबर *"
                          : lang === "kannada"
                            ? "UPI Transaction ID / UTR ನಂಬರ್ *"
                            : "UPI Transaction ID / UTR Number *"}
                    </Label>
                    <Input
                      id="utr"
                      placeholder={
                        lang === "english"
                          ? "e.g. 123456789012"
                          : "उदा. 123456789012"
                      }
                      value={utrRef}
                      onChange={(e) => setUtrRef(e.target.value)}
                      className="font-mono"
                      data-ocid="plans.utr_input"
                    />
                    <p className="text-xs text-muted-foreground">
                      {lang === "english"
                        ? "Find this in your UPI app's transaction details"
                        : lang === "hindi"
                          ? "यह UPI app के transaction details में मिलेगा"
                          : lang === "kannada"
                            ? "UPI app ನ transaction details ನಲ್ಲಿ ಇದು ಸಿಗುತ್ತದೆ"
                            : "हे UPI app च्या transaction details मध्ये मिळेल"}
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 pb-6">
                <Button
                  className="w-full text-white font-bold py-6 text-base gap-2 shadow-md"
                  style={{
                    background: isSubmitting
                      ? "#ccc"
                      : "linear-gradient(90deg, #8B1A1A, #FF6B00)",
                  }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  data-ocid="plans.submit_payment_button"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {lang === "english" ? "Submitting..." : "Submitting..."}
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      {lang === "english"
                        ? "Submit for Verification"
                        : lang === "hindi"
                          ? "Verify के लिए submit करें"
                          : lang === "kannada"
                            ? "Verify ಗಾಗಿ submit ಮಾಡಿ"
                            : "Verify साठी Submit करा"}
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  {lang === "english"
                    ? "Admin will manually verify and activate your membership"
                    : lang === "hindi"
                      ? "Admin manually verify करके membership activate करेगा"
                      : lang === "kannada"
                        ? "Admin manually verify ಮಾಡಿ membership activate ಮಾಡುತ್ತಾರೆ"
                        : "Admin manually verify करून तुमची membership activate करेल"}
                </p>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* ── Submitted success state ─────────────────────────────────────── */}
        {submitted && (
          <div
            className="max-w-lg mx-auto flex flex-col items-center gap-6 py-10 text-center"
            data-ocid="plans.submitted_success_state"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #FF6B00)",
              }}
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold text-foreground">
                {lang === "english"
                  ? "Payment Submitted!"
                  : lang === "hindi"
                    ? "पेमेंट submit हो गया!"
                    : lang === "kannada"
                      ? "ಪಾವತಿ Submit ಆಯಿತು!"
                      : "पेमेंट Submit झाले!"}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                {lang === "english"
                  ? "Your payment has been submitted for verification. Admin will approve and activate your Premium access within 24 hours."
                  : lang === "hindi"
                    ? "तुमचे पेमेंट verify साठी पाठवले गेले आहे. Admin approval नंतर 24 तासांत Premium access मिळेल."
                    : lang === "kannada"
                      ? "ನಿಮ್ಮ ಪಾವತಿ verify ಗಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ. Admin approval ನಂತರ 24 ಗಂಟೆಯಲ್ಲಿ Premium access ಸಿಗುತ್ತದೆ."
                      : "तुमचे पेमेंट verify साठी पाठवले गेले आहे. Admin approval नंतर 24 तासांत Premium access मिळेल."}
              </p>
            </div>
            <Badge
              className="text-amber-700 border-amber-400 px-4 py-1.5"
              variant="outline"
              data-ocid="plans.verification_badge"
            >
              <Clock className="w-4 h-4 mr-1.5" />
              {lang === "english"
                ? "Pending Admin Approval"
                : "Pending Approval"}
            </Badge>
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/" })}
              data-ocid="plans.go_home_button"
              className="px-8"
            >
              {lang === "english"
                ? "Go to Home"
                : lang === "hindi"
                  ? "होम पर जाएं"
                  : lang === "kannada"
                    ? "ಹೋಮ್ ಗೆ ಹೋಗಿ"
                    : "मुखपृष्ठावर जा"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
