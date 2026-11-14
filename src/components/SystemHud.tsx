'use client';

import React, { useState, useEffect } from 'react';
import styles from './SystemHud.module.css';

const THEMES = [
  { name: 'SAP Sapphire', color: '#008fd3', glow: 'rgba(0, 143, 211, 0.45)' },
  { name: 'Fiori Horizon', color: '#00c4ff', glow: 'rgba(0, 196, 255, 0.45)' },
  { name: 'Enterprise Gold', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.45)' },
  { name: 'Clean Core Emerald', color: '#10b981', glow: 'rgba(16, 185, 129, 0.45)' },
];

export default function SystemHud() {
  const [fps, setFps] = useState<number>(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };

    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  const changeTheme = (theme: typeof THEMES[0]) => {
    document.documentElement.style.setProperty('--accent-sap', theme.color);
    document.documentElement.style.setProperty('--accent-sap-glow', theme.glow);
  };

  return (
    <footer className={styles.hudBar}>
      <div className={styles.hudLeft}>
        <div className={styles.hudItem}>
          <span className={styles.dotGreen} />
          <span>SID: NPL (NetWeaver 7.52 SP04)</span>
        </div>
        <div className={styles.hudItem}>
          <span>FPS: {fps}</span>
        </div>
        <div className={styles.hudItem}>
          <span>RFC Gateway: 3300/tcp</span>
        </div>
        <div className={styles.hudItem}>
          <span>HANA In-Memory: ONLINE</span>
        </div>
        <div className={styles.hudItem}>
          <span>Tests: 529/529 PASS</span>
        </div>
      </div>

      <div className={styles.hudRight}>
        <span>Palette:</span>
        {THEMES.map((t) => (
          <button
            key={t.name}
            className={styles.themeBtn}
            style={{ backgroundColor: t.color }}
            title={t.name}
            onClick={() => changeTheme(t)}
          />
        ))}
      </div>
    </footer>
  );
}
