"use client";
/* eslint-disable react/no-unknown-property */
import { useRef, useEffect, forwardRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, wrapEffect } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import * as THREE from "three";

/* ─── shaders ──────────────────────────────────────────────────────── */
const waveVert = `
precision highp float;
varying vec2 vUv;
void main(){vUv=uv;gl_Position=projectionMatrix*viewMatrix*modelMatrix*vec4(position,1.0);}
`;

const waveFrag = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;

vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
vec2 fade(vec2 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}
float cnoise(vec2 P){
  vec4 Pi=floor(P.xyxy)+vec4(0,0,1,1);
  vec4 Pf=fract(P.xyxy)-vec4(0,0,1,1);
  Pi=mod289(Pi);
  vec4 ix=Pi.xzxz,iy=Pi.yyww,fx=Pf.xzxz,fy=Pf.yyww;
  vec4 i=permute(permute(ix)+iy);
  vec4 gx=fract(i*(1.0/41.0))*2.0-1.0,gy=abs(gx)-0.5,tx=floor(gx+0.5);
  gx-=tx;
  vec2 g00=vec2(gx.x,gy.x),g10=vec2(gx.y,gy.y),g01=vec2(gx.z,gy.z),g11=vec2(gx.w,gy.w);
  vec4 norm=taylorInvSqrt(vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11)));
  g00*=norm.x;g01*=norm.y;g10*=norm.z;g11*=norm.w;
  float n00=dot(g00,vec2(fx.x,fy.x)),n10=dot(g10,vec2(fx.y,fy.y)),n01=dot(g01,vec2(fx.z,fy.z)),n11=dot(g11,vec2(fx.w,fy.w));
  vec2 fxy=fade(Pf.xy);
  return 2.3*mix(mix(n00,n01,fxy.y),mix(n10,n11,fxy.y),fxy.x);
}
float fbm(vec2 p){float v=0.0,a=1.0,f=waveFrequency;for(int i=0;i<4;i++){v+=a*abs(cnoise(p));p*=f;a*=waveAmplitude;}return v;}
float pattern(vec2 p){vec2 p2=p-time*waveSpeed;return fbm(p+fbm(p2));}
void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  uv-=0.5;uv.x*=resolution.x/resolution.y;
  float f=pattern(uv);
  if(enableMouseInteraction==1){
    vec2 m=(mousePos/resolution-0.5)*vec2(1.0,-1.0);
    m.x*=resolution.x/resolution.y;
    f-=0.5*(1.0-smoothstep(0.0,mouseRadius,length(uv-m)));
  }
  gl_FragColor=vec4(mix(vec3(0.0),waveColor,f),1.0);
}
`;

const ditherFrag = `
precision highp float;
uniform float colorNum;
uniform float pixelSize;
const float bayer[64]=float[64](
  0.0/64.0,48.0/64.0,12.0/64.0,60.0/64.0, 3.0/64.0,51.0/64.0,15.0/64.0,63.0/64.0,
 32.0/64.0,16.0/64.0,44.0/64.0,28.0/64.0,35.0/64.0,19.0/64.0,47.0/64.0,31.0/64.0,
  8.0/64.0,56.0/64.0, 4.0/64.0,52.0/64.0,11.0/64.0,59.0/64.0, 7.0/64.0,55.0/64.0,
 40.0/64.0,24.0/64.0,36.0/64.0,20.0/64.0,43.0/64.0,27.0/64.0,39.0/64.0,23.0/64.0,
  2.0/64.0,50.0/64.0,14.0/64.0,62.0/64.0, 1.0/64.0,49.0/64.0,13.0/64.0,61.0/64.0,
 34.0/64.0,18.0/64.0,46.0/64.0,30.0/64.0,33.0/64.0,17.0/64.0,45.0/64.0,29.0/64.0,
 10.0/64.0,58.0/64.0, 6.0/64.0,54.0/64.0, 9.0/64.0,57.0/64.0, 5.0/64.0,53.0/64.0,
 42.0/64.0,26.0/64.0,38.0/64.0,22.0/64.0,41.0/64.0,25.0/64.0,37.0/64.0,21.0/64.0
);
vec3 dither(vec2 uv,vec3 color){
  vec2 sc=floor(uv*resolution/pixelSize);
  float threshold=bayer[int(mod(sc.y,8.0))*8+int(mod(sc.x,8.0))]-0.25;
  float step=1.0/(colorNum-1.0);
  color+=threshold*step;
  color=clamp(color-0.2,0.0,1.0);
  return floor(color*(colorNum-1.0)+0.5)/(colorNum-1.0);
}
void mainImage(in vec4 inputColor,in vec2 uv,out vec4 outputColor){
  vec2 np=pixelSize/resolution;
  vec4 color=texture2D(inputBuffer,np*floor(uv/np));
  color.rgb=dither(uv,color.rgb);
  outputColor=color;
}
`;

/* ─── RetroEffect ───────────────────────────────────────────────────── */
class RetroEffectImpl extends Effect {
  constructor() {
    const uniforms = new Map<string, THREE.Uniform<number>>([
      ["colorNum", new THREE.Uniform(4.0)],
      ["pixelSize", new THREE.Uniform(2.0)],
    ]);
    super("RetroEffect", ditherFrag, { uniforms });
  }
  set colorNum(v: number) { (this.uniforms.get("colorNum") as THREE.Uniform<number>).value = v; }
  get colorNum() { return (this.uniforms.get("colorNum") as THREE.Uniform<number>).value; }
  set pixelSize(v: number) { (this.uniforms.get("pixelSize") as THREE.Uniform<number>).value = v; }
  get pixelSize() { return (this.uniforms.get("pixelSize") as THREE.Uniform<number>).value; }
}

const WrappedRetro = wrapEffect(RetroEffectImpl);
const RetroEffect = forwardRef<RetroEffectImpl, { colorNum: number; pixelSize: number }>(
  ({ colorNum, pixelSize }, ref) => (
    // @ts-expect-error r3f wrapped effect
    <WrappedRetro ref={ref} colorNum={colorNum} pixelSize={pixelSize} />
  )
);
RetroEffect.displayName = "RetroEffect";

/* ─── Inner scene ───────────────────────────────────────────────────── */
interface WavesProps {
  waveSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  waveColor: [number, number, number];
  colorNum: number;
  pixelSize: number;
  disableAnimation: boolean;
  enableMouseInteraction: boolean;
  mouseRadius: number;
}

function DitheredWaves({
  waveSpeed, waveFrequency, waveAmplitude, waveColor,
  colorNum, pixelSize, disableAnimation, enableMouseInteraction, mouseRadius,
}: WavesProps) {
  const mouseRef = useRef(new THREE.Vector2());
  const { viewport, size, gl } = useThree();
  const prevColor = useRef<[number, number, number]>([...waveColor]);

  const uniforms = useRef({
    time:                   new THREE.Uniform(0),
    resolution:             new THREE.Uniform(new THREE.Vector2(1, 1)),
    waveSpeed:              new THREE.Uniform(waveSpeed),
    waveFrequency:          new THREE.Uniform(waveFrequency),
    waveAmplitude:          new THREE.Uniform(waveAmplitude),
    waveColor:              new THREE.Uniform(new THREE.Color(...waveColor)),
    mousePos:               new THREE.Uniform(new THREE.Vector2(0, 0)),
    enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),
    mouseRadius:            new THREE.Uniform(mouseRadius),
  });

  useEffect(() => {
    const dpr = gl.getPixelRatio();
    uniforms.current.resolution.value.set(
      Math.floor(size.width * dpr),
      Math.floor(size.height * dpr)
    );
  }, [size, gl]);

  useFrame(({ clock }) => {
    const u = uniforms.current;
    if (!disableAnimation) u.time.value = clock.getElapsedTime();
    u.waveSpeed.value = waveSpeed;
    u.waveFrequency.value = waveFrequency;
    u.waveAmplitude.value = waveAmplitude;
    if (!prevColor.current.every((v, i) => v === waveColor[i])) {
      u.waveColor.value.set(...waveColor);
      prevColor.current = [...waveColor];
    }
    u.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;
    u.mouseRadius.value = mouseRadius;
    if (enableMouseInteraction) u.mousePos.value.copy(mouseRef.current);
  });

  const handlePointerMove = (e: { clientX: number; clientY: number }) => {
    if (!enableMouseInteraction) return;
    const rect = gl.domElement.getBoundingClientRect();
    const dpr = gl.getPixelRatio();
    mouseRef.current.set((e.clientX - rect.left) * dpr, (e.clientY - rect.top) * dpr);
  };

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={waveVert} fragmentShader={waveFrag} uniforms={uniforms.current} />
      </mesh>
      {/* @ts-expect-error r3f postprocessing */}
      <EffectComposer>
        <RetroEffect colorNum={colorNum} pixelSize={pixelSize} />
      </EffectComposer>
      <mesh
        onPointerMove={handlePointerMove}
        position={[0, 0, 0.01]}
        scale={[viewport.width, viewport.height, 1]}
        visible={false}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
}

/* ─── Public component ──────────────────────────────────────────────── */
export interface DitherProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
  className?: string;
}

export default function Dither({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 1,
  className = "",
}: DitherProps) {
  return (
    <Canvas
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
      camera={{ position: [0, 0, 6] }}
      dpr={1}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
    >
      <DitheredWaves
        waveSpeed={waveSpeed}
        waveFrequency={waveFrequency}
        waveAmplitude={waveAmplitude}
        waveColor={waveColor}
        colorNum={colorNum}
        pixelSize={pixelSize}
        disableAnimation={disableAnimation}
        enableMouseInteraction={enableMouseInteraction}
        mouseRadius={mouseRadius}
      />
    </Canvas>
  );
}
