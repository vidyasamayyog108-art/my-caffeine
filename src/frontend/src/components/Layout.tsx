import { Outlet } from "@tanstack/react-router";
import { useUserStore } from "../store";
import { translations } from "../types";
import { ChatbotWidget } from "./ChatbotWidget";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function Layout() {
  const { currentLanguage } = useUserStore();
  const t = translations[currentLanguage];

  // Build marquee text from all 4 language messages separated by ✦
  const marqueeSegments = [
    translations.marathi.marqueeText,
    translations.kannada.marqueeText,
    translations.hindi.marqueeText,
    translations.english.marqueeText,
  ];
  const marqueeText = marqueeSegments.join("  ✦  ");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Saffron marquee banner — BELOW the navbar */}
      <div
        className="overflow-hidden py-1.5 sticky top-16 z-40"
        style={{ backgroundColor: "#FF6B00" }}
        aria-label={`${t.community} — ${t.marqueeText}`}
        role="marquee"
      >
        <div className="marquee-track whitespace-nowrap text-white font-semibold text-sm select-none">
          <span className="mr-20">{marqueeText}</span>
          <span className="mr-20">{marqueeText}</span>
          <span className="mr-20">{marqueeText}</span>
        </div>
      </div>

      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* AI Chatbot Widget — visible on all pages */}
      <ChatbotWidget />
    </div>
  );
}
