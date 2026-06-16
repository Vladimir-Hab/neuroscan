import { Clock, Users, Award } from 'lucide-react'

export default function Guarantee() {
  const guarantees = [
    {
      icon: Clock,
      title: 'Индивидуальная настройка',
      description: 'Адаптация под вашу конфигурацию 1С',
    },
    {
      icon: Users,
      title: 'Техподдержка',
      description: 'Помощь по вопросам установки и использования',
    },
    {
      icon: Award,
      title: 'Опыт внедрений',
      description: 'Более 50 успешных проектов',
    },
  ]

  return null
}