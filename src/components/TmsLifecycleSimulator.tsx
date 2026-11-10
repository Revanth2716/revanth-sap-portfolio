'use client';

import React, { useState } from 'react';
import {
  GitBranch,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Terminal,
  ShieldCheck,
} from 'lucide-react';
import { playUiClick, playUiSuccess, playUiAlert } from '@/utils/soundEffects';
import styles from './TmsLifecycleSimulator.module.css';

interface TmsStep {
  id: number;
  title: string;
  system: string;
  tcode: string;
  command: string;
  description: string;
  artifacts: string[];
}

const STEPS: TmsStep[] = [
  {
    id: 1,
    title: 'Object Capture & Task Release',
    system: 'DEV (NPL)',
    tcode: 'SE09 / SE10',
    command: 'tp check NPLK900142',
    description:
      'Developer captures RFC Function Module Z_LEAVE_SUBMIT and custom table ZLEAVE_APP in tasks NPLK900143 and NPLK900144. Tasks are verified for syntax errors and released.',
    artifacts: ['Task NPLK900143 (ABAP Workbench)', 'Task NPLK900144 (Dictionary)'],
  },
  {
    id: 2,
    title: 'Request Release & tp Export',
    system: 'DEV (NPL)',
    tcode: 'SE09 / tp',
    command: 'tp export NPLK900142 pf=/usr/sap/trans/bin/TP_DOMAIN_NPL.PFL',
    description:
      'Transport Dispatcher exports the main request container. The tp binary extracts repository delta into filesystem data files and cofiles.',
    artifacts: [
      '/usr/sap/trans/data/R900142.NPL (Data file)',
      '/usr/sap/trans/cofiles/K900142.NPL (Control file)',
    ],
  },
  {
    id: 3,
    title: 'QAS Import Queue Inspection',
    system: 'QAS (NPQ)',
    tcode: 'STMS_QA',
    command: 'tp addtobuffer NPLK900142 NPQ pf=...',
    description:
      'Target system QAS receives the transport buffer entry. Pre-import lock analysis ensures no concurrent object modifications exist in Quality Assurance.',
    artifacts: ['QAS Transport Buffer entry', 'Import Lock Status: OK'],
  },
  {
    id: 4,
    title: 'tp import Execution & Return Code',
    system: 'QAS (NPQ)',
    tcode: 'STMS / tp',
    command: 'tp import NPLK900142 NPQ client=100 pf=...',
    description:
      'Target tp executes DDIC activation, table conversion, report compilation, and application of dictionary objects.',
    artifacts: ['Import Log: /usr/sap/trans/log/NPLK900142.NPQ'],
  },
  {
    id: 5,
    title: 'Production Promotion & CAB Release',
    system: 'PRD (NPP)',
    tcode: 'STMS / Release Mgmt',
    command: 'tp import NPLK900142 NPP client=500',
    description:
      'Final promotion into Production after QA sign-off. Automated release checklist is generated with object inventories and post-import verification steps.',
    artifacts: ['Markdown Release Checklist', 'Production Audit Trail'],
  },
];

const RETURN_CODES = [
  {
    code: 'RC = 0',
    type: 'rc0',
    meaning: 'Import Successful',
    details: 'All ABAP objects and DDIC structures activated with zero errors or warnings.',
  },
  {
    code: 'RC = 4',
    type: 'rc4',
    meaning: 'Warning Issued',
    details: 'Minor non-blocking warning (e.g. generation warning for uncalled subroutine). Safe to promote.',
  },
  {
    code: 'RC = 8',
    type: 'rc8',
    meaning: 'Syntax Dump / Prerequisite Error',
    details: 'Dependent table structure missing or inactive include. Promotion halted; developer investigation required.',
  },
  {
    code: 'RC = 12',
    type: 'rc12',
    meaning: 'Fatal System Error',
    details: 'Database connection dropped, file share unreachable, or memory exhausted during table conversion.',
  },
];

export default function TmsLifecycleSimulator() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [activeRc, setActiveRc] = useState<number>(0);

  const step = STEPS[currentStepIdx];
  const rc = RETURN_CODES[activeRc];

  const handleStepClick = (idx: number) => {
    playUiClick();
    setCurrentStepIdx(idx);
  };

  const handleRcClick = (idx: number) => {
    if (idx === 0) playUiSuccess();
    else playUiAlert();
    setActiveRc(idx);
  };

  const generateChecklistMarkdown = () => {
    return `# SAP Change Advisory Board (CAB) - Release Checklist
Request ID: NPLK900142
Source: DEV (NPL) | Target: PRD (NPP)
Owner: Yarramsetti Revanth (Entry-Level SAP BASIS Analyst)
Status: TESTED IN QAS (${rc.code} - ${rc.meaning})

## 1. Captured Repository Objects:
- Function Module: Z_LEAVE_SUBMIT (RFC Remote-Enabled)
- Custom Table: ZLEAVE_APP (HANA Columnar)
- Data Elements: PERSNO, SUBTY, BEGDA, ENDDA

## 2. Pre-Import Verification:
- [x] Pre-requisite transports confirmed
- [x] No active locks on target tables (SM12 verified)
- [x] Batch jobs paused during import window (SM37)

## 3. Post-Import Verification:
- [ ] Verify RFC destination connectivity in SM59
- [ ] Run test execution via SE37 test harness
- [ ] Inspect system log in SM21 for runtime dumps (ST22)`;
  };

  return (
    <section id="tms-simulator" className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <GitBranch size={14} />
          <span>Interactive CTS / TMS Transport Engine</span>
        </div>
        <h2 className={styles.title}>Live SAP Transport Lifecycle & TMS Simulator</h2>
        <p className={styles.description}>
          Step through how transport request <code>NPLK900142</code> moves through a NetWeaver
          landscape: object capture in DEV, <code>tp export</code>, STMS queue inspection, return code
          evaluation (<code>RC=0/4/8/12</code>), and automated release checklist generation.
        </p>
      </div>

      <div className={styles.card}>
        {/* Step Progression Bar */}
        <div className={styles.timelineBar}>
          {STEPS.map((s, idx) => (
            <button
              key={s.id}
              className={`${styles.timelineStep} ${
                idx === currentStepIdx
                  ? styles.activeStep
                  : idx < currentStepIdx
                  ? styles.completedStep
                  : ''
              }`}
              onClick={() => handleStepClick(idx)}
            >
              <div className={styles.stepCircle}>
                {idx < currentStepIdx ? <CheckCircle2 size={16} /> : s.id}
              </div>
              <span className={styles.stepLabel}>{s.system}</span>
            </button>
          ))}
        </div>

        {/* Step Details & Controls */}
        <div className={styles.detailsGrid}>
          <div className={styles.detailBox}>
            <div className={styles.boxHeader}>
              <span className={styles.boxTitle}>
                <Terminal size={16} color="#00c4ff" />
                <span>
                  Step {step.id}: {step.title}
                </span>
              </span>
              <span className={styles.boxDesc}>T-Code: {step.tcode}</span>
            </div>

            <p className={styles.boxDesc}>{step.description}</p>

            <div className={styles.codePanel}>
              <span>$ {step.command}</span>
            </div>

            <div className={styles.boxDesc}>
              <strong>Generated File System Artifacts:</strong>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.4rem' }}>
                {step.artifacts.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.detailBox}>
            <div className={styles.boxHeader}>
              <span className={styles.boxTitle}>
                <ShieldCheck size={16} color="#f59e0b" />
                <span>Return Code Validation (STMS Log Analysis)</span>
              </span>
            </div>

            <p className={styles.boxDesc}>
              Select a return code to simulate import outcomes and see how the release checklist
              adapts:
            </p>

            <div className={styles.rcButtons}>
              {RETURN_CODES.map((r, idx) => (
                <button
                  key={r.code}
                  className={`${styles.rcBtn} ${styles[r.type]} ${
                    idx === activeRc ? styles.activeRc : ''
                  }`}
                  onClick={() => handleRcClick(idx)}
                >
                  {r.code}
                </button>
              ))}
            </div>

            <div
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.85rem' }}>
                {rc.meaning}
              </span>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                {rc.details}
              </p>
            </div>

            <span className={styles.boxTitle} style={{ fontSize: '0.85rem' }}>
              <FileText size={14} />
              <span>Automated Release Checklist (CAB Ready)</span>
            </span>

            <pre className={styles.checklistOutput}>{generateChecklistMarkdown()}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
