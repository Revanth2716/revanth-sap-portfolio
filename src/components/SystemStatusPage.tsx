'use client';

import React from 'react';
import { Activity, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import styles from './SystemStatusPage.module.css';

interface SystemLandscapeItem {
  sid: string;
  role: string;
  version: string;
  uptimePct: string;
  status: 'ONLINE' | 'WARNING' | 'MAINTENANCE';
  warningText?: string;
}

const SYSTEMS: SystemLandscapeItem[] = [
  {
    sid: 'DEV (NPL)',
    role: 'Development & Customizing Workbench',
    version: 'NetWeaver 7.52 SP04 · SAP HANA 2.0',
    uptimePct: '99.98%',
    status: 'ONLINE',
  },
  {
    sid: 'QAS (NPQ)',
    role: 'Quality Assurance & Integration Staging',
    version: 'NetWeaver 7.52 SP04 · SAP HANA 2.0',
    uptimePct: '99.96%',
    status: 'ONLINE',
  },
  {
    sid: 'PRD (NPP)',
    role: 'Production High-Availability Landscape',
    version: 'NetWeaver 7.52 · Active/Passive Cluster',
    uptimePct: '99.995%',
    status: 'ONLINE',
  },
  {
    sid: 'SOL (Solution Manager)',
    role: 'CTS Domain Controller & EarlyWatch Alert',
    version: 'Solution Manager 7.2 SP14',
    uptimePct: '100.0%',
    status: 'ONLINE',
  },
  {
    sid: 'BW (Business Warehouse)',
    role: 'Enterprise Analytics & Data Mart',
    version: 'BW on HANA 7.50',
    uptimePct: '99.92%',
    status: 'WARNING',
    warningText: 'Storage Threshold Alert: Table space PSAPSR3 is 82% utilized',
  },
];

export default function SystemStatusPage() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Activity size={14} />
          <span>Landscape Availability SLA</span>
        </div>
        <h2 className={styles.title}>Production Landscape & 90-Day Uptime</h2>
        <p className={styles.description}>
          Enterprise availability dashboard tracking health, version levels, and SLA uptime across
          development, quality assurance, production, and solution manager instances.
        </p>
      </div>

      <div className={styles.card}>
        {SYSTEMS.map((sys) => (
          <div key={sys.sid} className={styles.systemRow}>
            <div className={styles.rowHeader}>
              <div>
                <span className={styles.systemName}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: sys.status === 'ONLINE' ? '#10b981' : '#fbbf24',
                      boxShadow: `0 0 8px ${sys.status === 'ONLINE' ? '#10b981' : '#fbbf24'}`,
                    }}
                  />
                  <span>{sys.sid}</span>
                </span>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  {sys.role} · {sys.version}
                </span>
              </div>

              <span className={styles.slaBadge}>{sys.uptimePct} SLA</span>
            </div>

            {/* 90-day Availability Bars */}
            <div className={styles.barStrip}>
              {new Array(60).fill(0).map((_, i) => {
                const isWarn = sys.status === 'WARNING' && i > 52;
                return (
                  <div
                    key={i}
                    className={`${styles.dayBar} ${isWarn ? styles.dayBarWarning : ''}`}
                    title={`Day ${90 - 60 + i}: Operational (0 incidents)`}
                  />
                );
              })}
            </div>

            <div className={styles.stripFooter}>
              <span>60 days ago</span>
              {sys.warningText && (
                <span style={{ color: '#fbbf24', fontWeight: 600 }}>{sys.warningText}</span>
              )}
              <span>Today (Operational)</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
