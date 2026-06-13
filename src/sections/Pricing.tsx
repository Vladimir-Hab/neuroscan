import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Info } from 'lucide-react'
import OrderForm from '@/components/OrderForm'
import { tariffs, services } from '@/lib/tariffs'

export default function Pricing() {
  const [selectedTariff, setSelectedTariff] = useState<keyof typeof tariffs | null>(null)

  const selectedTariffData = selectedTariff ? tariffs[selectedTariff] : null

  return (
    <section className="py-20 px-6 bg-white" id="pricing">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Тарифы</h2>
          <p className="text-gray-600 text-lg">
            Выберите подходящий тариф для вашей конфигурации 1С
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {(Object.entries(tariffs) as [keyof typeof tariffs, typeof tariffs[typeof tariffs[keyof typeof tariffs]]][]).map(([key, tariff]) => (
            <Card
              key={key}
              className="relative hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-xl">{tariff.name}</CardTitle>
                <CardDescription>{tariff.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tariff.price.toLocaleString('ru-RU')}</span>
                  <span className="text-xl text-gray-600 ml-1">₽</span>
                </div>

                <div className="space-y-3">
                  <div className="text-sm text-gray-600 mb-2">
                    <Info className="inline w-4 h-4 mr-1" />
                    Конфигурация: {tariff.configuration}
                  </div>

                  <div className="space-y-2">
                    {tariff.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setSelectedTariff(key)}
                >
                  Купить
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6 text-center">Дополнительные услуги</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {(Object.entries(services) as [keyof typeof services, typeof services[typeof services[keyof typeof services]]][]).map(([key, service]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  {service.period && (
                    <CardDescription>{service.period}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-2xl font-bold">{service.price.toLocaleString('ru-RU')}</span>
                    <span className="text-lg text-gray-600 ml-1">₽</span>
                  </div>
                  {service.description && (
                    <p className="text-sm text-gray-600">{service.description}</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Заказать через форму
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {selectedTariffData && (
        <OrderForm
          open={!!selectedTariff}
          onClose={() => setSelectedTariff(null)}
          tariff={selectedTariffData}
        />
      )}
    </section>
  )
}