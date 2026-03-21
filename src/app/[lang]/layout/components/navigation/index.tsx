"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/settings";
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
  translations: {
    common?: {
      menu?: {
        home?: string;
        works?: string;
        about?: string;
        contact?: string;
      };
    };
  };
};

export function Navigation({ currentLang }: NavigationProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { key: "original", label: "Original", href: `/${currentLang}/original` },
    { key: "shop", label: "Shop", href: `/${currentLang}/shop` },
    { key: "contact", label: "Contact", href: `/${currentLang}/contact` },
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
      <nav className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-gray-900 transition-colors"
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
                  className={`text-sm font-medium transition-colors hover:text-gray-600 ${
                    pathname === item.href
                      ? "text-gray-900 border-b-2 border-gray-900 pb-1"
                      : "text-gray-700"
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
                className="text-xl md:text-2xl font-light tracking-[0.2em] text-gray-900 hover:text-gray-600 transition-colors"
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
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon === "instagram" && <InstagramIcon />}
                    {social.icon === "tiktok" && <TikTokIcon />}
                  </a>
                ))}
              </div>

              {/* Language Switcher */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {currentLang === "ja" ? "🇯🇵" : "🇺🇸"}
                </span>
                <LanguageSwitcher currentLang={currentLang} />
              </div>

              {/* Cart */}
              <div className="flex items-center">
                <button
                  type="button"
                  className="text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-1"
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
                className="text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-1"
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
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <Link
                href={`/${currentLang}`}
                onClick={closeMobileMenu}
                className="text-xl font-light tracking-[0.2em] text-gray-900"
              >
                yasu224
              </Link>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-gray-900 transition-colors"
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
                  className={`text-lg font-medium transition-colors hover:text-gray-600 ${
                    pathname === item.href ? "text-gray-900" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-8 border-t border-gray-100 space-y-6">
              {/* Social Icons */}
              <div className="flex items-center justify-center space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
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
                <span className="text-sm text-gray-600">🇫🇷 Français</span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="Language options"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
