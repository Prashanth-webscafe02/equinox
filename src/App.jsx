import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Intro from './components/Intro.jsx'
import TrackBand from './components/TrackBand.jsx'
import SurfaceStudio from './components/SurfaceStudio.jsx'
import Sports from './components/Sports.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import Values from './components/Values.jsx'
import Projects from './components/Projects.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer, { Clients, Dock } from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main id="top" className="pb-[84px] md:pb-0">
        <Hero />
        <Intro />
        <TrackBand />
        <SurfaceStudio />
        <Sports />
        <Services />
        <Process />
        <Values />
        <Projects />
        <Testimonials />
        <Clients />
        <Contact />
      </main>
      <Footer />
      <Dock />
    </>
  )
}
