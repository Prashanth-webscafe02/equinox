import { useEffect, useRef, useState } from 'react'
import { surfaces } from '../data.js'
import { useInView } from '../hooks.js'
import { Eyebrow, Reveal, Wrap } from './ui.jsx'

const DURATION = 6000

export default function SurfaceStudio() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const section = useRef(null)
  const list = useRef(null)
  const s = surfaces[current]

  useInView(section, setVisible, { threshold: 0.35 })

  // preload photos so the cross-fade never shows a blank frame
  useEffect(() => {
    surfaces.forEach(x => { new Image().src = x.img })
  }, [])

  // auto-advance while visible, until the visitor picks one
  useEffect(() => {
    if (!autoplay || !visible) return
    const t = setTimeout(() => setCurrent(c => (c + 1) % surfaces.length), DURATION)
    return () => clearTimeout(t)
  }, [current, autoplay, visible])

  // keep the active chip in view when the list scrolls sideways (tablet & mobile)
  useEffect(() => {
    const el = list.current
    if (el.scrollWidth > el.clientWidth) {
      el.scrollTo({ left: el.children[current].offsetLeft - 8, behavior: 'smooth' })
    }
  }, [current])

  const pick = i => {
    setAutoplay(false)
    setCurrent(i)
  }

  return (
    <section id="surfaces" ref={section}>
      <Wrap className="pt-[clamp(80px,10vw,140px)] pb-[clamp(96px,12vw,160px)]">
        <Reveal className="mb-[clamp(32px,5vw,56px)]">
          <Eyebrow n="01">Surface studio</Eyebrow>
          <h2 className="h2">Nine surfaces.<br /><span className="text-ink-3">Pick the one your game needs.</span></h2>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
          <ul ref={list} role="tablist" aria-label="Surfaces"
            className="no-scrollbar flex gap-1.5 self-start overflow-x-auto rounded-card bg-white p-2 shadow-soft lg:block lg:overflow-visible">
            {surfaces.map((x, i) => {
              const on = i === current
              return (
                <li key={x.name} className="flex-none">
                  <button
                    role="tab"
                    aria-selected={on}
                    onClick={() => pick(i)}
                    className={`relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-tile px-3.5 py-2.5 text-left whitespace-nowrap transition-colors lg:py-[13px] ${
                      on ? 'bg-ink/6 font-medium' : 'hover:bg-ink/4'
                    }`}
                  >
                    <span className={`size-[26px] flex-none rounded-lg ring-1 ring-black/5 ring-inset ${x.tx}`} />
                    {x.name}
                    <span className={`ml-auto hidden transition-transform duration-300 ease-ios lg:inline ${on ? 'translate-x-[3px] text-ink' : 'text-ink-3'}`}>›</span>
                    {on && autoplay && visible && (
                      <span key={current} className="absolute inset-x-3.5 bottom-1 h-0.5 origin-left animate-fill rounded bg-accent" style={{ '--dur': `${DURATION}ms` }} />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="relative min-h-[560px] overflow-hidden rounded-panel bg-neutral-300 shadow-lift lg:min-h-[600px]">
            {surfaces.map((x, i) => (
              <img
                key={x.img}
                src={x.img}
                alt={i === current ? x.name : ''}
                loading="lazy"
                className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-[900ms,1600ms] ease-ios ${
                  i === current ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0'
                }`}
              />
            ))}

            <div key={current} className="glass absolute inset-x-3 bottom-3 rounded-card p-[18px] md:inset-x-auto md:bottom-5 md:left-5 md:w-[420px] md:p-[22px]"
              style={{ animation: 'rise .6s var(--ease-ios) both' }}>
              <div className="mb-3 flex items-center gap-3.5">
                <span className={`size-14 flex-none rounded-2xl shadow-[inset_0_0_0_1px_rgb(0_0_0/.08),0_4px_12px_-4px_rgb(0_0_0/.25)] ${s.tx}`} />
                <div>
                  <h3 className="text-lg leading-tight font-medium">{s.name}</h3>
                  <p className="text-sm text-ink-2">{s.where}</p>
                </div>
              </div>
              <p className="text-[15px] text-[#2b2f35]">{s.text}</p>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {s.tags.map(t => (
                  <span key={t} className="rounded-full border border-line bg-white/70 px-[11px] py-[5px] text-[13px]">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  )
}
