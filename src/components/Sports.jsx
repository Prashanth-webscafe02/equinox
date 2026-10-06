import { useEffect, useRef, useState } from 'react'
import { sports } from '../data.js'
import { Eyebrow, Reveal, Wrap } from './ui.jsx'

// A photo that trails the cursor while hovering a row (desktop only).
function Peek({ src }) {
  const ref = useRef(null)

  useEffect(() => {
    let x = 0, y = 0, tx = 0, ty = 0, frame
    const move = e => { tx = e.clientX; ty = e.clientY }
    const follow = () => {
      x += (tx - x) * 0.15
      y += (ty - y) * 0.15
      ref.current.style.left = `${x}px`
      ref.current.style.top = `${y}px`
      frame = requestAnimationFrame(follow)
    }
    window.addEventListener('mousemove', move, { passive: true })
    follow()
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(frame) }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-30 hidden h-[210px] w-[300px] overflow-hidden rounded-card shadow-lift transition-[opacity,transform] duration-500 ease-ios md:block ${
        src ? 'translate-x-8 -translate-y-1/2 scale-100 opacity-100' : 'translate-x-8 -translate-y-1/2 scale-60 opacity-0'
      }`}
    >
      {src && <img src={src} alt="" className="size-full object-cover" />}
    </div>
  )
}

export default function Sports() {
  const [hover, setHover] = useState(null)

  return (
    <section id="sports" className="rounded-t-panel bg-white py-[clamp(96px,12vw,160px)]">
      <Wrap>
        <Reveal className="mb-[clamp(32px,5vw,56px)] items-end justify-between gap-8 md:flex">
          <div>
            <Eyebrow n="02">Sports</Eyebrow>
            <h2 className="h2">Built to the game's <br />own rulebook.</h2>
          </div>
          <p className="mt-4 max-w-[380px] text-ink-2">
            Every court is laid out to the dimensions, markings and play characteristics its sport asks for, whether that is a club tennis court or a school athletics track.
          </p>
        </Reveal>

        <ol className="border-t border-line">
          {sports.map((s, i) => (
            <Reveal
              as="li"
              key={s.name}
              onMouseEnter={() => setHover(s.img)}
              onMouseLeave={() => setHover(null)}
              className="group grid grid-cols-[52px_1fr_auto] items-center gap-x-3.5 gap-y-0.5 border-b border-line px-1 py-[18px] transition-[padding] duration-500 ease-ios md:grid-cols-[44px_64px_1fr_auto_40px] md:gap-x-5 md:px-2 md:py-5 md:hover:pl-6"
            >
              <span className="hidden font-mono text-sm text-ink-3 md:block">{String(i + 1).padStart(2, '0')}</span>
              <svg viewBox="0 0 48 32" aria-hidden="true"
                className="row-span-2 h-9 w-[52px] fill-none stroke-ink-2 stroke-[1.3] transition-colors duration-300 group-hover:stroke-accent md:row-span-1 md:h-10 md:w-16">
                <path d={s.field} pathLength="1" className="draw" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="leading-tight tracking-[-0.01em]" style={{ fontSize: 'clamp(18px, 1.8vw, 24px)' }}>{s.name}</span>
              <span className="col-start-2 text-sm text-ink-2 md:col-start-auto md:text-right md:text-[15px]">{s.note}</span>
              <span className="hidden size-9 place-items-center justify-self-end rounded-full bg-ink/5 transition duration-500 ease-ios group-hover:rotate-45 group-hover:bg-accent group-hover:text-white md:grid">↗</span>
              <img src={s.img} alt="" loading="lazy" className="col-start-3 row-span-2 row-start-1 h-14 w-[74px] rounded-xl object-cover md:hidden" />
            </Reveal>
          ))}
        </ol>
      </Wrap>
      <Peek src={hover} />
    </section>
  )
}
