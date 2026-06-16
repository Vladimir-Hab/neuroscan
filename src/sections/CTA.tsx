import ContactForm from '@/components/ContactForm'

export default function CTA() {
  return (
    <section className="py-20 px-6" style={{ background: '#0A1628' }} id="cta">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы начать экономить время?
          </h2>
          <p className="text-gray-300 text-lg">
            Оставьте заявку и мы свяжемся с вами для бесплатной консультации
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <ContactForm />
        </div>


      </div>
    </section>
  )
}