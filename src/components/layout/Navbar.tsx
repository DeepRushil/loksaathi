'use client';

/**
 * @file src/components/layout/Navbar.tsx
 * @description Sticky navigation bar for LokSaathi with language selector and mobile menu.
 * Standardized with Google-style docstrings and performance optimizations.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import LanguageSelector from '@/components/ui/LanguageSelector';
import Image from 'next/image';
import styles from './Navbar.module.css';

/**
 * Navbar component providing global navigation and language switching.
 * 
 * @returns {JSX.Element} The rendered navbar.
 */
export default function Navbar(): React.ReactNode {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  /**
   * Navigation links data, memoized for performance.
   */
  const NAV_LINKS = useMemo(() => [
    { href: '#timeline', label: t.nav_timeline },
    { href: '#assistant', label: t.nav_assistant },
    { href: '#polling', label: t.nav_polling },
    { href: '#faq', label: t.nav_faq },
  ], [t]);

  /**
   * Handles scroll event to apply sticky styling.
   */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Handles Escape key to close mobile menu for accessibility.
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  /**
   * Handles clicks outside the mobile menu to close it.
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  /**
   * Disables body scroll when mobile menu is open.
   */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`} role="banner">
      <nav className={`${styles.nav} container`} aria-label="Main navigation" ref={menuRef}>
        <a href="#" className={styles.logo} aria-label="LokSaathi — go to top">
          <div className={styles.logoWrapper}>
            <Image src="/logo.png" alt="Logo" width={32} height={32} className={styles.logoImg} priority />
          </div>
          <span className={styles.logoText}>Lok<span className="text-gradient">Saathi</span></span>
        </a>

        <ul className={styles.navLinks} role="list">
          {NAV_LINKS.map(link => (
            <li key={link.href}><a href={link.href} className={styles.navLink}>{link.label}</a></li>
          ))}
        </ul>

        <div className={styles.navActions}>
          <LanguageSelector />
          <a href="#assistant" className={styles.ctaButton}>{t.nav_cta}</a>
        </div>

        <button
          ref={hamburgerRef}
          className={styles.hamburger}
          onClick={() => setMobileOpen(prev => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.line1Open : ''}`} />
          <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.line2Open : ''}`} />
          <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.line3Open : ''}`} />
        </button>

        <div id="mobile-menu" className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`} aria-hidden={!mobileOpen}>
          <div className={styles.mobileLangRow}><LanguageSelector /></div>
          <ul role="list" className={styles.mobileNavLinks}>
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a href={link.href} className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#assistant" className={styles.mobileCta} onClick={() => setMobileOpen(false)}>{t.nav_cta} →</a>
        </div>
      </nav>
    </header>
  );
}
