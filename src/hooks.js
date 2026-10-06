import { useEffect, useRef } from 'react'

export const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
export const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const isMobile = () => window.innerWidth < 768

// Runs `fn` on every scroll/resize, batched to one call per frame.
export function useScroll(fn) {
  const saved = useRef(fn)
  saved.current = fn

  useEffect(() => {
    let frame = 0
    const run = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => saved.current())
    }
    run()
    window.addEventListener('scroll', run, { passive: true })
    window.addEventListener('resize', run)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', run)
      window.removeEventListener('resize', run)
    }
  }, [])
}

// Calls `onChange(isVisible)` when the element enters or leaves the viewport.
export function useInView(ref, onChange, options) {
  const saved = useRef(onChange)
  saved.current = onChange

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => saved.current(entry.isIntersecting), options)
    io.observe(ref.current)
    return () => io.disconnect()
  }, []) // options are fixed per call site
}
