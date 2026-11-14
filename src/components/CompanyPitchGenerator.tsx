'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, Building2, Send } from 'lucide-react';
import { playUiClick, playUiSuccess } from '@/utils/soundEffects';
import styles from './CompanyPitchGenerator.module.css';

const SAP_COMPANIES = [
  'Deloitte',
  'Accenture',
  'Capgemini',
  'PwC',
  'EY',
  'Infosys',
  'Wipro',
  'TCS',
  'SAP Labs',
  'IBM',
];

export default function CompanyPitchGenerator() {
  const [companyName, setCompanyName] = useState<string>('Deloitte');
  const [copied, setCopied] = useState<boolean>(false);

  const generatePitch = (company: string) => {
    const clean = company.trim() || 'your SAP Practice';
    return `Dear ${clean} SAP Practice & Hiring Team,

I am writing to express my strong enthusiasm for Entry-Level SAP BASIS Analyst roles within ${clean}. As a Computer Science graduate from KL University (8.33 / 10 CGPA) with an eight-month SAP BASIS internship completed at Eezycode Software Private Limited, I have developed solid foundational expertise in SAP NetWeaver 7.5 dual-stack architecture (AS ABAP & AS Java), transport management (SE09/STMS), background job health (SM37), and role administration (SU01/PFCG).

To build real-world capability beyond classroom theory, I have authored and published ten open-source SAP repositories (github.com/Revanth2716) backed by 529 automated tests. These systems directly tackle day-to-day BASIS responsibilities:
- An integrated NetWeaver Operations Portal connecting Java/JSP to SAP via RFC (JCo) and RFC-enabled ABAP function modules.
- A Change and Transport System (TMS) tracking engine that queries transport tables directly and automates release checklists.
- A Segregation-of-Duties (SoD) audit engine performing recursive composite-role expansion and conflict scoring.
- An ST12/ST03 trace diagnostic tool that flags N+1 query loops inside ABAP loops (delivering an 11.7x performance gain).

Certified in Microsoft Azure Fundamentals, Oracle Cloud Infrastructure, and AWS Cloud Foundations, and open to relocate immediately to Bangalore or Hyderabad, I am eager to contribute to ${clean}'s mission-critical SAP client landscapes.

Thank you for your time and consideration.

Best regards,
Yarramsetti Revanth
Entry-Level SAP BASIS Analyst
yarramsettirevanth27@gmail.com | +91 9959429448 | linkedin.com/in/revanthyarramsett1627i`;
  };

  const handleCopy = () => {
    playUiClick();
    navigator.clipboard.writeText(generatePitch(companyName));
    setCopied(true);
    playUiSuccess();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Building2 size={14} />
          <span>Automated Recruiter Outreach</span>
        </div>
        <h2 className={styles.title}>Company-Tailored SAP Engineering Pitch Generator</h2>
        <p className={styles.description}>
          Select a top enterprise SAP employer or type your organization. Synthesize a tailored cover
          letter highlighting my NetWeaver 7.5 experience, Eezycode internship, and 9 published
          repositories.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.inputRow}>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Type company name (e.g., Deloitte, Accenture, SAP Labs)..."
            className={styles.companyInput}
          />
        </div>

        <div className={styles.quickPills}>
          {SAP_COMPANIES.map((c) => (
            <button
              key={c}
              className={`${styles.pill} ${companyName === c ? styles.activePill : ''}`}
              onClick={() => {
                playUiClick();
                setCompanyName(c);
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <pre className={styles.pitchOutput}>{generatePitch(companyName)}</pre>

        <button className={styles.copyBtn} onClick={handleCopy}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'Pitch Copied to Clipboard!' : 'Copy Tailored Pitch'}</span>
        </button>
      </div>
    </section>
  );
}
