/* eslint-disable react/no-unknown-property */
"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import type { RapierRigidBody } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

extend({ MeshLineGeometry, MeshLineMaterial });

const CARD_GLB = "/lanyard/card.glb";
const RIGEL_LOGO =
  "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780271054/Rigel_-_R_logo_uervhx.png";
// 1×1 transparent PNG fallback while the card texture is generating
const EMPTY_TEX =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";

// The Framer GLB maps the card face UVs so that:
//   left half  of texture → front face
//   right half of texture → back face
// Height of the printable area within each half:
const CARD_IMAGE_HEIGHT_SCALE = 0.757;
const RESOLUTION = 1024;

function createLanyardStrapTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createLinearGradient(0, 0, 128, 0);
  gradient.addColorStop(0, "#e8e8e8");
  gradient.addColorStop(0.5, "#ffffff");
  gradient.addColorStop(1, "#e8e8e8");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 512);

  ctx.fillStyle = "rgba(0,0,0,0.05)";
  for (let y = 0; y < 512; y += 8) {
    ctx.fillRect(0, y, 128, 3);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;
  return texture;
}

// ── Types ─────────────────────────────────────────────────────────────────────
type LanyardProps = {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
};

type BandProps = {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  cardImageSrc?: string;
  width?: number;
  height?: number;
};

type LerpedBody = RapierRigidBody & { lerped?: THREE.Vector3 };

// ── Combined card texture (left = front, right = back) ────────────────────────
// Mirrors the Framer component's canvas generation exactly.
function useCardTexture(): string {
  const [src, setSrc] = useState("");

  useEffect(() => {
    let mounted = true;

    const generate = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = RESOLUTION;
      canvas.height = RESOLUTION;
      const ctx = canvas.getContext("2d")!;

      // White base for both halves
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, RESOLUTION, RESOLUTION);

      const halfW = RESOLUTION / 2;
      const faceH = RESOLUTION * CARD_IMAGE_HEIGHT_SCALE;
      const pad = 36;

      // ── Front (left half): Rigel logo ─────────────────────────────────────
      await new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.rect(0, 0, halfW, RESOLUTION);
          ctx.clip();

          const scale = Math.min(
            (halfW - pad * 2) / img.width,
            (faceH - pad * 2) / img.height
          );
          const dw = img.width * scale;
          const dh = img.height * scale;
          const dx = (halfW - dw) / 2;
          const dy = (RESOLUTION - dh) / 2;
          ctx.drawImage(img, dx, dy, dw, dh);
          ctx.restore();
          resolve();
        };
        img.onerror = () => resolve();
        img.crossOrigin = "anonymous";
        img.src = RIGEL_LOGO;
      });

      // ── Back (right half): @RigelHQ text ──────────────────────────────────
      ctx.save();
      ctx.beginPath();
      ctx.rect(halfW, 0, halfW, RESOLUTION);
      ctx.clip();

      const cx = halfW + halfW / 2; // centre of right half
      const cy = RESOLUTION / 2;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillStyle = "#0a0a0a";
      ctx.font = `bold ${Math.round(halfW * 0.18)}px Arial, sans-serif`;
      ctx.fillText("@RigelHQ", cx, cy - 40);

      ctx.fillStyle = "rgba(0,0,0,0.50)";
      ctx.font = `${Math.round(halfW * 0.062)}px Arial, sans-serif`;
      ctx.fillText("CREATIVE PRODUCTION", cx, cy + 55);
      ctx.fillText("STUDIO", cx, cy + 115);

      ctx.fillStyle = "rgba(0,0,0,0.28)";
      ctx.font = `${Math.round(halfW * 0.05)}px Arial, sans-serif`;
      ctx.fillText("DUBAI, UAE", cx, cy + 175);

      ctx.restore();

      if (!mounted) return;

      // Flip vertically — Three.js UV origin is bottom-left; flipping the
      // canvas makes it render right-side-up on the 3D card face.
      const tmp = document.createElement("canvas");
      tmp.width = RESOLUTION;
      tmp.height = RESOLUTION;
      const tCtx = tmp.getContext("2d")!;
      tCtx.scale(1, -1);
      tCtx.translate(0, -RESOLUTION);
      tCtx.drawImage(canvas, 0, 0);

      setSrc(tmp.toDataURL());
    };

    generate();
    return () => {
      mounted = false;
    };
  }, []);

  return src;
}

// ── Band ──────────────────────────────────────────────────────────────────────
function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  cardImageSrc = "",
  width = 0,
  height = 0,
}: BandProps) {
  const band = useRef<THREE.Mesh>(null!);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = {
    type: "dynamic" as const,
    canSleep: false,
    colliders: false as const,
    angularDamping: 2,
    linearDamping: 2,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes, materials } = useGLTF(CARD_GLB) as any;
  const lanyardTexture = useMemo(() => createLanyardStrapTexture(), []);
  // Card texture: single image split left (front) / right (back)
  const cardTexture = useTexture(cardImageSrc || EMPTY_TEX);

  useEffect(() => {
    if (!cardTexture) return;
    cardTexture.wrapS = cardTexture.wrapT = THREE.RepeatWrapping;
    cardTexture.anisotropy = 16;
  }, [cardTexture]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  // Give the card a small nudge so it swings on mount
  useEffect(() => {
    const id = setTimeout(() => {
      card.current?.applyImpulse({ x: -2, y: 0.5, z: 0 }, true);
    }, 400);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  lanyardTexture.wrapS = lanyardTexture.wrapT = THREE.RepeatWrapping;
  curve.curveType = "chordal";

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z,
      });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        const body = ref.current as LerpedBody;
        if (!body.lerped)
          body.lerped = new THREE.Vector3().copy(
            body.translation() as THREE.Vector3
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(
            1,
            body.lerped.distanceTo(body.translation() as THREE.Vector3)
          )
        );
        body.lerped.lerp(
          body.translation() as THREE.Vector3,
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      const j1b = j1.current as LerpedBody;
      const j2b = j2.current as LerpedBody;

      curve.points[0]!.copy(j3.current.translation() as THREE.Vector3);
      curve.points[1]!.copy(j2b.lerped!);
      curve.points[2]!.copy(j1b.lerped!);
      curve.points[3]!.copy(fixed.current.translation() as THREE.Vector3);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (band.current.geometry as any).setPoints(
        curve.getPoints(isMobile ? 16 : 32)
      );

      ang.copy(card.current.angvel() as THREE.Vector3);
      rot.copy(card.current.rotation() as unknown as THREE.Vector3);
      card.current.setAngvel(
        { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
        true
      );
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(
                    vec.copy(card.current.translation() as THREE.Vector3)
                  )
              );
            }}
          >
            {/* Single mesh — texture left half = front, right half = back */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                color={new THREE.Color(cardImageSrc ? "#ffffff" : "#808080")}
                map={cardTexture}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              material-roughness={0.3 as any}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={lanyardTexture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}: LanyardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Generate the combined card texture once
  const cardImageSrc = useCardTexture();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    const obs = new ResizeObserver(update);
    obs.observe(containerRef.current);
    update();
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        style={{ width: dimensions.width, height: dimensions.height }}
        onCreated={({ gl }) =>
          gl.setClearColor(
            new THREE.Color(0x000000),
            transparent ? 0 : 1
          )
        }
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band
              isMobile={isMobile}
              cardImageSrc={cardImageSrc}
              width={dimensions.width}
              height={dimensions.height}
            />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(CARD_GLB);
