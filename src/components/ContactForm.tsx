﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

interface ContactFormProps {
  onSuccess?: () => void
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    configuration: '',
    services: [] as string[],
    task: '',
  })

  const configurations = [
    'Управление торговлей 11',
    'Бухгалтерия предприятия',
    'Комплексная автоматизация',
    'ERP',
    'Управление небольшой фирмой',
    'Другая',
  ]

  const servicesList = [
    { id: 'adapt', name: 'Адаптация конфигурации', desc: 'БП, КА, ERP, УНФ...' },
    { id: 'doc', name: 'Новые типы документов', desc: 'ТОРГ-12, договоры...' },
    { id: 'sup', name: 'Техподдержка', desc: 'Ошибки, обновления' },
    { id: 'train', name: 'Обучение модели', desc: 'На ваших документах' },
  ]

  const handleServiceToggle = (serviceId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      services: checked
        ? [...prev.services, serviceId]
        : prev.services.filter((s) => s !== serviceId),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!formData.name.trim() || !formData.contact.trim()) {
      setError('Заполните имя и контакт')
      return
    }

    setLoading(true)

    try {
      const params = new URLSearchParams({
        name: formData.name.trim(),
        contact: formData.contact.trim(),
        configuration: formData.configuration,
        services: servicesList
          .filter((s) => formData.services.includes(s.id))
          .map((s) => s.name)
          .join(', '),
        task: 'Заявка с сайта: ' + (formData.task || ''),
        source: 'site',
      })
        {
          method: 'GET',
          mode: 'no-cors',
        }
      )

      await fetch(
          mode: 'no-cors',
        }
      )

      setSuccess(true)
      setFormData({
        name: '',
        contact: '',
        configuration: '',
        services: [],
        task: '',
      })
      setTimeout(() => {
        setSuccess(false)
        onSuccess?.()
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
        <Label htmlFor="name">
          Ваше имя <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Иван Иванов"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={loading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">
          Телефон или Telegram <span className="text-red-500">*</span>
        </Label>
        <Input
          id="contact"
          placeholder="+7 900 000-00-00"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          disabled={loading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="configuration">Конфигурация 1С</Label>
        <Select
          value={formData.configuration}
          onValueChange={(value) =>
            setFormData({ ...formData, configuration: value })
          }
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue placeholder="— выберите —" />
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

      <div className="space-y-2">
        <Label>Услуги</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {servicesList.map((service) => (
            <label
              key={service.id}
              className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                formData.services.includes(service.id)
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <Checkbox
                id={service.id}
                checked={formData.services.includes(service.id)}
                onCheckedChange={(checked) =>
                  handleServiceToggle(service.id, checked as boolean)
                }
                disabled={loading}
              />
              <div className="flex-1">
                <span className="font-medium text-sm">{service.name}</span>
                <p className="text-xs text-gray-500">{service.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="task">Опишите задачу</Label>
        <Textarea
          id="task"
          placeholder="Что нужно сделать..."
          value={formData.task}
          onChange={(e) => setFormData({ ...formData, task: e.target.value })}
          disabled={loading}
          rows={3}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
        size="lg"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Отправить заявку
      </Button>
    </form>
  )
}
