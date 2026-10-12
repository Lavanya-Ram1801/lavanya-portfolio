import { skillGroups } from '../data/skills'
import { Icon } from './Icons'
import { Reveal, SectionHeading } from './Reveal'

export function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading eyebrow="SKILLS" id="skills-title">
          Tools I <em className="grad">work with</em> and keep learning.
        </SectionHeading>

        <div className="skills__grid">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} className={`skill-card skill-card--${i + 1}`} delay={i * 70}>
              <div className="skill-card__head">
                <span className="skill-card__icon">
                  <Icon name={group.icon} size={20} />
                </span>
                <h3>{group.title}</h3>
              </div>
              <ul className="chips">
                {group.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
