import { profile } from '../data/profile'
import { Character } from './Character'
import { Icon } from './Icons'
import { scrollToSection } from './Navbar'

export function Hero() {
  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToSection(id)
  }

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__label">
            <span className="eyebrow__line" aria-hidden="true" />
            HELLO, I'M LAVANYA
          </p>

          <h1 id="hero-title" className="hero__title">
            <span className="line">
              <span className="line__inner" style={{ '--i': 0 } as React.CSSProperties}>
                Building <em className="grad">intelligent</em>
              </span>
            </span>
            <span className="line">
              <span className="line__inner" style={{ '--i': 1 } as React.CSSProperties}>
                experiences for the
              </span>
            </span>
            <span className="line">
              <span className="line__inner" style={{ '--i': 2 } as React.CSSProperties}>
                <em className="grad">digital world.</em>
              </span>
            </span>
          </h1>

          <p className="hero__subtitle">{profile.title}</p>
          <p className="hero__desc">
            I build intelligent applications and thoughtful digital experiences using AI, modern web
            technologies, and creative engineering.
          </p>

          <div className="hero__actions">
            <a href="#work" className="btn btn--primary" data-magnetic onClick={jump('work')}>
              EXPLORE MY WORK
              <Icon name="arrow-right" size={16} />
            </a>
            <a href="#contact" className="btn btn--ghost" data-magnetic data-cursor="LET'S TALK" onClick={jump('contact')}>
              LET'S CONNECT
            </a>
            {profile.hasResume && (
              <a
                href={profile.resumePath}
                className="btn btn--text"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
              >
                <Icon name="file" size={16} />
                VIEW RESUME
              </a>
            )}
          </div>

          <p className="hero__status">
            <span className="status-dot" aria-hidden="true" />
            OPEN TO INTERNSHIPS &amp; FRESHER OPPORTUNITIES
          </p>
        </div>

        <div className="hero__art">
          <Character />
        </div>
      </div>

      <a href="#work" className="hero__scroll" onClick={jump('work')} aria-label="Scroll to selected work">
        <span>SCROLL</span>
        <i aria-hidden="true" />
      </a>
    </section>
  )
}
