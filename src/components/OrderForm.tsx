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
  const [error, setError] = useState('')

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
        name: formData.name.trim(),
        contact: formData.contact.trim(),
        email: formData.email.trim(),
        configuration: formData.configuration,
        tariff_id: tariff.id,
        tariff_name: tariff.name,
        price: tariff.price.toString(),
        comment: formData.comment,
        source: 'site',
      })

      const response = await fetch(
        `https://n8auto.ru/webhook/312b5335-6a03-4722-8d47-7b125579e953?${params.toString()}`
      )

      if (response.ok) {
        alert('Заказ принят! Мы свяжемся с вами для оплаты.')
        onClose()
      } else {
        setError('Не удалось отправить заказ')
      }
    } catch (err) {
      setError('Ошибка соединения. Проверьте интернет.')
    } finally {
      setLoading(false)
    }
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

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Перейти к оплате
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}