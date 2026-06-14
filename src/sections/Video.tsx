import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

export default function Video() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.video-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
        }
      )
      gsap.fromTo(
        '.video-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
        }
      )
      gsap.fromTo(
        '.video-container',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1, delay: 0.2, ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
        }
      )
      gsap.fromTo(
        '.video-description',
        { opacity: 0, y: 15 },
        {
          opacity: 1, y: 0, duration: 0.6, delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
        }
      )
      gsap.fromTo(
        '.post-video-cta',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, delay: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToPricing = () => {
    const pricing = document.getElementById('pricing')
    if (pricing) {
      pricing.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="video"
      ref={sectionRef}
      className="video-section w-full"
      style={{ background: '#FDFBF7', padding: '120px 0' }}
    >
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <span
          className="video-label inline-block text-sm font-medium uppercase tracking-[0.12em]"
          style={{ color: '#6366F1', fontFamily: 'var(--font-body)' }}
        >
          ДЕМОНСТРАЦИЯ
        </span>
        <h2
          className="video-heading text-[28px] md:text-[36px] font-bold mt-4 tracking-[-0.02em]"
          style={{ color: '#1E293B', fontFamily: 'var(--font-display)' }}
        >
          Как это работает
        </h2>

        <div
          className="video-container mt-12 mx-auto rounded-2xl overflow-hidden"
          style={{
            maxWidth: '900px',
            aspectRatio: '16/9',
            border: '1px solid rgba(148, 163, 184, 0.25)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
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

        <p
          className="video-description mt-6 max-w-[600px] mx-auto text-base leading-relaxed"
          style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}
        >
          Посмотрите, как НейроСкан распознает накладную и автоматически заполняет документ в 1С
        </p>

        {/* Post-video CTA */}
        <div className="post-video-cta mt-12 max-w-[600px] mx-auto">
          <p
            className="text-lg font-semibold mb-6"
            style={{ color: '#1E293B', fontFamily: 'var(--font-body)' }}
          >
            Уже поняли, что это нужно?
          </p>
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
        </div>
      </div>
    </section>
  )
}