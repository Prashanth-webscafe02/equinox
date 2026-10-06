import { useEffect, useState } from 'react'
import { testimonials } from '../data.js'
import { Eyebrow, Reveal, Wrap } from './ui.jsx'

// position in the stack → look
const layers = [
  'z-30',
  'z-20 translate-y-4 scale-[0.94] opacity-80',
  'z-10 translate-y-[30px] scale-[0.88] opacity-55',
]

// iOS-style notification stack: tap to send the top card to the back.
export default function Testimonials() {
  const [top, setTop] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [paused, setPaused] = useState(false)

  const next = () => {
    if (leaving) return
    setLeaving(true)
    setTimeout(() => {
      setTop(t => (t + 1) % testimonials.length)
      setLeaving(false)
    }, 300)
  }

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [paused, top])

  return (
    <Wrap className="grid items-center gap-7 py-[clamp(96px,12vw,160px)] md:grid-cols-[1fr_1.1fr] md:gap-12">
      <Reveal>
        <Eyebrow n="06">From the stands</Eyebrow>
        <h2 className="h2">Word gets around.</h2>
        <p className="mt-4 max-w-[420px] text-ink-2">
          Schools, clubs and developers on what it was like to build with us, from the first site visit
          to the day their players stepped on court. Tap the stack to read the next one.
        </p>
      </Reveal>

      <div
        role="button"
        tabIndex={0}
        aria-label="Next testimonial"
        onClick={next}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), next())}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative h-80 cursor-pointer rounded-panel bg-[url(/img/acrylic-court.jpg)] bg-cover bg-center outline-none focus-visible:ring-3 focus-visible:ring-accent md:h-[300px]"
      >
        {testimonials.map((t, i) => {
          const pos = (i - top + testimonials.length) % testimonials.length
          const isTop = pos === 0
          return (
            <article
              key={t.name}
              className={`glass absolute inset-x-3.5 top-6 origin-top rounded-card px-5 py-[18px] transition duration-600 ease-ios md:inset-x-6 md:top-10 ${
                isTop && leaving ? 'z-30 -translate-y-10 scale-[1.02] opacity-0' : layers[pos]
              }`}
            >
              <div className={`transition-opacity duration-400 ${isTop ? '' : 'opacity-0'}`}>
                <header className="mb-1.5 flex items-center gap-2.5 text-[15px]">
                  <span className="grid size-[26px] place-items-center rounded-[7px] bg-ink text-[13px] font-bold text-white">E</span>
                  <b>{t.name}</b>
                  <span className="ml-auto text-[13px] text-ink-2">{t.place}</span>
                </header>
                <p className="text-[15px] text-[#24282d]">{t.text}</p>
              </div>
            </article>
          )
        })}
      </div>
    </Wrap>
  )
}
