# Attic — removed from the build, not deleted

These files were imported by nothing. They were still being type-checked,
linted, and (for the WebGL ones) pulling heavy dependencies into the
dependency graph.

They are parked here rather than deleted so nothing is lost. If you decide
you don't want them, delete this folder. If you want one back, move it to
`components/ui/` and re-add its dependency.

| File | Why it was pulled | Dependency it dragged in |
|---|---|---|
| `dither.tsx` | zero imports | `postprocessing`, `@react-three/postprocessing` (~90 KB) |
| `antigravity.tsx` | zero imports | — |
| `antigravity-canvas.tsx` | only used by `antigravity.tsx` | — |
| `kinetic-text.tsx` | zero imports | — |
| `profile-card.tsx` | zero imports (16 KB file) | — |
| `gradual-blur.tsx` | zero imports | — |
| `aldar-page.html` | 70 KB scraped reference page in the repo root | — |
