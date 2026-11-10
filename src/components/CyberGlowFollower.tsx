'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Command, Keyboard } from 'lucide-react';
import { playUiClick, playUiWhoosh } from '@/utils/soundEffects';
import styles from './CyberGlowFollower.module.css';

interface CyberGlowFollowerProps {
  onOpenResume?: () => void;
  onOpenPitchDeck?: () => void;
}

export default function CyberGlowFollower({
  onOpenResume,
  onOpenPitchDeck,
}: CyberGlowFollowerProps) {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -500, y: -500 });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const targetRef = useRef<{ x: number; y: number }>({ x: -500, y: -500 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const smoothTrack = () => {
      setCoords((prev) => {
        const dx = targetRef.current.x - prev.x;
        const dy = targetRef.current.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animFrameRef.current = requestAnimationFrame(smoothTrack);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animFrameRef.current = requestAnimationFrame(smoothTrack);

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;

      const key = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && key === 'k') {
        // Command palette hotkey
      } else if (key === 'r' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        playUiClick();
        onOpenResume?.();
      } else if (key === 'p' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        playUiClick();
        onOpenPitchDeck?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('keydown', handleKeyDown);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible, onOpenResume, onOpenPitchDeck]);

  return (
    <>
      <div
        className={styles.cursorGlow}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translate3d(${coords.x}px, ${coords.y}px, 0) translate(-50%, -50%)`,
        }}
      />
      <div className={styles.shortcutsPill}>
        <Keyboard size={12} />
        <span>Press</span>
        <span className={styles.kbdKey}>R</span>
        <span>Resume</span>
        <span className={styles.kbdKey}>P</span>
        <span>Pitch</span>
        <span className={styles.kbdKey}>⌘K</span>
        <span>Actions</span>
      </div>
    </>
  );
}
