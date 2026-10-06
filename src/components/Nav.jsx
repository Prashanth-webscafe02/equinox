import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '../data.js'
import { useScroll } from '../hooks.js'
import { Button } from './ui.jsx'

export function Brand() {
  return (
    <Link to="/" className="mr-auto flex items-center" aria-label="Equinox Sports Infra home">
      <img src="/img/logo-dark.png" alt="Equinox Sports Infra" width="270" height="87" className="h-9 w-auto md:h-10" />
    </Link>
  )
}

export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const lastY = useRef(0)
  const bar = useRef(null)
  const { pathname } = useLocation()

  // hide on scroll down, show on scroll up
  useScroll(() => {
    const y = window.scrollY
    setHidden(y > lastY.current && y > 200)
    lastY.current = y
    const max = document.documentElement.scrollHeight - window.innerHeight
    bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
  })

  // highlight the section in the middle of the screen
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    navLinks.forEach(l => {
      const el = document.getElementById(l.id)
      if (el) io.observe(el)
    })
    setActive('')
    setOpen(false)
    return () => io.disconnect()
  }, [pathname])

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* race progress */}
      <div ref={bar} className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left scale-x-0 bg-accent" aria-hidden="true" />
      <header
        className={`fixed inset-x-0 top-2 z-50 px-2.5 transition-transform duration-500 ease-ios md:top-3 md:px-6 ${
          hidden && !open ? '-translate-y-[120%]' : ''
        }`}
      >
        <div className="glass mx-auto flex h-[54px] max-w-[1160px] items-center gap-6 rounded-full pr-2.5 pl-3.5 md:h-[60px] md:pl-[18px]">
          <Brand />
          <nav className="hidden gap-1 lg:flex" aria-label="Primary">
            {navLinks.map(l => (
              <Link
                key={l.id}
                to={`/#${l.id}`}
                className={`rounded-full px-3.5 py-2 text-[15px] transition-colors hover:bg-ink/6 hover:text-ink ${
                  active === l.id ? 'bg-ink/6 text-ink' : 'text-ink-2'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button href="#contact" arrow className="!h-10 !px-[18px] !text-[15px]">Get a quote</Button>
          </div>
          <button
            className="grid size-10 cursor-pointer place-content-center gap-1.5 rounded-full bg-ink/6 lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className={`block h-[1.6px] w-4 rounded bg-ink transition-transform duration-400 ease-ios ${open ? 'translate-y-[3.8px] rotate-45' : ''}`} />
            <span className={`block h-[1.6px] w-4 rounded bg-ink transition-transform duration-400 ease-ios ${open ? '-translate-y-[3.8px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      {/* mobile sheet */}
      <div
        className={`fixed inset-0 z-40 bg-ink/25 transition-[opacity,visibility] duration-400 ease-ios lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div
          className={`glass absolute inset-x-3 top-[76px] rounded-card px-2 py-2.5 transition-transform duration-500 ease-ios ${
            open ? '' : '-translate-y-4 scale-[0.98]'
          }`}
        >
          {navLinks.map(l => (
            <Link key={l.id} to={`/#${l.id}`} className="flex justify-between border-b border-line px-3.5 py-4 text-xl font-medium last:border-0">
              {l.label} <span className="text-ink-3">›</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
