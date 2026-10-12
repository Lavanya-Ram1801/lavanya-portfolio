import { experience } from '../data/profile'
import { Icon } from './Icons'
import { Reveal, SectionHeading } from './Reveal'

export function Experience() {
  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="container container--narrow">
        <SectionHeading eyebrow="EXPERIENCE" id="experience-title">
          Internships that <em className="grad">taught me</em> to ship.
        </SectionHeading>

        <ol className="timeline">
          {experience.map((job, i) => (
            <Reveal as="li" key={job.role + job.period} className="timeline__item" delay={i * 90}>
              <span className="timeline__node" aria-hidden="true">
                <Icon name="briefcase" size={14} />
              </span>
              <div className="timeline__card">
                <p className="timeline__period">{job.period}</p>
                <h3>{job.role}</h3>
                <p className="timeline__company">{job.company}</p>
                <ul>
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
