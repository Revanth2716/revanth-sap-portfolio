'use client';

import React, { useState } from 'react';
import {
  Activity,
  Zap,
  TrendingDown,
  Database,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { playUiClick, playUiSuccess } from '@/utils/soundEffects';
import styles from './TraceAnalyzerLab.module.css';

export default function TraceAnalyzerLab() {
  const [isOptimized, setIsOptimized] = useState<boolean>(false);

  const toggleOptimization = () => {
    playUiClick();
    const next = !isOptimized;
    setIsOptimized(next);
    if (next) playUiSuccess();
  };

  return (
    <section id="trace-lab" className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Activity size={14} />
          <span>ST12 & ST03 Diagnostics</span>
        </div>
        <h2 className={styles.title}>ST12 SQL Trace Analyzer & N+1 Query Lab</h2>
        <p className={styles.description}>
          In enterprise SAP landscapes, 85%+ of response time degradation comes from avoidable ABAP
          database access anti-patterns. This lab demonstrates how my{' '}
          <code>sap-performance-analyzer</code> identifies 1,840 executions in loops and delivers an
          instant 11.7x speedup.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.comparisonGrid}>
          {/* Baseline Trace */}
          <div className={styles.traceBox}>
            <div className={styles.boxHeader}>
              <span className={styles.boxTitle}>
                <AlertCircle size={18} color="#f87171" />
                <span>Before: Nested SELECT in LOOP</span>
              </span>
              <span style={{ fontSize: '0.78rem', color: '#f87171', fontWeight: 600 }}>
                CRITICAL BOTTLENECK
              </span>
            </div>

            <div className={styles.statRow}>
              <div className={styles.statCard}>
                <span className={`${styles.statVal} ${styles.statValRed}`}>1,840</span>
                <span className={styles.statLabel}>SQL Executions</span>
              </div>
              <div className={styles.statCard}>
                <span className={`${styles.statVal} ${styles.statValRed}`}>4,820 ms</span>
                <span className={styles.statLabel}>DB Response Time</span>
              </div>
              <div className={styles.statCard}>
                <span className={`${styles.statVal} ${styles.statValRed}`}>86.4%</span>
                <span className={styles.statLabel}>Share of Runtime</span>
              </div>
            </div>

            <pre className={styles.abapCodeBox}>
{`* ANTI-PATTERN: SELECT single inside a loop
LOOP AT it_vbrk INTO DATA(wa_vbrk).
  SELECT SINGLE * FROM bkpf
    INTO @DATA(wa_bkpf)
    WHERE bukrs = @wa_vbrk-bukrs
      AND belnr = @wa_vbrk-belnr.
  " Processing lines...
ENDLOOP.`}
            </pre>
          </div>

          {/* Optimized Trace */}
          <div className={styles.traceBox}>
            <div className={styles.boxHeader}>
              <span className={styles.boxTitle}>
                <CheckCircle2 size={18} color="#34d399" />
                <span>After: FOR ALL ENTRIES IN</span>
              </span>
              <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 600 }}>
                11.7x PERFORMANCE GAIN
              </span>
            </div>

            <div className={styles.statRow}>
              <div className={styles.statCard}>
                <span className={`${styles.statVal} ${styles.statValGreen}`}>
                  {isOptimized ? '1' : '1,840'}
                </span>
                <span className={styles.statLabel}>SQL Executions</span>
              </div>
              <div className={styles.statCard}>
                <span className={`${styles.statVal} ${styles.statValGreen}`}>
                  {isOptimized ? '410 ms' : '4,820 ms'}
                </span>
                <span className={styles.statLabel}>DB Response Time</span>
              </div>
              <div className={styles.statCard}>
                <span className={`${styles.statVal} ${styles.statValGreen}`}>
                  {isOptimized ? '9.2%' : '86.4%'}
                </span>
                <span className={styles.statLabel}>Share of Runtime</span>
              </div>
            </div>

            <pre className={styles.abapCodeBox}>
{`* BEST PRACTICE: Bulk read with FOR ALL ENTRIES
IF it_vbrk IS NOT INITIAL.
  SELECT bukrs, belnr, gjahr, bldat
    FROM bkpf
    FOR ALL ENTRIES IN @it_vbrk
    WHERE bukrs = @it_vbrk-bukrs
      AND belnr = @it_vbrk-belnr
    INTO TABLE @DATA(lt_bkpf).
ENDIF.`}
            </pre>
          </div>
        </div>

        <button className={styles.optimizeBtn} onClick={toggleOptimization}>
          <Zap size={18} />
          <span>
            {isOptimized
              ? 'Reset to Raw ST12 Trace'
              : 'Execute 1-Click ABAP Query Optimization (11.7x Speedup)'}
          </span>
        </button>
      </div>
    </section>
  );
}
