'use client';

import React from 'react';
import {
  Briefcase,
  GraduationCap,
  Award,
  ShieldCheck,
  Cloud,
  Cpu,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import styles from './CredentialsSection.module.css';

interface Cert {
  name: string;
  issuer: string;
  icon: React.ElementType;
}

const CERTS: Cert[] = [
  {
    name: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft Certified',
    icon: Cloud,
  },
  {
    name: 'Oracle Cloud Infrastructure Foundations Associate',
    issuer: 'Oracle Certified',
    icon: ShieldCheck,
  },
  {
    name: 'AWS Academy Graduate: Cloud Foundations',
    issuer: 'Amazon Web Services',
    icon: Cloud,
  },
  {
    name: 'Automation Anywhere Advanced RPA Professional (2022)',
    issuer: 'Automation Anywhere',
    icon: Cpu,
  },
  {
    name: 'Scrum Foundation Professional Certificate (SFPC)',
    issuer: 'CertiProf Agile Framework',
    icon: Award,
  },
];

export default function CredentialsSection() {
  return (
    <section id="credentials" className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Award size={14} />
          <span>Verified Professional Background</span>
        </div>
        <h2 className={styles.title}>Experience, Education & Certifications</h2>
        <p className={styles.description}>
          Authentic foundation combining an 8-month SAP BASIS internship, computer science degree from
          KL University with an 8.33 CGPA, and recognized cloud and agile credentials.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Experience & Education Column */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <Briefcase size={20} color="#00c4ff" />
            <span>Professional SAP Experience</span>
          </div>

          <div className={styles.expItem}>
            <div className={styles.expHeader}>
              <div>
                <h4 className={styles.roleTitle}>Associate SAP BASIS Analyst Intern</h4>
                <span className={styles.companyName}>
                  Eezycode Software Private Limited · Hyderabad, India
                </span>
              </div>
              <span className={styles.datePill}>Feb 2026 – Oct 2026</span>
            </div>

            <ul className={styles.bulletList}>
              <li>
                Studied SAP ERP architecture and how FI, CO, SD, MM, and HR modules connect in
                everyday business processes.
              </li>
              <li>
                Learned SAP BASIS system operations, including user administration, role management,
                and authorizations.
              </li>
              <li>
                Became familiar with SAP transaction codes and data structures, and studied
                configuration, customizing, and system maintenance.
              </li>
              <li>
                Learned ABAP fundamentals: syntax, variables, data types, and control statements.
              </li>
            </ul>
          </div>

          <div className={styles.cardTitle} style={{ marginTop: '0.5rem' }}>
            <GraduationCap size={20} color="#00c4ff" />
            <span>Academic Degree</span>
          </div>

          <div className={styles.expItem}>
            <div className={styles.expHeader}>
              <div>
                <h4 className={styles.roleTitle}>Bachelor of Technology (B.Tech), CSE</h4>
                <span className={styles.companyName}>KL University · Vaddeswaram, India</span>
              </div>
              <span className={styles.datePill}>2020 – 2024</span>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>
              Cumulative Grade Point Average (CGPA):{' '}
              <strong style={{ color: '#00c4ff' }}>8.33 / 10</strong>
            </p>
          </div>
        </div>

        {/* Certifications & Languages Column */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <Award size={20} color="#f59e0b" />
            <span>Verified Certifications</span>
          </div>

          <div className={styles.certsGrid}>
            {CERTS.map((cert) => {
              const Icon = cert.icon;
              return (
                <div key={cert.name} className={styles.certCard}>
                  <Icon size={18} color="#00c4ff" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h5 className={styles.certName}>{cert.name}</h5>
                    <span className={styles.certIssuer}>{cert.issuer}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.cardTitle} style={{ marginTop: '0.5rem' }}>
            <Globe size={20} color="#10b981" />
            <span>Spoken Languages</span>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '0.8rem',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
              }}
            >
              <strong style={{ color: '#fff' }}>English:</strong>{' '}
              <span style={{ color: '#94a3b8' }}>Fluent</span>
            </div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
              }}
            >
              <strong style={{ color: '#fff' }}>Telugu:</strong>{' '}
              <span style={{ color: '#94a3b8' }}>Native</span>
            </div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
              }}
            >
              <strong style={{ color: '#fff' }}>Hindi:</strong>{' '}
              <span style={{ color: '#94a3b8' }}>Conversational</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
