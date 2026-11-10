'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles } from 'lucide-react';
import { playUiClick, playTechChime } from '@/utils/soundEffects';
import styles from './TerminalSimulator.module.css';

interface CommandHistory {
  command: string;
  output: string;
}

const INITIAL_GREETING = `========================================================================
  SAP GUI / SAPSH ENTERPRISE CONSOLE — NETWEAVER 7.52 SP04 (SID: NPL)
========================================================================
Type 'help' to see available transaction codes or click shortcut pills below.
Ready for evaluation.`;

export default function TerminalSimulator() {
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'status',
      output: `SYSTEM STATUS:
  System ID (SID): NPL | Instance: 00 | Host: vhcalnplsaci
  Kernel Release: 753 SP04 | Architecture: 64-bit Linux x86_64
  Database: SAP HANA 2.0 (HDB 2.00.045) | Schema: SAPHANADB
  AS ABAP DIA Workers: 8 (0 queued) | AS Java VM: Active on Port 50000
  CTS File Share: /usr/sap/trans (Mounted, 142 GB Free)`,
    },
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    let response = '';

    switch (trimmed) {
      case 'help':
        response = `AVAILABLE SAP COMMANDS & TRANSACTION CODES:
  tcode se09   - Inspect Transport Organizer status and modifiable requests
  tcode sm37   - View background batch job health and failure triage
  tcode su01   - Inspect user authorizations and composite role expansion
  tcode su53   - Display authorization failure trace & missing objects
  tcode st22   - Read simulated ABAP runtime dump (TIME_OUT analysis)
  tcode st03   - Workload analysis summary (response time breakdown)
  status       - NetWeaver landscape health (SID, Kernel, DB, Memory)
  about        - Summary of background, KL University (8.33 CGPA), Eezycode internship
  projects     - List 6 open-source SAP repositories
  certs        - Verified certifications (Azure, Oracle, AWS, RPA, Scrum)
  contact      - Email, phone, LinkedIn, and GitHub links
  clear        - Clear terminal output history`;
        break;

      case 'tcode se09':
      case 'se09':
        response = `TRANSPORT ORGANIZER (SE09):
  Request: NPLK900142 | Status: Modifiable (In QA Queue) | Owner: REVANTH
  Description: Employee Leave Self-Service RFC Integration & ZLEAVE_APP
  Captured Tasks:
    - NPLK900143: Function Module Z_LEAVE_SUBMIT (Released, RC=0)
    - NPLK900144: Table Definition ZLEAVE_APP (Released, RC=0)
  Target System: NPQ (Quality Assurance) | Layer: ZNPL`;
        break;

      case 'tcode sm37':
      case 'sm37':
        response = `BACKGROUND JOB OVERVIEW (SM37):
  [ABORTED] Z_PAYROLL_RUN_01 (Jobcount: 03140201) | User: BATCH_USER
    - Error: TIME_OUT in report Z_PAYROLL_CALC (Exceeded 600s DIA limit)
    - Severity: CRITICAL | Recommended action: Reschedule in BGD work process
  [FINISHED] Z_TMS_BUFFER_SYNC (Jobcount: 03120000) | Duration: 12s (RC=0)
  [ACTIVE]   Z_IDOC_DISPATCH (Jobcount: 03150000) | Running 45s (DIA WP 3)`;
        break;

      case 'tcode su01':
      case 'su01':
        response = `USER MASTER RECORD (SU01):
  User: J_DOE | Type: Dialog | Client: 100 | Status: Unlocked
  Assigned Composite Role: Z_FI_FINANCE_MGR
  Expanded Single Roles:
    -> Z_FI_AP_CLERK    (T-Code: FB60, Object: F_BKPF_BUK)
    -> Z_FI_AP_APPROVER (T-Code: F-53, Object: F_BKPF_BUK)
  AUDIT WARNING: Segregation of duties conflict detected (SOD-FI-001).`;
        break;

      case 'tcode su53':
      case 'su53':
        response = `AUTHORIZATION CHECK FAILING (SU53):
  Failed Object: S_TABU_DIS (Table Maintenance)
  Checked Fields:
    - ACTVT: 03 (Display)
    - DICBERCLS: &NC& (Tables without auth group)
  User: RFC_COMM | Calling Program: SAPLSE16N | Return Code: 12
  Remediation: Authorize authorization group &NC& in role Z_BASIS_OPERATOR.`;
        break;

      case 'tcode st22':
      case 'st22':
        response = `ABAP RUNTIME SHORT DUMP (ST22):
  Runtime Error: TIME_OUT | ABAP Program: Z_BILLING_REP
  Triggered By: User J_DOE | Server: vhcalnplsaci_NPL_00
  Cause: Maximum uninterrupted run time of 600 seconds exceeded inside loop:
    -> Line 42: SELECT * FROM bkpf WHERE bukrs = wa_vbrk-bukrs...
  Remediation: Refactor nested SELECT into 'FOR ALL ENTRIES IN' (validated in ST12 lab).`;
        break;

      case 'tcode st03':
      case 'st03':
        response = `WORKLOAD & PERFORMANCE OVERVIEW (ST03):
  Task Type: Dialog (DIA) | Total Steps: 42,500
    - Avg Response Time: 340 ms
    - Avg CPU Time: 45 ms
    - Avg DB Request Time: 210 ms (61.7% of total step time)
  Task Type: RFC | Total Steps: 18,200 | Avg Response Time: 85 ms
  Database Wait Ratio: HEALTHY (HANA in-memory cache hit: 99.4%)`;
        break;

      case 'status':
        response = `SYSTEM STATUS:
  System ID (SID): NPL | Instance: 00 | Host: vhcalnplsaci
  Kernel Release: 753 SP04 | Architecture: 64-bit Linux x86_64
  Database: SAP HANA 2.0 (HDB 2.00.045) | Schema: SAPHANADB
  AS ABAP DIA Workers: 8 (0 queued) | AS Java VM: Active on Port 50000
  CTS File Share: /usr/sap/trans (Mounted, 142 GB Free)`;
        break;

      case 'about':
        response = `PROFILE:
  Name: Yarramsetti Revanth
  Role: Entry-Level SAP BASIS Analyst
  Experience: 8-Month SAP BASIS Internship at Eezycode Software Private Limited
  Education: B.Tech Computer Science & Engineering (2020 - 2024), KL University | CGPA: 8.33 / 10
  Location: Hyderabad, Telangana, India (Open to relocate to Bangalore)
  Key Stack: NetWeaver 7.5 (ABAP + Java), SAP JCo, RFC, HANA SQL, Transport Mgmt, User/Role Admin`;
        break;

      case 'projects':
        response = `PUBLISHED SAP REPOSITORIES (github.com/Revanth2716):
  1. sap-basis-ops-console       - Transport, job health & SoD toolkit (Python, 31 tests)
  2. sap-basis-operations-portal  - Leave self-service & governance (Java 8 / Spring Boot, 62 tests)
  3. sap-custom-code-analyzer    - Where-used & clean core analyzer (Java 8, 61 tests)
  4. sap-interface-cockpit       - RFC, IDoc & BAPI monitoring (Java 8, 50 tests)
  5. sap-performance-analyzer    - ST12 / ST03 trace analyzer (Java 8, 38 tests)
  6. sap-backup-readiness        - Continuity & DR readiness (Java 8, 53 tests)
  Total: 295 Automated Tests Passing.`;
        break;

      case 'certs':
        response = `VERIFIED CERTIFICATIONS:
  - Microsoft Certified: Azure Fundamentals
  - Oracle Cloud Infrastructure Foundations Associate
  - AWS Academy Graduate: AWS Academy Cloud Foundations
  - Automation Anywhere Advanced RPA Professional (2022)
  - Scrum Foundation Professional Certificate (SFPC)`;
        break;

      case 'contact':
        response = `CONTACT & OUTREACH:
  - Email: yarramsettirevanth27@gmail.com
  - Phone: +91 9959429448
  - LinkedIn: linkedin.com/in/revanthyarramsett1627i
  - GitHub: github.com/Revanth2716`;
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        response = `Unknown command: '${cmdStr}'. Type 'help' to inspect available SAP transaction codes.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cmdStr, output: response }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    playTechChime();
    executeCommand(inputVal);
    setInputVal('');
  };

  return (
    <section id="terminal" className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Terminal size={14} />
          <span>Interactive SAPSH Console</span>
        </div>
        <h2 className={styles.title}>Interactive SAP Terminal Emulator</h2>
        <p className={styles.description}>
          Execute authentic SAP transaction codes directly in your browser. Inspect transport requests
          (<code>se09</code>), background jobs (<code>sm37</code>), authorization objects (
          <code>su01/su53</code>), and ABAP short dumps (<code>st22</code>).
        </p>
      </div>

      <div className={styles.terminalCard}>
        <div className={styles.terminalHeader}>
          <div className={styles.dotsGroup}>
            <span className={`${styles.macDot} ${styles.dotRed}`} />
            <span className={`${styles.macDot} ${styles.dotYellow}`} />
            <span className={`${styles.macDot} ${styles.dotGreen}`} />
          </div>
          <span className={styles.terminalTitle}>SAPSH 7.52 — vhcalnplsaci (SID: NPL)</span>
          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Client 100</span>
        </div>

        <div className={styles.terminalBody}>
          <div className={styles.greetingText}>{INITIAL_GREETING}</div>

          {history.map((h, i) => (
            <div key={i} className={styles.historyItem}>
              <div className={styles.commandPrompt}>
                <span>npladm@vhcalnplsaci:~ $</span>
                <span style={{ color: '#fff' }}>{h.command}</span>
              </div>
              <div className={styles.commandOutput}>{h.output}</div>
            </div>
          ))}

          <form onSubmit={handleSubmit} className={styles.inputRow}>
            <span style={{ color: '#00c4ff' }}>npladm@vhcalnplsaci:~ $</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type 'help' or an SAP tcode (e.g., 'tcode se09')..."
              className={styles.cliInput}
              autoComplete="off"
              spellCheck="false"
            />
          </form>

          <div ref={terminalBottomRef} />
        </div>

        {/* Quick Command Pills */}
        <div className={styles.quickCommandsBar}>
          <button className={styles.quickBtn} onClick={() => executeCommand('tcode se09')}>
            tcode se09
          </button>
          <button className={styles.quickBtn} onClick={() => executeCommand('tcode sm37')}>
            tcode sm37
          </button>
          <button className={styles.quickBtn} onClick={() => executeCommand('tcode su01')}>
            tcode su01
          </button>
          <button className={styles.quickBtn} onClick={() => executeCommand('tcode st22')}>
            tcode st22
          </button>
          <button className={styles.quickBtn} onClick={() => executeCommand('status')}>
            status
          </button>
          <button className={styles.quickBtn} onClick={() => executeCommand('projects')}>
            projects
          </button>
        </div>
      </div>
    </section>
  );
}
