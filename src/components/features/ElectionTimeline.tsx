'use client';

/**
 * @file components/features/ElectionTimeline.tsx
 * @description Interactive election process timeline with Google Services integration.
 * Features: Expandable cards, Add to Wallet, Add to Calendar.
 */

import React, { useState, useCallback, useMemo } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { ELECTION_PHASES } from '@/lib/electionData';
import { GoogleWalletService, GoogleCalendarService } from '@/lib/googleServices';
import type { ElectionPhase } from '@/types';
import styles from './ElectionTimeline.module.css';

// ============================================================
// Sub-component: Timeline Phase Card
// ============================================================

interface PhaseCardProps {
  phase: ElectionPhase;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  isLast: boolean;
}

const PhaseCard = React.memo(({ phase, isExpanded, onToggle, isLast }: PhaseCardProps): React.ReactNode => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle(phase.id);
      }
    },
    [onToggle, phase.id]
  );

  /**
   * Action handler for Google Service integrations.
   */
  const handleServiceAction = async (e: React.MouseEvent, type: 'wallet' | 'calendar') => {
    e.stopPropagation(); // Don't collapse the card
    try {
      if (type === 'wallet') {
        await GoogleWalletService.addToWallet('EPIC-MOCK-12345');
        alert('EPIC Card Added to Google Wallet!');
      } else {
        await GoogleCalendarService.scheduleReminder('2026-05-20', 'Delhi North');
        alert('Election Day Reminder Added to Google Calendar!');
      }
    } catch (err) {
      console.error('Service action failed:', err);
    }
  };

  return (
    <div
      className={`${styles.phaseWrapper} ${isLast ? styles.last : ''}`}
      style={{ '--phase-color': phase.color } as React.CSSProperties}
    >
      {!isLast && <div className={styles.connector} aria-hidden="true" />}

      <div className={styles.stepBubble} aria-hidden="true">
        <span className={styles.stepIcon}>{phase.icon}</span>
        <span className={styles.stepNumber}>{phase.step}</span>
      </div>

      <article className={`${styles.phaseCard} ${isExpanded ? styles.expanded : ''}`}>
        <button
          className={styles.cardHeader}
          onClick={() => onToggle(phase.id)}
          onKeyDown={handleKeyDown}
          aria-expanded={isExpanded}
          aria-controls={`phase-details-${phase.id}`}
          id={`phase-header-${phase.id}`}
        >
          <div className={styles.headerLeft}>
            <span className={styles.stepLabel}>Step {phase.step}</span>
            <h3 className={styles.phaseTitle}>{phase.title}</h3>
            <p className={styles.phaseSubtitle}>{phase.subtitle}</p>
          </div>
          <span className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`} aria-hidden="true">›</span>
        </button>

        <div
          id={`phase-details-${phase.id}`}
          role="region"
          aria-labelledby={`phase-header-${phase.id}`}
          className={styles.details}
          hidden={!isExpanded}
        >
          <p className={styles.description}>{phase.description}</p>

          <section className={styles.detailsSection}>
            <h4 className={styles.sectionTitle}>📋 Key Points</h4>
            <ul className={styles.bulletList}>
              {phase.details.map((detail, i) => (
                <li key={i} className={styles.bulletItem}>
                  <span className={styles.bullet} aria-hidden="true">▸</span>
                  {detail}
                </li>
              ))}
            </ul>
          </section>

          {/* Google Services Call-to-Actions */}
          <div className={styles.serviceActions}>
            {phase.id === 'registration' && (
              <button 
                className={styles.googleBtn} 
                onClick={(e) => handleServiceAction(e, 'wallet')}
                aria-label="Add Digital EPIC to Google Wallet"
              >
                <span className={styles.googleIcon}>💳</span> Add to Wallet
              </button>
            )}
            {phase.id === 'preparation' && (
              <button 
                className={styles.googleBtn} 
                onClick={(e) => handleServiceAction(e, 'calendar')}
                aria-label="Add Election Reminder to Google Calendar"
              >
                <span className={styles.googleIcon}>📅</span> Add to Calendar
              </button>
            )}
          </div>

          {phase.requiredDocuments && (
            <section className={styles.detailsSection}>
              <h4 className={styles.sectionTitle}>📄 Required Documents</h4>
              <ul className={styles.bulletList}>
                {phase.requiredDocuments.map((doc, i) => (
                  <li key={i} className={styles.bulletItem}>
                    <span className={styles.bullet} aria-hidden="true">▸</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </div>
  );
});
PhaseCard.displayName = 'PhaseCard';

// ============================================================
// Main Component
// ============================================================

export default function ElectionTimeline(): React.ReactNode {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>('eligibility');

  const handleToggle = useCallback((id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  }, []);

  const phases = useMemo(() => ELECTION_PHASES, []);

  return (
    <section id="timeline" className={styles.timelineSection} aria-label="Election Process Timeline">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>{t.timeline_heading}</span>
        <h2 className={styles.sectionTitle}>
          {t.hero_title_prefix} <span className="text-gradient">Electoral Journey</span>
        </h2>
        <p className={styles.sectionSubtitle}>{t.timeline_subtitle}</p>
      </div>

      <div className={styles.timeline} role="list">
        {phases.map((phase, index) => (
          <div key={phase.id} role="listitem">
            <PhaseCard
              phase={phase}
              isExpanded={expandedId === phase.id}
              onToggle={handleToggle}
              isLast={index === phases.length - 1}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
