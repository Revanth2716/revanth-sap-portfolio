'use client';

import React, { useState, useEffect } from 'react';
import {
  Layers,
  FileText,
  Volume2,
  VolumeX,
  Compass,
  Sparkles,
  Command,
  Presentation,
} from 'lucide-react';
import {
  playUiClick,
  setSoundEffectsEnabled,
  isSoundEffectsEnabled,
} from '@/utils/soundEffects';
import styles from './Navbar.module.css';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenPitchDeck: () => void;
}

export default function Navbar({ onOpenResume, onOpenPitchDeck }: NavbarProps) {
  const [isBlueprint, setIsBlueprint] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    setSoundOn(isSoundEffectsEnabled());
  }, []);

  const toggleBlueprint = () => {
    playUiClick();
    const next = !isBlueprint;
    setIsBlueprint(next);
    if (next) {
      document.body.classList.add('blueprintMode');
    } else {
      document.body.classList.remove('blueprintMode');
    }
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEffectsEnabled(next);
    if (next) playUiClick();
  };

  return (
    <header className={styles.nav}>
      <a href="#hero" className={styles.brand} onClick={() => playUiClick()}>
        <span className={styles.brandTitle}>YARRAMSETTI REVANTH</span>
        <div className={styles.sidBadge}>
          <span className={styles.statusDot} />
          <span>SID: NPL · NetWeaver 7.52</span>
        </div>
      </a>

      <nav>
        <ul className={styles.links}>
          <li>
            <a href="#projects" className={styles.link} onClick={() => playUiClick()}>
              Repositories
            </a>
          </li>
          <li>
            <a href="#spatial-graph" className={styles.link} onClick={() => playUiClick()}>
              3D NetWeaver
            </a>
          </li>
          <li>
            <a href="#tms-simulator" className={styles.link} onClick={() => playUiClick()}>
              TMS Simulator
            </a>
          </li>
          <li>
            <a href="#sod-matrix" className={styles.link} onClick={() => playUiClick()}>
              SoD Matrix
            </a>
          </li>
          <li>
            <a href="#trace-lab" className={styles.link} onClick={() => playUiClick()}>
              ST12 Trace Lab
            </a>
          </li>
          <li>
            <a href="#unit-tests" className={styles.link} onClick={() => playUiClick()}>
              Tests (295)
            </a>
          </li>
          <li>
            <a href="#credentials" className={styles.link} onClick={() => playUiClick()}>
              Experience
            </a>
          </li>
          <li>
            <a href="#terminal" className={styles.link} onClick={() => playUiClick()}>
              SAPSH CLI
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.actions}>
        <button
          className={styles.iconBtn}
          onClick={toggleBlueprint}
          title={isBlueprint ? 'Switch to Luxury Cinematic Mode' : 'Switch to Technical Blueprint Mode'}
          aria-label="Toggle technical blueprint CAD mode"
        >
          <Compass size={16} />
        </button>

        <button
          className={styles.iconBtn}
          onClick={toggleSound}
          title={soundOn ? 'Mute Sound FX' : 'Enable Sound FX'}
          aria-label="Toggle synthesized sound effects"
        >
          {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        <button
          className={styles.pitchBtn}
          onClick={() => {
            playUiClick();
            onOpenPitchDeck();
          }}
          title="60-Second Executive Pitch Deck for SAP BASIS Hiring Managers"
        >
          <Presentation size={14} />
          <span>60s Pitch</span>
        </button>

        <button
          className={styles.resumeBtn}
          onClick={() => {
            playUiClick();
            onOpenResume();
          }}
          title="Print ATS-Formatted Verified Resume"
        >
          <FileText size={14} />
          <span>ATS Resume</span>
        </button>
      </div>
    </header>
  );
}
