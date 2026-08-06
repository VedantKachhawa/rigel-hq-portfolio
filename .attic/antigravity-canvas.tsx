"use client";
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface Particle {
  t: number;
  speed: number;
  mx: number;
  my: number;
  mz: number;
  cx: number;
  cy: number;
  cz: number;
  randomRadiusOffset: number;
}

interface InnerProps {
  count: number;
  magnetRadius: number;
  ringRadius: number;
  waveSpeed: number;
  waveAmplitude: number;
  particleSize: number;
  lerpSpeed: number;
  color: string;
  autoAnimate: boolean;
  particleVariance: number;
  rotationSpeed: number;
  depthFactor: number;
  pulseSpeed: number;
  particleShape: string;
  fieldStrength: number;
}

function AntigravityInner({
  count,
  magnetRadius,
  ringRadius,
  waveSpeed,
  waveAmplitude,
  particleSize,
  lerpSpeed,
  color,
  autoAnimate,
  particleVariance,
  rotationSpeed,
  depthFactor,
  pulseSpeed,
  particleShape,
  fieldStrength,
}: InnerProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const particles = useMemo<Particle[]>(() => {
    const temp: Particle[] = [];
    const w = viewport.width || 100;
    const h = viewport.height || 100;
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * w;
      const y = (Math.random() - 0.5) * h;
      const z = (Math.random() - 0.5) * 20;
      temp.push({
        t: Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        mx: x, my: y, mz: z,
        cx: x, cy: y, cz: z,
        randomRadiusOffset: (Math.random() - 0.5) * 2,
      });
    }
    return temp;
  }, [count, viewport.width, viewport.height]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { viewport: v, pointer: m, clock } = state;

    const mouseDist = Math.sqrt(
      Math.pow(m.x - lastMousePos.current.x, 2) +
      Math.pow(m.y - lastMousePos.current.y, 2)
    );
    if (mouseDist > 0.001) {
      lastMouseMoveTime.current = Date.now();
      lastMousePos.current = { x: m.x, y: m.y };
    }

    let destX = (m.x * v.width) / 2;
    let destY = (m.y * v.height) / 2;

    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
      const time = clock.getElapsedTime();
      destX = Math.sin(time * 0.5) * (v.width / 4);
      destY = Math.cos(time * 0.5 * 2) * (v.height / 4);
    }

    virtualMouse.current.x += (destX - virtualMouse.current.x) * 0.05;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * 0.05;

    const targetX = virtualMouse.current.x;
    const targetY = virtualMouse.current.y;
    const globalRotation = clock.getElapsedTime() * rotationSpeed;

    particles.forEach((particle, i) => {
      particle.t += particle.speed / 2;
      const { t, mx, my, mz, cz, randomRadiusOffset } = particle;

      const projFactor = 1 - cz / 50;
      const ptx = targetX * projFactor;
      const pty = targetY * projFactor;

      const dx = mx - ptx;
      const dy = my - pty;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let tpos = { x: mx, y: my, z: mz * depthFactor };

      if (dist < magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRotation;
        const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
        const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1));
        const r = ringRadius + wave + deviation;
        tpos = {
          x: ptx + r * Math.cos(angle),
          y: pty + r * Math.sin(angle),
          z: mz * depthFactor + Math.sin(t) * (1 * waveAmplitude * depthFactor),
        };
      }

      particle.cx += (tpos.x - particle.cx) * lerpSpeed;
      particle.cy += (tpos.y - particle.cy) * lerpSpeed;
      particle.cz += (tpos.z - particle.cz) * lerpSpeed;

      dummy.position.set(particle.cx, particle.cy, particle.cz);
      dummy.lookAt(ptx, pty, particle.cz);
      dummy.rotateX(Math.PI / 2);

      const curDist = Math.sqrt(
        Math.pow(particle.cx - ptx, 2) + Math.pow(particle.cy - pty, 2)
      );
      let scale = Math.max(0, Math.min(1, 1 - Math.abs(curDist - ringRadius) / 10));
      const finalScale = scale * (0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance) * particleSize;
      dummy.scale.setScalar(finalScale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    // @ts-expect-error r3f JSX
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {particleShape === "capsule" && (
        // @ts-expect-error r3f JSX
        <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
      )}
      {particleShape === "sphere" && (
        // @ts-expect-error r3f JSX
        <sphereGeometry args={[0.2, 16, 16]} />
      )}
      {particleShape === "box" && (
        // @ts-expect-error r3f JSX
        <boxGeometry args={[0.3, 0.3, 0.3]} />
      )}
      {particleShape === "tetrahedron" && (
        // @ts-expect-error r3f JSX
        <tetrahedronGeometry args={[0.3]} />
      )}
      {/* @ts-expect-error r3f JSX */}
      <meshBasicMaterial color={color} />
    {/* @ts-expect-error r3f JSX */}
    </instancedMesh>
  );
}

export interface AntigravityProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: string;
  fieldStrength?: number;
}

export function AntigravityCanvas({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = "#FF9FFC",
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = "capsule",
  fieldStrength = 10,
}: AntigravityProps) {
  return (
    <Canvas camera={{ position: [0, 0, 50], fov: 35 }}>
      <AntigravityInner
        count={count}
        magnetRadius={magnetRadius}
        ringRadius={ringRadius}
        waveSpeed={waveSpeed}
        waveAmplitude={waveAmplitude}
        particleSize={particleSize}
        lerpSpeed={lerpSpeed}
        color={color}
        autoAnimate={autoAnimate}
        particleVariance={particleVariance}
        rotationSpeed={rotationSpeed}
        depthFactor={depthFactor}
        pulseSpeed={pulseSpeed}
        particleShape={particleShape}
        fieldStrength={fieldStrength}
      />
    </Canvas>
  );
}
