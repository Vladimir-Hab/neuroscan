import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import PrivacyPolicyDialog from './PrivacyPolicyDialog'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [privacyOpen, setPrivacyOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    comment: '',
  })

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
        type: 'contact',
        name: formData.name.trim(),
        contact: formData.contact.trim(),
        task: `Заявка на консультацию. ${formData.comment ? `Комментарий: ${formData.comment}.` : ''}`,
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
        setFormData({ name: '', contact: '', email: '', comment: '' })
      }, 3000)
    } catch (err) {
      setError('Ошибка соединения. Проверьте интернет.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="text-green-600 text-4xl mb-2">✓</div>
        <p className="text-green-800 font-semibold">Заявка отправлена!</p>
        <p className="text-green-600 text-sm mt-1">Мы свяжемся с вами в ближайшее время</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="contact-name">
          Ваше имя <span className="text-red-500">*</span>
        </Label>
        <Input
          id="contact-name"
          placeholder="Иван Иванов"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={loading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-contact">
          Телефон <span className="text-red-500">*</span>
        </Label>
        <Input
          id="contact-contact"
          placeholder="+7 900 000-00-00"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          disabled={loading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          placeholder="email@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-comment">Ваш вопрос (опционально)</Label>
        <Textarea
          id="contact-comment"
          placeholder="Расскажите о вашей задаче..."
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

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading ? 'Отправка...' : 'Отправить заявку'}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => window.open('https://t.me/vladimir_7575', '_blank')}
      >
        Написать в Telegram
      </Button>

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
      <PrivacyPolicyDialog open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </form>
  )
}