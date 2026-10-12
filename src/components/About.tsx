import { education } from '../data/profile'
import { Icon } from './Icons'
import { Reveal, SectionHeading } from './Reveal'

const interests = [
  'Artificial Intelligence',
  'Natural Language Processing',
  'Generative AI',
  'Large Language Models',
  'Retrieval-Augmented Generation',
  'Full Stack Development',
  'Interactive User Experiences',
]

export function About() {
  const edu = education[0]
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="about__grid-bg" aria-hidden="true" />
      <div className="container about__layout">
        <div className="about__main">
          <SectionHeading eyebrow="ABOUT" id="about-title">
            A little about the <em className="grad">mind</em> behind the code.
          </SectionHeading>

          <Reveal className="about__text" delay={80}>
            <p>
              I'm Lavanya, an Artificial Intelligence and Data Science student interested in building
              practical AI applications and interactive web experiences.
            </p>
            <p>
              My interests include intelligent language systems, generative AI, backend development,
              and modern frontend engineering.
            </p>
            <p>
              I enjoy turning ideas into functional applications, learning new technologies, and
              exploring how thoughtful design can make software more useful.
            </p>
          </Reveal>

          <Reveal className="about__tags" delay={140}>
            <ul aria-label="Areas of interest">
              {interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="about__side" delay={120}>
          <div className="edu-card">
            <svg className="edu-card__orbit" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
              <circle cx="100" cy="100" r="86" />
              <circle cx="100" cy="100" r="54" />
              <circle cx="100" cy="14" r="3" className="dot" />
              <circle cx="176" cy="132" r="2.2" className="dot" />
            </svg>
            <span className="edu-card__icon">
              <Icon name="graduation" size={22} />
            </span>
            <p className="edu-card__kicker">EDUCATION</p>
            <h3>B.Tech Artificial Intelligence and Data Science</h3>
            <p className="edu-card__school">{edu.school}</p>
            <dl className="edu-card__meta">
              <div>
                <dt>Years</dt>
                <dd>{edu.years}</dd>
              </div>
              <div>
                <dt>CGPA</dt>
                <dd>8.4/10</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
