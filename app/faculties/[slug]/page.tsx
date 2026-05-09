// app/faculties/[slug]/page.tsx

import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  BookOpen,
  Building2,
  Users,
  GraduationCap,
  CircleCheck,
  Wallet,
} from 'lucide-react';

import { faculties } from '@/data/faculties';

export default async function FacultyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const faculty = faculties.find((item) => item.slug === slug);

  if (!faculty) {
    notFound();
  }

  const Icon = faculty.icon;

  return (
    <main className="relative overflow-hidden bg-[#f8fafc]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white pt-32">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-sky-100 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* LEFT */}
            <div className="pb-20">
              {/* Breadcrumbs */}
              <div className="mb-8 flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500">
                <Link
                  href="/faculties"
                  className="transition hover:text-blue-600"
                >
                  Факультеты
                </Link>

                <span>/</span>

                <span className="text-slate-400">
                  {faculty.title}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl">
                {faculty.title}
              </h1>

              {/* Desc */}
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-500 md:text-xl">
                {faculty.description}
              </p>

              {/* CTA */}
              <div className="mt-10 flex flex-wrap gap-4">
                <button className="rounded-2xl bg-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-blue-500/30 transition-all hover:-translate-y-1 hover:bg-blue-600">
                  Посмотреть поступление
                </button>

                <button className="rounded-2xl border border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50">
                  Учебная программа
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative pb-20">
              <div className="group relative h-[420px] overflow-hidden rounded-[32px] border border-slate-100 shadow-2xl">
                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-blue-900/20 to-transparent" />

                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                  alt={faculty.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute bottom-6 left-6 z-20 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white">
                      <Icon className="h-7 w-7" />
                    </div>

                    <div>
                      <div className="text-sm text-white/80">
                        Направление
                      </div>

                      <div className="text-xl font-bold text-white">
                        {faculty.category}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid gap-6 pb-20 md:grid-cols-4">
            <div className="rounded-[28px] border border-slate-100 bg-white p-8 shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <BookOpen className="h-6 w-6" />
              </div>

              <div className="text-4xl font-black text-slate-900">
                {faculty.programs}
              </div>

              <div className="mt-2 text-slate-500">
                Программ
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-100 bg-white p-8 shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Building2 className="h-6 w-6" />
              </div>

              <div className="text-4xl font-black text-slate-900">
                {faculty.universities}
              </div>

              <div className="mt-2 text-slate-500">
                Университетов
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-100 bg-white p-8 shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Users className="h-6 w-6" />
              </div>

              <div className="text-4xl font-black text-slate-900">
                {faculty.students}
              </div>

              <div className="mt-2 text-slate-500">
                Студентов
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-100 bg-white p-8 shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <Wallet className="h-6 w-6" />
              </div>

              <div className="text-4xl font-black text-slate-900">
                {faculty.salary}
              </div>

              <div className="mt-2 text-slate-500">
                Средняя зарплата
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* ABOUT */}
          <div className="rounded-[32px] border border-slate-100 bg-white p-10 shadow-lg">
            <h2 className="text-4xl font-black text-slate-900">
              О факультете
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              Факультет ориентирован на современные технологии,
              практическое обучение и подготовку специалистов,
              востребованных на международном рынке труда.
            </p>
          </div>

          {/* MAIN SUBJECTS */}
          <div className="mt-12 rounded-[32px] border border-slate-100 bg-white p-10 shadow-lg">
            <h3 className="mb-8 text-3xl font-black text-slate-900">
              Основные предметы
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'Математика',
                'Информатика и ИКТ',
                'Русский язык',
                'Английский язык',
              ].map((subject) => (
                <div
                  key={subject}
                  className="rounded-[24px] border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="text-lg font-bold text-slate-900">
                    {subject}
                  </div>

                  <div className="mt-1 text-sm font-medium text-blue-600">
                    Обязательный предмет
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
              <CircleCheck className="h-4 w-4" />
              Проходной балл: 264+
            </div>
          </div>

          {/* KEY SUBJECTS */}
          <div className="mt-12 rounded-[32px] border border-slate-100 bg-white p-10 shadow-lg">
            <div className="mb-10 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-100 text-blue-600">
                <BookOpen className="h-7 w-7" />
              </div>

              <div>
                <h3 className="text-3xl font-black text-slate-900">
                  Ключевые предметы
                </h3>

                <p className="mt-1 text-slate-500">
                  Что изучают студенты
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: 'Алгоритмы и структуры данных',
                  desc: 'Основы эффективной разработки программ.',
                },
                {
                  title: 'Frontend & Backend',
                  desc: 'Создание современных веб-приложений.',
                },
                {
                  title: 'Базы данных',
                  desc: 'Проектирование и управление данными.',
                },
                {
                  title: 'Искусственный интеллект',
                  desc: 'ML, нейросети и аналитика данных.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-slate-100 bg-slate-50 p-7"
                >
                  <h4 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h4>

                  <p className="mt-3 leading-relaxed text-slate-500">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CAREERS */}
          <div className="mt-12 rounded-[32px] border border-slate-100 bg-white p-10 shadow-lg">
            <div className="mb-10 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-100 text-blue-600">
                <GraduationCap className="h-7 w-7" />
              </div>

              <div>
                <h3 className="text-3xl font-black text-slate-900">
                  Кем вы сможете работать
                </h3>

                <p className="mt-1 text-slate-500">
                  Популярные профессии после окончания
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                {
                  title: 'Frontend Developer',
                  salary: '$1200 - $3000',
                },
                {
                  title: 'Backend Developer',
                  salary: '$1500 - $4000',
                },
                {
                  title: 'Fullstack Engineer',
                  salary: '$2000 - $5000',
                },
                {
                  title: 'UI/UX Designer',
                  salary: '$1000 - $2500',
                },
                {
                  title: 'Data Scientist',
                  salary: '$2500 - $6000',
                },
                {
                  title: 'Cyber Security Engineer',
                  salary: '$3000 - $7000',
                },
              ].map((career) => (
                <div
                  key={career.title}
                  className="rounded-[28px] border border-slate-100 bg-slate-50 p-6"
                >
                  <h4 className="text-xl font-bold text-slate-900">
                    {career.title}
                  </h4>

                  <div className="mt-4 inline-flex rounded-2xl bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                    {career.salary}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}