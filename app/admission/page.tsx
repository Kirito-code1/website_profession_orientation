// app/admission/page.tsx

export default function AdmissionPage() {
  return (
    <main className="flex-grow pt-20 flex flex-col min-h-[calc(100vh-80px)] w-full relative overflow-hidden bg-[#fafafa]">
      {/* HERO */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply blur-3xl opacity-50" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-100 rounded-full mix-blend-multiply blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 mb-8">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>

            <span className="text-sm font-medium text-slate-600">
              Приемная кампания 2026
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl leading-tight">
            Ваш путь к{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
              поступлению
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl leading-relaxed">
            Все, что нужно знать абитуриенту: от сбора документов до
            зачисления на факультет вашей мечты.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-blue-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-colors">
              Начать подготовку
            </button>

            <button className="px-8 py-4 bg-white text-slate-700 rounded-xl font-bold text-lg shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
              Скачать памятку
            </button>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="w-full bg-white py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
            {/* LEFT */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 tracking-tight">
                Дорожная карта абитуриента
              </h2>

              <div className="space-y-8">
                {[
                  {
                    id: 1,
                    title: "Выбор направления",
                    desc: "Вы прошли тест и определились с факультетом.",
                    date: "До 1 мая",
                    active: true,
                    done: true,
                  },
                  {
                    id: 2,
                    title: "Сдача ЕГЭ",
                    desc: "Подготовка и сдача профильных экзаменов.",
                    date: "26 мая - 1 июля",
                    active: true,
                  },
                  {
                    id: 3,
                    title: "Подача документов",
                    desc: "Сбор документов и подача заявления.",
                    date: "20 июня - 25 июля",
                  },
                  {
                    id: 4,
                    title: "Зачисление",
                    desc: "Публикация конкурсных списков.",
                    date: "3 - 9 августа",
                  },
                ].map((step, index) => (
                  <div key={step.id} className="relative flex gap-6">
                    {index !== 3 && (
                      <div className="absolute top-12 bottom-[-32px] left-6 w-px bg-slate-200 z-0" />
                    )}

                    <div
                      className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                        step.active
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                          : "bg-slate-50 border border-slate-200 text-slate-400"
                      }`}
                    >
                      {step.id}
                    </div>

                    <div
                      className={`p-6 rounded-[24px] flex-1 border ${
                        step.active
                          ? "bg-white shadow-xl border-slate-100"
                          : "bg-white border-slate-100 opacity-60"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3
                          className={`text-xl font-bold ${
                            step.active
                              ? "text-slate-900"
                              : "text-slate-500"
                          }`}
                        >
                          {step.title}
                        </h3>

                        {step.done && (
                          <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full border border-green-100">
                            Завершено
                          </span>
                        )}
                      </div>

                      <p
                        className={`text-sm mb-4 leading-relaxed ${
                          step.active
                            ? "text-slate-500"
                            : "text-slate-400"
                        }`}
                      >
                        {step.desc}
                      </p>

                      <div
                        className={`text-xs font-medium uppercase tracking-wide ${
                          step.active
                            ? "text-blue-600"
                            : "text-slate-400"
                        }`}
                      >
                        {step.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-full md:w-80 lg:w-96 flex flex-col gap-6">
              {/* DATES */}
              <div className="bg-white p-8 rounded-[24px] shadow-xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Важные даты
                </h3>

                <ul className="space-y-4">
                  {[
                    ["Начало приема документов", "20 июня"],
                    ["Окончание приема", "25 июля"],
                    ["Приоритетное зачисление", "28-30 июля"],
                    ["Основное зачисление", "3-9 авг"],
                  ].map(([title, date]) => (
                    <li
                      key={title}
                      className="flex justify-between items-center border-b border-slate-50 pb-4"
                    >
                      <span className="text-slate-500 text-sm">
                        {title}
                      </span>

                      <span className="font-bold text-slate-900 bg-slate-50 px-3 py-1 rounded-lg">
                        {date}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CALCULATOR */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-[24px] text-white shadow-lg shadow-blue-500/20 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -z-0" />

                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm relative z-10 text-3xl">
                  🧮
                </div>

                <h3 className="text-xl font-bold mb-3 relative z-10">
                  Калькулятор баллов
                </h3>

                <p className="text-sm text-blue-100 mb-8 leading-relaxed relative z-10">
                  Оцените свои шансы на поступление.
                </p>

                <button className="w-full py-3.5 bg-white text-blue-600 rounded-xl font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all relative z-10">
                  Рассчитать шансы
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="w-full py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Пакет документов
            </h2>

            <p className="text-lg text-slate-500 leading-relaxed">
              Подготовьте эти документы заранее, чтобы процесс подачи
              заявления прошел максимально быстро.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Паспорт",
                desc: "Оригинал и копия паспорта.",
                status: "Обязательно",
              },
              {
                title: "Аттестат",
                desc: "Документ об образовании.",
                status: "Обязательно",
              },
              {
                title: "Фотографии",
                desc: "4-6 фотографий 3x4.",
                status: "Обязательно",
              },
              {
                title: "Справка 086/у",
                desc: "Медицинская справка.",
                status: "По ситуации",
              },
              {
                title: "Индивидуальные достижения",
                desc: "Олимпиады и сертификаты.",
                status: "Желательно",
              },
            ].map((doc) => (
              <div
                key={doc.title}
                className="bg-white p-8 rounded-[24px] shadow-xl border border-slate-100 flex flex-col h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl">
                    📄
                  </div>

                  <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full border border-red-100">
                    {doc.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {doc.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {doc.desc}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-50">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-6 h-6 rounded border border-slate-200 bg-slate-50" />

                    <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
                      Отметить как собранное
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="w-full py-24 relative overflow-hidden bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-slate-900 rounded-[32px] p-8 md:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

            <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

            {/* LEFT */}
            <div className="flex-1 text-center lg:text-left relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Остались вопросы по поступлению?
              </h2>

              <p className="text-lg text-slate-400 mb-10 max-w-2xl leading-relaxed">
                Наши специалисты готовы помочь вам разобраться со
                всеми нюансами поступления.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button className="px-6 py-3.5 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors border border-slate-700">
                  Telegram
                </button>

                <button className="px-6 py-3.5 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors border border-slate-700">
                  WhatsApp
                </button>
              </div>
            </div>

            {/* FORM */}
            <div className="w-full max-w-md relative z-10">
              <div className="bg-white p-8 rounded-[24px] shadow-2xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Заказать звонок
                </h3>

                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Ваше имя
                    </label>

                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-slate-50 text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Номер телефона
                    </label>

                    <input
                      type="tel"
                      placeholder="+7 (999) 000-00-00"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-slate-50 text-slate-900 outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full py-4 bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 mt-2 hover:bg-blue-600 transition-colors"
                  >
                    Перезвоните мне
                  </button>

                  <p className="text-xs text-slate-500 text-center mt-4 leading-relaxed">
                    Нажимая кнопку, вы соглашаетесь с политикой
                    обработки персональных данных.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}