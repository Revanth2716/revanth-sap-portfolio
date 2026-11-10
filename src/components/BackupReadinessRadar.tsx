'use client';

import React, { useState } from 'react';
import { Database, ShieldCheck, AlertCircle, HardDrive, Clock, CheckCircle } from 'lucide-react';
import styles from './BackupReadinessRadar.module.css';

export default function BackupReadinessRadar() {
  const [rpoSlaMins, setRpoSlaMins] = useState<number>(30);
  const [lastBackupMins, setLastBackupMins] = useState<number>(18);
  const [daysSinceRestore, setDaysSinceRestore] = useState<number>(24);
  const [dailyGrowthGb, setDailyGrowthGb] = useState<number>(6);

  // RPO check: Is current lag within SLA?
  const isRpoCompliant = lastBackupMins <= rpoSlaMins;

  // Restore test evidence: Is last test < 90 days old?
  const isRestoreCompliant = daysSinceRestore <= 90;

  // Capacity runway: Assuming 100 GB usable free space
  const daysToFull = Math.max(1, Math.floor(120 / dailyGrowthGb));

  // Compute composite readiness score (0 - 100)
  let score = 50;
  if (isRpoCompliant) score += 25;
  if (isRestoreCompliant) score += 20;
  if (daysToFull > 30) score += 5;

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Database size={14} />
          <span>Continuity & Disaster Recovery</span>
        </div>
        <h2 className={styles.title}>HANA Backup RPO & DR Readiness Radar</h2>
        <p className={styles.description}>
          Every SAP landscape claims <em>&quot;we have backups&quot;</em>. This interactive continuity
          radar computes real-time RPO compliance, audits restore test evidence freshness, and models
          HANA disk capacity runway before thresholds trigger an outage.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.radarGrid}>
          {/* Sliders Column */}
          <div className={styles.controlsColumn}>
            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>
                <span>Signed RPO SLA Limit</span>
                <strong style={{ color: '#00c4ff' }}>{rpoSlaMins} mins</strong>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={rpoSlaMins}
                onChange={(e) => setRpoSlaMins(Number(e.target.value))}
                className={styles.sliderInput}
              />
            </div>

            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>
                <span>Current Backup Age (HANA Log & Data)</span>
                <strong style={{ color: isRpoCompliant ? '#34d399' : '#f87171' }}>
                  {lastBackupMins} mins ago
                </strong>
              </div>
              <input
                type="range"
                min="5"
                max="180"
                step="5"
                value={lastBackupMins}
                onChange={(e) => setLastBackupMins(Number(e.target.value))}
                className={styles.sliderInput}
              />
            </div>

            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>
                <span>Days Since Last Proven Restore Test</span>
                <strong style={{ color: isRestoreCompliant ? '#34d399' : '#fbbf24' }}>
                  {daysSinceRestore} days
                </strong>
              </div>
              <input
                type="range"
                min="5"
                max="180"
                step="5"
                value={daysSinceRestore}
                onChange={(e) => setDaysSinceRestore(Number(e.target.value))}
                className={styles.sliderInput}
              />
            </div>

            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>
                <span>HANA Data Volume Daily Growth</span>
                <strong style={{ color: '#00c4ff' }}>{dailyGrowthGb} GB / day</strong>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={dailyGrowthGb}
                onChange={(e) => setDailyGrowthGb(Number(e.target.value))}
                className={styles.sliderInput}
              />
            </div>
          </div>

          {/* Score & KPI Column */}
          <div className={styles.readinessScoreCard}>
            <div
              className={styles.scoreCircle}
              style={{
                borderColor: score >= 80 ? '#34d399' : score >= 60 ? '#fbbf24' : '#f87171',
                boxShadow: `0 0 24px ${
                  score >= 80 ? 'rgba(52, 211, 153, 0.4)' : 'rgba(248, 113, 113, 0.4)'
                }`,
              }}
            >
              <span>{score}</span>
            </div>

            <h4 style={{ color: '#fff', fontSize: '1.2rem', margin: '0.2rem 0' }}>
              System Readiness: {score >= 80 ? 'EXCELLENT' : score >= 60 ? 'ACCEPTABLE' : 'AT RISK'}
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              SID: NPP (Production) · Evaluated against enterprise continuity audit standard
            </p>

            <div className={styles.kpiRow}>
              <div className={styles.kpiBox}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={14} color={isRpoCompliant ? '#34d399' : '#f87171'} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#fff' }}>
                    RPO Status
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: isRpoCompliant ? '#34d399' : '#f87171',
                    display: 'block',
                    marginTop: '0.2rem',
                  }}
                >
                  {isRpoCompliant
                    ? 'COMPLIANT (Within signed SLA)'
                    : 'BREACHED (Exceeds SLA threshold)'}
                </span>
              </div>

              <div className={styles.kpiBox}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <HardDrive size={14} color="#00c4ff" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#fff' }}>
                    Storage Runway
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: daysToFull > 30 ? '#34d399' : '#f87171',
                    display: 'block',
                    marginTop: '0.2rem',
                  }}
                >
                  {daysToFull} days until 90% disk alert
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
