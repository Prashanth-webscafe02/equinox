import { useRef, useState } from 'react'
import { intro } from '../data.js'
import { clamp, useScroll } from '../hooks.js'
import { Wrap } from './ui.jsx'

const words = intro.split(' ')

// Words darken one by one as the paragraph scrolls through the screen.
export default function Intro() {
  const ref = useRef(null)
  const [lit, setLit] = useState(0)

  useScroll(() => {
    const r = ref.current.getBoundingClientRect()
    const vh = window.innerHeight
    const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1)
    setLit(Math.round(p * words.length))
  })

  return (
    <Wrap className="pt-[clamp(80px,11vw,140px)] pb-[clamp(56px,7vw,96px)]">
      <p className="eyebrow">Who we are</p>
      <p ref={ref} className="max-w-[760px] leading-[1.45] tracking-[-0.01em]" style={{ fontSize: 'clamp(18px, 1.9vw, 24px)' }}>
        {words.map((w, i) => (
          <span key={i} className={`transition-colors duration-200 ${i < lit ? 'text-ink' : 'text-ink/15'}`}>{w} </span>
        ))}
      </p>
    </Wrap>
  )
}
