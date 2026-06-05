export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{ background: '#0A1628', padding: '32px 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          className="text-sm"
          style={{ color: '#64748B', fontFamily: 'var(--font-body)' }}
        >
          &copy; 2025 НейроСкан 1С
        </span>
        <a
          href="https://t.me/neuroscan1c"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm transition-all duration-200 hover:underline"
          style={{ color: '#818CF8', fontFamily: 'var(--font-body)' }}
        >
          Telegram
        </a>
      </div>
    </footer>
  )
}
