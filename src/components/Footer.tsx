import { profile } from '../data/profile'
import { Icon } from './Icons'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__name">Lavanya R</p>
          <p className="footer__tag">Designed with curiosity. Built with code.</p>
        </div>
        <ul className="footer__links" aria-label="Social links">
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              <Icon name="github" size={18} />
              <span>GitHub</span>
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <Icon name="linkedin" size={18} />
              <span>LinkedIn</span>
            </a>
          </li>
        </ul>
        <p className="footer__copy">© {year} Lavanya R. All rights reserved.</p>
      </div>
    </footer>
  )
}
