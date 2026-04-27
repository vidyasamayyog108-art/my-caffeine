import { f as useUserStore, g as useActor, e as useNavigate, u as useSearch, r as reactExports, j as jsxRuntimeExports, M as MessageCircle, b as Button, t as translations, C as Crown, S as Skeleton, B as Badge, p as Send, h as createActor } from "./index-CkCNqozh.js";
import { I as Input } from "./input-GQzGS8vR.js";
import { R as RefreshCw } from "./refresh-cw-DFH4x-Cn.js";
import { A as ArrowLeft } from "./arrow-left-nBkPSAgJ.js";
import { U as User } from "./user-B_vlDFlY.js";
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
    premiumOnly: "फक्त प्रीमियम सदस्यांसाठी"
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
    premiumOnly: "ಪ್ರೀಮಿಯಂ ಸದಸ್ಯರಿಗೆ ಮಾತ್ರ"
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
    premiumOnly: "केवल प्रीमियम सदस्यों के लिए"
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
    limitReachedAt: "Your daily message limit is reached. Send messages again after {time}.",
    upgrade: "Upgrade for ₹499",
    loginRequired: "Please log in to view messages",
    back: "Back",
    you: "You",
    free: "Member",
    premium: "Premium",
    premiumOnly: "Premium members only"
  }
};
function formatTime(ts) {
  const date = new Date(Number(ts) / 1e6);
  const now = /* @__PURE__ */ new Date();
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString([], { day: "2-digit", month: "short" });
}
function AvatarPlaceholder({
  name,
  size = "md"
}) {
  const sz = size === "sm" ? "w-8 h-8 text-sm" : "w-10 h-10 text-base";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `${sz} rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary shrink-0`,
      children: name.charAt(0).toUpperCase()
    }
  );
}
function MessagesPage() {
  const { isLoggedIn, currentLanguage, currentUser } = useUserStore();
  const t = msgTranslations[currentLanguage];
  const tNav = translations[currentLanguage];
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const withMemberId = search.with ? BigInt(search.with) : null;
  const [conversations, setConversations] = reactExports.useState([]);
  const [selectedConvId, setSelectedConvId] = reactExports.useState(null);
  const [messages, setMessages] = reactExports.useState([]);
  const [inputText, setInputText] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const [sending, setSending] = reactExports.useState(false);
  const [sendError, setSendError] = reactExports.useState("");
  const [quotaResetTime, setQuotaResetTime] = reactExports.useState(null);
  const [dailyCount, setDailyCount] = reactExports.useState(0);
  const [mobileShowThread, setMobileShowThread] = reactExports.useState(false);
  const messagesEndRef = reactExports.useRef(null);
  const pollRef = reactExports.useRef(null);
  const isPremium = (currentUser == null ? void 0 : currentUser.membershipTier) === "Premium";
  const loadConversations = reactExports.useCallback(async () => {
    if (!actor) return;
    try {
      const convs = await actor.getMyConversations();
      setConversations(convs);
    } catch {
    }
  }, [actor]);
  const loadMessages = reactExports.useCallback(
    async (otherId, showRefreshing = false) => {
      if (!actor) return;
      if (showRefreshing) setRefreshing(true);
      try {
        const msgs = await actor.getConversation(
          otherId,
          BigInt(0),
          BigInt(50)
        );
        setMessages(msgs);
        await actor.markAsRead(otherId);
        setConversations(
          (prev) => prev.map(
            (c) => c.otherMemberId === otherId ? { ...c, unreadCount: BigInt(0) } : c
          )
        );
      } catch {
      } finally {
        setRefreshing(false);
      }
    },
    [actor]
  );
  reactExports.useEffect(() => {
    if (!actor || actorLoading || !isLoggedIn) return;
    setLoading(true);
    Promise.all([
      loadConversations(),
      actor.getDailyMessageCount().then((count) => {
        setDailyCount(Number(count));
      }).catch(() => {
      })
    ]).finally(() => setLoading(false));
  }, [actor, actorLoading, isLoggedIn, loadConversations]);
  reactExports.useEffect(() => {
    if (withMemberId !== null) {
      setSelectedConvId(withMemberId);
      setMobileShowThread(true);
    }
  }, [withMemberId]);
  reactExports.useEffect(() => {
    if (selectedConvId !== null && actor) {
      loadMessages(selectedConvId);
    }
  }, [selectedConvId, actor, loadMessages]);
  reactExports.useEffect(() => {
    var _a;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  });
  reactExports.useEffect(() => {
    if (selectedConvId !== null && actor) {
      pollRef.current = setInterval(() => {
        loadMessages(selectedConvId);
      }, 3e3);
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
        const errMsg = result.err;
        if (errMsg.toLowerCase().includes("quota") || errMsg.toLowerCase().includes("limit")) {
          setSendError("limit");
          const timeMatch = errMsg.match(/(\d{1,2}:\d{2})/);
          const tsMatch = errMsg.match(/resetAt:(\d+)/);
          if (tsMatch) {
            const resetDate = new Date(Number(tsMatch[1]));
            setQuotaResetTime(
              resetDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })
            );
          } else if (timeMatch) {
            setQuotaResetTime(timeMatch[1]);
          } else {
            const tomorrow = /* @__PURE__ */ new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            setQuotaResetTime(
              tomorrow.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })
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
  function selectConversation(id) {
    setSelectedConvId(id);
    setMobileShowThread(true);
    setSendError("");
  }
  function handleBack() {
    setMobileShowThread(false);
    setSelectedConvId(null);
  }
  const selectedConv = conversations.find(
    (c) => c.otherMemberId === selectedConvId
  );
  const myId = (currentUser == null ? void 0 : currentUser.id) ? BigInt(currentUser.id) : BigInt(0);
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4 p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-14 h-14 text-primary mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: t.loginRequired }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "bg-primary text-primary-foreground",
          onClick: () => navigate({ to: "/login" }),
          children: tNav.login
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "messages.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-warm py-6 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-7 h-7 text-primary-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-primary-foreground", children: t.title }),
      !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs bg-primary-foreground/10 text-primary-foreground rounded-full px-3 py-1 border border-primary-foreground/20 font-body", children: dailyCount < DAILY_LIMIT ? `${dailyCount}/${DAILY_LIMIT} ${t.messagesLabel}` : t.limitReached }),
      isPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto flex items-center gap-1 text-xs bg-accent/20 text-primary-foreground rounded-full px-3 py-1 border border-accent/30 font-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3 h-3" }),
        t.premium
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-0 h-[calc(100vh-200px)] min-h-[500px] rounded-xl border border-border overflow-hidden shadow-premium bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "aside",
        {
          className: `w-full md:w-80 flex-shrink-0 border-r border-border bg-card flex flex-col ${mobileShowThread ? "hidden md:flex" : "flex"}`,
          "data-ocid": "messages.conversation_list",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-border flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground text-sm", children: t.conversations }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: async () => {
                    setRefreshing(true);
                    await loadConversations();
                    setRefreshing(false);
                  },
                  disabled: refreshing,
                  "data-ocid": "messages.refresh_button",
                  "aria-label": t.refresh,
                  className: "text-muted-foreground hover:text-primary",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RefreshCw,
                    {
                      className: `w-4 h-4 ${refreshing ? "animate-spin" : ""}`
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "p-4 space-y-3",
                "data-ocid": "messages.loading_state",
                children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-40" })
                  ] })
                ] }, i))
              }
            ) : conversations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center h-full p-8 text-center gap-4",
                "data-ocid": "messages.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-12 h-12 text-muted-foreground/40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: t.noConversations }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      onClick: () => navigate({ to: "/matches" }),
                      children: t.viewMatches
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: conversations.map((conv, idx) => {
              const isActive = conv.otherMemberId === selectedConvId;
              return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: `w-full flex items-center gap-3 px-4 py-3 text-left transition-smooth hover:bg-muted/50 ${isActive ? "bg-primary/10 border-r-2 border-primary" : ""}`,
                  onClick: () => selectConversation(conv.otherMemberId),
                  "data-ocid": `messages.conversation.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarPlaceholder, { name: conv.otherMemberName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground truncate", children: conv.otherMemberName }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground shrink-0", children: formatTime(conv.lastMessageAt) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: conv.lastMessage })
                    ] }),
                    conv.unreadCount > BigInt(0) && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground rounded-full text-[10px] px-1.5 py-0 shrink-0", children: conv.unreadCount.toString() })
                  ]
                }
              ) }, conv.otherMemberId.toString());
            }) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `flex-1 flex flex-col bg-background ${!mobileShowThread ? "hidden md:flex" : "flex"}`,
          "data-ocid": "messages.chat_panel",
          children: selectedConvId === null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center gap-4 text-center p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-16 h-16 text-muted-foreground/30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm", children: t.selectConversation })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border bg-card flex items-center gap-3 shadow-subtle", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "md:hidden text-muted-foreground hover:text-foreground p-1",
                  onClick: handleBack,
                  "data-ocid": "messages.back_button",
                  "aria-label": t.back,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
                }
              ),
              selectedConv ? /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarPlaceholder, { name: selectedConv.otherMemberName }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: (selectedConv == null ? void 0 : selectedConv.otherMemberName) ?? "..." }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: () => {
                    if (selectedConvId) loadMessages(selectedConvId, true);
                  },
                  disabled: refreshing,
                  "data-ocid": "messages.thread_refresh_button",
                  "aria-label": t.refresh,
                  className: "text-muted-foreground hover:text-primary",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RefreshCw,
                    {
                      className: `w-4 h-4 ${refreshing ? "animate-spin" : ""}`
                    }
                  )
                }
              ) })
            ] }),
            !isPremium && dailyCount >= DAILY_LIMIT - 3 && dailyCount < DAILY_LIMIT && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-4 py-2 bg-accent/20 border-b border-accent/30 text-xs text-accent-foreground font-body flex items-center justify-between gap-2",
                "data-ocid": "messages.limit_warning",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.limitWarning.replace("{count}", String(dailyCount)) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "text-xs h-6 px-2 border-accent text-accent-foreground",
                      onClick: () => navigate({ to: "/plans" }),
                      children: t.upgrade
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex-1 overflow-y-auto px-4 py-4 space-y-3",
                "data-ocid": "messages.thread",
                children: [
                  refreshing && messages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex justify-center",
                      "data-ocid": "messages.loading_state",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-5 h-5 animate-spin text-primary" })
                    }
                  ),
                  messages.map((msg, idx) => {
                    const isOwn = msg.senderId === myId;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: `flex ${isOwn ? "justify-end" : "justify-start"}`,
                        "data-ocid": `messages.message.item.${idx + 1}`,
                        children: [
                          !isOwn && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            AvatarPlaceholder,
                            {
                              name: (selectedConv == null ? void 0 : selectedConv.otherMemberName) ?? "?",
                              size: "sm"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: `max-w-[70%] rounded-2xl px-4 py-2.5 ${isOwn ? "bg-primary text-primary-foreground rounded-tr-sm ml-2" : "bg-muted text-foreground rounded-tl-sm ml-2"}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body leading-relaxed break-words", children: msg.content }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "p",
                                  {
                                    className: `text-[10px] mt-1 ${isOwn ? "text-primary-foreground/60 text-right" : "text-muted-foreground"}`,
                                    children: formatTime(msg.createdAt)
                                  }
                                )
                              ]
                            }
                          )
                        ]
                      },
                      msg.id.toString()
                    );
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
                ]
              }
            ),
            !isPremium && sendError === "limit" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "mx-4 mb-2 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-xs text-destructive font-body",
                "data-ocid": "messages.error_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: t.limitReached }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        className: "bg-primary text-primary-foreground text-xs h-7 shrink-0",
                        onClick: () => navigate({ to: "/plans" }),
                        children: t.upgrade
                      }
                    )
                  ] }),
                  quotaResetTime && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive/80", children: t.limitReachedAt.replace("{time}", quotaResetTime) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive/70 mt-1", children: t.premiumOnly })
                ]
              }
            ),
            sendError && sendError !== "limit" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mx-4 mb-2 text-xs text-destructive font-body",
                "data-ocid": "messages.error_state",
                children: sendError
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t border-border bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: inputText,
                    onChange: (e) => setInputText(e.target.value),
                    placeholder: t.typeMessage,
                    onKeyDown: (e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    },
                    disabled: sending || !isPremium && dailyCount >= DAILY_LIMIT,
                    className: "flex-1 bg-background border-input font-body text-sm",
                    "data-ocid": "messages.message_input",
                    "aria-label": t.typeMessage
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: handleSend,
                    disabled: sending || !inputText.trim() || !isPremium && dailyCount >= DAILY_LIMIT,
                    className: "bg-primary hover:bg-primary/90 text-primary-foreground shrink-0",
                    size: "sm",
                    "data-ocid": "messages.send_button",
                    "aria-label": t.send,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
                  }
                )
              ] }),
              !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground font-body mt-1.5 text-center", children: [
                dailyCount,
                "/",
                DAILY_LIMIT,
                " ",
                t.messagesLabel
              ] })
            ] })
          ] })
        }
      )
    ] }) })
  ] });
}
export {
  MessagesPage as default
};
