import { profile } from '../data/profile'
import { Icon } from './Icons'
import { Reveal } from './Reveal'

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container container--narrow contact__inner">
        <Reveal>
          <p className="eyebrow eyebrow--center">
            <span className="eyebrow__line" aria-hidden="true" />
            CONTACT
          </p>
          <h2 id="contact-title">
            Have an idea? Let's build something <em className="grad">meaningful.</em>
          </h2>
          <p className="contact__lead">
            I'm interested in meaningful projects, learning opportunities, and opportunities to build
            useful technology.
          </p>
        </Reveal>

        <Reveal className="contact__actions" delay={100}>
          <a
            className="btn btn--primary"
            href={`mailto:${profile.email}`}
            data-magnetic
            data-cursor="LET'S TALK"
          >
            <Icon name="mail" size={16} />
            Send an email
          </a>
          <a
            className="btn btn--ghost"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
          >
            <Icon name="github" size={16} />
            Visit GitHub
          </a>
          <a
            className="btn btn--ghost"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
          >
            <Icon name="linkedin" size={16} />
            Connect on LinkedIn
          </a>
          {profile.hasResume && (
            <a
              className="btn btn--ghost"
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
            >
              <Icon name="file" size={16} />
              View resume
            </a>
          )}
        </Reveal>

        <Reveal className="contact__meta" delay={160}>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span aria-hidden="true">·</span>
          <span className="contact__loc">
            <Icon name="pin" size={14} />
            {profile.location}
          </span>
        </Reveal>
      </div>
    </section>
  )
}
