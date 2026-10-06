import { clients, contact } from '../data.js'
import { Wrap } from './ui.jsx'

export function Clients() {
  const row = [...clients, ...clients] // doubled for a seamless loop
  return (
    <section aria-label="Clients" className="pb-[clamp(80px,10vw,130px)]">
      <Wrap><p className="eyebrow">Trusted by</p></Wrap>
      <div className="group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {row.map((src, i) => (
            <img key={i} src={src} alt={i < clients.length ? 'Client logo' : ''} aria-hidden={i >= clients.length}
              className="h-24 w-[200px] rounded-card bg-white object-contain px-5 py-2.5 shadow-soft" />
          ))}
        </div>
      </div>
    </section>
  )
}

const columns = [
  { title: 'Surfaces', links: [['Synthetic turf', '#surfaces'], ['Acrylic & PU', '#surfaces'], ['Vinyl & wooden', '#surfaces'], ['Tracks & EPDM', '#surfaces']] },
  { title: 'Company', links: [['Services', '#services'], ['Projects', '#work'], ['About', '#values'], ['Contact', '#contact']] },
  { title: 'Reach us', links: [[contact.phone, contact.tel], [contact.email, `mailto:${contact.email}`], ['WhatsApp', contact.whatsapp]] },
]

export default function Footer() {
  return (
    <footer className="pt-[72px] pb-[calc(32px+env(safe-area-inset-bottom))] text-ink-2">
      <Wrap className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <img src="/img/logo.png" alt="Equinox Sports Infra" width="180" height="58" className="box-content w-[180px] rounded-2xl bg-ink px-4 py-3" />
          <p className="mt-4 max-w-[300px] text-[15px]">Redefining Safety. Sports infrastructure designed and built in Bangalore.</p>
        </div>
        {columns.map(c => (
          <div key={c.title}>
            <h4 className="mb-3 text-[15px] font-medium text-ink">{c.title}</h4>
            {c.links.map(([label, href]) => (
              <a key={label} href={href} className="block py-1 text-[15px] break-words transition-colors hover:text-accent">{label}</a>
            ))}
          </div>
        ))}
      </Wrap>
      <Wrap className="mt-14 flex flex-col justify-between gap-4 border-t border-line pt-6 text-sm sm:flex-row">
        <span>© {new Date().getFullYear()} Equinox Sports Infra. All rights reserved.</span>
        <a href="#top" className="hover:text-accent">Back to top ↑</a>
      </Wrap>
    </footer>
  )
}

// Bottom action bar on phones
export function Dock() {
  const item = 'grid h-12 place-items-center rounded-[18px] text-[15px] font-medium'
  return (
    <div className="glass fixed inset-x-2.5 bottom-[calc(10px+env(safe-area-inset-bottom))] z-40 grid grid-cols-[1fr_1fr_1.4fr] gap-1.5 rounded-3xl p-1.5 md:hidden">
      <a href={contact.tel} className={`${item} bg-white/60`}>Call</a>
      <a href={contact.whatsapp} target="_blank" rel="noopener" className={`${item} bg-white/60`}>WhatsApp</a>
      <a href="#contact" className={`${item} bg-ink text-white`}>Get a quote</a>
    </div>
  )
}
