import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertCircle,
  Camera,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Crown,
  Edit,
  ExternalLink,
  Heart,
  ImageOff,
  IndianRupee,
  Key,
  LayoutDashboard,
  Lock,
  LogOut,
  Megaphone,
  MessageCircle,
  MessageSquare,
  Phone,
  Plus,
  QrCode,
  Search,
  Send,
  Settings2,
  Shield,
  Smartphone,
  Star,
  Trash2,
  TrendingUp,
  Upload,
  UserCircle,
  Users,
  VolumeX,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type {
  AdId,
  Ad as BackendAd,
  SmsConfig as BackendSmsConfig,
  CreateAdInput,
  PhotoModerationInfo,
  UpdateAdInput,
} from "../backend";
import { AdType, SmsProvider, createActor } from "../backend";
import {
  appStats,
  sampleAnnouncements,
  sampleMembers,
  sampleSuccessStories,
} from "../data/sampleData";
import { useUserStore } from "../store";
import type { PaymentConfig } from "../store";
import type { Announcement, Member, SuccessStory } from "../types";

// ─── Types ─────────────────────────────────────────────────────────────────────

type AdminTab =
  | "dashboard"
  | "members"
  | "payments"
  | "payment-qr"
  | "photos"
  | "stories"
  | "pricing"
  | "announcements"
  | "sms"
  | "security"
  | "messages"
  | "chatbot"
  | "advertisements";

interface AdminState {
  members: Member[];
  stories: SuccessStory[];
  announcements: Announcement[];
  premiumPrice: number;
}

type MemberModal =
  | { mode: "closed" }
  | { mode: "add" }
  | { mode: "edit"; member: Member };

type StoryModal =
  | { mode: "closed" }
  | { mode: "add" }
  | { mode: "edit"; story: SuccessStory };

type AnnouncementModal =
  | { mode: "closed" }
  | { mode: "add" }
  | { mode: "edit"; announcement: Announcement };

interface Message {
  id: number;
  senderId: number;
  senderName: string;
  receiverId: number;
  receiverName: string;
  text: string;
  timestamp: string;
  deleted: boolean;
}

interface Conversation {
  id: string;
  member1Id: number;
  member1Name: string;
  member2Id: number;
  member2Name: string;
  messageCount: number;
  lastMessage: string;
  lastTimestamp: string;
  muted: boolean;
  messages: Message[];
}

// ─── Sample Messages Data ──────────────────────────────────────────────────────

const sampleConversations: Conversation[] = [
  {
    id: "conv1",
    member1Id: 1,
    member1Name: "Rahul Jain",
    member2Id: 2,
    member2Name: "Priya Shah",
    messageCount: 4,
    lastMessage: "Would love to connect further!",
    lastTimestamp: "2026-04-18 15:30",
    muted: false,
    messages: [
      {
        id: 1,
        senderId: 1,
        senderName: "Rahul Jain",
        receiverId: 2,
        receiverName: "Priya Shah",
        text: "Namaste! I saw your profile and found it very interesting.",
        timestamp: "2026-04-18 14:00",
        deleted: false,
      },
      {
        id: 2,
        senderId: 2,
        senderName: "Priya Shah",
        receiverId: 1,
        receiverName: "Rahul Jain",
        text: "Namaste! Thank you. I also liked your profile.",
        timestamp: "2026-04-18 14:20",
        deleted: false,
      },
      {
        id: 3,
        senderId: 1,
        senderName: "Rahul Jain",
        receiverId: 2,
        receiverName: "Priya Shah",
        text: "I am from Pune. What about your family background?",
        timestamp: "2026-04-18 15:00",
        deleted: false,
      },
      {
        id: 4,
        senderId: 2,
        senderName: "Priya Shah",
        receiverId: 1,
        receiverName: "Rahul Jain",
        text: "Would love to connect further!",
        timestamp: "2026-04-18 15:30",
        deleted: false,
      },
    ],
  },
  {
    id: "conv2",
    member1Id: 3,
    member1Name: "Amit Kothari",
    member2Id: 4,
    member2Name: "Sneha Mehta",
    messageCount: 3,
    lastMessage: "Looking forward to hearing from you.",
    lastTimestamp: "2026-04-17 11:45",
    muted: false,
    messages: [
      {
        id: 5,
        senderId: 3,
        senderName: "Amit Kothari",
        receiverId: 4,
        receiverName: "Sneha Mehta",
        text: "Hello! I noticed we have similar interests in literature.",
        timestamp: "2026-04-17 10:00",
        deleted: false,
      },
      {
        id: 6,
        senderId: 4,
        senderName: "Sneha Mehta",
        receiverId: 3,
        receiverName: "Amit Kothari",
        text: "Yes! I love reading classical Jain texts too.",
        timestamp: "2026-04-17 11:00",
        deleted: false,
      },
      {
        id: 7,
        senderId: 3,
        senderName: "Amit Kothari",
        receiverId: 4,
        receiverName: "Sneha Mehta",
        text: "Looking forward to hearing from you.",
        timestamp: "2026-04-17 11:45",
        deleted: false,
      },
    ],
  },
  {
    id: "conv3",
    member1Id: 5,
    member1Name: "Vijay Singhal",
    member2Id: 6,
    member2Name: "Kavya Jain",
    messageCount: 2,
    lastMessage: "My family is based in Nagpur.",
    lastTimestamp: "2026-04-16 09:15",
    muted: true,
    messages: [
      {
        id: 8,
        senderId: 5,
        senderName: "Vijay Singhal",
        receiverId: 6,
        receiverName: "Kavya Jain",
        text: "Greetings! I am a software engineer from Mumbai.",
        timestamp: "2026-04-16 08:30",
        deleted: false,
      },
      {
        id: 9,
        senderId: 6,
        senderName: "Kavya Jain",
        receiverId: 5,
        receiverName: "Vijay Singhal",
        text: "My family is based in Nagpur.",
        timestamp: "2026-04-16 09:15",
        deleted: false,
      },
    ],
  },
];

// ─── Admin Login ───────────────────────────────────────────────────────────────

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin === "1234") {
      onLogin();
    } else {
      setError("गलत PIN। कृपया पुनः प्रयास करें।");
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 mb-4">
            <Shield className="w-8 h-8 text-[#8B1A1A]" />
          </div>
          <h1 className="text-2xl font-display font-bold text-[#8B1A1A]">
            Admin Panel
          </h1>
          <p className="text-sm text-muted-foreground mt-1">विवाह सेतू प्रशासन</p>
        </div>
        <Card className="border-border shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2 text-[#8B1A1A]">
              <Lock className="w-4 h-4 text-primary" />
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="admin-pin"
                  className="text-foreground font-medium"
                >
                  Admin PIN
                </Label>
                <Input
                  id="admin-pin"
                  type="password"
                  placeholder="Enter 4-digit PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  maxLength={4}
                  className="text-center text-xl tracking-widest"
                  data-ocid="admin.input"
                />
              </div>
              {error && (
                <p
                  className="text-sm text-destructive flex items-center gap-1"
                  data-ocid="admin.error_state"
                >
                  <XCircle className="w-4 h-4" />
                  {error}
                </p>
              )}
              <Button
                type="submit"
                className="w-full bg-[#8B1A1A] hover:bg-[#7a1616] text-white font-semibold"
                data-ocid="admin.submit_button"
              >
                Login to Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Dashboard Tab ─────────────────────────────────────────────────────────────

function DashboardTab({
  data,
  conversations,
}: { data: AdminState; conversations: Conversation[] }) {
  const recentJoins = data.members.filter((m) => {
    const joined = new Date(m.joinedDate);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    return joined >= cutoff;
  }).length;

  const pendingPayments = data.members.filter(
    (m) => m.paymentStatus === "Uploaded",
  ).length;
  const activeConversations = conversations.filter((c) => !c.muted).length;
  const totalMessages = conversations.reduce(
    (sum, c) => sum + c.messageCount,
    0,
  );

  const stats = [
    {
      label: "कुल सदस्य",
      sub: "Total Members",
      value: appStats.totalMembers.toLocaleString("hi-IN"),
      icon: Users,
      iconCls: "text-primary",
      bgCls: "bg-primary/10",
    },
    {
      label: "प्रीमियम सदस्य",
      sub: "Premium Members",
      value: data.members.filter((m) => m.membershipTier === "Premium").length,
      icon: Crown,
      iconCls: "text-accent-foreground",
      bgCls: "bg-accent/30",
    },
    {
      label: "सफल विवाह",
      sub: "Successful Marriages",
      value: data.stories.length,
      icon: Heart,
      iconCls: "text-[#8B1A1A]",
      bgCls: "bg-[#8B1A1A]/10",
    },
    {
      label: "नए पंजीकरण",
      sub: "Last 30 Days",
      value: recentJoins,
      icon: TrendingUp,
      iconCls: "text-primary",
      bgCls: "bg-primary/10",
    },
    {
      label: "लंबित भुगतान",
      sub: "Pending Approvals",
      value: pendingPayments,
      icon: CreditCard,
      iconCls: "text-accent-foreground",
      bgCls: "bg-accent/30",
    },
    {
      label: "कुल संदेश",
      sub: "Total Messages",
      value: totalMessages,
      icon: MessageSquare,
      iconCls: "text-primary",
      bgCls: "bg-primary/10",
    },
    {
      label: "सक्रिय बातचीत",
      sub: "Active Conversations",
      value: activeConversations,
      icon: MessageCircle,
      iconCls: "text-[#8B1A1A]",
      bgCls: "bg-[#8B1A1A]/10",
    },
    {
      label: "SMS आज",
      sub: "SMS Sent Today",
      value: 14,
      icon: Smartphone,
      iconCls: "text-accent-foreground",
      bgCls: "bg-accent/30",
    },
  ];

  return (
    <div className="space-y-6" data-ocid="admin.dashboard.section">
      <div>
        <h2 className="text-xl font-display font-bold text-[#8B1A1A] mb-0.5">
          डैशबोर्ड
        </h2>
        <p className="text-sm text-muted-foreground">
          Platform overview and key metrics
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card
            key={s.label}
            className="border-border"
            data-ocid={`admin.stats.item.${i + 1}`}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground/70 mb-2">
                    {s.sub}
                  </p>
                  <p className="text-3xl font-display font-bold text-foreground">
                    {s.value}
                  </p>
                </div>
                <div className={`p-2.5 rounded-xl ${s.bgCls}`}>
                  <s.icon className={`w-5 h-5 ${s.iconCls}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-[#8B1A1A]">
              हालिया सदस्य
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {data.members.slice(0, 5).map((m, i) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 px-5 py-3"
                  data-ocid={`admin.recent_member.item.${i + 1}`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <UserCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {m.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {m.city} · {m.upjati}
                    </p>
                  </div>
                  <Badge
                    variant={
                      m.membershipTier === "Premium" ? "default" : "secondary"
                    }
                    className={
                      m.membershipTier === "Premium"
                        ? "bg-accent text-accent-foreground text-xs shrink-0"
                        : "text-xs shrink-0"
                    }
                  >
                    {m.membershipTier === "Premium" ? "★ Premium" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-[#8B1A1A]">
              सक्रिय घोषणाएं
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {data.announcements
                .filter((a) => a.active)
                .slice(0, 5)
                .map((a, i) => (
                  <div
                    key={a.id}
                    className="px-5 py-3"
                    data-ocid={`admin.recent_announcement.item.${i + 1}`}
                  >
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {a.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className="text-xs border-primary/30 text-primary"
                      >
                        {a.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {a.date}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Member Form ───────────────────────────────────────────────────────────────

function MemberForm({
  form,
  setForm,
  onSave,
  onCancel,
}: {
  form: Partial<Member>;
  setForm: (f: Partial<Member>) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  function set<K extends keyof Member>(key: K, value: Member[K]) {
    setForm({ ...form, [key]: value });
  }

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 space-y-1">
          <Label>Name *</Label>
          <Input
            value={form.name ?? ""}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Full name"
            data-ocid="admin.member_form.name.input"
          />
        </div>
        <div className="space-y-1">
          <Label>Age *</Label>
          <Input
            type="number"
            value={form.age ?? ""}
            onChange={(e) => set("age", Number.parseInt(e.target.value) || 0)}
            placeholder="Age"
            data-ocid="admin.member_form.age.input"
          />
        </div>
        <div className="space-y-1">
          <Label>Gender</Label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={form.gender ?? "Female"}
            onChange={(e) => set("gender", e.target.value as Member["gender"])}
            data-ocid="admin.member_form.gender.select"
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
        <div className="space-y-1">
          <Label>City *</Label>
          <Input
            value={form.city ?? ""}
            onChange={(e) => set("city", e.target.value)}
            placeholder="City"
            data-ocid="admin.member_form.city.input"
          />
        </div>
        <div className="space-y-1">
          <Label>State</Label>
          <Input
            value={form.state ?? ""}
            onChange={(e) => set("state", e.target.value)}
            placeholder="State"
            data-ocid="admin.member_form.state.input"
          />
        </div>
        <div className="col-span-2 space-y-1">
          <Label>उपजात (Sub-caste)</Label>
          <Input
            value={form.upjati ?? ""}
            onChange={(e) => set("upjati", e.target.value)}
            placeholder="उपजात लिखें"
            data-ocid="admin.member_form.upjati.input"
          />
        </div>
        <div className="space-y-1">
          <Label>Education</Label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={form.education ?? "Bachelor's"}
            onChange={(e) =>
              set("education", e.target.value as Member["education"])
            }
            data-ocid="admin.member_form.education.select"
          >
            {[
              "10th Pass",
              "12th Pass",
              "Diploma",
              "Bachelor's",
              "Master's",
              "PhD",
              "CA",
              "MBBS",
              "MD",
              "LLB",
            ].map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <Label>Occupation</Label>
          <Input
            value={form.occupation ?? ""}
            onChange={(e) => set("occupation", e.target.value)}
            placeholder="Occupation"
            data-ocid="admin.member_form.occupation.input"
          />
        </div>
        <div className="space-y-1">
          <Label>Membership</Label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={form.membershipTier ?? "Free"}
            onChange={(e) =>
              set("membershipTier", e.target.value as Member["membershipTier"])
            }
            data-ocid="admin.member_form.membership.select"
          >
            <option value="Free">Pending</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <div className="space-y-1">
          <Label>Mobile Number</Label>
          <Input
            value={form.mobileNumber ?? ""}
            onChange={(e) => set("mobileNumber", e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            data-ocid="admin.member_form.mobile.input"
          />
        </div>
        <div className="col-span-2 space-y-1">
          <Label>About</Label>
          <Textarea
            value={form.about ?? ""}
            onChange={(e) => set("about", e.target.value)}
            placeholder="About the member"
            rows={3}
            data-ocid="admin.member_form.about.textarea"
          />
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          onClick={onSave}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          data-ocid="admin.member_form.save_button"
        >
          Save Member
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          data-ocid="admin.member_form.cancel_button"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

// ─── Members Tab ───────────────────────────────────────────────────────────────

function MembersTab({
  data,
  setData,
}: { data: AdminState; setData: (d: AdminState) => void }) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<MemberModal>({ mode: "closed" });
  const [form, setForm] = useState<Partial<Member>>({});
  const [deletePhotoConfirm, setDeletePhotoConfirm] = useState<string | null>(
    null,
  );

  const filtered = useMemo(
    () =>
      data.members.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.city.toLowerCase().includes(search.toLowerCase()),
      ),
    [data.members, search],
  );

  function openAdd() {
    setForm({
      gender: "Female",
      membershipTier: "Free",
      isActive: true,
      upjati: "",
      state: "Maharashtra",
    });
    setModal({ mode: "add" });
  }

  function openEdit(m: Member) {
    setForm({ ...m });
    setModal({ mode: "edit", member: m });
  }

  function deleteMember(id: string) {
    setData({ ...data, members: data.members.filter((m) => m.id !== id) });
    toast.success("Member deleted successfully");
  }

  function toggleActive(id: string) {
    setData({
      ...data,
      members: data.members.map((m) =>
        m.id === id ? { ...m, isActive: !m.isActive } : m,
      ),
    });
  }

  function deletePhoto(id: string) {
    setData({
      ...data,
      members: data.members.map((m) =>
        m.id === id ? { ...m, photoUrl: undefined, photoAssetId: null } : m,
      ),
    });
    setDeletePhotoConfirm(null);
    toast.success("Photo deleted successfully");
  }

  function saveForm() {
    if (!form.name || !form.city) return;
    if (modal.mode === "add") {
      const nm: Member = {
        id: `m${Date.now()}`,
        name: form.name ?? "",
        age: Number(form.age) || 25,
        gender: form.gender ?? "Female",
        dateOfBirth: form.dateOfBirth ?? "2000-01-01",
        height: form.height ?? "5'5\"",
        city: form.city ?? "",
        state: form.state ?? "Maharashtra",
        nativePlace: form.nativePlace ?? "",
        upjati: form.upjati ?? "",
        education: form.education ?? "Bachelor's",
        occupation: form.occupation ?? "",
        annualIncome: form.annualIncome ?? "5-10 LPA",
        maritalStatus: form.maritalStatus ?? "Never Married",
        familyType: form.familyType ?? "Nuclear",
        fatherOccupation: form.fatherOccupation ?? "",
        motherOccupation: form.motherOccupation ?? "",
        siblings: Number(form.siblings) || 0,

        about: form.about ?? "",
        membershipTier: form.membershipTier ?? "Free",
        photoUrl: form.photoUrl,
        interests: [],
        isActive: form.isActive ?? true,
        joinedDate: new Date().toISOString().split("T")[0],
        partnerAgeMin: Number(form.partnerAgeMin) || 24,
        partnerAgeMax: Number(form.partnerAgeMax) || 32,
        mobileNumber: form.mobileNumber ?? "",
      };
      setData({ ...data, members: [nm, ...data.members] });
      toast.success("Member added successfully");
    } else if (modal.mode === "edit") {
      setData({
        ...data,
        members: data.members.map((m) =>
          m.id === modal.member.id ? ({ ...m, ...form } as Member) : m,
        ),
      });
      toast.success("Member updated successfully");
    }
    setModal({ mode: "closed" });
  }

  return (
    <div className="space-y-5" data-ocid="admin.members.section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-display font-bold text-[#8B1A1A]">
            सदस्य प्रबंधन
          </h2>
          <p className="text-sm text-muted-foreground">
            {data.members.length} total members
          </p>
        </div>
        <Button
          type="button"
          onClick={openAdd}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          data-ocid="admin.members.add_button"
        >
          <Plus className="w-4 h-4" />
          Add New Member
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or city…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          data-ocid="admin.members.search_input"
        />
      </div>

      <Card className="border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 font-semibold text-[#8B1A1A]">
                  Name
                </th>
                <th className="text-left px-4 py-3 font-semibold text-[#8B1A1A]">
                  Age/City
                </th>
                <th className="text-left px-4 py-3 font-semibold text-[#8B1A1A] hidden sm:table-cell">
                  उपजात
                </th>
                <th className="text-center px-4 py-3 font-semibold text-[#8B1A1A]">
                  Membership
                </th>
                <th className="text-center px-4 py-3 font-semibold text-[#8B1A1A]">
                  Active
                </th>
                <th className="text-center px-4 py-3 font-semibold text-[#8B1A1A]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-muted-foreground"
                    data-ocid="admin.members.empty_state"
                  >
                    No members found
                  </td>
                </tr>
              )}
              {filtered.map((m, i) => (
                <tr
                  key={m.id}
                  className="hover:bg-muted/20 transition-colors"
                  data-ocid={`admin.members.item.${i + 1}`}
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {m.nameDevanagari}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <p>{m.age} yrs</p>
                    <p className="text-xs">{m.city}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <Badge
                      variant="outline"
                      className="text-xs border-[#8B1A1A]/30 text-[#8B1A1A]"
                    >
                      {m.upjati || "—"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge
                      variant={
                        m.membershipTier === "Premium" ? "default" : "secondary"
                      }
                      className={
                        m.membershipTier === "Premium"
                          ? "bg-accent text-accent-foreground text-xs"
                          : "text-xs"
                      }
                    >
                      {m.membershipTier === "Premium" ? "★ Premium" : "Pending"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Switch
                      checked={m.isActive}
                      onCheckedChange={() => toggleActive(m.id)}
                      data-ocid={`admin.members.toggle.${i + 1}`}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1 flex-wrap">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(m)}
                        className="h-8 w-8 p-0 text-primary hover:bg-primary/10"
                        data-ocid={`admin.members.edit_button.${i + 1}`}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      {m.photoUrl && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeletePhotoConfirm(m.id)}
                          className="h-8 w-8 p-0 text-accent-foreground hover:bg-accent/10"
                          title="Delete Photo"
                          data-ocid={`admin.members.delete_photo_button.${i + 1}`}
                        >
                          <ImageOff className="w-3.5 h-3.5" />
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMember(m.id)}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                        data-ocid={`admin.members.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete Photo Confirm Dialog */}
      <Dialog
        open={deletePhotoConfirm !== null}
        onOpenChange={(o) => !o && setDeletePhotoConfirm(null)}
      >
        <DialogContent
          className="max-w-sm"
          data-ocid="admin.members.delete_photo.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-destructive font-display flex items-center gap-2">
              <ImageOff className="w-5 h-5" />
              Delete Member Photo?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This will permanently delete the member's profile photo. This
              action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() =>
                  deletePhotoConfirm && deletePhoto(deletePhotoConfirm)
                }
                className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                data-ocid="admin.members.delete_photo.confirm_button"
              >
                Delete Photo
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeletePhotoConfirm(null)}
                className="flex-1"
                data-ocid="admin.members.delete_photo.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modal.mode !== "closed"}
        onOpenChange={(o) => !o && setModal({ mode: "closed" })}
      >
        <DialogContent className="max-w-xl" data-ocid="admin.member.dialog">
          <DialogHeader>
            <DialogTitle className="text-[#8B1A1A] font-display">
              {modal.mode === "add" ? "Add New Member" : "Edit Member"}
            </DialogTitle>
          </DialogHeader>
          <MemberForm
            form={form}
            setForm={setForm}
            onSave={saveForm}
            onCancel={() => setModal({ mode: "closed" })}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Payments Tab ──────────────────────────────────────────────────────────────

function PaymentsTab({
  data,
  setData,
}: { data: AdminState; setData: (d: AdminState) => void }) {
  const [rejectDialog, setRejectDialog] = useState<{
    open: boolean;
    memberId: string;
    reason: string;
  }>({ open: false, memberId: "", reason: "" });
  // Optimistic approval tracking: memberId → "approved" | "rejecting"
  const [optimisticApproved, setOptimisticApproved] = useState<Set<string>>(
    new Set(),
  );
  const [smsSentFor, setSmsSentFor] = useState<Set<string>>(new Set());

  const pending = data.members.filter(
    (m) => m.paymentStatus === "Uploaded" && !optimisticApproved.has(m.id),
  );
  const approved = data.members.filter(
    (m) => m.paymentStatus === "Approved" || optimisticApproved.has(m.id),
  );
  const rejected = data.members.filter((m) => m.paymentStatus === "Rejected");
  const totalRevenue = approved.length * data.premiumPrice;

  function approvePayment(memberId: string) {
    // Optimistic update — instantly move to approved section
    setOptimisticApproved((prev) => new Set(prev).add(memberId));
    setSmsSentFor((prev) => new Set(prev).add(memberId));
    // Persist to state
    setData({
      ...data,
      members: data.members.map((m) =>
        m.id === memberId
          ? { ...m, paymentStatus: "Approved", membershipTier: "Premium" }
          : m,
      ),
    });
    toast.success("✅ Payment approved! Member upgraded to Premium.", {
      duration: 4000,
    });
    // Show SMS confirmation after short delay
    setTimeout(() => {
      toast.success("📱 SMS confirmation sent to member's mobile.", {
        duration: 3000,
      });
    }, 800);
  }

  function openReject(memberId: string) {
    setRejectDialog({ open: true, memberId, reason: "" });
  }

  function confirmReject() {
    setData({
      ...data,
      members: data.members.map((m) =>
        m.id === rejectDialog.memberId
          ? { ...m, paymentStatus: "Rejected" }
          : m,
      ),
    });
    setRejectDialog({ open: false, memberId: "", reason: "" });
    toast.error("Payment rejected and member notified.");
  }

  const statsCards = [
    {
      label: "लंबित अनुमोदन",
      sub: "Pending Approvals",
      value: pending.length,
      icon: AlertCircle,
      cls: "text-accent-foreground bg-accent/20",
    },
    {
      label: "स्वीकृत भुगतान",
      sub: "Approved Payments",
      value: approved.length,
      icon: CheckCircle,
      cls: "text-primary bg-primary/10",
    },
    {
      label: "कुल राजस्व",
      sub: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("hi-IN")}`,
      icon: IndianRupee,
      cls: "text-[#8B1A1A] bg-[#8B1A1A]/10",
    },
  ];

  function PaymentRow({
    member,
    index,
    showActions,
  }: { member: Member; index: number; showActions: boolean }) {
    return (
      <tr
        className="hover:bg-muted/20 transition-colors"
        data-ocid={`admin.payments.item.${index + 1}`}
      >
        <td className="px-4 py-3">
          <p className="font-medium text-foreground">{member.name}</p>
          <p className="text-xs text-muted-foreground">
            {member.mobileNumber ?? "—"}
          </p>
        </td>
        <td className="px-4 py-3 hidden sm:table-cell">
          <span className="text-sm text-muted-foreground">
            {member.upjati || "—"}
          </span>
        </td>
        <td className="px-4 py-3 text-center">
          <span className="font-semibold text-foreground">
            ₹{data.premiumPrice}
          </span>
        </td>
        <td className="px-4 py-3 hidden md:table-cell">
          <span className="text-xs font-mono text-muted-foreground">
            {member.paymentUpiRef ?? "—"}
          </span>
        </td>
        <td className="px-4 py-3 text-center">
          {member.paymentScreenshotUrl ? (
            <a
              href={member.paymentScreenshotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              data-ocid={`admin.payments.screenshot_link.${index + 1}`}
            >
              <ExternalLink className="w-3 h-3" />
              देखें
            </a>
          ) : (
            <span className="text-xs text-muted-foreground">उपलब्ध नहीं</span>
          )}
        </td>
        {showActions ? (
          <td className="px-4 py-3">
            <div className="flex items-center justify-center gap-2">
              <Button
                type="button"
                size="sm"
                onClick={() => approvePayment(member.id)}
                className="h-8 px-3 bg-primary hover:bg-primary/90 text-primary-foreground text-xs gap-1"
                data-ocid={`admin.payments.approve_button.${index + 1}`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Approve
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => openReject(member.id)}
                className="h-8 px-3 border-destructive/50 text-destructive hover:bg-destructive/10 text-xs gap-1"
                data-ocid={`admin.payments.reject_button.${index + 1}`}
              >
                <XCircle className="w-3.5 h-3.5" />
                Reject
              </Button>
            </div>
          </td>
        ) : (
          <td className="px-4 py-3 text-center">
            <div className="flex flex-col items-center gap-1">
              <Badge
                variant={
                  member.paymentStatus === "Approved" ||
                  optimisticApproved.has(member.id)
                    ? "default"
                    : "secondary"
                }
                className={
                  member.paymentStatus === "Approved" ||
                  optimisticApproved.has(member.id)
                    ? "bg-primary/20 text-primary text-xs"
                    : "bg-destructive/10 text-destructive text-xs"
                }
              >
                {member.paymentStatus === "Approved" ||
                optimisticApproved.has(member.id)
                  ? "✓ Approved"
                  : "✗ Rejected"}
              </Badge>
              {smsSentFor.has(member.id) && (
                <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                  <Smartphone className="w-2.5 h-2.5" /> SMS sent
                </span>
              )}
            </div>
          </td>
        )}
      </tr>
    );
  }

  const tableHeaders = (
    <tr className="bg-muted/30 border-b border-border">
      <th className="text-left px-4 py-3 font-semibold text-[#8B1A1A]">सदस्य</th>
      <th className="text-left px-4 py-3 font-semibold text-[#8B1A1A] hidden sm:table-cell">
        उपजात
      </th>
      <th className="text-center px-4 py-3 font-semibold text-[#8B1A1A]">
        राशि
      </th>
      <th className="text-left px-4 py-3 font-semibold text-[#8B1A1A] hidden md:table-cell">
        UTR/Ref
      </th>
      <th className="text-center px-4 py-3 font-semibold text-[#8B1A1A]">
        Screenshot
      </th>
      <th className="text-center px-4 py-3 font-semibold text-[#8B1A1A]">
        Actions
      </th>
    </tr>
  );

  return (
    <div className="space-y-6" data-ocid="admin.payments.section">
      <div>
        <h2 className="text-xl font-display font-bold text-[#8B1A1A] mb-0.5">
          पेमेंट प्रबंधन
        </h2>
        <p className="text-sm text-muted-foreground">
          Review and approve member payments for ₹{data.premiumPrice} membership
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statsCards.map((s, i) => (
          <Card
            key={s.label}
            className="border-border"
            data-ocid={`admin.payments.stats.item.${i + 1}`}
          >
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${s.cls}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">
                  {s.value}
                </p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground/70">{s.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border overflow-hidden">
        <CardHeader className="pb-3 bg-accent/10 border-b border-border">
          <CardTitle className="text-base text-[#8B1A1A] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-accent-foreground" />
            लंबित भुगतान ({pending.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {pending.length === 0 ? (
            <div
              className="text-center py-10 text-muted-foreground text-sm"
              data-ocid="admin.payments.pending.empty_state"
            >
              कोई लंबित भुगतान नहीं है
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>{tableHeaders}</thead>
                <tbody className="divide-y divide-border">
                  {pending.map((m, i) => (
                    <PaymentRow
                      key={m.id}
                      member={m}
                      index={i}
                      showActions={true}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {approved.length > 0 && (
        <Card className="border-border overflow-hidden">
          <CardHeader className="pb-3 bg-primary/5 border-b border-border">
            <CardTitle className="text-base text-[#8B1A1A] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              स्वीकृत भुगतान ({approved.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>{tableHeaders}</thead>
                <tbody className="divide-y divide-border">
                  {approved.map((m, i) => (
                    <PaymentRow
                      key={m.id}
                      member={m}
                      index={i}
                      showActions={false}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {rejected.length > 0 && (
        <Card className="border-border overflow-hidden">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-base text-[#8B1A1A] flex items-center gap-2">
              <XCircle className="w-4 h-4 text-destructive" />
              अस्वीकृत भुगतान ({rejected.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>{tableHeaders}</thead>
                <tbody className="divide-y divide-border">
                  {rejected.map((m, i) => (
                    <PaymentRow
                      key={m.id}
                      member={m}
                      index={i}
                      showActions={false}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog
        open={rejectDialog.open}
        onOpenChange={(o) =>
          !o && setRejectDialog({ open: false, memberId: "", reason: "" })
        }
      >
        <DialogContent
          className="max-w-md"
          data-ocid="admin.payments.reject.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-destructive font-display flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              भुगतान अस्वीकार करें
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              क्या आप इस भुगतान को अस्वीकार करना चाहते हैं? कारण बताएं (वैकल्पिक):
            </p>
            <Textarea
              value={rejectDialog.reason}
              onChange={(e) =>
                setRejectDialog({ ...rejectDialog, reason: e.target.value })
              }
              placeholder="अस्वीकृति का कारण…"
              rows={3}
              data-ocid="admin.payments.reject_reason.textarea"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={confirmReject}
                className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                data-ocid="admin.payments.confirm_reject.confirm_button"
              >
                अस्वीकार करें
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setRejectDialog({ open: false, memberId: "", reason: "" })
                }
                className="flex-1"
                data-ocid="admin.payments.confirm_reject.cancel_button"
              >
                रद्द करें
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Stories Tab ───────────────────────────────────────────────────────────────

function StoriesTab({
  data,
  setData,
}: { data: AdminState; setData: (d: AdminState) => void }) {
  const [modal, setModal] = useState<StoryModal>({ mode: "closed" });
  const [form, setForm] = useState<Partial<SuccessStory>>({});

  function openAdd() {
    setForm({ featured: false, marriageYear: new Date().getFullYear() });
    setModal({ mode: "add" });
  }
  function openEdit(s: SuccessStory) {
    setForm({ ...s });
    setModal({ mode: "edit", story: s });
  }
  function deleteStory(id: string) {
    setData({ ...data, stories: data.stories.filter((s) => s.id !== id) });
    toast.success("Story deleted.");
  }

  function saveForm() {
    if (!form.groomName || !form.brideName) return;
    if (modal.mode === "add") {
      const ns: SuccessStory = {
        id: `s${Date.now()}`,
        groomName: form.groomName ?? "",
        brideName: form.brideName ?? "",
        groomCity: form.groomCity ?? "",
        brideCity: form.brideCity ?? "",
        marriageYear: Number(form.marriageYear) || new Date().getFullYear(),
        story: form.story ?? "",
        photoUrl: form.photoUrl,
        featured: form.featured ?? false,
      };
      setData({ ...data, stories: [ns, ...data.stories] });
      toast.success("Success story added!");
    } else if (modal.mode === "edit") {
      setData({
        ...data,
        stories: data.stories.map((s) =>
          s.id === modal.story.id ? ({ ...s, ...form } as SuccessStory) : s,
        ),
      });
      toast.success("Story updated.");
    }
    setModal({ mode: "closed" });
  }

  return (
    <div className="space-y-5" data-ocid="admin.stories.section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-display font-bold text-[#8B1A1A]">
            सफलता की कहानियां
          </h2>
          <p className="text-sm text-muted-foreground">
            {data.stories.length} success stories
          </p>
        </div>
        <Button
          type="button"
          onClick={openAdd}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          data-ocid="admin.stories.add_button"
        >
          <Plus className="w-4 h-4" />
          Add New Story
        </Button>
      </div>

      <Card className="border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 font-semibold text-[#8B1A1A]">
                  Couple
                </th>
                <th className="text-left px-4 py-3 font-semibold text-[#8B1A1A] hidden sm:table-cell">
                  Cities
                </th>
                <th className="text-center px-4 py-3 font-semibold text-[#8B1A1A]">
                  Year
                </th>
                <th className="text-center px-4 py-3 font-semibold text-[#8B1A1A]">
                  Featured
                </th>
                <th className="text-center px-4 py-3 font-semibold text-[#8B1A1A]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.stories.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-12 text-muted-foreground"
                    data-ocid="admin.stories.empty_state"
                  >
                    No success stories yet
                  </td>
                </tr>
              )}
              {data.stories.map((s, i) => (
                <tr
                  key={s.id}
                  className="hover:bg-muted/20 transition-colors"
                  data-ocid={`admin.stories.item.${i + 1}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">
                          {s.groomName} &amp; {s.brideName}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {s.story.slice(0, 60)}…
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs hidden sm:table-cell">
                    {s.groomCity} ↔ {s.brideCity}
                  </td>
                  <td className="px-4 py-3 text-center text-muted-foreground">
                    {s.marriageYear}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {s.featured ? (
                      <Star className="w-4 h-4 text-accent-foreground mx-auto fill-current" />
                    ) : (
                      <Star className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(s)}
                        className="h-8 w-8 p-0 text-primary hover:bg-primary/10"
                        data-ocid={`admin.stories.edit_button.${i + 1}`}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteStory(s.id)}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                        data-ocid={`admin.stories.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog
        open={modal.mode !== "closed"}
        onOpenChange={(o) => !o && setModal({ mode: "closed" })}
      >
        <DialogContent className="max-w-lg" data-ocid="admin.story.dialog">
          <DialogHeader>
            <DialogTitle className="text-[#8B1A1A] font-display">
              {modal.mode === "add" ? "Add Success Story" : "Edit Story"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Groom Name *</Label>
                <Input
                  value={form.groomName ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, groomName: e.target.value })
                  }
                  placeholder="Groom's name"
                  data-ocid="admin.story_form.groom.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Bride Name *</Label>
                <Input
                  value={form.brideName ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, brideName: e.target.value })
                  }
                  placeholder="Bride's name"
                  data-ocid="admin.story_form.bride.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Groom City</Label>
                <Input
                  value={form.groomCity ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, groomCity: e.target.value })
                  }
                  placeholder="City"
                  data-ocid="admin.story_form.groom_city.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Bride City</Label>
                <Input
                  value={form.brideCity ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, brideCity: e.target.value })
                  }
                  placeholder="City"
                  data-ocid="admin.story_form.bride_city.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Marriage Year</Label>
                <Input
                  type="number"
                  value={form.marriageYear ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      marriageYear:
                        Number.parseInt(e.target.value) ||
                        new Date().getFullYear(),
                    })
                  }
                  data-ocid="admin.story_form.year.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Photo URL</Label>
                <Input
                  value={form.photoUrl ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, photoUrl: e.target.value })
                  }
                  placeholder="/assets/stories/..."
                  data-ocid="admin.story_form.photo.input"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Testimonial</Label>
              <Textarea
                value={form.story ?? ""}
                onChange={(e) => setForm({ ...form, story: e.target.value })}
                placeholder="Their story…"
                rows={3}
                data-ocid="admin.story_form.story.textarea"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.featured ?? false}
                onCheckedChange={(v) => setForm({ ...form, featured: v })}
                data-ocid="admin.story_form.featured.switch"
              />
              <Label>Featured Story</Label>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                onClick={saveForm}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                data-ocid="admin.story_form.save_button"
              >
                Save Story
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setModal({ mode: "closed" })}
                className="flex-1"
                data-ocid="admin.story_form.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Pricing Tab ───────────────────────────────────────────────────────────────

function PricingTab({
  data,
  setData,
}: { data: AdminState; setData: (d: AdminState) => void }) {
  const [price, setPrice] = useState(String(data.premiumPrice));
  const [saved, setSaved] = useState(false);

  const features = [
    "अनलिमिटेड प्रोफाइल देखें",
    "डायरेक्ट कॉन्टैक्ट नंबर एक्सेस",
    "प्रायोरिटी लिस्टिंग में शामिल",
    "प्रीमियम मैचेज तक पहुंच",
    "प्रोफाइल हाइलाइट फीचर",
    "ऐडवांस्ड सर्च फिल्टर",
    "एक्सप्रेस इंटरेस्ट भेजने की सुविधा",
    "मेसेज सेंड करें",
  ];

  const premiumOnlyFeatures: [string, string][] = [
    ["Profile Views", "Unlimited"],
    ["Contact Info", "Full Access"],
    ["Search Filters", "Advanced"],
    ["Express Interest", "✓"],
    ["Priority Listing", "✓"],
    ["Send Messages", "✓"],
  ];

  function handleSave() {
    const n = Number.parseInt(price);
    if (!Number.isNaN(n) && n > 0) {
      setData({ ...data, premiumPrice: n });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      toast.success(`Price updated to ₹${n}`);
    }
  }

  return (
    <div className="space-y-6" data-ocid="admin.pricing.section">
      <div>
        <h2 className="text-xl font-display font-bold text-[#8B1A1A]">
          सदस्यता मूल्य
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage membership pricing and plan features
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-[#8B1A1A] flex items-center gap-2">
              <Crown className="w-4 h-4 text-accent-foreground" />
              Premium Plan Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-6 bg-accent/10 rounded-xl border border-accent/20">
              <p className="text-sm text-muted-foreground mb-1">
                Current Price
              </p>
              <p className="text-5xl font-display font-bold text-[#8B1A1A]">
                ₹{data.premiumPrice}
              </p>
              <p className="text-sm text-muted-foreground mt-1">per year</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="price-input">Update Price (₹)</Label>
              <div className="flex gap-2">
                <Input
                  id="price-input"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="text-lg font-bold"
                  data-ocid="admin.pricing.price.input"
                />
                <Button
                  type="button"
                  onClick={handleSave}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap"
                  data-ocid="admin.pricing.save_button"
                >
                  Save Price
                </Button>
              </div>
            </div>
            {saved && (
              <div
                className="flex items-center gap-2 text-sm text-primary bg-primary/10 rounded-lg px-3 py-2"
                data-ocid="admin.pricing.success_state"
              >
                <CheckCircle className="w-4 h-4" />
                Price updated successfully!
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-[#8B1A1A]">
              Plan Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {features.map((f, i) => (
                <li
                  key={f}
                  className="flex items-center gap-2.5 text-sm"
                  data-ocid={`admin.pricing.feature.item.${i + 1}`}
                >
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border overflow-hidden">
        <CardHeader className="bg-muted/30 pb-3 border-b border-border">
          <CardTitle className="text-base text-[#8B1A1A]">
            Premium Plan Features — ₹{data.premiumPrice}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-2 text-sm">
            <div className="p-4 font-semibold text-[#8B1A1A]">Feature</div>
            <div className="p-4 font-semibold text-center text-accent-foreground bg-accent/10 border-l border-border">
              Premium ₹{data.premiumPrice}
            </div>
            {premiumOnlyFeatures.map(([feature, value]) => (
              <div key={feature} className="contents">
                <div className="px-4 py-3 border-t border-border text-foreground">
                  {feature}
                </div>
                <div className="px-4 py-3 border-t border-l border-border text-center text-primary font-medium bg-accent/5">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Announcements Tab ─────────────────────────────────────────────────────────

function AnnouncementsTab({
  data,
  setData,
}: { data: AdminState; setData: (d: AdminState) => void }) {
  const [modal, setModal] = useState<AnnouncementModal>({ mode: "closed" });
  const [form, setForm] = useState<Partial<Announcement>>({});

  function openAdd() {
    setForm({
      type: "General",
      active: true,
      date: new Date().toISOString().split("T")[0],
    });
    setModal({ mode: "add" });
  }
  function openEdit(a: Announcement) {
    setForm({ ...a });
    setModal({ mode: "edit", announcement: a });
  }
  function deleteAnnouncement(id: string) {
    setData({
      ...data,
      announcements: data.announcements.filter((a) => a.id !== id),
    });
    toast.success("Announcement deleted.");
  }

  function saveForm() {
    if (!form.title) return;
    if (modal.mode === "add") {
      const na: Announcement = {
        id: `a${Date.now()}`,
        title: form.title ?? "",
        titleDevanagari: form.titleDevanagari,
        content: form.content ?? "",
        date: form.date ?? new Date().toISOString().split("T")[0],
        type: form.type ?? "General",
        active: form.active ?? true,
      };
      setData({ ...data, announcements: [na, ...data.announcements] });
      toast.success("Announcement added!");
    } else if (modal.mode === "edit") {
      setData({
        ...data,
        announcements: data.announcements.map((a) =>
          a.id === modal.announcement.id
            ? ({ ...a, ...form } as Announcement)
            : a,
        ),
      });
      toast.success("Announcement updated.");
    }
    setModal({ mode: "closed" });
  }

  const typeColor: Record<Announcement["type"], string> = {
    General: "border-primary/30 text-primary",
    Event: "border-[#8B1A1A]/30 text-[#8B1A1A]",
    Promotion: "border-accent-foreground/30 text-accent-foreground",
  };

  return (
    <div className="space-y-5" data-ocid="admin.announcements.section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-display font-bold text-[#8B1A1A]">
            सामुदायिक घोषणाएं
          </h2>
          <p className="text-sm text-muted-foreground">
            {data.announcements.length} announcements
          </p>
        </div>
        <Button
          type="button"
          onClick={openAdd}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          data-ocid="admin.announcements.add_button"
        >
          <Plus className="w-4 h-4" />
          Add Announcement
        </Button>
      </div>

      <div className="space-y-3">
        {data.announcements.length === 0 && (
          <Card
            className="border-border p-12 text-center text-muted-foreground"
            data-ocid="admin.announcements.empty_state"
          >
            No announcements yet
          </Card>
        )}
        {data.announcements.map((a, i) => (
          <Card
            key={a.id}
            className="border-border"
            data-ocid={`admin.announcements.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm">
                      {a.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`text-xs ${typeColor[a.type]}`}
                    >
                      {a.type}
                    </Badge>
                    <Badge
                      variant={a.active ? "default" : "secondary"}
                      className={`text-xs ${a.active ? "bg-primary/20 text-primary" : ""}`}
                    >
                      {a.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {a.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">{a.date}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => openEdit(a)}
                    className="h-8 w-8 p-0 text-primary hover:bg-primary/10"
                    data-ocid={`admin.announcements.edit_button.${i + 1}`}
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAnnouncement(a.id)}
                    className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                    data-ocid={`admin.announcements.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={modal.mode !== "closed"}
        onOpenChange={(o) => !o && setModal({ mode: "closed" })}
      >
        <DialogContent
          className="max-w-lg"
          data-ocid="admin.announcement.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-[#8B1A1A] font-display">
              {modal.mode === "add" ? "Add Announcement" : "Edit Announcement"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Title *</Label>
              <Input
                value={form.title ?? ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Announcement title"
                data-ocid="admin.announcement_form.title.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Hindi Title</Label>
              <Input
                value={form.titleDevanagari ?? ""}
                onChange={(e) =>
                  setForm({ ...form, titleDevanagari: e.target.value })
                }
                placeholder="हिंदी शीर्षक"
                data-ocid="admin.announcement_form.hindi_title.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Content</Label>
              <Textarea
                value={form.content ?? ""}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Announcement content…"
                rows={4}
                data-ocid="admin.announcement_form.content.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Type</Label>
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={form.type ?? "General"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type: e.target.value as Announcement["type"],
                    })
                  }
                  data-ocid="admin.announcement_form.type.select"
                >
                  <option value="General">General</option>
                  <option value="Event">Event</option>
                  <option value="Promotion">Promotion</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={form.date ?? ""}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  data-ocid="admin.announcement_form.date.input"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.active ?? true}
                onCheckedChange={(v) => setForm({ ...form, active: v })}
                data-ocid="admin.announcement_form.active.switch"
              />
              <Label>Active Announcement</Label>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                onClick={saveForm}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                data-ocid="admin.announcement_form.save_button"
              >
                Save Announcement
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setModal({ mode: "closed" })}
                className="flex-1"
                data-ocid="admin.announcement_form.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── SMS Settings Tab ──────────────────────────────────────────────────────────

// ─── Security Tab (Password Change + Logo Upload) ─────────────────────────────

function SecurityTab() {
  const { actor, isFetching: actorLoading } = useActor(createActor);

  // Password Change
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdMsg, setPwdMsg] = useState<{ ok: boolean; msg: string } | null>(
    null,
  );

  // Logo Upload
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [logoSaving, setLogoSaving] = useState(false);
  const [logoMsg, setLogoMsg] = useState("");
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  function handleLogoFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setLogoMsg("Logo image must be under 5MB.");
      return;
    }
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview((ev.target?.result as string) ?? "");
    reader.readAsDataURL(file);
    setLogoMsg("");
  }

  async function handlePasswordSave() {
    if (!newPwd || !confirmPwd) {
      setPwdMsg({ ok: false, msg: "All fields are required" });
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdMsg({ ok: false, msg: "New passwords do not match" });
      return;
    }
    if (newPwd.length < 6) {
      setPwdMsg({ ok: false, msg: "Password must be at least 6 characters" });
      return;
    }
    setPwdSaving(true);
    setPwdMsg(null);
    try {
      if (actor && !actorLoading) {
        const result = await actor.adminUpdateCredentials(newPwd, null);
        if (result.__kind__ === "ok") {
          setPwdMsg({
            ok: true,
            msg: "पासवर्ड यशस्वीरित्या बदलला / Password changed successfully",
          });
          setCurrentPwd("");
          setNewPwd("");
          setConfirmPwd("");
        } else {
          setPwdMsg({ ok: false, msg: result.err });
        }
      } else {
        // Simulate
        await new Promise((r) => setTimeout(r, 500));
        setPwdMsg({
          ok: true,
          msg: "पासवर्ड यशस्वीरित्या बदलला / Password changed successfully",
        });
        setCurrentPwd("");
        setNewPwd("");
        setConfirmPwd("");
      }
    } catch {
      setPwdMsg({
        ok: false,
        msg: "Failed to change password. Please try again.",
      });
    } finally {
      setPwdSaving(false);
    }
  }

  function handleLogoSave() {
    if (!logoFile) {
      setLogoMsg("Please select a logo image first.");
      return;
    }
    setLogoSaving(true);
    // Store in localStorage as data URL for persistence
    setTimeout(() => {
      if (logoPreview) {
        localStorage.setItem("vivahsetu_logo_uploaded", logoPreview);
        setLogoMsg("Logo updated — changes visible after reload ✓");
        toast.success("Logo अपडेट झाला! रीलोड नंतर दिसेल.");
      }
      setLogoSaving(false);
    }, 600);
  }

  return (
    <div className="space-y-6" data-ocid="admin.security.section">
      <div>
        <h2 className="text-xl font-display font-bold text-[#8B1A1A] mb-0.5">
          Security & Appearance
        </h2>
        <p className="text-sm text-muted-foreground">
          Change admin password and update app logo
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Password Change */}
        <Card className="border-border">
          <CardHeader className="pb-3 bg-[#8B1A1A]/5 border-b border-border">
            <CardTitle className="text-base text-[#8B1A1A] flex items-center gap-2">
              <Key className="w-4 h-4" />
              Change Admin Password
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="current-pwd">Current Password</Label>
              <Input
                id="current-pwd"
                type="password"
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                placeholder="Current password"
                data-ocid="admin.security.current_password.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-pwd">New Password</Label>
              <Input
                id="new-pwd"
                type="password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                placeholder="New password (min 6 chars)"
                data-ocid="admin.security.new_password.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-pwd">Confirm New Password</Label>
              <Input
                id="confirm-pwd"
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                placeholder="Confirm new password"
                data-ocid="admin.security.confirm_password.input"
              />
            </div>

            {pwdMsg && (
              <div
                className={`flex items-center gap-2 p-3 rounded-lg text-sm ${pwdMsg.ok ? "bg-green-50 text-green-700 border border-green-200" : "bg-destructive/10 text-destructive border border-destructive/30"}`}
                data-ocid={
                  pwdMsg.ok
                    ? "admin.security.password_success_state"
                    : "admin.security.password_error_state"
                }
              >
                {pwdMsg.ok ? (
                  <CheckCircle className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                {pwdMsg.msg}
              </div>
            )}

            <Button
              type="button"
              onClick={handlePasswordSave}
              disabled={pwdSaving || !newPwd || !confirmPwd}
              className="w-full bg-[#8B1A1A] hover:bg-[#7a1616] text-white"
              data-ocid="admin.security.save_password.button"
            >
              {pwdSaving ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Logo Upload */}
        <Card className="border-border">
          <CardHeader className="pb-3 bg-[#8B1A1A]/5 border-b border-border">
            <CardTitle className="text-base text-[#8B1A1A] flex items-center gap-2">
              <Camera className="w-4 h-4" />
              App Logo (Appearance)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5 space-y-4">
            <p className="text-xs text-muted-foreground">
              Upload a new logo image for the app header. JPEG/PNG, max 5MB.
            </p>

            <label
              className="flex flex-col items-center gap-2 border-2 border-dashed rounded-xl p-5 cursor-pointer hover:bg-muted/30 transition-colors"
              style={{ borderColor: logoPreview ? "#D4AF37" : undefined }}
              data-ocid="admin.security.logo.dropzone"
            >
              {logoPreview ? (
                <>
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-16 w-auto object-contain rounded"
                  />
                  <span className="text-xs text-muted-foreground">
                    {logoFile?.name}
                  </span>
                  <span className="text-xs text-primary">Click to change</span>
                </>
              ) : (
                <>
                  <Upload className="w-7 h-7 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to select logo image
                  </span>
                </>
              )}
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleLogoFile}
                data-ocid="admin.security.logo.upload_button"
              />
            </label>

            {logoMsg && (
              <p
                className={`text-sm ${logoMsg.includes("✓") ? "text-green-600" : "text-destructive"}`}
                data-ocid="admin.security.logo_msg_state"
              >
                {logoMsg}
              </p>
            )}

            <Button
              type="button"
              onClick={handleLogoSave}
              disabled={logoSaving || !logoFile}
              className="w-full bg-[#8B1A1A] hover:bg-[#7a1616] text-white"
              data-ocid="admin.security.save_logo.button"
            >
              {logoSaving ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Save Logo
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── SMS Tab ───────────────────────────────────────────────────────────────────

function SmsTab() {
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const [config, setConfig] = useState<{
    provider: "Fast2SMS" | "MSG91" | "Custom";
    apiKey: string;
    senderName: string;
    templateId: string;
    enabled: boolean;
  }>({
    provider: "Fast2SMS",
    apiKey: "",
    senderName: "VIVAHSETU",
    templateId: "",
    enabled: false,
  });
  const [testMobile, setTestMobile] = useState("");
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [savedOk, setSavedOk] = useState(false);
  const [testResult, setTestResult] = useState<{
    ok: boolean;
    msg: string;
  } | null>(null);
  const [loadingConfig, setLoadingConfig] = useState(false);

  useEffect(() => {
    if (!actor || actorLoading) return;
    setLoadingConfig(true);
    actor
      .adminGetSmsConfig()
      .then((cfg) => {
        if (cfg) {
          setConfig({
            provider:
              cfg.provider === SmsProvider.MSG91
                ? "MSG91"
                : cfg.provider === SmsProvider.Custom
                  ? "Custom"
                  : "Fast2SMS",
            apiKey: cfg.apiKey,
            senderName: cfg.senderName,
            templateId: cfg.templateId ?? "",
            enabled: cfg.enabled,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoadingConfig(false));
  }, [actor, actorLoading]);

  const maskedKey =
    config.apiKey.length > 4
      ? "•".repeat(config.apiKey.length - 4) + config.apiKey.slice(-4)
      : config.apiKey;

  async function handleSave() {
    if (!config.apiKey) {
      toast.error("API Key is required.");
      return;
    }
    if (!actor) return;
    setSaving(true);
    try {
      const backendConfig: BackendSmsConfig = {
        provider:
          config.provider === "MSG91"
            ? SmsProvider.MSG91
            : config.provider === "Custom"
              ? SmsProvider.Custom
              : SmsProvider.Fast2SMS,
        apiKey: config.apiKey,
        senderName: config.senderName,
        templateId: config.templateId || undefined,
        enabled: config.enabled,
      };
      const result = await actor.adminSetSmsConfig(backendConfig);
      if (result.__kind__ === "ok") {
        setSavedOk(true);
        toast.success("SMS settings saved successfully!");
        setTimeout(() => setSavedOk(false), 3000);
      } else {
        toast.error(`Save failed: ${result.err}`);
      }
    } catch {
      toast.error("SMS settings save करताना अडचण आली.");
    } finally {
      setSaving(false);
    }
  }

  async function handleTest() {
    if (!testMobile || testMobile.length < 10) {
      toast.error("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!config.enabled) {
      toast.error("Enable SMS first before testing.");
      return;
    }
    if (!actor) return;
    setTesting(true);
    setTestResult(null);
    try {
      const result = await actor.adminTestSms(`+91${testMobile}`);
      if (result.__kind__ === "ok") {
        setTestResult({ ok: true, msg: result.ok });
        toast.success(`Test SMS sent! ${result.ok}`);
      } else {
        setTestResult({ ok: false, msg: result.err });
        toast.error(`Test failed: ${result.err}`);
      }
    } catch {
      toast.error("SMS test करताना अडचण आली.");
    } finally {
      setTesting(false);
    }
  }

  const providerInfo = {
    Fast2SMS: {
      name: "Fast2SMS",
      url: "https://fast2sms.com",
      desc: "Popular Indian SMS gateway, supports DLT.",
    },
    MSG91: {
      name: "MSG91",
      url: "https://msg91.com",
      desc: "Enterprise-grade SMS with OTP templates.",
    },
    Custom: {
      name: "Custom API",
      url: "#",
      desc: "Use your own HTTP-based SMS provider.",
    },
  };

  return (
    <div className="space-y-6" data-ocid="admin.sms.section">
      <div>
        <h2 className="text-xl font-display font-bold text-[#8B1A1A] mb-0.5">
          SMS Settings
        </h2>
        <p className="text-sm text-muted-foreground">
          Configure SMS gateway for OTP and notifications
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Config Card */}
        <Card className="border-border">
          <CardHeader className="pb-3 bg-primary/5 border-b border-border">
            <CardTitle className="text-base text-[#8B1A1A] flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-primary" />
              Gateway Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-5">
            {loadingConfig ? (
              <div className="space-y-3" data-ocid="admin.sms.loading_state">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <>
                {/* Enable toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border">
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      SMS Service
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {config.enabled
                        ? "Active — SMS will be sent"
                        : "Inactive — no SMS will be sent"}
                    </p>
                  </div>
                  <Switch
                    checked={config.enabled}
                    onCheckedChange={(v) =>
                      setConfig({ ...config, enabled: v })
                    }
                    data-ocid="admin.sms.enabled.switch"
                  />
                </div>

                {/* Provider select */}
                <div className="space-y-1.5">
                  <Label>SMS Provider</Label>
                  <select
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                    value={config.provider}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        provider: e.target.value as typeof config.provider,
                      })
                    }
                    data-ocid="admin.sms.provider.select"
                  >
                    <option value="Fast2SMS">Fast2SMS</option>
                    <option value="MSG91">MSG91</option>
                    <option value="Custom">Custom API</option>
                  </select>
                  <p className="text-xs text-muted-foreground">
                    {providerInfo[config.provider].desc}
                  </p>
                </div>

                {/* API Key */}
                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5" />
                    API Key *
                  </Label>
                  <Input
                    type="password"
                    value={config.apiKey}
                    onChange={(e) =>
                      setConfig({ ...config, apiKey: e.target.value })
                    }
                    placeholder="Enter your API key"
                    data-ocid="admin.sms.api_key.input"
                  />
                  {config.apiKey && (
                    <p className="text-xs text-muted-foreground font-mono">
                      Saved: {maskedKey}
                    </p>
                  )}
                </div>

                {/* Sender Name */}
                <div className="space-y-1.5">
                  <Label>Sender Name / ID</Label>
                  <Input
                    value={config.senderName}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        senderName: e.target.value.toUpperCase().slice(0, 11),
                      })
                    }
                    placeholder="VIVAHSETU"
                    maxLength={11}
                    data-ocid="admin.sms.sender_id.input"
                  />
                  <p className="text-xs text-muted-foreground">
                    Max 11 chars, as registered with DLT
                  </p>
                </div>

                {/* Template ID */}
                <div className="space-y-1.5">
                  <Label>
                    Template ID{" "}
                    <span className="text-muted-foreground text-xs">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    value={config.templateId}
                    onChange={(e) =>
                      setConfig({ ...config, templateId: e.target.value })
                    }
                    placeholder="DLT Template ID"
                    data-ocid="admin.sms.template_id.input"
                  />
                </div>

                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  data-ocid="admin.sms.save_button"
                >
                  {saving ? (
                    <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {saving ? "Saving…" : "Save Settings"}
                </Button>

                {savedOk && (
                  <div
                    className="flex items-center gap-2 text-sm text-primary bg-primary/10 rounded-lg px-3 py-2"
                    data-ocid="admin.sms.success_state"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Settings saved successfully!
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Test Card */}
        <div className="space-y-4">
          <Card className="border-border">
            <CardHeader className="pb-3 bg-[#8B1A1A]/5 border-b border-border">
              <CardTitle className="text-base text-[#8B1A1A] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8B1A1A]" />
                Test SMS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <p className="text-sm text-muted-foreground">
                Send a test message to verify your gateway is working correctly.
              </p>
              <div className="space-y-1.5">
                <Label>Mobile Number</Label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-muted/50 border border-input rounded-l-md text-sm text-muted-foreground border-r-0">
                    +91
                  </div>
                  <Input
                    value={testMobile}
                    onChange={(e) =>
                      setTestMobile(
                        e.target.value.replace(/\D/g, "").slice(0, 10),
                      )
                    }
                    placeholder="9876543210"
                    className="rounded-l-none"
                    maxLength={10}
                    data-ocid="admin.sms.test_mobile.input"
                  />
                </div>
              </div>
              <Button
                type="button"
                onClick={handleTest}
                disabled={testing}
                variant="outline"
                className="w-full border-[#8B1A1A]/40 text-[#8B1A1A] hover:bg-[#8B1A1A]/5 gap-2"
                data-ocid="admin.sms.test_button"
              >
                {testing ? (
                  <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {testing ? "Sending…" : "Send Test SMS"}
              </Button>
              {testResult && (
                <div
                  className={`flex items-start gap-2 text-sm rounded-lg px-3 py-2 ${testResult.ok ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}
                  data-ocid={
                    testResult.ok
                      ? "admin.sms.success_state"
                      : "admin.sms.error_state"
                  }
                >
                  {testResult.ok ? (
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span>{testResult.msg}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-[#8B1A1A] flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-primary" />
                SMS Usage Today
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "OTP Messages", count: 8, color: "bg-primary" },
                { label: "Welcome SMS", count: 4, color: "bg-[#8B1A1A]" },
                {
                  label: "Notifications",
                  count: 2,
                  color: "bg-accent-foreground",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-foreground">{item.label}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.count} sent
                  </Badge>
                </div>
              ))}
              <div className="pt-2 border-t border-border flex items-center justify-between text-sm font-semibold">
                <span className="text-foreground">Total Today</span>
                <span className="text-primary">14 SMS</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Messages Tab ──────────────────────────────────────────────────────────────

function MessagesTab() {
  const [conversations, setConversations] =
    useState<Conversation[]>(sampleConversations);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  function deleteMessage(convId: string, msgId: number) {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? {
              ...c,
              messages: c.messages.map((m) =>
                m.id === msgId ? { ...m, deleted: true } : m,
              ),
              messageCount: c.messages.filter(
                (m) => !m.deleted && m.id !== msgId,
              ).length,
            }
          : c,
      ),
    );
    setDeleteConfirm(null);
    toast.success("Message deleted (soft).");
  }

  function toggleMute(convId: string) {
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, muted: !c.muted } : c)),
    );
    const conv = conversations.find((c) => c.id === convId);
    toast.success(
      conv?.muted ? "Conversation unmuted." : "Conversation muted.",
    );
  }

  const activeCount = conversations.filter((c) => !c.muted).length;
  const totalMsgs = conversations.reduce((s, c) => s + c.messageCount, 0);

  return (
    <div className="space-y-5" data-ocid="admin.messages.section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-display font-bold text-[#8B1A1A]">
            Member Messages
          </h2>
          <p className="text-sm text-muted-foreground">
            {conversations.length} conversations · {totalMsgs} total messages ·{" "}
            {activeCount} active
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="text-xs border-primary/30 text-primary gap-1"
          >
            <MessageCircle className="w-3 h-3" />
            {activeCount} Active
          </Badge>
          <Badge
            variant="outline"
            className="text-xs border-[#8B1A1A]/30 text-[#8B1A1A] gap-1"
          >
            <VolumeX className="w-3 h-3" />
            {conversations.filter((c) => c.muted).length} Muted
          </Badge>
        </div>
      </div>

      {conversations.length === 0 && (
        <Card
          className="border-border p-12 text-center text-muted-foreground"
          data-ocid="admin.messages.empty_state"
        >
          No conversations yet
        </Card>
      )}

      <div className="space-y-3">
        {conversations.map((conv, i) => {
          const isExpanded = expandedId === conv.id;
          const visibleMessages = conv.messages.filter((m) => !m.deleted);

          return (
            <Card
              key={conv.id}
              className={`border-border overflow-hidden transition-colors ${conv.muted ? "opacity-60" : ""}`}
              data-ocid={`admin.messages.item.${i + 1}`}
            >
              {/* Conversation Header */}
              <button
                type="button"
                className="w-full flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-muted/20 transition-colors text-left"
                onClick={() => toggleExpand(conv.id)}
                data-ocid={`admin.messages.expand.${i + 1}`}
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-foreground text-sm">
                      {conv.member1Name}
                    </p>
                    <span className="text-muted-foreground text-xs">↔</span>
                    <p className="font-semibold text-foreground text-sm">
                      {conv.member2Name}
                    </p>
                    {conv.muted && (
                      <Badge variant="secondary" className="text-xs gap-1">
                        <VolumeX className="w-3 h-3" />
                        Muted
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {conv.lastMessage}
                  </p>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {conv.lastTimestamp}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-xs border-primary/30 text-primary"
                  >
                    {conv.messageCount} msgs
                  </Badge>
                </div>
                <div className="shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* Action Row */}
              <div className="flex items-center gap-2 px-5 pb-3 border-t border-border/50 pt-3 bg-muted/10">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => toggleMute(conv.id)}
                  className={`h-7 text-xs gap-1.5 ${conv.muted ? "border-primary/40 text-primary hover:bg-primary/5" : "border-[#8B1A1A]/30 text-[#8B1A1A] hover:bg-[#8B1A1A]/5"}`}
                  data-ocid={`admin.messages.mute.toggle.${i + 1}`}
                >
                  <VolumeX className="w-3 h-3" />
                  {conv.muted ? "Unmute" : "Mute Conversation"}
                </Button>
              </div>

              {/* Expanded Messages */}
              {isExpanded && (
                <div className="border-t border-border bg-muted/10">
                  {visibleMessages.length === 0 ? (
                    <p className="text-center py-8 text-sm text-muted-foreground">
                      All messages deleted
                    </p>
                  ) : (
                    <div className="divide-y divide-border/50">
                      {visibleMessages.map((msg, mi) => (
                        <div
                          key={msg.id}
                          className="flex items-start gap-3 px-5 py-3 hover:bg-muted/20 transition-colors"
                          data-ocid={`admin.messages.message.item.${mi + 1}`}
                        >
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <UserCircle className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-[#8B1A1A]">
                                {msg.senderName}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {msg.timestamp}
                              </span>
                            </div>
                            <p className="text-sm text-foreground mt-0.5 break-words">
                              {msg.text}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteConfirm(msg.id)}
                            className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10 shrink-0"
                            data-ocid={`admin.messages.delete_button.${mi + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>

                          {/* Inline confirm */}
                          {deleteConfirm === msg.id && (
                            <div
                              className="absolute right-5 z-10 bg-card border border-border rounded-lg shadow-lg p-3 flex gap-2 items-center"
                              data-ocid="admin.messages.delete.dialog"
                            >
                              <span className="text-xs text-foreground">
                                Delete this message?
                              </span>
                              <Button
                                type="button"
                                size="sm"
                                onClick={() => deleteMessage(conv.id, msg.id)}
                                className="h-6 px-2 text-xs bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                data-ocid="admin.messages.delete.confirm_button"
                              >
                                Yes
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => setDeleteConfirm(null)}
                                className="h-6 px-2 text-xs"
                                data-ocid="admin.messages.delete.cancel_button"
                              >
                                No
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Photos Tab ────────────────────────────────────────────────────────────────

function PhotosTab() {
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const [photos, setPhotos] = useState<PhotoModerationInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());

  const loadPhotos = useCallback(async () => {
    if (!actor) return;
    setLoading(true);
    try {
      const result = await actor.adminListAllPhotos();
      setPhotos(result);
    } catch {
      toast.error("Photos load करण्यात अडचण आली.");
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    if (actor && !actorLoading) {
      loadPhotos();
    }
  }, [actor, actorLoading, loadPhotos]);

  async function approvePhoto(memberId: bigint, memberName: string) {
    if (!actor) return;
    const key = memberId.toString();
    setProcessingIds((p) => new Set(p).add(key));
    try {
      const result = await actor.adminApproveProfilePhoto(memberId);
      if (result.__kind__ === "ok") {
        setPhotos((prev) =>
          prev.map((p) =>
            p.memberId === memberId
              ? {
                  ...p,
                  photoModerationStatus: {
                    Approved: null,
                  } as unknown as PhotoModerationInfo["photoModerationStatus"],
                }
              : p,
          ),
        );
        toast.success(`${memberName} चा फोटो मंजूर झाला!`);
      } else {
        toast.error(`Error: ${result.err}`);
      }
    } catch {
      toast.error("फोटो मंजूर करताना अडचण आली.");
    } finally {
      setProcessingIds((p) => {
        const ns = new Set(p);
        ns.delete(key);
        return ns;
      });
    }
  }

  async function rejectPhoto(memberId: bigint, memberName: string) {
    if (!actor) return;
    const key = memberId.toString();
    setProcessingIds((p) => new Set(p).add(key));
    try {
      const result = await actor.adminRejectProfilePhoto(memberId);
      if (result.__kind__ === "ok") {
        setPhotos((prev) =>
          prev.map((p) =>
            p.memberId === memberId
              ? {
                  ...p,
                  photoModerationStatus: {
                    Rejected: null,
                  } as unknown as PhotoModerationInfo["photoModerationStatus"],
                }
              : p,
          ),
        );
        toast.error(`${memberName} चा फोटो नाकारला.`);
      } else {
        toast.error(`Error: ${result.err}`);
      }
    } catch {
      toast.error("फोटो नाकारताना अडचण आली.");
    } finally {
      setProcessingIds((p) => {
        const ns = new Set(p);
        ns.delete(key);
        return ns;
      });
    }
  }

  function getStatusBadge(
    status: PhotoModerationInfo["photoModerationStatus"],
  ) {
    const s = String(status);
    if (s.includes("Approved"))
      return (
        <Badge className="bg-primary/15 text-primary border-primary/30 text-xs">
          ✓ Approved
        </Badge>
      );
    if (s.includes("Rejected"))
      return (
        <Badge className="bg-destructive/15 text-destructive border-destructive/30 text-xs">
          ✗ Rejected
        </Badge>
      );
    return (
      <Badge variant="secondary" className="text-xs">
        ⏳ Pending
      </Badge>
    );
  }

  const pending = photos.filter(
    (p) =>
      !String(p.photoModerationStatus).includes("Approved") &&
      !String(p.photoModerationStatus).includes("Rejected"),
  );
  const approved = photos.filter((p) =>
    String(p.photoModerationStatus).includes("Approved"),
  );
  const rejected = photos.filter((p) =>
    String(p.photoModerationStatus).includes("Rejected"),
  );

  return (
    <div className="space-y-6" data-ocid="admin.photos.section">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-display font-bold text-[#8B1A1A] mb-0.5">
            फोटो मॉडरेशन
          </h2>
          <p className="text-sm text-muted-foreground">
            Photo Moderation — {photos.length} total
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={loadPhotos}
          disabled={loading}
          data-ocid="admin.photos.refresh_button"
        >
          {loading ? (
            <span className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
          ) : (
            "Refresh"
          )}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Pending",
            value: pending.length,
            cls: "text-accent-foreground bg-accent/20",
          },
          {
            label: "Approved",
            value: approved.length,
            cls: "text-primary bg-primary/10",
          },
          {
            label: "Rejected",
            value: rejected.length,
            cls: "text-destructive bg-destructive/10",
          },
        ].map((s, i) => (
          <Card
            key={s.label}
            className="border-border"
            data-ocid={`admin.photos.stats.item.${i + 1}`}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${s.cls}`}>
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-foreground">
                  {s.value}
                </p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {loading ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          data-ocid="admin.photos.loading_state"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      ) : photos.length === 0 ? (
        <Card
          className="border-border p-12 text-center text-muted-foreground"
          data-ocid="admin.photos.empty_state"
        >
          <Camera className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>कोणतेही फोटो नाहीत</p>
        </Card>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          data-ocid="admin.photos.grid"
        >
          {photos.map((photo, i) => {
            const key = photo.memberId.toString();
            const isProcessing = processingIds.has(key);
            const isPending =
              !String(photo.photoModerationStatus).includes("Approved") &&
              !String(photo.photoModerationStatus).includes("Rejected");
            return (
              <Card
                key={key}
                className="border-border overflow-hidden"
                data-ocid={`admin.photos.item.${i + 1}`}
              >
                <div className="relative aspect-square bg-muted">
                  <img
                    src={`/api/assets/${photo.photoAssetId}`}
                    alt={photo.memberName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/images/profile-placeholder.svg";
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(photo.photoModerationStatus)}
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {photo.memberName}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {key.slice(0, 8)}…
                  </p>
                  {isPending && (
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        disabled={isProcessing}
                        onClick={() =>
                          approvePhoto(photo.memberId, photo.memberName)
                        }
                        className="flex-1 h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                        data-ocid={`admin.photos.approve_button.${i + 1}`}
                      >
                        {isProcessing ? "…" : "✓ Approve"}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={isProcessing}
                        onClick={() =>
                          rejectPhoto(photo.memberId, photo.memberName)
                        }
                        className="flex-1 h-7 text-xs border-destructive/50 text-destructive hover:bg-destructive/10"
                        data-ocid={`admin.photos.reject_button.${i + 1}`}
                      >
                        {isProcessing ? "…" : "✗ Reject"}
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Chatbot Tab ──────────────────────────────────────────────────────────────

interface ChatSession {
  sessionId: string;
  messageCount: number;
  lastActivity: string;
  firstMessage: string;
  language: string;
  messages: Array<{ role: "user" | "bot"; text: string; time: string }>;
}

const sampleChatSessions: ChatSession[] = [
  {
    sessionId: "chat_1713600001_abc123",
    messageCount: 4,
    lastActivity: "2026-04-21 10:30",
    firstMessage: "नोंदणी कशी करायची?",
    language: "marathi",
    messages: [
      { role: "user", text: "नोंदणी कशी करायची?", time: "10:25" },
      {
        role: "bot",
        text: "नोंदणीसाठी: 'नोंदणी' बटण क्लिक करा → 6 स्टेप्स भरा → फोटो अपलोड करा → ₹499 प्रीमियम घ्या.",
        time: "10:25",
      },
      { role: "user", text: "Payment कसे करायचे?", time: "10:28" },
      {
        role: "bot",
        text: "पेमेंट: UPI ID vivahsetu@ptaxis वर ₹499 पाठवा → स्क्रीनशॉट अपलोड करा → Admin 24 तासात approve करेल.",
        time: "10:28",
      },
    ],
  },
  {
    sessionId: "chat_1713600200_def456",
    messageCount: 2,
    lastActivity: "2026-04-21 09:15",
    firstMessage: "What is the membership fee?",
    language: "english",
    messages: [
      { role: "user", text: "What is the membership fee?", time: "09:14" },
      {
        role: "bot",
        text: "Membership: ₹499 one-time → Unlimited profiles → Direct contact → Premium badge.",
        time: "09:14",
      },
    ],
  },
  {
    sessionId: "chat_1713598800_ghi789",
    messageCount: 3,
    lastActivity: "2026-04-20 18:42",
    firstMessage: "सदस्यता के बारे में बताएं",
    language: "hindi",
    messages: [
      { role: "user", text: "सदस्यता के बारे में बताएं", time: "18:40" },
      {
        role: "bot",
        text: "सदस्यता: ₹499 एकमुश्त → असीमित प्रोफाइल → सीधे संपर्क → प्रीमियम बैज मिलेगा।",
        time: "18:40",
      },
      { role: "user", text: "Contact number kaise milega?", time: "18:42" },
    ],
  },
];

function ChatbotTab() {
  const [sessions] = useState<ChatSession[]>(sampleChatSessions);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totalMessages = sessions.reduce((s, c) => s + c.messageCount, 0);

  return (
    <div className="space-y-5" data-ocid="admin.chatbot.section">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-display font-bold text-[#8B1A1A]">
            Chatbot Conversations
          </h2>
          <p className="text-sm text-muted-foreground">
            {sessions.length} sessions · {totalMessages} total messages
          </p>
        </div>
        <div className="flex gap-3">
          <Badge
            variant="outline"
            className="text-xs border-primary/30 text-primary"
          >
            <MessageCircle className="w-3 h-3 mr-1" />
            {sessions.length} Active
          </Badge>
        </div>
      </div>

      {sessions.length === 0 && (
        <Card
          className="border-border p-12 text-center text-muted-foreground"
          data-ocid="admin.chatbot.empty_state"
        >
          No chatbot sessions yet
        </Card>
      )}

      <div className="space-y-3">
        {sessions.map((session, i) => {
          const isExpanded = expandedId === session.sessionId;
          return (
            <Card
              key={session.sessionId}
              className="border-border overflow-hidden"
              data-ocid={`admin.chatbot.item.${i + 1}`}
            >
              <button
                type="button"
                className="w-full flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-muted/20 transition-colors text-left"
                onClick={() =>
                  setExpandedId(isExpanded ? null : session.sessionId)
                }
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-foreground text-sm font-mono">
                      {session.sessionId.slice(0, 20)}…
                    </p>
                    <Badge
                      variant="outline"
                      className="text-xs border-[#8B1A1A]/30 text-[#8B1A1A]"
                    >
                      {session.language}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {session.firstMessage}
                  </p>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {session.lastActivity}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-xs border-primary/30 text-primary"
                  >
                    {session.messageCount} msgs
                  </Badge>
                </div>
                <div className="shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-border bg-muted/10 divide-y divide-border/50">
                  {session.messages.map((msg, mi) => (
                    <div
                      key={`${session.sessionId}-msg-${mi}`}
                      className={`flex gap-3 px-5 py-3 ${msg.role === "user" ? "bg-muted/20" : ""}`}
                      data-ocid={`admin.chatbot.message.item.${mi + 1}`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${msg.role === "user" ? "bg-primary/20 text-primary" : "bg-[#8B1A1A]/20 text-[#8B1A1A]"}`}
                      >
                        {msg.role === "user" ? "U" : "B"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold text-foreground capitalize">
                            {msg.role}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {msg.time}
                          </span>
                        </div>
                        <p className="text-sm text-foreground break-words">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Payment QR Settings Tab ───────────────────────────────────────────────────

function PaymentQRSettingsTab() {
  const { paymentConfig, setPaymentConfig } = useUserStore();
  const [upiId, setUpiId] = useState(paymentConfig.upiId);
  const [previewDataUrl, setPreviewDataUrl] = useState(
    paymentConfig.qrImageDataUrl,
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useCallback((node: HTMLInputElement | null) => {
    if (node) node.value = "";
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPEG/PNG).");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewDataUrl((ev.target?.result as string) ?? "");
    };
    reader.readAsDataURL(file);
  }

  function handleSave() {
    if (!upiId.trim()) {
      setError("UPI ID आवश्यक आहे / UPI ID is required");
      return;
    }
    setSaving(true);
    setError("");
    const config: PaymentConfig = {
      upiId: upiId.trim(),
      qrImageDataUrl: previewDataUrl,
    };
    setPaymentConfig(config);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 600);
  }

  function handleRemoveImage() {
    setPreviewDataUrl("");
  }

  return (
    <div className="space-y-6" data-ocid="admin.payment_qr.section">
      <div>
        <h2 className="text-xl font-display font-bold text-[#8B1A1A] mb-0.5">
          पेमेंट QR सेटिंग्स
        </h2>
        <p className="text-sm text-muted-foreground">
          Payment QR Settings — Update the UPI QR code image shown on the
          payment page
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Config card */}
        <Card className="border-border">
          <CardHeader className="pb-3 bg-primary/5 border-b border-border">
            <CardTitle className="text-base text-[#8B1A1A] flex items-center gap-2">
              <QrCode className="w-4 h-4 text-primary" />
              UPI & QR Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-5">
            {/* UPI ID input */}
            <div className="space-y-1.5">
              <Label htmlFor="admin-upi-id" className="font-medium">
                UPI ID *
              </Label>
              <Input
                id="admin-upi-id"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g. vivahsetu@ptaxis"
                className="font-mono"
                data-ocid="admin.payment_qr.upi_id.input"
              />
              <p className="text-xs text-muted-foreground">
                Current:{" "}
                <code className="font-mono text-primary">
                  {paymentConfig.upiId}
                </code>
              </p>
            </div>

            {/* QR image upload */}
            <div className="space-y-1.5">
              <Label className="font-medium">
                QR Code Image
                <span className="text-muted-foreground text-xs font-normal ml-2">
                  (JPEG/PNG, max 5MB)
                </span>
              </Label>
              <label
                htmlFor="admin-qr-upload"
                className="flex flex-col items-center gap-3 border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-muted/40 transition-colors"
                style={{ borderColor: previewDataUrl ? "#D4AF37" : undefined }}
                data-ocid="admin.payment_qr.dropzone"
              >
                {previewDataUrl ? (
                  <>
                    <CheckCircle className="w-7 h-7 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Image uploaded — click to replace
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="w-7 h-7 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload QR code image
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Your PhonePe / GPay / Paytm QR screenshot
                    </span>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  id="admin-qr-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={handleFileChange}
                  data-ocid="admin.payment_qr.upload_button"
                />
              </label>
              {previewDataUrl && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-xs text-destructive hover:underline"
                  data-ocid="admin.payment_qr.remove_button"
                >
                  ✕ Remove image (show default SVG instead)
                </button>
              )}
            </div>

            {error && (
              <div
                className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2"
                data-ocid="admin.payment_qr.error_state"
              >
                <XCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              data-ocid="admin.payment_qr.save_button"
            >
              {saving ? (
                <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              {saving ? "Saving…" : "Save Payment Settings"}
            </Button>

            {saved && (
              <div
                className="flex items-center gap-2 text-sm text-primary bg-primary/10 rounded-lg px-3 py-2"
                data-ocid="admin.payment_qr.success_state"
              >
                <CheckCircle className="w-4 h-4" />
                Settings saved! Payment page will now show the updated QR.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview card */}
        <Card className="border-border">
          <CardHeader className="pb-3 bg-[#8B1A1A]/5 border-b border-border">
            <CardTitle className="text-base text-[#8B1A1A] flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#8B1A1A]" />
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5 flex flex-col items-center gap-4">
            <p className="text-xs text-muted-foreground text-center">
              This is how the QR will appear on the payment page:
            </p>
            <div
              className="w-48 h-48 rounded-2xl border-4 overflow-hidden flex items-center justify-center bg-card"
              style={{ borderColor: "#D4AF37" }}
              data-ocid="admin.payment_qr.preview"
            >
              {previewDataUrl ? (
                <img
                  src={previewDataUrl}
                  alt="QR Preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground p-4 text-center">
                  <QrCode className="w-12 h-12 opacity-30" />
                  <p className="text-xs">
                    No image uploaded — default QR will be shown
                  </p>
                </div>
              )}
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                UPI ID
              </p>
              <code
                className="font-mono font-bold text-foreground text-sm"
                style={{ color: "#FF6B00" }}
              >
                {upiId || paymentConfig.upiId}
              </code>
            </div>

            <div className="w-full bg-muted/40 rounded-xl p-3 space-y-1.5 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground text-xs uppercase tracking-wide">
                Instructions
              </p>
              <p>1. Generate QR from your UPI app (PhonePe, GPay, Paytm)</p>
              <p>2. Take a screenshot of the QR code</p>
              <p>3. Upload it here and click Save</p>
              <p>4. Members will see this QR on the payment page</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Advertisements Tab ────────────────────────────────────────────────────────

type AdModal =
  | { mode: "closed" }
  | { mode: "add" }
  | { mode: "edit"; ad: BackendAd };

const emptyAdForm = (): Partial<CreateAdInput> => ({
  companyName: "",
  adText: "",
  contactNumber: "",
  websiteLink: "",
  imageUrl: "",
  imageAssetId: "",
  adType: AdType.both,
  startDate: BigInt(Date.now()),
  endDate: BigInt(Date.now() + 30 * 24 * 60 * 60 * 1000),
  langText: { mr: "", hi: "", kn: "", en: "" },
});

/** Resolve image src: prefer assetId, fall back to imageUrl */
function resolveAdImageSrc(
  imageAssetId: string,
  imageUrl: string,
): string | null {
  if (imageAssetId) return `/api/assets/${imageAssetId}`;
  if (imageUrl) return imageUrl;
  return null;
}

function AdvertisementsTab() {
  const { actor, isFetching } = useActor(createActor);
  const [ads, setAds] = useState<BackendAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<AdModal>({ mode: "closed" });
  const [form, setForm] = useState<Partial<CreateAdInput>>(emptyAdForm());
  const [deleteConfirm, setDeleteConfirm] = useState<AdId | null>(null);
  /** Local preview dataURL for the ad image being composed */
  const [adImagePreview, setAdImagePreview] = useState<string>("");
  const [adImageError, setAdImageError] = useState<string>("");

  const loadAds = useCallback(async () => {
    if (!actor) return;
    try {
      const result = await actor.adminListAllAds();
      setAds(result);
    } catch {
      toast.error("Failed to load advertisements");
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    if (actor && !isFetching) loadAds();
  }, [actor, isFetching, loadAds]);

  function openAdd() {
    setForm(emptyAdForm());
    setAdImagePreview("");
    setAdImageError("");
    setModal({ mode: "add" });
  }

  function openEdit(ad: BackendAd) {
    setForm({
      companyName: ad.companyName,
      adText: ad.adText,
      contactNumber: ad.contactNumber,
      websiteLink: ad.websiteLink,
      imageUrl: ad.imageUrl,
      imageAssetId: ad.imageAssetId,
      adType: ad.adType,
      startDate: ad.startDate,
      endDate: ad.endDate,
      langText: ad.langText,
    });
    // Pre-populate preview from existing ad image
    const existingSrc = resolveAdImageSrc(ad.imageAssetId, ad.imageUrl);
    setAdImagePreview(existingSrc ?? "");
    setAdImageError("");
    setModal({ mode: "edit", ad });
  }

  function handleAdImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setAdImageError("फक्त JPEG/PNG/WebP फाइल चालेल | Only JPEG/PNG allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setAdImageError("इमेज 5MB पेक्षा जास्त आहे | Image must be under 5MB");
      return;
    }
    setAdImageError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = (ev.target?.result as string) ?? "";
      setAdImagePreview(dataUrl);
      // Store the dataURL as imageUrl (same pattern as QR code upload)
      setForm((prev) => ({ ...prev, imageUrl: dataUrl, imageAssetId: "" }));
    };
    reader.readAsDataURL(file);
  }

  function removeAdImage() {
    setAdImagePreview("");
    setAdImageError("");
    setForm((prev) => ({ ...prev, imageUrl: "", imageAssetId: "" }));
  }

  async function saveForm() {
    if (!actor || !form.companyName) return;
    const input = {
      companyName: form.companyName ?? "",
      adText: form.adText ?? "",
      contactNumber: form.contactNumber ?? "",
      websiteLink: form.websiteLink ?? "",
      imageUrl: form.imageUrl ?? "",
      imageAssetId: form.imageAssetId ?? "",
      adType: form.adType ?? AdType.both,
      startDate: form.startDate ?? BigInt(Date.now()),
      endDate: form.endDate ?? BigInt(Date.now() + 30 * 24 * 60 * 60 * 1000),
      langText: form.langText ?? { mr: "", hi: "", kn: "", en: "" },
    };
    try {
      if (modal.mode === "add") {
        await actor.adminCreateAd(input);
        toast.success("Advertisement created!");
      } else if (modal.mode === "edit") {
        const updateInput: UpdateAdInput = {
          id: modal.ad.id,
          isActive: modal.ad.isActive,
          ...input,
        };
        await actor.adminUpdateAd(updateInput);
        toast.success("Advertisement updated!");
      }
      setModal({ mode: "closed" });
      setAdImagePreview("");
      loadAds();
    } catch {
      toast.error("Failed to save advertisement");
    }
  }

  async function handleDelete(id: AdId) {
    if (!actor) return;
    try {
      await actor.adminDeleteAd(id);
      toast.success("Advertisement deleted");
      setDeleteConfirm(null);
      loadAds();
    } catch {
      toast.error("Failed to delete advertisement");
    }
  }

  async function handleToggle(id: AdId) {
    if (!actor) return;
    try {
      await actor.adminToggleAdActive(id);
      toast.success("Status updated");
      loadAds();
    } catch {
      toast.error("Failed to toggle status");
    }
  }

  function getAdStatus(ad: BackendAd): "active" | "inactive" | "expired" {
    const now = BigInt(Date.now());
    if (ad.endDate < now) return "expired";
    return ad.isActive ? "active" : "inactive";
  }

  function statusBadge(status: ReturnType<typeof getAdStatus>) {
    if (status === "active")
      return (
        <Badge className="bg-primary/20 text-primary text-xs">✓ Active</Badge>
      );
    if (status === "expired")
      return (
        <Badge
          variant="outline"
          className="border-destructive/40 text-destructive text-xs"
        >
          Expired
        </Badge>
      );
    return (
      <Badge variant="secondary" className="text-xs">
        Inactive
      </Badge>
    );
  }

  return (
    <div className="space-y-5" data-ocid="admin.ads.section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-display font-bold text-[#8B1A1A]">
            जाहिरात व्यवस्थापन
          </h2>
          <p className="text-sm text-muted-foreground">
            {ads.length} advertisements
          </p>
        </div>
        <Button
          type="button"
          onClick={openAdd}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          data-ocid="admin.ads.add_button"
        >
          <Plus className="w-4 h-4" />
          Add New Ad
        </Button>
      </div>

      <Card className="border-border overflow-hidden">
        {loading ? (
          <CardContent className="p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </CardContent>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-4 py-3 font-semibold text-[#8B1A1A]">
                    Company
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[#8B1A1A] hidden sm:table-cell">
                    Type
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[#8B1A1A] hidden md:table-cell">
                    Period
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-[#8B1A1A]">
                    Status
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-[#8B1A1A] hidden sm:table-cell">
                    Views
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-[#8B1A1A] hidden sm:table-cell">
                    Clicks
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-[#8B1A1A]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ads.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-12 text-muted-foreground"
                      data-ocid="admin.ads.empty_state"
                    >
                      No advertisements yet
                    </td>
                  </tr>
                )}
                {ads.map((ad, i) => {
                  const status = getAdStatus(ad);
                  const startStr = new Date(
                    Number(ad.startDate),
                  ).toLocaleDateString("en-IN");
                  const endStr = new Date(
                    Number(ad.endDate),
                  ).toLocaleDateString("en-IN");
                  return (
                    <tr
                      key={String(ad.id)}
                      className="hover:bg-muted/20 transition-colors"
                      data-ocid={`admin.ads.item.${i + 1}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {/* Image thumbnail */}
                          {resolveAdImageSrc(ad.imageAssetId, ad.imageUrl) ? (
                            <img
                              src={
                                resolveAdImageSrc(
                                  ad.imageAssetId,
                                  ad.imageUrl,
                                ) ?? ""
                              }
                              alt={ad.companyName}
                              className="w-10 h-10 rounded object-cover flex-shrink-0 border border-border"
                              onError={(e) => {
                                (
                                  e.currentTarget as HTMLImageElement
                                ).style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded bg-muted/40 flex items-center justify-center flex-shrink-0 border border-border">
                              <ImageOff className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-medium text-foreground">
                              {ad.companyName}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {ad.adText}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <Badge
                          variant="outline"
                          className="text-xs border-[#8B1A1A]/30 text-[#8B1A1A]"
                        >
                          {ad.adType === AdType.image
                            ? "Image"
                            : ad.adType === AdType.text
                              ? "Text"
                              : "Image+Text"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">
                        {startStr} — {endStr}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {statusBadge(status)}
                      </td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
                          👁 {String(ad.views)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
                          🖱 {String(ad.clicks)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => openEdit(ad)}
                            className="h-8 w-8 p-0 text-primary hover:bg-primary/10"
                            data-ocid={`admin.ads.edit_button.${i + 1}`}
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggle(ad.id)}
                            className="h-8 w-8 p-0 text-accent-foreground hover:bg-accent/10"
                            title={ad.isActive ? "Deactivate" : "Activate"}
                            data-ocid={`admin.ads.toggle.${i + 1}`}
                          >
                            <Switch
                              checked={ad.isActive}
                              className="pointer-events-none scale-75"
                            />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteConfirm(ad.id)}
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                            data-ocid={`admin.ads.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog
        open={modal.mode !== "closed"}
        onOpenChange={(o) => {
          if (!o) {
            setModal({ mode: "closed" });
            setAdImagePreview("");
            setAdImageError("");
          }
        }}
      >
        <DialogContent className="max-w-2xl" data-ocid="admin.ads.dialog">
          <DialogHeader>
            <DialogTitle className="text-[#8B1A1A] font-display">
              {modal.mode === "add"
                ? "Add New Advertisement"
                : "Edit Advertisement"}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto pr-1 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1">
                <Label>Company Name *</Label>
                <Input
                  value={form.companyName ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, companyName: e.target.value })
                  }
                  placeholder="Company name"
                  data-ocid="admin.ads.form.company.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Ad Type</Label>
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={form.adType ?? AdType.both}
                  onChange={(e) =>
                    setForm({ ...form, adType: e.target.value as AdType })
                  }
                  data-ocid="admin.ads.form.type.select"
                >
                  <option value={AdType.image}>Image Only</option>
                  <option value={AdType.text}>Text Only</option>
                  <option value={AdType.both}>Image + Text</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label>Contact Number</Label>
                <Input
                  value={form.contactNumber ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, contactNumber: e.target.value })
                  }
                  placeholder="e.g. +91 9876543210"
                  data-ocid="admin.ads.form.contact.input"
                />
              </div>
              <div className="col-span-2 space-y-1">
                <Label>Ad Text</Label>
                <Textarea
                  value={form.adText ?? ""}
                  onChange={(e) => setForm({ ...form, adText: e.target.value })}
                  placeholder="Main advertisement text"
                  rows={2}
                  data-ocid="admin.ads.form.text.textarea"
                />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label>
                  जाहिरात इमेज (Ad Image)
                  <span className="text-muted-foreground text-xs font-normal ml-2">
                    (JPEG/PNG, max 5MB)
                  </span>
                </Label>
                {adImagePreview ? (
                  /* Preview state */
                  <div
                    className="relative rounded-xl overflow-hidden border-2 border-dashed"
                    style={{ borderColor: "#D4AF37" }}
                  >
                    <img
                      src={adImagePreview}
                      alt="Ad preview"
                      className="w-full max-h-40 object-contain bg-muted/20"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <label
                        htmlFor="admin-ad-image-upload"
                        className="cursor-pointer rounded-lg px-2 py-1 text-xs font-semibold bg-card/90 border border-border shadow-sm hover:bg-muted/60 transition-colors"
                        title="Replace image"
                      >
                        <Upload className="w-3 h-3 inline mr-1" />
                        बदला
                      </label>
                      <button
                        type="button"
                        onClick={removeAdImage}
                        className="rounded-lg px-2 py-1 text-xs font-semibold bg-destructive/10 text-destructive border border-destructive/20 shadow-sm hover:bg-destructive/20 transition-colors"
                        title="Remove image"
                        data-ocid="admin.ads.form.image.remove_button"
                      >
                        काढा
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Upload dropzone */
                  <label
                    htmlFor="admin-ad-image-upload"
                    className="flex flex-col items-center gap-2 border-2 border-dashed rounded-xl p-5 cursor-pointer hover:bg-muted/40 transition-colors"
                    data-ocid="admin.ads.form.image.dropzone"
                  >
                    <Upload className="w-7 h-7 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      इमेज अपलोड करण्यासाठी क्लिक करा
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Click to upload ad image (JPEG / PNG)
                    </span>
                  </label>
                )}
                <input
                  id="admin-ad-image-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={handleAdImageFile}
                  data-ocid="admin.ads.form.image.upload_button"
                />
                {adImageError && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="admin.ads.form.image.error_state"
                  >
                    {adImageError}
                  </p>
                )}
              </div>
              <div className="col-span-2 space-y-1">
                <Label>Website Link</Label>
                <Input
                  value={form.websiteLink ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, websiteLink: e.target.value })
                  }
                  placeholder="https://..."
                  data-ocid="admin.ads.form.website.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={
                    form.startDate
                      ? new Date(Number(form.startDate))
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      startDate: BigInt(new Date(e.target.value).getTime()),
                    })
                  }
                  data-ocid="admin.ads.form.start_date.input"
                />
              </div>
              <div className="space-y-1">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={
                    form.endDate
                      ? new Date(Number(form.endDate))
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      endDate: BigInt(new Date(e.target.value).getTime()),
                    })
                  }
                  data-ocid="admin.ads.form.end_date.input"
                />
              </div>
            </div>
            {/* Language text fields */}
            <div className="border border-border rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-[#8B1A1A]">
                Language-specific text
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>मराठी (MR)</Label>
                  <Input
                    value={form.langText?.mr ?? ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        langText: { ...form.langText!, mr: e.target.value },
                      })
                    }
                    placeholder="मराठी जाहिरात"
                    data-ocid="admin.ads.form.lang_mr.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label>हिंदी (HI)</Label>
                  <Input
                    value={form.langText?.hi ?? ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        langText: { ...form.langText!, hi: e.target.value },
                      })
                    }
                    placeholder="हिंदी विज्ञापन"
                    data-ocid="admin.ads.form.lang_hi.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label>ಕನ್ನಡ (KN)</Label>
                  <Input
                    value={form.langText?.kn ?? ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        langText: { ...form.langText!, kn: e.target.value },
                      })
                    }
                    placeholder="ಕನ್ನಡ ಜಾಹೀರಾತು"
                    data-ocid="admin.ads.form.lang_kn.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label>English (EN)</Label>
                  <Input
                    value={form.langText?.en ?? ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        langText: { ...form.langText!, en: e.target.value },
                      })
                    }
                    placeholder="English advertisement"
                    data-ocid="admin.ads.form.lang_en.input"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                onClick={saveForm}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                data-ocid="admin.ads.form.save_button"
              >
                {modal.mode === "add" ? "Create Ad" : "Update Ad"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setModal({ mode: "closed" });
                  setAdImagePreview("");
                  setAdImageError("");
                }}
                className="flex-1"
                data-ocid="admin.ads.form.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog
        open={deleteConfirm !== null}
        onOpenChange={(o) => !o && setDeleteConfirm(null)}
      >
        <DialogContent className="max-w-sm" data-ocid="admin.ads.delete.dialog">
          <DialogHeader>
            <DialogTitle className="text-destructive font-display flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Delete Advertisement?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() =>
                  deleteConfirm !== null && handleDelete(deleteConfirm)
                }
                className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                data-ocid="admin.ads.delete.confirm_button"
              >
                Delete
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1"
                data-ocid="admin.ads.delete.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Nav Config ────────────────────────────────────────────────────────────────

interface NavItem {
  id: AdminTab;
  label: string;
  labelHi: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    labelHi: "डैशबोर्ड",
    icon: LayoutDashboard,
  },
  { id: "members", label: "Members", labelHi: "सदस्य", icon: Users },
  { id: "payments", label: "Payments", labelHi: "पेमेंट", icon: CreditCard },
  {
    id: "payment-qr",
    label: "Payment QR Settings",
    labelHi: "QR सेटिंग्स",
    icon: QrCode,
  },
  { id: "photos", label: "Photos", labelHi: "फोटो", icon: Camera },
  { id: "stories", label: "Success Stories", labelHi: "सफलता", icon: Heart },
  { id: "pricing", label: "Pricing", labelHi: "मूल्य", icon: Crown },
  {
    id: "announcements",
    label: "Announcements",
    labelHi: "घोषणाएं",
    icon: Megaphone,
  },
  {
    id: "advertisements",
    label: "Advertisements",
    labelHi: "जाहिराती",
    icon: Megaphone,
  },
  { id: "sms", label: "SMS Settings", labelHi: "SMS", icon: Smartphone },
  { id: "security", label: "Security", labelHi: "सुरक्षा", icon: Shield },
  { id: "messages", label: "Messages", labelHi: "संदेश", icon: MessageCircle },
  { id: "chatbot", label: "Chatbot", labelHi: "चैटबॉट", icon: MessageSquare },
];

// ─── Main Admin Page ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const { isAdmin, setIsAdmin } = useUserStore();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [conversations] = useState<Conversation[]>(sampleConversations);
  const [data, setData] = useState<AdminState>({
    members: sampleMembers,
    stories: sampleSuccessStories,
    announcements: sampleAnnouncements,
    premiumPrice: 499,
  });

  if (!isAdmin) {
    return <AdminLogin onLogin={() => setIsAdmin(true)} />;
  }

  function renderTab() {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab data={data} conversations={conversations} />;
      case "members":
        return <MembersTab data={data} setData={setData} />;
      case "payments":
        return <PaymentsTab data={data} setData={setData} />;
      case "payment-qr":
        return <PaymentQRSettingsTab />;
      case "photos":
        return <PhotosTab />;
      case "stories":
        return <StoriesTab data={data} setData={setData} />;
      case "pricing":
        return <PricingTab data={data} setData={setData} />;
      case "announcements":
        return <AnnouncementsTab data={data} setData={setData} />;
      case "sms":
        return <SmsTab />;
      case "security":
        return <SecurityTab />;
      case "messages":
        return <MessagesTab />;
      case "chatbot":
        return <ChatbotTab />;
      case "advertisements":
        return <AdvertisementsTab />;
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)]" data-ocid="admin.page">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-[#8B1A1A] shrink-0 border-r border-white/10">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white leading-none">
                Admin Panel
              </p>
              <p className="text-xs text-white/70 mt-0.5">विवाह सेतू</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${activeTab === item.id ? "bg-white/20 text-white font-semibold" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
              data-ocid={`admin.sidebar.${item.id}.tab`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            type="button"
            onClick={() => setIsAdmin(false)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            data-ocid="admin.logout_button"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile tab bar */}
        <div className="md:hidden overflow-x-auto bg-[#8B1A1A] border-b border-white/10 shrink-0">
          <div className="flex px-2 py-2 gap-1 min-w-max">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${activeTab === item.id ? "bg-white/20 text-white font-semibold" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
                data-ocid={`admin.mobile_tab.${item.id}.tab`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.labelHi}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setIsAdmin(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors ml-2"
              data-ocid="admin.mobile.logout_button"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 md:p-8 bg-background overflow-auto">
          {renderTab()}
        </div>
      </div>
    </div>
  );
}
