'use client';

/**
 * @file components/layout/Footer.tsx
 * @description Site footer for LokSaathi with translated labels.
 */

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`${styles.footerContent} container`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span aria-hidden="true">🗳️</span>
            <span className={styles.logoText}>
              Lok<span className="text-gradient">Saathi</span>
            </span>
          </div>
          <p className={styles.tagline}>{t.footer_tagline}</p>
          <div className={styles.poweredBy}>
            <span className={styles.poweredLabel}>Powered by</span>
            <span className={styles.googleBadge}>Google Gemini AI</span>
            <span className={styles.googleBadge}>Firebase</span>
            <span className={styles.googleBadge}>Google Maps</span>
          </div>
        </div>

        {/* Links */}
        <nav className={styles.linkColumns} aria-label="Footer navigation">
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>{t.footer_explore}</h3>
            <ul role="list">
              <li><a href="#timeline" className={styles.footerLink}>Election Timeline</a></li>
              <li><a href="#assistant" className={styles.footerLink}>Ask AI Assistant</a></li>
              <li><a href="#polling" className={styles.footerLink}>Find Polling Booth</a></li>
              <li><a href="#faq" className={styles.footerLink}>FAQs</a></li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>{t.footer_resources}</h3>
            <ul role="list">
              <li>
                <a href="https://eci.gov.in/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}
                  aria-label="Election Commission of India (opens in new tab)">
                  ECI — eci.gov.in ↗
                </a>
              </li>
              <li>
                <a href="https://nvsp.in/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}
                  aria-label="NVSP (opens in new tab)">
                  NVSP — nvsp.in ↗
                </a>
              </li>
              <li>
                <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}
                  aria-label="Voter registration portal (opens in new tab)">
                  Voter Registration Portal ↗
                </a>
              </li>
              <li>
                <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}
                  aria-label="Google AI Studio (opens in new tab)">
                  Google AI Studio ↗
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Tricolor bar */}
      <div className={`${styles.tricolorAccent} tricolor-bar`} aria-hidden="true" />

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>© {currentYear} LokSaathi. Built with ❤️ for Indian democracy by <a href="https://www.linkedin.com/in/deeprushil/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>DEEP RUSHIL</a></p>
        <p className={styles.disclaimer}>{t.footer_disclaimer}</p>
      </div>
    </footer>
  );
}
