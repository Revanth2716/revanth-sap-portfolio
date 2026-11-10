'use client';

import React, { useState } from 'react';
import {
  Share2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { playUiClick, playUiSuccess } from '@/utils/soundEffects';
import styles from './InterfaceCockpitSandbox.module.css';

interface InterfaceRow {
  name: string;
  type: 'RFC' | 'IDoc' | 'BAPI';
  direction: 'Inbound' | 'Outbound';
  slaMs: number;
  avgMs: number;
  status: 'HEALTHY' | 'FAILED' | 'RECOVERED';
  cause?: string;
}

export default function InterfaceCockpitSandbox() {
  const [isReplayed, setIsReplayed] = useState<boolean>(false);

  const interfaces: InterfaceRow[] = [
    {
      name: 'RFC_ORDERS_RECEIVE',
      type: 'RFC',
      direction: 'Inbound',
      slaMs: 500,
      avgMs: isReplayed ? 340 : 5400,
      status: isReplayed ? 'RECOVERED' : 'FAILED',
      cause: isReplayed ? undefined : 'CPIC-CALL: Connection refused on port 3300',
    },
    {
      name: 'IDOC_ORDERS05_IN',
      type: 'IDoc',
      direction: 'Inbound',
      slaMs: 1000,
      avgMs: isReplayed ? 420 : 1800,
      status: isReplayed ? 'RECOVERED' : 'FAILED',
      cause: isReplayed ? undefined : 'Status 51: Missing auth S_TABU_DIS for RFC_COMM',
    },
    {
      name: 'BAPI_MATERIAL_SAVEDATA',
      type: 'BAPI',
      direction: 'Inbound',
      slaMs: 300,
      avgMs: 140,
      status: 'HEALTHY',
    },
    {
      name: 'RFC_INVOICE_POST',
      type: 'RFC',
      direction: 'Outbound',
      slaMs: 800,
      avgMs: 310,
      status: 'HEALTHY',
    },
  ];

  const handleReplay = () => {
    playUiClick();
    setIsReplayed(true);
    playUiSuccess();
  };

  const handleReset = () => {
    playUiClick();
    setIsReplayed(false);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Share2 size={14} />
          <span>Integration Operations & SLA Radar</span>
        </div>
        <h2 className={styles.title}>SAP Interface Cockpit & Error Triage Engine</h2>
        <p className={styles.description}>
          Interfaces fail at 03:00 and generate hundreds of redundant error rows in <code>SM58</code> and{' '}
          <code>WE02</code>. My <code>sap-interface-cockpit</code> collapses logs into single actionable
          causes, provides root-cause diagnosis, and manages idempotent message replays.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.interfaceTable}>
            <thead>
              <tr>
                <th>Interface Name</th>
                <th>Protocol</th>
                <th>Direction</th>
                <th>SLA Limit</th>
                <th>Measured Latency</th>
                <th>Current Status</th>
                <th>Root Cause Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {interfaces.map((row) => (
                <tr key={row.name}>
                  <td style={{ fontWeight: 600, color: '#fff' }}>{row.name}</td>
                  <td>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '0.75rem',
                      }}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td>{row.direction}</td>
                  <td>{row.slaMs} ms</td>
                  <td style={{ color: row.avgMs > row.slaMs ? '#f87171' : '#34d399' }}>
                    {row.avgMs} ms
                  </td>
                  <td>
                    {row.status === 'FAILED' ? (
                      <span className={styles.statusFailed}>FAILED (142 msgs)</span>
                    ) : row.status === 'RECOVERED' ? (
                      <span className={styles.statusOk}>RECOVERED (Processed)</span>
                    ) : (
                      <span className={styles.statusOk}>HEALTHY</span>
                    )}
                  </td>
                  <td>
                    {row.cause ? (
                      <span style={{ color: '#f87171', fontSize: '0.78rem' }}>{row.cause}</span>
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                        Within SLA threshold
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Triage Action Bar */}
        <div className={styles.triageCard}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
              {isReplayed
                ? 'Queue Cleared: 142 Messages Successfully Replayed (Status 53)'
                : 'Triage Recommendation: Correct RFC Destination in SM59 & Replay'}
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Action: Check RFC destination gateway connection test, grant <code>S_TABU_DIS</code>, and
              flush the tRFC / qRFC backlog.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {!isReplayed ? (
              <button className={styles.replayBtn} onClick={handleReplay}>
                <RefreshCw size={14} />
                <span>Simulate Fix & Replay Failed Queue</span>
              </button>
            ) : (
              <button
                className={styles.replayBtn}
                style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                onClick={handleReset}
              >
                <RotateCcw size={14} />
                <span>Reset Simulation</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
