'use client';

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react';
import { playUiClick } from '@/utils/soundEffects';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  return (
    <section id="contact" className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Send size={14} />
          <span>Get In Touch</span>
        </div>
        <h2 className={styles.title}>Direct Contact & Immediate Availability</h2>
        <p className={styles.description}>
          Actively seeking Entry-Level SAP BASIS Analyst roles. Available immediately for relocation to
          Bangalore or working in Hyderabad.
        </p>
      </div>

      <div className={styles.card}>
        <a
          href="mailto:yarramsettirevanth27@gmail.com"
          className={styles.contactTile}
          onClick={() => playUiClick()}
        >
          <div className={styles.tileIcon}>
            <Mail size={20} />
          </div>
          <span className={styles.tileLabel}>Email</span>
          <span className={styles.tileValue}>yarramsettirevanth27@gmail.com</span>
        </a>

        <a href="tel:+919959429448" className={styles.contactTile} onClick={() => playUiClick()}>
          <div className={styles.tileIcon}>
            <Phone size={20} />
          </div>
          <span className={styles.tileLabel}>Phone</span>
          <span className={styles.tileValue}>+91 9959429448</span>
        </a>

        <a
          href="https://linkedin.com/in/revanthyarramsett1627i"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactTile}
          onClick={() => playUiClick()}
        >
          <div className={styles.tileIcon}>
            <Linkedin size={20} />
          </div>
          <span className={styles.tileLabel}>LinkedIn</span>
          <span className={styles.tileValue}>in/revanthyarramsett1627i</span>
        </a>

        <a
          href="https://github.com/Revanth2716"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactTile}
          onClick={() => playUiClick()}
        >
          <div className={styles.tileIcon}>
            <Github size={20} />
          </div>
          <span className={styles.tileLabel}>GitHub</span>
          <span className={styles.tileValue}>github.com/Revanth2716</span>
        </a>
      </div>
    </section>
  );
}
