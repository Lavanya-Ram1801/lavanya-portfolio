import { education } from '../data/profile'
import { Icon } from './Icons'
import { Reveal, SectionHeading } from './Reveal'

export function Education() {
  return (
    <section id="education" className="section section--tight education" aria-labelledby="education-title">
      <div className="container container--narrow">
        <SectionHeading eyebrow="EDUCATION" id="education-title">
          Where I <em className="grad">studied.</em>
        </SectionHeading>

        <div className="education__grid">
          {education.map((e, i) => (
            <Reveal key={e.degree} className="edu-row" delay={i * 90}>
              <span className="edu-row__icon">
                <Icon name="graduation" size={20} />
              </span>
              <div>
                <p className="edu-row__years">{e.years}</p>
                <h3>{e.degree}</h3>
                <p className="edu-row__school">{e.school}</p>
                <p className="edu-row__score">{e.score}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
