import { r as reactExports, f as useUserStore, j as jsxRuntimeExports, t as translations, B as Badge, b as Button, L as Link } from "./index-CkCNqozh.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-26zOO2FL.js";
import { a as appStats, H as Heart, b as sampleSuccessStories } from "./sampleData-Bygj8EpR.js";
import { m as motion } from "./proxy-CSUsetum.js";
import { U as Users } from "./users-I61Bioj6.js";
import { S as Star } from "./star-QsiIcRRZ.js";
import { M as MapPin, S as Share2 } from "./share-2-CqQsbMng.js";
import { C as Calendar } from "./calendar-BYjQ37W0.js";
import { Q as Quote } from "./quote-BqrHLUuJ.js";
import "./Combination-BMMvFAE9.js";
import "./index-C49Lig9R.js";
const stats = [
  {
    icon: Heart,
    value: `${appStats.successStories}+`,
    labelKey: "successStories"
  },
  {
    icon: Users,
    value: `${appStats.totalMembers.toLocaleString()}+`,
    labelKey: "profiles"
  },
  { icon: Star, value: "5+", labelKey: "plans" },
  { icon: MapPin, value: `${appStats.activeCities}+`, labelKey: "search" }
];
const sortedStories = [...sampleSuccessStories].sort(
  (a, b) => a.featured === b.featured ? 0 : a.featured ? -1 : 1
);
function CouplePhoto({ story }) {
  if (story.photoUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: story.photoUrl,
        alt: `${story.groomName} & ${story.brideName}`,
        className: "w-full h-full object-cover",
        onError: (e) => {
          e.target.style.display = "none";
        }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: "👫" }) });
}
function StoryCard({
  story,
  index,
  onOpen
}) {
  const { currentLanguage } = useUserStore();
  const t = translations[currentLanguage];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.07 },
      className: `bg-card rounded-2xl overflow-hidden border shadow-premium hover:shadow-lg transition-smooth group cursor-pointer relative flex flex-col ${story.featured ? "border-accent border-2" : "border-border"}`,
      onClick: () => onOpen(story),
      "data-ocid": `stories.item.${index + 1}`,
      children: [
        story.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent text-accent-foreground text-xs font-bold gap-1 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }),
          "Featured"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[4/3] overflow-hidden bg-muted relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CouplePhoto, { story }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/30 transition-smooth" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 right-3 bg-background/90 rounded-full px-2.5 py-0.5 flex items-center gap-1 text-xs font-body text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
            story.marriageYear
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-lg text-foreground leading-tight", children: [
              story.groomName,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "&" }),
              " ",
              story.brideName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground font-body mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                story.groomCity,
                " × ",
                story.brideCity
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-4 h-4 text-primary/30 absolute -top-1 -left-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed pl-4 line-clamp-3", children: story.story })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-primary font-medium font-body", children: [
              t.readMore,
              " →"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "p-1.5 rounded-full hover:bg-muted transition-colors",
                "aria-label": "शेयर करें",
                onClick: (e) => e.stopPropagation(),
                "data-ocid": `stories.share_button.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5 text-muted-foreground" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function StoryModal({
  story,
  onClose
}) {
  const { currentLanguage } = useUserStore();
  const t = translations[currentLanguage];
  const marriageLabel = {
    marathi: "विवाह",
    kannada: "ವಿವಾಹ",
    hindi: "में विवाह",
    english: "Marriage"
  }[currentLanguage];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!story, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg bg-card", "data-ocid": "stories.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-xl text-foreground flex items-center gap-2 flex-wrap", children: [
      (story == null ? void 0 : story.featured) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent text-accent-foreground text-xs gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }),
        t.featuredProfiles
      ] }),
      story == null ? void 0 : story.groomName,
      " & ",
      story == null ? void 0 : story.brideName
    ] }) }),
    story && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/9] rounded-xl overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CouplePhoto, { story }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 text-sm font-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            story.groomCity,
            " × ",
            story.brideCity
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            story.marriageYear,
            " — ",
            marriageLabel
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "relative bg-muted/40 rounded-xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-6 h-6 text-primary/20 absolute top-3 left-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-body leading-relaxed pl-6 text-sm", children: story.story })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3 font-body", children: t.shareYourStory }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            className: "bg-primary text-primary-foreground font-bold",
            "data-ocid": "stories.dialog.register_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: t.register })
          }
        )
      ] })
    ] })
  ] }) });
}
function StoriesPage() {
  const [selectedStory, setSelectedStory] = reactExports.useState(null);
  const { currentLanguage } = useUserStore();
  const t = translations[currentLanguage];
  const storyLabels = {
    heroTitle: {
      marathi: "यशोगाथा",
      kannada: "ಯಶೋಗಾಥೆಗಳು",
      hindi: "सफलता की कहानियाँ",
      english: "Success Stories"
    }[currentLanguage],
    heroSub: {
      marathi: "विवाह सेतूवर भेटलेल्या दिगंबर जैन जोडप्यांच्या प्रेरणादायक कहाण्या",
      kannada: "ವಿವಾಹ ಸೇತುವಿನಲ್ಲಿ ಭೇಟಿಯಾದ ದಿಗಂಬರ ಜೈನ ದಂಪತಿಗಳ ಪ್ರೇರಣಾದಾಯಕ ಕಥೆಗಳು",
      hindi: "विवाह सेतू पर मिले दिगंबर जैन जोड़ों की प्रेरणादायक कहानियाँ",
      english: "Inspiring stories of Digambar Jain couples who found each other on Vivah Setu"
    }[currentLanguage],
    couplesTitle: {
      marathi: "जोडप्यांच्या कहाण्या",
      kannada: "ದಂಪತಿ ಕಥೆಗಳು",
      hindi: "जोड़ों की कहानियाँ",
      english: "Couples' Stories"
    }[currentLanguage],
    couplesCount: {
      marathi: `${sampleSuccessStories.length} यशस्वी जोडपी`,
      kannada: `${sampleSuccessStories.length} ಯಶಸ್ವಿ ದಂಪತಿ`,
      hindi: `${sampleSuccessStories.length} सफल जोड़े`,
      english: `${sampleSuccessStories.length} successful couples`
    }[currentLanguage],
    ctaTitle: {
      marathi: "तुमची कहाणी सांगा",
      kannada: "ನಿಮ್ಮ ಕಥೆ ಹಂಚಿಕೊಳ್ಳಿ",
      hindi: "अपनी कहानी शेयर करें",
      english: "Share Your Story"
    }[currentLanguage],
    ctaSub: {
      marathi: "विवाह सेतूवर तुमचा जीवनसाथी सापडला का? तुमचा आनंद इतरांसोबत शेअर करा.",
      kannada: "ವಿವಾಹ ಸೇತುವಿನಲ್ಲಿ ನಿಮ್ಮ ಜೀವನಸಾಥಿ ಸಿಕ್ಕಿದ್ದಾರಾ? ನಿಮ್ಮ ಸಂತೋಷ ಹಂಚಿಕೊಳ್ಳಿ.",
      hindi: "क्या आपने विवाह सेतू पर अपना जीवनसाथी पाया? अपनी खुशी दूसरों के साथ बाँटें।",
      english: "Did you find your life partner on Vivah Setu? Share your joy with others."
    }[currentLanguage],
    writeStory: {
      marathi: "कहाणी लिहा",
      kannada: "ಕಥೆ ಬರೆಯಿರಿ",
      hindi: "कहानी लिखें",
      english: "Write Your Story"
    }[currentLanguage]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "stories.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0",
          style: {
            background: "linear-gradient(135deg, oklch(0.35 0.15 25), oklch(0.22 0.05 30))"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/generated/stories-hero-banner.dim_1200x300.jpg",
          alt: "",
          "aria-hidden": "true",
          className: "absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 py-14 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", "aria-hidden": "true", children: "🪷" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-5xl font-bold text-primary-foreground leading-tight mb-3", children: storyLabels.heroTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-primary-foreground/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed", children: storyLabels.heroSub })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border-b border-border",
        "data-ocid": "stories.stats_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35, delay: i * 0.08 },
            className: "text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "w-5 h-5 text-primary" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-foreground", children: stat.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-body mt-0.5", children: t[stat.labelKey] ?? stat.labelKey })
            ]
          },
          stat.labelKey
        )) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: storyLabels.couplesTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-1", children: storyLabels.couplesCount })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "border-accent text-accent font-body text-xs gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-accent" }),
              t.featuredProfiles
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          "data-ocid": "stories.list",
          children: sortedStories.map((story, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            StoryCard,
            {
              story,
              index: idx,
              onOpen: setSelectedStory
            },
            story.id
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "mt-16 rounded-2xl overflow-hidden",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative p-10 text-center",
              style: {
                background: "linear-gradient(135deg, oklch(0.65 0.22 60), oklch(0.75 0.15 80))"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "aria-hidden": "true",
                    className: "absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10",
                    style: { background: "oklch(0.95 0.01 70)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "aria-hidden": "true",
                    className: "absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-10",
                    style: { background: "oklch(0.95 0.01 70)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-4", "aria-hidden": "true", children: "💌" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3", children: storyLabels.ctaTitle }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-primary-foreground/80 max-w-md mx-auto mb-7 leading-relaxed", children: storyLabels.ctaSub }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "lg",
                        type: "button",
                        className: "bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold shadow-md",
                        "data-ocid": "stories.share_story_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 mr-2" }),
                          storyLabels.writeStory
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        asChild: true,
                        size: "lg",
                        variant: "outline",
                        className: "border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-medium",
                        "data-ocid": "stories.browse_profiles_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", children: t.profiles })
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StoryModal,
      {
        story: selectedStory,
        onClose: () => setSelectedStory(null)
      }
    )
  ] });
}
export {
  StoriesPage as default
};
