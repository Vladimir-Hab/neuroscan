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

        <div className="text-center mt-8">
          <p className="text-gray-400 mb-4">Или выберите готовое решение</p>
          <a
            href="#pricing"
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Выбрать тариф
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}