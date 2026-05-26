"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { LogIn, UserPlus, X } from "lucide-react";

const Test = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleStartTest = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center mt-6 w-full px-4 relative">
      <div className="flex flex-col gap-10 w-full max-w-5xl">
        {/* HEADER */}
        <div className="flex flex-col items-center gap-6 sm:gap-10 text-center">
          <div className="w-full max-w-[387px] px-3 flex items-center gap-4 h-[38px] rounded-full border border-gray-200 bg-white shadow-sm">
            <div className="w-[8px] h-[8px] rounded-full bg-blue-500" />
            <p className="text-[14px] font-medium text-slate-600">
              Ваш путь к успешной карьере начинается здесь
            </p>
          </div>

          <p className="text-3xl sm:text-5xl lg:text-7xl text-[#0F172A] font-bold tracking-tight leading-tight">
            Определите свои <br />
            <span className="text-[#2563EB]">сильные стороны</span>
          </p>

          <p className="text-center text-[#64748B] text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
            Этот тест поможет выявить ваши склонности, интересы и навыки, чтобы
            подобрать наиболее подходящие профессиональные направления.
          </p>
        </div>

        {/* CARD */}
        <div className="w-full max-w-3xl mx-auto p-6 sm:p-10 lg:p-12 rounded-2xl border border-gray-200 flex flex-col gap-10">
          {/* TOP */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <p className="text-[#0F172A] text-xl sm:text-2xl font-bold">
                Тест на профориентацию
              </p>
              <p className="text-[#64748B] text-sm">
                15 вопросов для точного анализа
              </p>
            </div>

            <div className="w-fit px-4 h-[40px] flex items-center justify-center rounded-[12px] bg-blue-100 gap-2">
              <Image
                src="/img/Symbol.svg"
                width={16}
                height={16}
                alt="clock img"
              />
              <p className="text-[#2563EB] text-sm sm:text-base">10–15 минут</p>
            </div>
          </div>

          {/* MIDDLE */}
          <div className="flex flex-col gap-8">
            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 rounded-2xl w-12 h-12 flex items-center justify-center shrink-0">
                <Image
                  src="/img/circle_in_circle.svg"
                  width={18}
                  height={18}
                  alt="circle"
                />
              </div>
              <div>
                <p className="text-[#0F172A] text-base font-bold">
                  Точность результатов
                </p>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Отвечайте честно, долго не раздумывая. Первое пришедшее в
                  голову решение часто самое верное.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 rounded-2xl w-12 h-12 flex items-center justify-center shrink-0">
                <Image
                  src="/img/Container.svg"
                  width={18}
                  height={18}
                  alt="privacy"
                />
              </div>
              <div>
                <p className="text-[#0F172A] text-base font-bold">
                  Конфиденциальность
                </p>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Ваши ответы полностью анонимны и используются только для
                  формирования персональных рекомендаций.
                </p>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/questionnaire" onClick={handleStartTest}>
              <button className="cursor-pointer w-full sm:w-[186px] h-[56px] rounded-[12px] bg-[#3B82F6] text-white text-base font-semibold hover:bg-blue-600 transition">
                Пройти тест
              </button>
            </Link>

            <Link href="/">
              <button className="w-full cursor-pointer sm:w-[186px] h-[56px] rounded-[12px] border border-[#E2E8F0] text-[#475569] text-base font-medium hover:bg-slate-50 transition">
                На Главную
              </button>
            </Link>
          </div>
        </div>

        {/* FOOTER NOTE */}
        <div className="flex justify-center mb-7">
          <div className="w-full max-w-[520px] px-3 flex items-center gap-4 h-auto py-2 rounded-full border border-gray-200 bg-white shadow-sm">
            <div className="w-[8px] h-[8px] rounded-full bg-blue-500" />
            <p className="text-sm font-medium text-slate-600 text-center">
              Ваши данные надежно защищены и не передаются третьим лицам
            </p>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 rounded-[28px] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                Войдите в аккаунт
              </h2>
              <p className="text-slate-500">
                Чтобы пройти тест и сохранить результаты, необходимо войти или
                зарегистрироваться
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={() => setShowModal(false)}>
                <button className="w-full py-3.5 rounded-2xl bg-blue-500 hover:bg-blue-600 transition text-white font-semibold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Войти
                </button>
              </Link>
              <Link href="/register" onClick={() => setShowModal(false)}>
                <button className="w-full py-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-center gap-2 transition">
                  <UserPlus className="w-5 h-5" />
                  Зарегистрироваться
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Test;
