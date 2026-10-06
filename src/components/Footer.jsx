import { Link } from 'react-router-dom'
import { clients, contact } from '../data.js'
import { sportPages } from '../sportPages.js'
import { Eyebrow, Wrap } from './ui.jsx'

export function Clients() {
  return (
    <section aria-label="Clients">
      <Wrap className="pb-[clamp(80px,10vw,130px)]">
        <div className="mb-8 items-end justify-between gap-6 md:flex">
          <div>
            <Eyebrow>Trusted by</Eyebrow>
            <h2 className="h2">Built for names <span className="text-ink-3">you know.</span></h2>
          </div>
          <p className="mt-3 max-w-[380px] text-ink-2">
            Developers, retailers and institutions who have trusted us with their grounds, and keep coming
            back when the next campus, clubhouse or rooftop needs a court.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map(c => (
            <li key={c.name}
              className="group grid h-[120px] place-items-center rounded-card bg-white px-8 shadow-soft ring-1 ring-line transition duration-500 ease-ios hover:-translate-y-1 hover:shadow-lift last:col-span-2 sm:last:col-span-1">
              <img src={c.src} alt={c.name} loading="lazy"
                className="max-h-14 w-full object-contain opacity-70 mix-blend-multiply grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0" />
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  )
}

const columns = [
  { title: 'Sports', links: sportPages.slice(0, 5).map(p => [p.title, `/sports/${p.slug}`]) },
  { title: 'Company', links: [['Surfaces', '/#surfaces'], ['Services', '/#services'], ['Projects', '/#work'], ['About', '/#values']] },
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
            {c.links.map(([label, href]) => {
              const cls = 'block py-1 text-[15px] break-words transition-colors hover:text-accent'
              return href.startsWith('/')
                ? <Link key={label} to={href} className={cls}>{label}</Link>
                : <a key={label} href={href} className={cls}>{label}</a>
            })}
          </div>
        ))}
      </Wrap>
      <Wrap className="mt-14 flex flex-col justify-between gap-4 border-t border-line pt-6 text-sm sm:flex-row">
        <span>© {new Date().getFullYear()} Equinox Sports Infra. All rights reserved.</span>
        <a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="hover:text-accent">Back to top ↑</a>
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
