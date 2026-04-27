import { j as jsxRuntimeExports, J as JainHandWatermark, a as JainOrnament, B as Badge, L as Link, b as Button, C as Crown, c as JainAhimsaHand } from "./index-CkCNqozh.js";
import { C as Card } from "./card-HIbIw4zR.js";
import { S as Separator } from "./separator-pMgFIsP0.js";
import { u as useActiveAds, A as AdBanner } from "./AdBanner-B5_VbEX9.js";
import { P as ProfileCard } from "./ProfileCard-CPDvFsC2.js";
import { H as Heart, a as appStats, s as sampleMembers, b as sampleSuccessStories } from "./sampleData-Bygj8EpR.js";
import { m as motion } from "./proxy-CSUsetum.js";
import { S as Sparkles } from "./sparkles-lL-_5BAP.js";
import { C as ChevronRight } from "./chevron-right-Cn4b47xN.js";
import { C as CircleCheckBig } from "./circle-check-big-DIgRFz-V.js";
import { U as Users } from "./users-I61Bioj6.js";
import { S as Star } from "./star-QsiIcRRZ.js";
import { S as ShieldCheck } from "./shield-check-BTxvbtrM.js";
import { Q as Quote } from "./quote-BqrHLUuJ.js";
import "./index-YQgpYIn2.js";
import "./megaphone-Cf6gxdqi.js";
import "./download-GSbrD0yi.js";
import "./circle-check-DyfLjrSe.js";
import "./share-2-CqQsbMng.js";
import "./graduation-cap-Ck9csJB0.js";
const featuredMembers = sampleMembers.filter((m) => m.membershipTier === "Premium").slice(0, 6);
const featuredStories = sampleSuccessStories.filter((s) => s.featured).slice(0, 3);
const stats = [
  {
    value: `${appStats.totalMembers.toLocaleString("en-IN")}+`,
    label: "नोंदणीकृत सदस्य",
    labelEn: "Registered Members",
    icon: Users
  },
  {
    value: `${appStats.successStories}+`,
    label: "यशस्वी विवाह",
    labelEn: "Successful Marriages",
    icon: Heart
  },
  {
    value: `${appStats.activeCities}+`,
    label: "शहरे",
    labelEn: "Cities",
    icon: Star
  },
  {
    value: "5+",
    label: "विश्वासाची वर्षे",
    labelEn: "Years of Trust",
    icon: Crown
  }
];
const premiumFeatures = [
  "असीमित प्रोफाइल पाहणे",
  "थेट संपर्क (फोन / WhatsApp)",
  "प्राथमिकता यादीत स्थान",
  "जुळणी तज्ज्ञांची मदत",
  "तत्काळ स्वारस्य सूचना",
  "प्रीमियम व्हेरिफाइड बॅज"
];
const whyFeatures = [
  {
    icon: ShieldCheck,
    title: "फक्त दिगंबर जैन",
    titleEn: "Digambar Jain Only",
    desc: "हे व्यासपीठ विशेषतः दिगंबर जैन समाजासाठी आहे. सर्व प्रोफाइल सामुदायिक सत्यापित आहेत."
  },
  {
    icon: Users,
    title: "सत्यापित प्रोफाइल",
    titleEn: "Verified Profiles",
    desc: "प्रत्येक प्रोफाइल Admin द्वारे तपासले जाते. शिक्षण, व्यवसाय आणि कुटुंब माहिती सत्यापित."
  },
  {
    icon: Heart,
    title: "योग्य जुळवणी",
    titleEn: "Compatible Matches",
    desc: "शिक्षण, व्यवसाय, शहर आणि कुटुंब यांच्या आधारावर दिगंबर जैन समाजातील योग्य जीवनसाथी शोधा."
  },
  {
    icon: Sparkles,
    title: "गोपनीय व सुरक्षित",
    titleEn: "Private & Secure",
    desc: "आपली माहिती पूर्णपणे सुरक्षित. फक्त प्रीमियम सदस्य संपर्क माहिती पाहू शकतात."
  }
];
const storyImages = [
  "/assets/generated/story-couple-1.dim_400x300.jpg",
  "/assets/generated/story-couple-2.dim_400x300.jpg",
  "/assets/generated/story-couple-3.dim_400x300.jpg"
];
function HomePage() {
  const activeAds = useActiveAds();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "home.hero.section",
        className: "relative min-h-[88vh] flex items-center overflow-hidden",
        style: {
          background: "linear-gradient(135deg, oklch(0.35 0.15 25) 0%, oklch(0.22 0.12 20) 55%, oklch(0.28 0.1 30) 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/hero-couple.dim_1200x700.jpg",
                alt: "",
                className: "w-full h-full object-cover opacity-25",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0",
                style: {
                  background: "linear-gradient(135deg, oklch(0.28 0.14 20 / 0.9) 0%, oklch(0.22 0.08 25 / 0.78) 55%, oklch(0.18 0.05 20 / 0.55) 100%)"
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-4 md:right-14 top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JainHandWatermark, { className: "text-accent w-52 h-60 md:w-80 md:h-88 opacity-[0.18]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-8 left-8 opacity-25 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JainOrnament, { size: 44, className: "text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 right-8 opacity-15 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JainOrnament, { size: 30, className: "text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: "mb-6 text-xs font-semibold tracking-widest uppercase px-4 py-1.5",
                    style: {
                      background: "oklch(0.75 0.15 80 / 0.18)",
                      borderColor: "oklch(0.75 0.15 80 / 0.4)",
                      color: "oklch(0.9 0.1 80)"
                    },
                    children: "🙏 फक्त दिगंबर जैन समाजासाठी"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.65, delay: 0.08 },
                className: "font-display font-bold leading-tight mb-4",
                style: { color: "oklch(0.97 0.01 70)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-1", children: "विवाह सेतू" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "block text-2xl md:text-3xl font-semibold mt-2",
                      style: { color: "oklch(0.82 0.12 78)" },
                      children: "Vivah Setu"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.18 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-body text-lg md:text-xl leading-relaxed mb-2",
                      style: { color: "oklch(0.88 0.03 70)" },
                      children: "दिगंबर जैन समाजातील आदर्श जीवनसाथी शोधण्यासाठी"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-body text-sm md:text-base mb-8",
                      style: { color: "oklch(0.68 0.03 70)" },
                      children: "Premium matrimony platform exclusively for the Digambar Jain community"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.26 },
                className: "flex flex-wrap gap-4 items-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", "data-ocid": "home.hero.join_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "px-8 py-4 text-base font-bold h-auto transition-smooth hover:scale-105 shadow-xl",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.65 0.22 60), oklch(0.58 0.2 55))",
                        color: "oklch(0.98 0.01 70)",
                        boxShadow: "0 8px 24px oklch(0.65 0.22 60 / 0.42)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 mr-2" }),
                        "Join Now for ₹499"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", "data-ocid": "home.hero.browse_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      variant: "outline",
                      className: "px-8 py-4 text-base font-semibold h-auto transition-smooth hover:scale-105",
                      style: {
                        borderColor: "oklch(0.75 0.15 80 / 0.55)",
                        color: "oklch(0.88 0.06 78)",
                        background: "oklch(0.98 0.01 70 / 0.06)"
                      },
                      children: [
                        "प्रोफाइल पहा ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
                      ]
                    }
                  ) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.6, delay: 0.38 },
                className: "mt-8 flex flex-wrap gap-5",
                children: [
                  { v: "₹499", l: "एकदाच प्रीमियम" },
                  { v: "100%", l: "दिगंबर जैन" },
                  { v: "सुरक्षित", l: "गोपनीय डेटा" }
                ].map(({ v, l }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheckBig,
                    {
                      className: "w-4 h-4 shrink-0",
                      style: { color: "oklch(0.75 0.15 80)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-sm font-medium",
                      style: { color: "oklch(0.85 0.03 70)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-bold",
                            style: { color: "oklch(0.82 0.12 78)" },
                            children: v
                          }
                        ),
                        " ",
                        l
                      ]
                    }
                  )
                ] }, l))
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "home.stats.section",
        className: "bg-card border-y border-border",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.1 },
            className: "text-center group",
            "data-ocid": `home.stats.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                stat.icon,
                {
                  className: "w-5 h-5 transition-smooth group-hover:scale-110",
                  style: { color: "oklch(0.65 0.22 60)" }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-display font-bold text-4xl md:text-5xl mb-1",
                  style: { color: "oklch(0.65 0.22 60)" },
                  children: stat.value
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: stat.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: stat.labelEn })
            ]
          },
          stat.label
        )) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { ads: activeAds, placement: "home-banner" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "home.community.section",
        className: "relative overflow-hidden",
        style: {
          background: "linear-gradient(135deg, oklch(0.75 0.15 80 / 0.1), oklch(0.65 0.22 60 / 0.06))"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none select-none flex items-center justify-end opacity-[0.08]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JainAhimsaHand, { size: 200, className: "text-primary mr-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-center gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-16 h-16 rounded-2xl flex items-center justify-center",
                style: {
                  background: "oklch(0.65 0.22 60 / 0.12)",
                  border: "1.5px solid oklch(0.65 0.22 60 / 0.25)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(JainAhimsaHand, { size: 36, className: "text-primary" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl text-foreground mb-2", children: "विशेष दिगंबर जैन समाज व्यासपीठ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-muted-foreground text-base leading-relaxed max-w-2xl", children: [
                "विवाह सेतू हे केवळ",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "दिगंबर जैन समाजासाठी" }),
                " ",
                "बनवलेले मॅट्रिमोनी व्यासपीठ आहे. येथे दिगंबर जैन समाजातील सत्यापित प्रोफाइल मिळतात. शिक्षण, व्यवसाय आणि कुटुंब यांच्या आधारावर योग्य जीवनसाथी शोधा."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/register",
                "data-ocid": "home.community.cta_button",
                className: "flex-shrink-0",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    className: "font-semibold px-6 transition-smooth hover:opacity-90",
                    style: {
                      background: "oklch(0.65 0.22 60)",
                      color: "oklch(0.98 0.01 70)"
                    },
                    children: [
                      "नोंदणी करा ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
                    ]
                  }
                )
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-16",
        "data-ocid": "home.profiles.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "mb-2 text-xs tracking-widest uppercase",
                  children: "प्रोफाइल"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground", children: "प्रीमियम प्रोफाइल" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 font-body", children: "सत्यापित दिगंबर जैन सदस्य" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", "data-ocid": "home.profiles.view_all_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "gap-1.5 border-primary/30 text-primary hover:bg-primary/5 font-semibold",
                children: [
                  "सर्व पहा ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4", children: featuredMembers.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.07 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileCard, { member: m, index: i })
            },
            m.id
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "home.membership.section",
        className: "py-16 md:py-24 border-y border-border",
        style: { background: "oklch(0.97 0.01 70)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "mb-3 text-xs tracking-widest uppercase px-3 py-1",
                children: "सदस्यता योजना"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-3", children: "प्रीमियम सदस्यता" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-md mx-auto", children: "₹499 मध्ये दिगंबर जैन समाजातील सर्वोत्तम प्रोफाइल पहा" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  className: "relative rounded-2xl p-8 overflow-hidden shadow-xl flex flex-col",
                  style: {
                    background: "linear-gradient(145deg, oklch(0.32 0.13 22), oklch(0.25 0.1 20))",
                    border: "1.5px solid oklch(0.75 0.15 80 / 0.32)"
                  },
                  "data-ocid": "home.membership.premium_card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute -top-0 right-5 px-4 py-1 text-xs font-bold tracking-wider rounded-b-lg",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.65 0.22 60), oklch(0.6 0.2 55))",
                          color: "oklch(0.98 0.01 70)"
                        },
                        children: "⭐ सर्वोत्तम"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-2 bottom-2 opacity-10 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JainOrnament, { size: 70, className: "text-accent" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 relative z-10", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          className: "font-display font-bold text-xl mb-1",
                          style: { color: "oklch(0.85 0.12 78)" },
                          children: "प्रीमियम"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm font-body",
                          style: { color: "oklch(0.68 0.05 70)" },
                          children: "Premium Plan"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 relative z-10", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-display font-bold text-5xl",
                          style: { color: "oklch(0.85 0.12 78)" },
                          children: "₹499"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-sm ml-2",
                          style: { color: "oklch(0.62 0.04 70)" },
                          children: "/ एकदाच"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 mb-8 relative z-10 flex-1", children: premiumFeatures.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "li",
                      {
                        className: "flex items-start gap-2.5 text-sm font-body",
                        style: { color: "oklch(0.88 0.03 70)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            CircleCheckBig,
                            {
                              className: "w-4 h-4 mt-0.5 shrink-0",
                              style: { color: "oklch(0.75 0.15 80)" }
                            }
                          ),
                          f
                        ]
                      },
                      f
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/register",
                        className: "relative z-10 block",
                        "data-ocid": "home.membership.premium_cta",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            className: "w-full font-bold text-base py-3 h-auto transition-smooth hover:opacity-90 hover:scale-[1.02]",
                            style: {
                              background: "linear-gradient(135deg, oklch(0.65 0.22 60), oklch(0.58 0.2 55))",
                              color: "oklch(0.98 0.01 70)",
                              boxShadow: "0 6px 20px oklch(0.65 0.22 60 / 0.42)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 mr-2" }),
                              "₹499 मध्ये सुरू करा"
                            ]
                          }
                        )
                      }
                    )
                  ]
                }
              )
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "home.features.section",
        className: "bg-background py-16 md:py-24",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "mb-3 text-xs tracking-widest uppercase px-3 py-1",
                children: "आमची वैशिष्ट्ये"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-3", children: "विवाह सेतू का निवडावे?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-md mx-auto", children: "दिगंबर जैन समाजाच्या मूल्यांशी जोडलेले एक विश्वासार्ह व्यासपीठ" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: whyFeatures.map((feat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  className: "bg-card border-border p-6 rounded-2xl shadow-subtle hover:shadow-premium transition-smooth group h-full",
                  "data-ocid": `home.features.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-smooth group-hover:scale-110",
                        style: {
                          background: "oklch(0.65 0.22 60 / 0.1)",
                          border: "1px solid oklch(0.65 0.22 60 / 0.18)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          feat.icon,
                          {
                            className: "w-5 h-5",
                            style: { color: "oklch(0.65 0.22 60)" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base mb-1", children: feat.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-2", children: feat.titleEn }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed", children: feat.desc })
                  ]
                }
              )
            },
            feat.title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "home.stories.section",
        className: "py-16 md:py-24 border-t border-border",
        style: { background: "oklch(0.97 0.01 70)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "mb-3 text-xs tracking-widest uppercase px-3 py-1",
                  children: "यशोगाथा"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-2", children: "आनंदी जोडप्यांच्या कहाण्या" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "विवाह सेतूने जोडलेली दिगंबर जैन जोडपी" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/stories",
                "data-ocid": "home.stories.view_all_link",
                className: "flex-shrink-0",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "font-semibold border-primary/30 text-primary hover:bg-primary/5",
                    children: [
                      "सर्व पहा ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
                    ]
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: featuredStories.map((story, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.12 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  className: "bg-card border-border rounded-2xl overflow-hidden shadow-subtle hover:shadow-premium transition-smooth group",
                  "data-ocid": `home.stories.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: storyImages[i] ?? "/assets/images/profile-placeholder.svg",
                          alt: `${story.groomName} & ${story.brideName}`,
                          className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
                          onError: (e) => {
                            e.target.src = "/assets/images/profile-placeholder.svg";
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 right-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "p",
                          {
                            className: "font-display font-bold text-sm",
                            style: { color: "oklch(0.95 0.01 70)" },
                            children: [
                              story.groomName,
                              " & ",
                              story.brideName
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "p",
                          {
                            className: "text-xs mt-0.5",
                            style: { color: "oklch(0.78 0.08 78)" },
                            children: [
                              story.groomCity,
                              " × ",
                              story.brideCity,
                              " ·",
                              " ",
                              story.marriageYear
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Badge,
                        {
                          className: "text-[10px] px-2 py-0.5 font-bold border-none",
                          style: {
                            background: "oklch(0.65 0.22 60)",
                            color: "oklch(0.98 0.01 70)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-2.5 h-2.5 mr-1 inline" }),
                            "Featured"
                          ]
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Quote,
                        {
                          className: "w-4 h-4 mb-2",
                          style: { color: "oklch(0.65 0.22 60 / 0.45)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed line-clamp-3", children: story.story })
                    ] })
                  ]
                }
              )
            },
            story.id
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "home.cta.section",
        className: "relative overflow-hidden py-20 md:py-28",
        style: {
          background: "linear-gradient(135deg, oklch(0.35 0.15 25), oklch(0.22 0.12 20) 55%, oklch(0.28 0.1 30))"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.055] pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JainHandWatermark, { className: "text-accent w-full h-full" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 left-6 opacity-20 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JainOrnament, { size: 34, className: "text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 right-6 opacity-15 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JainOrnament, { size: 26, className: "text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-2xl mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-display font-bold text-4xl md:text-5xl mb-4 leading-tight",
                    style: { color: "oklch(0.95 0.01 70)" },
                    children: "आपला आदर्श जीवनसाथी शोधण्यास सुरुवात करा"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "font-body text-base md:text-lg mb-8 leading-relaxed",
                    style: { color: "oklch(0.74 0.03 70)" },
                    children: [
                      "विवाह सेतूवर नोंदणी करा आणि",
                      " ",
                      appStats.totalMembers.toLocaleString("en-IN"),
                      "+ दिगंबर जैन प्रोफाइल पहा. आजच ₹499 मध्ये प्रीमियम सदस्यता घ्या."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", "data-ocid": "home.cta.primary_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "px-10 py-4 text-base font-bold h-auto transition-smooth hover:scale-105 shadow-xl w-full sm:w-auto",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.65 0.22 60), oklch(0.58 0.2 55))",
                        color: "oklch(0.98 0.01 70)",
                        boxShadow: "0 8px 28px oklch(0.65 0.22 60 / 0.42)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 mr-2" }),
                        "₹499 मध्ये जॉइन करा"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", "data-ocid": "home.cta.browse_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "lg",
                      variant: "outline",
                      className: "px-10 py-4 text-base font-semibold h-auto transition-smooth w-full sm:w-auto",
                      style: {
                        borderColor: "oklch(0.75 0.15 80 / 0.45)",
                        color: "oklch(0.86 0.06 78)",
                        background: "transparent"
                      },
                      children: "प्रोफाइल ब्राउज करा"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-8 opacity-[0.15]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm font-body",
                    style: { color: "oklch(0.58 0.03 70)" },
                    children: "🔒 आपली माहिती पूर्णपणे गोपनीय व सुरक्षित · कोणत्याही वेळी रद्द करा"
                  }
                )
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
export {
  HomePage as default
};
