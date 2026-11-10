'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Layers,
  AlertTriangle,
  ArrowRight,
  Lock,
  Unlock,
} from 'lucide-react';
import { playUiClick, playUiAlert, playUiSuccess } from '@/utils/soundEffects';
import styles from './SodSecurityMatrix.module.css';

interface RoleState {
  hasFinanceManager: boolean;
  hasBuyer: boolean;
}

export default function SodSecurityMatrix() {
  const [roles, setRoles] = useState<RoleState>({
    hasFinanceManager: true,
    hasBuyer: false,
  });

  const toggleFinanceMgr = () => {
    const next = !roles.hasFinanceManager;
    setRoles((prev) => ({ ...prev, hasFinanceManager: next }));
    if (next) playUiAlert();
    else playUiSuccess();
  };

  const toggleBuyer = () => {
    playUiClick();
    setRoles((prev) => ({ ...prev, hasBuyer: !prev.hasBuyer }));
  };

  const hasConflict = roles.hasFinanceManager;

  return (
    <section id="sod-matrix" className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <ShieldAlert size={14} />
          <span>Access Governance & Authorizations</span>
        </div>
        <h2 className={styles.title}>Segregation of Duties (SoD) & Role Hierarchy Matrix</h2>
        <p className={styles.description}>
          Standard SAP <code>SU01</code> lists user roles without expanding composite role
          hierarchies. This simulator demonstrates how composite role <code>Z_FI_FINANCE_MGR</code>{' '}
          expands recursively to reveal hidden toxic combinations that violate international audit
          standards.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.matrixGrid}>
          {/* Role Hierarchy Visualizer */}
          <div className={styles.hierarchyBox}>
            <span className={styles.boxTitle}>
              <UserCheck size={16} color="#00c4ff" />
              <span>User Master Record: J_DOE (SU01)</span>
            </span>

            <div className={styles.userCard}>
              <div>
                <strong style={{ color: '#fff' }}>User: J_DOE</strong>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  Finance Department · Client 100
                </p>
              </div>
              <button
                style={{
                  background: roles.hasFinanceManager
                    ? 'rgba(239, 68, 68, 0.2)'
                    : 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid currentColor',
                  color: roles.hasFinanceManager ? '#f87171' : '#34d399',
                  padding: '0.35rem 0.8rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                onClick={toggleFinanceMgr}
              >
                {roles.hasFinanceManager
                  ? 'Revoke Z_FI_FINANCE_MGR'
                  : 'Assign Z_FI_FINANCE_MGR'}
              </button>
            </div>

            <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              Composite Hierarchy Expansion (<code>AGR_USERS</code> → <code>AGR_DEFINE</code>):
            </span>

            {roles.hasFinanceManager ? (
              <div className={styles.roleTree}>
                <div className={styles.compositeRoleCard}>
                  <strong style={{ color: '#fbbf24', fontSize: '0.85rem' }}>
                    Composite Role: Z_FI_FINANCE_MGR
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Parent container (Contains 2 atomic single roles)
                  </span>

                  <div className={styles.singleRoleGrid}>
                    <div className={styles.singleRoleCard}>
                      <strong style={{ color: '#fff' }}>Z_FI_AP_CLERK</strong>
                      <span style={{ color: '#f87171' }}>• T-Code: FB60 (Enter Invoice)</span>
                      <span style={{ color: '#94a3b8' }}>• Object: F_BKPF_BUK (Actvt: 01)</span>
                    </div>

                    <div className={styles.singleRoleCard}>
                      <strong style={{ color: '#fff' }}>Z_FI_AP_APPROVER</strong>
                      <span style={{ color: '#f87171' }}>• T-Code: F-53 (Post Payment)</span>
                      <span style={{ color: '#94a3b8' }}>• Object: F_BKPF_BUK (Actvt: 14)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  padding: '1.5rem',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  color: '#94a3b8',
                  fontSize: '0.85rem',
                }}
              >
                No conflicting composite roles assigned. Clean authorization state.
              </div>
            )}
          </div>

          {/* Conflict Analysis & Remediation */}
          <div className={styles.hierarchyBox}>
            <span className={styles.boxTitle}>
              <ShieldAlert size={16} color={hasConflict ? '#f87171' : '#34d399'} />
              <span>Real-Time Audit Evaluation Engine</span>
            </span>

            {hasConflict ? (
              <div className={styles.conflictAlertCard}>
                <div className={styles.alertHeader}>
                  <AlertTriangle size={20} />
                  <span>CRITICAL SoD CONFLICT DETECTED</span>
                </div>

                <div className={styles.violationList}>
                  <div className={styles.violationItem}>
                    <strong style={{ color: '#f87171' }}>Rule ID: SOD-FI-001 (High Risk)</strong>
                    <span>
                      Vendor Invoice Entry (<code>FB60</code>) paired with Outgoing Payment Execution (
                      <code>F-53</code>) under the same user account.
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      Threat: Allows unauthorized vendor creation and disbursement without secondary maker-checker approval.
                    </span>
                  </div>
                </div>

                <div className={styles.remediationBox}>
                  <strong>Recommended Remediation Runbook:</strong>
                  <p style={{ marginTop: '0.3rem', lineHeight: 1.5 }}>
                    1. Use transaction <code>PFCG</code> to split <code>Z_FI_FINANCE_MGR</code>.<br />
                    2. Maintain payment authorization (<code>F-53</code>) exclusively in managerial accounts.<br />
                    3. Capture role change in customizing transport for audit compliance.
                  </p>
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  borderRadius: '14px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  textAlign: 'center',
                }}
              >
                <ShieldCheck size={48} color="#34d399" />
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                    100% Audit Compliant
                  </h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                    Zero segregation of duties conflicts found. Atomic single roles follow least-privilege
                    guidelines.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
