import { useRef, useState } from 'react'
import { steps } from '../data.js'
import { clamp, useScroll } from '../hooks.js'
import { Eyebrow, Wrap } from './ui.jsx'

const RING = 327 // circumference of r=52
const TICKS = Array.from({ length: 60 }, (_, i) => i)

export default function Process() {
  const list = useRef(null)
  const ring = useRef(null)
  const hand = useRef(null)
  const [active, setActive] = useState(0)
  const [ticks, setTicks] = useState(0)

  // ring + hand are written straight to the DOM each frame; state only changes per tick/step
  useScroll(() => {
    const vh = window.innerHeight
    const items = [...list.current.children]
    let a = 0
    items.forEach((el, i) => { if (el.getBoundingClientRect().top < vh * 0.6) a = i })
    setActive(a)
    const r = list.current.getBoundingClientRect()
    const p = clamp((vh * 0.6 - r.top) / r.height, 0, 1)
    ring.current.style.strokeDashoffset = RING - RING * p
    hand.current.setAttribute('transform', `rotate(${p * 360})`)
    setTicks(Math.floor(p * 60))
  })

  return (
    <section className="mx-1.5 rounded-panel bg-ink py-[clamp(96px,12vw,160px)] text-white md:mx-2.5">
      <Wrap className="grid gap-8 md:grid-cols-2 md:gap-16">
        {/* mobile: column dissolves so the stopwatch sticks for the whole list */}
        <div className="contents md:block md:sticky md:top-[120px] md:self-start">
          <div>
            <Eyebrow n="04" light>Game plan</Eyebrow>
            <h2 className="h2">From empty plot<br />to first whistle.</h2>
          </div>
          {/* stopwatch */}
          <div
            className="sticky top-[76px] z-10 -mt-4 size-[88px] self-start justify-self-end md:relative md:top-auto md:mt-14 md:size-[150px] md:justify-self-auto"
            aria-hidden="true"
          >
            <svg viewBox="0 0 150 150" className="size-full fill-none">
              <rect x="66" y="0" width="18" height="8" rx="3" className="fill-white/25" />
              <rect x="72" y="7" width="6" height="7" className="fill-white/25" />
              <g transform="translate(75 82)">
                {TICKS.map(i => (
                  <line key={i} y1={-62} y2={i % 5 ? -58 : -55} transform={`rotate(${i * 6})`}
                    className={i <= ticks ? 'stroke-accent' : 'stroke-white/20'} strokeWidth={i % 5 ? 1 : 1.6} />
                ))}
                <circle r="50" className="stroke-white/10" strokeWidth="5" />
                <circle ref={ring} r="50" className="stroke-accent" strokeWidth="5" strokeLinecap="round" transform="rotate(-90)"
                  strokeDasharray={RING} strokeDashoffset={RING} />
                <line ref={hand} y2={-38} className="stroke-white" strokeWidth="2" strokeLinecap="round" />
                <circle r="3" className="fill-white" />
              </g>
            </svg>
            <span className="absolute inset-x-0 bottom-[16px] text-center font-mono text-[8px] md:bottom-[30px] md:text-xs tracking-[0.12em] text-white/60">
              STEP {String(active + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        <ol ref={list} className="grid gap-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`rounded-card border border-white/8 p-[26px] transition duration-600 ease-ios md:p-9 ${
                i === active ? 'bg-white/8' : 'bg-white/4 md:scale-[0.97] md:opacity-35'
              }`}
            >
              <span className="font-mono text-sm text-peach">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-5 mb-2 text-xl font-medium md:mt-8">{s.title}</h3>
              <p className="text-white/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  )
}
