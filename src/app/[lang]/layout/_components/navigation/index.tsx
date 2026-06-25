"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/settings";
import type { Translations } from "@/i18n/types";
import { LanguageSwitcher } from "@/app/[lang]/layout/_components/language-switcher";
import {
  InstagramIcon,
  TikTokIcon,
  ShoppingCartIcon,
  HamburgerMenuIcon,
  CloseIcon,
} from "@/components/icons";

type NavigationProps = {
  currentLang: Locale;
  translations: Translations;
};

export function Navigation({ currentLang, translations }: NavigationProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menu = translations.common.menu;
  const a11y = translations.common.a11y;

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // モバイルメニュー展開中の a11y: スクロールロック・フォーカス移動/復帰・
  // Esc クローズ・Tab フォーカストラップを担う。
  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") {
        return;
      }
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [isMobileMenuOpen]);

  const navigationItems = [
    {
      key: "original",
      label: menu.original,
      href: `/${currentLang}/original`,
    },
    {
      key: "shop",
      label: menu.shop,
      href: `/${currentLang}/shop`,
    },
    {
      key: "about",
      label: menu.about,
      href: `/${currentLang}/about`,
    },
    {
      key: "contact",
      label: menu.contact,
      href: `/${currentLang}/contact`,
    },
  ];

  const socialLinks = [
    {
      icon: "instagram",
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: "tiktok",
      href: "https://tiktok.com",
      label: "TikTok",
    },
  ];

  return (
    <>
      <nav className="w-full bg-bg-primary border-b border-text-primary/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                ref={hamburgerRef}
                type="button"
                onClick={toggleMobileMenu}
                className="text-text-primary hover:text-text-primary/70 transition-colors"
                aria-label={a11y.openMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <HamburgerMenuIcon />
              </button>
            </div>

            {/* Left Navigation - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-text-primary/70 ${
                    pathname === item.href
                      ? "text-text-primary border-b-2 border-text-primary pb-1"
                      : "text-text-primary/70"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Center Logo */}
            <div className="flex-1 text-center md:flex-initial">
              <Link
                href={`/${currentLang}`}
                className="text-xl md:text-2xl font-light tracking-[0.2em] text-text-primary hover:text-text-primary/70 transition-colors"
              >
                yasu224
              </Link>
            </div>

            {/* Right Section - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Social Icons */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary hover:text-text-primary/70 transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon === "instagram" && <InstagramIcon />}
                    {social.icon === "tiktok" && <TikTokIcon />}
                  </a>
                ))}
              </div>

              {/* Language Switcher */}
              <div className="flex items-center space-x-2">
                <span
                  className="text-sm text-text-primary/70"
                  aria-hidden="true"
                >
                  {currentLang === "ja" ? "🇯🇵" : "🇺🇸"}
                </span>
                <LanguageSwitcher currentLang={currentLang} />
              </div>

              {/* Cart */}
              <div className="flex items-center">
                <button
                  type="button"
                  className="text-text-primary hover:text-text-primary/70 transition-colors flex items-center space-x-1"
                  aria-label={a11y.cart}
                >
                  <ShoppingCartIcon />
                  <span className="text-sm font-medium">0</span>
                </button>
              </div>
            </div>

            {/* Mobile Cart */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-text-primary hover:text-text-primary/70 transition-colors flex items-center space-x-1"
                aria-label={a11y.cart}
              >
                <ShoppingCartIcon />
                <span className="text-sm font-medium">0</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={dialogRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={a11y.menuDialog}
          className="fixed inset-0 bg-bg-primary z-50 md:hidden"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-text-primary/10">
              <Link
                href={`/${currentLang}`}
                onClick={closeMobileMenu}
                className="text-xl font-light tracking-[0.2em] text-text-primary"
              >
                yasu224
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMobileMenu}
                className="text-text-primary hover:text-text-primary/70 transition-colors"
                aria-label={a11y.closeMenu}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex flex-col flex-1 px-4 py-8 space-y-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`text-lg font-medium transition-colors hover:text-text-primary/70 ${
                    pathname === item.href
                      ? "text-text-primary"
                      : "text-text-primary/70"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-8 border-t border-text-primary/10 space-y-6">
              {/* Social Icons */}
              <div className="flex items-center justify-center space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary hover:text-text-primary/70 transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon === "instagram" && (
                      <InstagramIcon className="w-6 h-6" />
                    )}
                    {social.icon === "tiktok" && (
                      <TikTokIcon className="w-6 h-6" />
                    )}
                  </a>
                ))}
              </div>

              {/* Language Switcher */}
              <div className="flex items-center justify-center space-x-2">
                <span
                  className="text-sm text-text-primary/70"
                  aria-hidden="true"
                >
                  {currentLang === "ja" ? "🇯🇵" : "🇺🇸"}
                </span>
                <LanguageSwitcher currentLang={currentLang} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
