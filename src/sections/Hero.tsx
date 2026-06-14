import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text cascade
      gsap.fromTo(
        '.hero-eyebrow',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: 'power2.out' }
      )
      gsap.fromTo(
        '.hero-h1',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power2.out' }
      )
      gsap.fromTo(
        '.hero-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.6, ease: 'power2.out' }
      )
      gsap.fromTo(
        '.video-container',
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 0.7, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' }
      )
      gsap.fromTo(
        '.hero-ctas',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.9, ease: 'power2.out' }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToPricing = () => {
    const pricing = document.getElementById('pricing')
    if (pricing) {
      pricing.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToCTA = () => {
    const ctaSection = document.getElementById('cta')
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      ref={heroRef}
      className="hero relative w-full"
      style={{ background: '#0A1628', padding: '100px 0 60px', paddingTop: '120px' }}
    >
      {/* Content container */}
      <div ref={textRef} className="flex flex-col items-center text-center max-w-[900px] mx-auto px-6">
        <h1
          className="hero-h1 text-[56px] md:text-[72px] font-extrabold mt-4 tracking-[-0.03em]"
          style={{ color: '#6366F1', fontFamily: 'var(--font-display)' }}
        >
          НейроСкан 1С
        </h1>
        <p
          className="hero-subtitle text-xl md:text-2xl mt-4"
          style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}
        >
          Распознавание документов за секунды
        </p>
      </div>

      {/* Video */}
      <div className="mt-12 max-w-[900px] mx-auto px-6">
        <div
          className="video-container mx-auto rounded-2xl overflow-hidden"
          style={{
            aspectRatio: '16/9',
            border: '1px solid rgba(248, 250, 252, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <iframe
            src="https://rutube.ru/play/embed/321446cb8e14618a603f7d8bef5437cd/"
            title="Демонстрация НейроСкан 1С"
            allowFullScreen
            className="w-full h-full"
            style={{ border: 'none', display: 'block' }}
          />
        </div>
      </div>

      {/* CTA buttons */}
      <div className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 px-6">
        <a
          href="https://t.me/neuroscan1c"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            style={{
              color: '#F8FAFC',
              border: '1px solid rgba(248, 250, 252, 0.15)',
              fontWeight: 600,
            }}
          >
            Написать в Telegram
          </Button>
        </a>
        <Button
          size="lg"
          onClick={scrollToPricing}
          style={{
            background: '#6366F1',
            color: '#F8FAFC',
            fontWeight: 600,
          }}
        >
          Оформить заказ
        </Button>
        <Button
          size="lg"
          onClick={scrollToCTA}
          style={{
            background: '#6366F1',
            color: '#F8FAFC',
            fontWeight: 600,
          }}
        >
          Оставить заявку
        </Button>
      </div>
    </section>
  )
}