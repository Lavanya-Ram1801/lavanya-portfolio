import { useEffect, useState } from 'react'
import type { NavId } from '../data/profile'

/** Sections that are not in the nav map onto the nav item they belong to. */
const ALIAS: Record<string, NavId> = {
  home: 'home',
  work: 'work',
  about: 'about',
  skills: 'skills',
  experience: 'experience',
  education: 'experience',
  certifications: 'experience',
  contact: 'contact',
}

/** Tracks which section sits in the middle band of the viewport. */
export function useActiveSection(): NavId {
  const [active, setActive] = useState<NavId>('home')

  useEffect(() => {
    const els = Object.keys(ALIAS)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(ALIAS[entry.target.id])
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}
