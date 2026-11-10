'use client';

import React from 'react';
import { Sliders, CheckCircle2, Split, ShieldCheck } from 'lucide-react';
import styles from './ArchitectureTradeoffsMatrix.module.css';

interface Tradeoff {
  patternA: string;
  patternB: string;
  decision: string;
  tradeoffSummary: string;
  rationale: string;
}

const TRADEOFFS: Tradeoff[] = [
  {
    patternA: 'Classic CTS Transport System (SE09 / STMS)',
    patternB: 'Git-Enabled CTS (abapGit Integration)',
    decision: 'Classic CTS for Customizing & Release Management; abapGit for Code Reviews',
    tradeoffSummary:
      'Classic CTS guarantees strict sequential transport numbering, table maintenance conversion, and landscape promotion logs. abapGit enables branching and pull requests on GitHub for custom code.',
    rationale:
      'Enterprise audit compliance requires CTS for production imports, while abapGit accelerates open-source development.',
  },
  {
    patternA: 'RFC-Enabled ABAP Function Module (SE37)',
    patternB: 'Direct JDBC Query on SAP HANA',
    decision: 'RFC Function Modules for Business Logic; JDBC only for Read-Only Analytics',
    tradeoffSummary:
      'Direct JDBC queries bypass SAP application validations, authorization checks (PFCG), and table buffer synchronization. RFC invokes true ABAP business validation logic.',
    rationale:
      'Modifying SAP tables via direct JDBC risks database inconsistency and violates SAP warranty policies.',
  },
  {
    patternA: 'Periodic Cron Background Job (SM36)',
    patternB: 'Event-Driven Workflow Trigger (SWE2 / Events)',
    decision: 'Event-Driven for Time-Sensitive Transactions; Cron for Bulk Reconciliation',
    tradeoffSummary:
      'Polling background jobs every 5 minutes wastes work processes and risks contention. Event-driven triggers fire only when business objects change.',
    rationale:
      'Events eliminate unnecessary batch process consumption while preserving system capacity during peak hours.',
  },
  {
    patternA: 'ST12 Combined Trace (ABAP + SQL)',
    patternB: 'ST05 SQL Trace Alone',
    decision: 'ST12 for End-to-End Bottlenecks; ST05 for Detailed Index & Statement Plans',
    tradeoffSummary:
      'ST05 records database statements only. ST12 combines ABAP procedural execution time with database trace rows to pinpoint whether latency originates in application code loops or database indexes.',
    rationale:
      'ST12 immediately caught the 1,840-loop statement in our performance analyzer project, whereas ST05 only showed the statement was fast in isolation.',
  },
  {
    patternA: 'Composite Role Architecture',
    patternB: 'Atomic Single Roles with Derivation',
    decision: 'Derived Single Roles with Strict Segregation of Duties Governance',
    tradeoffSummary:
      'Composite roles simplify assignment but conceal toxic SoD combinations from standard SU01 reports. Derived roles inherit organizational levels while keeping authorizations auditable.',
    rationale:
      'Automated composite-role expansion is essential to prevent conflicting authorizations in enterprise audits.',
  },
];

export default function ArchitectureTradeoffsMatrix() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Sliders size={14} />
          <span>Architectural Decision Records (ADRs)</span>
        </div>
        <h2 className={styles.title}>SAP Enterprise Architecture & Trade-Offs</h2>
        <p className={styles.description}>
          Engineering decisions in SAP landscapes require evaluating reliability, security governance,
          auditability, and database throughput. Here are the trade-offs implemented across my systems.
        </p>
      </div>

      <div className={styles.card}>
        {TRADEOFFS.map((t, idx) => (
          <div key={idx} className={styles.tradeoffItem}>
            <div className={styles.tradeoffHeader}>
              <span className={styles.tradeoffTitle}>
                {t.patternA} <span style={{ color: '#00c4ff' }}>vs</span> {t.patternB}
              </span>
              <span className={styles.winnerPill}>{t.decision}</span>
            </div>

            <p className={styles.tradeoffText}>{t.tradeoffSummary}</p>

            <div className={styles.rationaleBox}>
              <strong>Production Rationale:</strong> {t.rationale}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
