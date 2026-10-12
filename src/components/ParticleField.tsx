import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  a: number
  tw: number
}

/**
 * A deliberately light particle field: ~36 slow pink motes on a fixed canvas.
 * Pauses when the tab is hidden; draws one static frame for reduced motion.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let w = 0
    let h = 0
    let raf = 0
    let particles: Particle[] = []

    const seed = () => {
      const count = Math.round(Math.min(40, Math.max(18, (w * h) / 38000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.18 + 0.04),
        a: Math.random() * 0.5 + 0.15,
        tw: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
      draw(0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        const twinkle = 0.65 + 0.35 * Math.sin(t * 0.0012 + p.tw)
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 102, 139, ${(p.a * twinkle).toFixed(3)})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const tick = (t: number) => {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -4) p.y = h + 4
        if (p.x < -4) p.x = w + 4
        if (p.x > w + 4) p.x = -4
      }
      draw(t)
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (reduced || raf) return
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    resize()
    start()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
