import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import OrderForm from '@/components/OrderForm'
import { tariffs } from '@/lib/tariffs'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)
  const [orderFormOpen, setOrderFormOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{
        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
      }}
    >
      <Button
        size="lg"
        onClick={() => setOrderFormOpen(true)}
        style={{
          background: '#6366F1',
          color: '#F8FAFC',
          fontWeight: 600,
        }}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Оформить заказ
      </Button>
    </div>

    <OrderForm
      open={orderFormOpen}
      onClose={() => setOrderFormOpen(false)}
      tariff={tariffs.main}
    />
  )
}