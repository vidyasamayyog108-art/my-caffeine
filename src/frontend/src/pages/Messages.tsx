import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  Crown,
  MessageCircle,
  RefreshCw,
  Send,
  User,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ConversationSummary, Message } from "../backend";
import { createActor } from "../backend";
import { useUserStore } from "../store";
import { translations } from "../types";

const DAILY_LIMIT = 10;

const msgTranslations = {
  marathi: {
    title: "संदेश",
    conversations: "संभाषणे",
    selectConversation: "एक संभाषण निवडा",
    viewMatches: "जुळवण्या पाहा",
    messagesLabel: "संदेश आज",
    noConversations: "अजून कोणतेही संभाषण नाही — आपल्या जुळवण्यांशी गप्पा सुरू करा!",
    typeMessage: "संदेश लिहा...",
    send: "पाठवा",
    refresh: "ताजे करा",
    limitWarning: "तुम्ही आजचे {count}/10 संदेश वापरले आहेत.",
    limitReached: "आजची संदेश मर्यादा संपली!",
    limitReachedAt: "तुमची आजची संदेश मर्यादा संपली. पुन्हा {time} नंतर संदेश पाठवा.",
    upgrade: "₹499 मध्ये अपग्रेड करा",
    loginRequired: "संदेश पाहण्यासाठी लॉगिन करा",
    back: "परत",
    you: "तुम्ही",
    free: "सदस्य",
    premium: "प्रीमियम",
    premiumOnly: "फक्त प्रीमियम सदस्यांसाठी",
  },
  kannada: {
    title: "ಸಂದೇಶಗಳು",
    conversations: "ಸಂಭಾಷಣೆಗಳು",
    selectConversation: "ಒಂದು ಸಂಭಾಷಣೆ ಆಯ್ಕೆ ಮಾಡಿ",
    viewMatches: "ಹೊಂದಾಣಿಕೆಗಳನ್ನು ನೋಡಿ",
    messagesLabel: "ಇಂದಿನ ಸಂದೇಶಗಳು",
    noConversations: "ಇನ್ನೂ ಯಾವುದೇ ಸಂಭಾಷಣೆಗಳಿಲ್ಲ — ನಿಮ್ಮ ಹೊಂದಾಣಿಕೆಗಳೊಂದಿಗೆ ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ!",
    typeMessage: "ಸಂದೇಶ ಟೈಪ್ ಮಾಡಿ...",
    send: "ಕಳುಹಿಸಿ",
    refresh: "ರಿಫ್ರೆಶ್",
    limitWarning: "ನೀವು ಇಂದಿನ {count}/10 ಸಂದೇಶಗಳನ್ನು ಬಳಸಿದ್ದೀರಿ.",
    limitReached: "ಇಂದಿನ ಸಂದೇಶ ಮಿತಿ ತಲುಪಿದೆ!",
    limitReachedAt: "ನಿಮ್ಮ ಇಂದಿನ ಸಂದೇಶ ಮಿತಿ ಮುಗಿದಿದೆ. {time} ನಂತರ ಮತ್ತೆ ಕಳುಹಿಸಿ.",
    upgrade: "₹499 ಗೆ ಅಪ್‌ಗ್ರೇಡ್ ಮಾಡಿ",
    loginRequired: "ಸಂದೇಶಗಳನ್ನು ನೋಡಲು ಲಾಗಿನ್ ಮಾಡಿ",
    back: "ಹಿಂದೆ",
    you: "ನೀವು",
    free: "ಸದಸ್ಯ",
    premium: "ಪ್ರೀಮಿಯಂ",
    premiumOnly: "ಪ್ರೀಮಿಯಂ ಸದಸ್ಯರಿಗೆ ಮಾತ್ರ",
  },
  hindi: {
    title: "संदेश",
    conversations: "बातचीत",
    selectConversation: "एक बातचीत चुनें",
    viewMatches: "मैच देखें",
    messagesLabel: "आज के संदेश",
    noConversations: "अभी कोई बातचीत नहीं — अपने मैचों से बात शुरू करें!",
    typeMessage: "संदेश लिखें...",
    send: "भेजें",
    refresh: "रीफ्रेश",
    limitWarning: "आपने आज के {count}/10 संदेश उपयोग किए हैं।",
    limitReached: "आज की संदेश सीमा समाप्त!",
    limitReachedAt: "आपकी आज की संदेश सीमा समाप्त हो गई। {time} के बाद फिर से भेजें।",
    upgrade: "₹499 में अपग्रेड करें",
    loginRequired: "संदेश देखने के लिए लॉगिन करें",
    back: "वापस",
    you: "आप",
    free: "सदस्य",
    premium: "प्रीमियम",
    premiumOnly: "केवल प्रीमियम सदस्यों के लिए",
  },
  english: {
    title: "Messages",
    conversations: "Conversations",
    selectConversation: "Select a conversation",
    viewMatches: "View Matches",
    messagesLabel: "messages today",
    noConversations: "No conversations yet — start chatting with your matches!",
    typeMessage: "Type a message...",
    send: "Send",
    refresh: "Refresh",
    limitWarning: "You have used {count} of your 10 messages today.",
    limitReached: "Daily message limit reached!",
    limitReachedAt:
      "Your daily message limit is reached. Send messages again after {time}.",
    upgrade: "Upgrade for ₹499",
    loginRequired: "Please log in to view messages",
    back: "Back",
    you: "You",
    free: "Member",
    premium: "Premium",
    premiumOnly: "Premium members only",
  },
};

function formatTime(ts: bigint): string {
  const date = new Date(Number(ts) / 1_000_000);
  const now = new Date();
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString([], { day: "2-digit", month: "short" });
}

function AvatarPlaceholder({
  name,
  size = "md",
}: { name: string; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "w-8 h-8 text-sm" : "w-10 h-10 text-base";
  return (
    <div
      className={`${sz} rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary shrink-0`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function MessagesPage() {
  const { isLoggedIn, currentLanguage, currentUser } = useUserStore();
  const t = msgTranslations[currentLanguage];
  const tNav = translations[currentLanguage];
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const navigate = useNavigate();

  // Parse ?with= param
  const search = useSearch({ strict: false }) as { with?: string };
  const withMemberId = search.with ? BigInt(search.with) : null;

  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<bigint | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [quotaResetTime, setQuotaResetTime] = useState<string | null>(null);
  const [dailyCount, setDailyCount] = useState(0);
  const [mobileShowThread, setMobileShowThread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isPremium = currentUser?.membershipTier === "Premium";

  const loadConversations = useCallback(async () => {
    if (!actor) return;
    try {
      const convs = await actor.getMyConversations();
      setConversations(convs);
    } catch {
      // silently fail
    }
  }, [actor]);

  const loadMessages = useCallback(
    async (otherId: bigint, showRefreshing = false) => {
      if (!actor) return;
      if (showRefreshing) setRefreshing(true);
      try {
        const msgs = await actor.getConversation(
          otherId,
          BigInt(0),
          BigInt(50),
        );
        setMessages(msgs);
        await actor.markAsRead(otherId);
        setConversations((prev) =>
          prev.map((c) =>
            c.otherMemberId === otherId ? { ...c, unreadCount: BigInt(0) } : c,
          ),
        );
      } catch {
        // silently fail
      } finally {
        setRefreshing(false);
      }
    },
    [actor],
  );

  // Initial load + fetch daily quota
  useEffect(() => {
    if (!actor || actorLoading || !isLoggedIn) return;
    setLoading(true);
    Promise.all([
      loadConversations(),
      actor
        .getDailyMessageCount()
        .then((count) => {
          setDailyCount(Number(count));
        })
        .catch(() => {
          /* use 0 default */
        }),
    ]).finally(() => setLoading(false));
  }, [actor, actorLoading, isLoggedIn, loadConversations]);

  // Open conversation from URL param
  useEffect(() => {
    if (withMemberId !== null) {
      setSelectedConvId(withMemberId);
      setMobileShowThread(true);
    }
  }, [withMemberId]);

  // Load messages when selection changes
  useEffect(() => {
    if (selectedConvId !== null && actor) {
      loadMessages(selectedConvId);
    }
  }, [selectedConvId, actor, loadMessages]);

  // Auto-scroll to bottom — runs after every render when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  // Polling every 3 seconds when chat is active
  useEffect(() => {
    if (selectedConvId !== null && actor) {
      pollRef.current = setInterval(() => {
        loadMessages(selectedConvId);
      }, 3000);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [selectedConvId, actor, loadMessages]);

  async function handleSend() {
    if (!inputText.trim() || !actor || selectedConvId === null) return;
    if (!isPremium && dailyCount >= DAILY_LIMIT) {
      setSendError("limit");
      return;
    }
    setSending(true);
    setSendError("");
    setQuotaResetTime(null);
    try {
      const result = await actor.sendMessage(selectedConvId, inputText.trim());
      if (result.__kind__ === "ok") {
        setInputText("");
        setDailyCount((c) => c + 1);
        await loadMessages(selectedConvId);
        await loadConversations();
      } else {
        const errMsg = result.err as string;
        // Parse QuotaExceeded error — may contain "resetAt:<timestamp>" or "try again at HH:MM"
        if (
          errMsg.toLowerCase().includes("quota") ||
          errMsg.toLowerCase().includes("limit")
        ) {
          setSendError("limit");
          // Try to extract a time from the error message
          const timeMatch = errMsg.match(/(\d{1,2}:\d{2})/);
          const tsMatch = errMsg.match(/resetAt:(\d+)/);
          if (tsMatch) {
            const resetDate = new Date(Number(tsMatch[1]));
            setQuotaResetTime(
              resetDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            );
          } else if (timeMatch) {
            setQuotaResetTime(timeMatch[1]);
          } else {
            // Default to next midnight
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            setQuotaResetTime(
              tomorrow.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            );
          }
        } else {
          setSendError(errMsg);
        }
      }
    } catch {
      setSendError("error");
    } finally {
      setSending(false);
    }
  }

  function selectConversation(id: bigint) {
    setSelectedConvId(id);
    setMobileShowThread(true);
    setSendError("");
  }

  function handleBack() {
    setMobileShowThread(false);
    setSelectedConvId(null);
  }

  const selectedConv = conversations.find(
    (c) => c.otherMemberId === selectedConvId,
  );
  const myId = currentUser?.id ? BigInt(currentUser.id) : BigInt(0);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <MessageCircle className="w-14 h-14 text-primary mx-auto" />
          <h2 className="font-display text-xl font-bold text-foreground">
            {t.loginRequired}
          </h2>
          <Button
            className="bg-primary text-primary-foreground"
            onClick={() => navigate({ to: "/login" })}
          >
            {tNav.login}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="messages.page">
      {/* Header */}
      <div className="gradient-warm py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <MessageCircle className="w-7 h-7 text-primary-foreground" />
          <h1 className="font-display text-2xl font-bold text-primary-foreground">
            {t.title}
          </h1>
          {!isPremium && (
            <span className="ml-auto text-xs bg-primary-foreground/10 text-primary-foreground rounded-full px-3 py-1 border border-primary-foreground/20 font-body">
              {dailyCount < DAILY_LIMIT
                ? `${dailyCount}/${DAILY_LIMIT} ${t.messagesLabel}`
                : t.limitReached}
            </span>
          )}
          {isPremium && (
            <span className="ml-auto flex items-center gap-1 text-xs bg-accent/20 text-primary-foreground rounded-full px-3 py-1 border border-accent/30 font-body">
              <Crown className="w-3 h-3" />
              {t.premium}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-0 h-[calc(100vh-200px)] min-h-[500px] rounded-xl border border-border overflow-hidden shadow-premium bg-card">
          {/* Sidebar — conversation list */}
          <aside
            className={`w-full md:w-80 flex-shrink-0 border-r border-border bg-card flex flex-col ${mobileShowThread ? "hidden md:flex" : "flex"}`}
            data-ocid="messages.conversation_list"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="font-display font-semibold text-foreground text-sm">
                {t.conversations}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={async () => {
                  setRefreshing(true);
                  await loadConversations();
                  setRefreshing(false);
                }}
                disabled={refreshing}
                data-ocid="messages.refresh_button"
                aria-label={t.refresh}
                className="text-muted-foreground hover:text-primary"
              >
                <RefreshCw
                  className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div
                  className="p-4 space-y-3"
                  data-ocid="messages.loading_state"
                >
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-2">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : conversations.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center h-full p-8 text-center gap-4"
                  data-ocid="messages.empty_state"
                >
                  <MessageCircle className="w-12 h-12 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {t.noConversations}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate({ to: "/matches" })}
                  >
                    {t.viewMatches}
                  </Button>
                </div>
              ) : (
                <ul>
                  {conversations.map((conv, idx) => {
                    const isActive = conv.otherMemberId === selectedConvId;
                    return (
                      <li key={conv.otherMemberId.toString()}>
                        <button
                          type="button"
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-smooth hover:bg-muted/50 ${isActive ? "bg-primary/10 border-r-2 border-primary" : ""}`}
                          onClick={() => selectConversation(conv.otherMemberId)}
                          data-ocid={`messages.conversation.item.${idx + 1}`}
                        >
                          <AvatarPlaceholder name={conv.otherMemberName} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-display font-semibold text-sm text-foreground truncate">
                                {conv.otherMemberName}
                              </span>
                              <span className="text-[10px] text-muted-foreground shrink-0">
                                {formatTime(conv.lastMessageAt)}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {conv.lastMessage}
                            </p>
                          </div>
                          {conv.unreadCount > BigInt(0) && (
                            <Badge className="bg-primary text-primary-foreground rounded-full text-[10px] px-1.5 py-0 shrink-0">
                              {conv.unreadCount.toString()}
                            </Badge>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </aside>

          {/* Chat thread */}
          <div
            className={`flex-1 flex flex-col bg-background ${!mobileShowThread ? "hidden md:flex" : "flex"}`}
            data-ocid="messages.chat_panel"
          >
            {selectedConvId === null ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8">
                <MessageCircle className="w-16 h-16 text-muted-foreground/30" />
                <p className="text-muted-foreground font-body text-sm">
                  {t.selectConversation}
                </p>
              </div>
            ) : (
              <>
                {/* Thread header */}
                <div className="px-4 py-3 border-b border-border bg-card flex items-center gap-3 shadow-subtle">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="md:hidden text-muted-foreground hover:text-foreground p-1"
                    onClick={handleBack}
                    data-ocid="messages.back_button"
                    aria-label={t.back}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  {selectedConv ? (
                    <AvatarPlaceholder name={selectedConv.otherMemberName} />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">
                      {selectedConv?.otherMemberName ?? "..."}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (selectedConvId) loadMessages(selectedConvId, true);
                      }}
                      disabled={refreshing}
                      data-ocid="messages.thread_refresh_button"
                      aria-label={t.refresh}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <RefreshCw
                        className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                      />
                    </Button>
                  </div>
                </div>

                {/* Free tier warning */}
                {!isPremium &&
                  dailyCount >= DAILY_LIMIT - 3 &&
                  dailyCount < DAILY_LIMIT && (
                    <div
                      className="px-4 py-2 bg-accent/20 border-b border-accent/30 text-xs text-accent-foreground font-body flex items-center justify-between gap-2"
                      data-ocid="messages.limit_warning"
                    >
                      <span>
                        {t.limitWarning.replace("{count}", String(dailyCount))}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-6 px-2 border-accent text-accent-foreground"
                        onClick={() => navigate({ to: "/plans" })}
                      >
                        {t.upgrade}
                      </Button>
                    </div>
                  )}

                {/* Messages */}
                <div
                  className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
                  data-ocid="messages.thread"
                >
                  {refreshing && messages.length === 0 && (
                    <div
                      className="flex justify-center"
                      data-ocid="messages.loading_state"
                    >
                      <RefreshCw className="w-5 h-5 animate-spin text-primary" />
                    </div>
                  )}
                  {messages.map((msg, idx) => {
                    const isOwn = msg.senderId === myId;
                    return (
                      <div
                        key={msg.id.toString()}
                        className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                        data-ocid={`messages.message.item.${idx + 1}`}
                      >
                        {!isOwn && (
                          <AvatarPlaceholder
                            name={selectedConv?.otherMemberName ?? "?"}
                            size="sm"
                          />
                        )}
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${isOwn ? "bg-primary text-primary-foreground rounded-tr-sm ml-2" : "bg-muted text-foreground rounded-tl-sm ml-2"}`}
                        >
                          <p className="text-sm font-body leading-relaxed break-words">
                            {msg.content}
                          </p>
                          <p
                            className={`text-[10px] mt-1 ${isOwn ? "text-primary-foreground/60 text-right" : "text-muted-foreground"}`}
                          >
                            {formatTime(msg.createdAt)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Limit reached banner */}
                {!isPremium && sendError === "limit" && (
                  <div
                    className="mx-4 mb-2 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-xs text-destructive font-body"
                    data-ocid="messages.error_state"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-semibold">{t.limitReached}</span>
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground text-xs h-7 shrink-0"
                        onClick={() => navigate({ to: "/plans" })}
                      >
                        {t.upgrade}
                      </Button>
                    </div>
                    {quotaResetTime && (
                      <p className="text-destructive/80">
                        {t.limitReachedAt.replace("{time}", quotaResetTime)}
                      </p>
                    )}
                    <p className="text-destructive/70 mt-1">{t.premiumOnly}</p>
                  </div>
                )}
                {sendError && sendError !== "limit" && (
                  <div
                    className="mx-4 mb-2 text-xs text-destructive font-body"
                    data-ocid="messages.error_state"
                  >
                    {sendError}
                  </div>
                )}

                {/* Input area */}
                <div className="px-4 py-3 border-t border-border bg-card">
                  <div className="flex items-center gap-2">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={t.typeMessage}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      disabled={
                        sending || (!isPremium && dailyCount >= DAILY_LIMIT)
                      }
                      className="flex-1 bg-background border-input font-body text-sm"
                      data-ocid="messages.message_input"
                      aria-label={t.typeMessage}
                    />
                    <Button
                      onClick={handleSend}
                      disabled={
                        sending ||
                        !inputText.trim() ||
                        (!isPremium && dailyCount >= DAILY_LIMIT)
                      }
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
                      size="sm"
                      data-ocid="messages.send_button"
                      aria-label={t.send}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  {!isPremium && (
                    <p className="text-[10px] text-muted-foreground font-body mt-1.5 text-center">
                      {dailyCount}/{DAILY_LIMIT} {t.messagesLabel}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
