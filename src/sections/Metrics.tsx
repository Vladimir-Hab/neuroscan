import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Metric {
  value: number
  suffix: string
  label: string
  displayPrefix?: string
}

const metrics: Metric[] = [
  { value: 60, suffix: '', label: 'секунд вместо 15 минут', displayPrefix: '30–' },
  { value: 100, suffix: '%', label: 'локальная обработка' },
  { value: 0, suffix: '', label: 'данных на сторонних серверах' },
]

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards stagger entrance
      gsap.fromTo(
        '.metric-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )

      // Counter animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (hasAnimated.current) return
          hasAnimated.current = true

          const numberEls = document.querySelectorAll('.metric-number')
          numberEls.forEach((el) => {
            const target = parseInt(el.getAttribute('data-target') || '0')
            const suffix = el.getAttribute('data-suffix') || ''
            const prefix = el.getAttribute('data-prefix') || ''
            const obj = { val: 0 }

            gsap.to(obj, {
              val: target,
              duration: 1.5,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = prefix + Math.round(obj.val) + suffix
              },
            })
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="metrics w-full"
      style={{ background: '#FDFBF7', padding: '80px 0' }}
    >
      <div className="max-w-[900px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {metrics.map((m, i) => (
            <div key={i} className="metric-card flex flex-col items-center">
              <span
                className="metric-number text-[48px] md:text-[56px] font-extrabold tracking-[-0.03em]"
                style={{ color: '#1E293B', fontFamily: 'var(--font-display)' }}
                data-target={m.value}
                data-suffix={m.suffix}
                data-prefix={m.displayPrefix || ''}
              >
                {m.displayPrefix || ''}0{m.suffix}
              </span>
              <span
                className="text-base mt-2 leading-relaxed"
                style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
