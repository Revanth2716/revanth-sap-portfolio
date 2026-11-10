'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CinematicLayerProps {
  className?: string;
}

export default function CinematicLayer({ className }: CinematicLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let particles: THREE.Points | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.PointsMaterial | null = null;
    let particleTexture: THREE.Texture | null = null;

    let width = window.innerWidth;
    let height = window.innerHeight;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 240;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      // Dynamic Radial Glow Particle Texture (SAP Sapphire & Cyan Fiori Glow)
      const texCanvas = document.createElement('canvas');
      texCanvas.width = 64;
      texCanvas.height = 64;
      const ctx = texCanvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.25, 'rgba(0, 196, 255, 0.85)');
        gradient.addColorStop(0.55, 'rgba(0, 143, 211, 0.45)');
        gradient.addColorStop(0.85, 'rgba(0, 80, 180, 0.15)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      particleTexture = new THREE.CanvasTexture(texCanvas);

      const count = 480;
      const posArray = new Float32Array(count * 3);
      const speeds = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        posArray[i * 3] = (Math.random() - 0.5) * 600;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 600;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 400;
        speeds[i] = 0.08 + Math.random() * 0.16;
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      material = new THREE.PointsMaterial({
        size: 3.2,
        map: particleTexture,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      let mouseX = 0;
      let mouseY = 0;
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / width - 0.5) * 20;
        mouseY = (e.clientY / height - 0.5) * 20;
      };
      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      const animate = () => {
        animId = requestAnimationFrame(animate);

        if (particles && geometry) {
          const positions = geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < count; i++) {
            positions[i * 3 + 1] -= speeds[i];
            if (positions[i * 3 + 1] < -300) {
              positions[i * 3 + 1] = 300;
              positions[i * 3] = (Math.random() - 0.5) * 600;
            }
          }
          geometry.attributes.position.needsUpdate = true;
          particles.rotation.y += 0.0006;
          particles.rotation.x = mouseY * 0.005;
          particles.rotation.z = mouseX * 0.005;
        }

        renderer?.render(scene!, camera!);
      };

      animate();

      const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        camera!.aspect = width / height;
        camera!.updateProjectionMatrix();
        renderer!.setSize(width, height);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animId);
        geometry?.dispose();
        material?.dispose();
        particleTexture?.dispose();
        renderer?.dispose();
      };
    } catch {
      // Fallback gracefully on low-end devices
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
