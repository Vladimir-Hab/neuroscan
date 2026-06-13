import { Shield, Clock, Users, Award } from 'lucide-react'

export default function Guarantee() {
  const guarantees = [
    {
      icon: Shield,
      title: 'Гарантия возврата',
      description: 'Возврат в течение 7 дней, если продукт не подходит',
    },
    {
      icon: Clock,
      title: 'Индивидуальная настройка',
      description: 'Адаптация под вашу конфигурацию 1С',
    },
    {
      icon: Users,
      title: 'Техподдержка',
      description: 'Поддержка в течение всего срока лицензии',
    },
    {
      icon: Award,
      title: 'Опыт внедрений',
      description: 'Более 50 успешных проектов',
    },
  ]

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Почему нам доверяют</h2>
          <p className="text-gray-600 text-lg">
            Мы гарантируем качество и результат
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {guarantees.map((guarantee, idx) => {
            const Icon = guarantee.icon
            return (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{guarantee.title}</h3>
                <p className="text-gray-600 text-sm">{guarantee.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}