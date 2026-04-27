import { Link } from "@tanstack/react-router";
import { useUserStore } from "../store";
import { translations } from "../types";
import { JainHandWatermark, JainOrnament } from "./JainSymbol";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const { currentLanguage } = useUserStore();
  const t = translations[currentLanguage];

  const footerLinks = [
    { label: t.browseProfles ?? "Browse Profiles", to: "/browse" },
    { label: t.advancedSearch ?? "Advanced Search", to: "/search" },
    { label: t.todaysMatches ?? "Today's Matches", to: "/matches" },
    { label: t.successStoriesLink ?? t.stories, to: "/stories" },
  ];

  const membershipBenefits = {
    marathi: [
      "असीमित प्रोफाइल पहाणे",
      "थेट संपर्क",
      "प्राथमिकता यादी",
      "प्रीमियम जुळवणी",
    ],
    hindi: ["असीमित प्रोफाइल देखना", "सीधा संपर्क", "प्राथमिकता सूची", "प्रीमियम मेल"],
    kannada: ["ಅಪರಿಮಿತ ಪ್ರೊಫೈಲ್ ವೀಕ್ಷಣೆ", "ನೇರ ಸಂಪರ್ಕ", "ಆದ್ಯತೆ ಪಟ್ಟಿ", "ಪ್ರೀಮಿಯಂ ಹೊಂದಾಣಿಕೆ"],
    english: [
      "Unlimited profile views",
      "Direct contact",
      "Priority listing",
      "Premium matches",
    ],
  }[currentLanguage];

  return (
    <footer className="bg-secondary text-secondary-foreground relative overflow-hidden mt-auto">
      {/* Decorative watermark */}
      <div className="absolute right-0 bottom-0 pointer-events-none select-none">
        <JainHandWatermark className="text-secondary-foreground" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <JainOrnament className="text-primary" size={28} />
              <h2 className="font-display text-xl font-bold text-secondary-foreground">
                {t.appName}
              </h2>
            </div>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed max-w-xs font-body">
              {t.appTagline}
            </p>
            <p className="text-secondary-foreground/60 text-xs font-body italic">
              "परस्परोपग्रहो जीवानाम्" — {t.community}
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-primary uppercase tracking-wider">
              {t.quickLinks}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Membership */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-primary uppercase tracking-wider">
              {t.plans}
            </h3>
            <div className="bg-secondary-foreground/10 rounded-lg p-3 space-y-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold font-display text-accent">
                  ₹499
                </span>
                <span className="text-xs text-secondary-foreground/60">
                  /{t.perYear ?? "per year"}
                </span>
              </div>
              <ul className="text-xs text-secondary-foreground/70 space-y-1">
                {membershipBenefits.map((b) => (
                  <li key={b}>✓ {b}</li>
                ))}
              </ul>
              <Link to="/register">
                <button
                  type="button"
                  className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold py-1.5 rounded-md transition-smooth"
                >
                  {t.joinNow}
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/15 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-secondary-foreground/50 font-body">
            © {year} {t.appName}.{" "}
            {currentLanguage === "english"
              ? "All rights reserved."
              : currentLanguage === "hindi"
                ? "सर्वाधिकार सुरक्षित."
                : currentLanguage === "kannada"
                  ? "ಎಲ್ಲ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ."
                  : "सर्व हक्क राखीव."}
          </p>
          <p className="text-xs text-secondary-foreground/50 font-body">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
