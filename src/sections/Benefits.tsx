import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap, Shield, Lock, FileCheck, Users, Code2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Benefit {
  icon: React.ElementType
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: Zap,
    title: '30-60 секунд вместо 15 минут',
    description:
      'Сфотографируйте накладную — документ в 1С заполнится автоматически. Без ручного ввода данных.',
  },
  {
    icon: Shield,
    title: 'Всё локально, без интернета',
    description:
      'Распознавание работает на вашем компьютере. Не требуется подключение к сети.',
  },
  {
    icon: Lock,
    title: 'Данные не уходят на сторонние серверы',
    description:
      'Накладные остаются внутри вашей организации. Полная конфиденциальность и безопасность.',
  },
  {
    icon: FileCheck,
    title: 'УПД и ТОРГ-12',
    description:
      'Поддерживаются все основные виды накладных. Расширение интегрируется напрямую в 1С.',
  },
  {
    icon: Users,
    title: 'Освободите бухгалтеров от рутины',
    description:
      'Автоматизируйте ввод документов без ошибок и опечаток. Сократите время обработки накладных.',
  },
  {
    icon: Code2,
    title: 'Легкое внедрение для интеграторов',
    description:
      'Идеальное решение для франчайзи. Простая настройка, быстрая установка клиентов, без зависимости от интернета.',
  },
]

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const rectRef = useRef<SVGRectElement>(null)
  const hoverTlRef = useRef<gsap.core.Timeline | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (!hoverTlRef.current) return
    hoverTlRef.current.play()
    gsap.to(cardRef.current, {
      y: -4,
      boxShadow: '0 12px 40px rgba(99, 102, 241, 0.15)',
      duration: 0.3,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!hoverTlRef.current) return
    hoverTlRef.current.reverse()
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: 'none',
      duration: 0.3,
    })
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    const rect = rectRef.current
    if (!svg || !rect) return

    const card = cardRef.current
    if (!card) return

    const w = card.offsetWidth
    const h = card.offsetHeight
    const perimeter = 2 * (w + h)

    rect.setAttribute('width', String(w - 2))
    rect.setAttribute('height', String(h - 2))

    const tl = gsap.timeline({ paused: true })
    tl.to(svg, { opacity: 1, duration: 0.3 })
    tl.fromTo(
      rect,
      { strokeDasharray: `${perimeter * 0.3} ${perimeter}`, strokeDashoffset: 0 },
      { strokeDasharray: `${perimeter * 0.15} ${perimeter}`, strokeDashoffset: -perimeter * 0.4, duration: 1.5, ease: 'power2.out' },
      0
    )

    hoverTlRef.current = tl

    return () => {
      tl.kill()
    }
  }, [])

  const Icon = benefit.icon

  return (
    <div
      ref={cardRef}
      className="benefit-card relative rounded-2xl p-8 flex gap-6 cursor-default transition-none"
      style={{
        background: 'rgba(253, 251, 247, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(148, 163, 184, 0.25)',
        overflow: 'hidden',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated border SVG */}
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0"
      >
        <defs>
          <linearGradient id={`border-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0" />
            <stop offset="20%" stopColor="#6366F1" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#818CF8" stopOpacity="1" />
            <stop offset="80%" stopColor="#6366F1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect
          ref={rectRef}
          x="1"
          y="1"
          rx="15"
          ry="15"
          fill="none"
          stroke={`url(#border-gradient-${index})`}
          strokeWidth="2"
        />
      </svg>

      {/* Icon */}
      <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
        <Icon size={32} style={{ color: '#6366F1' }} />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <h3
          className="text-xl md:text-2xl font-bold tracking-[-0.02em]"
          style={{ color: '#1E293B', fontFamily: 'var(--font-display)' }}
        >
          {benefit.title}
        </h3>
        <p
          className="text-base mt-2 leading-relaxed"
          style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}
        >
          {benefit.description}
        </p>
      </div>
    </div>
  )
}

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.benefits-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
        }
      )
      gsap.fromTo(
        '.benefits-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
        }
      )
      gsap.fromTo(
        '.benefit-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.benefits-grid', start: 'top 75%', toggleActions: 'play none none none' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="benefits w-full"
      style={{ background: '#FDFBF7', padding: '120px 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <span
            className="benefits-label inline-block text-sm font-medium uppercase tracking-[0.12em]"
            style={{ color: '#6366F1', fontFamily: 'var(--font-body)' }}
          >
            ПРЕИМУЩЕСТВА
          </span>
          <h2
            className="benefits-heading text-[28px] md:text-[36px] font-bold mt-4 tracking-[-0.02em]"
            style={{ color: '#1E293B', fontFamily: 'var(--font-display)' }}
          >
            Почему НейроСкан
          </h2>
        </div>

        <div className="benefits-grid grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {benefits.map((b, i) => (
            <BenefitCard key={i} benefit={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}