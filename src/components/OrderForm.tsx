import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import PrivacyPolicyDialog from './PrivacyPolicyDialog'

interface OrderFormProps {
  open: boolean
  onClose: () => void
  tariff: {
    id: string
    name: string
    price: number
    configuration?: string
  }
}

export default function OrderForm({ open, onClose, tariff }: OrderFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [privacyOpen, setPrivacyOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    configuration: tariff.configuration || '',
    comment: '',
  })

  const configurations = [
    '1С:Управление торговлей 11',
    '1С:Бухгалтерия предприятия',
    '1С:Комплексная автоматизация',
    '1С:ERP',
    '1С:Управление небольшой фирмой',
    'Другая',
  ]

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '')
    return digits.length >= 10
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.name.trim() || !formData.contact.trim()) {
      setError('Заполните имя и телефон')
      return
    }

    if (!validatePhone(formData.contact)) {
      setError('Укажите корректный номер телефона (минимум 10 цифр)')
      return
    }

    setLoading(true)

    try {
      const params = new URLSearchParams({
        type: 'order',
        name: formData.name.trim(),
        contact: formData.contact.trim(),
        configuration: formData.configuration,
        task: `Заказ с сайта: ${tariff.name} — ${tariff.price.toLocaleString('ru-RU')} ₽. ${formData.comment ? `Комментарий: ${formData.comment}.` : ''}`,
        source: 'site',
      })

      await fetch(
        `https://n8auto.ru/webhook/312b5335-6a03-4722-8d47-7b125579e953?${params.toString()}`,
        {
          method: 'GET',
          mode: 'no-cors',
        }
      )

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 3000)
    } catch (err) {
      setError('Ошибка соединения. Проверьте интернет.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="text-green-600 text-4xl mb-2">✓</div>
            <p className="text-green-800 font-semibold">Заказ принят!</p>
            <p className="text-green-600 text-sm mt-1">Мы свяжемся с вами для оплаты</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Оформление заказа</DialogTitle>
          <DialogDescription>
            {tariff.name} — {tariff.price.toLocaleString('ru-RU')} ₽
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="order-name">
              Ваше имя <span className="text-red-500">*</span>
            </Label>
            <Input
              id="order-name"
              placeholder="Иван Иванов"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={loading}
              required
            />
            <p className="text-xs text-gray-500">
              Обязательно для связи с вами перед настройкой
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="order-contact">
              Телефон <span className="text-red-500">*</span>
            </Label>
            <Input
              id="order-contact"
              placeholder="+7 900 000-00-00"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              disabled={loading}
              required
            />
            <p className="text-xs text-gray-500">
              Мы позвоним вам для согласования времени настройки
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="order-email">Email</Label>
            <Input
              id="order-email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={loading}
            />
            <p className="text-xs text-gray-500">Для отправки чека и документов</p>
          </div>

          {tariff.configuration && (
            <div className="space-y-2">
              <Label htmlFor="order-configuration">Конфигурация 1С</Label>
              <Select
                value={formData.configuration}
                onValueChange={(value) =>
                  setFormData({ ...formData, configuration: value })
                }
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {configurations.map((config) => (
                    <SelectItem key={config} value={config}>
                      {config}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="order-comment">Комментарий (опционально)</Label>
            <Textarea
              id="order-comment"
              placeholder="Пожелания по настройке..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              disabled={loading}
              rows={3}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
              {error}
            </div>
          )}

          <DialogFooter className="gap-2 flex-col">
            <div className="flex gap-2 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="flex-1"
              >
                Отмена
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Отправить заявку
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="text-blue-600 hover:underline"
              >
                политикой конфиденциальности
              </button>
            </p>
          </DialogFooter>
          <PrivacyPolicyDialog open={privacyOpen} onOpenChange={setPrivacyOpen} />
        </form>
      </DialogContent>
    </Dialog>
  )
}