import { useEffect, useRef, useState } from 'react'
import { contact, islandWords } from '../data.js'
import { clamp, reduceMotion, useScroll } from '../hooks.js'
import { Button } from './ui.jsx'

function Island() {
  const [index, setIndex] = useState(0)
  const [out, setOut] = useState(false)

  useEffect(() => {
    let swap
    const timer = setInterval(() => {
      setOut(true)
      swap = setTimeout(() => {
        setIndex(i => (i + 1) % islandWords.length)
        setOut(false)
      }, 350)
    }, 2600)
    return () => { clearInterval(timer); clearTimeout(swap) }
  }, [])

  return (
    <div
      className="glass-dark absolute top-[76px] left-1/2 flex h-10 -translate-x-1/2 items-center gap-2 rounded-full pr-[18px] pl-3.5 text-[13px] whitespace-nowrap md:top-[84px] md:text-sm"
      style={{ animation: 'rise 1s 0.6s var(--ease-ios) both' }}
      aria-live="polite"
    >
      <span className="size-2 animate-pulse-dot rounded-full bg-green" />
      <span>We build</span>
      <span className={`inline-block min-w-[9ch] font-medium transition duration-300 ease-ios ${out ? 'translate-y-1.5 opacity-0' : ''}`}>
        {islandWords[index]}
      </span>
    </div>
  )
}

export default function Hero() {
  const frame = useRef(null)

  // the card shrinks slightly as you scroll, like an app closing
  useScroll(() => {
    if (reduceMotion()) return
    const y = window.scrollY
    const vh = window.innerHeight
    if (y > vh * 1.2) return
    const p = clamp(y / vh, 0, 1)
    frame.current.style.transform = `scale(${1 - p * 0.08}) translateY(${p * 40}px)`
    frame.current.style.borderRadius = `${32 + p * 24}px`
  })

  return (
    <section className="h-svh min-h-[600px] p-1.5 md:min-h-[640px] md:p-2.5">
      <div ref={frame} className="relative h-full origin-top overflow-hidden rounded-[26px] bg-[#1a2a3a] will-change-transform md:rounded-panel">
        <img
          src="/img/hero-court.jpg"
          alt="Aerial view of a blue and yellow basketball court"
          className="absolute inset-0 size-full animate-hero-zoom object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgb(10 12 16 / .55) 0%, transparent 60%), linear-gradient(180deg, rgb(10 12 16 / .25) 0%, transparent 30%, rgb(10 12 16 / .15) 55%, rgb(10 12 16 / .78) 100%)',
          }}
        />

        <Island />

        <div className="absolute bottom-[clamp(28px,6vw,64px)] left-[clamp(20px,5vw,64px)] max-w-[680px] pr-5 text-white">
          <p className="eyebrow !text-peach">Redefining Safety</p>
          <h1 className="mb-5 leading-[1.08] font-medium tracking-[-0.025em]" style={{ fontSize: 'clamp(30px, min(4.2vw, 7.5vh), 56px)' }}>
            {['Where the game', 'finds its ground.'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className="block animate-line-up" style={{ animationDelay: `${i * 0.12}s` }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="mb-7 max-w-[500px] text-[15px] text-white/80 md:text-base" style={{ animation: 'rise 1s 0.4s var(--ease-ios) both' }}>
            Design, consultation and turnkey execution of sports infrastructure: from the first site visit to the last line marking.
          </p>
          <div className="flex flex-wrap gap-3" style={{ animation: 'rise 1s 0.55s var(--ease-ios) both' }}>
            <Button href="#contact" variant="light" arrow className="flex-auto sm:flex-none">Plan your facility</Button>
            <Button href="#surfaces" variant="ghost" className="flex-auto sm:flex-none">Explore surfaces</Button>
          </div>
        </div>

        <aside
          className="glass absolute right-[clamp(20px,3vw,40px)] bottom-[clamp(28px,6vw,64px)] hidden w-[270px] rounded-card p-5 md:block"
          style={{ animation: 'rise 1s 0.8s var(--ease-ios) both' }}
        >
          <p className="text-[13px] text-ink-2">Talk to an engineer</p>
          <a href={contact.tel} className="mt-1 mb-3.5 block text-lg font-medium">{contact.phone}</a>
          <div className="flex gap-2">
            <a href={contact.whatsapp} target="_blank" rel="noopener" className="flex h-[34px] items-center rounded-full bg-green px-3.5 text-sm font-medium text-white hover:bg-green-600">WhatsApp</a>
            <a href={`mailto:${contact.email}`} className="flex h-[34px] items-center rounded-full bg-ink/6 px-3.5 text-sm font-medium hover:bg-ink/12">Email</a>
          </div>
        </aside>
      </div>
    </section>
  )
}
