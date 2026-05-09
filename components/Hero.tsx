'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden bg-white">
      {/* Decorative blur blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-sm font-medium text-slate-600">Ваш путь к успешной карьере начинается здесь</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl leading-tight">
          Найди своё <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">призвание</span> <br/>и поступи в вуз мечты
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed">
          Пройди полный тест на профориентацию, изучи подходящие факультеты и получи пошаговый план поступления. Все инструменты для осознанного выбора в одном месте.
        </p>
        
        {/* Primary CTAs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-8">
          <Link href="/test" className="group relative bg-white rounded-[24px] p-8 shadow-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 text-left overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-6 shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Какие профессии вам подходят</h3>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">Пройдите глубокое тестирование навыков и интересов, чтобы найти идеальное направление.</p>
            <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
              <span>Начать тест</span>
              <svg className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link href="/faculties" className="group relative bg-white rounded-[24px] p-8 shadow-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 text-left overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-6 shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Факультеты и вузы</h3>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">Изучите подробную базу учебных заведений, программ и проходных баллов.</p>
            <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
              <span>Смотреть каталог</span>
              <svg className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link href="/admission" className="group relative bg-white rounded-[24px] p-8 shadow-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 text-left overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-6 shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Узнать о поступлении</h3>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">Правила приема, документы, сроки и советы для успешного зачисления.</p>
            <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
              <span>Читать гайд</span>
              <svg className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}