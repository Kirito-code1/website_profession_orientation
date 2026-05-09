import Link from 'next/link';
import {
  Search,
  RotateCw,
  Compass,
  BookOpen,
  Building2,
  ArrowRight,
} from 'lucide-react';

import { faculties } from '@/data/faculties';

const filters = [
  'Все',
  'IT и Разработка',
  'Гуманитарные',
  'Естественные науки',
  'Экономика и Управление',
  'Дизайн и Искусство',
];

export default function FacultiesPage() {
  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-32">
      {/* Background */}
      <div className="absolute left-10 top-32 hidden h-40 w-40 rounded-full bg-blue-100 blur-3xl lg:block" />
      <div className="absolute bottom-20 right-10 hidden h-52 w-52 rounded-full bg-sky-100 blur-3xl lg:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>

              <span className="text-sm font-medium text-slate-600">
                Исследуйте направления
              </span>
            </div>

            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              Факультеты и{' '}
              <span className="bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent">
                направления
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-500 md:text-xl">
              Найдите идеальное направление для обучения, которое поможет
              освоить выбранную профессию.
            </p>
          </div>

          {/* Search */}
          <div className="flex w-full max-w-3xl items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-lg transition hover:shadow-xl">
            <div className="px-4 text-slate-400">
              <Search className="h-5 w-5" />
            </div>

            <input
              type="text"
              placeholder="Поиск по факультетам, направлениям или вузам..."
              className="w-full bg-transparent py-3 pr-4 text-slate-900 outline-none placeholder:text-slate-400"
            />

            <button className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600">
              Найти
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap items-center gap-3">
          <span className="mr-2 text-sm font-bold uppercase tracking-wide text-slate-500">
            Направления:
          </span>

          {filters.map((filter, index) => (
            <button
              key={filter}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-md ${
                index === 0
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {faculties.map((faculty) => {
            const Icon = faculty.icon;

            return (
              <Link
                href={`/faculties/${faculty.slug}`}
                key={faculty.slug}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-bl-full bg-gradient-to-br from-blue-50 to-transparent transition-transform group-hover:scale-110" />

                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
                    <Icon className="h-7 w-7" />
                  </div>

                  <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-600">
                    {faculty.category}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-blue-600">
                  {faculty.title}
                </h3>

                <p className="mb-6 flex-grow text-sm leading-relaxed text-slate-500">
                  {faculty.description}
                </p>

                <div className="mb-6 space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                    <span className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-400" />
                      Программ:
                    </span>

                    <span className="font-bold text-slate-900">
                      {faculty.programs}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                    <span className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-blue-400" />
                      ВУЗов:
                    </span>

                    <span className="font-bold text-slate-900">
                      {faculty.universities}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 py-3 font-semibold text-blue-600 transition-all group-hover:bg-blue-500 group-hover:text-white">
                  Подробнее
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load More */}
        <div className="mt-12 flex justify-center">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:shadow-md">
            <RotateCw className="h-4 w-4" />
            Показать еще
          </button>
        </div>

        {/* CTA */}
        <div className="relative mt-20 overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-500 to-sky-600 px-6 py-14 text-center shadow-2xl md:px-12 md:py-16">
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-black/10 blur-3xl" />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-white backdrop-blur-sm">
              <Compass className="h-9 w-9" />
            </div>

            <h2 className="mb-6 text-3xl font-bold leading-tight text-white md:text-5xl">
              Не уверены, какой факультет выбрать?
            </h2>

            <p className="mb-10 text-lg leading-relaxed text-blue-100 md:text-xl">
              Пройдите профориентационный тест, чтобы узнать, какие
              направления подходят именно вам.
            </p>

            <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-600 transition hover:-translate-y-1 hover:bg-slate-50">
                Пройти тест
              </button>

              <button className="rounded-xl border border-white/30 bg-blue-600/40 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition hover:-translate-y-1 hover:bg-blue-600/60">
                Узнать о поступлении
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}