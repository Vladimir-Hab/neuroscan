import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToPricing = () => {
    const pricing = document.getElementById('pricing')
    if (pricing) {
      pricing.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="text-xl font-bold" style={{ color: scrolled ? '#1E293B' : '#F8FAFC' }}>
            НейроСкан 1С
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: scrolled ? '#64748B' : 'rgba(248, 250, 252, 0.7)' }}>
              Главная
            </a>
            <a href="#video" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: scrolled ? '#64748B' : 'rgba(248, 250, 252, 0.7)' }}>
              Демо
            </a>
            <a href="#pricing" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: scrolled ? '#64748B' : 'rgba(248, 250, 252, 0.7)' }}>
              Тарифы
            </a>
            <a href="#faq" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: scrolled ? '#64748B' : 'rgba(248, 250, 252, 0.7)' }}>
              FAQ
            </a>
          </nav>

          {/* CTA Button */}
          <Button
            size="sm"
            onClick={scrollToPricing}
            style={{
              background: '#6366F1',
              color: '#F8FAFC',
              fontWeight: 600,
            }}
          >
            Купить
          </Button>
        </div>
      </div>
    </header>
  )
}