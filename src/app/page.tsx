'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import VideoIntro from '@/components/VideoIntro';
import VoiceTeleprompter from '@/components/VoiceTeleprompter';
import PortfolioSections from '@/components/PortfolioSections';
import SpatialNodeGraph from '@/components/SpatialNodeGraph';
import SkillConstellationSphere from '@/components/SkillConstellationSphere';
import NetWeaverArchitectureWhiteboard from '@/components/NetWeaverArchitectureWhiteboard';
import TmsLifecycleSimulator from '@/components/TmsLifecycleSimulator';
import SodSecurityMatrix from '@/components/SodSecurityMatrix';
import TraceAnalyzerLab from '@/components/TraceAnalyzerLab';
import InterfaceCockpitSandbox from '@/components/InterfaceCockpitSandbox';
import BackupReadinessRadar from '@/components/BackupReadinessRadar';
import ArchitectureTradeoffsMatrix from '@/components/ArchitectureTradeoffsMatrix';
import SystemStatusPage from '@/components/SystemStatusPage';
import UnitTestRunner from '@/components/UnitTestRunner';
import TerminalSimulator from '@/components/TerminalSimulator';
import CredentialsSection from '@/components/CredentialsSection';
import CompanyPitchGenerator from '@/components/CompanyPitchGenerator';
import ContactSection from '@/components/ContactSection';
import SystemHud from '@/components/SystemHud';
import CyberGlowFollower from '@/components/CyberGlowFollower';
import MobileCyberDock from '@/components/MobileCyberDock';
import CommandPalette from '@/components/CommandPalette';
import CodeInspectorModal from '@/components/CodeInspectorModal';
import ResumeModal from '@/components/ResumeModal';
import ExecutivePitchDeckModal from '@/components/ExecutivePitchDeckModal';

export default function Home() {
  const [inspectingProject, setInspectingProject] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState<boolean>(false);

  return (
    <main style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      {/* Interactive Cursor Spotlight Glow & Desktop Hotkeys Listener */}
      <CyberGlowFollower
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
      />

      {/* Floating Glassmorphic Navbar with SID, Blueprint Switch & Audio */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
      />

      {/* Mobile Cyber Quick Navigation Dock & Bottom Sheet Drawer */}
      <MobileCyberDock
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
      />

      {/* Cinematic Hero with Single-Stream Video & Voice Studio */}
      <VideoIntro onOpenResume={() => setIsResumeOpen(true)} />

      {/* Synchronized Voice Studio & Equalizer */}
      <VoiceTeleprompter />

      {/* 6 Flagship Open-Source SAP Repositories Showcase */}
      <PortfolioSections onInspectProject={(title) => setInspectingProject(title)} />

      {/* 3D NetWeaver 7.5 Spatial Landscape (Three.js WebGL) */}
      <div id="spatial-graph">
        <SpatialNodeGraph />
      </div>

      {/* 3D Interactive SAP Skill Sphere (Three.js WebGL) */}
      <div id="skill-sphere">
        <SkillConstellationSphere />
      </div>

      {/* Interactive 3-Tier Enterprise Architecture Whiteboard */}
      <div id="whiteboard">
        <NetWeaverArchitectureWhiteboard />
      </div>

      {/* Live TMS Transport Lifecycle & Return Code Simulator */}
      <TmsLifecycleSimulator />

      {/* Segregation of Duties (SoD) & Composite Role Hierarchy Matrix */}
      <SodSecurityMatrix />

      {/* ST12 / ST03 Trace Analyzer & N+1 Query Optimization Lab */}
      <TraceAnalyzerLab />

      {/* SAP Interface Cockpit & Message Replay Simulator */}
      <div id="interface-cockpit">
        <InterfaceCockpitSandbox />
      </div>

      {/* HANA Backup RPO & Disaster Recovery Readiness Radar */}
      <div id="backup-radar">
        <BackupReadinessRadar />
      </div>

      {/* SAP Enterprise Architectural Decision Records & Trade-Offs */}
      <ArchitectureTradeoffsMatrix />

      {/* NetWeaver Landscape Health & 90-Day SLA Uptime */}
      <div id="system-status">
        <SystemStatusPage />
      </div>

      {/* In-Browser Unit Test Runner (295 Tests across 6 Repos) */}
      <UnitTestRunner />

      {/* Interactive SAPSH Terminal CLI Emulator */}
      <TerminalSimulator />

      {/* Experience, Education & Verified Certifications */}
      <CredentialsSection />

      {/* Company-Tailored SAP Engineering Pitch Generator */}
      <div id="pitch-generator">
        <CompanyPitchGenerator />
      </div>

      {/* Direct Contact, Phone, Email & Relocation Status */}
      <ContactSection />

      {/* Real-Time Telemetry HUD with Active SID, FPS & Palette Switcher */}
      <SystemHud />

      {/* Raycast Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette
        onOpenProjectCode={(title) => setInspectingProject(title)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
      />

      {/* Interactive Code & ABAP Inspector Modal */}
      <CodeInspectorModal
        projectTitle={inspectingProject}
        onClose={() => setInspectingProject(null)}
      />

      {/* 1-Click ATS Printable Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* 60-Second Executive Pitch Deck Modal */}
      <ExecutivePitchDeckModal
        isOpen={isPitchDeckOpen}
        onClose={() => setIsPitchDeckOpen(false)}
      />
    </main>
  );
}
