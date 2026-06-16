import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'
import OrderForm from '@/components/OrderForm'
import { tariffs, services } from '@/lib/tariffs'

export default function Pricing() {
  const [selectedTariff, setSelectedTariff] = useState<keyof typeof tariffs | null>(null)
  const [selectedService, setSelectedService] = useState<keyof typeof services | null>(null)

  const selectedTariffData = selectedTariff ? tariffs[selectedTariff] : null
  const selectedServiceData = selectedService ? services[selectedService] : null

  const mainTariff = tariffs.main
  const newDocsService = services.newDocs

  return (
    <section className="py-20 px-6 bg-white" id="pricing">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Сколько это стоит</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Main tariff card - wider */}
          <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{mainTariff.name}</CardTitle>
              {mainTariff.subtitle && (
                <p className="text-sm text-gray-600 mt-1">{mainTariff.subtitle}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold">{mainTariff.price.toLocaleString('ru-RU')}</span>
                <span className="text-xl text-gray-600 ml-1">₽</span>
              </div>
              {mainTariff.note && (
                <p className="text-sm text-gray-500 mb-6">{mainTariff.note}</p>
              )}

              <div className="space-y-3">
                <div className="space-y-2">
                  {mainTariff.includes.map((item, idx) => (
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
                onClick={() => setSelectedTariff('main')}
              >
                Купить
              </Button>
            </CardFooter>
          </Card>

          {/* Additional service card - narrower */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{newDocsService.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-2xl font-bold">{newDocsService.price.toLocaleString('ru-RU')}</span>
                <span className="text-lg text-gray-600 ml-1">₽</span>
              </div>
              {newDocsService.description && (
                <p className="text-sm text-gray-600">{newDocsService.description}</p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => setSelectedService('newDocs')}
              >
                Заказать
              </Button>
            </CardFooter>
          </Card>
        </div>


      </div>

      {selectedTariffData && (
        <OrderForm
          open={!!selectedTariff}
          onClose={() => setSelectedTariff(null)}
          tariff={selectedTariffData}
        />
      )}

      {selectedServiceData && (
        <OrderForm
          open={!!selectedService}
          onClose={() => setSelectedService(null)}
          tariff={selectedServiceData}
        />
      )}
    </section>
  )
}