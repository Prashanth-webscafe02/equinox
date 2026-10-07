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

const actions = [
  { label: 'Call', detail: contact.phone, href: contact.tel, tone: 'bg-white/20', icon: 'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z' },
  { label: 'WhatsApp', detail: 'Chat with us', href: contact.whatsapp, tone: 'bg-green', external: true, icon: 'M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zm4.4 12.4c-.2.5-1.1 1-1.6 1-.4.1-.9.1-1.4 0-.3-.1-.8-.3-1.3-.5-2.3-1-3.8-3.3-3.9-3.5-.1-.1-.9-1.2-.9-2.3s.6-1.6.8-1.9c.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.7 1.6c.1.1.1.3 0 .4l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.1 1.4 1.8 1 .9 1.8 1.1 2.1 1.3.3.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.6.8c.2.1.4.2.4.3.1.1.1.6-.1 1.1z' },
  { label: 'Email', detail: contact.email, href: `mailto:${contact.email}`, tone: 'bg-white/20', icon: 'M4 5h16c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V6c0-.6.4-1 1-1zm0 2v.4l8 5 8-5V7l-8 5-8-5z' },
  { label: 'Visit', detail: 'Koramangala, Bangalore', href: contact.map, tone: 'bg-white/20', external: true, icon: 'M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z' },
]

// One glass button that opens an iOS-style action menu
function ContactMenu() {
  const [open, setOpen] = useState(false)
  const box = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = e => { if (!box.current.contains(e.target)) setOpen(false) }
    const onKey = e => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={box} className="absolute right-[clamp(20px,3vw,40px)] bottom-[clamp(28px,6vw,64px)] hidden md:block"
      style={{ animation: 'rise 1s 0.8s var(--ease-ios) both' }}>
      {/* menu */}
      <div
        role="menu"
        aria-hidden={!open}
        className={`absolute right-0 bottom-[calc(100%+12px)] w-[280px] origin-bottom-right overflow-hidden rounded-[22px] border border-white/25 bg-white/15 text-white shadow-[0_24px_60px_-20px_rgb(0_0_0/.6)] backdrop-blur-2xl backdrop-saturate-150 transition duration-300 ease-ios ${
          open ? 'visible scale-100 opacity-100' : 'invisible scale-90 opacity-0'
        }`}
      >
        {actions.map(a => (
          <a key={a.label} role="menuitem" href={a.href} tabIndex={open ? 0 : -1}
            {...(a.external && { target: '_blank', rel: 'noopener' })}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 border-b border-white/10 px-4 py-3 transition-colors last:border-0 hover:bg-white/15">
            <span className={`grid size-9 flex-none place-items-center rounded-full ${a.tone}`}>
              <svg viewBox="0 0 24 24" className="size-[18px] fill-white" aria-hidden="true"><path d={a.icon} /></svg>
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-[15px] font-medium">{a.label}</span>
              <span className="block truncate text-[13px] text-white/65">{a.detail}</span>
            </span>
          </a>
        ))}
      </div>

      {/* trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex h-[52px] cursor-pointer items-center gap-3 rounded-full border border-white/25 bg-white/15 py-1.5 pr-5 pl-1.5 text-[15px] font-medium text-white shadow-[0_20px_50px_-20px_rgb(0_0_0/.5)] backdrop-blur-xl backdrop-saturate-150 transition duration-300 ease-ios hover:bg-white/25 active:scale-[0.97]"
      >
        <span className="relative grid size-10 place-items-center rounded-full bg-white/20">
          <svg viewBox="0 0 24 24" className={`size-[18px] fill-white transition-transform duration-300 ease-ios ${open ? 'rotate-[135deg]' : ''}`} aria-hidden="true">
            <path d={open ? 'M11 5h2v14h-2zM5 11h14v2H5z' : 'M12 1a9 9 0 0 0-9 9v7a3 3 0 0 0 3 3h3v-8H5v-2a7 7 0 0 1 14 0v2h-4v8h4v1h-7v2h6a3 3 0 0 0 3-3V10a9 9 0 0 0-9-9z'} />
          </svg>
          <span className="absolute top-0 right-0 size-2.5 rounded-full border-2 border-[#2a3a48] bg-green" />
        </span>
        {open ? 'Close' : 'Connect With Us'}
      </button>
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

        <ContactMenu />
      </div>
    </section>
  )
}
