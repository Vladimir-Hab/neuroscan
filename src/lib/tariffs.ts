export const tariffs = {
  ut115: {
    id: 'ut-11-5',
    name: 'Расширение для 1С:УТ11.5',
    price: 12200,
    period: '1 месяц',
    configuration: '1С:Управление торговлей 11',
    includes: [
      'Лицензия на 1 месяц',
      'Установка и настройка (1 час)',
      'Распознавание УПД и ТОРГ-12',
      'Обучение сотрудников',
    ],
  },
  bp30: {
    id: 'bp-3-0',
    name: 'Расширение для 1С:Бухгалтерия 3.0',
    price: 12200,
    period: '1 месяц',
    configuration: '1С:Бухгалтерия предприятия',
    includes: [
      'Лицензия на 1 месяц',
      'Установка и настройка (1 час)',
      'Распознавание УПД и ТОРГ-12',
      'Обучение сотрудников',
    ],
  },
  fullKit: {
    id: 'full-kit',
    name: 'Комплект для 1С:БП, КА, ERP, УНФ',
    price: 30500,
    period: '1 месяц',
    configuration: 'По выбору',
    includes: [
      'Лицензия на 1 месяц',
      'Индивидуальная интеграция',
      'Адаптация под вашу конфигурацию',
      'Техподдержка и обучение',
    ],
  },
} as const

export const services = {
  newDocs: {
    id: 'new-docs',
    name: 'Добавление новых типов документов',
    price: 3000,
    description: 'Распознавание новых форматов документов',
  },
  support: {
    id: 'support',
    name: 'Техподдержка',
    period: '1 месяц',
    price: 3000,
    description: 'Консультации и решение проблем',
  },
  updates: {
    id: 'updates',
    name: 'Доступ к обновлениям',
    period: '6 месяцев',
    price: 7320,
    description: 'Все новые функции и улучшения',
  },
} as const

export type TariffId = keyof typeof tariffs
export type ServiceId = keyof typeof services