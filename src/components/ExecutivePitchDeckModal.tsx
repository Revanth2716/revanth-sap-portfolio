'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Presentation, Award, Zap, Shield, Mail, CheckCircle2 } from 'lucide-react';
import { playUiClick } from '@/utils/soundEffects';
import styles from './ExecutivePitchDeckModal.module.css';

interface PitchDeckProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Slide {
  index: string;
  title: string;
  highlight: string;
  points: string[];
}

const SLIDES: Slide[] = [
  {
    index: 'Slide 01 / 05',
    title: 'Executive Summary & Background',
    highlight: 'Entry-Level SAP BASIS Analyst with 8-Month Internship at Eezycode',
    points: [
      'Graduated B.Tech in Computer Science & Engineering from KL University (2020-2024) with an 8.33 / 10 CGPA.',
      'Completed an 8-month intensive SAP BASIS internship at Eezycode Software Private Limited.',
      'Certified in Microsoft Azure Fundamentals, Oracle Cloud Infrastructure, and AWS Cloud Foundations.',
      'Open to relocate immediately to Bangalore or working in Hyderabad.',
    ],
  },
  {
    index: 'Slide 02 / 05',
    title: 'Core Technical Competencies',
    highlight: 'NetWeaver 7.5 AS ABAP & AS Java Dual-Stack Expertise',
    points: [
      'Architecture: Work process dispatching (DIA/BGD/UPD/SPO/ENQ), ICM, Gateway, and NetWeaver Administrator (NWA).',
      'Transport Management: CTS routes, SE09/SE10 Workbench, tp binary export/import, and STMS queue triage.',
      'Monitoring & Tracing: Background job scheduling (SM37/SM36), system logs (SM21), runtime dumps (ST22), and ST12 SQL trace.',
      'Security: User administration (SU01), role authorizations (PFCG), composite expansion, and SoD conflict mitigation.',
    ],
  },
  {
    index: 'Slide 03 / 05',
    title: 'Flagship System: SAP BASIS Operations Portal',
    highlight: 'Integrated NetWeaver Java App with RFC & CTS Governance',
    points: [
      'Connects Java 8 / Spring Boot front-end to NetWeaver via SAP Java Connector (JCo 3.1) and RFC-enabled ABAP function modules.',
      'Implements maker-checker leave workflow, TMS transport checklist generation, and background job health scoring.',
      'Backed by 62 passing JUnit 5 tests and seeded real-world NetWeaver scenarios.',
      'Zero license dependency: fully verified with mock and real JCo RFC adapters.',
    ],
  },
  {
    index: 'Slide 04 / 05',
    title: 'Flagship System: SAP Performance & SQL Trace Analyzer',
    highlight: 'ST12 / ST03 Trace Analytics with Automated N+1 Detection',
    points: [
      'Identifies statements executed in loops (1,840 executions in loops accounting for 86% of runtime).',
      'Recommends Open SQL optimization with "FOR ALL ENTRIES IN", delivering a proven 11.7x performance gain.',
      'Backed by 38 automated test cases comparing baseline vs regressed execution plans.',
      'Turns complex ST12/ST03 trace dumps into clear, actionable developer recommendations.',
    ],
  },
  {
    index: 'Slide 05 / 05',
    title: 'Business Continuity & Operational Readiness',
    highlight: 'HANA RPO Compliance, DR Verification & CAB Preparation',
    points: [
      'Measures backup freshness against signed RPO SLA and tracks restore test evidence expiration.',
      'Published 10 distinct SAP open-source repositories with 529 automated tests on GitHub (Revanth2716).',
      'Honest, demonstrable portfolio: every finding, screenshot, and trace is drawn from authentic running systems.',
      'Immediate availability for full-time Entry-Level SAP BASIS Analyst roles.',
    ],
  },
];

export default function ExecutivePitchDeckModal({ isOpen, onClose }: PitchDeckProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  if (!isOpen) return null;

  const currentSlide = SLIDES[currentIdx];

  const handlePrev = () => {
    playUiClick();
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  const handleNext = () => {
    playUiClick();
    if (currentIdx < SLIDES.length - 1) setCurrentIdx(currentIdx + 1);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBar}>
          <div className={styles.deckTitle}>
            <Presentation size={18} color="#00c4ff" />
            <span>60-Second SAP BASIS Executive Pitch Deck</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className={styles.slideIndex}>{currentSlide.index}</span>
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className={styles.slideContent}>
          <h3 className={styles.slideHeading}>{currentSlide.title}</h3>

          <div className={styles.highlightBanner}>
            <span>{currentSlide.highlight}</span>
          </div>

          <ul className={styles.pointsList}>
            {currentSlide.points.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </div>

        <div className={styles.bottomNav}>
          <button className={styles.navBtn} onClick={handlePrev} disabled={currentIdx === 0}>
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Slide {currentIdx + 1} of {SLIDES.length}
          </span>

          <button
            className={styles.navBtn}
            onClick={handleNext}
            disabled={currentIdx === SLIDES.length - 1}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
