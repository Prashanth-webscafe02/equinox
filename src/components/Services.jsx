import { services } from '../data.js'
import { Eyebrow, Reveal, Wrap } from './ui.jsx'

const span = {
  big: 'md:col-span-2 md:row-span-2 min-h-[360px] md:min-h-[516px]',
  wide: 'md:col-span-2',
}

function Tile({ title, text, icon, img, size }) {
  if (img) {
    return (
      <Reveal className={`group relative flex min-h-[250px] flex-col justify-end overflow-hidden rounded-card p-3.5 shadow-soft transition duration-500 ease-ios hover:-translate-y-1 hover:shadow-lift ${span[size] ?? ''}`}>
        <img src={img} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-ios group-hover:scale-[1.06]" />
        <div className="glass relative rounded-2xl p-5">
          <h3 className="mb-1.5 text-[17px] font-medium">{title}</h3>
          <p className="text-[15px] text-[#2b2f35]">{text}</p>
        </div>
      </Reveal>
    )
  }

  return (
    <Reveal className="group relative flex min-h-[220px] flex-col justify-end rounded-card bg-white p-6 shadow-soft transition duration-500 ease-ios hover:-translate-y-1 hover:shadow-lift md:min-h-[250px]">
      <span className="absolute top-[22px] left-[22px] grid size-[46px] place-items-center rounded-tile bg-bg transition-colors group-hover:bg-accent" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="size-[22px] fill-none stroke-ink stroke-[1.6] transition-colors group-hover:stroke-white" strokeLinecap="round" strokeLinejoin="round">
          <path d={icon} />
        </svg>
      </span>
      <h3 className="mb-1.5 text-[17px] font-medium">{title}</h3>
      <p className="text-[15px] text-ink-2">{text}</p>
    </Reveal>
  )
}

export default function Services() {
  return (
    <section id="services">
      <Wrap className="py-[clamp(96px,12vw,160px)]">
        <Reveal className="mb-[clamp(32px,5vw,56px)]">
          <Eyebrow n="03">Beyond the surface</Eyebrow>
          <h2 className="h2">Everything around <br /><span className="text-ink-3">the court, too.</span></h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map(s => <Tile key={s.title} {...s} />)}
        </div>
      </Wrap>
    </section>
  )
}
