import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  ChevronRight,
  Crown,
  Heart,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { AdBanner, useActiveAds } from "../components/AdBanner";
import {
  JainAhimsaHand,
  JainHandWatermark,
  JainOrnament,
} from "../components/JainSymbol";
import { ProfileCard } from "../components/ProfileCard";
import {
  appStats,
  sampleMembers,
  sampleSuccessStories,
} from "../data/sampleData";

const featuredMembers = sampleMembers
  .filter((m) => m.membershipTier === "Premium")
  .slice(0, 6);
const featuredStories = sampleSuccessStories
  .filter((s) => s.featured)
  .slice(0, 3);

const stats = [
  {
    value: `${appStats.totalMembers.toLocaleString("en-IN")}+`,
    label: "नोंदणीकृत सदस्य",
    labelEn: "Registered Members",
    icon: Users,
  },
  {
    value: `${appStats.successStories}+`,
    label: "यशस्वी विवाह",
    labelEn: "Successful Marriages",
    icon: Heart,
  },
  {
    value: `${appStats.activeCities}+`,
    label: "शहरे",
    labelEn: "Cities",
    icon: Star,
  },
  {
    value: "5+",
    label: "विश्वासाची वर्षे",
    labelEn: "Years of Trust",
    icon: Crown,
  },
];

const premiumFeatures = [
  "असीमित प्रोफाइल पाहणे",
  "थेट संपर्क (फोन / WhatsApp)",
  "प्राथमिकता यादीत स्थान",
  "जुळणी तज्ज्ञांची मदत",
  "तत्काळ स्वारस्य सूचना",
  "प्रीमियम व्हेरिफाइड बॅज",
];

const whyFeatures = [
  {
    icon: ShieldCheck,
    title: "फक्त दिगंबर जैन",
    titleEn: "Digambar Jain Only",
    desc: "हे व्यासपीठ विशेषतः दिगंबर जैन समाजासाठी आहे. सर्व प्रोफाइल सामुदायिक सत्यापित आहेत.",
  },
  {
    icon: Users,
    title: "सत्यापित प्रोफाइल",
    titleEn: "Verified Profiles",
    desc: "प्रत्येक प्रोफाइल Admin द्वारे तपासले जाते. शिक्षण, व्यवसाय आणि कुटुंब माहिती सत्यापित.",
  },
  {
    icon: Heart,
    title: "योग्य जुळवणी",
    titleEn: "Compatible Matches",
    desc: "शिक्षण, व्यवसाय, शहर आणि कुटुंब यांच्या आधारावर दिगंबर जैन समाजातील योग्य जीवनसाथी शोधा.",
  },
  {
    icon: Sparkles,
    title: "गोपनीय व सुरक्षित",
    titleEn: "Private & Secure",
    desc: "आपली माहिती पूर्णपणे सुरक्षित. फक्त प्रीमियम सदस्य संपर्क माहिती पाहू शकतात.",
  },
];

const storyImages = [
  "/assets/generated/story-couple-1.dim_400x300.jpg",
  "/assets/generated/story-couple-2.dim_400x300.jpg",
  "/assets/generated/story-couple-3.dim_400x300.jpg",
];

export default function HomePage() {
  const activeAds = useActiveAds();
  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        data-ocid="home.hero.section"
        className="relative min-h-[88vh] flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.35 0.15 25) 0%, oklch(0.22 0.12 20) 55%, oklch(0.28 0.1 30) 100%)",
        }}
      >
        {/* Background hero image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/hero-couple.dim_1200x700.jpg"
            alt=""
            className="w-full h-full object-cover opacity-25"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.28 0.14 20 / 0.9) 0%, oklch(0.22 0.08 25 / 0.78) 55%, oklch(0.18 0.05 20 / 0.55) 100%)",
            }}
          />
        </div>

        {/* Watermark hand (right side) */}
        <div className="absolute right-4 md:right-14 top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none hidden sm:block">
          <JainHandWatermark className="text-accent w-52 h-60 md:w-80 md:h-88 opacity-[0.18]" />
        </div>

        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 opacity-25 pointer-events-none">
          <JainOrnament size={44} className="text-accent" />
        </div>
        <div className="absolute bottom-8 right-8 opacity-15 pointer-events-none">
          <JainOrnament size={30} className="text-accent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                className="mb-6 text-xs font-semibold tracking-widest uppercase px-4 py-1.5"
                style={{
                  background: "oklch(0.75 0.15 80 / 0.18)",
                  borderColor: "oklch(0.75 0.15 80 / 0.4)",
                  color: "oklch(0.9 0.1 80)",
                }}
              >
                🙏 फक्त दिगंबर जैन समाजासाठी
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="font-display font-bold leading-tight mb-4"
              style={{ color: "oklch(0.97 0.01 70)" }}
            >
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-1">
                विवाह सेतू
              </span>
              <span
                className="block text-2xl md:text-3xl font-semibold mt-2"
                style={{ color: "oklch(0.82 0.12 78)" }}
              >
                Vivah Setu
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              <p
                className="font-body text-lg md:text-xl leading-relaxed mb-2"
                style={{ color: "oklch(0.88 0.03 70)" }}
              >
                दिगंबर जैन समाजातील आदर्श जीवनसाथी शोधण्यासाठी
              </p>
              <p
                className="font-body text-sm md:text-base mb-8"
                style={{ color: "oklch(0.68 0.03 70)" }}
              >
                Premium matrimony platform exclusively for the Digambar Jain
                community
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <Link to="/register" data-ocid="home.hero.join_button">
                <Button
                  size="lg"
                  className="px-8 py-4 text-base font-bold h-auto transition-smooth hover:scale-105 shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.22 60), oklch(0.58 0.2 55))",
                    color: "oklch(0.98 0.01 70)",
                    boxShadow: "0 8px 24px oklch(0.65 0.22 60 / 0.42)",
                  }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Join Now for ₹499
                </Button>
              </Link>

              <Link to="/browse" data-ocid="home.hero.browse_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-base font-semibold h-auto transition-smooth hover:scale-105"
                  style={{
                    borderColor: "oklch(0.75 0.15 80 / 0.55)",
                    color: "oklch(0.88 0.06 78)",
                    background: "oklch(0.98 0.01 70 / 0.06)",
                  }}
                >
                  प्रोफाइल पहा <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="mt-8 flex flex-wrap gap-5"
            >
              {[
                { v: "₹499", l: "एकदाच प्रीमियम" },
                { v: "100%", l: "दिगंबर जैन" },
                { v: "सुरक्षित", l: "गोपनीय डेटा" },
              ].map(({ v, l }) => (
                <div key={l} className="flex items-center gap-2">
                  <CheckCircle
                    className="w-4 h-4 shrink-0"
                    style={{ color: "oklch(0.75 0.15 80)" }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "oklch(0.85 0.03 70)" }}
                  >
                    <span
                      className="font-bold"
                      style={{ color: "oklch(0.82 0.12 78)" }}
                    >
                      {v}
                    </span>{" "}
                    {l}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────────── */}
      <section
        data-ocid="home.stats.section"
        className="bg-card border-y border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
                data-ocid={`home.stats.item.${i + 1}`}
              >
                <div className="flex justify-center mb-2">
                  <stat.icon
                    className="w-5 h-5 transition-smooth group-hover:scale-110"
                    style={{ color: "oklch(0.65 0.22 60)" }}
                  />
                </div>
                <p
                  className="font-display font-bold text-4xl md:text-5xl mb-1"
                  style={{ color: "oklch(0.65 0.22 60)" }}
                >
                  {stat.value}
                </p>
                <p className="font-display font-semibold text-foreground text-sm">
                  {stat.label}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {stat.labelEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advertisement Banner ─────────────────────────────────────────────── */}
      <AdBanner ads={activeAds} placement="home-banner" />

      {/* ── Community Focus Banner ───────────────────────────────────────────── */}
      <section
        data-ocid="home.community.section"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.75 0.15 80 / 0.1), oklch(0.65 0.22 60 / 0.06))",
        }}
      >
        <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-end opacity-[0.08]">
          <JainAhimsaHand size={200} className="text-primary mr-6" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "oklch(0.65 0.22 60 / 0.12)",
                  border: "1.5px solid oklch(0.65 0.22 60 / 0.25)",
                }}
              >
                <JainAhimsaHand size={36} className="text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
                विशेष दिगंबर जैन समाज व्यासपीठ
              </h2>
              <p className="font-body text-muted-foreground text-base leading-relaxed max-w-2xl">
                विवाह सेतू हे केवळ{" "}
                <strong className="text-foreground">दिगंबर जैन समाजासाठी</strong>{" "}
                बनवलेले मॅट्रिमोनी व्यासपीठ आहे. येथे दिगंबर जैन समाजातील सत्यापित प्रोफाइल
                मिळतात. शिक्षण, व्यवसाय आणि कुटुंब यांच्या आधारावर योग्य जीवनसाथी शोधा.
              </p>
            </div>
            <Link
              to="/register"
              data-ocid="home.community.cta_button"
              className="flex-shrink-0"
            >
              <Button
                className="font-semibold px-6 transition-smooth hover:opacity-90"
                style={{
                  background: "oklch(0.65 0.22 60)",
                  color: "oklch(0.98 0.01 70)",
                }}
              >
                नोंदणी करा <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Profiles ────────────────────────────────────────────────── */}
      <section
        className="bg-background py-16"
        data-ocid="home.profiles.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <Badge
                variant="secondary"
                className="mb-2 text-xs tracking-widest uppercase"
              >
                प्रोफाइल
              </Badge>
              <h2 className="font-display font-bold text-3xl text-foreground">
                प्रीमियम प्रोफाइल
              </h2>
              <p className="text-muted-foreground text-sm mt-1 font-body">
                सत्यापित दिगंबर जैन सदस्य
              </p>
            </div>
            <Link to="/browse" data-ocid="home.profiles.view_all_link">
              <Button
                variant="outline"
                className="gap-1.5 border-primary/30 text-primary hover:bg-primary/5 font-semibold"
              >
                सर्व पहा <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredMembers.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <ProfileCard member={m} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Premium Membership ───────────────────────────────────────────────── */}
      <section
        data-ocid="home.membership.section"
        className="py-16 md:py-24 border-y border-border"
        style={{ background: "oklch(0.97 0.01 70)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge
              variant="secondary"
              className="mb-3 text-xs tracking-widest uppercase px-3 py-1"
            >
              सदस्यता योजना
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              प्रीमियम सदस्यता
            </h2>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              ₹499 मध्ये दिगंबर जैन समाजातील सर्वोत्तम प्रोफाइल पहा
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {/* Premium Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card
                className="relative rounded-2xl p-8 overflow-hidden shadow-xl flex flex-col"
                style={{
                  background:
                    "linear-gradient(145deg, oklch(0.32 0.13 22), oklch(0.25 0.1 20))",
                  border: "1.5px solid oklch(0.75 0.15 80 / 0.32)",
                }}
                data-ocid="home.membership.premium_card"
              >
                {/* Recommended ribbon */}
                <div
                  className="absolute -top-0 right-5 px-4 py-1 text-xs font-bold tracking-wider rounded-b-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.22 60), oklch(0.6 0.2 55))",
                    color: "oklch(0.98 0.01 70)",
                  }}
                >
                  ⭐ सर्वोत्तम
                </div>

                {/* BG ornament */}
                <div className="absolute right-2 bottom-2 opacity-10 pointer-events-none">
                  <JainOrnament size={70} className="text-accent" />
                </div>

                <div className="mb-4 relative z-10">
                  <h3
                    className="font-display font-bold text-xl mb-1"
                    style={{ color: "oklch(0.85 0.12 78)" }}
                  >
                    प्रीमियम
                  </h3>
                  <p
                    className="text-sm font-body"
                    style={{ color: "oklch(0.68 0.05 70)" }}
                  >
                    Premium Plan
                  </p>
                </div>

                <div className="mb-6 relative z-10">
                  <span
                    className="font-display font-bold text-5xl"
                    style={{ color: "oklch(0.85 0.12 78)" }}
                  >
                    ₹499
                  </span>
                  <span
                    className="text-sm ml-2"
                    style={{ color: "oklch(0.62 0.04 70)" }}
                  >
                    / एकदाच
                  </span>
                </div>

                <ul className="space-y-2.5 mb-8 relative z-10 flex-1">
                  {premiumFeatures.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm font-body"
                      style={{ color: "oklch(0.88 0.03 70)" }}
                    >
                      <CheckCircle
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: "oklch(0.75 0.15 80)" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className="relative z-10 block"
                  data-ocid="home.membership.premium_cta"
                >
                  <Button
                    className="w-full font-bold text-base py-3 h-auto transition-smooth hover:opacity-90 hover:scale-[1.02]"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.22 60), oklch(0.58 0.2 55))",
                      color: "oklch(0.98 0.01 70)",
                      boxShadow: "0 6px 20px oklch(0.65 0.22 60 / 0.42)",
                    }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    ₹499 मध्ये सुरू करा
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────────── */}
      <section
        data-ocid="home.features.section"
        className="bg-background py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge
              variant="secondary"
              className="mb-3 text-xs tracking-widest uppercase px-3 py-1"
            >
              आमची वैशिष्ट्ये
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              विवाह सेतू का निवडावे?
            </h2>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              दिगंबर जैन समाजाच्या मूल्यांशी जोडलेले एक विश्वासार्ह व्यासपीठ
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className="bg-card border-border p-6 rounded-2xl shadow-subtle hover:shadow-premium transition-smooth group h-full"
                  data-ocid={`home.features.item.${i + 1}`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-smooth group-hover:scale-110"
                    style={{
                      background: "oklch(0.65 0.22 60 / 0.1)",
                      border: "1px solid oklch(0.65 0.22 60 / 0.18)",
                    }}
                  >
                    <feat.icon
                      className="w-5 h-5"
                      style={{ color: "oklch(0.65 0.22 60)" }}
                    />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-base mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    {feat.titleEn}
                  </p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {feat.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Success Stories ──────────────────────────────────────────────────── */}
      <section
        data-ocid="home.stories.section"
        className="py-16 md:py-24 border-t border-border"
        style={{ background: "oklch(0.97 0.01 70)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <Badge
                variant="secondary"
                className="mb-3 text-xs tracking-widest uppercase px-3 py-1"
              >
                यशोगाथा
              </Badge>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
                आनंदी जोडप्यांच्या कहाण्या
              </h2>
              <p className="text-muted-foreground font-body">
                विवाह सेतूने जोडलेली दिगंबर जैन जोडपी
              </p>
            </div>
            <Link
              to="/stories"
              data-ocid="home.stories.view_all_link"
              className="flex-shrink-0"
            >
              <Button
                variant="outline"
                className="font-semibold border-primary/30 text-primary hover:bg-primary/5"
              >
                सर्व पहा <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredStories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <Card
                  className="bg-card border-border rounded-2xl overflow-hidden shadow-subtle hover:shadow-premium transition-smooth group"
                  data-ocid={`home.stories.item.${i + 1}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={
                        storyImages[i] ??
                        "/assets/images/profile-placeholder.svg"
                      }
                      alt={`${story.groomName} & ${story.brideName}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/assets/images/profile-placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p
                        className="font-display font-bold text-sm"
                        style={{ color: "oklch(0.95 0.01 70)" }}
                      >
                        {story.groomName} &amp; {story.brideName}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "oklch(0.78 0.08 78)" }}
                      >
                        {story.groomCity} × {story.brideCity} ·{" "}
                        {story.marriageYear}
                      </p>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge
                        className="text-[10px] px-2 py-0.5 font-bold border-none"
                        style={{
                          background: "oklch(0.65 0.22 60)",
                          color: "oklch(0.98 0.01 70)",
                        }}
                      >
                        <Star className="w-2.5 h-2.5 mr-1 inline" />
                        Featured
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <Quote
                      className="w-4 h-4 mb-2"
                      style={{ color: "oklch(0.65 0.22 60 / 0.45)" }}
                    />
                    <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {story.story}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────────── */}
      <section
        data-ocid="home.cta.section"
        className="relative overflow-hidden py-20 md:py-28"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.35 0.15 25), oklch(0.22 0.12 20) 55%, oklch(0.28 0.1 30))",
        }}
      >
        {/* Large watermark */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.055] pointer-events-none">
          <JainHandWatermark className="text-accent w-full h-full" />
        </div>
        <div className="absolute top-6 left-6 opacity-20 pointer-events-none">
          <JainOrnament size={34} className="text-accent" />
        </div>
        <div className="absolute bottom-6 right-6 opacity-15 pointer-events-none">
          <JainOrnament size={26} className="text-accent" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-display font-bold text-4xl md:text-5xl mb-4 leading-tight"
              style={{ color: "oklch(0.95 0.01 70)" }}
            >
              आपला आदर्श जीवनसाथी शोधण्यास सुरुवात करा
            </h2>
            <p
              className="font-body text-base md:text-lg mb-8 leading-relaxed"
              style={{ color: "oklch(0.74 0.03 70)" }}
            >
              विवाह सेतूवर नोंदणी करा आणि{" "}
              {appStats.totalMembers.toLocaleString("en-IN")}+ दिगंबर जैन प्रोफाइल
              पहा. आजच ₹499 मध्ये प्रीमियम सदस्यता घ्या.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" data-ocid="home.cta.primary_button">
                <Button
                  size="lg"
                  className="px-10 py-4 text-base font-bold h-auto transition-smooth hover:scale-105 shadow-xl w-full sm:w-auto"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.22 60), oklch(0.58 0.2 55))",
                    color: "oklch(0.98 0.01 70)",
                    boxShadow: "0 8px 28px oklch(0.65 0.22 60 / 0.42)",
                  }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  ₹499 मध्ये जॉइन करा
                </Button>
              </Link>
              <Link to="/browse" data-ocid="home.cta.browse_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-10 py-4 text-base font-semibold h-auto transition-smooth w-full sm:w-auto"
                  style={{
                    borderColor: "oklch(0.75 0.15 80 / 0.45)",
                    color: "oklch(0.86 0.06 78)",
                    background: "transparent",
                  }}
                >
                  प्रोफाइल ब्राउज करा
                </Button>
              </Link>
            </div>

            <Separator className="my-8 opacity-[0.15]" />

            <p
              className="text-sm font-body"
              style={{ color: "oklch(0.58 0.03 70)" }}
            >
              🔒 आपली माहिती पूर्णपणे गोपनीय व सुरक्षित · कोणत्याही वेळी रद्द करा
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
