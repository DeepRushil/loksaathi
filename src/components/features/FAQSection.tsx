'use client';

/**
 * @file components/features/FAQSection.tsx
 * @description Accessible accordion-style FAQ section for LokSaathi.
 * Optimized for performance using memoized filtering and standardized docstrings.
 */

import React, { useState, useCallback, useMemo } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { getFAQsByCategory } from '@/lib/electionData';
import type { ElectionCategory } from '@/types';
import styles from './FAQSection.module.css';

// ============================================================
// Sub-component: FAQ Item
// ============================================================

interface FAQAccordionItemProps {
  /** The unique ID of the FAQ item */
  id: string;
  /** The question text */
  question: string;
  /** The answer text */
  answer: string;
  /** Whether the item is currently expanded */
  isOpen: boolean;
  /** Callback to toggle expansion */
  onToggle: (id: string) => void;
}

/**
 * FAQAccordionItem component for individual FAQ entries.
 * 
 * @param {FAQAccordionItemProps} props Component props.
 * @returns {JSX.Element}
 */
const FAQAccordionItem = React.memo(({ id, question, answer, isOpen, onToggle }: FAQAccordionItemProps): React.ReactNode => {
  return (
    <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`} role="listitem">
      <button
        className={styles.accordionHeader}
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        id={`faq-question-${id}`}
      >
        <span className={styles.questionText}>{question}</span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} aria-hidden="true">+</span>
      </button>

      <div
        id={`faq-answer-${id}`}
        role="region"
        aria-labelledby={`faq-question-${id}`}
        className={styles.accordionBody}
        hidden={!isOpen}
      >
        <p className={styles.answerText}>{answer}</p>
      </div>
    </div>
  );
});
FAQAccordionItem.displayName = 'FAQAccordionItem';

// ============================================================
// Main Component
// ============================================================

/**
 * FAQSection component providing categorized election information.
 * 
 * @returns {JSX.Element}
 */
export default function FAQSection(): React.ReactNode {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ElectionCategory | 'all'>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  /**
   * Memoized list of categories for the filter row.
   */
  const CATEGORIES = useMemo(() => [
    { id: 'all' as const, label: t.faq_allQuestions },
    { id: 'eligibility' as const, label: t.faq_eligibility },
    { id: 'registration' as const, label: t.faq_registration },
    { id: 'voting' as const, label: t.faq_voting },
    { id: 'results' as const, label: t.faq_results },
  ], [t]);

  /**
   * Optimized filtered FAQ list using O(1) map-based lookup from electionData.
   */
  const filteredFAQs = useMemo(() => getFAQsByCategory(activeCategory), [activeCategory]);

  /**
   * Toggles an FAQ item expansion state.
   */
  const handleToggle = useCallback((id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  }, []);

  return (
    <section id="faq" className={styles.faqSection} aria-label="Frequently Asked Questions">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>{t.faq_eyebrow}</span>
        <h2 className={styles.sectionTitle}>
          {t.faq_heading_prefix} <span className="text-gradient">{t.faq_heading_highlight}</span>
        </h2>
        <p className={styles.sectionSubtitle}>{t.faq_subtitle}</p>
      </div>

      {/* Official YouTube Guide */}
      <div className={styles.videoSection}>
        <div className={styles.videoWrapper}>
          <iframe
            src="https://www.youtube-nocookie.com/embed/XGJQNKFYqYI"
            title="Official Voter Guide"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.videoIframe}
          />
        </div>
      </div>

      {/* Filter Row */}
      <div className={styles.filterRow} role="group" aria-label="Filter by category">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.filterActive : ''}`}
            onClick={() => { setActiveCategory(cat.id); setOpenId(null); }}
            aria-pressed={activeCategory === cat.id}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className={styles.accordion} role="list">
        {filteredFAQs.map(item => (
          <FAQAccordionItem
            key={item.id}
            id={item.id}
            question={item.question}
            answer={item.answer}
            isOpen={openId === item.id}
            onToggle={handleToggle}
          />
        ))}
      </div>

      <div className={styles.ctaBox}>
        <p>{t.faq_stillQuestions}</p>
        <a href="#assistant" className={styles.ctaLink}>{t.faq_askAi}</a>
      </div>
    </section>
  );
}
