import { d as createLucideIcon, e as useNavigate, f as useUserStore, g as useActor, r as reactExports, j as jsxRuntimeExports, C as Crown, B as Badge, b as Button, t as translations, h as createActor } from "./index-CkCNqozh.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent, d as CardFooter } from "./card-HIbIw4zR.js";
import { I as Input } from "./input-GQzGS8vR.js";
import { L as Label } from "./label-D8rR7I0u.js";
import { S as Separator } from "./separator-pMgFIsP0.js";
import { u as ue } from "./index-Blqxl4xO.js";
import { L as LoaderCircle } from "./loader-circle-6K5XJQSF.js";
import { C as CircleX } from "./circle-x-Dzfb27fV.js";
import { C as CircleAlert } from "./circle-alert-D6mrMpuY.js";
import { C as CircleCheck } from "./circle-check-DyfLjrSe.js";
import { D as Download } from "./download-GSbrD0yi.js";
import { C as Copy } from "./copy-BLCZEkFn.js";
import { U as Upload } from "./upload-aS-DvHO4.js";
import "./index-YQgpYIn2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const AMOUNT = 499;
const premiumFeatures = {
  marathi: [
    "अमर्यादित प्रोफाइल पहाणे",
    "थेट संपर्क तपशील मिळवा",
    "प्राधान्य यादीत स्थान",
    "संपूर्ण प्रोफाइल माहिती",
    "जुळवणी सूचना",
    "वर्षभर प्रवेश (1 वर्ष)"
  ],
  hindi: [
    "असीमित प्रोफाइल देखना",
    "सीधा संपर्क जानकारी",
    "प्राथमिकता सूची में स्थान",
    "पूर्ण प्रोफाइल जानकारी",
    "मैच सूचनाएं",
    "वार्षिक सदस्यता (1 वर्ष)"
  ],
  kannada: [
    "ಅಪರಿಮಿತ ಪ್ರೊಫೈಲ್ ವೀಕ್ಷಣೆ",
    "ನೇರ ಸಂಪರ್ಕ ವಿವರಗಳು",
    "ಆದ್ಯತೆ ಪಟ್ಟಿ",
    "ಸಂಪೂರ್ಣ ಪ್ರೊಫೈಲ್ ಮಾಹಿತಿ",
    "ಹೊಂದಾಣಿಕೆ ಅಧಿಸೂಚನೆಗಳು",
    "ವಾರ್ಷಿಕ ಸದಸ್ಯತ್ವ (1 ವರ್ಷ)"
  ],
  english: [
    "Unlimited profile views",
    "Direct contact details",
    "Priority listing",
    "Full profile information",
    "Match notifications",
    "Annual validity (1 year)"
  ]
};
const paymentSteps = {
  marathi: [
    "वरील QR स्कॅन करा किंवा UPI ID वापरा",
    "₹499 पाठवा",
    "Transaction screenshot घ्या",
    "UTR / Transaction ID नोंदवा",
    "खाली submit करा — Admin 24 तासांत approve करेल"
  ],
  hindi: [
    "ऊपर QR स्कैन करें या UPI ID उपयोग करें",
    "₹499 भेजें",
    "Transaction screenshot लें",
    "UTR / Transaction ID नोट करें",
    "नीचे submit करें — Admin 24 घंटे में approve करेगा"
  ],
  kannada: [
    "ಮೇಲಿನ QR ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಅಥವಾ UPI ID ಬಳಸಿ",
    "₹499 ಕಳುಹಿಸಿ",
    "Transaction screenshot ತೆಗೆದುಕೊಳ್ಳಿ",
    "UTR / Transaction ID ನಮೂದಿಸಿ",
    "ಕೆಳಗೆ submit ಮಾಡಿ — Admin 24 ಗಂಟೆಯಲ್ಲಿ approve ಮಾಡುತ್ತಾರೆ"
  ],
  english: [
    "Scan the QR above or use the UPI ID",
    "Send ₹499",
    "Take a screenshot of the transaction",
    "Note the UTR / Transaction ID",
    "Submit below — Admin will approve within 24 hours"
  ]
};
function PlansPage() {
  const navigate = useNavigate();
  const {
    currentUser,
    isLoggedIn,
    isProfileComplete,
    setCurrentUser,
    paymentConfig,
    setPaymentConfig
  } = useUserStore();
  const lang = useUserStore((s) => s.currentLanguage);
  const t = translations[lang];
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const upiId = paymentConfig.upiId || "vivahsetu@ptaxis";
  const qrImageDataUrl = paymentConfig.qrImageDataUrl;
  const upiDeepLink = `upi://pay?pa=${upiId}&pn=Vivah%20Setu&am=${AMOUNT}&cu=INR&tn=Premium%20Membership`;
  const [showPayment, setShowPayment] = reactExports.useState(false);
  const [screenshotFile, setScreenshotFile] = reactExports.useState(null);
  const [utrRef, setUtrRef] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [isDownloadingQr, setIsDownloadingQr] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const qrSvgRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!actor || actorLoading) return;
    actor.adminGetPaymentConfig().then((config) => {
      if (config) {
        setPaymentConfig({
          upiId: config.upiId || "vivahsetu@ptaxis",
          qrImageDataUrl: config.qrImageUrl || ""
        });
      }
    }).catch(() => {
    });
  }, [actor, actorLoading, setPaymentConfig]);
  const paymentStatus = (currentUser == null ? void 0 : currentUser.paymentStatus) ?? "Pending";
  const isPremium = (currentUser == null ? void 0 : currentUser.membershipTier) === "Premium" || paymentStatus === "Approved";
  function handleCopyUpi() {
    navigator.clipboard.writeText(upiId);
    ue.success("UPI ID copied!", { duration: 2e3 });
  }
  async function handleDownloadQr() {
    setIsDownloadingQr(true);
    try {
      if (qrImageDataUrl) {
        const link = document.createElement("a");
        link.href = qrImageDataUrl;
        link.download = "vivahsetu-upi-qr.png";
        link.click();
        ue.success(
          lang === "english" ? "QR Code downloaded!" : lang === "hindi" ? "QR Code डाउनलोड हुआ!" : lang === "kannada" ? "QR Code ಡೌನ್ಲೋಡ್ ಆಯಿತು!" : "QR Code डाउनलोड झाला!",
          { duration: 3e3 }
        );
        return;
      }
      const svgEl = qrSvgRef.current;
      if (!svgEl) {
        setIsDownloadingQr(false);
        return;
      }
      const serializer = new XMLSerializer();
      const svgStr = serializer.serializeToString(svgEl);
      const svgBlob = new Blob([svgStr], {
        type: "image/svg+xml;charset=utf-8"
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
      await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 12, 12, 376, 376);
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
      ue.success(
        lang === "english" ? "QR Code downloaded!" : lang === "hindi" ? "QR Code डाउनलोड हुआ!" : lang === "kannada" ? "QR Code ಡೌನ್ಲೋಡ್ ಆಯಿತು!" : "QR Code डाउनलोड झाला!",
        { duration: 3e3 }
      );
    } finally {
      setIsDownloadingQr(false);
    }
  }
  async function handleSubmit() {
    if (!screenshotFile) {
      ue.error("Screenshot upload करा");
      return;
    }
    if (!utrRef.trim()) {
      ue.error("UTR / Transaction ID टाका");
      return;
    }
    setIsSubmitting(true);
    const mockScreenshotUrl = URL.createObjectURL(screenshotFile);
    try {
      if (actor) {
        const result = await actor.submitPaymentScreenshot(
          mockScreenshotUrl,
          utrRef.trim()
        );
        if (result.__kind__ === "ok") {
          if (currentUser) {
            setCurrentUser({
              ...currentUser,
              paymentStatus: "Uploaded",
              paymentScreenshotUrl: mockScreenshotUrl,
              paymentUpiRef: utrRef.trim()
            });
          }
          setIsSubmitting(false);
          setSubmitted(true);
          ue.success("पेमेंट submit झाले! Admin लवकरच approve करेल.");
          return;
        }
      }
      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          paymentStatus: "Uploaded",
          paymentScreenshotUrl: mockScreenshotUrl,
          paymentUpiRef: utrRef.trim()
        });
      }
    } catch {
      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          paymentStatus: "Uploaded",
          paymentScreenshotUrl: mockScreenshotUrl,
          paymentUpiRef: utrRef.trim()
        });
      }
    }
    setIsSubmitting(false);
    setSubmitted(true);
    ue.success("पेमेंट submit झाले! Admin लवकरच approve करेल.");
  }
  if (isPremium) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4 py-16",
        "data-ocid": "plans.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-20 rounded-full flex items-center justify-center",
              style: { background: "linear-gradient(135deg, #D4AF37, #FF6B00)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-10 h-10 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: lang === "english" ? "🎉 Premium Membership Active!" : lang === "hindi" ? "🎉 Premium सदस्यता सक्रिय है!" : lang === "kannada" ? "🎉 Premium ಸದಸ್ಯತ್ವ ಸಕ್ರಿಯವಾಗಿದೆ!" : "🎉 Premium सदस्यता सक्रिय आहे!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: lang === "english" ? "You have full access for 1 year." : lang === "hindi" ? "आपको 1 साल के लिए पूर्ण एक्सेस है।" : lang === "kannada" ? "ನಿಮಗೆ 1 ವರ್ಷದ ಸಂಪೂರ್ಣ ಪ್ರವೇಶ ಇದೆ." : "तुम्हाला 1 वर्षासाठी संपूर्ण प्रवेश आहे." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: "text-white px-6 py-2 text-sm",
              style: { background: "linear-gradient(90deg, #D4AF37, #FF6B00)" },
              "data-ocid": "plans.premium_badge",
              children: "✓ Premium Member"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => navigate({ to: "/browse" }),
              className: "text-white font-semibold px-8",
              style: { backgroundColor: "#FF6B00" },
              "data-ocid": "plans.browse_button",
              children: [
                t.profiles,
                " →"
              ]
            }
          )
        ]
      }
    );
  }
  if (paymentStatus === "Uploaded" && !submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4 py-16",
        "data-ocid": "plans.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            LoaderCircle,
            {
              className: "w-10 h-10 animate-spin",
              style: { color: "#FF6B00" }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: lang === "english" ? "Payment Under Verification..." : lang === "hindi" ? "पेमेंट verify हो रहा है..." : lang === "kannada" ? "ಪಾವತಿ ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ..." : "पेमेंट verify होत आहे..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs", children: lang === "english" ? "Admin will approve your payment within 24 hours." : lang === "hindi" ? "Admin 24 घंटे में आपका पेमेंट approve करेगा।" : lang === "kannada" ? "Admin 24 ಗಂಟೆಯಲ್ಲಿ approve ಮಾಡುತ್ತಾರೆ." : "Admin 24 तासांत तुमचे पेमेंट approve करेल." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "border-amber-400 text-amber-600 px-4 py-1.5",
              "data-ocid": "plans.pending_badge",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 mr-1.5" }),
                lang === "english" ? "Pending Approval" : "Pending Approval"
              ]
            }
          )
        ]
      }
    );
  }
  if (paymentStatus === "Rejected") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4 py-16",
        "data-ocid": "plans.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-10 h-10 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: lang === "english" ? "Payment Rejected" : lang === "hindi" ? "पेमेंट अस्वीकृत" : lang === "kannada" ? "ಪಾವತಿ ತಿರಸ್ಕರಿಸಲಾಗಿದೆ" : "पेमेंट नाकारले" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs", children: lang === "english" ? "Please contact admin or resubmit payment." : lang === "hindi" ? "कृपया admin से संपर्क करें या पेमेंट फिर submit करें।" : lang === "kannada" ? "Admin ಅವರನ್ನು ಸಂಪರ್ಕಿಸಿ ಅಥವಾ ಮತ್ತೆ submit ಮಾಡಿ." : "Admin शी संपर्क करा किंवा पुन्हा submit करा." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => {
                if (currentUser) {
                  setCurrentUser({ ...currentUser, paymentStatus: "Pending" });
                }
                setShowPayment(true);
              },
              className: "text-white font-semibold px-8",
              style: { backgroundColor: "#8B1A1A" },
              "data-ocid": "plans.resubmit_button",
              children: lang === "english" ? "Resubmit Payment" : lang === "hindi" ? "पुनः submit करें" : lang === "kannada" ? "ಮತ್ತೆ submit ಮಾಡಿ" : "पुन्हा submit करा"
            }
          )
        ]
      }
    );
  }
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center gap-5 px-4 py-16 text-center",
        "data-ocid": "plans.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-16 h-16 opacity-30", style: { color: "#D4AF37" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: lang === "english" ? "Login to Access Plans" : lang === "hindi" ? "योजना देखने के लिए लॉगिन करें" : lang === "kannada" ? "ಯೋಜನೆ ನೋಡಲು ಲಾಗಿನ್ ಮಾಡಿ" : "प्लॅन पाहण्यासाठी लॉगिन करा" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: lang === "english" ? "Please login first to purchase a membership." : lang === "hindi" ? "सदस्यता खरीदने के लिए पहले लॉगिन करें।" : lang === "kannada" ? "ಸದಸ್ಯತ್ವ ಖರೀದಿಸಲು ಮೊದಲು ಲಾಗಿನ್ ಮಾಡಿ." : "सदस्यता खरेदी करण्यासाठी प्रथम लॉगिन करा." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => navigate({ to: "/login" }),
              className: "text-white font-semibold px-8",
              style: { backgroundColor: "#FF6B00" },
              "data-ocid": "plans.login_link",
              children: t.login
            }
          )
        ]
      }
    );
  }
  if (!isProfileComplete) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center gap-5 px-4 py-16 text-center",
        "data-ocid": "plans.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleAlert,
            {
              className: "w-16 h-16 opacity-60",
              style: { color: "#FF6B00" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: lang === "english" ? "Complete Your Profile First" : lang === "hindi" ? "पहले प्रोफाइल पूरा करें" : lang === "kannada" ? "ಮೊದಲು ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ" : "प्रथम प्रोफाइल पूर्ण करा" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs", children: lang === "english" ? "Your profile must be complete before purchasing a membership." : lang === "hindi" ? "सदस्यता खरीदने से पहले प्रोफाइल पूरा करना जरूरी है।" : lang === "kannada" ? "ಸದಸ್ಯತ್ವ ಖರೀದಿಸುವ ಮೊದಲು ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ." : "सदस्यता घेण्यापूर्वी प्रोफाइल पूर्ण करणे आवश्यक आहे." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => navigate({ to: "/register" }),
              className: "text-white font-semibold px-8",
              style: { backgroundColor: "#FF6B00" },
              "data-ocid": "plans.complete_profile_link",
              children: lang === "english" ? "Complete Profile" : lang === "hindi" ? "प्रोफाइल पूरा करें" : lang === "kannada" ? "ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ" : "प्रोफाइल पूर्ण करा"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "plans.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-14 text-center text-white relative overflow-hidden",
        style: {
          background: "linear-gradient(135deg, #8B1A1A 0%, #D4AF37 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-10 pointer-events-none",
              style: {
                backgroundImage: "radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 30%, #fff 1px, transparent 1px)",
                backgroundSize: "60px 60px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-white/20 text-white border-white/30 text-sm px-4 py-1.5 tracking-wide", children: "✦ दिगंबर जैन समाज ✦" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold mb-3 tracking-tight", children: lang === "english" ? "Membership Plans" : lang === "hindi" ? "सदस्यता योजना" : lang === "kannada" ? "ಸದಸ್ಯತ್ವ ಯೋಜನೆ" : "सदस्यता योजना" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-lg max-w-md mx-auto", children: lang === "english" ? "Find your life partner in the Digambar Jain community" : lang === "hindi" ? "दिगंबर जैन समाज में अपना जीवनसाथी खोजें" : lang === "kannada" ? "ದಿಗಂಬರ ಜೈನ ಸಮಾಜದಲ್ಲಿ ಜೀವನಸಾಥಿ ಹುಡುಕಿ" : "दिगंबर जैन समाजात जीवनसाथी शोधा" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-12 space-y-12", children: [
      !showPayment && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", "data-ocid": "plans.cards_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "border-2 shadow-lg relative overflow-hidden w-full max-w-md",
          style: { borderColor: "#D4AF37" },
          "data-ocid": "plans.premium_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-0 left-0 right-0 h-1.5",
                style: {
                  background: "linear-gradient(90deg, #8B1A1A, #D4AF37, #FF6B00)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: "text-white text-xs px-2 py-0.5",
                style: { backgroundColor: "#FF6B00" },
                children: "⭐ Exclusive"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center pt-10 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-10 h-10", style: { color: "#D4AF37" } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CardTitle,
                {
                  className: "font-display text-2xl",
                  style: { color: "#8B1A1A" },
                  children: lang === "english" ? "Premium Plan" : lang === "hindi" ? "प्रीमियम सदस्यता" : lang === "kannada" ? "ಪ್ರೀಮಿಯಂ ಸದಸ್ಯತ್ವ" : "₹499 प्रीमियम सदस्यता"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl font-bold text-foreground", children: "₹499" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-2 text-sm", children: [
                  "/",
                  " ",
                  lang === "english" ? "year" : lang === "hindi" ? "वर्ष" : lang === "kannada" ? "ವರ್ಷ" : "वर्ष"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: lang === "english" ? "One-time payment · 1 year access" : lang === "hindi" ? "एकबार का भुगतान · 1 साल का एक्सेस" : lang === "kannada" ? "ಒಂದು ಬಾರಿ ಪಾವತಿ · 1 ವರ್ಷ ಪ್ರವೇಶ" : "एकदाच पेमेंट · 1 वर्षाचा प्रवेश" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: premiumFeatures[lang].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleCheck,
                {
                  className: "w-5 h-5 flex-shrink-0",
                  style: { color: "#FF6B00" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: f })
            ] }, f)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "flex flex-col gap-2 pb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "w-full text-white font-bold text-base py-6 gap-2 shadow-md hover:shadow-lg transition-all",
                  style: {
                    background: "linear-gradient(90deg, #FF6B00, #D4AF37)"
                  },
                  onClick: () => setShowPayment(true),
                  "data-ocid": "plans.join_now_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5" }),
                    lang === "english" ? "Join Now" : lang === "hindi" ? "अभी जॉइन करें" : lang === "kannada" ? "ಈಗ ಸೇರಿ" : "आता सामील व्हा"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: lang === "english" ? "Secure UPI payment · Manual admin approval" : lang === "hindi" ? "सुरक्षित UPI भुगतान · Admin approval" : lang === "kannada" ? "ಸುರಕ್ಷಿತ UPI ಪಾವತಿ · Admin approval" : "सुरक्षित UPI पेमेंट · Admin approval" })
            ] })
          ]
        }
      ) }),
      showPayment && !submitted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", "data-ocid": "plans.payment_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1 transition-colors",
            onClick: () => setShowPayment(false),
            "data-ocid": "plans.back_button",
            children: [
              "←",
              " ",
              lang === "english" ? "Back to Plans" : lang === "hindi" ? "वापस जाएं" : lang === "kannada" ? "ಹಿಂದೆ ಹೋಗಿ" : "मागे जा"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "border-2 shadow-lg",
            style: { borderColor: "#D4AF37" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-0 left-0 right-0 h-1",
                  style: {
                    background: "linear-gradient(90deg, #8B1A1A, #D4AF37, #FF6B00)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CardTitle,
                  {
                    className: "font-display text-xl",
                    style: { color: "#8B1A1A" },
                    children: lang === "english" ? "Pay via UPI" : lang === "hindi" ? "UPI द्वारे पेमेंट करें" : lang === "kannada" ? "UPI ಮೂಲಕ ಪಾವತಿ ಮಾಡಿ" : "UPI द्वारे पेमेंट करा"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: lang === "english" ? "Scan the QR code or use the UPI ID below" : lang === "hindi" ? "QR कोड स्कैन करें या नीचे UPI ID उपयोग करें" : lang === "kannada" ? "QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಅಥವಾ UPI ID ಬಳಸಿ" : "QR code स्कॅन करा किंवा UPI ID वापरा" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: upiDeepLink,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "aria-label": "Open UPI payment",
                      "data-ocid": "plans.qr_link",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-52 h-52 rounded-2xl border-4 flex flex-col items-center justify-center bg-white p-3 cursor-pointer hover:shadow-md transition-shadow overflow-hidden",
                          style: { borderColor: "#D4AF37" },
                          "data-ocid": "plans.qr_code",
                          children: qrImageDataUrl ? (
                            /* Admin-uploaded QR image */
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: qrImageDataUrl,
                                alt: "UPI QR Code — vivahsetu@ptaxis",
                                className: "w-full h-full object-contain"
                              }
                            )
                          ) : (
                            /* Default decorative SVG QR */
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "svg",
                                {
                                  ref: qrSvgRef,
                                  width: "176",
                                  height: "176",
                                  viewBox: "0 0 176 176",
                                  fill: "none",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  "aria-hidden": "true",
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x: "8",
                                        y: "8",
                                        width: "48",
                                        height: "48",
                                        rx: "4",
                                        fill: "#8B1A1A"
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x: "14",
                                        y: "14",
                                        width: "36",
                                        height: "36",
                                        rx: "2",
                                        fill: "white"
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x: "20",
                                        y: "20",
                                        width: "24",
                                        height: "24",
                                        rx: "1",
                                        fill: "#8B1A1A"
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x: "120",
                                        y: "8",
                                        width: "48",
                                        height: "48",
                                        rx: "4",
                                        fill: "#8B1A1A"
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x: "126",
                                        y: "14",
                                        width: "36",
                                        height: "36",
                                        rx: "2",
                                        fill: "white"
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x: "132",
                                        y: "20",
                                        width: "24",
                                        height: "24",
                                        rx: "1",
                                        fill: "#8B1A1A"
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x: "8",
                                        y: "120",
                                        width: "48",
                                        height: "48",
                                        rx: "4",
                                        fill: "#8B1A1A"
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x: "14",
                                        y: "126",
                                        width: "36",
                                        height: "36",
                                        rx: "2",
                                        fill: "white"
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x: "20",
                                        y: "132",
                                        width: "24",
                                        height: "24",
                                        rx: "1",
                                        fill: "#8B1A1A"
                                      }
                                    ),
                                    [72, 80, 88, 96, 104].map(
                                      (x) => [72, 80, 88, 96, 104].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "rect",
                                        {
                                          x,
                                          y,
                                          width: "6",
                                          height: "6",
                                          rx: "1",
                                          fill: Math.abs(x - y) % 3 === 0 ? "#FF6B00" : "#8B1A1A",
                                          opacity: 0.85
                                        },
                                        `${x}-${y}`
                                      ))
                                    ),
                                    [72, 80, 96, 104, 112].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x,
                                        y: "16",
                                        width: "6",
                                        height: "6",
                                        rx: "1",
                                        fill: "#D4AF37"
                                      },
                                      `r1-${x}`
                                    )),
                                    [72, 88, 96, 112].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x,
                                        y: "24",
                                        width: "6",
                                        height: "6",
                                        rx: "1",
                                        fill: "#8B1A1A"
                                      },
                                      `r2-${x}`
                                    )),
                                    [80, 88, 104, 112].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x,
                                        y: "32",
                                        width: "6",
                                        height: "6",
                                        rx: "1",
                                        fill: "#8B1A1A"
                                      },
                                      `r3-${x}`
                                    )),
                                    [16, 24, 40, 48, 56].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x: "72",
                                        y,
                                        width: "6",
                                        height: "6",
                                        rx: "1",
                                        fill: "#8B1A1A"
                                      },
                                      `c1-${y}`
                                    )),
                                    [16, 32, 48, 56].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x: "88",
                                        y,
                                        width: "6",
                                        height: "6",
                                        rx: "1",
                                        fill: "#D4AF37"
                                      },
                                      `c2-${y}`
                                    )),
                                    [24, 40, 56].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x: "104",
                                        y,
                                        width: "6",
                                        height: "6",
                                        rx: "1",
                                        fill: "#8B1A1A"
                                      },
                                      `c3-${y}`
                                    )),
                                    [72, 80, 96, 112].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x,
                                        y: "128",
                                        width: "6",
                                        height: "6",
                                        rx: "1",
                                        fill: "#8B1A1A"
                                      },
                                      `b1-${x}`
                                    )),
                                    [88, 104, 112].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x,
                                        y: "136",
                                        width: "6",
                                        height: "6",
                                        rx: "1",
                                        fill: "#D4AF37"
                                      },
                                      `b2-${x}`
                                    )),
                                    [72, 88, 96].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x,
                                        y: "144",
                                        width: "6",
                                        height: "6",
                                        rx: "1",
                                        fill: "#8B1A1A"
                                      },
                                      `b3-${x}`
                                    )),
                                    [80, 104, 112].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x,
                                        y: "152",
                                        width: "6",
                                        height: "6",
                                        rx: "1",
                                        fill: "#FF6B00"
                                      },
                                      `b4-${x}`
                                    )),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "rect",
                                      {
                                        x: "78",
                                        y: "78",
                                        width: "20",
                                        height: "20",
                                        rx: "3",
                                        fill: "#D4AF37"
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "text",
                                      {
                                        x: "88",
                                        y: "92",
                                        textAnchor: "middle",
                                        fontSize: "10",
                                        fill: "white",
                                        fontWeight: "bold",
                                        children: "₹"
                                      }
                                    )
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  className: "text-xs text-center mt-1",
                                  style: { color: "#8B1A1A", fontWeight: 600 },
                                  children: lang === "english" ? "Tap to open UPI app" : "Tap to Pay"
                                }
                              )
                            ] })
                          )
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      onClick: handleDownloadQr,
                      disabled: isDownloadingQr,
                      "data-ocid": "plans.download_qr_button",
                      className: "flex items-center gap-1.5 border-primary/40 text-primary hover:bg-primary/5 text-xs",
                      "aria-label": "QR Code डाउनलोड करा / Download QR",
                      children: [
                        isDownloadingQr ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 13, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                        lang === "english" ? isDownloadingQr ? "Downloading…" : "Download QR Code" : lang === "hindi" ? isDownloadingQr ? "डाउनलोड हो रहा है…" : "QR Code डाउनलोड करें" : lang === "kannada" ? isDownloadingQr ? "ಡೌನ್ಲೋಡ್ ಆಗುತ್ತಿದೆ…" : "QR Code ಡೌನ್ಲೋಡ್ ಮಾಡಿ" : isDownloadingQr ? "डाउनलोड होत आहे…" : "QR Code डाउनलोड करा"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-3xl font-bold",
                        style: { color: "#FF6B00" },
                        children: "₹499"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "english" ? "Premium Membership · 1 Year" : lang === "hindi" ? "प्रीमियम सदस्यता · 1 वर्ष" : lang === "kannada" ? "ಪ್ರೀಮಿಯಂ ಸದಸ್ಯತ್ವ · 1 ವರ್ಷ" : "प्रीमियम सदस्यता · 1 वर्ष" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-muted rounded-lg px-4 py-3 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "UPI ID" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "code",
                        {
                          className: "font-mono font-bold text-foreground select-all",
                          "data-ocid": "plans.upi_id",
                          children: upiId
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleCopyUpi,
                        className: "p-2 rounded-md hover:bg-border transition-colors",
                        "aria-label": "Copy UPI ID",
                        "data-ocid": "plans.copy_upi_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4 text-muted-foreground" })
                      }
                    )
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-xl p-4 space-y-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: lang === "english" ? "How to Pay" : lang === "hindi" ? "कैसे भुगतान करें" : lang === "kannada" ? "ಹೇಗೆ ಪಾವತಿ ಮಾಡುವುದು" : "पेमेंट कसे करायचे" }),
                  paymentSteps[lang].map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "flex-shrink-0 w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold",
                        style: {
                          backgroundColor: i === 0 ? "#8B1A1A" : i === 4 ? "#D4AF37" : "#FF6B00"
                        },
                        children: i + 1
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80 leading-snug pt-0.5", children: step })
                  ] }, step))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "screenshot",
                        className: "text-sm font-semibold text-foreground",
                        children: lang === "english" ? "Upload Payment Screenshot *" : lang === "hindi" ? "पेमेंट Screenshot Upload करें *" : lang === "kannada" ? "ಪಾವತಿ Screenshot Upload ಮಾಡಿ *" : "पेमेंट Screenshot Upload करा *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: "screenshot",
                        className: "flex flex-col items-center gap-3 border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-muted/50 transition-colors",
                        style: {
                          borderColor: screenshotFile ? "#D4AF37" : void 0
                        },
                        "data-ocid": "plans.screenshot_dropzone",
                        children: [
                          screenshotFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              CircleCheck,
                              {
                                className: "w-8 h-8",
                                style: { color: "#D4AF37" }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: screenshotFile.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: lang === "english" ? "Click to change" : "बदलण्यासाठी click करा" })
                          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Upload,
                              {
                                className: "w-8 h-8",
                                style: { color: "#FF6B00" }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: lang === "english" ? "Click to upload screenshot" : lang === "hindi" ? "Screenshot upload करने के लिए click करें" : lang === "kannada" ? "Screenshot upload ಮಾಡಲು click ಮಾಡಿ" : "Screenshot upload करण्यासाठी click करा" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "JPG, PNG (max 5MB)" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              ref: fileInputRef,
                              id: "screenshot",
                              type: "file",
                              accept: "image/*",
                              className: "sr-only",
                              onChange: (e) => {
                                var _a;
                                return setScreenshotFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                              },
                              "data-ocid": "plans.screenshot_input"
                            }
                          )
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "utr",
                        className: "text-sm font-semibold text-foreground",
                        children: lang === "english" ? "UPI Transaction ID / UTR Number *" : lang === "hindi" ? "UPI Transaction ID / UTR नंबर *" : lang === "kannada" ? "UPI Transaction ID / UTR ನಂಬರ್ *" : "UPI Transaction ID / UTR Number *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "utr",
                        placeholder: lang === "english" ? "e.g. 123456789012" : "उदा. 123456789012",
                        value: utrRef,
                        onChange: (e) => setUtrRef(e.target.value),
                        className: "font-mono",
                        "data-ocid": "plans.utr_input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "english" ? "Find this in your UPI app's transaction details" : lang === "hindi" ? "यह UPI app के transaction details में मिलेगा" : lang === "kannada" ? "UPI app ನ transaction details ನಲ್ಲಿ ಇದು ಸಿಗುತ್ತದೆ" : "हे UPI app च्या transaction details मध्ये मिळेल" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "flex flex-col gap-3 pb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: "w-full text-white font-bold py-6 text-base gap-2 shadow-md",
                    style: {
                      background: isSubmitting ? "#ccc" : "linear-gradient(90deg, #8B1A1A, #FF6B00)"
                    },
                    onClick: handleSubmit,
                    disabled: isSubmitting,
                    "data-ocid": "plans.submit_payment_button",
                    children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }),
                      lang === "english" ? "Submitting..." : "Submitting..."
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5" }),
                      lang === "english" ? "Submit for Verification" : lang === "hindi" ? "Verify के लिए submit करें" : lang === "kannada" ? "Verify ಗಾಗಿ submit ಮಾಡಿ" : "Verify साठी Submit करा"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: lang === "english" ? "Admin will manually verify and activate your membership" : lang === "hindi" ? "Admin manually verify करके membership activate करेगा" : lang === "kannada" ? "Admin manually verify ಮಾಡಿ membership activate ಮಾಡುತ್ತಾರೆ" : "Admin manually verify करून तुमची membership activate करेल" })
              ] })
            ]
          }
        )
      ] }),
      submitted && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "max-w-lg mx-auto flex flex-col items-center gap-6 py-10 text-center",
          "data-ocid": "plans.submitted_success_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-20 h-20 rounded-full flex items-center justify-center",
                style: {
                  background: "linear-gradient(135deg, #D4AF37, #FF6B00)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-white" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: lang === "english" ? "Payment Submitted!" : lang === "hindi" ? "पेमेंट submit हो गया!" : lang === "kannada" ? "ಪಾವತಿ Submit ಆಯಿತು!" : "पेमेंट Submit झाले!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed max-w-sm", children: lang === "english" ? "Your payment has been submitted for verification. Admin will approve and activate your Premium access within 24 hours." : lang === "hindi" ? "तुमचे पेमेंट verify साठी पाठवले गेले आहे. Admin approval नंतर 24 तासांत Premium access मिळेल." : lang === "kannada" ? "ನಿಮ್ಮ ಪಾವತಿ verify ಗಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ. Admin approval ನಂತರ 24 ಗಂಟೆಯಲ್ಲಿ Premium access ಸಿಗುತ್ತದೆ." : "तुमचे पेमेंट verify साठी पाठवले गेले आहे. Admin approval नंतर 24 तासांत Premium access मिळेल." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                className: "text-amber-700 border-amber-400 px-4 py-1.5",
                variant: "outline",
                "data-ocid": "plans.verification_badge",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 mr-1.5" }),
                  lang === "english" ? "Pending Admin Approval" : "Pending Approval"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => navigate({ to: "/" }),
                "data-ocid": "plans.go_home_button",
                className: "px-8",
                children: lang === "english" ? "Go to Home" : lang === "hindi" ? "होम पर जाएं" : lang === "kannada" ? "ಹೋಮ್ ಗೆ ಹೋಗಿ" : "मुखपृष्ठावर जा"
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  PlansPage as default
};
