import { About } from './components/About'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { CustomCursor } from './components/CustomCursor'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { ParticleField } from './components/ParticleField'
import { Projects } from './components/Projects'
import { ScrollProgress } from './components/ScrollProgress'
import { Skills } from './components/Skills'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to content
      </a>
      <ParticleField />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <CustomCursor />
    </>
  )
}
