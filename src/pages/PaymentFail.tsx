import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { XCircle, ArrowRight, Loader2, MessageCircle } from 'lucide-react'
import { Link, useSearchParams } from 'react-router'
import ContactForm from '@/components/ContactForm'

export default function PaymentFail() {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [notified, setNotified] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  const invId = searchParams.get('InvId')

  useEffect(() => {
    const notifyServer = async () => {
      if (!invId) {
        setLoading(false)
        return
      }

      try {
        const params = new URLSearchParams({
          type: 'payment_callback',
          inv_id: invId,
          status: 'fail',
        })

        await fetch(
          `https://n8auto.ru/webhook/312b5335-6a03-4722-8d47-7b125579e953?${params.toString()}`
        )
        setNotified(true)
      } catch (err) {
        console.error('Failed to notify server:', err)
      } finally {
        setLoading(false)
      }
    }

    notifyServer()
  }, [invId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-red-600" />
          <p className="text-lg text-gray-600">Обработка...</p>
        </div>
      </div>
    )
  }

  if (showContactForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-md mx-auto">
          <Button
            variant="ghost"
            onClick={() => setShowContactForm(false)}
            className="mb-4"
          >
            ← Назад
          </Button>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-2">Свяжитесь с нами</h2>
            <p className="text-gray-600 mb-6">
              Мы поможем вам с оплатой или ответим на вопросы
            </p>
            <ContactForm onSuccess={() => setShowContactForm(false)} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Оплата не прошла</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            Попробуйте снова или свяжитесь с нами для помощи
          </p>

          {invId && (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500">Номер заказа</p>
              <p className="text-lg font-semibold">{invId}</p>
            </div>
          )}

          <div className="pt-4 space-y-2">
            <Link to="/pricing">
              <Button className="w-full" variant="outline" size="lg">
                Попробовать снова
              </Button>
            </Link>

            <Button
              className="w-full"
              variant="ghost"
              onClick={() => setShowContactForm(true)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Связаться с нами
            </Button>

            <Link to="/">
              <Button className="w-full" variant="ghost" size="lg">
                На главную
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}