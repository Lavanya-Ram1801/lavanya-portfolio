import { useEffect, useRef } from 'react'
import { hasFinePointer, useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Desktop-only cursor: a dot that tracks the pointer exactly, plus a ring that
 * eases after it. Elements with `data-cursor="LABEL"` grow the ring and show the
 * label; elements with `data-magnetic` lean gently toward the pointer.
 *
 * Everything is imperative (refs + rAF), so mouse movement causes no re-renders.
 * It never captures events (pointer-events: none) and is not created at all on
 * touch devices. The native cursor is only hidden once this has mounted.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!hasFinePointer()) return
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    const root = document.documentElement
    let mx = -100
    let my = -100
    let rx = -100
    let ry = -100
    let raf = 0
    let magnet: HTMLElement | null = null

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }

    const loop = () => {
      const k = reduced ? 1 : 0.18
      rx += (mx - rx) * k
      ry += (my - ry) * k
      place(ring, rx, ry)
      raf = Math.abs(mx - rx) + Math.abs(my - ry) > 0.1 ? requestAnimationFrame(loop) : 0
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      mx = e.clientX
      my = e.clientY
      place(dot, mx, my)
      root.classList.add('cursor-visible')
      if (!raf) raf = requestAnimationFrame(loop)

      if (magnet && !reduced) {
        const r = magnet.getBoundingClientRect()
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.18
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.28
        magnet.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`
      }
    }

    const resetMagnet = () => {
      if (magnet) magnet.style.transform = ''
      magnet = null
    }

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null
      const labelEl = target?.closest<HTMLElement>('[data-cursor]')
      if (labelEl) {
        label.textContent = labelEl.dataset.cursor ?? ''
        root.classList.add('cursor-label')
      } else {
        root.classList.remove('cursor-label')
      }
      const interactive = target?.closest('a, button, [role="button"], summary')
      root.classList.toggle('cursor-link', Boolean(interactive) && !labelEl)

      const mag = target?.closest<HTMLElement>('[data-magnetic]') ?? null
      if (mag !== magnet) {
        resetMagnet()
        magnet = mag
      }
    }

    const onLeaveWindow = () => {
      root.classList.remove('cursor-visible', 'cursor-label', 'cursor-link')
      resetMagnet()
    }
    const onDown = () => root.classList.add('cursor-down')
    const onUp = () => root.classList.remove('cursor-down')

    root.classList.add('has-custom-cursor')
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerdown', onDown, { passive: true })
    document.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeaveWindow)

    return () => {
      cancelAnimationFrame(raf)
      resetMagnet()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow)
      root.classList.remove('has-custom-cursor', 'cursor-visible', 'cursor-label', 'cursor-link', 'cursor-down')
    }
  }, [reduced])

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={ringRef} className="cursor__ring">
        <span ref={labelRef} className="cursor__label" />
      </div>
      <div ref={dotRef} className="cursor__dot" />
    </div>
  )
}
