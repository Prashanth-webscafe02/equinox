import { useState } from 'react'
import { contact, facilityTypes, quoteSports } from '../data.js'
import { Button, Eyebrow, Wrap } from './ui.jsx'

const field =
  'w-full appearance-none rounded-tile border border-transparent bg-white/85 px-3.5 py-[13px] text-base outline-none ' +
  'transition focus:border-accent focus:ring-4 focus:ring-accent/15'

function Field({ label, children }) {
  return (
    <label className="mb-3 block">
      <span className="mb-1.5 ml-1 block text-[13px] text-ink-2">{label}</span>
      {children}
    </label>
  )
}

// iOS segmented control
function Segmented({ options, value, onChange }) {
  const i = options.indexOf(value)
  return (
    <div className="relative grid grid-cols-3 rounded-xl bg-ink/7 p-[3px]">
      <span
        className="absolute inset-y-[3px] left-[3px] w-[calc((100%-6px)/3)] rounded-[9px] bg-white shadow-[0_2px_6px_rgb(0_0_0/.12)] transition-transform duration-400 ease-ios"
        style={{ transform: `translateX(${i * 100}%)` }}
      />
      {options.map(o => (
        <button key={o} type="button" onClick={() => onChange(o)}
          className={`relative cursor-pointer py-[9px] text-[15px] transition-colors ${o === value ? 'font-medium text-ink' : 'text-ink-2'}`}>
          {o}
        </button>
      ))}
    </div>
  )
}

export default function Contact({ sport = quoteSports[0], heading = <>Let's mark out <br />your court.</> }) {
  const [facility, setFacility] = useState(facilityTypes[0])

  // no backend: compose the enquiry and hand it to WhatsApp
  const submit = e => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const text = [
      'Hi Equinox, I would like a quote.',
      `Name: ${f.get('name')}`,
      `Phone: ${f.get('phone')}`,
      `Facility: ${facility}`,
      `Sport: ${f.get('sport')}`,
      f.get('msg') && `Details: ${f.get('msg')}`,
    ].filter(Boolean).join('\n')
    window.open(`${contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  const info = [
    { k: 'Call', v: contact.phone, href: contact.tel },
    { k: 'Email', v: contact.email, href: `mailto:${contact.email}` },
    { k: 'Visit', v: contact.address, href: contact.map, external: true },
  ]

  return (
    <section id="contact" className="relative mx-1.5 overflow-hidden rounded-panel py-[clamp(80px,10vw,140px)] text-white md:mx-2.5">
      <div className="absolute inset-0 bg-[url(/img/street-court.jpg)] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgb(10_12_16/.82)] to-[rgb(10_12_16/.35)]" />

      <Wrap className="relative grid items-center gap-12 lg:grid-cols-[1fr_460px]">
        <div>
          <Eyebrow n="07" light>Contact</Eyebrow>
          <h2 className="h2">{heading}</h2>
          <ul className="mt-10 grid gap-[22px]">
            {info.map(x => (
              <li key={x.k} className="grid gap-0.5">
                <span className="text-[13px] tracking-[0.08em] text-white/60 uppercase">{x.k}</span>
                <a href={x.href} {...(x.external && { target: '_blank', rel: 'noopener' })}
                  className="max-w-[420px] text-base transition-colors hover:text-peach">{x.v}</a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={submit} className="glass max-w-[560px] rounded-panel !bg-white/72 p-[22px] text-ink md:p-7">
          <h3 className="text-xl font-medium">Request a quote</h3>
          <p className="mt-1 mb-5 text-[15px] text-ink-2">Sends straight to our WhatsApp. We usually reply the same day.</p>
          <Field label="Your name"><input name="name" required autoComplete="name" className={field} /></Field>
          <Field label="Phone"><input name="phone" type="tel" required autoComplete="tel" className={field} /></Field>
          <div className="mb-3">
            <span className="mb-1.5 ml-1 block text-[13px] text-ink-2">Facility type</span>
            <Segmented options={facilityTypes} value={facility} onChange={setFacility} />
          </div>
          <Field label="Sport">
            <select key={sport} name="sport" defaultValue={sport} className={`${field} bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%235d636c' stroke-width='1.6'/%3E%3C/svg%3E")] bg-[position:right_16px_center] bg-no-repeat pr-10`}>
              {quoteSports.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Tell us about the site">
            <textarea name="msg" rows={3} placeholder="Location, approximate size, timeline" className={`${field} resize-y`} />
          </Field>
          <Button as="button" type="submit" variant="accent" arrow className="mt-2 w-full">Send on WhatsApp</Button>
        </form>
      </Wrap>
    </section>
  )
}
