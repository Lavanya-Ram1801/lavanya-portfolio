import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  /** stagger in milliseconds */
  delay?: number
}

/** Fades + lifts its children in when scrolled into view. */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: RevealProps) {
  const ref = useReveal<HTMLElement>()
  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </Tag>
  )
}

interface HeadingProps {
  eyebrow: string
  children: ReactNode
  id: string
  className?: string
}

export function SectionHeading({ eyebrow, children, id, className = '' }: HeadingProps) {
  return (
    <Reveal className={`section-heading ${className}`.trim()}>
      <p className="eyebrow">
        <span className="eyebrow__line" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id}>{children}</h2>
    </Reveal>
  )
}
