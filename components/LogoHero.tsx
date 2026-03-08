"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

const RADII = [210, 162] as const;
const SPEED = 0.32;
const BALL_SIZE = 12;
const REPEL_DIST = 55;
const SNAP_DIST = 40; // distance to snap to other ring

export default function LogoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  // Each ball has its own radius (which ring it's on) and angle
  const stateRef = useRef([
    { angle: 0,   dir: 1,  radius: RADII[0] },
    { angle: 180, dir: -1, radius: RADII[1] },
  ]);
  const draggingRef = useRef<number | null>(null);
  const dragPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const prevDistRef = useRef<number>(999);
  const ball0Ref = useRef<HTMLDivElement>(null);
  const ball1Ref = useRef<HTMLDivElement>(null);

  const updateBallDOM = useCallback((id: number, x: number, y: number) => {
    const el = id === 0 ? ball0Ref.current : ball1Ref.current;
    if (el) el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  }, []);

  useEffect(() => {
    const step = (ts: number) => {
      const dt = Math.min(ts - timeRef.current, 32);
      timeRef.current = ts;

      const s = stateRef.current;
      const isDragging0 = draggingRef.current === 0;
      const isDragging1 = draggingRef.current === 1;

      if (!isDragging0) s[0].angle += s[0].dir * SPEED * (dt / 16);
      if (!isDragging1) s[1].angle += s[1].dir * SPEED * (dt / 16);

      const pos0 = isDragging0
        ? dragPosRef.current
        : { x: Math.cos((s[0].angle * Math.PI) / 180) * s[0].radius, y: Math.sin((s[0].angle * Math.PI) / 180) * s[0].radius };
      const pos1 = isDragging1
        ? dragPosRef.current
        : { x: Math.cos((s[1].angle * Math.PI) / 180) * s[1].radius, y: Math.sin((s[1].angle * Math.PI) / 180) * s[1].radius };

      const dx = pos1.x - pos0.x;
      const dy = pos1.y - pos0.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < REPEL_DIST && dist > 0) {
        const push = ((REPEL_DIST - dist) / REPEL_DIST) * 5 * (dt / 16);
        const approaching = dist < prevDistRef.current;

        const applyRepulsion = (pushedIdx: number, anchorPos: { x: number; y: number }) => {
          const r = s[pushedIdx].radius;
          const aPlus  = s[pushedIdx].angle + push;
          const aMinus = s[pushedIdx].angle - push;
          const pPlus  = { x: Math.cos((aPlus  * Math.PI) / 180) * r, y: Math.sin((aPlus  * Math.PI) / 180) * r };
          const pMinus = { x: Math.cos((aMinus * Math.PI) / 180) * r, y: Math.sin((aMinus * Math.PI) / 180) * r };
          const dPlus  = Math.sqrt((pPlus.x  - anchorPos.x) ** 2 + (pPlus.y  - anchorPos.y) ** 2);
          const dMinus = Math.sqrt((pMinus.x - anchorPos.x) ** 2 + (pMinus.y - anchorPos.y) ** 2);
          const pushDir = dPlus > dMinus ? 1 : -1;
          s[pushedIdx].angle += pushDir * push;
          if (approaching) s[pushedIdx].dir = pushDir;
        };

        if (isDragging0 && !isDragging1) applyRepulsion(1, pos0);
        if (isDragging1 && !isDragging0) applyRepulsion(0, pos1);
        // Both on orbits — only repel if on same ring
        if (!isDragging0 && !isDragging1 && s[0].radius === s[1].radius) {
          applyRepulsion(0, pos1);
          applyRepulsion(1, pos0);
        }
      }

      prevDistRef.current = dist;
      updateBallDOM(0, pos0.x, pos0.y);
      updateBallDOM(1, pos1.x, pos1.y);

      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [updateBallDOM]);

  const handleMouseDown = useCallback((e: React.MouseEvent, id: number) => {
    e.preventDefault();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    dragPosRef.current = {
      x: e.clientX - (rect.left + rect.width / 2),
      y: e.clientY - (rect.top + rect.height / 2),
    };
    draggingRef.current = id;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (draggingRef.current === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    dragPosRef.current = {
      x: e.clientX - (rect.left + rect.width / 2),
      y: e.clientY - (rect.top + rect.height / 2),
    };
  }, []);

  const handleMouseUp = useCallback(() => {
    if (draggingRef.current === null) return;
    const id = draggingRef.current;
    // Snap to nearest ring
    const dropDist = Math.sqrt(dragPosRef.current.x ** 2 + dragPosRef.current.y ** 2);
    const nearestRadius = RADII.reduce((prev, curr) =>
      Math.abs(curr - dropDist) < Math.abs(prev - dropDist) ? curr : prev
    );
    stateRef.current[id].radius = nearestRadius;
    stateRef.current[id].angle = Math.atan2(dragPosRef.current.y, dragPosRef.current.x) * (180 / Math.PI);
    draggingRef.current = null;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div ref={containerRef} style={{
      position: "relative", zIndex: 1,
      display: "flex", alignItems: "center", justifyContent: "center",
      height: "100%", minHeight: "500px",
      userSelect: "none",
    }}>

      <div style={{
        position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(13,148,136,.15) 0%, rgba(13,148,136,.04) 55%, transparent 72%)",
        animation: "glowPulse 3s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: `${RADII[0] * 2}px`, height: `${RADII[0] * 2}px`,
        borderRadius: "50%", border: "1px solid rgba(255,255,255,.12)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: `${RADII[1] * 2}px`, height: `${RADII[1] * 2}px`,
        borderRadius: "50%", border: "1px solid rgba(255,255,255,.08)", pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 2,
        filter: "drop-shadow(0 0 28px rgba(13,148,136,.5))",
        pointerEvents: "none",
      }}>
        <Image src="/logo.png" alt="FC Mello Wien" width={270} height={270} priority />
      </div>

      {/* Ball 0 — invisible hit area wrapper + visible inner ball */}
      <div ref={ball0Ref} onMouseDown={e => handleMouseDown(e, 0)} style={{
        position: "absolute", left: "50%", top: "50%",
        transform: `translate(calc(-50% + ${RADII[0]}px), -50%)`,
        width: "44px", height: "44px",
        borderRadius: "50%", background: "transparent",
        cursor: "grab", zIndex: 3,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: `${BALL_SIZE}px`, height: `${BALL_SIZE}px`,
          borderRadius: "50%", background: "#ffffff",
          boxShadow: "0 0 10px rgba(255,255,255,.55)",
          pointerEvents: "none",
        }} />
      </div>
      {/* Ball 1 — invisible hit area wrapper + visible inner ball */}
      <div ref={ball1Ref} onMouseDown={e => handleMouseDown(e, 1)} style={{
        position: "absolute", left: "50%", top: "50%",
        transform: `translate(calc(-50% + ${-RADII[1]}px), -50%)`,
        width: "44px", height: "44px",
        borderRadius: "50%", background: "transparent",
        cursor: "grab", zIndex: 3,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: `${BALL_SIZE}px`, height: `${BALL_SIZE}px`,
          borderRadius: "50%", background: "#ffffff",
          boxShadow: "0 0 10px rgba(255,255,255,.55)",
          pointerEvents: "none",
        }} />
      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: .7; transform: scale(1); }
          50%       { opacity: 1;  transform: scale(1.04); }
        }
      `}</style>
    </div>
  );
}