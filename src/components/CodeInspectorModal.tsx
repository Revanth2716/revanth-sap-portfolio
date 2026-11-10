'use client';

import React, { useState, useEffect } from 'react';
import { X, Copy, Check, ExternalLink, Terminal, FileCode2 } from 'lucide-react';
import { playUiClick, playUiSuccess } from '@/utils/soundEffects';
import styles from './CodeInspectorModal.module.css';

export interface ProjectCodeData {
  title: string;
  githubUrl: string;
  tabs: {
    filename: string;
    code: string;
  }[];
}

const DEFAULT_PROJECT_SNIPPETS: Record<string, ProjectCodeData> = {
  'SAP BASIS Ops Console': {
    title: 'SAP BASIS Ops Console | NetWeaver Governance Toolkit',
    githubUrl: 'https://github.com/Revanth2716/sap-basis-ops-console',
    tabs: [
      {
        filename: 'Z_OPS_EXTRACT.abap',
        code: `FUNCTION Z_OPS_EXTRACT.
*"----------------------------------------------------------------------
*"*"Local Interface:
*"  IMPORTING
*"     VALUE(IV_DAYS_STALE) TYPE  I DEFAULT 7
*"  TABLES
*"      ET_STALLED_TR STRUCTURE  TRSTATUS_ST
*"      ET_FAILED_JOBS STRUCTURE  TBTCO_ST
*"  EXCEPTIONS
*"      EXTRACTION_FAILED
*"----------------------------------------------------------------------
* Remote-Enabled Function Module (SE37) for SAP BASIS Telemetry
  DATA: lv_cutoff_date TYPE d.

  lv_cutoff_date = sy-datum - iv_days_stale.

  " Extract stalled transport requests from E070 / E07T
  SELECT trkorr, as4user, as4date, as4time, trstatus
    FROM e070
    INTO CORRESPONDING FIELDS OF TABLE @et_stalled_tr
    WHERE as4date < @lv_cutoff_date
      AND trstatus IN ('D', 'L'). " Modifiable or locked

  " Extract failed or cancelled background jobs from TBTCO
  SELECT jobname, jobcount, status, strtdate, strttime, enddate, endtime
    FROM tbtco
    INTO CORRESPONDING FIELDS OF TABLE @et_failed_jobs
    WHERE status IN ('A', 'F')   " Aborted or Failed
      AND strtdate >= @lv_cutoff_date.

ENDFUNCTION.`,
      },
      {
        filename: 'job_scorer.py',
        code: `# Rule-based background job criticality scoring engine
from typing import Dict, List, Any

BUSINESS_CRITICAL_PREFIXES = ('Z_PAYROLL', 'Z_BILLING', 'Z_FI_', 'Z_EDI_')

def score_job_finding(job: Dict[str, Any]) -> Dict[str, Any]:
    name = job.get('jobname', '').upper()
    status = job.get('status', '')
    duration_sec = job.get('duration_seconds', 0)

    # Base severity determination
    if status == 'A': # Aborted / Dumped
        if any(name.startswith(p) for p in BUSINESS_CRITICAL_PREFIXES):
            severity = 'CRITICAL'
            remediation = 'Immediate P1 escalation: Check ST22 dumps and lock state in SM12'
        else:
            severity = 'HIGH'
            remediation = 'Check job log in SM37 and system log in SM21'
    elif status == 'R' and duration_sec > 14400: # Running > 4 hours
        severity = 'MEDIUM'
        remediation = 'Investigate active work process in SM50 / SM66 for high DB read ratio'
    else:
        severity = 'LOW'
        remediation = 'Review periodic job schedule in SM36'

    return {
        'jobname': name,
        'severity': severity,
        'status': status,
        'remediation': remediation
    }`,
      },
      {
        filename: 'sod_expander.py',
        code: `# Composite Role Expander & Segregation of Duties Checker
def expand_composite_roles(user_roles: List[str], role_hierarchy: Dict[str, List[str]]) -> Set[str]:
    """Recursively expands composite roles into atomic single roles."""
    single_roles = set()
    for role in user_roles:
        if role in role_hierarchy:
            # Composite role -> expand children
            single_roles.update(expand_composite_roles(role_hierarchy[role], role_hierarchy))
        else:
            single_roles.add(role)
    return single_roles

def evaluate_sod_conflicts(user_id: str, expanded_roles: Set[str], conflict_matrix: List[Dict]) -> List[Dict]:
    violations = []
    for rule in conflict_matrix:
        has_role_a = rule['role_a'] in expanded_roles
        has_role_b = rule['role_b'] in expanded_roles
        if has_role_a and has_role_b:
            violations.append({
                'user': user_id,
                'rule_id': rule['id'],
                'risk': rule['risk_level'],
                'conflict': f"{rule['action_a']} (T-Code: {rule['tcode_a']}) vs {rule['action_b']} (T-Code: {rule['tcode_b']})"
            })
    return violations`,
      },
    ],
  },
  'SAP BASIS Operations Portal': {
    title: 'SAP BASIS Operations Portal | NetWeaver 7.5 Java Stack',
    githubUrl: 'https://github.com/Revanth2716/sap-basis-operations-portal',
    tabs: [
      {
        filename: 'Z_LEAVE_SUBMIT.abap',
        code: `FUNCTION Z_LEAVE_SUBMIT.
*"----------------------------------------------------------------------
*"*"Local Interface:
*"  IMPORTING
*"     VALUE(IV_PERNR) TYPE  PERSNO
*"     VALUE(IV_LEAVE_TYPE) TYPE  SUBTY
*"     VALUE(IV_START_DATE) TYPE  BEGDA
*"     VALUE(IV_END_DATE) TYPE  ENDDA
*"  EXPORTING
*"     VALUE(EV_STATUS) TYPE  CHAR10
*"     VALUE(EV_REQUEST_ID) TYPE  INT4
*"     VALUE(EV_MESSAGE) TYPE  BAPI_MSG
*"  EXCEPTIONS
*"      OVERLAPPING_REQUEST
*"      INSUFFICIENT_BALANCE
*"----------------------------------------------------------------------
* Remote-Enabled flag CHECKED in SE37 attribute screen
  DATA: lv_balance TYPE i,
        lv_requested TYPE i.

  " Calculate requested days
  lv_requested = iv_end_date - iv_start_date + 1.

  " Validate balance against custom HANA table ZLEAVE_BAL
  SELECT SINGLE balance FROM zleave_bal
    INTO @lv_balance
    WHERE pernr = @iv_pernr AND subty = @iv_leave_type.

  IF lv_requested > lv_balance.
    ev_status = 'REJECTED'.
    ev_message = 'Insufficient leave balance for employee.'.
    RAISE insufficient_balance.
  ENDIF.

  " Insert request with status PENDING_APPROVAL
  INSERT INTO zleave_app VALUES @( VALUE #(
    pernr = iv_pernr
    begda = iv_start_date
    endda = iv_end_date
    subty = iv_leave_type
    status = 'PENDING'
    created_at = sy-datum ) ).

  ev_status = 'SUBMITTED'.
  ev_message = 'Leave request submitted successfully.'.
ENDFUNCTION.`,
      },
      {
        filename: 'LeaveService.java',
        code: `package com.revanth.sap.portal.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LeaveService {

    private final SapRfcClient rfcClient;
    private final LeaveRepository leaveRepository;

    public LeaveService(SapRfcClient rfcClient, LeaveRepository leaveRepository) {
        this.rfcClient = rfcClient;
        this.leaveRepository = leaveRepository;
    }

    @Transactional
    public LeaveResponse submitLeave(LeaveRequest request) {
        // Enforce maker-checker policy: employees cannot approve their own leave
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new IllegalArgumentException("Start date cannot be after end date");
        }

        // Call RFC-enabled function module Z_LEAVE_SUBMIT via SAP JCo 3.1
        RfcResult rfcResult = rfcClient.execute("Z_LEAVE_SUBMIT", params -> {
            params.setValue("IV_PERNR", request.getEmployeeId());
            params.setValue("IV_LEAVE_TYPE", request.getLeaveType());
            params.setValue("IV_START_DATE", request.getStartDate().toString());
            params.setValue("IV_END_DATE", request.getEndDate().toString());
        });

        String status = rfcResult.getString("EV_STATUS");
        String message = rfcResult.getString("EV_MESSAGE");

        LeaveEntity entity = new LeaveEntity(request, status);
        leaveRepository.save(entity);

        return new LeaveResponse(entity.getId(), status, message);
    }
}`,
      },
      {
        filename: 'JCoClient.java',
        code: `package com.revanth.sap.portal.jco;

import com.sap.conn.jco.*;
import org.springframework.stereotype.Component;

@Component
public class SapRfcClient {

    private static final String DEST_NAME = "NPL_NETWEAVER";

    public JCoFunction getFunction(String functionName) throws JCoException {
        JCoDestination destination = JCoDestinationManager.getDestination(DEST_NAME);
        JCoRepository repository = destination.getRepository();
        JCoFunction function = repository.getFunction(functionName);
        if (function == null) {
            throw new IllegalStateException("Function " + functionName + " not found or not remote-enabled.");
        }
        return function;
    }

    public void execute(JCoFunction function) throws JCoException {
        JCoDestination destination = JCoDestinationManager.getDestination(DEST_NAME);
        function.execute(destination);
    }
}`,
      },
    ],
  },
  'SAP Custom Code & Impact Analyzer': {
    title: 'SAP Custom Code & Impact Analyzer | Clean Core Upgrade Preparation',
    githubUrl: 'https://github.com/Revanth2716/sap-custom-code-analyzer',
    tabs: [
      {
        filename: 'WhereUsedFinder.java',
        code: `package com.revanth.sap.customcode;

import java.util.*;

public class WhereUsedGraph {
    private final Map<String, Set<String>> callers = new HashMap<>();

    public void addDependency(String callerObject, String calledObject) {
        callers.computeIfAbsent(calledObject, k -> new HashSet<>()).add(callerObject);
    }

    public Set<String> getTransitiveImpact(String targetTableOrObject) {
        Set<String> visited = new LinkedHashSet<>();
        Queue<String> queue = new LinkedList<>();
        queue.add(targetTableOrObject);

        while (!queue.isEmpty()) {
            String current = queue.poll();
            Set<String> dependents = callers.getOrDefault(current, Collections.emptySet());
            for (String dep : dependents) {
                if (visited.add(dep)) {
                    queue.add(dep);
                }
            }
        }
        return visited;
    }
}`,
      },
      {
        filename: 'Z_CODE_SCAN.abap',
        code: `REPORT Z_CLEAN_CORE_SCANNER.
* Scans customer namespace (Z*, Y*) programs for Clean Core violations

SELECT obj_name, devclass, author
  FROM tadir
  INTO TABLE @DATA(lt_custom_objects)
  WHERE pgmid = 'R3TR'
    AND object IN ('PROG', 'CLAS', 'FUGR')
    AND obj_name LIKE 'Z%' OR obj_name LIKE 'Y%'.

LOOP AT lt_custom_objects INTO DATA(ls_obj).
  " Check for forbidden direct updates to standard SAP tables (e.g., BKPF, BSEG, VBAK)
  READ REPORT ls_obj-obj_name INTO DATA(lt_source).
  LOOP AT lt_source INTO DATA(lv_line).
    IF lv_line CS 'MODIFY bkpf' OR lv_line CS 'UPDATE bseg'.
      WRITE: / 'VIOLATION [Clean Core]: Direct standard table modification in', ls_obj-obj_name.
    ENDIF.
  ENDLOOP.
ENDLOOP.`,
      },
    ],
  },
  'SAP Interface Cockpit': {
    title: 'SAP Interface Cockpit | RFC · IDoc · BAPI Operations',
    githubUrl: 'https://github.com/Revanth2716/sap-interface-cockpit',
    tabs: [
      {
        filename: 'ErrorTriageEngine.java',
        code: `package com.revanth.sap.integration;

import java.util.regex.Pattern;

public class ErrorTriageEngine {

    public TriageResult classifyError(String interfaceName, String rawErrorText) {
        if (rawErrorText.contains("RFC_ERROR_SYSTEM_FAILURE") || rawErrorText.contains("CPIC-CALL: 'ThSAPCMRCV'")) {
            return new TriageResult(
                interfaceName,
                "RFC_DESTINATION_UNREACHABLE",
                "CRITICAL",
                "Target host unreachable or gateway down. Check RFC destination in SM59 and gateway log in SMGW."
            );
        } else if (rawErrorText.contains("NO_AUTHORIZATION") || rawErrorText.contains("S_TABU_DIS")) {
            return new TriageResult(
                interfaceName,
                "AUTH_MISSING_OBJECT",
                "HIGH",
                "Communication user lacks required authorization. Inspect SU53 and PFCG role assignment."
            );
        }
        return new TriageResult(interfaceName, "APPLICATION_ERROR", "MEDIUM", "Data validation error in payload.");
    }
}`,
      },
    ],
  },
  'SAP Performance & Workload Analyzer': {
    title: 'SAP Performance & Workload Analyzer | ST12 SQL Trace Diagnostics',
    githubUrl: 'https://github.com/Revanth2716/sap-performance-analyzer',
    tabs: [
      {
        filename: 'NPlusOneDetector.java',
        code: `package com.revanth.sap.performance;

import java.util.*;

public class NPlusOneDetector {

    public List<Finding> analyzeTrace(List<SqlTraceEntry> traceEntries) {
        Map<String, Integer> executionCounts = new HashMap<>();
        Map<String, Long> totalTimes = new HashMap<>();

        for (SqlTraceEntry entry : traceEntries) {
            String normalizedSql = entry.getNormalizedStatement();
            executionCounts.put(normalizedSql, executionCounts.getOrDefault(normalizedSql, 0) + 1);
            totalTimes.put(normalizedSql, totalTimes.getOrDefault(normalizedSql, 0L) + entry.getDurationMicro());
        }

        List<Finding> findings = new ArrayList<>();
        executionCounts.forEach((sql, count) -> {
            if (count > 100) {
                long durationMs = totalTimes.get(sql) / 1000;
                findings.add(new Finding(
                    "N+1_QUERY_LOOP",
                    "Statement executed " + count + " times inside a loop. Total time: " + durationMs + " ms.",
                    "Optimize with FOR ALL ENTRIES IN or an inner join in the open SQL query."
                ));
            }
        });
        return findings;
    }
}`,
      },
      {
        filename: 'Z_TRACE_READ.abap',
        code: `FUNCTION Z_TRACE_READ.
*"----------------------------------------------------------------------
*"*"Local Interface:
*"  IMPORTING
*"     VALUE(IV_TRACE_ID) TYPE  GUID_32
*"  TABLES
*"      ET_STATEMENTS STRUCTURE  ZPERF_STMT
*"----------------------------------------------------------------------
* Reads raw ST12 / ST05 trace tables and normalizes ABAP SQL statements
  SELECT stmt_id, sql_text, exec_count, total_time_us
    FROM zst12_trace_data
    INTO CORRESPONDING FIELDS OF TABLE @et_statements
    WHERE trace_id = @iv_trace_id
    ORDER BY total_time_us DESCENDING.
ENDFUNCTION.`,
      },
    ],
  },
  'SAP Backup & Restore Readiness': {
    title: 'SAP Backup & Restore Readiness | Continuity & RPO Verification',
    githubUrl: 'https://github.com/Revanth2716/sap-backup-readiness',
    tabs: [
      {
        filename: 'RpoCalculator.java',
        code: `package com.revanth.sap.continuity;

import java.time.Duration;
import java.time.Instant;

public class RpoCalculator {

    public RpoStatus evaluateRpo(Instant newestBackupTime, Duration signedRpoThreshold) {
        Duration currentLag = Duration.between(newestBackupTime, Instant.now());
        if (currentLag.compareTo(signedRpoThreshold) > 0) {
            return new RpoStatus(
                false,
                currentLag.toMinutes(),
                "BREACHED: Backup is " + currentLag.toMinutes() + " mins old (RPO limit: " + signedRpoThreshold.toMinutes() + " mins)."
            );
        }
        return new RpoStatus(true, currentLag.toMinutes(), "COMPLIANT with signed RPO contract.");
    }
}`,
      },
      {
        filename: 'CapacityForecaster.java',
        code: `package com.revanth.sap.continuity;

public class CapacityForecaster {

    public int calculateDaysToThreshold(double currentSizeGb, double totalCapacityGb, double dailyGrowthGb) {
        if (dailyGrowthGb <= 0) return 999;
        double usableFreeSpace = (totalCapacityGb * 0.90) - currentSizeGb; // 90% alert threshold
        if (usableFreeSpace <= 0) return 0;
        return (int) Math.floor(usableFreeSpace / dailyGrowthGb);
    }
}`,
      },
    ],
  },
};

interface CodeInspectorModalProps {
  projectTitle: string | null;
  onClose: () => void;
}

export default function CodeInspectorModal({
  projectTitle,
  onClose,
}: CodeInspectorModalProps) {
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    setActiveTabIdx(0);
    setCopied(false);
  }, [projectTitle]);

  if (!projectTitle) return null;

  const projectData =
    DEFAULT_PROJECT_SNIPPETS[projectTitle] ||
    DEFAULT_PROJECT_SNIPPETS['SAP BASIS Operations Portal'];

  const currentTab = projectData.tabs[activeTabIdx] || projectData.tabs[0];

  const handleCopy = () => {
    playUiClick();
    navigator.clipboard.writeText(currentTab.code);
    setCopied(true);
    playUiSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
        <div className={styles.windowHeader}>
          <div className={styles.windowActions}>
            <span className={`${styles.macDot} ${styles.dotClose}`} />
            <span className={`${styles.macDot} ${styles.dotMin}`} />
            <span className={`${styles.macDot} ${styles.dotMax}`} />
          </div>

          <span className={styles.modalTitle}>{projectData.title}</span>

          <button className={styles.closeIconBtn} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className={styles.tabsBar}>
          {projectData.tabs.map((tab, idx) => (
            <button
              key={tab.filename}
              className={`${styles.tabItem} ${idx === activeTabIdx ? styles.activeTab : ''}`}
              onClick={() => {
                playUiClick();
                setActiveTabIdx(idx);
              }}
            >
              <FileCode2 size={13} />
              <span>{tab.filename}</span>
            </button>
          ))}
        </div>

        <div className={styles.codeArea}>
          <pre className={styles.codeBlock}>
            <code>{currentTab.code}</code>
          </pre>
        </div>

        <div className={styles.modalFooter}>
          <div className={styles.footerLeft}>
            <Terminal size={14} color="#00c4ff" />
            <span>Deterministic Verified SAP Code</span>
          </div>

          <div className={styles.footerActions}>
            <button className={styles.btnSecondary} onClick={handleCopy}>
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Code'}</span>
            </button>

            <a
              href={projectData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
              onClick={() => playUiClick()}
            >
              <span>View on GitHub</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
