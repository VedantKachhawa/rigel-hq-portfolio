"use client";

import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type CSSProperties,
} from "react";

/* ─── CSS injection ─────────────────────────────────────────────────── */
const PROFILE_CARD_CSS = `
:root{--pointer-x:50%;--pointer-y:50%;--pointer-from-center:0;--pointer-from-top:0.5;--pointer-from-left:0.5;--card-opacity:0;--rotate-x:0deg;--rotate-y:0deg;--background-x:50%;--background-y:50%;--grain:none;--icon:none;--behind-glow-color:rgba(125,190,255,0.67);--behind-glow-size:25%;--inner-gradient:none;--sunpillar-1:hsl(2,100%,73%);--sunpillar-2:hsl(53,100%,69%);--sunpillar-3:hsl(93,100%,69%);--sunpillar-4:hsl(176,100%,76%);--sunpillar-5:hsl(228,100%,74%);--sunpillar-6:hsl(283,100%,73%);--sunpillar-clr-1:var(--sunpillar-1);--sunpillar-clr-2:var(--sunpillar-2);--sunpillar-clr-3:var(--sunpillar-3);--sunpillar-clr-4:var(--sunpillar-4);--sunpillar-clr-5:var(--sunpillar-5);--sunpillar-clr-6:var(--sunpillar-6);--card-radius:30px}
.pc-card-wrapper{perspective:500px;transform:translate3d(0,0,0.1px);position:relative;touch-action:none}
.pc-behind{position:absolute;inset:0;z-index:0;pointer-events:none;background:radial-gradient(circle at var(--pointer-x) var(--pointer-y),var(--behind-glow-color) 0%,transparent var(--behind-glow-size));filter:blur(50px) saturate(1.1);opacity:calc(0.8 * var(--card-opacity));transition:opacity 200ms ease}
.pc-card-wrapper:hover,.pc-card-wrapper.active{--card-opacity:1}
.pc-card{height:80svh;max-height:540px;display:grid;aspect-ratio:0.718;border-radius:var(--card-radius);position:relative;background-blend-mode:color-dodge,normal,normal,normal;animation:glow-bg 12s linear infinite;box-shadow:rgba(0,0,0,0.8) calc((var(--pointer-from-left) * 10px) - 3px) calc((var(--pointer-from-top) * 20px) - 6px) 20px -5px;transition:transform 1s ease;transform:translateZ(0) rotateX(0deg) rotateY(0deg);background:rgba(0,0,0,0.9);backface-visibility:hidden;overflow:hidden}
.pc-card:hover,.pc-card.active{transition:none;transform:translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))}
.pc-card-shell.entering .pc-card{transition:transform 180ms ease-out}
.pc-card-shell{position:relative;z-index:1}
.pc-card *{display:grid;grid-area:1/-1;border-radius:var(--card-radius);pointer-events:none}
.pc-inside{inset:0;position:absolute;background-image:var(--inner-gradient);background-color:rgba(0,0,0,0.9);transform:none}
.pc-shine{display:none!important}
.pc-glare{display:none!important}
.pc-avatar-content{mix-blend-mode:luminosity;overflow:visible;transform:translateZ(2);backface-visibility:hidden}
.pc-avatar-content .avatar{width:100%;position:absolute;left:50%;transform-origin:50% 100%;transform:translateX(calc(-50% + (var(--pointer-from-left) - 0.5) * 6px)) translateZ(0) scaleY(calc(1 + (var(--pointer-from-top) - 0.5) * 0.02)) scaleX(calc(1 + (var(--pointer-from-left) - 0.5) * 0.01));bottom:-1px;backface-visibility:hidden;will-change:transform;transition:transform 120ms ease-out}
.pc-user-info{position:absolute;--ui-inset:20px;--ui-radius-bias:6px;bottom:var(--ui-inset);left:var(--ui-inset);right:var(--ui-inset);z-index:2;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.1);backdrop-filter:blur(30px);border:1px solid rgba(255,255,255,0.1);border-radius:calc(max(0px,var(--card-radius) - var(--ui-inset) + var(--ui-radius-bias)));padding:12px 14px;pointer-events:auto}
.pc-user-details{display:flex;align-items:center;gap:12px}
.pc-mini-avatar{width:48px;height:48px;border-radius:50%;overflow:hidden;border:1px solid rgba(255,255,255,0.1);flex-shrink:0}
.pc-mini-avatar img{width:100%;height:100%;object-fit:cover;border-radius:50%}
.pc-user-text{display:flex;align-items:flex-start;flex-direction:column;gap:6px}
.pc-handle{font-size:14px;font-weight:500;color:rgba(255,255,255,0.9);line-height:1}
.pc-status{font-size:14px;color:rgba(255,255,255,0.7);line-height:1}
.pc-contact-btn{border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px 16px;font-size:12px;font-weight:600;color:rgba(255,255,255,0.9);cursor:pointer;transition:all 0.2s ease;backdrop-filter:blur(10px);background:transparent}
.pc-contact-btn:hover{border-color:rgba(255,255,255,0.4);transform:translateY(-1px)}
.pc-content:not(.pc-avatar-content){max-height:100%;overflow:hidden;text-align:center;position:relative;transform:translate3d(calc(var(--pointer-from-left) * -6px + 3px),calc(var(--pointer-from-top) * -6px + 3px),0.1px);z-index:5;mix-blend-mode:luminosity}
.pc-details{width:100%;position:absolute;top:3em;display:flex;flex-direction:column}
.pc-details h3{font-weight:600;margin:0;font-size:min(5svh,3em);background-image:linear-gradient(to bottom,#fff,#6f6fbe);background-size:1em 1.5em;-webkit-text-fill-color:transparent;background-clip:text;-webkit-background-clip:text}
.pc-details p{font-weight:600;position:relative;top:-12px;white-space:nowrap;font-size:16px;margin:0 auto;width:min-content;background-image:linear-gradient(to bottom,#fff,#4a4ac0);background-size:1em 1.5em;-webkit-text-fill-color:transparent;background-clip:text;-webkit-background-clip:text}
@keyframes glow-bg{0%{--bgrotate:0deg}100%{--bgrotate:360deg}}
@keyframes holo-bg{0%{background-position:0 var(--background-y),0 0,center}100%{background-position:0 var(--background-y),90% 90%,center}}
@media(max-width:768px){.pc-card{height:70svh;max-height:450px}.pc-details{top:2em}.pc-details h3{font-size:min(4svh,2.5em)}.pc-details p{font-size:14px}.pc-user-info{--ui-inset:15px;padding:10px 12px}.pc-mini-avatar{width:28px;height:28px}.pc-user-details{gap:10px}.pc-handle{font-size:13px}.pc-status{font-size:10px}.pc-contact-btn{padding:6px 12px;font-size:11px}}
`;

function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("profile-card-styles")) return;
  const s = document.createElement("style");
  s.id = "profile-card-styles";
  s.textContent = PROFILE_CARD_CSS;
  document.head.appendChild(s);
}

/* ─── Types ─────────────────────────────────────────────────────────── */
export interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

const DEFAULT_INNER_GRADIENT = "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";
const ANIM = { INITIAL_DURATION: 1200, INITIAL_X_OFFSET: 70, INITIAL_Y_OFFSET: 60, DEVICE_BETA_OFFSET: 20, ENTER_TRANSITION_MS: 180 };

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v: number, p = 3) => parseFloat(v.toFixed(p));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

/* ─── Component ─────────────────────────────────────────────────────── */
function ProfileCardComponent({
  avatarUrl = "",
  iconUrl = "",
  grainUrl = "",
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = "",
  enableTilt = true,
  _enableMobileTilt = false,
  _mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "",
  title = "",
  handle = "",
  status = "Available",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}: ProfileCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  useEffect(() => { injectStyles(); }, []);

  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;
    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0, currentY = 0, targetX = 0, targetY = 0;
    let initialUntil = 0;

    const setVars = (x: number, y: number) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;
      const w = shell.clientWidth || 1, h = shell.clientHeight || 1;
      const px = clamp((100 / w) * x), py = clamp((100 / h) * y);
      const cx = px - 50, cy = py - 50;
      const props: Record<string, string> = {
        "--pointer-x": `${px}%`, "--pointer-y": `${py}%`,
        "--background-x": `${adjust(px, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(py, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(py - 50, px - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${py / 100}`, "--pointer-from-left": `${px / 100}`,
        "--rotate-x": `${round(-(cx / 5))}deg`, "--rotate-y": `${round(cy / 4)}deg`,
      };
      for (const [k, v] of Object.entries(props)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      const tau = ts < initialUntil ? 0.6 : 0.14;
      const k = 1 - Math.exp(-dt / tau);
      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;
      setVars(currentX, currentY);
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05 || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else { running = false; lastTs = 0; if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }
    };

    const start = () => { if (running) return; running = true; lastTs = 0; rafId = requestAnimationFrame(step); };

    return {
      setImmediate(x: number, y: number) { currentX = x; currentY = y; setVars(x, y); },
      setTarget(x: number, y: number) { targetX = x; targetY = y; start(); },
      toCenter() { const s = shellRef.current; if (!s) return; this.setTarget(s.clientWidth / 2, s.clientHeight / 2); },
      beginInitial(ms: number) { initialUntil = performance.now() + ms; start(); },
      getCurrent() { return { x: currentX, y: currentY, tx: targetX, ty: targetY }; },
      cancel() { if (rafId) cancelAnimationFrame(rafId); rafId = null; running = false; lastTs = 0; },
    };
  }, [enableTilt]);

  const getOffsets = (e: React.PointerEvent, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const s = shellRef.current; if (!s || !tiltEngine) return;
    const { x, y } = getOffsets(e, s); tiltEngine.setTarget(x, y);
  }, [tiltEngine]);

  const handlePointerEnter = useCallback((e: React.PointerEvent) => {
    const s = shellRef.current; if (!s || !tiltEngine) return;
    s.classList.add("active", "entering");
    if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
    enterTimerRef.current = setTimeout(() => s.classList.remove("entering"), ANIM.ENTER_TRANSITION_MS);
    const { x, y } = getOffsets(e, s); tiltEngine.setTarget(x, y);
  }, [tiltEngine]);

  const handlePointerLeave = useCallback(() => {
    const s = shellRef.current; if (!s || !tiltEngine) return;
    tiltEngine.toCenter();
    const check = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      if (Math.hypot(tx - x, ty - y) < 0.6) { s.classList.remove("active"); leaveRafRef.current = null; }
      else leaveRafRef.current = requestAnimationFrame(check);
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(check);
  }, [tiltEngine]);

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;
    const s = shellRef.current; if (!s) return;
    const onMove = (e: React.PointerEvent) => handlePointerMove(e);
    const onEnter = (e: React.PointerEvent) => handlePointerEnter(e);
    const onLeave = () => handlePointerLeave();
    s.addEventListener("pointerenter", onEnter as unknown as EventListener);
    s.addEventListener("pointermove", onMove as unknown as EventListener);
    s.addEventListener("pointerleave", onLeave);
    const ix = (s.clientWidth || 0) - ANIM.INITIAL_X_OFFSET;
    tiltEngine.setImmediate(ix, ANIM.INITIAL_Y_OFFSET);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIM.INITIAL_DURATION);
    return () => {
      s.removeEventListener("pointerenter", onEnter as unknown as EventListener);
      s.removeEventListener("pointermove", onMove as unknown as EventListener);
      s.removeEventListener("pointerleave", onLeave);
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      s.classList.remove("entering");
    };
  }, [enableTilt, tiltEngine, handlePointerMove, handlePointerEnter, handlePointerLeave]);

  const cardStyle = useMemo(() => ({
    "--icon": iconUrl ? `url(${iconUrl})` : "none",
    "--grain": grainUrl ? `url(${grainUrl})` : "none",
    "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
    "--behind-glow-color": behindGlowColor ?? "rgba(125, 190, 255, 0.67)",
    "--behind-glow-size": behindGlowSize ?? "50%",
  } as CSSProperties), [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize]);

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={cardStyle}>
      {behindGlowEnabled && <div className="pc-behind" />}
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside">
            <div className="pc-shine" />
            <div className="pc-glare" />
            <div className="pc-content pc-avatar-content">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="avatar" src={avatarUrl} alt={`${name} avatar`} loading="lazy" />
              {showUserInfo && (
                <div className="pc-user-info">
                  <div className="pc-user-details">
                    <div className="pc-mini-avatar">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={miniAvatarUrl || avatarUrl} alt={`${name} mini`} loading="lazy" />
                    </div>
                    <div className="pc-user-text">
                      <div className="pc-handle">@{handle}</div>
                      <div className="pc-status">{status}</div>
                    </div>
                  </div>
                  <button
                    className="pc-contact-btn"
                    onClick={onContactClick}
                    type="button"
                    style={{ pointerEvents: "auto" }}
                    aria-label={`Contact ${name}`}
                  >
                    {contactText}
                  </button>
                </div>
              )}
            </div>
            <div className="pc-content">
              <div className="pc-details">
                <h3>{name}</h3>
                <p>{title}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
