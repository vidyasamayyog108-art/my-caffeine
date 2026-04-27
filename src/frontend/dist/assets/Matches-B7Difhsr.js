import { d as createLucideIcon, f as useUserStore, g as useActor, r as reactExports, j as jsxRuntimeExports, t as translations, b as Button, L as Link, e as useNavigate, C as Crown, M as MessageCircle, h as createActor } from "./index-CkCNqozh.js";
import { A as AdBanner } from "./AdBanner-B5_VbEX9.js";
import { K as KundaliMilanModal } from "./KundaliMilanModal-DTm1rHfs.js";
import { P as ProfileCard } from "./ProfileCard-CPDvFsC2.js";
import { s as sampleMembers } from "./sampleData-Bygj8EpR.js";
import { m as motion } from "./proxy-CSUsetum.js";
import { S as Sparkles } from "./sparkles-lL-_5BAP.js";
import { M as MapPin } from "./share-2-CqQsbMng.js";
import { C as ChevronRight } from "./chevron-right-Cn4b47xN.js";
import { S as Star } from "./star-QsiIcRRZ.js";
import "./megaphone-Cf6gxdqi.js";
import "./download-GSbrD0yi.js";
import "./dialog-26zOO2FL.js";
import "./Combination-BMMvFAE9.js";
import "./index-C49Lig9R.js";
import "./index-Blqxl4xO.js";
import "./circle-alert-D6mrMpuY.js";
import "./copy-BLCZEkFn.js";
import "./circle-check-DyfLjrSe.js";
import "./graduation-cap-Ck9csJB0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M16 16s-1.5-2-4-2-4 2-4 2", key: "epbg0q" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }]
];
const Frown = createLucideIcon("frown", __iconNode);
const DEFAULT_CITY = "Pune";
function MatchSection({
  title,
  subtitle,
  members,
  emptyMessage,
  variant = "default",
  ocidPrefix,
  currentUserDob
}) {
  const navigate = useNavigate();
  const { currentLanguage } = useUserStore();
  const t = translations[currentLanguage];
  const [kundaliTarget, setKundaliTarget] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: variant === "premium" ? "rounded-2xl border-2 border-accent bg-card p-6 shadow-premium" : "",
      "data-ocid": `${ocidPrefix}.section`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            variant === "premium" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-accent text-accent-foreground rounded-full p-1.5 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground leading-tight flex items-center gap-2", children: [
                title,
                variant === "premium" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-accent text-accent-foreground text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ml-1", children: t.premiumBadge })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: subtitle })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/browse",
              "data-ocid": `${ocidPrefix}.see_all_link`,
              className: "flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0",
              children: [
                t.viewAll,
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              ]
            }
          )
        ] }),
        members.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-12 rounded-xl bg-muted/40 gap-3",
            "data-ocid": `${ocidPrefix}.empty_state`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Frown, { className: "w-10 h-10 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-center max-w-xs text-sm", children: emptyMessage }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  size: "sm",
                  variant: "outline",
                  "data-ocid": `${ocidPrefix}.browse_button`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", children: t.allProfiles })
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory",
            style: { scrollbarWidth: "thin" },
            "data-ocid": `${ocidPrefix}.list`,
            children: members.map((member, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "snap-start shrink-0 w-48 flex flex-col gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileCard, { member, index: idx }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "w-full text-xs h-8 border-primary/30 text-primary hover:bg-primary/10 gap-1.5",
                      onClick: () => navigate({ to: "/messages", search: { with: member.id } }),
                      "data-ocid": `${ocidPrefix}.message_button.${idx + 1}`,
                      "aria-label": `${member.name} — ${t.sendMessage}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3" }),
                        t.messages
                      ]
                    }
                  ),
                  currentUserDob && member.dateOfBirth && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "w-full text-xs h-8 gap-1.5",
                      style: { borderColor: "#D4AF37", color: "#8B1A1A" },
                      onClick: () => setKundaliTarget(member),
                      "data-ocid": `${ocidPrefix}.kundali_button.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3", style: { color: "#D4AF37" } }),
                        t.kundali_btn
                      ]
                    }
                  )
                ]
              },
              member.id
            ))
          }
        ),
        kundaliTarget && currentUserDob && /* @__PURE__ */ jsxRuntimeExports.jsx(
          KundaliMilanModal,
          {
            open: !!kundaliTarget,
            onClose: () => setKundaliTarget(null),
            name1: t.appName,
            name2: kundaliTarget.name,
            dob1: currentUserDob,
            dob2: kundaliTarget.dateOfBirth
          }
        )
      ]
    }
  );
}
function MatchesPage() {
  const { currentLanguage, currentUser } = useUserStore();
  const t = translations[currentLanguage];
  const currentUserDob = currentUser == null ? void 0 : currentUser.dateOfBirth;
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const [activeAds, setActiveAds] = reactExports.useState([]);
  const [liveMatches, setLiveMatches] = reactExports.useState(null);
  const [matchesLoading, setMatchesLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!actor || actorLoading) return;
    setMatchesLoading(true);
    actor.getMyMatches().then((profiles) => {
      if (profiles && profiles.length > 0) {
        setLiveMatches(profiles);
      } else {
        setLiveMatches([]);
      }
    }).catch(() => setLiveMatches([])).finally(() => setMatchesLoading(false));
  }, [actor, actorLoading]);
  reactExports.useEffect(() => {
    if (!actor || actorLoading) return;
    actor.getActiveAds().then(setActiveAds).catch(() => {
    });
  }, [actor, actorLoading]);
  const baseMembers = liveMatches && liveMatches.length > 0 ? liveMatches : sampleMembers;
  const resolvedTodaysMatches = baseMembers.filter((m) => m.isActive).slice(0, 6);
  const resolvedPremiumMatches = baseMembers.filter((m) => m.isActive && m.membershipTier === "Premium").slice(0, 6);
  const resolvedNearMatches = baseMembers.filter((m) => m.isActive && m.city === DEFAULT_CITY).slice(0, 6);
  const sectionLabels = {
    todayTitle: {
      marathi: "आजचे सुचवलेले जोडीदार",
      kannada: "ಇಂದಿನ ಶಿಫಾರಸು ಮಾಡಿದ ಹೊಂದಾಣಿಕೆಗಳು",
      hindi: "आज के सुझाए गए जोडीदार",
      english: "Today's Recommended Matches"
    }[currentLanguage],
    todaySub: {
      marathi: "आमच्या अल्गोरिदमने निवडलेले आजचे सुझाव",
      kannada: "ನಮ್ಮ ಅಲ್ಗಾರಿದಮ್ ಆಯ್ಕೆ ಮಾಡಿದ ಇಂದಿನ ಶಿಫಾರಸುಗಳು",
      hindi: "हमारे एल्गोरिदम द्वारा चुने गए आज के सुझाव",
      english: "Today's suggestions selected by our algorithm"
    }[currentLanguage],
    todayEmpty: {
      marathi: "आजसाठी कोणतेही सुझाव नाहीत. कृपया उद्या पुन्हा पहा.",
      kannada: "ಇಂದಿಗಾಗಿ ಯಾವುದೇ ಶಿಫಾರಸುಗಳಿಲ್ಲ. ನಾಳೆ ಮತ್ತೆ ಪರಿಶೀಲಿಸಿ.",
      hindi: "आज के लिए कोई सुझाव नहीं मिले। कल पुनः देखें।",
      english: "No suggestions for today. Please check back tomorrow."
    }[currentLanguage],
    premiumTitle: {
      marathi: "प्रीमियम जुळवणी",
      kannada: "ಪ್ರೀಮಿಯಂ ಹೊಂದಾಣಿಕೆ",
      hindi: "प्रीमियम मैच",
      english: "Premium Matches"
    }[currentLanguage],
    premiumSub: {
      marathi: "सत्यापित प्रीमियम सदस्य — थेट संपर्क करा",
      kannada: "ಪರಿಶೀಲಿಸಲಾದ ಪ್ರೀಮಿಯಂ ಸದಸ್ಯರು — ನೇರ ಸಂಪರ್ಕಿಸಿ",
      hindi: "सत्यापित प्रीमियम सदस्य — सीधे संपर्क करें",
      english: "Verified premium members — contact directly"
    }[currentLanguage],
    premiumEmpty: {
      marathi: "कोणतेही प्रीमियम सदस्य आढळले नाहीत. ₹499 मध्ये प्रीमियम व्हा.",
      kannada: "ಪ್ರೀಮಿಯಂ ಸದಸ್ಯರು ಕಂಡುಬಂದಿಲ್ಲ. ₹499 ಗೆ ಪ್ರೀಮಿಯಂ ಆಗಿ.",
      hindi: "कोई प्रीमियम सदस्य नहीं मिले। ₹499 में प्रीमियम बनें।",
      english: "No premium members found. Become premium for ₹499."
    }[currentLanguage],
    nearTitle: {
      marathi: "तुमच्या शहरात",
      kannada: "ನಿಮ್ಮ ನಗರದಲ್ಲಿ",
      hindi: "आपके शहर में",
      english: "In Your City"
    }[currentLanguage],
    nearSub: {
      marathi: `${DEFAULT_CITY} आणि आसपासचे सदस्य`,
      kannada: `${DEFAULT_CITY} ಮತ್ತು ಸಮೀಪ ಸದಸ್ಯರು`,
      hindi: `${DEFAULT_CITY} और आस-पास के सदस्य`,
      english: `Members in and around ${DEFAULT_CITY}`
    }[currentLanguage],
    nearEmpty: {
      marathi: `${DEFAULT_CITY} मध्ये अद्याप कोणतेही सदस्य आढळले नाहीत.`,
      kannada: `${DEFAULT_CITY} ನಲ್ಲಿ ಇನ್ನೂ ಯಾರೂ ಸಿಗಲಿಲ್ಲ.`,
      hindi: `${DEFAULT_CITY} में अभी कोई सदस्य नहीं मिले।`,
      english: `No members found in ${DEFAULT_CITY} yet.`
    }[currentLanguage],
    ctaTitle: {
      marathi: "अधिक जुळवण्या पहायच्या आहेत?",
      kannada: "ಇನ್ನಷ್ಟು ಹೊಂದಾಣಿಕೆಗಳನ್ನು ನೋಡಲು?",
      hindi: "और मैच देखना है?",
      english: "Want to see more matches?"
    }[currentLanguage],
    ctaSub: {
      marathi: "₹499 प्रीमियम सदस्यता घ्या आणि असीमित प्रोफाइल पहा, थेट संपर्क करा",
      kannada: "₹499 ಪ್ರೀಮಿಯಂ ಸದಸ್ಯತ್ವ ಪಡೆಯಿರಿ ಮತ್ತು ಅಪರಿಮಿತ ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ನೋಡಿ",
      hindi: "₹499 प्रीमियम सदस्यता लें और असीमित प्रोफाइल देखें, सीधे संपर्क करें",
      english: "Get ₹499 premium membership and view unlimited profiles, contact directly"
    }[currentLanguage]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-warm py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground rounded-full px-4 py-1.5 text-sm font-body mb-4 border border-primary-foreground/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
            sectionLabels.todayTitle
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold text-primary-foreground leading-tight mb-2", children: t.matches }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 font-body text-base max-w-xl mx-auto", children: sectionLabels.todaySub })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-7xl mx-auto px-4 py-10 space-y-10",
        "data-ocid": "matches.page",
        children: [
          matchesLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-center py-12 gap-3",
              "data-ocid": "matches.loading_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-body", children: currentLanguage === "marathi" ? "जुळवणी शोधत आहे..." : currentLanguage === "hindi" ? "मैच खोज रहे हैं..." : currentLanguage === "kannada" ? "ಹೊಂದಾಣಿಕೆಗಳನ್ನು ಹುಡುಕುತ್ತಿದ್ದೇವೆ..." : "Finding matches..." })
              ]
            }
          ),
          !matchesLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, delay: 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                MatchSection,
                {
                  title: sectionLabels.todayTitle,
                  subtitle: sectionLabels.todaySub,
                  members: resolvedTodaysMatches,
                  emptyMessage: sectionLabels.todayEmpty,
                  ocidPrefix: "todays_matches",
                  currentUserDob
                }
              )
            }
          ),
          !matchesLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border" }),
          !matchesLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4, delay: 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                MatchSection,
                {
                  title: sectionLabels.premiumTitle,
                  subtitle: sectionLabels.premiumSub,
                  members: resolvedPremiumMatches,
                  emptyMessage: sectionLabels.premiumEmpty,
                  variant: "premium",
                  ocidPrefix: "premium_matches",
                  currentUserDob
                }
              )
            }
          ),
          !matchesLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border" }),
          !matchesLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4, delay: 0.1 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body text-muted-foreground", children: DEFAULT_CITY })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MatchSection,
                  {
                    title: sectionLabels.nearTitle,
                    subtitle: sectionLabels.nearSub,
                    members: resolvedNearMatches,
                    emptyMessage: sectionLabels.nearEmpty,
                    ocidPrefix: "near_you",
                    currentUserDob
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "rounded-2xl gradient-primary p-8 text-center text-primary-foreground",
              initial: { opacity: 0, scale: 0.97 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { duration: 0.4 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold mb-2", children: sectionLabels.ctaTitle }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-primary-foreground/80 mb-6 max-w-md mx-auto", children: sectionLabels.ctaSub }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    size: "lg",
                    className: "bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold",
                    "data-ocid": "matches.upgrade_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: t.joinNow })
                  }
                )
              ]
            }
          ),
          activeAds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                AdBanner,
                {
                  ads: activeAds,
                  placement: "matches-bottom",
                  className: "mt-8"
                }
              )
            }
          )
        ]
      }
    )
  ] });
}
export {
  MatchesPage as default
};
