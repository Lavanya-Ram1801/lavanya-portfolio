import { certifications } from '../data/profile'
import { Icon } from './Icons'
import { Reveal, SectionHeading } from './Reveal'

export function Certifications() {
  return (
    <section id="certifications" className="section section--tight certs" aria-labelledby="certs-title">
      <div className="container container--narrow">
        <SectionHeading eyebrow="CERTIFICATIONS" id="certs-title">
          Always <em className="grad">learning.</em>
        </SectionHeading>

        <ul className="certs__grid">
          {certifications.map((c, i) => (
            <Reveal as="li" key={c.title + c.issuer} className="cert" delay={i * 60}>
              <span className="cert__icon">
                <Icon name="award" size={18} />
              </span>
              <div>
                <h3>{c.title}</h3>
                <p>{c.issuer}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
