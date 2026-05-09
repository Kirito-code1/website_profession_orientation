// app/profile/page.tsx

"use client"

import {
  GraduationCap,
  User,
  Menu,
  Bookmark,
  ChartPie,
  Settings,
  RotateCcw,
  Heart,
  Code2,
  Paintbrush,
  Wallet,
  TrendingUp,
  Trash2,
} from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 overflow-x-hidden">

      {/* MAIN */}
      <main className="pt-20 relative">
        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-100 blur-3xl rounded-full opacity-40" />

          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-100 blur-3xl rounded-full opacity-40" />

          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(59,130,246,0.08) 2px, transparent 2px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-10 lg:py-14 flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR */}
          <aside className="w-full lg:w-[270px] shrink-0">
            <div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] lg:sticky lg:top-28">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-200 shadow-inner mb-4">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b918e7ac30-c1c64b4de787b5b6a6c8.png"
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  Алексей Смирнов
                </h2>

                <p className="text-sm text-slate-500 font-medium mt-1">
                  Абитуриент 2026
                </p>
              </div>

              <div className="mt-8 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-blue-50 text-blue-600 font-semibold">
                  <Bookmark className="w-5 h-5" />
                  Сохранённое
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition font-medium">
                  <ChartPie className="w-5 h-5" />
                  Результаты тестов
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition font-medium">
                  <Settings className="w-5 h-5" />
                  Настройки
                </button>
              </div>
            </div>
          </aside>

          {/* CONTENT */}
          <section className="flex-1 flex flex-col gap-10">
            {/* PROFILE RESULT */}
            <div>
              <div className="mb-6">
                <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
                  Ваш профиль
                </h1>

                <p className="text-slate-500 font-medium">
                  Последние результаты и сохраненные материалы
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[30px] bg-white border border-slate-200 p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full" />

                {/* CIRCLE */}
                <div className="relative w-36 h-36 shrink-0">
                  <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="3"
                    />

                    <path
                      d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="85, 100"
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-black text-slate-900">
                      85%
                    </span>
                  </div>
                </div>

                {/* INFO */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-4">
                    IT и Технологии
                  </div>

                  <h2 className="text-3xl font-black text-slate-900 mb-3">
                    Системная инженерия
                  </h2>

                  <p className="text-slate-500 leading-relaxed max-w-2xl mb-7">
                    Ваши ответы показывают высокую склонность к аналитическому
                    мышлению и работе со сложными системами.
                  </p>

                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <button className="px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 transition text-white font-semibold shadow-lg shadow-blue-500/30">
                      Подробнее о результате
                    </button>

                    <button className="px-6 py-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-2 transition">
                      <RotateCcw className="w-4 h-4" />
                      Пройти тест заново
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* SAVED PROFESSIONS */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black text-slate-900">
                  Сохранённые профессии
                </h2>

                <button className="text-blue-600 hover:text-blue-700 font-semibold">
                  Смотреть все
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CARD */}
                <div className="group relative overflow-hidden rounded-[28px] bg-white border border-slate-200 p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-2xl transition duration-300">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full" />

                  <div className="relative flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Code2 className="w-7 h-7" />
                    </div>

                    <button className="text-red-500 hover:scale-110 transition">
                      <Heart className="fill-red-500 w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition">
                    Frontend-разработчик
                  </h3>

                  <p className="text-slate-500 leading-relaxed mb-5">
                    Создание пользовательских интерфейсов для веб-приложений и
                    сайтов. Высокий спрос на рынке.
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-500">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      от 120к ₽
                    </div>

                    <div className="flex items-center gap-2 text-blue-600">
                      <TrendingUp className="w-4 h-4" />
                      95% совпадение
                    </div>
                  </div>
                </div>

                {/* CARD */}
                <div className="group relative overflow-hidden rounded-[28px] bg-white border border-slate-200 p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-2xl transition duration-300">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full" />

                  <div className="relative flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Paintbrush className="w-7 h-7" />
                    </div>

                    <button className="text-red-500 hover:scale-110 transition">
                      <Heart className="fill-red-500 w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition">
                    UX/UI Дизайнер
                  </h3>

                  <p className="text-slate-500 leading-relaxed mb-5">
                    Проектирование логики и визуальной части цифровых продуктов.
                    Творчество и аналитика.
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-500">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      от 100к ₽
                    </div>

                    <div className="flex items-center gap-2 text-blue-600">
                      <TrendingUp className="w-4 h-4" />
                      88% совпадение
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FACULTIES */}
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">
                Сохранённые факультеты
              </h2>

              <div className="space-y-4">
                {/* ITEM */}
                <div className="bg-white border border-slate-200 rounded-[28px] p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row gap-5 items-center hover:shadow-xl transition">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-900">
                    МГУ
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      Факультет вычислительной математики и кибернетики
                    </h3>

                    <p className="text-slate-500 font-medium">
                      Программная инженерия • Бакалавриат
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition font-semibold">
                      Подробнее
                    </button>

                    <button className="w-11 h-11 rounded-2xl hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* ITEM */}
                <div className="bg-white border border-slate-200 rounded-[28px] p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row gap-5 items-center hover:shadow-xl transition">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-900">
                    ВШЭ
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      Факультет компьютерных наук
                    </h3>

                    <p className="text-slate-500 font-medium">
                      Прикладная математика и информатика • Бакалавриат
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition font-semibold">
                      Подробнее
                    </button>

                    <button className="w-11 h-11 rounded-2xl hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="relative overflow-hidden rounded-[32px] bg-slate-950 p-8 md:p-10 text-white">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

              <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-black mb-3">
                    Сохраните свой прогресс
                  </h2>

                  <p className="text-slate-300 leading-relaxed">
                    Войдите или зарегистрируйтесь, чтобы ваши результаты тестов
                    и сохраненные материалы были доступны на любом устройстве.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 transition font-semibold shadow-lg shadow-blue-500/30 whitespace-nowrap">
                    Войти в аккаунт
                  </button>

                  <button className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition font-semibold backdrop-blur-xl whitespace-nowrap">
                    Регистрация
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}