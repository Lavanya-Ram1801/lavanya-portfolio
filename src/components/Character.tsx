import { useEffect, useRef } from 'react'
import { hasFinePointer, useReducedMotion } from '../hooks/useReducedMotion'

/**
 * The hero character (Lavanya's supplied artwork, cropped and edge-feathered by
 * scripts/process-image.py so it sits on the page without baked-in text or nav).
 *
 * The artwork is a flattened illustration, so the pupils cannot be moved
 * independently without distorting her face. Instead, on mouse devices the whole
 * figure turns very slightly toward the cursor with parallax layers (glow, orbit
 * lines, portrait). Touch devices get a calm idle float only.
 *
 * Pointer position is written to CSS variables from a rAF loop: no React state.
 */
export function Character() {
  const stageRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || reduced || !hasFinePointer()) return

    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let raf = 0

    const tick = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      stage.style.setProperty('--px', cx.toFixed(4))
      stage.style.setProperty('--py', cy.toFixed(4))
      const settled = Math.abs(tx - cx) < 0.0005 && Math.abs(ty - cy) < 0.0005
      raf = settled ? 0 : requestAnimationFrame(tick)
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      const nx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)
      const ny = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)
      tx = Math.max(-1, Math.min(1, nx))
      ty = Math.max(-1, Math.min(1, ny))
      kick()
    }
    const onLeave = () => {
      tx = 0
      ty = 0
      kick()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])

  return (
    <div ref={stageRef} className="character" role="img" aria-label="Illustrated portrait of Lavanya, a young woman with long, wavy black hair glancing to the side in soft crimson light">
      <div className="character__glow" aria-hidden="true" />
      <svg className="character__orbits" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
        <ellipse cx="300" cy="300" rx="282" ry="262" className="orbit orbit--a" />
        <ellipse cx="300" cy="300" rx="236" ry="300" className="orbit orbit--b" transform="rotate(-24 300 300)" />
        <circle cx="46" cy="212" r="3.2" className="orbit-dot" />
        <circle cx="548" cy="402" r="2.6" className="orbit-dot orbit-dot--alt" />
        <circle cx="330" cy="22" r="2.2" className="orbit-dot" />
      </svg>
      <div className="character__float">
        <img
          className="character__img"
          src="/img/lavanya-character.webp"
          srcSet="/img/lavanya-character-800.webp 800w, /img/lavanya-character.webp 1200w"
          sizes="(max-width: 900px) 92vw, 52vw"
          width={1200}
          height={954}
          alt=""
          decoding="async"
          fetchPriority="high"
          draggable={false}
        />
      </div>
      <span className="sparkle sparkle--1" aria-hidden="true" />
      <span className="sparkle sparkle--2" aria-hidden="true" />
      <span className="sparkle sparkle--3" aria-hidden="true" />
    </div>
  )
}
