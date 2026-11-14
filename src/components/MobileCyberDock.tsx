'use client';

import React, { useState } from 'react';
import {
  Menu,
  X,
  FileText,
  Presentation,
  Layers,
  Cpu,
  GitBranch,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Terminal,
  Award,
  Mail,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  playUiClick,
  playUiWhoosh,
  isSoundEffectsEnabled,
  setSoundEffectsEnabled,
} from '@/utils/soundEffects';
import styles from './MobileCyberDock.module.css';

interface MobileCyberDockProps {
  onOpenResume?: () => void;
  onOpenPitchDeck?: () => void;
}

const SECTIONS = [
  { id: 'projects', label: 'Repositories', icon: Layers },
  { id: 'spatial-graph', label: '3D NetWeaver', icon: Cpu },
  { id: 'tms-simulator', label: 'TMS Simulator', icon: GitBranch },
  { id: 'sod-matrix', label: 'SoD Matrix', icon: ShieldCheck },
  { id: 'trace-lab', label: 'ST12 Trace Lab', icon: Activity },
  { id: 'unit-tests', label: 'Tests (529)', icon: CheckCircle2 },
  { id: 'terminal', label: 'SAPSH CLI', icon: Terminal },
  { id: 'credentials', label: 'Experience', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function MobileCyberDock({
  onOpenResume,
  onOpenPitchDeck,
}: MobileCyberDockProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(isSoundEffectsEnabled());

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundEffectsEnabled(next);
    setSoundOn(next);
    if (next) playUiClick();
  };

  const scrollTo = (id: string) => {
    playUiClick();
    setIsDrawerOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className={styles.mobileDockWrapper}>
        <nav className={styles.mobileBar}>
          <button
            className={styles.dockItem}
            onClick={() => {
              playUiWhoosh();
              setIsDrawerOpen(true);
            }}
          >
            <Menu size={18} />
            <span>Menu</span>
          </button>

          <button
            className={`${styles.dockItem} ${styles.dockItemHighlight}`}
            onClick={() => scrollTo('projects')}
          >
            <Layers size={18} />
            <span>Repos</span>
          </button>

          <button
            className={styles.dockItem}
            onClick={() => scrollTo('tms-simulator')}
          >
            <GitBranch size={18} />
            <span>TMS</span>
          </button>

          <button
            className={styles.dockItem}
            onClick={() => {
              playUiClick();
              onOpenResume?.();
            }}
          >
            <FileText size={18} />
            <span>Resume</span>
          </button>

          <button className={styles.dockItem} onClick={handleToggleSound}>
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            <span>Sound</span>
          </button>
        </nav>
      </div>

      {isDrawerOpen && (
        <div className={styles.drawerOverlay} onClick={() => setIsDrawerOpen(false)}>
          <div
            className={styles.drawerContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>SAP Navigation Console</span>
              <button
                className={styles.closeBtn}
                onClick={() => setIsDrawerOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.drawerGrid}>
              {SECTIONS.map((sec) => {
                const Icon = sec.icon;
                return (
                  <button
                    key={sec.id}
                    className={styles.drawerTile}
                    onClick={() => scrollTo(sec.id)}
                  >
                    <Icon size={16} color="#00c4ff" />
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.actionBtns}>
              <button
                className={styles.primaryBtn}
                onClick={() => {
                  playUiClick();
                  setIsDrawerOpen(false);
                  onOpenResume?.();
                }}
              >
                <FileText size={16} />
                <span>Open ATS Printable Resume</span>
              </button>

              <button
                className={styles.secondaryBtn}
                onClick={() => {
                  playUiClick();
                  setIsDrawerOpen(false);
                  onOpenPitchDeck?.();
                }}
              >
                <Presentation size={16} />
                <span>Open 60-Second Recruiter Pitch</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
