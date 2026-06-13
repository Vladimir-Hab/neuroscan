import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react'
import { Link, useSearchParams } from 'react-router'

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [notified, setNotified] = useState(false)

  const invId = searchParams.get('InvId')
  const outSum = searchParams.get('OutSum')

  useEffect(() => {
    const notifyServer = async () => {
      if (!invId || !outSum) {
        setLoading(false)
        return
      }

      try {
        const params = new URLSearchParams({
          type: 'payment_callback',
          inv_id: invId,
          out_sum: outSum,
          status: 'success',
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
  }, [invId, outSum])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-lg text-gray-600">Обработка оплаты...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Оплата прошла успешно!</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            Мы свяжемся с вами в ближайшее время для настройки
          </p>

          {invId && (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500">Номер заказа</p>
              <p className="text-lg font-semibold">{invId}</p>
            </div>
          )}

          <div className="pt-4 space-y-2">
            <Link to="/">
              <Button className="w-full" size="lg">
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