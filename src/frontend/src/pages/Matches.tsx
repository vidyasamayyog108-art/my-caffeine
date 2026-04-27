import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  Crown,
  Frown,
  MapPin,
  MessageCircle,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Ad } from "../backend";
import { createActor } from "../backend";
import { AdBanner } from "../components/AdBanner";
import { KundaliMilanModal } from "../components/KundaliMilanModal";
import { ProfileCard } from "../components/ProfileCard";
import { sampleMembers } from "../data/sampleData";
import { useUserStore } from "../store";
import type { Member } from "../types";
import { translations } from "../types";

const DEFAULT_CITY = "Pune";

interface SectionProps {
  title: string;
  subtitle: string;
  members: Member[];
  emptyMessage: string;
  variant?: "default" | "premium";
  ocidPrefix: string;
  currentUserDob?: string;
}

function MatchSection({
  title,
  subtitle,
  members,
  emptyMessage,
  variant = "default",
  ocidPrefix,
  currentUserDob,
}: SectionProps) {
  const navigate = useNavigate();
  const { currentLanguage } = useUserStore();
  const t = translations[currentLanguage];
  const [kundaliTarget, setKundaliTarget] = useState<Member | null>(null);

  return (
    <section
      className={
        variant === "premium"
          ? "rounded-2xl border-2 border-accent bg-card p-6 shadow-premium"
          : ""
      }
      data-ocid={`${ocidPrefix}.section`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {variant === "premium" && (
            <span className="bg-accent text-accent-foreground rounded-full p-1.5 shrink-0">
              <Crown className="w-4 h-4" />
            </span>
          )}
          <div>
            <h2 className="font-display text-xl font-bold text-foreground leading-tight flex items-center gap-2">
              {title}
              {variant === "premium" && (
                <span className="bg-accent text-accent-foreground text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ml-1">
                  {t.premiumBadge}
                </span>
              )}
            </h2>
            <p className="text-sm text-muted-foreground font-body">
              {subtitle}
            </p>
          </div>
        </div>
        <Link
          to="/browse"
          data-ocid={`${ocidPrefix}.see_all_link`}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0"
        >
          {t.viewAll}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {members.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-12 rounded-xl bg-muted/40 gap-3"
          data-ocid={`${ocidPrefix}.empty_state`}
        >
          <Frown className="w-10 h-10 text-muted-foreground" />
          <p className="text-muted-foreground font-body text-center max-w-xs text-sm">
            {emptyMessage}
          </p>
          <Button
            asChild
            size="sm"
            variant="outline"
            data-ocid={`${ocidPrefix}.browse_button`}
          >
            <Link to="/browse">{t.allProfiles}</Link>
          </Button>
        </div>
      ) : (
        <div
          className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory"
          style={{ scrollbarWidth: "thin" }}
          data-ocid={`${ocidPrefix}.list`}
        >
          {members.map((member, idx) => (
            <div
              key={member.id}
              className="snap-start shrink-0 w-48 flex flex-col gap-2"
            >
              <ProfileCard member={member} index={idx} />
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs h-8 border-primary/30 text-primary hover:bg-primary/10 gap-1.5"
                onClick={() =>
                  navigate({ to: "/messages", search: { with: member.id } })
                }
                data-ocid={`${ocidPrefix}.message_button.${idx + 1}`}
                aria-label={`${member.name} — ${t.sendMessage}`}
              >
                <MessageCircle className="w-3 h-3" />
                {t.messages}
              </Button>
              {currentUserDob && member.dateOfBirth && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-xs h-8 gap-1.5"
                  style={{ borderColor: "#D4AF37", color: "#8B1A1A" }}
                  onClick={() => setKundaliTarget(member)}
                  data-ocid={`${ocidPrefix}.kundali_button.${idx + 1}`}
                >
                  <Star className="w-3 h-3" style={{ color: "#D4AF37" }} />
                  {t.kundali_btn}
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Kundali Milan Modal */}
      {kundaliTarget && currentUserDob && (
        <KundaliMilanModal
          open={!!kundaliTarget}
          onClose={() => setKundaliTarget(null)}
          name1={t.appName}
          name2={kundaliTarget.name}
          dob1={currentUserDob}
          dob2={kundaliTarget.dateOfBirth}
        />
      )}
    </section>
  );
}

export default function MatchesPage() {
  const { currentLanguage, currentUser } = useUserStore();
  const t = translations[currentLanguage];
  const currentUserDob = currentUser?.dateOfBirth;
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const [activeAds, setActiveAds] = useState<Ad[]>([]);
  const [liveMatches, setLiveMatches] = useState<Member[] | null>(null);
  const [matchesLoading, setMatchesLoading] = useState(false);

  // Fetch real matches from backend, fallback to sampleMembers
  useEffect(() => {
    if (!actor || actorLoading) return;
    setMatchesLoading(true);
    actor
      .getMyMatches()
      .then((profiles) => {
        if (profiles && profiles.length > 0) {
          setLiveMatches(profiles as unknown as Member[]);
        } else {
          setLiveMatches([]);
        }
      })
      .catch(() => setLiveMatches([]))
      .finally(() => setMatchesLoading(false));
  }, [actor, actorLoading]);

  useEffect(() => {
    if (!actor || actorLoading) return;
    actor
      .getActiveAds()
      .then(setActiveAds)
      .catch(() => {});
  }, [actor, actorLoading]);

  // Use live matches if available; fallback to sampleMembers
  const baseMembers =
    liveMatches && liveMatches.length > 0 ? liveMatches : sampleMembers;
  const resolvedTodaysMatches = baseMembers
    .filter((m) => m.isActive)
    .slice(0, 6);
  const resolvedPremiumMatches = baseMembers
    .filter((m) => m.isActive && m.membershipTier === "Premium")
    .slice(0, 6);
  const resolvedNearMatches = baseMembers
    .filter((m) => m.isActive && m.city === DEFAULT_CITY)
    .slice(0, 6);

  const sectionLabels = {
    todayTitle: {
      marathi: "आजचे सुचवलेले जोडीदार",
      kannada: "ಇಂದಿನ ಶಿಫಾರಸು ಮಾಡಿದ ಹೊಂದಾಣಿಕೆಗಳು",
      hindi: "आज के सुझाए गए जोडीदार",
      english: "Today's Recommended Matches",
    }[currentLanguage],
    todaySub: {
      marathi: "आमच्या अल्गोरिदमने निवडलेले आजचे सुझाव",
      kannada: "ನಮ್ಮ ಅಲ್ಗಾರಿದಮ್ ಆಯ್ಕೆ ಮಾಡಿದ ಇಂದಿನ ಶಿಫಾರಸುಗಳು",
      hindi: "हमारे एल्गोरिदम द्वारा चुने गए आज के सुझाव",
      english: "Today's suggestions selected by our algorithm",
    }[currentLanguage],
    todayEmpty: {
      marathi: "आजसाठी कोणतेही सुझाव नाहीत. कृपया उद्या पुन्हा पहा.",
      kannada: "ಇಂದಿಗಾಗಿ ಯಾವುದೇ ಶಿಫಾರಸುಗಳಿಲ್ಲ. ನಾಳೆ ಮತ್ತೆ ಪರಿಶೀಲಿಸಿ.",
      hindi: "आज के लिए कोई सुझाव नहीं मिले। कल पुनः देखें।",
      english: "No suggestions for today. Please check back tomorrow.",
    }[currentLanguage],
    premiumTitle: {
      marathi: "प्रीमियम जुळवणी",
      kannada: "ಪ್ರೀಮಿಯಂ ಹೊಂದಾಣಿಕೆ",
      hindi: "प्रीमियम मैच",
      english: "Premium Matches",
    }[currentLanguage],
    premiumSub: {
      marathi: "सत्यापित प्रीमियम सदस्य — थेट संपर्क करा",
      kannada: "ಪರಿಶೀಲಿಸಲಾದ ಪ್ರೀಮಿಯಂ ಸದಸ್ಯರು — ನೇರ ಸಂಪರ್ಕಿಸಿ",
      hindi: "सत्यापित प्रीमियम सदस्य — सीधे संपर्क करें",
      english: "Verified premium members — contact directly",
    }[currentLanguage],
    premiumEmpty: {
      marathi: "कोणतेही प्रीमियम सदस्य आढळले नाहीत. ₹499 मध्ये प्रीमियम व्हा.",
      kannada: "ಪ್ರೀಮಿಯಂ ಸದಸ್ಯರು ಕಂಡುಬಂದಿಲ್ಲ. ₹499 ಗೆ ಪ್ರೀಮಿಯಂ ಆಗಿ.",
      hindi: "कोई प्रीमियम सदस्य नहीं मिले। ₹499 में प्रीमियम बनें।",
      english: "No premium members found. Become premium for ₹499.",
    }[currentLanguage],
    nearTitle: {
      marathi: "तुमच्या शहरात",
      kannada: "ನಿಮ್ಮ ನಗರದಲ್ಲಿ",
      hindi: "आपके शहर में",
      english: "In Your City",
    }[currentLanguage],
    nearSub: {
      marathi: `${DEFAULT_CITY} आणि आसपासचे सदस्य`,
      kannada: `${DEFAULT_CITY} ಮತ್ತು ಸಮೀಪ ಸದಸ್ಯರು`,
      hindi: `${DEFAULT_CITY} और आस-पास के सदस्य`,
      english: `Members in and around ${DEFAULT_CITY}`,
    }[currentLanguage],
    nearEmpty: {
      marathi: `${DEFAULT_CITY} मध्ये अद्याप कोणतेही सदस्य आढळले नाहीत.`,
      kannada: `${DEFAULT_CITY} ನಲ್ಲಿ ಇನ್ನೂ ಯಾರೂ ಸಿಗಲಿಲ್ಲ.`,
      hindi: `${DEFAULT_CITY} में अभी कोई सदस्य नहीं मिले।`,
      english: `No members found in ${DEFAULT_CITY} yet.`,
    }[currentLanguage],
    ctaTitle: {
      marathi: "अधिक जुळवण्या पहायच्या आहेत?",
      kannada: "ಇನ್ನಷ್ಟು ಹೊಂದಾಣಿಕೆಗಳನ್ನು ನೋಡಲು?",
      hindi: "और मैच देखना है?",
      english: "Want to see more matches?",
    }[currentLanguage],
    ctaSub: {
      marathi: "₹499 प्रीमियम सदस्यता घ्या आणि असीमित प्रोफाइल पहा, थेट संपर्क करा",
      kannada: "₹499 ಪ್ರೀಮಿಯಂ ಸದಸ್ಯತ್ವ ಪಡೆಯಿರಿ ಮತ್ತು ಅಪರಿಮಿತ ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ನೋಡಿ",
      hindi: "₹499 प्रीमियम सदस्यता लें और असीमित प्रोफाइल देखें, सीधे संपर्क करें",
      english:
        "Get ₹499 premium membership and view unlimited profiles, contact directly",
    }[currentLanguage],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero banner */}
      <div className="gradient-warm py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground rounded-full px-4 py-1.5 text-sm font-body mb-4 border border-primary-foreground/20">
              <Sparkles className="w-4 h-4" />
              {sectionLabels.todayTitle}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground leading-tight mb-2">
              {t.matches}
            </h1>
            <p className="text-primary-foreground/80 font-body text-base max-w-xl mx-auto">
              {sectionLabels.todaySub}
            </p>
          </motion.div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 py-10 space-y-10"
        data-ocid="matches.page"
      >
        {/* Loading skeleton */}
        {matchesLoading && (
          <div
            className="flex items-center justify-center py-12 gap-3"
            data-ocid="matches.loading_state"
          >
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground font-body">
              {currentLanguage === "marathi"
                ? "जुळवणी शोधत आहे..."
                : currentLanguage === "hindi"
                  ? "मैच खोज रहे हैं..."
                  : currentLanguage === "kannada"
                    ? "ಹೊಂದಾಣಿಕೆಗಳನ್ನು ಹುಡುಕುತ್ತಿದ್ದೇವೆ..."
                    : "Finding matches..."}
            </span>
          </div>
        )}

        {/* Today's Matches */}
        {!matchesLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <MatchSection
              title={sectionLabels.todayTitle}
              subtitle={sectionLabels.todaySub}
              members={resolvedTodaysMatches}
              emptyMessage={sectionLabels.todayEmpty}
              ocidPrefix="todays_matches"
              currentUserDob={currentUserDob}
            />
          </motion.div>
        )}

        {!matchesLoading && <div className="border-t border-border" />}

        {/* Premium Matches */}
        {!matchesLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <MatchSection
              title={sectionLabels.premiumTitle}
              subtitle={sectionLabels.premiumSub}
              members={resolvedPremiumMatches}
              emptyMessage={sectionLabels.premiumEmpty}
              variant="premium"
              ocidPrefix="premium_matches"
              currentUserDob={currentUserDob}
            />
          </motion.div>
        )}

        {!matchesLoading && <div className="border-t border-border" />}

        {/* Near You */}
        {!matchesLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-body text-muted-foreground">
                {DEFAULT_CITY}
              </span>
            </div>
            <MatchSection
              title={sectionLabels.nearTitle}
              subtitle={sectionLabels.nearSub}
              members={resolvedNearMatches}
              emptyMessage={sectionLabels.nearEmpty}
              ocidPrefix="near_you"
              currentUserDob={currentUserDob}
            />
          </motion.div>
        )}

        {/* Upgrade CTA */}
        <motion.div
          className="rounded-2xl gradient-primary p-8 text-center text-primary-foreground"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-display text-2xl font-bold mb-2">
            {sectionLabels.ctaTitle}
          </h3>
          <p className="font-body text-primary-foreground/80 mb-6 max-w-md mx-auto">
            {sectionLabels.ctaSub}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold"
            data-ocid="matches.upgrade_button"
          >
            <Link to="/register">{t.joinNow}</Link>
          </Button>
        </motion.div>

        {/* Bottom advertisement */}
        {activeAds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <AdBanner
              ads={activeAds}
              placement="matches-bottom"
              className="mt-8"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
