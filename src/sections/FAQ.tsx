import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function FAQ() {
  return (
    <section className="py-20 px-6 bg-gray-50" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Часто задаваемые вопросы</h2>
          <p className="text-gray-600 text-lg">
            Ответы на популярные вопросы о продукте
          </p>
        </div>

        <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="space-y-4">
          <AccordionItem value="item-1" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left">
              Как работает распознавание документов?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Вы делаете фото накладной (УПД или ТОРГ-12) в приложении, и нейросеть
              автоматически распознает все данные: реквизиты контрагента, товары,
              суммы, НДС. Данные попадают в 1С за 30-60 секунд.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left">
              Какие типы документов поддерживаются?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              В базовый комплект входит распознавание УПД и ТОРГ-12. Дополнительные
              типы документов (договоры, накладные других форматов, акты) можно
              добавить за дополнительную плату — 3000 ₽ за новый тип.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left">
              Нужна ли установка на сервер 1С?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Да, необходимо установить расширение на сервер вашей информационной базы.
              В стоимость тарифа включена установка и базовая настройка (1 час работы
              специалиста).
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left">
              Как происходит настройка?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              После покупки мы свяжемся с вами для согласования времени настройки.
              Специалист подключится удаленно, установит расширение и обучит ваших
              сотрудников работе с системой.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left">
              Что включено в цену?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              В стоимость включены: бессрочная лицензия, установка и настройка,
              базовое обучение сотрудников. Никаких ежемесячных платежей.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left">
              Лицензия ограничена по времени?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Нет, это разовая покупка. Лицензия выдается навсегда без ежемесячной
              подписки. После покупки продукт работает без ограничений.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left">
              Могу ли я попробовать перед покупкой?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Мы не предоставляем демо-версию. Но можем провести презентацию
              на вашем оборудовании по запросу — вы увидите, как расширение
              работает именно в вашей конфигурации 1С.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left">
              Что если документ не распознался корректно?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Если система ошиблась, вы можете вручную отредактировать данные перед
              сохранением в 1С. Мы постоянно улучшаем модель распознавания на основе
              реальных документов наших клиентов.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}