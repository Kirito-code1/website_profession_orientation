import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-slate-900">ПрофВыбор</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              О проекте
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/support" className="hover:text-blue-600 transition-colors">
              Поддержка
            </Link>
          </div>
          
          <div className="text-sm text-slate-400">
            &copy; 2026 Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
}