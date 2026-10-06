import { useEffect, useRef, useState } from 'react'
import { projects } from '../data.js'
import { clamp, isMobile, useScroll } from '../hooks.js'
import { Eyebrow, Wrap } from './ui.jsx'

function Lightbox({ shot, onClose }) {
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      aria-hidden={!shot}
      className={`fixed inset-0 z-[60] grid place-items-center bg-[rgb(10_12_16/.6)] p-6 backdrop-blur-lg transition-[opacity,visibility] duration-400 ease-ios ${
        shot ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      {shot && <img src={shot.img} alt={shot.title} className="max-h-[86vh] rounded-card" style={{ animation: 'rise .5s var(--ease-ios) both' }} />}
      <button className="glass absolute top-5 right-5 size-11 cursor-pointer rounded-full" aria-label="Close">✕</button>
    </div>
  )
}

// Desktop: the section is tall and sticky, vertical scroll slides the row sideways.
// Mobile: a plain swipeable row with snap points.
export default function Projects() {
  const section = useRef(null)
  const track = useRef(null)
  const [shot, setShot] = useState(null)

  useScroll(() => {
    const el = section.current
    if (isMobile()) {
      el.style.height = ''
      track.current.style.transform = ''
      return
    }
    const vh = window.innerHeight
    const extra = Math.max(0, track.current.scrollWidth - window.innerWidth)
    el.style.height = `${vh + extra}px`
    const p = extra ? clamp(-el.getBoundingClientRect().top / extra, 0, 1) : 0
    track.current.style.transform = `translate3d(${-p * extra}px,0,0)`
  })

  return (
    <section id="work" ref={section} className="relative mt-[clamp(40px,6vw,80px)]">
      <div className="flex flex-col justify-center overflow-hidden py-20 md:sticky md:top-0 md:h-svh md:py-0">
        <Wrap className="mb-9 flex items-end justify-between">
          <div>
            <Eyebrow n="05">Projects</Eyebrow>
            <h2 className="h2">Recent grounds.</h2>
          </div>
          <p className="hidden text-sm text-ink-3 md:block">Scroll to browse · tap to enlarge</p>
        </Wrap>
        <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-[18px] overflow-x-auto px-4 pb-2 will-change-transform md:snap-none md:overflow-visible md:px-10">
          {projects.map((p, i) => (
            <figure key={p.img} className="group w-[78vw] flex-none cursor-zoom-in snap-center md:w-[clamp(280px,34vw,460px)]" onClick={() => setShot(p)}>
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className={`aspect-[4/5] w-full rounded-card object-cover shadow-soft transition-[transform,border-radius] duration-600 ease-ios group-hover:scale-[0.98] group-hover:rounded-[28px] ${
                  i % 2 ? 'md:mt-10 md:aspect-[4/4.4]' : ''
                }`}
              />
              <figcaption className="mt-3 text-[15px] text-ink-2">{p.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <Lightbox shot={shot} onClose={() => setShot(null)} />
    </section>
  )
}
