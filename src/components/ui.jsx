import { useRef, useState } from 'react'
import { useInView } from '../hooks.js'

const base =
  'group inline-flex h-12 items-center justify-center gap-2 rounded-full px-[22px] text-[15px] font-medium ' +
  'transition-[transform,background-color] duration-300 ease-ios hover:-translate-y-0.5 active:scale-[0.97] cursor-pointer'

const variants = {
  dark: 'bg-ink text-white',
  light: 'bg-white text-ink shadow-soft',
  accent: 'bg-accent text-white shadow-accent hover:bg-accent-dark',
  ghost: 'border border-white/30 bg-white/15 text-white backdrop-blur-xl',
}

export function Button({ as: Tag = 'a', variant = 'dark', arrow, className = '', children, ...props }) {
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {arrow && <span className="inline-block transition-transform duration-300 ease-ios group-hover:translate-x-1">→</span>}
    </Tag>
  )
}

// Fades and un-blurs its child into place the first time it scrolls into view.
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...props }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useInView(ref, visible => visible && setShown(true), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

  return (
    <Tag ref={ref} className={`reveal ${shown ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}s` }} {...props}>
      {children}
    </Tag>
  )
}

export function Wrap({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>
}

// Section label with a scoreboard-style number: "01  Surface studio"
export function Eyebrow({ n, light, children }) {
  return (
    <p className={`eyebrow flex items-center gap-2.5 ${light ? '!text-peach' : ''}`}>
      {n && <span className={`font-mono tracking-normal ${light ? 'text-white/45' : 'text-ink-3'}`}>{n}</span>}
      {n && <span className={`h-px w-6 ${light ? 'bg-white/25' : 'bg-ink/15'}`} />}
      {children}
    </p>
  )
}
