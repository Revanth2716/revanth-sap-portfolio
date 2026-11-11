'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Play, Pause, Sparkles, Mic, Radio } from 'lucide-react';
import { playUiClick } from '@/utils/soundEffects';
import styles from './VoiceTeleprompter.module.css';

interface SpeechTrack {
  id: string;
  name: string;
  audioSrc: string;
  transcript: string[];
}

const TRACKS: SpeechTrack[] = [
  {
    id: 'elevator',
    name: 'BASIS Elevator Pitch',
    audioSrc: '/intro_speech.wav',
    transcript: [
      'Hello,', "I'm", 'Revanth—', 'an', 'Entry-Level', 'SAP', 'BASIS', 'Analyst', 'specializing',
      'in', 'SAP', 'NetWeaver', '7.5', 'dual-stack', 'operations,', 'transport', 'governance,',
      'background', 'job', 'health,', 'and', 'user', 'authorizations.', 'Welcome', 'to', 'my', 'portfolio.'
    ],
  },
  {
    id: 'deep_tech',
    name: 'NetWeaver 7.5 Architecture',
    audioSrc: '/tech_speech.wav',
    transcript: [
      'My', 'core', 'engineering', 'focus', 'is', 'NetWeaver', '7.5', 'AS', 'ABAP', 'and', 'AS', 'Java',
      'integration,', 'RFC-enabled', 'function', 'modules,', 'SAP', 'Java', 'Connector', 'JCo,', 'HANA',
      'SQL,', 'and', 'ST12', 'trace', 'diagnostics.', 'I', 'built', '7', 'open-source', 'SAP', 'repositories',
      'with', '361', 'automated', 'tests.'
    ],
  },
  {
    id: 'recruiter',
    name: 'Recruiter Pitch (Eezycode & KL Univ)',
    audioSrc: '/recruiter_speech.wav',
    transcript: [
      'I', 'completed', 'an', '8-month', 'SAP', 'BASIS', 'internship', 'at', 'Eezycode', 'Software',
      'and', 'graduated', 'with', 'an', '8.33', 'CGPA', 'from', 'KL', 'University.', 'Certified',
      'in', 'Azure,', 'OCI,', 'AWS,', 'and', 'Scrum,', 'I', 'am', 'ready', 'for', 'day-one',
      'enterprise', 'operations.'
    ],
  },
];

export default function VoiceTeleprompter() {
  const [activeTrack, setActiveTrack] = useState<SpeechTrack>(TRACKS[0]);
  const [activeWordIdx, setActiveWordIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);
  const [spectrumHeights, setSpectrumHeights] = useState<number[]>(
    new Array(36).fill(6)
  );

  const handleSelectTrack = (t: SpeechTrack) => {
    playUiClick();
    if (audioObj) {
      audioObj.pause();
    }
    setActiveTrack(t);
    setActiveWordIdx(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    playUiClick();
    if (isPlaying) {
      audioObj?.pause();
      setIsPlaying(false);
    } else {
      let a = audioObj;
      if (!a || a.src !== window.location.origin + activeTrack.audioSrc) {
        a = new Audio(activeTrack.audioSrc);
        setAudioObj(a);
      }
      a.currentTime = 0;
      a.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser restricts audio, run simulated playback
          setIsPlaying(true);
        });

      a.onended = () => {
        setIsPlaying(false);
        setActiveWordIdx(0);
      };
    }
  };

  // Word advance timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveWordIdx((prev) => {
        if (prev >= activeTrack.transcript.length - 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isPlaying, activeTrack]);

  // Spectrum animation
  useEffect(() => {
    if (!isPlaying) {
      setSpectrumHeights(new Array(36).fill(6));
      return;
    }

    const interval = setInterval(() => {
      setSpectrumHeights(
        new Array(36).fill(0).map(() => Math.floor(Math.random() * 38) + 6)
      );
    }, 90);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Radio size={14} />
          <span>Synchronized Voice Studio & Equalizer</span>
        </div>
        <h2 className={styles.title}>Synchronized Audio Architecture Studio</h2>
        <p className={styles.description}>
          Listen to synchronized verbal walkthroughs of my SAP BASIS background, NetWeaver 7.5
          engineering stack, and enterprise operational readiness with live word-level teleprompter
          tracking.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.controlsBar}>
          <div className={styles.trackButtons}>
            {TRACKS.map((t) => (
              <button
                key={t.id}
                className={`${styles.trackBtn} ${
                  activeTrack.id === t.id ? styles.activeTrack : ''
                }`}
                onClick={() => handleSelectTrack(t)}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className={styles.playbackGroup}>
            <button className={styles.playBtn} onClick={togglePlay}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{isPlaying ? 'Pause Studio' : 'Play Synchronized Pitch'}</span>
            </button>
          </div>
        </div>

        {/* Teleprompter Stream */}
        <div className={styles.teleprompterBox}>
          <div className={styles.wordStream}>
            {activeTrack.transcript.map((word, i) => {
              const isActive = i === activeWordIdx && isPlaying;
              const isPast = i < activeWordIdx && isPlaying;
              return (
                <span
                  key={i}
                  className={`${styles.word} ${
                    isActive ? styles.activeWord : isPast ? styles.spokenWord : ''
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>

        {/* Audio Spectrum Equalizer */}
        <div className={styles.spectrumBar}>
          {spectrumHeights.map((h, i) => (
            <div
              key={i}
              className={styles.freqBar}
              style={{
                height: `${h}px`,
                opacity: isPlaying ? 0.9 : 0.25,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
