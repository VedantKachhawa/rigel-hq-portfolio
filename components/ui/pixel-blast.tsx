"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─── touch texture ────────────────────────────────────────────────── */
function createTouchTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.Texture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  const trail: { x: number; y: number; age: number; force: number; vx: number; vy: number }[] = [];
  let last: { x: number; y: number } | null = null;
  const maxAge = 64;
  let radius = 0.1 * size;

  const clear = () => { ctx.fillStyle = "black"; ctx.fillRect(0, 0, size, size); };

  const drawPoint = (p: typeof trail[0]) => {
    const pos = { x: p.x * size, y: (1 - p.y) * size };
    let intensity = 1;
    const t = p.age;
    if (t < maxAge * 0.3) intensity = Math.sin((t / (maxAge * 0.3)) * Math.PI * 0.5);
    else { const r = 1 - (t - maxAge * 0.3) / (maxAge * 0.7); intensity = r > 0 ? -r * (r - 2) : 0; }
    intensity *= p.force;
    const color = `${((p.vx + 1) / 2) * 255},${((p.vy + 1) / 2) * 255},${intensity * 255}`;
    const offset = size * 5;
    ctx.shadowOffsetX = offset; ctx.shadowOffsetY = offset;
    ctx.shadowBlur = radius;
    ctx.shadowColor = `rgba(${color},${0.22 * intensity})`;
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  return {
    texture,
    addTouch(norm: { x: number; y: number }) {
      let vx = 0, vy = 0, force = 0;
      if (last) {
        const dx = norm.x - last.x, dy = norm.y - last.y;
        if (dx === 0 && dy === 0) return;
        const d = Math.sqrt(dx * dx + dy * dy);
        vx = dx / d; vy = dy / d;
        force = Math.min((dx * dx + dy * dy) * 10000, 1);
      }
      last = { x: norm.x, y: norm.y };
      trail.push({ x: norm.x, y: norm.y, age: 0, force, vx, vy });
    },
    update() {
      clear();
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i]!;
        const f = p.force * (1 / maxAge) * (1 - p.age / maxAge);
        p.x += p.vx * f; p.y += p.vy * f; p.age++;
        if (p.age > maxAge) trail.splice(i, 1);
      }
      trail.forEach(drawPoint);
      texture.needsUpdate = true;
    },
    set radiusScale(v: number) { radius = 0.1 * size * v; },
  };
}

/* ─── shaders ─────────────────────────────────────────────────────── */
const VERT = `void main(){gl_Position=vec4(position,1.0);}`;

const FRAG = `
precision highp float;
uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;
uniform int   uShapeType;
const int MAX_CLICKS=10;
uniform vec2  uClickPos[MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];
out vec4 fragColor;

float Bayer2(vec2 a){a=floor(a);return fract(a.x/2.+a.y*a.y*.75);}
#define Bayer4(a)(Bayer2(.5*(a))*0.25+Bayer2(a))
#define Bayer8(a)(Bayer4(.5*(a))*0.25+Bayer2(a))
float hash11(float n){return fract(sin(n)*43758.5453);}
float vnoise(vec3 p){
  vec3 ip=floor(p),fp=fract(p);
  float n000=hash11(dot(ip+vec3(0,0,0),vec3(1,57,113)));
  float n100=hash11(dot(ip+vec3(1,0,0),vec3(1,57,113)));
  float n010=hash11(dot(ip+vec3(0,1,0),vec3(1,57,113)));
  float n110=hash11(dot(ip+vec3(1,1,0),vec3(1,57,113)));
  float n001=hash11(dot(ip+vec3(0,0,1),vec3(1,57,113)));
  float n101=hash11(dot(ip+vec3(1,0,1),vec3(1,57,113)));
  float n011=hash11(dot(ip+vec3(0,1,1),vec3(1,57,113)));
  float n111=hash11(dot(ip+vec3(1,1,1),vec3(1,57,113)));
  vec3 w=fp*fp*fp*(fp*(fp*6.-15.)+10.);
  return mix(mix(mix(n000,n100,w.x),mix(n010,n110,w.x),w.y),
             mix(mix(n001,n101,w.x),mix(n011,n111,w.x),w.y),w.z)*2.-1.;
}
float fbm2(vec2 uv,float t){
  vec3 p=vec3(uv*uScale,t);
  float s=1.0,f=1.0,a=1.0;
  for(int i=0;i<5;i++){s+=a*vnoise(p*f);f*=1.25;a*=1.0;}
  return s*0.5+0.5;
}
float maskCircle(vec2 p,float cov){
  float r=sqrt(cov)*.25,d=length(p-0.5)-r,aa=0.5*fwidth(d);
  return cov*(1.-smoothstep(-aa,aa,d*2.));
}
float maskTriangle(vec2 p,vec2 id,float cov){
  bool flip=mod(id.x+id.y,2.)>0.5;
  if(flip)p.x=1.-p.x;
  float r=sqrt(cov),d=p.y-r*(1.-p.x),aa=fwidth(d);
  return cov*clamp(0.5-d/aa,0.,1.);
}
float maskDiamond(vec2 p,float cov){
  return step(abs(p.x-.49)+abs(p.y-.49),sqrt(cov)*.564);
}
void main(){
  float pixelSize=uPixelSize;
  vec2 fc=gl_FragCoord.xy-uResolution*.5;
  float ar=uResolution.x/uResolution.y;
  vec2 pixelId=floor(fc/pixelSize),pixelUV=fract(fc/pixelSize);
  float cps=8.*pixelSize;
  vec2 cellId=floor(fc/cps),cellCoord=cellId*cps;
  vec2 uv=cellCoord/uResolution*vec2(ar,1.);
  float base=fbm2(uv,uTime*.05);
  base=base*.5-.65;
  float feed=base+(uDensity-.5)*.3;
  if(uEnableRipples==1){
    for(int i=0;i<MAX_CLICKS;i++){
      vec2 pos=uClickPos[i];
      if(pos.x<0.)continue;
      vec2 cuv=(((pos-uResolution*.5-cps*.5)/uResolution))*vec2(ar,1.);
      float t=max(uTime-uClickTimes[i],0.);
      float r=distance(uv,cuv);
      float ring=exp(-pow((r-uRippleSpeed*t)/uRippleThickness,2.));
      float atten=exp(-1.*t)*exp(-10.*r);
      feed=max(feed,ring*atten*uRippleIntensity);
    }
  }
  float bayer=Bayer8(fc/uPixelSize)-.5;
  float bw=step(0.5,feed+bayer);
  float h=fract(sin(dot(floor(fc/uPixelSize),vec2(127.1,311.7)))*43758.5453);
  float jitterScale=1.+(h-.5)*uPixelJitter;
  float coverage=bw*jitterScale;
  float M;
  if(uShapeType==1)      M=maskCircle(pixelUV,coverage);
  else if(uShapeType==2) M=maskTriangle(pixelUV,pixelId,coverage);
  else if(uShapeType==3) M=maskDiamond(pixelUV,coverage);
  else                   M=coverage;
  if(uEdgeFade>0.){
    vec2 norm=gl_FragCoord.xy/uResolution;
    M*=smoothstep(0.,uEdgeFade,min(min(norm.x,norm.y),min(1.-norm.x,1.-norm.y)));
  }
  vec3 c=uColor;
  vec3 srgb=mix(c*12.92,1.055*pow(c,vec3(1./2.4))-.055,step(0.0031308,c));
  fragColor=vec4(srgb,M);
}
`;

const SHAPE_MAP: Record<string, number> = { square: 0, circle: 1, triangle: 2, diamond: 3 };
const MAX_CLICKS = 10;

export interface PixelBlastProps {
  variant?: "square" | "circle" | "triangle" | "diamond";
  pixelSize?: number;
  color?: string;
  patternScale?: number;
  patternDensity?: number;
  pixelSizeJitter?: number;
  enableRipples?: boolean;
  rippleSpeed?: number;
  rippleThickness?: number;
  rippleIntensityScale?: number;
  liquid?: boolean;
  liquidStrength?: number;
  liquidRadius?: number;
  liquidWobbleSpeed?: number;
  speed?: number;
  edgeFade?: number;
  noiseAmount?: number;
  transparent?: boolean;
  className?: string;
}

export default function PixelBlast({
  variant = "square",
  pixelSize = 3,
  color = "#B497CF",
  patternScale = 2,
  patternDensity = 1,
  pixelSizeJitter = 0,
  enableRipples = true,
  rippleSpeed = 0.3,
  rippleThickness = 0.1,
  rippleIntensityScale = 1,
  liquid = false,
  liquidStrength: _liquidStrength = 0.1,
  liquidRadius = 1,
  liquidWobbleSpeed: _liquidWobbleSpeed = 4.5,
  speed = 0.5,
  edgeFade = 0.25,
  transparent = true,
  className,
}: PixelBlastProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(speed);

  useEffect(() => { speedRef.current = speed; }, [speed]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (transparent) renderer.setClearAlpha(0);
    else renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    const uniforms = {
      uResolution: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uClickPos: { value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1, -1)) },
      uClickTimes: { value: new Float32Array(MAX_CLICKS) },
      uShapeType: { value: SHAPE_MAP[variant] ?? 0 },
      uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
      uScale: { value: patternScale },
      uDensity: { value: patternDensity },
      uPixelJitter: { value: pixelSizeJitter },
      uEnableRipples: { value: enableRipples ? 1 : 0 },
      uRippleSpeed: { value: rippleSpeed },
      uRippleThickness: { value: rippleThickness },
      uRippleIntensity: { value: rippleIntensityScale },
      uEdgeFade: { value: edgeFade },
    };

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      glslVersion: THREE.GLSL3,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const clock = new THREE.Clock();
    const timeOffset = Math.random() * 1000;

    const setSize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
      uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(container);

    let clickIx = 0;
    const touch = liquid ? createTouchTexture() : null;
    if (touch) touch.radiusScale = liquidRadius;

    const mapToPixels = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const sx = renderer.domElement.width / rect.width;
      const sy = renderer.domElement.height / rect.height;
      return {
        fx: (e.clientX - rect.left) * sx,
        fy: (rect.height - (e.clientY - rect.top)) * sy,
      };
    };

    const onPointerDown = (e: PointerEvent) => {
      const { fx, fy } = mapToPixels(e);
      uniforms.uClickPos.value[clickIx].set(fx, fy);
      uniforms.uClickTimes.value[clickIx] = uniforms.uTime.value;
      clickIx = (clickIx + 1) % MAX_CLICKS;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!touch) return;
      const { fx, fy } = mapToPixels(e);
      touch.addTouch({ x: fx / renderer.domElement.width, y: fy / renderer.domElement.height });
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown, { passive: true });
    renderer.domElement.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    const animate = () => {
      uniforms.uTime.value = timeOffset + clock.getElapsedTime() * speedRef.current;
      if (touch) touch.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update uniforms on prop changes without reinitialising
  useEffect(() => { speedRef.current = speed; }, [speed]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0, overflow: "hidden" }}
      aria-hidden="true"
    />
  );
}
