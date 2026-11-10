'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Globe, Cpu } from 'lucide-react';
import styles from './SkillConstellationSphere.module.css';

const SAP_SKILLS = [
  'SAP NetWeaver 7.5',
  'ABAP Fundamentals',
  'SAP JCo 3.1',
  'SAP HANA 2.0',
  'Transport Mgmt (SE09)',
  'Job Scheduling (SM37)',
  'User Admin (SU01)',
  'Role Mgmt (PFCG)',
  'System Log (SM21)',
  'SQL Trace (ST12)',
  'Workload Tuning (ST03)',
  'RFC / IDoc / BAPI',
  'Python 3.12',
  'Java 8 & Spring Boot',
  'Azure & AWS Cloud',
  'Linux Command Line',
];

export default function SkillConstellationSphere() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState<string>('Hover or Drag 3D Sphere');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId: number;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Generate constellation nodes on a sphere Fibonacci spiral
    const nodeCount = SAP_SKILLS.length;
    const radius = 80;
    const nodePositions: THREE.Vector3[] = [];

    const nodeGeometry = new THREE.SphereGeometry(2.8, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00c4ff });

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos);

      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      nodeMesh.position.copy(pos);
      sphereGroup.add(nodeMesh);
    }

    // Connect nodes with light lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x008fd3,
      transparent: true,
      opacity: 0.35,
    });

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 55) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            nodePositions[i],
            nodePositions[j],
          ]);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          sphereGroup.add(line);
        }
      }
    }

    // Outer faint wireframe sphere
    const wireSphereGeo = new THREE.SphereGeometry(radius, 16, 16);
    const wireSphereMat = new THREE.MeshBasicMaterial({
      color: 0x00c4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wireSphere = new THREE.Mesh(wireSphereGeo, wireSphereMat);
    sphereGroup.add(wireSphere);

    // Mouse drag interactions
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        // Pick nearest skill based on rotation
        const idx = Math.floor(
          (Math.abs(sphereGroup.rotation.y) * 4) % SAP_SKILLS.length
        );
        setActiveSkill(SAP_SKILLS[idx]);
        return;
      }
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      sphereGroup.rotation.y += deltaX * 0.008;
      sphereGroup.rotation.x += deltaY * 0.008;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        sphereGroup.rotation.y += 0.003;
        sphereGroup.rotation.x += 0.001;
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Globe size={14} />
          <span>3D Skill Constellation</span>
        </div>
        <h2 className={styles.title}>SAP Enterprise Technical Stack</h2>
        <p className={styles.description}>
          Rotatable 3D Fibonacci sphere mapping core SAP BASIS competencies, programming runtimes,
          and cloud platforms.
        </p>
      </div>

      <div className={styles.sphereWrapper}>
        <div ref={mountRef} className={styles.sphereCanvas} />
        <div className={styles.activeSkillPill}>
          <span>{activeSkill}</span>
        </div>
      </div>
    </section>
  );
}
