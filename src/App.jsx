import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Intro from './components/Intro.jsx'
import Recents from './components/Recents.jsx'
import SurfaceStudio from './components/SurfaceStudio.jsx'
import Sports from './components/Sports.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import Values from './components/Values.jsx'
import Projects from './components/Projects.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import SportPage from './components/SportPage.jsx'
import Footer, { Clients, Dock } from './components/Footer.jsx'

function Home() {
  return (
    <main id="top" className="pb-[84px] md:pb-0">
      <Hero />
      <Intro />
      <Recents />
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
  )
}

// New page → start at the top. A link like /#sports → scroll to that section once it renders.
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 60)
    return () => clearTimeout(t)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sports/:slug" element={<SportPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <Dock />
    </BrowserRouter>
  )
}
