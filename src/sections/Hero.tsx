import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Camera } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const apertureRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const scanLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Aperture opening animation
      const apertureTl = gsap.timeline({ delay: 0.3 })

      apertureTl.to('.quad-tl, .quad-tr, .quad-bl, .quad-br', {
        duration: 2.5,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        onStart: () => {
          gsap.set('.quad-tl', { clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)' })
          gsap.set('.quad-tr', { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' })
          gsap.set('.quad-bl', { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' })
          gsap.set('.quad-br', { clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)' })
        },
      })

      apertureTl.set(apertureRef.current, { display: 'none' }, 2.0)

      // Glow fade in
      gsap.fromTo(
        glowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, delay: 0.5 }
      )

      // Product panel entrance
      gsap.fromTo(
        panelRef.current,
        { filter: 'blur(20px)', opacity: 0 },
        { filter: 'blur(0px)', opacity: 1, duration: 1, delay: 0.8, ease: 'power2.out' }
      )

      // Scan line animation
      gsap.fromTo(
        scanLineRef.current,
        { x: -320 },
        { x: 320, duration: 3, repeat: -1, ease: 'none', delay: 2.5 }
      )

      // Text cascade
      gsap.fromTo(
        '.hero-eyebrow',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 1.2, ease: 'power2.out' }
      )
      gsap.fromTo(
        '.hero-h1',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.4, ease: 'power2.out' }
      )
      gsap.fromTo(
        '.hero-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 1.6, ease: 'power2.out' }
      )
      gsap.fromTo(
        '.hero-ctas',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 1.8, ease: 'power2.out' }
      )

      // Hero scroll animation (pin + fade)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=50vh',
          pin: true,
          scrub: 1,
        },
      })

      scrollTl.to(panelRef.current, { scale: 0.92, y: -60, opacity: 0.3, ease: 'none' }, 0)
      scrollTl.to(textRef.current, { y: -40, opacity: 0, ease: 'none' }, 0)
      scrollTl.to(glowRef.current, { opacity: 0, scale: 0.8, ease: 'none' }, 0)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="hero relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ background: '#0A1628' }}
    >
      {/* Aperture overlay */}
      <div ref={apertureRef} className="aperture-overlay absolute inset-0 z-10 pointer-events-none">
        <div
          className="quad-tl absolute top-0 left-0 w-1/2 h-1/2"
          style={{ background: '#0A1628', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        <div
          className="quad-tr absolute top-0 right-0 w-1/2 h-1/2"
          style={{ background: '#0A1628', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        <div
          className="quad-bl absolute bottom-0 left-0 w-1/2 h-1/2"
          style={{ background: '#0A1628', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        <div
          className="quad-br absolute bottom-0 right-0 w-1/2 h-1/2"
          style={{ background: '#0A1628', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        />
      </div>

      {/* Luminous glow */}
      <div
        ref={glowRef}
        className="luminous-glow absolute z-0"
        style={{
          width: '800px',
          height: '800px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Content container */}
      <div className="relative z-[5] flex flex-col items-center max-w-[1200px] mx-auto px-6">
        {/* Product panel */}
        <div
          ref={panelRef}
          className="product-panel relative w-[640px] h-[400px] max-w-[90vw] rounded-[20px] overflow-hidden flex flex-col"
          style={{
            background: 'rgba(10, 22, 40, 0.45)',
            backdropFilter: 'blur(40px) saturate(140%)',
            WebkitBackdropFilter: 'blur(40px) saturate(140%)',
            border: '1px solid rgba(248, 250, 252, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Scan line */}
          <div
            ref={scanLineRef}
            className="scan-line absolute top-0 left-1/2 w-[2px] h-full pointer-events-none z-[5]"
            style={{
              transform: 'translateX(-50%)',
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(99, 102, 241, 0.8) 20%, rgba(99, 102, 241, 0.9) 50%, rgba(99, 102, 241, 0.8) 80%, transparent 100%)',
            }}
          />

          {/* Panel header */}
          <div
            className="panel-header flex items-center gap-3 px-5 py-4"
            style={{ borderBottom: '1px solid rgba(248, 250, 252, 0.06)' }}
          >
            <div
              className="status-dot w-2 h-2 rounded-full"
              style={{ background: '#22C55E', boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)' }}
            />
            <span
              className="panel-title text-[13px] font-medium"
              style={{ color: 'rgba(248, 250, 252, 0.7)', fontFamily: 'var(--font-body)' }}
            >
              НейроСкан 1С — Распознавание накладной
            </span>
          </div>

          {/* Panel body */}
          <div className="panel-body flex-1 p-6 grid grid-cols-2 gap-4">
            {/* Camera area */}
            <div
              className="doc-placeholder flex items-center justify-center rounded-xl"
              style={{
                gridRow: 'span 2',
                background: 'rgba(248, 250, 252, 0.03)',
                border: '1px solid rgba(248, 250, 252, 0.06)',
              }}
            >
              <Camera size={48} style={{ color: 'rgba(99, 102, 241, 0.4)' }} />
            </div>

            {/* Recognized fields */}
            <div className="flex flex-col justify-center gap-2">
              <div className="text-[11px] uppercase tracking-wider" style={{ color: 'rgba(248, 250, 252, 0.4)' }}>
                УПД № 124 от 15.03.2025
              </div>
              <div className="field-line h-2 rounded" style={{ background: 'rgba(248, 250, 252, 0.06)' }} />
              <div
                className="field-line short h-2 rounded"
                style={{ width: '60%', background: 'rgba(248, 250, 252, 0.06)' }}
              />
              <div className="field-line h-2 rounded" style={{ background: 'rgba(248, 250, 252, 0.06)' }} />
              <div
                className="field-line short h-2 rounded"
                style={{ width: '60%', background: 'rgba(248, 250, 252, 0.06)' }}
              />
            </div>

            {/* Status */}
            <div
              className="flex items-center gap-2 rounded-xl px-4"
              style={{
                background: 'rgba(248, 250, 252, 0.03)',
                border: '1px solid rgba(248, 250, 252, 0.06)',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-[#6366F1]" />
              <span className="text-[12px]" style={{ color: 'rgba(248, 250, 252, 0.5)' }}>
                Распозвано 8 полей
              </span>
            </div>
          </div>
        </div>

        {/* Text block */}
        <div ref={textRef} className="hero-text-block mt-12 flex flex-col items-center text-center">
          <span
            className="hero-eyebrow text-sm font-medium uppercase tracking-[0.15em]"
            style={{ color: '#818CF8', fontFamily: 'var(--font-body)' }}
          >
            РАСШИРЕНИЕ ДЛЯ 1С
          </span>
          <h1
            className="hero-h1 text-[56px] md:text-[72px] font-extrabold mt-4 leading-[1.05] tracking-[-0.03em]"
            style={{ color: '#F8FAFC', fontFamily: 'var(--font-display)' }}
          >
            НейроСкан 1С
          </h1>
          <p
            className="hero-subtitle text-lg md:text-xl mt-4 max-w-[560px] leading-relaxed"
            style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
          >
            Распознавание накладных УПД и ТОРГ-12 за 30-60 секунд
          </p>
          <div className="hero-ctas flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="https://t.me/neuroscan1c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
              style={{ background: '#6366F1', fontFamily: 'var(--font-body)' }}
            >
              Написать в Telegram
            </a>
            <a
              href="#video"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02]"
              style={{
                color: '#F8FAFC',
                border: '1px solid rgba(248, 250, 252, 0.15)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Смотреть демо
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
