import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Crown, Menu, MessageCircle, Settings, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";
import { useUserStore } from "../store";
import type { Language } from "../types";
import { translations } from "../types";
import { VivahSetuLogo } from "./VivahSetuLogo";

const langOptions: { key: Language; short: string }[] = [
  { key: "marathi", short: "MR" },
  { key: "hindi", short: "HI" },
  { key: "kannada", short: "KN" },
  { key: "english", short: "EN" },
];

interface NavLink {
  label: string;
  href: string;
  key: string;
}

function getNavLinks(lang: Language): NavLink[] {
  const t = translations[lang];
  return [
    { key: "home", label: t.home, href: "/" },
    { key: "profiles", label: t.profiles, href: "/browse" },
    { key: "matches", label: t.matches, href: "/matches" },
    { key: "plans", label: t.plans, href: "/plans" },
    { key: "stories", label: t.stories, href: "/stories" },
  ];
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { currentLanguage, setLanguage, isLoggedIn, isAdmin, logout } =
    useUserStore();
  const t = translations[currentLanguage];
  const navLinks = getNavLinks(currentLanguage);
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();

  // Poll unread count every 15s when logged in
  useEffect(() => {
    if (!actor || !isLoggedIn || isFetching) return;
    let cancelled = false;

    async function fetchUnread() {
      if (!actor) return;
      try {
        const convs = await actor.getMyConversations();
        if (!cancelled) {
          const total = convs.reduce(
            (acc, c) => acc + Number(c.unreadCount),
            0,
          );
          setUnreadCount(total);
        }
      } catch {
        // silently fail
      }
    }

    fetchUnread();
    const interval = setInterval(fetchUnread, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [actor, isLoggedIn, isFetching]);

  // Active link check — /browse and /profiles are both "profiles" nav
  function isActivePath(href: string): boolean {
    if (href === "/browse")
      return currentPath === "/browse" || currentPath === "/profiles";
    return currentPath === href;
  }

  return (
    <header className="bg-secondary text-secondary-foreground border-b border-secondary/80 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <VivahSetuLogo className="hover:scale-105 transition-smooth" />

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-0.5"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive = isActivePath(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-secondary-foreground/90 hover:bg-secondary-foreground/10"
                  }`}
                  data-ocid={`nav.${link.key}_link`}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* Discreet admin gear icon — only for admin users */}
            {isAdmin && (
              <Link
                to="/vivah-admin-secure"
                className="ml-1 p-2 rounded-md text-secondary-foreground/60 hover:bg-secondary-foreground/10 hover:text-secondary-foreground transition-smooth"
                title="Admin Panel"
                data-ocid="nav.admin_icon_link"
                aria-label="Admin Panel"
              >
                <Settings className="w-4 h-4" />
              </Link>
            )}
          </nav>

          {/* Language switcher + CTA */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language switcher */}
            <div
              className="flex items-center gap-0 border border-secondary-foreground/20 rounded-lg overflow-hidden"
              data-ocid="nav.language_switcher"
            >
              {langOptions.map((opt, i) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setLanguage(opt.key)}
                  className={`px-2 py-1.5 text-xs font-medium transition-smooth ${
                    i > 0 ? "border-l border-secondary-foreground/20" : ""
                  } ${
                    currentLanguage === opt.key
                      ? "text-white"
                      : "text-secondary-foreground/70 hover:bg-secondary-foreground/10"
                  }`}
                  style={
                    currentLanguage === opt.key
                      ? { backgroundColor: "#FF6B00" }
                      : {}
                  }
                  data-ocid={`nav.lang_${opt.key}_button`}
                  aria-label={`Switch to ${opt.short}`}
                  aria-pressed={currentLanguage === opt.key}
                >
                  {opt.short}
                </button>
              ))}
            </div>

            {/* Messages icon (logged-in only) */}
            {isLoggedIn && (
              <Button
                size="sm"
                variant="ghost"
                className="relative text-secondary-foreground/90 hover:bg-secondary-foreground/10"
                onClick={() => navigate({ to: "/messages" })}
                data-ocid="nav.messages_icon_button"
                aria-label={t.messages}
              >
                <MessageCircle className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Button>
            )}

            {isLoggedIn ? (
              <Button
                size="sm"
                variant="ghost"
                className="text-secondary-foreground/90 hover:bg-secondary-foreground/10"
                onClick={() => logout()}
                data-ocid="nav.logout_button"
              >
                {t.logout}
              </Button>
            ) : (
              <>
                <Link to="/login" data-ocid="nav.login_button">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-secondary-foreground/90 hover:bg-secondary-foreground/10"
                  >
                    {t.login}
                  </Button>
                </Link>
                <Link to="/register" data-ocid="nav.register_button">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm gap-1.5">
                    <Crown className="w-4 h-4" />
                    {t.joinNow}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-secondary-foreground hover:bg-secondary-foreground/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "मेनू बंद करें" : "मेनू खोलें"}
            data-ocid="nav.mobile_menu_toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <span className="relative">
                <Menu className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-secondary border-t border-secondary-foreground/10 px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => {
            const isActive = isActivePath(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-smooth ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-secondary-foreground/90 hover:bg-secondary-foreground/10"
                }`}
                onClick={() => setMobileOpen(false)}
                data-ocid={`nav.mobile_${link.key}_link`}
              >
                {link.key === "messages" && (
                  <MessageCircle className="w-4 h-4" />
                )}
                {link.label}
                {link.key === "messages" && unreadCount > 0 && (
                  <Badge className="bg-destructive text-destructive-foreground rounded-full text-[10px] px-1.5 py-0 ml-auto">
                    {unreadCount}
                  </Badge>
                )}
              </Link>
            );
          })}
          {/* Admin gear link — only for admin users */}
          {isAdmin && (
            <Link
              to="/vivah-admin-secure"
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.mobile_admin_icon_link"
              className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-secondary-foreground/70 hover:bg-secondary-foreground/10 transition-smooth"
            >
              <Settings className="w-4 h-4" />
              Admin Panel
            </Link>
          )}

          {/* Language switcher mobile */}
          <div
            className="flex flex-wrap items-center gap-1 pt-2 pb-1"
            data-ocid="nav.mobile_language_switcher"
          >
            {langOptions.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => {
                  setLanguage(opt.key);
                  setMobileOpen(false);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-smooth border ${
                  currentLanguage === opt.key
                    ? "text-white border-transparent"
                    : "text-secondary-foreground/70 border-secondary-foreground/20 hover:bg-secondary-foreground/10"
                }`}
                style={
                  currentLanguage === opt.key
                    ? { backgroundColor: "#FF6B00" }
                    : {}
                }
                data-ocid={`nav.mobile_lang_${opt.key}_button`}
              >
                {opt.short}
              </button>
            ))}
          </div>

          {/* Messages shortcut (logged-in only) */}
          {isLoggedIn && (
            <Link
              to="/messages"
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.mobile_messages_link"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 text-sm text-secondary-foreground/90 hover:bg-secondary-foreground/10 rounded-md">
                <MessageCircle className="w-4 h-4" />
                {t.messages}
                {unreadCount > 0 && (
                  <Badge className="bg-destructive text-destructive-foreground rounded-full text-[10px] px-1.5 py-0 ml-auto">
                    {unreadCount}
                  </Badge>
                )}
              </div>
            </Link>
          )}

          <div className="pt-2 space-y-2">
            {isLoggedIn ? (
              <Button
                variant="outline"
                className="w-full border-secondary-foreground/30 text-secondary-foreground"
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                data-ocid="nav.mobile_logout_button"
              >
                {t.logout}
              </Button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.mobile_login_button"
                >
                  <Button
                    variant="outline"
                    className="w-full border-secondary-foreground/30 text-secondary-foreground"
                  >
                    {t.login}
                  </Button>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.mobile_register_button"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-1.5">
                    <Crown className="w-4 h-4" />
                    {t.joinNow}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
