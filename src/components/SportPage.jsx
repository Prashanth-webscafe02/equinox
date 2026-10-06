import { Link, useParams } from 'react-router-dom'
import { sports } from '../data.js'
import { findSportPage, sportPages } from '../sportPages.js'
import Contact from './Contact.jsx'
import { Button, Eyebrow, Reveal, Wrap } from './ui.jsx'

const fieldOf = name => sports.find(s => s.name === name).field

function Field({ sport, className }) {
  return (
    <svg viewBox="0 0 48 32" aria-hidden="true" className={`fill-none ${className}`}>
      <path d={fieldOf(sport)} pathLength="1" className="draw" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NotFound() {
  return (
    <Wrap className="grid min-h-svh place-content-center gap-4 text-center">
      <h1 className="h2">That court isn't on our list.</h1>
      <p className="text-ink-2">The sport you were looking for doesn't have a page yet.</p>
      <div><Button as={Link} to="/#sports" arrow>See all sports</Button></div>
    </Wrap>
  )
}

export default function SportPage() {
  const { slug } = useParams()
  const page = findSportPage(slug)
  if (!page) return <NotFound />

  const others = sportPages.filter(p => p.slug !== slug)

  return (
    <main id="top" className="pb-[84px] md:pb-0">
      {/* hero */}
      <section className="h-[82svh] min-h-[560px] p-1.5 md:p-2.5">
        <div className="relative h-full overflow-hidden rounded-[26px] bg-[#1a2a3a] md:rounded-panel">
          <img key={page.img} src={page.img} alt={page.title} className="absolute inset-0 size-full animate-hero-zoom object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(10_12_16/.8)] via-[rgb(10_12_16/.2)] to-[rgb(10_12_16/.35)]" />

          <nav aria-label="Breadcrumb" className="glass-dark absolute top-[76px] left-1/2 flex h-9 -translate-x-1/2 items-center gap-2 rounded-full px-4 text-[13px] whitespace-nowrap md:top-[84px]">
            <Link to="/" className="text-white/70 hover:text-white">Home</Link>
            <span className="text-white/40">/</span>
            <Link to="/#sports" className="text-white/70 hover:text-white">Sports</Link>
            <span className="text-white/40">/</span>
            <span>{page.title}</span>
          </nav>

          <Reveal key={slug} className="absolute bottom-[clamp(28px,6vw,64px)] left-[clamp(20px,5vw,64px)] max-w-[620px] pr-5 text-white">
            <span className="glass-dark mb-5 grid size-14 place-items-center rounded-2xl">
              <Field sport={page.sport} className="w-9 stroke-white stroke-[1.6]" />
            </span>
            <h1 className="mb-4 leading-[1.08] font-medium tracking-[-0.025em]" style={{ fontSize: 'clamp(30px, min(4.2vw, 7.5vh), 56px)' }}>
              {page.title}
            </h1>
            <p className="mb-7 max-w-[520px] text-[15px] text-white/80 md:text-base">{page.lead}</p>
            <div className="flex flex-wrap gap-3">
              <Button href="#contact" variant="light" arrow className="flex-auto sm:flex-none">Get a quote</Button>
              <Button as={Link} to="/#sports" variant="ghost" className="flex-auto sm:flex-none">All sports</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* overview + at a glance */}
      <Wrap className="grid gap-10 py-[clamp(72px,10vw,130px)] lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <Reveal key={`${slug}-intro`}>
          <Eyebrow n="01">Overview</Eyebrow>
          <p className="max-w-[640px] leading-[1.6] tracking-[-0.01em]" style={{ fontSize: 'clamp(17px, 1.6vw, 21px)' }}>{page.intro}</p>
        </Reveal>

        <Reveal key={`${slug}-glance`} className="self-start rounded-card bg-white p-6 shadow-soft md:p-7">
          <h2 className="mb-4 text-[17px] font-medium">Surfaces we offer</h2>
          <div className="flex flex-wrap gap-2">
            {page.options.map(o => (
              <span key={o} className="rounded-full bg-bg px-3.5 py-1.5 text-sm">{o}</span>
            ))}
          </div>
          {page.specs && (
            <dl className="mt-6 divide-y divide-line border-t border-line">
              {page.specs.map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 text-[15px]">
                  <dt className="text-ink-2">{k}</dt>
                  <dd className="font-mono">{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>
      </Wrap>

      {/* feature groups */}
      <section className="mx-1.5 rounded-panel bg-white py-[clamp(72px,10vw,130px)] md:mx-2.5">
        <Wrap>
          <Eyebrow n="02">Why Equinox</Eyebrow>
          <div className="mt-8 grid gap-12">
            {page.sections.map(sec => (
              <div key={`${slug}-${sec.title}`} className="grid gap-5 lg:grid-cols-[260px_1fr] lg:gap-12">
                <h2 className="text-xl font-medium lg:pt-5">{sec.title}</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {sec.items.map((item, i) => (
                    <Reveal as="li" key={item} delay={(i % 4) * 0.05}
                      className="flex gap-4 rounded-card bg-bg p-5 text-[15px] transition duration-500 ease-ios hover:-translate-y-0.5">
                      <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
                      {item}
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* other sports */}
      <Wrap className="py-[clamp(72px,10vw,130px)]">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <Eyebrow n="03">Other sports</Eyebrow>
            <h2 className="h2">Keep exploring.</h2>
          </div>
          <Link to="/#sports" className="hidden text-[15px] text-ink-2 hover:text-accent md:block">All sports →</Link>
        </div>
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {others.map(o => (
            <Link key={o.slug} to={`/sports/${o.slug}`}
              className="group relative block h-56 w-[70vw] flex-none snap-start overflow-hidden rounded-card shadow-soft sm:w-auto">
              <img src={o.img} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-ios group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="glass absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl px-4 py-3">
                <svg viewBox="0 0 48 32" aria-hidden="true" className="w-8 flex-none fill-none stroke-ink stroke-[1.6]">
                  <path d={fieldOf(o.sport)} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[15px] font-medium">{o.title}</span>
                <span className="ml-auto transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </Wrap>

      <Contact sport={page.sport} heading={<>Plan your <br />{page.title.toLowerCase()}.</>} />
    </main>
  )
}
