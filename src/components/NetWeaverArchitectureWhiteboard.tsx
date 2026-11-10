'use client';

import React, { useState } from 'react';
import { Layers, Monitor, Cpu, Database, Network, ArrowDown, ChevronRight } from 'lucide-react';
import { playUiClick } from '@/utils/soundEffects';
import styles from './NetWeaverArchitectureWhiteboard.module.css';

interface TierData {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  protocols: string;
  components: string[];
  failureModes: string;
  keyTransactions: string;
}

const TIERS: TierData[] = [
  {
    id: 'tier1',
    name: 'Presentation Tier (UI & Client Layer)',
    subtitle: 'SAP GUI 7.70 · Fiori Horizon Launchpad · HTTP REST Clients',
    icon: Monitor,
    protocols: 'DIAG Protocol (Port 3200), HTTP/HTTPS (Port 8000/44300)',
    components: ['SAP GUI for Windows/Java', 'SAP Fiori Browser Launchpad', 'Third-Party REST / B2B APIs'],
    failureModes: 'Network latency, GUI disconnects, browser cache mismatches, expired SSO tokens',
    keyTransactions: 'SM04 (User List), AL08 (Global Users), SICF (HTTP Services)',
  },
  {
    id: 'tier2',
    name: 'Application Tier (NetWeaver 7.5 Dual-Stack AS)',
    subtitle: 'AS ABAP Dispatcher & Work Processes · AS Java Virtual Machine · JCo RFC Bridge',
    icon: Cpu,
    protocols: 'CPIC, RFC (Port 3300), SAP NI (Network Interface), Java Bytecode Execution',
    components: [
      'ABAP Dispatcher with DIA (Dialog), BGD (Batch), UPD (Update), SPO (Spool), ENQ (Enqueue)',
      'Internet Communication Manager (ICM) & SAP Web Dispatcher',
      'NetWeaver AS Java Runtime with Spring Boot / JSP servlet engines',
      'SAP Java Connector (sapjco3) connection pool manager',
    ],
    failureModes:
      'DIA work process exhaustion (HTTP 500 / Timeout), lock table overflows (SM12), RFC connection failures (SM58), short dumps (ST22)',
    keyTransactions: 'SM50, SM66, SM51, SM21, ST22, SM12, SM59, NWA',
  },
  {
    id: 'tier3',
    name: 'Database & Central Persistence Tier',
    subtitle: 'SAP HANA 2.0 In-Memory DB · Central CTS File Share (/usr/sap/trans)',
    icon: Database,
    protocols: 'HANA JDBC (Port 30015), SQL, NFS / SMB Shared Storage',
    components: [
      'SAP HANA 2.0 In-Memory Columnar Database (Row/Column Engine)',
      'HANA Persistence Layer (Data volumes & Log backup volume)',
      'Central Change and Transport System directory (/usr/sap/trans/data & /cofiles)',
    ],
    failureModes:
      'Log volume disk exhaustion (HANA freezes), uncommitted long-running updates, transport lock conflicts, delta merge overhead',
    keyTransactions: 'DB02, DBACOCKPIT, SE11, SE16, ST04',
  },
];

export default function NetWeaverArchitectureWhiteboard() {
  const [activeTierId, setActiveTierId] = useState<string>('tier2');

  const activeTier = TIERS.find((t) => t.id === activeTierId) || TIERS[1];

  const handleTierClick = (id: string) => {
    playUiClick();
    setActiveTierId(id);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Layers size={14} />
          <span>Interactive Enterprise Architecture</span>
        </div>
        <h2 className={styles.title}>SAP NetWeaver 7.5 Three-Tier Whiteboard</h2>
        <p className={styles.description}>
          Explore the end-to-end communication pathways of an enterprise SAP landscape. Click any tier
          to inspect its work processes, network protocols, failure modes, and monitoring transactions.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.tierGrid}>
          {TIERS.map((tier) => {
            const Icon = tier.icon;
            const isSelected = tier.id === activeTierId;
            return (
              <div
                key={tier.id}
                className={`${styles.tierCard} ${isSelected ? styles.activeTier : ''}`}
                onClick={() => handleTierClick(tier.id)}
              >
                <div>
                  <div className={styles.tierTitle}>
                    <Icon size={18} color="#00c4ff" />
                    <span>{tier.name}</span>
                  </div>
                  <div className={styles.tierDesc}>{tier.subtitle}</div>
                </div>
                <ChevronRight size={18} color={isSelected ? '#00c4ff' : '#64748b'} />
              </div>
            );
          })}
        </div>

        {/* Selected Tier Deep-Dive */}
        <div className={styles.tierDetailsPanel}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Network Protocols:</span>
            <span>{activeTier.protocols}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Core Components:</span>
            <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
              {activeTier.components.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Common Failure Modes:</span>
            <span style={{ color: '#f87171' }}>{activeTier.failureModes}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Primary Transactions:</span>
            <span style={{ color: '#34d399', fontFamily: 'monospace' }}>
              {activeTier.keyTransactions}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
