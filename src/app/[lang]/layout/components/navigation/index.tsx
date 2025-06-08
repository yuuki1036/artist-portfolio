"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/settings";
import { LanguageSwitcher } from "@/app/[lang]/layout/components/language-switcher";
import { InstagramIcon, TikTokIcon, ShoppingCartIcon, HamburgerMenuIcon, CloseIcon } from "@/components/icons";

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
      label: "Instagram"
    },
    {
      icon: "tiktok",
      href: "https://tiktok.com",
      label: "TikTok"
    },
  ];

  return (
    <>
      <nav className="ap-w-full ap-bg-white ap-border-b ap-border-gray-100">
        <div className="ap-max-w-7xl ap-mx-auto ap-px-4 ap-py-4">
          <div className="ap-flex ap-items-center ap-justify-between">
            {/* Mobile Menu Button */}
            <div className="md:ap-hidden">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="ap-text-gray-700 hover:ap-text-gray-900 ap-transition-colors"
                aria-label="Toggle mobile menu"
              >
                <HamburgerMenuIcon />
              </button>
            </div>

            {/* Left Navigation - Desktop */}
            <div className="ap-hidden md:ap-flex ap-items-center ap-space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`ap-text-sm ap-font-medium ap-transition-colors hover:ap-text-gray-600 ${pathname === item.href
                    ? "ap-text-gray-900 ap-border-b-2 ap-border-gray-900 ap-pb-1"
                    : "ap-text-gray-700"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Center Logo */}
            <div className="ap-flex-1 ap-text-center md:ap-flex-initial">
              <Link
                href={`/${currentLang}`}
                className="ap-text-xl md:ap-text-2xl ap-font-light ap-tracking-[0.2em] ap-text-gray-900 hover:ap-text-gray-600 ap-transition-colors"
              >
                yasu224
              </Link>
            </div>

            {/* Right Section - Desktop */}
            <div className="ap-hidden md:ap-flex ap-items-center ap-space-x-6">
              {/* Social Icons */}
              <div className="ap-flex ap-items-center ap-space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ap-text-gray-700 hover:ap-text-gray-900 ap-transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon === "instagram" && <InstagramIcon />}
                    {social.icon === "tiktok" && <TikTokIcon />}
                  </a>
                ))}
              </div>

              {/* Language Switcher */}
              <div className="ap-flex ap-items-center ap-space-x-2">
                <span className="ap-text-sm ap-text-gray-600">
                  {currentLang === "ja" ? "🇯🇵" : "🇺🇸"}
                </span>
                <LanguageSwitcher currentLang={currentLang} />
              </div>

              {/* Cart */}
              <div className="ap-flex ap-items-center">
                <button
                  type="button"
                  className="ap-text-gray-700 hover:ap-text-gray-900 ap-transition-colors ap-flex ap-items-center ap-space-x-1"
                  aria-label="Shopping cart"
                >
                  <ShoppingCartIcon />
                  <span className="ap-text-sm ap-font-medium">0</span>
                </button>
              </div>
            </div>

            {/* Mobile Cart */}
            <div className="md:ap-hidden">
              <button
                type="button"
                className="ap-text-gray-700 hover:ap-text-gray-900 ap-transition-colors ap-flex ap-items-center ap-space-x-1"
                aria-label="Shopping cart"
              >
                <ShoppingCartIcon />
                <span className="ap-text-sm ap-font-medium">0</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="ap-fixed ap-inset-0 ap-bg-white ap-z-50 md:ap-hidden">
          <div className="ap-flex ap-flex-col ap-h-full">
            {/* Header */}
            <div className="ap-flex ap-items-center ap-justify-between ap-px-4 ap-py-4 ap-border-b ap-border-gray-100">
              <Link
                href={`/${currentLang}`}
                onClick={closeMobileMenu}
                className="ap-text-xl ap-font-light ap-tracking-[0.2em] ap-text-gray-900"
              >
                yasu224
              </Link>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="ap-text-gray-700 hover:ap-text-gray-900 ap-transition-colors"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="ap-flex ap-flex-col ap-flex-1 ap-px-4 ap-py-8 ap-space-y-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`ap-text-lg ap-font-medium ap-transition-colors hover:ap-text-gray-600 ${pathname === item.href ? "ap-text-gray-900" : "ap-text-gray-700"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="ap-px-4 ap-py-8 ap-border-t ap-border-gray-100 ap-space-y-6">
              {/* Social Icons */}
              <div className="ap-flex ap-items-center ap-justify-center ap-space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ap-text-gray-700 hover:ap-text-gray-900 ap-transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon === "instagram" && <InstagramIcon className="ap-w-6 ap-h-6" />}
                    {social.icon === "tiktok" && <TikTokIcon className="ap-w-6 ap-h-6" />}
                  </a>
                ))}
              </div>

              {/* Language Switcher */}
              <div className="ap-flex ap-items-center ap-justify-center ap-space-x-2">
                <span className="ap-text-sm ap-text-gray-600">
                  🇫🇷 Français
                </span>
                <svg className="ap-w-4 ap-h-4 ap-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="Language options">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}