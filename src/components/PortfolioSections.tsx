'use client';

import React, { useState } from 'react';
import {
  Github,
  Layers,
  Code2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Activity,
  GitBranch,
  Database,
  Archive,
} from 'lucide-react';
import { playUiClick } from '@/utils/soundEffects';
import styles from './PortfolioSections.module.css';

export interface SapProject {
  id: string;
  title: string;
  category: string;
  domain: 'all' | 'basis' | 'integration' | 'performance' | 'continuity' | 'clean-core' | 'transport' | 'upgrade';
  description: string;
  testsBadge: string;
  tags: string[];
  githubUrl: string;
  image: string;
}

export const SAP_PROJECTS: SapProject[] = [
  {
    id: 'ops-console',
    title: 'SAP BASIS Ops Console',
    category: 'Monitoring & Access Governance',
    domain: 'basis',
    description:
      'Transport, job health and access governance toolkit answering what is stuck (SE09), what is broken (SM37), and what is unsafe (SU01/PFCG). Features automated composite role expansion, criticality scoring, RFC-enabled ABAP function modules, and SAP Java Connector integration.',
    testsBadge: '31 Tests Passing (pytest)',
    tags: ['Python 3.12', 'SQLite', 'ANSI SQL', 'ABAP FM', 'SAP JCo', 'NetWeaver 7.5'],
    githubUrl: 'https://github.com/Revanth2716/sap-basis-ops-console',
    image: '/screenshots/cli-output.png',
  },
  {
    id: 'operations-portal',
    title: 'SAP BASIS Operations Portal',
    category: 'Operations & Leave Governance',
    domain: 'basis',
    description:
      'Integrated NetWeaver 7.5 Java application delivering employee leave self-service with maker-checker approvals, transport governance with automated release checklist generation, background job scoring, and segregation-of-duties conflict detection.',
    testsBadge: '62 Tests Passing (JUnit 5)',
    tags: ['Java 8', 'Spring Boot 2.7', 'NetWeaver Java Stack', 'RFC', 'SAP JCo', 'HANA SQL'],
    githubUrl: 'https://github.com/Revanth2716/sap-basis-operations-portal',
    image: '/screenshots/dashboard.png',
  },
  {
    id: 'custom-code',
    title: 'SAP Custom Code & Impact Analyzer',
    category: 'Repository Analysis & Clean Core',
    domain: 'clean-core',
    description:
      'Repository analysis for SAP custom code in upgrade preparation and cleanup projects: transitive where-used dependency graph traversal, dead code detection, quality rule scanning, and Clean Core S/4HANA upgrade compatibility roadmaps.',
    testsBadge: '61 Tests Passing (JUnit 5)',
    tags: ['Java 8', 'Spring Boot', 'Transitive Graph', 'Clean Core', 'Where-Used', 'S/4HANA'],
    githubUrl: 'https://github.com/Revanth2716/sap-custom-code-analyzer',
    image: '/screenshots/impact.png',
  },
  {
    id: 'interface-cockpit',
    title: 'SAP Interface Cockpit',
    category: 'RFC · IDoc · BAPI Integration',
    domain: 'integration',
    description:
      'Integration operations for SAP landscapes: RFC, IDoc and BAPI SLA monitoring, actionable error triage catalogue that groups hundreds of raw log rows into root causes, rule-based alerting, and failed message replay queue.',
    testsBadge: '50 Tests Passing (JUnit 5)',
    tags: ['Java 8', 'Spring Boot', 'IDoc ORDERS05', 'RFC Monitoring', 'BAPI', 'Error Catalogue', 'SM58'],
    githubUrl: 'https://github.com/Revanth2716/sap-interface-cockpit',
    image: '/screenshots/interfaces.png',
  },
  {
    id: 'performance-analyzer',
    title: 'SAP Performance & Workload Analyzer',
    category: 'ST12 & ST03 SQL Trace Analysis',
    domain: 'performance',
    description:
      'SQL trace analysis for SAP landscapes: hot-spot ranking, automated N+1 query loop detection (identifying 1,840 executions in loops accounting for 86% of runtime), ST03 workload tuning, and baseline regression comparison.',
    testsBadge: '38 Tests Passing (JUnit 5)',
    tags: ['Java 8', 'Spring Boot', 'ST12 SQL Trace', 'ST03 Workload', 'N+1 Loop Detection', 'HANA Tuning'],
    githubUrl: 'https://github.com/Revanth2716/sap-performance-analyzer',
    image: '/screenshots/overview.png',
  },
  {
    id: 'backup-readiness',
    title: 'SAP Backup & Restore Readiness',
    category: 'Continuity, DR & Capacity',
    domain: 'continuity',
    description:
      'Continuity operations for SAP landscapes: backup freshness verification against the signed RPO, restore test evidence auditing, HANA data and log volume capacity forecasting, and per-system readiness scoring.',
    testsBadge: '54 Tests Passing (JUnit 5)',
    tags: ['Java 8', 'Spring Boot', 'RPO Lag Calculator', 'HANA Backup Catalog', 'Restore Evidence', 'DR'],
    githubUrl: 'https://github.com/Revanth2716/sap-backup-readiness',
    image: '/screenshots/readiness-dashboard.png',
  },
  {
    id: 'transport-analyzer',
    title: 'SAP Transport & Change Management Analyzer',
    category: 'Change, Transport & Release Management',
    domain: 'transport',
    description:
      'Change and transport management for SAP landscapes: object conflict detection across open transport requests — the case where two requests carry the same object and the second import silently overwrites the first — dependency chains resolved against the target system, import evidence verification, objects changed after the last transport, and a release train per target system with a generated import checklist.',
    testsBadge: '65 Tests Passing (JUnit 5)',
    tags: ['Java 8', 'Spring Boot', 'SE09 / STMS', 'Object Conflicts', 'Dependency Chains', 'Release Train'],
    githubUrl: 'https://github.com/Revanth2716/sap-transport-analyzer',
    image: '/screenshots/transport-dashboard.png',
  },
  {
    id: 'upgrade-readiness',
    title: 'SAP Upgrade & Support Package Readiness',
    category: 'Upgrades, Obsolete Components & Compatibility',
    domain: 'upgrade',
    description:
      'Upgrade readiness for SAP landscapes: obsolete components whose replaced product blocks an upgrade outright, component dependency consistency, patch level drift across the landscape, failed patches from the SPAM log, components left behind inside their own system, and a changelog viewer that isolates the incompatible changes a test team needs before a regression window opens.',
    testsBadge: '56 Tests Passing (JUnit 5)',
    tags: ['Java 8', 'Spring Boot', 'SPAM / SUM', 'Patch Levels', 'Obsolete Components', 'Incompatible Changes'],
    githubUrl: 'https://github.com/Revanth2716/sap-upgrade-readiness',
    image: '/screenshots/upgrade-readiness.png',
  },
];

interface PortfolioSectionsProps {
  onInspectProject: (title: string) => void;
}

export default function PortfolioSections({ onInspectProject }: PortfolioSectionsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects =
    activeFilter === 'all'
      ? SAP_PROJECTS
      : SAP_PROJECTS.filter((p) => p.domain === activeFilter);

  const handleFilterClick = (filter: string) => {
    playUiClick();
    setActiveFilter(filter);
  };

  return (
    <section id="projects" className={styles.portfolioSections}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge}>
          <Layers size={14} />
          <span>Verified NetWeaver 7.5 Systems</span>
        </div>
        <h2 className={styles.sectionTitle}>Flagship Open-Source SAP Repositories</h2>
        <p className={styles.sectionDescription}>
          Six distinct, production-grade repositories with zero overlap published under{' '}
          <code>github.com/Revanth2716</code>. Every project covers an authentic SAP BASIS workstream,
          features RFC-enabled ABAP modules, runs locally with seeded realistic NetWeaver scenarios, and is
          backed by extensive automated test suites.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        <button
          className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.filterBtnActive : ''}`}
          onClick={() => handleFilterClick('all')}
        >
          All Systems (8)
        </button>
        <button
          className={`${styles.filterBtn} ${
            activeFilter === 'basis' ? styles.filterBtnActive : ''
          }`}
          onClick={() => handleFilterClick('basis')}
        >
          BASIS Operations (2)
        </button>
        <button
          className={`${styles.filterBtn} ${
            activeFilter === 'integration' ? styles.filterBtnActive : ''
          }`}
          onClick={() => handleFilterClick('integration')}
        >
          Integration & RFC (1)
        </button>
        <button
          className={`${styles.filterBtn} ${
            activeFilter === 'performance' ? styles.filterBtnActive : ''
          }`}
          onClick={() => handleFilterClick('performance')}
        >
          Performance & SQL Trace (1)
        </button>
        <button
          className={`${styles.filterBtn} ${
            activeFilter === 'continuity' ? styles.filterBtnActive : ''
          }`}
          onClick={() => handleFilterClick('continuity')}
        >
          Continuity & DR (1)
        </button>
        <button
          className={`${styles.filterBtn} ${
            activeFilter === 'clean-core' ? styles.filterBtnActive : ''
          }`}
          onClick={() => handleFilterClick('clean-core')}
        >
          Clean Core & S/4HANA (1)
        </button>
        <button
          className={`${styles.filterBtn} ${
            activeFilter === 'transport' ? styles.filterBtnActive : ''
          }`}
          onClick={() => handleFilterClick('transport')}
        >
          Change & Transport (1)
        </button>
        <button
          className={`${styles.filterBtn} ${
            activeFilter === 'upgrade' ? styles.filterBtnActive : ''
          }`}
          onClick={() => handleFilterClick('upgrade')}
        >
          Upgrades & Compatibility (1)
        </button>
      </div>

      {/* Project Cards Grid */}
      <div className={styles.projectsGrid}>
        {filteredProjects.map((project) => (
          <article key={project.id} className={styles.projectCard}>
            <div className={styles.cardPreview}>
              <img
                src={project.image}
                alt={`${project.title} Screenshot`}
                className={styles.cardImage}
                onError={(e) => {
                  // Fallback if image path differs
                  (e.target as HTMLImageElement).src = '/screenshots/dashboard.png';
                }}
              />
            </div>

            <div className={styles.cardContent}>
              <div className={styles.cardMeta}>
                <span className={styles.categoryBadge}>{project.category}</span>
                <span className={styles.testBadge}>
                  <CheckCircle2 size={12} />
                  <span>{project.testsBadge}</span>
                </span>
              </div>

              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDescription}>{project.description}</p>

              <div className={styles.tagsList}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.cardFooter}>
                <button
                  className={styles.inspectBtn}
                  onClick={() => {
                    playUiClick();
                    onInspectProject(project.title);
                  }}
                >
                  <Code2 size={14} />
                  <span>Inspect Code & ABAP</span>
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.githubBtn}
                  onClick={() => playUiClick()}
                >
                  <Github size={14} />
                  <span>GitHub</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
