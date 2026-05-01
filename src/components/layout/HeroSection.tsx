'use client';

/**
 * @file src/components/layout/HeroSection.tsx
 * @description India-themed hero section for LokSaathi with translations support.
 * Standardized with Google-style docstrings and performance optimizations.
 */

import React, { useMemo } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import styles from './HeroSection.module.css';

/**
 * HeroSection component displaying the main welcome area of the application.
 * Features animated backgrounds and key electoral statistics.
 * 
 * @returns {JSX.Element} The rendered hero section.
 */
export default function HeroSection(): React.ReactNode {
  const { t } = useLanguage();

  /**
   * Memoized statistics data for the hero section.
   */
  const STATS = useMemo(() => [
    { value: '960M+', label: t.hero_stat_voters, icon: '🗳️' },
    { value: '1M+', label: t.hero_stat_booths, icon: '🏠' },
    { value: '7', label: t.hero_stat_phases, icon: '🗓️' },
    { value: 'AI', label: 'Powered', icon: '🤖' },
  ], [t]);

  return (
    <section className={styles.hero} aria-label="Hero section — Welcome to LokSaathi">
      {/* Background Decor */}
      <div className={styles.bgBlobs} aria-hidden="true">
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
        <div className={styles.grid} />
        <div className={styles.chakraDecor}>⊕</div>
      </div>

      <div className={`${styles.heroContent} container`}>
        {/* Eyebrow / Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span>{t.hero_eyebrow}</span>
        </div>

        {/* Heading */}
        <h1 className={styles.heading}>
          {t.hero_title_prefix}
          <br />
          <span className="text-gradient">{t.hero_title_highlight}</span>
        </h1>

        {/* Subtitle */}
        <p className={styles.subheading}>{t.hero_subtitle}</p>

        {/* Call to Actions */}
        <div className={styles.ctaGroup}>
          <a href="#timeline" className={styles.ctaPrimary}>
            <span>🗳️</span> {t.hero_cta_primary}
          </a>
          <a href="#assistant" className={styles.ctaSecondary}>
            <span>💬</span> {t.hero_cta_secondary}
          </a>
        </div>

        {/* Highlights / Stats */}
        <dl className={styles.stats}>
          {STATS.map(stat => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statIcon}>{stat.icon}</span>
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={styles.statValue}>{stat.value}</dd>
            </div>
          ))}
        </dl>

        {/* Visual Accent */}
        <div className={`${styles.tricolorBar} tricolor-bar`} aria-hidden="true" />
      </div>
    </section>
  );
}
