'use client';

import React, { useState } from 'react';
import { Printer, X, Copy, Check, FileText } from 'lucide-react';
import { playUiClick, playUiSuccess } from '@/utils/soundEffects';
import styles from './ResumeModal.module.css';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    playUiClick();
    window.print();
  };

  const copyPlainText = () => {
    playUiClick();
    const text = `YARRAMSETTI REVANTH
Entry-Level SAP BASIS Analyst
Hyderabad, Telangana, India (open to relocate to Bangalore) | 9959429448 | yarramsettirevanth27@gmail.com
LinkedIn: linkedin.com/in/revanthyarramsett1627i | GitHub: github.com/Revanth2716

PROFESSIONAL SUMMARY:
Computer Science graduate (B.Tech, 2024) who completed an eight-month SAP BASIS internship at Eezycode Software Private Limited. Built a Python and SQL toolkit that checks transports, background jobs and role assignments, using a seeded database that mimics SAP NetWeaver tables. Looking for an entry-level SAP BASIS role covering system monitoring, transport management and user administration.

TECHNICAL SKILLS:
SAP BASIS: Transport management, background job monitoring, user and role administration, authorizations, system health checks, SAP NetWeaver 7.5 architecture
SAP Development and Integration: ABAP (fundamentals), RFC-enabled function modules, SAP Java Connector (JCo), HANA SQL
SAP ERP: FI, CO, SD, MM and HR modules, master data and transactional data
Programming: Python 3.12, Java (fundamentals)
Databases and Systems: SQL, SQLite, Linux command line
Cloud: Microsoft Azure, AWS, Oracle Cloud Infrastructure (foundation level)

PROFESSIONAL EXPERIENCE:
Associate SAP BASIS Analyst Intern (Feb 2026 – Oct 2026)
Eezycode Software Private Limited, Hyderabad, India
• Studied SAP ERP architecture and how the FI, CO, SD, MM and HR modules connect in everyday business processes.
• Learned SAP BASIS system operations, including user administration, role management and authorizations.
• Became familiar with SAP transaction codes and data structures, and studied configuration, customizing and system maintenance.
• Learned ABAP fundamentals: syntax, variables, data types and control statements.

PROJECTS:
SAP BASIS Ops Console: Transport, Job Health and Access Governance Toolkit
Python 3.12, SQLite, SQL, ABAP, SAP JCo
• Built a Python toolkit that flags stalled transports, failing or long-running background jobs, and role assignments that create segregation-of-duties conflicts.
• Wrote extraction and analysis queries over transport, background-job and authorization data (for example TBTCR, AGR_USERS and AGR_DEFINE).
• Added rule-based scoring that ranks background jobs by business criticality and gives each finding a severity.
• Automated the health report and a Markdown release checklist generated from transport data.
• Wrote RFC-enabled ABAP function modules for transport and job extraction, SQL queries that run on both ANSI SQL and HANA, and a Java client built on SAP JCo.
• Used a seeded local SQLite database to simulate SAP NetWeaver data during development.

Other Projects:
• TaskFlow API: API built with Python, Flask and SQLite, covered by 16 pytest tests (github.com/Revanth2716/taskflow-api).
• University ERP System: full-stack application using Node.js, Express, TypeScript, Prisma and React, with 29 automated tests.

EDUCATION:
KL University, Vaddeswaram (2020 – 2024)
Bachelor of Technology (B.Tech), Computer Science and Engineering | CGPA: 8.33/10

CERTIFICATIONS:
Microsoft Certified: Azure Fundamentals; Oracle Cloud Infrastructure Foundations Associate; AWS Academy Graduate, AWS Academy Cloud Foundations; Automation Anywhere Advanced RPA Professional (2022); Scrum Foundation Professional Certificate (SFPC)

LANGUAGES:
English (fluent), Telugu (native), Hindi (conversational)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    playUiSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBar}>
          <div className={styles.topTitle}>
            <FileText size={16} color="#00c4ff" />
            <span>ATS-Friendly Print-Ready Resume</span>
          </div>

          <div className={styles.topActions}>
            <button className={styles.printBtn} onClick={handlePrint}>
              <Printer size={14} />
              <span>Print A4 / Save PDF</span>
            </button>

            <button className={styles.copyBtn} onClick={copyPlainText}>
              {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
              <span>{copied ? 'Copied Plain Text!' : 'Copy Plain Text'}</span>
            </button>

            <button className={styles.closeBtn} onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className={styles.resumeBody}>
          <div className={styles.nameHeader}>
            <h1 className={styles.name}>YARRAMSETTI REVANTH</h1>
            <h2 className={styles.targetRole}>Entry-Level SAP BASIS Analyst</h2>
            <p className={styles.contactLine}>
              Hyderabad, Telangana, India (open to relocate to Bangalore) | 9959429448 |{' '}
              <a href="mailto:yarramsettirevanth27@gmail.com">yarramsettirevanth27@gmail.com</a>
              <br />
              LinkedIn:{' '}
              <a
                href="https://linkedin.com/in/revanthyarramsett1627i"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/revanthyarramsett1627i
              </a>{' '}
              | GitHub:{' '}
              <a href="https://github.com/Revanth2716" target="_blank" rel="noopener noreferrer">
                github.com/Revanth2716
              </a>
            </p>
          </div>

          {/* Summary */}
          <section className={styles.section}>
            <h3 className={styles.secTitle}>Professional Summary</h3>
            <p>
              Computer Science graduate (B.Tech, 2024) who completed an eight-month SAP BASIS internship
              at Eezycode Software Private Limited. Built a Python and SQL toolkit that checks
              transports, background jobs and role assignments, using a seeded database that mimics SAP
              NetWeaver tables. Looking for an entry-level SAP BASIS role covering system monitoring,
              transport management and user administration.
            </p>
          </section>

          {/* Technical Skills */}
          <section className={styles.section}>
            <h3 className={styles.secTitle}>Technical Skills</h3>
            <p>
              <strong>SAP BASIS:</strong> Transport management, background job monitoring, user and role
              administration, authorizations, system health checks, SAP NetWeaver 7.5 architecture
              <br />
              <strong>SAP Development and Integration:</strong> ABAP (fundamentals), RFC-enabled
              function modules, SAP Java Connector (JCo), HANA SQL
              <br />
              <strong>SAP ERP:</strong> FI, CO, SD, MM and HR modules, master data and transactional
              data
              <br />
              <strong>Programming:</strong> Python 3.12, Java (fundamentals)
              <br />
              <strong>Databases and Systems:</strong> SQL, SQLite, Linux command line
              <br />
              <strong>Cloud:</strong> Microsoft Azure, AWS, Oracle Cloud Infrastructure (foundation
              level)
            </p>
          </section>

          {/* Professional Experience */}
          <section className={styles.section}>
            <h3 className={styles.secTitle}>Professional Experience</h3>
            <div className={styles.jobItem}>
              <div className={styles.jobHeader}>
                <span>Associate SAP BASIS Analyst Intern</span>
                <span>Feb 2026 – Oct 2026</span>
              </div>
              <div className={styles.jobSub}>
                Eezycode Software Private Limited, Hyderabad, India
              </div>
              <ul className={styles.bullets}>
                <li>
                  Studied SAP ERP architecture and how the FI, CO, SD, MM and HR modules connect in
                  everyday business processes.
                </li>
                <li>
                  Learned SAP BASIS system operations, including user administration, role management and
                  authorizations.
                </li>
                <li>
                  Became familiar with SAP transaction codes and data structures, and studied
                  configuration, customizing and system maintenance.
                </li>
                <li>
                  Learned ABAP fundamentals: syntax, variables, data types and control statements.
                </li>
              </ul>
            </div>
          </section>

          {/* Projects */}
          <section className={styles.section}>
            <h3 className={styles.secTitle}>Projects</h3>
            <div className={styles.jobItem}>
              <div className={styles.jobHeader}>
                <span>SAP BASIS Ops Console: Transport, Job Health and Access Governance Toolkit</span>
              </div>
              <div className={styles.jobSub}>Python 3.12, SQLite, SQL, ABAP, SAP JCo</div>
              <ul className={styles.bullets}>
                <li>
                  Built a Python toolkit that flags stalled transports, failing or long-running background
                  jobs, and role assignments that create segregation-of-duties conflicts.
                </li>
                <li>
                  Wrote extraction and analysis queries over transport, background-job and authorization
                  data (for example TBTCR, AGR_USERS and AGR_DEFINE).
                </li>
                <li>
                  Added rule-based scoring that ranks background jobs by business criticality and gives each
                  finding a severity.
                </li>
                <li>
                  Automated the health report and a Markdown release checklist generated from transport
                  data.
                </li>
                <li>
                  Wrote RFC-enabled ABAP function modules for transport and job extraction, SQL queries
                  that run on both ANSI SQL and HANA, and a Java client built on SAP JCo.
                </li>
                <li>
                  Used a seeded local SQLite database to simulate SAP NetWeaver data during development.
                </li>
              </ul>
            </div>

            <div className={styles.jobItem} style={{ marginTop: '0.8rem' }}>
              <div className={styles.jobHeader}>
                <span>Other Projects</span>
              </div>
              <ul className={styles.bullets}>
                <li>
                  <strong>TaskFlow API:</strong> API built with Python, Flask and SQLite, covered by 16
                  pytest tests (<code>github.com/Revanth2716/taskflow-api</code>).
                </li>
                <li>
                  <strong>University ERP System:</strong> Full-stack application using Node.js, Express,
                  TypeScript, Prisma and React, with 29 automated tests.
                </li>
              </ul>
            </div>
          </section>

          {/* Education */}
          <section className={styles.section}>
            <h3 className={styles.secTitle}>Education</h3>
            <div className={styles.jobItem}>
              <div className={styles.jobHeader}>
                <span>KL University, Vaddeswaram</span>
                <span>2020 – 2024</span>
              </div>
              <p style={{ margin: '0.2rem 0' }}>
                Bachelor of Technology (B.Tech), Computer Science and Engineering |{' '}
                <strong>CGPA: 8.33/10</strong>
              </p>
            </div>
          </section>

          {/* Certifications */}
          <section className={styles.section}>
            <h3 className={styles.secTitle}>Certifications</h3>
            <p>
              Microsoft Certified: Azure Fundamentals; Oracle Cloud Infrastructure Foundations
              Associate; AWS Academy Graduate, AWS Academy Cloud Foundations; Automation Anywhere
              Advanced RPA Professional (2022); Scrum Foundation Professional Certificate (SFPC)
            </p>
          </section>

          {/* Languages */}
          <section className={styles.section} style={{ marginBottom: 0 }}>
            <h3 className={styles.secTitle}>Languages</h3>
            <p>English (fluent), Telugu (native), Hindi (conversational)</p>
          </section>
        </div>
      </div>
    </div>
  );
}
