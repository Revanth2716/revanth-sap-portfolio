'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Layers,
  Cpu,
  Terminal,
  Award,
  Mail,
  Code2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Zap,
  Globe,
  FileText,
  Activity,
  Presentation,
  Database,
  GitBranch,
} from 'lucide-react';
import { playUiClick, playUiSuccess, playUiWhoosh } from '@/utils/soundEffects';
import styles from './CommandPalette.module.css';

interface PaletteAction {
  id: string;
  title: string;
  group: 'Navigation' | 'Projects' | 'Quick Actions';
  icon: React.ElementType;
  badge?: string;
  handler: () => void;
}

interface CommandPaletteProps {
  onOpenProjectCode?: (title: string) => void;
  onOpenResume?: () => void;
  onOpenPitchDeck?: () => void;
}

export default function CommandPalette({
  onOpenProjectCode,
  onOpenResume,
  onOpenPitchDeck,
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    playUiClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyText = (text: string) => {
    setIsOpen(false);
    navigator.clipboard.writeText(text);
    playUiSuccess();
  };

  const actions: PaletteAction[] = [
    // Navigation
    {
      id: 'nav-projects',
      title: 'Navigate to 8 Flagship SAP Repositories',
      group: 'Navigation',
      icon: Layers,
      badge: '6 Repos',
      handler: () => scrollTo('projects'),
    },
    {
      id: 'nav-spatial',
      title: 'Navigate to 3D NetWeaver 7.5 Landscape',
      group: 'Navigation',
      icon: Cpu,
      badge: 'Three.js',
      handler: () => scrollTo('spatial-graph'),
    },
    {
      id: 'nav-tms',
      title: 'Navigate to Live TMS Transport Simulator',
      group: 'Navigation',
      icon: GitBranch,
      badge: 'SE09 / STMS',
      handler: () => scrollTo('tms-simulator'),
    },
    {
      id: 'nav-sod',
      title: 'Navigate to SoD Composite Role Matrix',
      group: 'Navigation',
      icon: ShieldCheck,
      badge: 'SU01 / PFCG',
      handler: () => scrollTo('sod-matrix'),
    },
    {
      id: 'nav-trace',
      title: 'Navigate to ST12 SQL Trace Analyzer Lab',
      group: 'Navigation',
      icon: Activity,
      badge: 'ST12 / ST03',
      handler: () => scrollTo('trace-lab'),
    },
    {
      id: 'nav-tests',
      title: 'Navigate to In-Browser Test Runner (417 Tests)',
      group: 'Navigation',
      icon: Zap,
      badge: '417 Tests',
      handler: () => scrollTo('unit-tests'),
    },
    {
      id: 'nav-terminal',
      title: 'Navigate to Interactive SAP Terminal CLI',
      group: 'Navigation',
      icon: Terminal,
      badge: 'SAPSH',
      handler: () => scrollTo('terminal'),
    },
    {
      id: 'nav-credentials',
      title: 'Navigate to Experience & Certifications',
      group: 'Navigation',
      icon: Award,
      badge: 'Eezycode / KL Univ',
      handler: () => scrollTo('credentials'),
    },
    {
      id: 'nav-contact',
      title: 'Navigate to Direct Contact Section',
      group: 'Navigation',
      icon: Mail,
      badge: 'Reach Out',
      handler: () => scrollTo('contact'),
    },

    // Quick Actions
    {
      id: 'qa-resume',
      title: 'Open 1-Click ATS Printable Resume',
      group: 'Quick Actions',
      icon: FileText,
      badge: 'Print A4 / PDF',
      handler: () => {
        setIsOpen(false);
        playUiClick();
        onOpenResume?.();
      },
    },
    {
      id: 'qa-pitch',
      title: 'Open 60-Second Recruiter Pitch Deck',
      group: 'Quick Actions',
      icon: Presentation,
      badge: '5 Slides',
      handler: () => {
        setIsOpen(false);
        playUiClick();
        onOpenPitchDeck?.();
      },
    },
    {
      id: 'qa-copy-email',
      title: 'Copy Email to Clipboard (yarramsettirevanth27@gmail.com)',
      group: 'Quick Actions',
      icon: Copy,
      badge: 'Copy',
      handler: () => copyText('yarramsettirevanth27@gmail.com'),
    },
    {
      id: 'qa-copy-phone',
      title: 'Copy Phone Number to Clipboard (+91 9959429448)',
      group: 'Quick Actions',
      icon: Copy,
      badge: 'Copy',
      handler: () => copyText('+91 9959429448'),
    },

    // Projects Code Inspection
    {
      id: 'code-ops-console',
      title: 'Inspect Code: SAP BASIS Ops Console',
      group: 'Projects',
      icon: Code2,
      badge: 'Python / ABAP',
      handler: () => {
        setIsOpen(false);
        playUiClick();
        onOpenProjectCode?.('SAP BASIS Ops Console');
      },
    },
    {
      id: 'code-operations-portal',
      title: 'Inspect Code: SAP BASIS Operations Portal',
      group: 'Projects',
      icon: Code2,
      badge: 'Java / RFC JCo',
      handler: () => {
        setIsOpen(false);
        playUiClick();
        onOpenProjectCode?.('SAP BASIS Operations Portal');
      },
    },
    {
      id: 'code-custom-code',
      title: 'Inspect Code: SAP Custom Code & Impact Analyzer',
      group: 'Projects',
      icon: Code2,
      badge: 'Java / Clean Core',
      handler: () => {
        setIsOpen(false);
        playUiClick();
        onOpenProjectCode?.('SAP Custom Code & Impact Analyzer');
      },
    },
    {
      id: 'code-interface-cockpit',
      title: 'Inspect Code: SAP Interface Cockpit',
      group: 'Projects',
      icon: Code2,
      badge: 'IDoc / RFC',
      handler: () => {
        setIsOpen(false);
        playUiClick();
        onOpenProjectCode?.('SAP Interface Cockpit');
      },
    },
    {
      id: 'code-performance-analyzer',
      title: 'Inspect Code: SAP Performance & Workload Analyzer',
      group: 'Projects',
      icon: Code2,
      badge: 'ST12 Trace',
      handler: () => {
        setIsOpen(false);
        playUiClick();
        onOpenProjectCode?.('SAP Performance & Workload Analyzer');
      },
    },
    {
      id: 'code-backup-readiness',
      title: 'Inspect Code: SAP Backup & Restore Readiness',
      group: 'Projects',
      icon: Code2,
      badge: 'RPO / DR',
      handler: () => {
        setIsOpen(false);
        playUiClick();
        onOpenProjectCode?.('SAP Backup & Restore Readiness');
      },
    },
  ];

  const filteredActions = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.group.toLowerCase().includes(query.toLowerCase()) ||
    (a.badge && a.badge.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          if (next) {
            playUiWhoosh();
            setQuery('');
            setSelectedIndex(0);
          }
          return next;
        });
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={() => setIsOpen(false)}>
      <div className={styles.paletteWindow} onClick={(e) => e.stopPropagation()}>
        <div className={styles.inputRow}>
          <Search size={18} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search SAP landscape (e.g., 'tms', 'sod', 'resume')..."
            className={styles.searchInput}
          />
        </div>

        <div className={styles.resultsList}>
          {filteredActions.map((action, idx) => {
            const Icon = action.icon;
            const isSelected = idx === selectedIndex;
            return (
              <div
                key={action.id}
                className={`${styles.actionItem} ${isSelected ? styles.selectedAction : ''}`}
                onClick={() => action.handler()}
              >
                <div className={styles.actionLeft}>
                  <Icon size={16} color="#00c4ff" />
                  <span>{action.title}</span>
                </div>
                {action.badge && <span className={styles.actionBadge}>{action.badge}</span>}
              </div>
            );
          })}
        </div>

        <div className={styles.footerBar}>
          <span>Use ⌘K to open · Esc to close</span>
          <span>Yarramsetti Revanth · SAP BASIS</span>
        </div>
      </div>
    </div>
  );
}
