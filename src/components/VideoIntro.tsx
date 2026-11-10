'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  ArrowUpRight,
  FileText,
  RotateCcw,
  Cpu,
  Layers,
} from 'lucide-react';
import CinematicLayer from './CinematicLayer';
import { playUiClick } from '@/utils/soundEffects';
import styles from './VideoIntro.module.css';

interface VideoIntroProps {
  onExploreClick?: () => void;
  onOpenResume?: () => void;
}

export default function VideoIntro({ onExploreClick, onOpenResume }: VideoIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const externalAudioRef = useRef<HTMLAudioElement | null>(null);

  const taglineRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const voiceBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeTrack, setActiveTrack] = useState<'intro' | 'tech' | 'recruiter'>('intro');

  // Initialize and guarantee video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const startPlayback = () => {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          const handleFirstGesture = () => {
            video.muted = true;
            video.play().then(() => setIsPlaying(true)).catch(() => {});
            window.removeEventListener('click', handleFirstGesture);
            window.removeEventListener('touchstart', handleFirstGesture);
            window.removeEventListener('keydown', handleFirstGesture);
          };
          window.addEventListener('click', handleFirstGesture, { once: true });
          window.addEventListener('touchstart', handleFirstGesture, { once: true });
          window.addEventListener('keydown', handleFirstGesture, { once: true });
        });
    };

    startPlayback();
  }, []);

  // GSAP entrance choreographies
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: -20, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, delay: 0.2 }
    )
      .fromTo(
        titleLine1Ref.current,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
        '-=0.5'
      )
      .fromTo(
        titleLine2Ref.current,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
        '-=0.6'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        metricsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      )
      .fromTo(
        ctaGroupRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      )
      .fromTo(
        voiceBarRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );
  }, []);

  const handleTrackChange = (track: 'intro' | 'tech' | 'recruiter') => {
    playUiClick();
    setActiveTrack(track);

    if (externalAudioRef.current) {
      externalAudioRef.current.pause();
      externalAudioRef.current.currentTime = 0;
    }

    const audioSrc =
      track === 'intro'
        ? '/intro_speech.wav'
        : track === 'tech'
        ? '/tech_speech.wav'
        : '/recruiter_speech.wav';

    const audio = new Audio(audioSrc);
    audio.muted = isMuted;
    externalAudioRef.current = audio;

    if (!isMuted) {
      audio.play().catch(() => {});
    }
  };

  const toggleSound = () => {
    playUiClick();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }

    if (externalAudioRef.current) {
      externalAudioRef.current.muted = nextMuted;
      if (!nextMuted) {
        externalAudioRef.current.play().catch(() => {});
      }
    } else if (!nextMuted) {
      handleTrackChange(activeTrack);
    }
  };

  const togglePlayback = () => {
    playUiClick();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      externalAudioRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      if (!isMuted) {
        externalAudioRef.current?.play().catch(() => {});
      }
    }
  };

  return (
    <section id="hero" ref={containerRef} className={styles.heroContainer}>
      {/* Three.js Radial Ambient Glow Layer */}
      <div className={styles.ambientVideoGlow} />

      {/* Foreground Video Background */}
      <div className={styles.foregroundVideoWrapper}>
        <video
          ref={videoRef}
          src="/avatar_video.mp4"
          poster="/avatar_portrait.jpg"
          playsInline
          autoPlay
          muted
          loop
          className={styles.foregroundVideo}
          aria-label="Yarramsetti Revanth Developer Introduction Video"
        />
      </div>

      {/* Cinematic Vignettes */}
      <div className={styles.cinematicVignette} />
      <div className={styles.cinematicGradTop} />
      <div className={styles.cinematicGradBottom} />

      {/* WebGL Particle Layer */}
      <CinematicLayer />

      {/* Hero Content */}
      <div className={styles.contentWrapper}>
        <div ref={taglineRef} className={styles.taglineBadge}>
          <Sparkles size={14} />
          <span>8-Month SAP BASIS Internship · NetWeaver 7.5 Dual-Stack · ABAP & RFC</span>
        </div>

        <h1 className={styles.heroTitle}>
          <span ref={titleLine1Ref} className={styles.titleLine1}>
            YARRAMSETTI REVANTH
          </span>
          <span ref={titleLine2Ref} className={styles.titleLine2}>
            Entry-Level SAP BASIS Analyst
          </span>
        </h1>

        <p ref={subtitleRef} className={styles.heroSubtitle}>
          Computer Science graduate (<strong>KL University, 8.33 CGPA</strong>) who completed an
          eight-month <strong>SAP BASIS internship at Eezycode Software</strong>. Specialized in{' '}
          <strong>SAP NetWeaver 7.5 dual-stack architecture</strong>, transport management (
          <code>SE09/STMS</code>), background job health (<code>SM37</code>), role & authorization
          governance (<code>SU01/PFCG</code>), and cross-stack integration with RFC and SAP JCo.
          Author of <strong>6 published SAP repositories</strong> backed by{' '}
          <strong>295 automated tests</strong>.
        </p>

        {/* Real Metrics Grid */}
        <div ref={metricsRef} className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <span className={styles.metricNumber}>6</span>
            <span className={styles.metricLabel}>Published SAP Repositories</span>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricNumber}>295</span>
            <span className={styles.metricLabel}>Automated Unit/Integration Tests</span>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricNumber}>NW 7.5</span>
            <span className={styles.metricLabel}>AS ABAP & AS Java Architecture</span>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricNumber}>100%</span>
            <span className={styles.metricLabel}>Deterministic Real-World Scenarios</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div ref={ctaGroupRef} className={styles.ctaGroup}>
          <a
            href="#projects"
            className={styles.primaryCta}
            onClick={() => {
              playUiClick();
              onExploreClick?.();
            }}
          >
            <Layers size={18} />
            <span>Explore 6 SAP Systems</span>
          </a>

          <button
            className={styles.secondaryCta}
            onClick={() => {
              playUiClick();
              onOpenResume?.();
            }}
          >
            <FileText size={18} />
            <span>ATS Printable Resume</span>
          </button>

          <a
            href="#spatial-graph"
            className={styles.secondaryCta}
            onClick={() => playUiClick()}
          >
            <Cpu size={18} />
            <span>3D NetWeaver Landscape</span>
          </a>
        </div>

        {/* Voice Studio Studio Bar */}
        <div ref={voiceBarRef} className={styles.voiceStudioBar}>
          <div className={styles.voiceLabel}>
            <Sparkles size={14} color="#00c4ff" />
            <span>Audio Studio:</span>
          </div>

          <button
            className={`${styles.trackPill} ${
              activeTrack === 'intro' ? styles.trackPillActive : ''
            }`}
            onClick={() => handleTrackChange('intro')}
          >
            BASIS Elevator Pitch
          </button>

          <button
            className={`${styles.trackPill} ${
              activeTrack === 'tech' ? styles.trackPillActive : ''
            }`}
            onClick={() => handleTrackChange('tech')}
          >
            NetWeaver 7.5 Architecture
          </button>

          <button
            className={`${styles.trackPill} ${
              activeTrack === 'recruiter' ? styles.trackPillActive : ''
            }`}
            onClick={() => handleTrackChange('recruiter')}
          >
            Recruiter & SRE Pitch
          </button>

          <div className={styles.mediaControls}>
            <button
              className={styles.mediaBtn}
              onClick={togglePlayback}
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label="Toggle avatar video playback"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>

            <button
              className={styles.mediaBtn}
              onClick={toggleSound}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              aria-label="Toggle audio track"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
