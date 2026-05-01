/**
 * @file app/page.tsx
 * @description Main home page — assembles all sections of LokSaathi.
 * Server Component for optimal performance (client sub-components are loaded lazily).
 */

import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/layout/HeroSection';
import Footer from '@/components/layout/Footer';
import dynamic from 'next/dynamic';

const ElectionTimeline = dynamic(() => import('@/components/features/ElectionTimeline'));
const AssistantChat = dynamic(() => import('@/components/features/AssistantChat'));
const PollingStationMap = dynamic(() => import('@/components/features/PollingStationMap'));
const FAQSection = dynamic(() => import('@/components/features/FAQSection'));
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'LokSaathi — Your Election Companion',
  description:
    'Understand India\'s election process step-by-step. Get AI-powered answers about EPIC registration, polling booths, EVM voting, and results.',
};

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1} className={styles.main}>
        {/* 1. Hero */}
        <HeroSection />

        {/* Divider */}
        <div className={styles.sectionDivider} aria-hidden="true" />

        {/* 2. Election Process Timeline */}
        <div className={`${styles.section} container`}>
          <ElectionTimeline />
        </div>

        {/* Divider */}
        <div className={styles.sectionDivider} aria-hidden="true" />

        {/* 3. AI Chat Assistant */}
        <div className={`${styles.section} container`}>
          <AssistantChat />
        </div>

        {/* Divider */}
        <div className={styles.sectionDivider} aria-hidden="true" />

        {/* 4. Polling Station Map */}
        <div className={`${styles.section} container`}>
          <PollingStationMap />
        </div>

        {/* Divider */}
        <div className={styles.sectionDivider} aria-hidden="true" />

        {/* 5. FAQ Section */}
        <div className={`${styles.section} container`}>
          <FAQSection />
        </div>
      </main>

      <Footer />
    </>
  );
}
