import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Heart,
  MapPin,
  Quote,
  Share2,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { appStats, sampleSuccessStories } from "../data/sampleData";
import { useUserStore } from "../store";
import type { SuccessStory } from "../types";
import { translations } from "../types";

const stats = [
  {
    icon: Heart,
    value: `${appStats.successStories}+`,
    labelKey: "successStories",
  },
  {
    icon: Users,
    value: `${appStats.totalMembers.toLocaleString()}+`,
    labelKey: "profiles",
  },
  { icon: Star, value: "5+", labelKey: "plans" },
  { icon: MapPin, value: `${appStats.activeCities}+`, labelKey: "search" },
];

const sortedStories = [...sampleSuccessStories].sort((a, b) =>
  a.featured === b.featured ? 0 : a.featured ? -1 : 1,
);

function CouplePhoto({ story }: { story: SuccessStory }) {
  if (story.photoUrl) {
    return (
      <img
        src={story.photoUrl}
        alt={`${story.groomName} & ${story.brideName}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-muted">
      <span className="text-5xl">👫</span>
    </div>
  );
}

function StoryCard({
  story,
  index,
  onOpen,
}: {
  story: SuccessStory;
  index: number;
  onOpen: (s: SuccessStory) => void;
}) {
  const { currentLanguage } = useUserStore();
  const t = translations[currentLanguage];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={`bg-card rounded-2xl overflow-hidden border shadow-premium hover:shadow-lg transition-smooth group cursor-pointer relative flex flex-col ${
        story.featured ? "border-accent border-2" : "border-border"
      }`}
      onClick={() => onOpen(story)}
      data-ocid={`stories.item.${index + 1}`}
    >
      {story.featured && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-accent text-accent-foreground text-xs font-bold gap-1 shadow-sm">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </Badge>
        </div>
      )}

      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
        <CouplePhoto story={story} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/30 transition-smooth" />
        <div className="absolute bottom-3 right-3 bg-background/90 rounded-full px-2.5 py-0.5 flex items-center gap-1 text-xs font-body text-foreground">
          <Calendar className="w-3 h-3" />
          {story.marriageYear}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-display font-bold text-lg text-foreground leading-tight">
            {story.groomName} <span className="text-primary">&amp;</span>{" "}
            {story.brideName}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body mt-1">
            <MapPin className="w-3 h-3 shrink-0" />
            <span>
              {story.groomCity} × {story.brideCity}
            </span>
          </div>
        </div>

        <div className="relative flex-1">
          <Quote className="w-4 h-4 text-primary/30 absolute -top-1 -left-1" />
          <p className="text-sm text-muted-foreground font-body leading-relaxed pl-4 line-clamp-3">
            {story.story}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-border">
          <span className="text-xs text-primary font-medium font-body">
            {t.readMore} →
          </span>
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            aria-label="शेयर करें"
            onClick={(e) => e.stopPropagation()}
            data-ocid={`stories.share_button.${index + 1}`}
          >
            <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function StoryModal({
  story,
  onClose,
}: {
  story: SuccessStory | null;
  onClose: () => void;
}) {
  const { currentLanguage } = useUserStore();
  const t = translations[currentLanguage];
  const marriageLabel = {
    marathi: "विवाह",
    kannada: "ವಿವಾಹ",
    hindi: "में विवाह",
    english: "Marriage",
  }[currentLanguage];
  return (
    <Dialog open={!!story} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg bg-card" data-ocid="stories.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-foreground flex items-center gap-2 flex-wrap">
            {story?.featured && (
              <Badge className="bg-accent text-accent-foreground text-xs gap-1">
                <Star className="w-3 h-3 fill-current" />
                {t.featuredProfiles}
              </Badge>
            )}
            {story?.groomName} &amp; {story?.brideName}
          </DialogTitle>
        </DialogHeader>

        {story && (
          <div className="space-y-5">
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-muted">
              <CouplePhoto story={story} />
            </div>

            <div className="flex flex-wrap gap-3 text-sm font-body">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>
                  {story.groomCity} × {story.brideCity}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span>
                  {story.marriageYear} — {marriageLabel}
                </span>
              </div>
            </div>

            <blockquote className="relative bg-muted/40 rounded-xl p-5">
              <Quote className="w-6 h-6 text-primary/20 absolute top-3 left-3" />
              <p className="text-foreground font-body leading-relaxed pl-6 text-sm">
                {story.story}
              </p>
            </blockquote>

            <div className="text-center pt-2">
              <p className="text-sm text-muted-foreground mb-3 font-body">
                {t.shareYourStory}
              </p>
              <Button
                asChild
                className="bg-primary text-primary-foreground font-bold"
                data-ocid="stories.dialog.register_button"
              >
                <Link to="/register">{t.register}</Link>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function StoriesPage() {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const { currentLanguage } = useUserStore();
  const t = translations[currentLanguage];

  const storyLabels = {
    heroTitle: {
      marathi: "यशोगाथा",
      kannada: "ಯಶೋಗಾಥೆಗಳು",
      hindi: "सफलता की कहानियाँ",
      english: "Success Stories",
    }[currentLanguage],
    heroSub: {
      marathi: "विवाह सेतूवर भेटलेल्या दिगंबर जैन जोडप्यांच्या प्रेरणादायक कहाण्या",
      kannada: "ವಿವಾಹ ಸೇತುವಿನಲ್ಲಿ ಭೇಟಿಯಾದ ದಿಗಂಬರ ಜೈನ ದಂಪತಿಗಳ ಪ್ರೇರಣಾದಾಯಕ ಕಥೆಗಳು",
      hindi: "विवाह सेतू पर मिले दिगंबर जैन जोड़ों की प्रेरणादायक कहानियाँ",
      english:
        "Inspiring stories of Digambar Jain couples who found each other on Vivah Setu",
    }[currentLanguage],
    couplesTitle: {
      marathi: "जोडप्यांच्या कहाण्या",
      kannada: "ದಂಪತಿ ಕಥೆಗಳು",
      hindi: "जोड़ों की कहानियाँ",
      english: "Couples' Stories",
    }[currentLanguage],
    couplesCount: {
      marathi: `${sampleSuccessStories.length} यशस्वी जोडपी`,
      kannada: `${sampleSuccessStories.length} ಯಶಸ್ವಿ ದಂಪತಿ`,
      hindi: `${sampleSuccessStories.length} सफल जोड़े`,
      english: `${sampleSuccessStories.length} successful couples`,
    }[currentLanguage],
    ctaTitle: {
      marathi: "तुमची कहाणी सांगा",
      kannada: "ನಿಮ್ಮ ಕಥೆ ಹಂಚಿಕೊಳ್ಳಿ",
      hindi: "अपनी कहानी शेयर करें",
      english: "Share Your Story",
    }[currentLanguage],
    ctaSub: {
      marathi: "विवाह सेतूवर तुमचा जीवनसाथी सापडला का? तुमचा आनंद इतरांसोबत शेअर करा.",
      kannada: "ವಿವಾಹ ಸೇತುವಿನಲ್ಲಿ ನಿಮ್ಮ ಜೀವನಸಾಥಿ ಸಿಕ್ಕಿದ್ದಾರಾ? ನಿಮ್ಮ ಸಂತೋಷ ಹಂಚಿಕೊಳ್ಳಿ.",
      hindi: "क्या आपने विवाह सेतू पर अपना जीवनसाथी पाया? अपनी खुशी दूसरों के साथ बाँटें।",
      english:
        "Did you find your life partner on Vivah Setu? Share your joy with others.",
    }[currentLanguage],
    writeStory: {
      marathi: "कहाणी लिहा",
      kannada: "ಕಥೆ ಬರೆಯಿರಿ",
      hindi: "कहानी लिखें",
      english: "Write Your Story",
    }[currentLanguage],
    marriageIn: {
      marathi: "विवाह",
      kannada: "ವಿವಾಹ",
      hindi: "में विवाह",
      english: "Marriage",
    }[currentLanguage],
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="stories.page">
      {/* Hero header */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.35 0.15 25), oklch(0.22 0.05 30))",
          }}
        />
        <img
          src="/assets/generated/stories-hero-banner.dim_1200x300.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="text-4xl mb-3" aria-hidden="true">
              🪷
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground leading-tight mb-3">
              {storyLabels.heroTitle}
            </h1>
            <p className="font-body text-primary-foreground/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {storyLabels.heroSub}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="bg-card border-b border-border"
        data-ocid="stories.stats_section"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="font-display text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-body mt-0.5">
                  {t[stat.labelKey] ?? stat.labelKey}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stories grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              {storyLabels.couplesTitle}
            </h2>
            <p className="text-sm text-muted-foreground font-body mt-1">
              {storyLabels.couplesCount}
            </p>
          </div>
          <Badge
            variant="outline"
            className="border-accent text-accent font-body text-xs gap-1"
          >
            <Star className="w-3 h-3 fill-accent" />
            {t.featuredProfiles}
          </Badge>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="stories.list"
        >
          {sortedStories.map((story, idx) => (
            <StoryCard
              key={story.id}
              story={story}
              index={idx}
              onOpen={setSelectedStory}
            />
          ))}
        </div>

        {/* Share Your Story CTA */}
        <motion.div
          className="mt-16 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="relative p-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.22 60), oklch(0.75 0.15 80))",
            }}
          >
            <div
              aria-hidden="true"
              className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10"
              style={{ background: "oklch(0.95 0.01 70)" }}
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-10"
              style={{ background: "oklch(0.95 0.01 70)" }}
            />
            <div className="relative z-10">
              <div className="text-4xl mb-4" aria-hidden="true">
                💌
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                {storyLabels.ctaTitle}
              </h3>
              <p className="font-body text-primary-foreground/80 max-w-md mx-auto mb-7 leading-relaxed">
                {storyLabels.ctaSub}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  type="button"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold shadow-md"
                  data-ocid="stories.share_story_button"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {storyLabels.writeStory}
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-medium"
                  data-ocid="stories.browse_profiles_button"
                >
                  <Link to="/browse">{t.profiles}</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <StoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </div>
  );
}
