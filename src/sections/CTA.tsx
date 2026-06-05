import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const typeTextRef = useRef<HTMLSpanElement>(null)
  const splitRef = useRef<SplitType | null>(null)
  const hasTyped = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Terminal entrance
      gsap.fromTo(
        '.terminal-panel',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1, ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          }
        }
      )

      // Cursor blink
      gsap.fromTo(
        '.cursor',
        { opacity: 1 },
        { opacity: 0, duration: 0.53, repeat: -1, ease: 'steps(1)' }
      )

      // Typewriter effect
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          if (hasTyped.current) return
          hasTyped.current = true

          const el = typeTextRef.current
          if (!el) return

          // Initialize SplitType
          splitRef.current = new SplitType(el, { types: 'chars' })
          const chars = splitRef.current.chars
          if (!chars || chars.length === 0) return

          const typeTl = gsap.timeline({ delay: 0.5 })
          typeTl.set(el, { opacity: 1 })
          typeTl.set(chars, { opacity: 0 })
          typeTl.to(chars, {
            opacity: 1,
            duration: 0.05,
            stagger: 0.075,
            ease: 'none',
          })
        },
      })

      // Button reveal
      gsap.fromTo(
        '.cta-button',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 2.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          }
        }
      )
    }, sectionRef)

    return () => {
      ctx.revert()
      if (splitRef.current) {
        splitRef.current.revert()
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="cta relative w-full overflow-hidden"
      style={{ background: '#0A1628', padding: '160px 0' }}
    >
      {/* Glow aura behind terminal */}
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          width: '500px',
          height: '300px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-[5] max-w-[640px] mx-auto px-6">
        <div
          className="terminal-panel rounded-2xl p-12"
          style={{
            background: 'rgba(10, 22, 40, 0.6)',
            backdropFilter: 'blur(40px) saturate(130%)',
            WebkitBackdropFilter: 'blur(40px) saturate(130%)',
            border: '1px solid rgba(248, 250, 252, 0.08)',
          }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: '#EF4444' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#EAB308' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#22C55E' }} />
          </div>

          {/* Terminal content */}
          <div className="mt-8">
            <div
              className="text-sm"
              style={{ color: '#64748B', fontFamily: 'var(--font-mono)' }}
            >
              $ ./contact.sh
            </div>
            <div className="mt-2 flex items-center">
              <span
                ref={typeTextRef}
                className="typewriter-text text-sm"
                style={{
                  color: '#F8FAFC',
                  fontFamily: 'var(--font-mono)',
                  opacity: 0,
                }}
              >
                Напишите нам в Telegram
              </span>
              <span
                className="cursor inline-block ml-[2px]"
                style={{
                  width: '2px',
                  height: '1.2em',
                  background: '#6366F1',
                  verticalAlign: 'text-bottom',
                }}
              />
            </div>
          </div>

          {/* CTA button */}
          <div className="cta-button mt-8">
            <a
              href="https://t.me/neuroscan1c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-semibold text-white text-base transition-all duration-200 hover:scale-[1.02]"
              style={{ background: '#6366F1', fontFamily: 'var(--font-body)' }}
            >
              Открыть Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
