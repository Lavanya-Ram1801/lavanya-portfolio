import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icons'

/** Thin top progress bar + a back-to-top button. Scroll handling is rAF-throttled. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    let raf = 0
    let lastShow = false

    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`
      const show = window.scrollY > 640
      if (show !== lastShow) {
        lastShow = show
        setShowTop(show)
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div ref={barRef} className="scroll-progress__bar" />
      </div>
      <button
        type="button"
        className={`back-to-top${showTop ? ' is-shown' : ''}`}
        onClick={toTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <Icon name="arrow-up" size={18} />
      </button>
    </>
  )
}
