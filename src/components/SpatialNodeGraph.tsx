'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cpu, Activity, Rotate3d, Database, Layers, ShieldCheck } from 'lucide-react';
import styles from './SpatialNodeGraph.module.css';

interface Node3DData {
  name: string;
  role: string;
  desc: string;
  pos: [number, number, number];
  color: string;
  transactions: string[];
}

const SAP_NODES_DATA: Node3DData[] = [
  {
    name: 'Internet Comm Manager (ICM)',
    role: 'HTTP/HTTPS & Gateway Listener',
    desc: 'Handles incoming HTTP requests, WebSocket channels, and gateway routing into AS ABAP and AS Java stacks.',
    pos: [-130, 40, 0],
    color: '#38bdf8',
    transactions: ['SMICM', 'SICF', 'SMGW'],
  },
  {
    name: 'ABAP Dispatcher & Work Processes',
    role: 'DIA, BGD, UPD, SPO, ENQ Pool',
    desc: 'Dispatches tasks across Dialog work processes (user transactions), Batch workers (SM37), Update (V1/V2), Spooler, and Enqueue lock server.',
    pos: [-50, 70, 60],
    color: '#008fd3',
    transactions: ['SM50', 'SM66', 'SM12', 'SM21'],
  },
  {
    name: 'NetWeaver Java AS & JCo Bridge',
    role: 'Java Stack & RFC Connection Pool',
    desc: 'Java Virtual Machine host for Spring Boot / JSP enterprise apps, connecting directly to ABAP Function Modules via SAP Java Connector (JCo 3.1).',
    pos: [0, 0, 0],
    color: '#10b981',
    transactions: ['NWA', 'SM59', 'SM58', 'JCoDestination'],
  },
  {
    name: 'SAP HANA 2.0 In-Memory DB',
    role: 'In-Memory Columnar Database',
    desc: 'Column-store tables, delta merges, calculation views, and HANA SQL query engine delivering sub-millisecond response times.',
    pos: [80, 60, -50],
    color: '#8b5cf6',
    transactions: ['HDB Studio', 'DB02', 'DBACOCKPIT'],
  },
  {
    name: 'CTS / TMS Transport Engine',
    role: 'Change & Transport Controller',
    desc: 'Manages repository export, cofile generation, transport routes, and promotion queue imports across DEV -> QAS -> PRD.',
    pos: [70, -70, 50],
    color: '#f59e0b',
    transactions: ['SE09', 'SE10', 'STMS', 'tp import'],
  },
  {
    name: 'BTCTR Background Job Scheduler',
    role: 'Batch Job & Scheduling Daemon',
    desc: 'Orchestrates periodic batch jobs, event-driven triggers, and failure triage across TBTCO and TBTCP tables.',
    pos: [130, -20, 0],
    color: '#ec4899',
    transactions: ['SM36', 'SM37', 'TBTCO', 'TBTCP'],
  },
  {
    name: 'PFCG Authorization Engine',
    role: 'Role Hierarchy & SoD Gatekeeper',
    desc: 'Evaluates user role assignments, expands composite hierarchies into single roles, and enforces Segregation of Duties matrices.',
    pos: [0, -90, -40],
    color: '#f97316',
    transactions: ['SU01', 'SU10', 'PFCG', 'SU53'],
  },
];

export default function SpatialNodeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node3DData>(SAP_NODES_DATA[2]); // NetWeaver Java default

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let width = canvas.parentElement?.clientWidth || 800;
    let height = 540;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 30, 270);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambLight);

    const pointLight = new THREE.PointLight(0x00c4ff, 2.5, 450);
    pointLight.position.set(0, 60, 120);
    scene.add(pointLight);

    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    // Build 3D Spheres for each node
    const sphereMeshes: { mesh: THREE.Mesh; data: Node3DData }[] = [];
    const sphereGeo = new THREE.SphereGeometry(7, 24, 24);

    SAP_NODES_DATA.forEach((node) => {
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(node.color),
        emissive: new THREE.Color(node.color),
        emissiveIntensity: 0.35,
        roughness: 0.2,
        metalness: 0.7,
      });

      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(...node.pos);
      graphGroup.add(mesh);
      sphereMeshes.push({ mesh, data: node });

      // Add subtle outer wireframe orbit ring
      const ringGeo = new THREE.RingGeometry(8.5, 9.2, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(node.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.set(...node.pos);
      ringMesh.lookAt(camera.position);
      graphGroup.add(ringMesh);
    });

    // Spline connecting lines between nodes
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00c4ff,
      transparent: true,
      opacity: 0.35,
    });

    for (let i = 0; i < SAP_NODES_DATA.length; i++) {
      for (let j = i + 1; j < SAP_NODES_DATA.length; j++) {
        const p1 = new THREE.Vector3(...SAP_NODES_DATA[i].pos);
        const p2 = new THREE.Vector3(...SAP_NODES_DATA[j].pos);
        if (p1.distanceTo(p2) < 220) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
          const line = new THREE.Line(lineGeo, lineMat);
          graphGroup.add(line);
        }
      }
    }

    // Interactive mouse rotation
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMousePos.x;
      const dy = e.clientY - prevMousePos.y;
      graphGroup.rotation.y += dx * 0.006;
      graphGroup.rotation.x += dy * 0.006;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Raycaster for node selection
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseVector.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(
        sphereMeshes.map((s) => s.mesh)
      );

      if (intersects.length > 0) {
        const hit = sphereMeshes.find((s) => s.mesh === intersects[0].object);
        if (hit) setSelectedNode(hit.data);
      }
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('click', onClick);

    // Animation Loop
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        graphGroup.rotation.y += 0.002;
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Cpu size={14} />
          <span>Interactive 3D WebGL Visualization</span>
        </div>
        <h2 className={styles.title}>3D NetWeaver 7.5 Enterprise Landscape</h2>
        <p className={styles.description}>
          Rotatable Three.js spatial graph mapping the core infrastructure of an SAP NetWeaver 7.5
          dual-stack landscape. Click any component to inspect its architecture, communication
          channels, and related SAP transaction codes.
        </p>
      </div>

      <div className={styles.canvasWrapper}>
        <div className={styles.hudOverlay}>
          <div className={styles.hudBadge}>
            <Rotate3d size={13} />
            <span>Drag to rotate · Click node to inspect</span>
          </div>
        </div>

        <canvas ref={canvasRef} className={styles.canvasElement} />

        {/* Selected Node Details Card */}
        {selectedNode && (
          <div className={styles.detailCard}>
            <div className={styles.nodeTitle}>
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: selectedNode.color,
                  boxShadow: `0 0 10px ${selectedNode.color}`,
                }}
              />
              <span>{selectedNode.name}</span>
            </div>
            <div className={styles.nodeRole}>{selectedNode.role}</div>
            <p className={styles.nodeDesc}>{selectedNode.desc}</p>
            <div className={styles.nodeMeta}>
              {selectedNode.transactions.map((tcode) => (
                <span key={tcode} className={styles.metaPill}>
                  {tcode}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
