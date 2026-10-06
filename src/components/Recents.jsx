import { useEffect, useRef, useState } from 'react'
import { builds, sports } from '../data.js'
import { reduceMotion } from '../hooks.js'
import { Eyebrow, Wrap } from './ui.jsx'

const fieldOf = name => sports.find(s => s.name === name).field

// Like the One UI "recent apps" screen: a swipeable row of app cards where the leading
// card sits full size and the ones after it shrink and dim as they move away.
export default function Recents() {
  const track = useRef(null)
  const [active, setActive] = useState(0)

  // scale / dim each card by its distance from the centre of the row
  useEffect(() => {
    const el = track.current
    let frame
    const update = () => {
      const start = el.scrollLeft + parseFloat(getComputedStyle(el).paddingLeft)
      let closest = 0
      let best = Infinity
      ;[...el.children].forEach((card, i) => {
        const d = (card.offsetLeft - start) / card.offsetWidth // 0 at the leading edge, ±1 one card away
        const a = Math.min(Math.abs(d), 1.6)
        if (Math.abs(d) < best) { best = Math.abs(d); closest = i }
        if (reduceMotion()) return
        card.style.transform = `scale(${1 - a * 0.12})`
        card.style.setProperty('--dim', String(a * 0.45))
      })
      setActive(closest)
    }
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    el.scrollLeft = 0 // always open on the first card
    update()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // drag with the mouse on desktop (touch already swipes natively)
  useEffect(() => {
    const el = track.current
    let startX = 0
    let startLeft = 0
    let dragging = false
    const down = e => {
      if (e.pointerType !== 'mouse') return
      dragging = true
      startX = e.clientX
      startLeft = el.scrollLeft
      el.style.scrollSnapType = 'none'
      el.style.cursor = 'grabbing'
    }
    const move = e => { if (dragging) el.scrollLeft = startLeft - (e.clientX - startX) }
    const up = () => {
      if (!dragging) return
      dragging = false
      el.style.cursor = ''
      // snap to the nearest card once the drag ends
      const card = el.children[0]
      const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || 0)
      el.style.scrollSnapType = ''
      el.scrollTo({ left: Math.round(el.scrollLeft / step) * step, behavior: 'smooth' })
    }
    el.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  const go = i => {
    const el = track.current
    const card = el.children[Math.max(0, Math.min(builds.length - 1, i))]
    el.scrollTo({ left: card.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: 'smooth' })
  }

  const arrow = 'glass grid size-11 cursor-pointer place-items-center rounded-full text-lg transition hover:scale-105 disabled:opacity-40'

  return (
    <section aria-label="What we build" className="pb-[clamp(40px,6vw,80px)]">
      <Wrap className="mb-6 flex items-end justify-between gap-6">
        <div>
          <Eyebrow>What we build</Eyebrow>
          <p className="max-w-[540px] text-ink-2">
            Swipe through the grounds we lay, from running tracks to gym floors. Each one is planned around
            the sport it hosts, built on a properly prepared base and finished with surfaces made to take
            years of daily play.
          </p>
        </div>
        <div className="hidden gap-2 md:flex">
          <button className={arrow} onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous">‹</button>
          <button className={arrow} onClick={() => go(active + 1)} disabled={active === builds.length - 1} aria-label="Next">›</button>
        </div>
      </Wrap>

      <div
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto py-4 [--pad:16px] sm:[--pad:24px] lg:[--pad:40px] select-none md:cursor-grab"
        style={{
          // first card lines up with the page gutter; the tail lets the last card reach that spot too
          '--gutter': 'max(var(--pad), (100% - 1240px) / 2 + var(--pad))',
          paddingLeft: 'var(--gutter)',
          paddingRight: 'calc(100% - min(72vw, 380px) - var(--gutter))',
          scrollPaddingLeft: 'var(--gutter)',
        }}
      >
        {builds.map(b => (
          <article key={b.name} className="w-[min(72vw,380px)] flex-none origin-left snap-start transition-transform duration-150 ease-out" style={{ '--dim': 0 }}>
            {/* app label above the card */}
            <div className="mb-3 flex items-center gap-2.5 px-1">
              <span className="grid size-8 place-items-center rounded-[10px] bg-ink shadow-soft">
                <svg viewBox="0 0 48 32" className="w-6 fill-none stroke-white stroke-[2]" aria-hidden="true">
                  <path d={fieldOf(b.sport)} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[15px] font-medium">{b.name}</span>
            </div>

            <div className="relative h-[clamp(380px,62vh,520px)] overflow-hidden rounded-[30px] bg-neutral-300 shadow-lift">
              <img src={b.img} alt={b.name} loading="lazy" draggable="false" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
              <div className="absolute inset-0 bg-bg transition-opacity duration-150" style={{ opacity: 'var(--dim)' }} />
              <div className="absolute inset-x-5 bottom-5 text-white">
                <p className="mb-4 max-w-[300px] text-[15px] text-white/85">{b.text}</p>
                <a href="#contact" className="glass-dark inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium">
                  Get a quote <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* page dots */}
      <div className="mt-4 flex justify-center gap-1.5" aria-hidden="true">
        {builds.map((b, i) => (
          <span key={b.name} className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-5 bg-ink' : 'w-1.5 bg-ink/20'}`} />
        ))}
      </div>
    </section>
  )
}
