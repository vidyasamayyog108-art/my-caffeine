import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Camera,
  CheckCircle2,
  ChevronRight,
  Crown,
  GraduationCap,
  HandHeart,
  Heart,
  Home,
  Lock,
  MapPin,
  MessageCircle,
  Ruler,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  KundaliMilanModal,
  NAKSHATRAS,
  computeKundaliMilan,
} from "../components/KundaliMilanModal";
import { MemberPhoto } from "../components/MemberPhoto";
import { ProfileCard } from "../components/ProfileCard";
import { sampleMembers } from "../data/sampleData";
import { useUserStore } from "../store";
import { translations } from "../types";

type TabKey = "personal" | "community" | "career" | "family" | "preferences";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "personal", label: "व्यक्तिगत", icon: <Calendar size={14} /> },
  { key: "community", label: "समाज", icon: <Users size={14} /> },
  { key: "career", label: "करियर", icon: <Briefcase size={14} /> },
  { key: "family", label: "परिवार", icon: <Home size={14} /> },
  { key: "preferences", label: "जीवनसाथी", icon: <Heart size={14} /> },
];

const PHOTO_VALIDATION = {
  maxSize: 5 * 1024 * 1024,
  types: ["image/jpeg", "image/png"],
  errors: {
    size: "फाईल 5MB पेक्षा जास्त आहे / File exceeds 5MB / फ़ाइल 5MB से बड़ी है / ಫೈಲ್ 5MB ಮೀರಿದೆ",
    type: "फक्त JPG/PNG / Only JPG or PNG / केवल JPG/PNG / ಜೆಪಿಜಿ/ಪಿಎನ್ಜಿ ಮಾತ್ರ",
  },
};

function PhotoUploadButton({
  onUpload,
  uploading,
}: {
  onUpload: (file: File) => void;
  uploading: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <button
        type="button"
        data-ocid="profile.change_photo.upload_button"
        disabled={uploading}
        onClick={() => ref.current?.click()}
        className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-primary/90 transition-smooth disabled:opacity-60"
        aria-label="फोटो बदला / Change Photo"
      >
        {uploading ? (
          <span className="w-3 h-3 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
        ) : (
          <Camera size={14} />
        )}
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          if (!PHOTO_VALIDATION.types.includes(file.type)) {
            toast.error(PHOTO_VALIDATION.errors.type);
            return;
          }
          if (file.size > PHOTO_VALIDATION.maxSize) {
            toast.error(PHOTO_VALIDATION.errors.size);
            return;
          }
          onUpload(file);
          e.target.value = "";
        }}
      />
    </>
  );
}

function InfoRow({
  label,
  value,
  ocid,
}: {
  label: string;
  value: string | number | boolean;
  ocid?: string;
}) {
  const display =
    typeof value === "boolean" ? (value ? "हाँ ✓" : "नहीं ✗") : String(value);
  return (
    <div
      className="flex justify-between items-start py-3 border-b border-border last:border-0"
      data-ocid={ocid}
    >
      <span className="text-sm text-muted-foreground w-44 shrink-0">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground text-right">
        {display}
      </span>
    </div>
  );
}

export default function ProfilePage() {
  const { id } = useParams({ from: "/profile/$id" });
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, currentLanguage } = useUserStore();
  const t = translations[currentLanguage];
  const [activeTab, setActiveTab] = useState<TabKey>("personal");
  const [interestSent, setInterestSent] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [showKundali, setShowKundali] = useState(false);

  const member = sampleMembers.find((m) => m.id === id) ?? sampleMembers[0];
  const isPremiumViewer = currentUser?.membershipTier === "Premium";
  const isOwnProfile = currentUser?.id === member.id;
  const canShowKundali =
    !isOwnProfile && !!currentUser?.dateOfBirth && !!member.dateOfBirth;

  async function handlePhotoUpload(file: File) {
    setUploadingPhoto(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (currentUser && isOwnProfile) {
          setCurrentUser({
            ...currentUser,
            photoUrl: dataUrl,
            photoAssetId: null,
          });
        }
        toast.success("📸 फोटो अपडेट झाला! Photo updated successfully.");
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error("फोटो अपलोड झाला नाही. Photo upload failed.");
    } finally {
      setUploadingPhoto(false);
    }
  }

  const similar = sampleMembers
    .filter(
      (m) =>
        m.id !== member.id &&
        m.gender !== member.gender &&
        (m.upjati === member.upjati || m.city === member.city),
    )
    .slice(0, 4);

  // For own profile, show current user's photo if available
  const displayPhotoUrl =
    isOwnProfile && currentUser?.photoUrl
      ? currentUser.photoUrl
      : member.photoUrl;
  const displayPhotoAssetId =
    isOwnProfile && currentUser?.photoAssetId !== undefined
      ? currentUser.photoAssetId
      : member.photoAssetId;

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <button
            type="button"
            onClick={() => navigate({ to: "/browse" })}
            className="hover:text-primary transition-smooth flex items-center gap-1"
            data-ocid="profile.back_button"
          >
            <ArrowLeft size={15} />
            प्रोफाइल ब्राउज़
          </button>
          <ChevronRight size={13} />
          <span className="text-foreground font-medium truncate">
            {member.name}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Hero card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border shadow-subtle overflow-hidden"
              data-ocid="profile.hero_card"
            >
              <div className="h-24 gradient-warm relative" />

              <div className="px-6 pb-6">
                <div className="flex flex-col sm:flex-row gap-5 -mt-14">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-28 h-28 rounded-full border-4 border-card overflow-hidden bg-muted shadow-premium relative">
                      {uploadingPhoto && (
                        <div className="absolute inset-0 z-20 bg-background/60 flex items-center justify-center">
                          <Skeleton className="w-full h-full rounded-full" />
                        </div>
                      )}
                      <MemberPhoto
                        name={member.name}
                        photoUrl={displayPhotoUrl}
                        photoAssetId={displayPhotoAssetId}
                        className="w-full h-full object-cover absolute inset-0"
                        fallbackClassName="w-full h-full flex items-center justify-center font-display text-2xl font-bold text-primary bg-gradient-to-br from-primary/10 to-accent/10"
                      />
                    </div>
                    {member.membershipTier === "Premium" && (
                      <div className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                        <Crown size={10} />
                        ₹499
                      </div>
                    )}
                    {isOwnProfile && !uploadingPhoto && (
                      <PhotoUploadButton
                        onUpload={handlePhotoUpload}
                        uploading={uploadingPhoto}
                      />
                    )}
                  </div>

                  {/* Identity */}
                  <div className="pt-2 sm:pt-16 flex-1 min-w-0">
                    <div className="flex flex-wrap items-start gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h1
                            className="font-display text-2xl font-bold text-foreground leading-tight"
                            data-ocid="profile.member_name"
                          >
                            {member.nameDevanagari ?? member.name}
                          </h1>
                          {member.isVerified && (
                            <Badge
                              className="bg-primary/15 text-primary border-primary/30 shrink-0"
                              data-ocid="profile.verified_badge"
                            >
                              <CheckCircle2 size={11} className="mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {member.name}
                        </p>
                      </div>
                      {member.membershipTier === "Premium" && (
                        <Badge className="bg-accent/20 text-accent-foreground border-accent/40 shrink-0 mt-1">
                          <Crown size={11} className="mr-1" />
                          Premium Member
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        {member.age} वर्ष
                      </span>
                      <span className="flex items-center gap-1">
                        <Ruler size={13} />
                        {member.height}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} />
                        {member.city}, {member.state}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="secondary" className="text-xs">
                        {member.upjati}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {member.education}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {member.occupation}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="mt-5 bg-muted/40 rounded-lg p-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    {member.about}
                  </p>
                </div>

                {/* Interests */}
                {member.interests.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.interests.map((interest) => (
                      <span
                        key={interest}
                        className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action buttons */}
                <div
                  className="mt-5 flex flex-wrap gap-3"
                  data-ocid="profile.action_buttons"
                >
                  <Button
                    type="button"
                    onClick={() => setInterestSent(true)}
                    disabled={interestSent}
                    className="flex-1 sm:flex-none"
                    data-ocid="profile.express_interest_button"
                  >
                    {interestSent ? (
                      <>
                        <CheckCircle2 size={16} className="mr-1.5" />
                        {t.expressInterest}
                      </>
                    ) : (
                      <>
                        <HandHeart size={16} className="mr-1.5" />
                        {t.expressInterest}
                      </>
                    )}
                  </Button>

                  {isPremiumViewer ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 sm:flex-none border-accent text-accent hover:bg-accent/10"
                      data-ocid="profile.send_message_button"
                    >
                      <MessageCircle size={16} className="mr-1.5" />
                      {t.sendMessage}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 sm:flex-none"
                      onClick={() => navigate({ to: "/register" })}
                      data-ocid="profile.upgrade_message_button"
                    >
                      <Lock size={16} className="mr-1.5" />
                      ₹499 में संदेश भेजें
                    </Button>
                  )}

                  {canShowKundali && (
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 sm:flex-none"
                      style={{ borderColor: "#D4AF37", color: "#8B1A1A" }}
                      onClick={() => setShowKundali(true)}
                      data-ocid="profile.kundali_button"
                    >
                      <Star
                        size={16}
                        className="mr-1.5"
                        style={{ color: "#D4AF37" }}
                      />
                      {t.kundali_btn}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Tabbed details */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl border border-border shadow-subtle overflow-hidden"
              data-ocid="profile.details_card"
            >
              {/* Tab bar */}
              <div
                className="flex overflow-x-auto border-b border-border"
                data-ocid="profile.tabs"
              >
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-smooth border-b-2 -mb-px ${
                      activeTab === tab.key
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                    data-ocid={`profile.tab.${tab.key}`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab panels */}
              <div className="p-5">
                {activeTab === "personal" && (
                  <div data-ocid="profile.personal_section">
                    <InfoRow label="जन्म तिथि" value={member.dateOfBirth} />
                    <InfoRow label="आयु" value={`${member.age} वर्ष`} />
                    <InfoRow label="ऊंचाई" value={member.height} />
                    <InfoRow
                      label="लिंग"
                      value={member.gender === "Male" ? "वर" : "वधू"}
                    />
                    <InfoRow
                      label="वैवाहिक स्थिति"
                      value={member.maritalStatus}
                    />
                    <InfoRow label="मूल निवास" value={member.nativePlace} />
                    <InfoRow
                      label="वर्तमान शहर"
                      value={`${member.city}, ${member.state}`}
                    />
                    {member.birthTime && (
                      <InfoRow
                        label={t.birth_time}
                        value={member.birthTime}
                        ocid="profile.birth_time"
                      />
                    )}
                    {member.birthPlace && (
                      <InfoRow
                        label={t.birth_place}
                        value={member.birthPlace}
                        ocid="profile.birth_place"
                      />
                    )}
                  </div>
                )}

                {activeTab === "community" && (
                  <div data-ocid="profile.community_section">
                    <InfoRow label="सम्प्रदाय" value="दिगंबर जैन" />
                    <InfoRow label="उपजात" value={member.upjati} />
                    <InfoRow label="मूल निवास" value={member.nativePlace} />
                    <InfoRow label="मातृभाषा" value="हिंदी / मराठी" />

                    <div className="mt-3 p-3 bg-muted/40 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        🙏 यह प्रोफाइल दिगंबर जैन समुदाय द्वारा सत्यापित है।
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "career" && (
                  <div data-ocid="profile.career_section">
                    <InfoRow label="शिक्षा" value={member.education} />
                    <InfoRow label="व्यवसाय" value={member.occupation} />
                    <InfoRow label="वार्षिक आय" value={member.annualIncome} />
                  </div>
                )}

                {activeTab === "family" && (
                  <div data-ocid="profile.family_section">
                    <InfoRow label="परिवार प्रकार" value={member.familyType} />
                    <InfoRow
                      label="पिताजी का व्यवसाय"
                      value={member.fatherOccupation}
                    />
                    <InfoRow
                      label="माताजी का व्यवसाय"
                      value={member.motherOccupation}
                    />
                    <InfoRow
                      label="भाई-बहन"
                      value={`${member.siblings} भाई-बहन`}
                    />
                  </div>
                )}

                {activeTab === "preferences" && (
                  <div data-ocid="profile.preferences_section">
                    <InfoRow
                      label="आयु सीमा"
                      value={`${member.partnerAgeMin} – ${member.partnerAgeMax} वर्ष`}
                    />
                    <InfoRow
                      label="शहर प्राथमिकता"
                      value={
                        member.partnerCity?.join(", ") ??
                        "महाराष्ट्र के किसी भी शहर से"
                      }
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Contact info (gated) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              data-ocid="profile.contact_section"
            >
              {isPremiumViewer ? (
                <div
                  className="bg-card rounded-xl border border-border p-5 shadow-subtle"
                  data-ocid="profile.contact_card"
                >
                  <h3 className="font-display text-base font-semibold text-foreground mb-3 pb-2 border-b border-border">
                    📞 संपर्क विवरण
                  </h3>
                  <InfoRow
                    label="फ़ोन नंबर"
                    value={
                      member.mobileNumber
                        ? `+91 ${member.mobileNumber.slice(0, 5)} ${member.mobileNumber.slice(5)}`
                        : "+91 XXXXX XXXXX"
                    }
                  />
                  <InfoRow
                    label="ईमेल"
                    value={`${member.name.split(" ")[0].toLowerCase()}@digambarjain.com`}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    * केवल प्रीमियम सदस्यों के लिए उपलब्ध।
                  </p>
                </div>
              ) : (
                <div
                  className="bg-card rounded-xl border border-border p-6 text-center overflow-hidden relative"
                  data-ocid="profile.contact_locked_card"
                >
                  {/* Blurred fake content */}
                  <div className="absolute inset-0 flex flex-col justify-center px-6 opacity-30 select-none pointer-events-none">
                    <div className="h-4 bg-muted rounded w-1/2 mb-2 mx-auto" />
                    <div className="h-4 bg-muted rounded w-2/3 mx-auto" />
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Lock size={22} className="text-accent" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      संपर्क विवरण लॉक है
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
                      फ़ोन नंबर और ईमेल देखने के लिए ₹499 प्रीमियम सदस्यता लें।
                    </p>
                    <Button
                      type="button"
                      onClick={() => navigate({ to: "/register" })}
                      data-ocid="profile.contact_upgrade_button"
                    >
                      <Crown size={16} className="mr-1.5" />
                      ₹499 में अनलॉक करें
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Similar profiles */}
            {similar.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                data-ocid="profile.similar_section"
              >
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  आप जैसे समान प्रोफाइल
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {similar.map((m, i) => (
                    <ProfileCard key={m.id} member={m} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-6 space-y-5">
              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-card rounded-xl border border-border p-5 shadow-subtle"
                data-ocid="profile.quick_stats_card"
              >
                <h3 className="font-display text-sm font-semibold text-foreground mb-3">
                  प्रोफाइल सारांश
                </h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <GraduationCap size={14} />
                      शिक्षा
                    </span>
                    <span className="font-medium text-foreground">
                      {member.education}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Briefcase size={14} />
                      व्यवसाय
                    </span>
                    <span className="font-medium text-foreground truncate ml-2 max-w-[120px] text-right">
                      {member.occupation}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Star size={14} />
                      वार्षिक आय
                    </span>
                    <span className="font-medium text-foreground">
                      {member.annualIncome}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Users size={14} />
                      परिवार
                    </span>
                    <span className="font-medium text-foreground">
                      {member.familyType}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <MapPin size={14} />
                      उपजात
                    </span>
                    <span className="font-medium text-foreground truncate ml-2 max-w-[120px] text-right">
                      {member.upjati}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Premium upsell (only for non-premium viewers) */}
              {!isPremiumViewer && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-xl border-2 border-accent/40 overflow-hidden"
                  data-ocid="profile.premium_upsell_card"
                >
                  <div className="gradient-primary p-4 text-primary-foreground">
                    <div className="flex items-center gap-2 mb-1">
                      <Crown size={18} />
                      <span className="font-display font-bold text-base">
                        Premium सदस्यता
                      </span>
                    </div>
                    <p className="text-sm opacity-90">
                      असीमित प्रोफाइल देखें, सीधे संपर्क करें
                    </p>
                  </div>
                  <div className="bg-card p-4 space-y-2">
                    {[
                      "असीमित प्रोफाइल देखें",
                      "सीधे फ़ोन/ईमेल संपर्क",
                      "संदेश भेजें",
                      "प्राथमिकता सूची",
                      "एडवांस्ड सर्च",
                    ].map((feat) => (
                      <div
                        key={feat}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-primary shrink-0"
                        />
                        <span className="text-foreground">{feat}</span>
                      </div>
                    ))}
                    <Separator className="my-1" />
                    <div className="text-center pt-1">
                      <div className="text-2xl font-display font-bold text-primary">
                        ₹499
                      </div>
                      <div className="text-xs text-muted-foreground mb-3">
                        एकमुश्त भुगतान
                      </div>
                      <Button
                        type="button"
                        className="w-full"
                        onClick={() => navigate({ to: "/register" })}
                        data-ocid="profile.upsell_upgrade_button"
                      >
                        <Crown size={15} className="mr-1.5" />
                        अभी Join करें
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Member meta */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-muted/40 rounded-xl border border-border p-4 text-sm text-center text-muted-foreground"
                data-ocid="profile.meta_card"
              >
                <p>
                  सदस्य बने:{" "}
                  <span className="text-foreground font-medium">
                    {new Date(member.joinedDate).toLocaleDateString("hi-IN", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                </p>
                <p className="mt-1">
                  प्रोफाइल ID:{" "}
                  <span className="text-foreground font-mono font-medium uppercase">
                    {member.id}
                  </span>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Kundali Milan Modal */}
      {canShowKundali && currentUser && (
        <KundaliMilanModal
          open={showKundali}
          onClose={() => setShowKundali(false)}
          name1={currentUser.name}
          name2={member.name}
          dob1={currentUser.dateOfBirth}
          dob2={member.dateOfBirth}
        />
      )}
    </div>
  );
}
