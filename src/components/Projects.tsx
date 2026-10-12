import { useRef } from 'react'
import { projects, type Project } from '../data/projects'
import { hasFinePointer, useReducedMotion } from '../hooks/useReducedMotion'
import { Icon } from './Icons'
import { ProjectPreview } from './ProjectPreviews'
import { Reveal, SectionHeading } from './Reveal'

function ProjectCard({ project, flip }: { project: Project; flip: boolean }) {
  const cardRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const interactive = !reduced

  // Pointer-driven tilt + light. Writes CSS variables directly (no React state).
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = cardRef.current
    if (!el || !interactive || e.pointerType === 'touch' || !hasFinePointer()) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
    el.style.setProperty('--ry', `${((x - 0.5) * 5).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${((0.5 - y) * 4).toFixed(2)}deg`)
  }
  const onLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  const hasLink = Boolean(project.repo || project.live)

  return (
    <Reveal as="div" className="project-wrap">
      <article
        ref={cardRef}
        className={`project project--${project.id}${flip ? ' project--flip' : ''}`}
        aria-labelledby={`project-${project.id}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        data-cursor={project.repo ? 'VIEW PROJECT' : undefined}
      >
        <span className="project__border" aria-hidden="true" />
        <span className="project__light" aria-hidden="true" />

        <div className="project__visual">
          <ProjectPreview id={project.id} />
          <span className="project__preview-note">Project preview · illustrative, not a screenshot</span>
        </div>

        <div className="project__body">
          <p className="project__meta">
            <span className="project__index">{project.index}</span>
            {project.category}
          </p>
          <h3 id={`project-${project.id}`} className="project__title">
            {project.title}
          </h3>
          <p className="project__desc">{project.description}</p>

          {project.highlights && (
            <div className="project__highlights">
              <p className="project__sub">{project.highlights.label}</p>
              <ul>
                {project.highlights.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="project__sub">Tech stack</p>
            <ul className="chips" aria-label={`${project.name} technologies`}>
              {project.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          {hasLink && (
            <div className="project__links">
              {project.repo && (
                <a
                  className="btn btn--ghost btn--sm"
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                >
                  <Icon name="github" size={16} />
                  GitHub repository
                  <Icon name="arrow-up-right" size={14} />
                </a>
              )}
              {project.live && (
                <a
                  className="btn btn--primary btn--sm"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                >
                  Live demo
                  <Icon name="arrow-up-right" size={14} />
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  )
}

export function Projects() {
  return (
    <section id="work" className="section projects" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading eyebrow="SELECTED WORK" id="work-title">
          Selected work. Built with <em className="grad">curiosity.</em>
        </SectionHeading>

        <div className="projects__list">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
