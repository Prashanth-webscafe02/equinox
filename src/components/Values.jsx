import { useRef } from 'react'
import { values } from '../data.js'
import { reduceMotion, useScroll } from '../hooks.js'
import { Reveal, Wrap } from './ui.jsx'

export default function Values() {
  const section = useRef(null)
  const bg = useRef(null)

  // background drifts slower than the page
  useScroll(() => {
    if (reduceMotion()) return
    const r = section.current.getBoundingClientRect()
    const vh = window.innerHeight
    if (r.bottom < 0 || r.top > vh) return
    bg.current.style.transform = `translateY(${((r.top + r.height / 2 - vh / 2) / vh) * -80}px)`
  })

  return (
    <section id="values" ref={section} className="relative m-1.5 overflow-hidden rounded-panel pt-[clamp(220px,30vw,400px)] pb-[clamp(24px,3vw,40px)] md:m-2.5">
      <div ref={bg} className="absolute inset-x-0 -inset-y-[15%] bg-[url(/img/projects/gym-rubber-floor.jpg)] bg-cover bg-center will-change-transform" />
      <Wrap className="relative grid gap-4 md:grid-cols-3">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.1} className="glass rounded-2xl px-5 py-4">
            <h3 className="mb-1 text-base font-medium">{v.title}</h3>
            <p className="text-sm leading-snug text-[#2b2f35]">{v.text}</p>
          </Reveal>
        ))}
      </Wrap>
    </section>
  )
}
