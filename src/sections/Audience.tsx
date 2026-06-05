import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, Code2, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const accountantFeatures = [
  'Экономия до 14 минут на документ',
  'Снижение ошибок ввода',
  'Работа без интернета',
]

const franchiseeFeatures = [
  'Готовый продукт для продажи',
  'Быстрая интеграция',
  'Поддержка УПД и ТОРГ-12',
]

export default function Audience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.audience-left',
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' }
        }
      )
      gsap.fromTo(
        '.audience-right',
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, delay: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="audience relative w-full overflow-hidden"
      style={{ minHeight: '500px' }}
    >
      {/* Desktop: diagonal split */}
      <div className="hidden md:flex w-full min-h-[500px]">
        {/* Left side — Accountants */}
        <div
          className="audience-left relative flex-1"
          style={{
            background: '#6366F1',
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
            padding: '80px 64px',
          }}
        >
          <div className="max-w-[480px]">
            <Building2 size={48} style={{ color: '#F8FAFC', opacity: 0.8 }} />
            <h3
              className="text-[28px] md:text-[36px] font-bold mt-6 tracking-[-0.02em]"
              style={{ color: '#F8FAFC', fontFamily: 'var(--font-display)' }}
            >
              Для бухгалтерий
            </h3>
            <p
              className="text-lg mt-4 leading-relaxed max-w-[400px]"
              style={{ color: 'rgba(248, 250, 252, 0.8)', fontFamily: 'var(--font-body)' }}
            >
              Автоматизируйте ввод накладных. Сэкономьте время бухгалтеров на рутинных операциях и исключите ошибки ручного ввода.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {accountantFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check size={16} style={{ color: '#F8FAFC', opacity: 0.7 }} />
                  <span
                    className="text-base"
                    style={{ color: 'rgba(248, 250, 252, 0.7)', fontFamily: 'var(--font-body)' }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side — Franchisees */}
        <div
          className="audience-right relative flex-1 flex justify-end"
          style={{
            background: '#0A1628',
            marginLeft: '-15%',
            padding: '80px 64px',
          }}
        >
          <div className="max-w-[480px]">
            <Code2 size={48} style={{ color: '#F8FAFC', opacity: 0.8 }} />
            <h3
              className="text-[28px] md:text-[36px] font-bold mt-6 tracking-[-0.02em]"
              style={{ color: '#F8FAFC', fontFamily: 'var(--font-display)' }}
            >
              Для 1С-франчайзи
            </h3>
            <p
              className="text-lg mt-4 leading-relaxed max-w-[400px]"
              style={{ color: 'rgba(248, 250, 252, 0.8)', fontFamily: 'var(--font-body)' }}
            >
              Предложите клиентам готовое решение для автоматизации ввода документов. Лёгкая установка и настройка.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {franchiseeFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check size={16} style={{ color: '#F8FAFC', opacity: 0.7 }} />
                  <span
                    className="text-base"
                    style={{ color: 'rgba(248, 250, 252, 0.7)', fontFamily: 'var(--font-body)' }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile: stacked */}
      <div className="flex md:hidden flex-col">
        <div
          className="audience-left px-6 py-12"
          style={{ background: '#6366F1', borderRadius: '0 0 8px 8px' }}
        >
          <Building2 size={40} style={{ color: '#F8FAFC', opacity: 0.8 }} />
          <h3
            className="text-[24px] font-bold mt-4 tracking-[-0.02em]"
            style={{ color: '#F8FAFC', fontFamily: 'var(--font-display)' }}
          >
            Для бухгалтерий
          </h3>
          <p
            className="text-base mt-3 leading-relaxed"
            style={{ color: 'rgba(248, 250, 252, 0.8)', fontFamily: 'var(--font-body)' }}
          >
            Автоматизируйте ввод накладных. Сэкономьте время бухгалтеров на рутинных операциях и исключите ошибки ручного ввода.
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {accountantFeatures.map((f, i) => (
              <li key={i} className="flex items-center gap-3">
                <Check size={16} style={{ color: '#F8FAFC', opacity: 0.7 }} />
                <span
                  className="text-sm"
                  style={{ color: 'rgba(248, 250, 252, 0.7)', fontFamily: 'var(--font-body)' }}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="audience-right px-6 py-12"
          style={{ background: '#0A1628' }}
        >
          <Code2 size={40} style={{ color: '#F8FAFC', opacity: 0.8 }} />
          <h3
            className="text-[24px] font-bold mt-4 tracking-[-0.02em]"
            style={{ color: '#F8FAFC', fontFamily: 'var(--font-display)' }}
          >
            Для 1С-франчайзи
          </h3>
          <p
            className="text-base mt-3 leading-relaxed"
            style={{ color: 'rgba(248, 250, 252, 0.8)', fontFamily: 'var(--font-body)' }}
          >
            Предложите клиентам готовое решение для автоматизации ввода документов. Лёгкая установка и настройка.
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {franchiseeFeatures.map((f, i) => (
              <li key={i} className="flex items-center gap-3">
                <Check size={16} style={{ color: '#F8FAFC', opacity: 0.7 }} />
                <span
                  className="text-sm"
                  style={{ color: 'rgba(248, 250, 252, 0.7)', fontFamily: 'var(--font-body)' }}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
