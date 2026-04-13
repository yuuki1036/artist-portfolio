"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/settings";
import type { Translations } from "@/i18n/types";
import { LanguageSwitcher } from "@/app/[lang]/layout/components/language-switcher";
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
                type="button"
                onClick={toggleMobileMenu}
                className="text-text-primary hover:text-text-primary/70 transition-colors"
                aria-label="Toggle mobile menu"
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
                <span className="text-sm text-text-primary/70">
                  {currentLang === "ja" ? "🇯🇵" : "🇺🇸"}
                </span>
                <LanguageSwitcher currentLang={currentLang} />
              </div>

              {/* Cart */}
              <div className="flex items-center">
                <button
                  type="button"
                  className="text-text-primary hover:text-text-primary/70 transition-colors flex items-center space-x-1"
                  aria-label="Shopping cart"
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
                aria-label="Shopping cart"
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
        <div className="fixed inset-0 bg-bg-primary z-50 md:hidden">
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
                type="button"
                onClick={closeMobileMenu}
                className="text-text-primary hover:text-text-primary/70 transition-colors"
                aria-label="Close menu"
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
                <span className="text-sm text-text-primary/70">
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
