import { d as createLucideIcon, i as useParams, e as useNavigate, f as useUserStore, r as reactExports, j as jsxRuntimeExports, S as Skeleton, C as Crown, B as Badge, b as Button, t as translations, M as MessageCircle } from "./index-CkCNqozh.js";
import { S as Separator } from "./separator-pMgFIsP0.js";
import { u as ue } from "./index-Blqxl4xO.js";
import { K as KundaliMilanModal } from "./KundaliMilanModal-DTm1rHfs.js";
import { M as MemberPhoto, P as ProfileCard, B as Briefcase } from "./ProfileCard-CPDvFsC2.js";
import { s as sampleMembers, H as Heart } from "./sampleData-Bygj8EpR.js";
import { A as ArrowLeft } from "./arrow-left-nBkPSAgJ.js";
import { C as ChevronRight } from "./chevron-right-Cn4b47xN.js";
import { m as motion } from "./proxy-CSUsetum.js";
import { C as CircleCheck } from "./circle-check-DyfLjrSe.js";
import { C as Calendar } from "./calendar-BYjQ37W0.js";
import { M as MapPin } from "./share-2-CqQsbMng.js";
import { L as Lock } from "./lock-BKENGVXz.js";
import { S as Star } from "./star-QsiIcRRZ.js";
import { G as GraduationCap } from "./graduation-cap-Ck9csJB0.js";
import { U as Users } from "./users-I61Bioj6.js";
import { C as Camera } from "./camera-Bijeno3g.js";
import { H as House } from "./house-CNj4sAKF.js";
import "./index-YQgpYIn2.js";
import "./dialog-26zOO2FL.js";
import "./Combination-BMMvFAE9.js";
import "./index-C49Lig9R.js";
import "./circle-alert-D6mrMpuY.js";
import "./copy-BLCZEkFn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16", key: "1ifwr1" }],
  [
    "path",
    {
      d: "m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
      key: "17abbs"
    }
  ],
  ["path", { d: "m2 15 6 6", key: "10dquu" }],
  [
    "path",
    {
      d: "M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z",
      key: "1h3036"
    }
  ]
];
const HandHeart = createLucideIcon("hand-heart", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
      key: "icamh8"
    }
  ],
  ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
  ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
  ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
  ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }]
];
const Ruler = createLucideIcon("ruler", __iconNode);
const TABS = [
  { key: "personal", label: "व्यक्तिगत", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14 }) },
  { key: "community", label: "समाज", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 14 }) },
  { key: "career", label: "करियर", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 14 }) },
  { key: "family", label: "परिवार", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 14 }) },
  { key: "preferences", label: "जीवनसाथी", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 14 }) }
];
const PHOTO_VALIDATION = {
  maxSize: 5 * 1024 * 1024,
  types: ["image/jpeg", "image/png"],
  errors: {
    size: "फाईल 5MB पेक्षा जास्त आहे / File exceeds 5MB / फ़ाइल 5MB से बड़ी है / ಫೈಲ್ 5MB ಮೀರಿದೆ",
    type: "फक्त JPG/PNG / Only JPG or PNG / केवल JPG/PNG / ಜೆಪಿಜಿ/ಪಿಎನ್ಜಿ ಮಾತ್ರ"
  }
};
function PhotoUploadButton({
  onUpload,
  uploading
}) {
  const ref = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "data-ocid": "profile.change_photo.upload_button",
        disabled: uploading,
        onClick: () => {
          var _a;
          return (_a = ref.current) == null ? void 0 : _a.click();
        },
        className: "absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-primary/90 transition-smooth disabled:opacity-60",
        "aria-label": "फोटो बदला / Change Photo",
        children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 14 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref,
        type: "file",
        accept: "image/jpeg,image/png",
        className: "hidden",
        onChange: (e) => {
          var _a;
          const file = (_a = e.target.files) == null ? void 0 : _a[0];
          if (!file) return;
          if (!PHOTO_VALIDATION.types.includes(file.type)) {
            ue.error(PHOTO_VALIDATION.errors.type);
            return;
          }
          if (file.size > PHOTO_VALIDATION.maxSize) {
            ue.error(PHOTO_VALIDATION.errors.size);
            return;
          }
          onUpload(file);
          e.target.value = "";
        }
      }
    )
  ] });
}
function InfoRow({
  label,
  value,
  ocid
}) {
  const display = typeof value === "boolean" ? value ? "हाँ ✓" : "नहीं ✗" : String(value);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex justify-between items-start py-3 border-b border-border last:border-0",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground w-44 shrink-0", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground text-right", children: display })
      ]
    }
  );
}
function ProfilePage() {
  var _a;
  const { id } = useParams({ from: "/profile/$id" });
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, currentLanguage } = useUserStore();
  const t = translations[currentLanguage];
  const [activeTab, setActiveTab] = reactExports.useState("personal");
  const [interestSent, setInterestSent] = reactExports.useState(false);
  const [uploadingPhoto, setUploadingPhoto] = reactExports.useState(false);
  const [showKundali, setShowKundali] = reactExports.useState(false);
  const member = sampleMembers.find((m) => m.id === id) ?? sampleMembers[0];
  const isPremiumViewer = (currentUser == null ? void 0 : currentUser.membershipTier) === "Premium";
  const isOwnProfile = (currentUser == null ? void 0 : currentUser.id) === member.id;
  const canShowKundali = !isOwnProfile && !!(currentUser == null ? void 0 : currentUser.dateOfBirth) && !!member.dateOfBirth;
  async function handlePhotoUpload(file) {
    setUploadingPhoto(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        var _a2;
        const dataUrl = (_a2 = e.target) == null ? void 0 : _a2.result;
        if (currentUser && isOwnProfile) {
          setCurrentUser({
            ...currentUser,
            photoUrl: dataUrl,
            photoAssetId: null
          });
        }
        ue.success("📸 फोटो अपडेट झाला! Photo updated successfully.");
      };
      reader.readAsDataURL(file);
    } catch {
      ue.error("फोटो अपलोड झाला नाही. Photo upload failed.");
    } finally {
      setUploadingPhoto(false);
    }
  }
  const similar = sampleMembers.filter(
    (m) => m.id !== member.id && m.gender !== member.gender && (m.upjati === member.upjati || m.city === member.city)
  ).slice(0, 4);
  const displayPhotoUrl = isOwnProfile && (currentUser == null ? void 0 : currentUser.photoUrl) ? currentUser.photoUrl : member.photoUrl;
  const displayPhotoAssetId = isOwnProfile && (currentUser == null ? void 0 : currentUser.photoAssetId) !== void 0 ? currentUser.photoAssetId : member.photoAssetId;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/browse" }),
          className: "hover:text-primary transition-smooth flex items-center gap-1",
          "data-ocid": "profile.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
            "प्रोफाइल ब्राउज़"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 13 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate", children: member.name })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "bg-card rounded-2xl border border-border shadow-subtle overflow-hidden",
            "data-ocid": "profile.hero_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 gradient-warm relative" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-5 -mt-14", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-28 h-28 rounded-full border-4 border-card overflow-hidden bg-muted shadow-premium relative", children: [
                      uploadingPhoto && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-20 bg-background/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-full rounded-full" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        MemberPhoto,
                        {
                          name: member.name,
                          photoUrl: displayPhotoUrl,
                          photoAssetId: displayPhotoAssetId,
                          className: "w-full h-full object-cover absolute inset-0",
                          fallbackClassName: "w-full h-full flex items-center justify-center font-display text-2xl font-bold text-primary bg-gradient-to-br from-primary/10 to-accent/10"
                        }
                      )
                    ] }),
                    member.membershipTier === "Premium" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-1 -right-1 bg-accent text-accent-foreground text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 10 }),
                      "₹499"
                    ] }),
                    isOwnProfile && !uploadingPhoto && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      PhotoUploadButton,
                      {
                        onUpload: handlePhotoUpload,
                        uploading: uploadingPhoto
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 sm:pt-16 flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "h1",
                            {
                              className: "font-display text-2xl font-bold text-foreground leading-tight",
                              "data-ocid": "profile.member_name",
                              children: member.nameDevanagari ?? member.name
                            }
                          ),
                          member.isVerified && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Badge,
                            {
                              className: "bg-primary/15 text-primary border-primary/30 shrink-0",
                              "data-ocid": "profile.verified_badge",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 11, className: "mr-1" }),
                                "Verified"
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: member.name })
                      ] }),
                      member.membershipTier === "Premium" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent/20 text-accent-foreground border-accent/40 shrink-0 mt-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 11, className: "mr-1" }),
                        "Premium Member"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 13 }),
                        member.age,
                        " वर्ष"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Ruler, { size: 13 }),
                        member.height
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 13 }),
                        member.city,
                        ", ",
                        member.state
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: member.upjati }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: member.education }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: member.occupation })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 bg-muted/40 rounded-lg p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: member.about }) }),
                member.interests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: member.interests.map((interest) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-medium",
                    children: interest
                  },
                  interest
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "mt-5 flex flex-wrap gap-3",
                    "data-ocid": "profile.action_buttons",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          onClick: () => setInterestSent(true),
                          disabled: interestSent,
                          className: "flex-1 sm:flex-none",
                          "data-ocid": "profile.express_interest_button",
                          children: interestSent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 16, className: "mr-1.5" }),
                            t.expressInterest
                          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(HandHeart, { size: 16, className: "mr-1.5" }),
                            t.expressInterest
                          ] })
                        }
                      ),
                      isPremiumViewer ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          className: "flex-1 sm:flex-none border-accent text-accent hover:bg-accent/10",
                          "data-ocid": "profile.send_message_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 16, className: "mr-1.5" }),
                            t.sendMessage
                          ]
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          className: "flex-1 sm:flex-none",
                          onClick: () => navigate({ to: "/register" }),
                          "data-ocid": "profile.upgrade_message_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 16, className: "mr-1.5" }),
                            "₹499 में संदेश भेजें"
                          ]
                        }
                      ),
                      canShowKundali && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          className: "flex-1 sm:flex-none",
                          style: { borderColor: "#D4AF37", color: "#8B1A1A" },
                          onClick: () => setShowKundali(true),
                          "data-ocid": "profile.kundali_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Star,
                              {
                                size: 16,
                                className: "mr-1.5",
                                style: { color: "#D4AF37" }
                              }
                            ),
                            t.kundali_btn
                          ]
                        }
                      )
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "bg-card rounded-xl border border-border shadow-subtle overflow-hidden",
            "data-ocid": "profile.details_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex overflow-x-auto border-b border-border",
                  "data-ocid": "profile.tabs",
                  children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveTab(tab.key),
                      className: `flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-smooth border-b-2 -mb-px ${activeTab === tab.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
                      "data-ocid": `profile.tab.${tab.key}`,
                      children: [
                        tab.icon,
                        tab.label
                      ]
                    },
                    tab.key
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                activeTab === "personal" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile.personal_section", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "जन्म तिथि", value: member.dateOfBirth }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "आयु", value: `${member.age} वर्ष` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "ऊंचाई", value: member.height }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      label: "लिंग",
                      value: member.gender === "Male" ? "वर" : "वधू"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      label: "वैवाहिक स्थिति",
                      value: member.maritalStatus
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "मूल निवास", value: member.nativePlace }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      label: "वर्तमान शहर",
                      value: `${member.city}, ${member.state}`
                    }
                  ),
                  member.birthTime && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      label: t.birth_time,
                      value: member.birthTime,
                      ocid: "profile.birth_time"
                    }
                  ),
                  member.birthPlace && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      label: t.birth_place,
                      value: member.birthPlace,
                      ocid: "profile.birth_place"
                    }
                  )
                ] }),
                activeTab === "community" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile.community_section", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "सम्प्रदाय", value: "दिगंबर जैन" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "उपजात", value: member.upjati }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "मूल निवास", value: member.nativePlace }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "मातृभाषा", value: "हिंदी / मराठी" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 p-3 bg-muted/40 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "🙏 यह प्रोफाइल दिगंबर जैन समुदाय द्वारा सत्यापित है।" }) })
                ] }),
                activeTab === "career" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile.career_section", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "शिक्षा", value: member.education }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "व्यवसाय", value: member.occupation }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "वार्षिक आय", value: member.annualIncome })
                ] }),
                activeTab === "family" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile.family_section", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "परिवार प्रकार", value: member.familyType }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      label: "पिताजी का व्यवसाय",
                      value: member.fatherOccupation
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      label: "माताजी का व्यवसाय",
                      value: member.motherOccupation
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      label: "भाई-बहन",
                      value: `${member.siblings} भाई-बहन`
                    }
                  )
                ] }),
                activeTab === "preferences" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile.preferences_section", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      label: "आयु सीमा",
                      value: `${member.partnerAgeMin} – ${member.partnerAgeMax} वर्ष`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      label: "शहर प्राथमिकता",
                      value: ((_a = member.partnerCity) == null ? void 0 : _a.join(", ")) ?? "महाराष्ट्र के किसी भी शहर से"
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.15 },
            "data-ocid": "profile.contact_section",
            children: isPremiumViewer ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card rounded-xl border border-border p-5 shadow-subtle",
                "data-ocid": "profile.contact_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-3 pb-2 border-b border-border", children: "📞 संपर्क विवरण" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      label: "फ़ोन नंबर",
                      value: member.mobileNumber ? `+91 ${member.mobileNumber.slice(0, 5)} ${member.mobileNumber.slice(5)}` : "+91 XXXXX XXXXX"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoRow,
                    {
                      label: "ईमेल",
                      value: `${member.name.split(" ")[0].toLowerCase()}@digambarjain.com`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "* केवल प्रीमियम सदस्यों के लिए उपलब्ध।" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card rounded-xl border border-border p-6 text-center overflow-hidden relative",
                "data-ocid": "profile.contact_locked_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col justify-center px-6 opacity-30 select-none pointer-events-none", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-1/2 mb-2 mx-auto" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-2/3 mx-auto" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 22, className: "text-accent" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-1", children: "संपर्क विवरण लॉक है" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4 max-w-xs mx-auto", children: "फ़ोन नंबर और ईमेल देखने के लिए ₹499 प्रीमियम सदस्यता लें।" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        onClick: () => navigate({ to: "/register" }),
                        "data-ocid": "profile.contact_upgrade_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 16, className: "mr-1.5" }),
                          "₹499 में अनलॉक करें"
                        ]
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ),
        similar.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 },
            "data-ocid": "profile.similar_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-4", children: "आप जैसे समान प्रोफाइल" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: similar.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileCard, { member: m, index: i }, m.id)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:w-72 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:sticky lg:top-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.05 },
            className: "bg-card rounded-xl border border-border p-5 shadow-subtle",
            "data-ocid": "profile.quick_stats_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold text-foreground mb-3", children: "प्रोफाइल सारांश" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { size: 14 }),
                    "शिक्षा"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: member.education })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 14 }),
                    "व्यवसाय"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate ml-2 max-w-[120px] text-right", children: member.occupation })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14 }),
                    "वार्षिक आय"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: member.annualIncome })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 14 }),
                    "परिवार"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: member.familyType })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14 }),
                    "उपजात"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate ml-2 max-w-[120px] text-right", children: member.upjati })
                ] })
              ] })
            ]
          }
        ),
        !isPremiumViewer && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.1 },
            className: "rounded-xl border-2 border-accent/40 overflow-hidden",
            "data-ocid": "profile.premium_upsell_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gradient-primary p-4 text-primary-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 18 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base", children: "Premium सदस्यता" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90", children: "असीमित प्रोफाइल देखें, सीधे संपर्क करें" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card p-4 space-y-2", children: [
                [
                  "असीमित प्रोफाइल देखें",
                  "सीधे फ़ोन/ईमेल संपर्क",
                  "संदेश भेजें",
                  "प्राथमिकता सूची",
                  "एडवांस्ड सर्च"
                ].map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 text-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CircleCheck,
                        {
                          size: 14,
                          className: "text-primary shrink-0"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: feat })
                    ]
                  },
                  feat
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-primary", children: "₹499" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-3", children: "एकमुश्त भुगतान" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      className: "w-full",
                      onClick: () => navigate({ to: "/register" }),
                      "data-ocid": "profile.upsell_upgrade_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 15, className: "mr-1.5" }),
                        "अभी Join करें"
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.15 },
            className: "bg-muted/40 rounded-xl border border-border p-4 text-sm text-center text-muted-foreground",
            "data-ocid": "profile.meta_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "सदस्य बने:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: new Date(member.joinedDate).toLocaleDateString("hi-IN", {
                  year: "numeric",
                  month: "long"
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1", children: [
                "प्रोफाइल ID:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono font-medium uppercase", children: member.id })
              ] })
            ]
          }
        )
      ] }) })
    ] }) }),
    canShowKundali && currentUser && /* @__PURE__ */ jsxRuntimeExports.jsx(
      KundaliMilanModal,
      {
        open: showKundali,
        onClose: () => setShowKundali(false),
        name1: currentUser.name,
        name2: member.name,
        dob1: currentUser.dateOfBirth,
        dob2: member.dateOfBirth
      }
    )
  ] });
}
export {
  ProfilePage as default
};
