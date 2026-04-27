import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import { MessageCircle, Minus, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import { useUserStore } from "../store";

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

// Rule-based FAQ responses
const FAQ_RESPONSES: Record<string, Record<string, string>> = {
  marathi: {
    registration:
      "नोंदणीसाठी: 'नोंदणी' बटण क्लिक करा → 6 स्टेप्स भरा → फोटो अपलोड करा → ₹499 प्रीमियम घ्या.",
    payment:
      "पेमेंट: UPI ID vivahsetu@ptaxis वर ₹499 पाठवा → स्क्रीनशॉट अपलोड करा → Admin 24 तासात approve करेल.",
    profile:
      "प्रोफाइल: लॉगिन करा → प्रोफाइल पेज वर जा → माहिती संपादित करा → फोटो अपलोड करा.",
    membership:
      "सदस्यता: ₹499 एक वेळ भरणा → असीमित प्रोफाइल → थेट संपर्क → प्रीमियम बॅज मिळेल.",
    contact: "संपर्क: प्रीमियम सदस्यांना थेट फोन नंबर दिसतो. UPI: vivahsetu@ptaxis",
    otp: "OTP: मोबाईल नंबर टाका → OTP येईल → 6 अंक प्रविष्ट करा → लॉगिन.",
    default:
      "नमस्कार! मी विवाह सेतू सहाय्यक आहे. नोंदणी, पेमेंट, प्रोफाइल किंवा सदस्यतेबद्दल विचारा.",
  },
  hindi: {
    registration:
      "पंजीकरण के लिए: 'नोंदणी' बटन क्लिक करें → 6 चरण भरें → फ़ोटो अपलोड करें → ₹499 प्रीमियम लें।",
    payment:
      "भुगतान: UPI ID vivahsetu@ptaxis पर ₹499 भेजें → स्क्रीनशॉट अपलोड करें → Admin 24 घंटे में approve करेगा।",
    profile:
      "प्रोफाइल: लॉगिन करें → प्रोफाइल पेज पर जाएं → जानकारी संपादित करें → फ़ोटो अपलोड करें।",
    membership:
      "सदस्यता: ₹499 एकमुश्त → असीमित प्रोफाइल → सीधे संपर्क → प्रीमियम बैज मिलेगा।",
    contact:
      "संपर्क: प्रीमियम सदस्यों को सीधे फ़ोन नंबर दिखता है। UPI: vivahsetu@ptaxis",
    otp: "OTP: मोबाइल नंबर डालें → OTP आएगा → 6 अंक दर्ज करें → लॉगिन।",
    default:
      "नमस्ते! मैं विवाह सेतु सहायक हूं। पंजीकरण, भुगतान, प्रोफाइल या सदस्यता के बारे में पूछें।",
  },
  kannada: {
    registration:
      "ನೋಂದಣಿಗಾಗಿ: 'ನೋಂದಣಿ' ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ → 6 ಹಂತಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ → ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ → ₹499 ಪ್ರೀಮಿಯಂ ಪಡೆಯಿರಿ.",
    payment:
      "ಪಾವತಿ: UPI ID vivahsetu@ptaxis ಗೆ ₹499 ಕಳುಹಿಸಿ → ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ → Admin 24 ಗಂಟೆಯಲ್ಲಿ approve ಮಾಡುತ್ತಾರೆ.",
    profile: "ಪ್ರೊಫೈಲ್: ಲಾಗಿನ್ ಆಗಿ → ಪ್ರೊಫೈಲ್ ಪೇಜ್‌ಗೆ ಹೋಗಿ → ಮಾಹಿತಿ ಸಂಪಾದಿಸಿ → ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    membership:
      "ಸದಸ್ಯತ್ವ: ₹499 ಒಂದು ಬಾರಿ → ಅಪರಿಮಿತ ಪ್ರೊಫೈಲ್‌ಗಳು → ನೇರ ಸಂಪರ್ಕ → ಪ್ರೀಮಿಯಂ ಬ್ಯಾಡ್ಜ್ ಸಿಗುತ್ತದೆ.",
    contact: "ಸಂಪರ್ಕ: ಪ್ರೀಮಿಯಂ ಸದಸ್ಯರಿಗೆ ನೇರ ಫೋನ್ ನಂಬರ್ ಕಾಣಿಸುತ್ತದೆ. UPI: vivahsetu@ptaxis",
    otp: "OTP: ಮೊಬೈಲ್ ನಂಬರ್ ನಮೂದಿಸಿ → OTP ಬರುತ್ತದೆ → 6 ಅಂಕಿಗಳನ್ನು ನಮೂದಿಸಿ → ಲಾಗಿನ್.",
    default:
      "ನಮಸ್ಕಾರ! ನಾನು ವಿವಾಹ ಸೇತು ಸಹಾಯಕ. ನೋಂದಣಿ, ಪಾವತಿ, ಪ್ರೊಫೈಲ್ ಅಥವಾ ಸದಸ್ಯತ್ವ ಬಗ್ಗೆ ಕೇಳಿ.",
  },
  english: {
    registration:
      "To register: Click 'Register' → Fill 6 steps → Upload photo → Get ₹499 Premium.",
    payment:
      "Payment: Send ₹499 to UPI ID vivahsetu@ptaxis → Upload screenshot → Admin will approve within 24 hours.",
    profile:
      "Profile: Login → Go to profile page → Edit information → Upload photo.",
    membership:
      "Membership: ₹499 one-time → Unlimited profiles → Direct contact → Premium badge.",
    contact:
      "Contact: Premium members can see direct phone numbers. UPI: vivahsetu@ptaxis",
    otp: "OTP: Enter mobile number → OTP will be sent → Enter 6 digits → Login.",
    default:
      "Namaste! I am Vivah Setu Assistant. Ask me about registration, payment, profile, or membership.",
  },
};

const KEYWORDS: Array<[string, string]> = [
  ["नोंदणी", "registration"],
  ["register", "registration"],
  ["registration", "registration"],
  ["पंजीकरण", "registration"],
  ["ನೋಂದಣಿ", "registration"],
  ["payment", "payment"],
  ["पेमेंट", "payment"],
  ["भुगतान", "payment"],
  ["ಪಾವತಿ", "payment"],
  ["upi", "payment"],
  ["₹499", "payment"],
  ["profile", "profile"],
  ["प्रोफाइल", "profile"],
  ["ಪ್ರೊಫೈಲ್", "profile"],
  ["membership", "membership"],
  ["सदस्यता", "membership"],
  ["ಸದಸ್ಯತ್ವ", "membership"],
  ["premium", "membership"],
  ["प्रीमियम", "membership"],
  ["contact", "contact"],
  ["संपर्क", "contact"],
  ["ಸಂಪರ್ಕ", "contact"],
  ["phone", "contact"],
  ["otp", "otp"],
  ["login", "otp"],
  ["लॉगिन", "otp"],
  ["ಲಾಗಿನ್", "otp"],
];

function getGreeting(lang: string): string {
  const greetings: Record<string, string> = {
    marathi:
      "नमस्कार! मी विवाह सेतू सहाय्यक आहे 🙏\nनोंदणी, पेमेंट, प्रोफाइल किंवा सदस्यतेबद्दल विचारा. मी मदत करण्यास तयार आहे!",
    hindi:
      "नमस्ते! मैं विवाह सेतु सहायक हूं 🙏\nपंजीकरण, भुगतान, प्रोफाइल या सदस्यता के बारे में पूछें।",
    kannada:
      "ನಮಸ್ಕಾರ! ನಾನು ವಿವಾಹ ಸೇತು ಸಹಾಯಕ 🙏\nನೋಂದಣಿ, ಪಾವತಿ, ಪ್ರೊಫೈಲ್ ಅಥವಾ ಸದಸ್ಯತ್ವ ಬಗ್ಗೆ ಕೇಳಿ.",
    english:
      "Namaste! I am Vivah Setu Assistant 🙏\nAsk me about registration, payment, profile, or membership. I'm here to help!",
  };
  return greetings[lang] ?? greetings.english;
}

function getBotReply(text: string, lang: string): string {
  const lower = text.toLowerCase();
  const responses = FAQ_RESPONSES[lang] ?? FAQ_RESPONSES.english;
  for (const [kw, topic] of KEYWORDS) {
    if (lower.includes(kw.toLowerCase()) && responses[topic]) {
      return responses[topic];
    }
  }
  return responses.default;
}

export function ChatbotWidget() {
  const { currentLanguage } = useUserStore();
  const { actor } = useActor(createActor);

  const labels = {
    marathi: {
      title: "विवाह सेतू सहाय्यक",
      placeholder: "संदेश लिहा...",
      send: "पाठवा",
    },
    hindi: { title: "विवाह सेतु सहायक", placeholder: "संदेश लिखें...", send: "भेजें" },
    kannada: {
      title: "ವಿವಾಹ ಸೇತು ಸಹಾಯಕ",
      placeholder: "ಸಂದೇಶ ಟೈಪ್ ಮಾಡಿ...",
      send: "ಕಳುಹಿಸಿ",
    },
    english: {
      title: "Vivah Setu Assistant",
      placeholder: "Type a message...",
      send: "Send",
    },
  };
  const lbl = labels[currentLanguage] ?? labels.english;
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(
    `chat_${Date.now()}_${Math.random().toString(36).slice(2)}`,
  );
  const greetingShown = useRef(false);

  // Init greeting once on open
  useEffect(() => {
    if (isOpen && !greetingShown.current) {
      greetingShown.current = true;
      setMessages([
        {
          id: "greet",
          role: "bot",
          text: getGreeting(currentLanguage),
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, currentLanguage]);

  const scrollToBottom = useRef(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom.current();
    }
  }, [isOpen, isMinimized]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => scrollToBottom.current(), 50);

    // Simulate bot reply with small delay
    setTimeout(
      () => {
        const reply = getBotReply(trimmed, currentLanguage);
        const botMsg: ChatMessage = {
          id: `b_${Date.now()}`,
          role: "bot",
          text: reply,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
        setTimeout(() => scrollToBottom.current(), 50);

        // Fire-and-forget: persist conversation to backend for admin audit
        if (actor) {
          const sid = sessionId.current;
          const lang = currentLanguage.slice(0, 2);
          actor.sendChatMessage(sid, trimmed, lang).catch(() => {
            /* silently ignore */
          });
        }
      },
      600 + Math.random() * 400,
    );
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      {isOpen && !isMinimized && (
        <div
          className="w-80 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
          style={{ height: "480px" }}
          data-ocid="chatbot.dialog"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{
              background: "linear-gradient(135deg, #FF6B00 0%, #D4AF37 100%)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">
                  {lbl.title}
                </p>
                <p className="text-white/70 text-xs">विवाह सेतू</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Minimize"
                data-ocid="chatbot.close_button"
              >
                <Minus className="w-3 h-3 text-white" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Close"
                data-ocid="chatbot.close_button"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-muted/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-card text-foreground rounded-tl-sm border-l-2 border-accent shadow-sm"
                  }`}
                  style={
                    msg.role === "bot"
                      ? { borderLeftColor: "#D4AF37" }
                      : undefined
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="bg-card rounded-2xl rounded-tl-sm px-3 py-2 border-l-2 shadow-sm flex gap-1 items-center"
                  style={{ borderLeftColor: "#D4AF37" }}
                >
                  <span
                    className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-card border-t border-border flex gap-2 items-end shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={lbl.placeholder}
              className="flex-1 min-w-0 bg-muted/40 border border-input rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none text-foreground placeholder:text-muted-foreground"
              data-ocid="chatbot.input"
              maxLength={500}
            />
            <Button
              type="button"
              size="sm"
              onClick={handleSend}
              disabled={!input.trim()}
              className="h-9 w-9 p-0 rounded-xl shrink-0"
              style={{ backgroundColor: "#FF6B00" }}
              aria-label={lbl.send}
              data-ocid="chatbot.send_button"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Minimized bar */}
      {isOpen && isMinimized && (
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg"
          style={{
            background: "linear-gradient(135deg, #FF6B00 0%, #D4AF37 100%)",
          }}
          data-ocid="chatbot.open_modal_button"
        >
          <MessageCircle className="w-4 h-4" />
          {lbl.title}
        </button>
      )}

      {/* FAB */}
      <button
        type="button"
        onClick={() => {
          setIsOpen((o) => !o);
          setIsMinimized(false);
        }}
        className="w-14 h-14 rounded-full text-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center relative"
        style={{ backgroundColor: "#FF6B00" }}
        aria-label={lbl.title}
        data-ocid="chatbot.open_modal_button"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center text-[9px] text-primary-foreground font-bold">
            ?
          </span>
        )}
      </button>
    </div>
  );
}
