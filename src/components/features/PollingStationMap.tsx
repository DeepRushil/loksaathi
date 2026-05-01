'use client';

/**
 * @file components/features/PollingStationMap.tsx
 * @description Google Maps Embed for polling booth context with i18n support.
 * Optimized for performance and standardized with Google-style docstrings.
 */

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import styles from './PollingStationMap.module.css';

/**
 * PollingStationMap component displays an interactive Google Map to help users
 * find their designated polling booth in India.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default function PollingStationMap(): React.ReactNode {
  const { t } = useLanguage();
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  /** 
   * Memoized API key and source to prevent unnecessary recalculations.
   */
  const mapSrc = useMemo(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const hasValidKey = apiKey && !apiKey.includes('your_') && apiKey.length > 20;
    
    return hasValidKey
      ? `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=polling+booth+India&zoom=12`
      : null;
  }, []);

  /**
   * Data for the information tips shown above the map.
   */
  const TIPS = useMemo(() => [
    { icon: '🗺️', title: t.map_tip1_title || 'Local Search', desc: t.map_tip1_desc || 'Search by your constituency name.' },
    { icon: '🌐', title: t.map_tip2_title || 'Precise Location', desc: t.map_tip2_desc || 'Use GPS for exact directions.' },
    { icon: '🚌', title: t.map_tip3_title || 'Accessibility', desc: t.map_tip3_desc || 'Check for ramp facilities.' },
  ], [t]);

  return (
    <section id="polling" className={styles.mapSection} aria-label="Find a Polling Booth">
      {/* Header */}
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>{t.faq_eyebrow}</span>
        <h2 className={styles.sectionTitle}>
          {t.nav_polling} <span className="text-gradient">Near You</span>
        </h2>
        <p className={styles.sectionSubtitle}>{t.map_subtitle}</p>
      </div>

      {/* Tips Cards */}
      <div className={styles.tipsRow}>
        {TIPS.map((tip, i) => (
          <article key={i} className={styles.tipCard}>
            <span className={styles.tipIcon} aria-hidden="true">{tip.icon}</span>
            <h3 className={styles.tipTitle}>{tip.title}</h3>
            <p className={styles.tipDesc}>{tip.desc}</p>
          </article>
        ))}
      </div>

      {/* Map Container */}
      <div className={styles.mapContainer}>
        {mapSrc ? (
          <>
            {!isMapLoaded && (
              <div className={styles.mapSkeleton} aria-hidden="true">
                <div className={styles.skeletonPulse} />
                <p className={styles.skeletonText}>Loading interactive map...</p>
              </div>
            )}
            <iframe
              src={mapSrc}
              className={`${styles.mapIframe} ${isMapLoaded ? styles.mapVisible : styles.mapHidden}`}
              title="Google Maps showing polling booths"
              aria-label="Interactive map to find polling booths"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setIsMapLoaded(true)}
              allowFullScreen
            />
          </>
        ) : (
          <div className={styles.mapPlaceholder} role="img" aria-label="Map placeholder">
            <div className={styles.placeholderContent}>
              <span className={styles.placeholderIcon} aria-hidden="true">🗺️</span>
              <h3>Map Integration Ready</h3>
              <p>{t.map_placeholder_desc}</p>
              <a
                href="https://nvsp.in/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.placeholderLink}
              >
                Go to NVSP ↗
              </a>
            </div>
          </div>
        )}
      </div>

      {/* External Resources */}
      <div className={styles.externalLink}>
        <a
          href="https://www.google.com/maps/search/polling+booth+India/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.openMapsLink}
        >
          📍 Open in Google Maps ↗
        </a>
        <a
          href="https://voters.eci.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.openMapsLink}
        >
          🏛️ Voter Service Portal ↗
        </a>
      </div>
    </section>
  );
}
