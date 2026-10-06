"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NeuralOrb() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100); camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); element.appendChild(renderer.domElement);
    const group = new THREE.Group(); scene.add(group);
    const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 3), new THREE.MeshBasicMaterial({ color: 0x915cff, wireframe: true, transparent: true, opacity: 0.7 }));
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 2), new THREE.MeshBasicMaterial({ color: 0x311061, wireframe: true, transparent: true, opacity: 0.75 })); group.add(orb, core);
    const positions = new Float32Array(2100);
    for (let i = 0; i < positions.length; i += 3) { const r = 1.55 + Math.random() * 1.25, theta = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1); positions[i] = r * Math.sin(phi) * Math.cos(theta); positions[i + 1] = r * Math.sin(phi) * Math.sin(theta); positions[i + 2] = r * Math.cos(phi); }
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xb69aff, size: 0.018, transparent: true, opacity: 0.75 })); group.add(stars);
    const resize = () => { const size = Math.min(element.clientWidth, element.clientHeight); renderer.setSize(size, size, false); };
    resize(); const observer = new ResizeObserver(resize); observer.observe(element); let frame = 0;
    const animate = () => { frame = requestAnimationFrame(animate); group.rotation.y += 0.0024; group.rotation.x = Math.sin(Date.now() * 0.0004) * 0.12; core.rotation.y -= 0.004; renderer.render(scene, camera); }; animate();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); geometry.dispose(); orb.geometry.dispose(); core.geometry.dispose(); renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  return <div ref={host} className="neural-orb" />;
}
