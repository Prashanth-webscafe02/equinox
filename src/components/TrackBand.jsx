import { lanes } from '../data.js'

// A running track seen from above: lane lines, painted lane numbers at the start line,
// and each lane's sport name running at its own pace.
export default function TrackBand() {
  return (
    <section aria-label="What we build" className="mx-1.5 overflow-hidden rounded-panel bg-track md:mx-2.5">
      <div className="relative py-3 md:py-5">
        {lanes.map((name, i) => {
          const words = Array.from({ length: 10 }, () => name)
          return (
            <div key={name} className="relative flex h-11 items-center border-b border-white/40 first:border-t md:h-14">
              {/* start line and lane number */}
              <span className="relative z-10 grid h-full w-12 flex-none place-items-center border-r-2 border-white bg-track font-mono text-lg text-white md:w-20 md:text-2xl">
                {i + 1}
              </span>
              <div className="overflow-hidden">
                <div
                  className="flex w-max animate-lane gap-10 pl-6 text-[15px] whitespace-nowrap text-white/90 md:gap-16 md:text-base"
                  style={{ '--dur': `${34 + ((i * 7) % 18)}s`, animationDelay: `${-i * 3}s` }}
                  aria-hidden="true"
                >
                  {[...words, ...words].map((w, j) => (
                    <span key={j} className="flex items-center gap-10 md:gap-16">
                      {w}
                      <span className="size-1 rounded-full bg-white/60" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
