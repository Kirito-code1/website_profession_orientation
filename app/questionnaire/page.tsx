"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { QuestionWithAnswers } from "@/lib/types/questionnaire";

export default function QuestionnairePage() {
  const [questions, setQuestions] = useState<QuestionWithAnswers[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Загрузка вопросов с API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/test");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (questionId: number, answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
      // Здесь будет логика отправки данных на бекенд
      console.log("Ответы:", answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Показываем загрузку
  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center mt-6 w-full px-4 py-12">
        <div className="w-full max-w-3xl mx-auto p-6 sm:p-10 lg:p-12 rounded-2xl border border-gray-200 flex flex-col gap-10 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB]" />
            <p className="text-[#64748B] text-base">Загрузка вопросов...</p>
          </div>
        </div>
      </main>
    );
  }

  // Если вопросов нет
  if (!loading && questions.length === 0) {
    return (
      <main className="flex-1 flex items-center justify-center mt-6 w-full px-4 py-12">
        <div className="w-full max-w-3xl mx-auto p-6 sm:p-10 lg:p-12 rounded-2xl border border-gray-200 flex flex-col gap-10 text-center">
          <div className="flex flex-col items-center gap-6">
            <p className="text-[#0F172A] text-xl font-bold">
              Нет доступных вопросов
            </p>
            <Link href="/">
              <button className="cursor-pointer w-full sm:w-[186px] h-[56px] rounded-[12px] bg-[#3B82F6] text-white text-base font-semibold">
                На Главную
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isCompleted) {
    return (
      <main className="flex-1 flex items-center justify-center mt-6 w-full px-4 py-12">
        <div className="w-full max-w-3xl mx-auto p-6 sm:p-10 lg:p-12 rounded-2xl border border-gray-200 flex flex-col gap-10 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center">
              <Image
                src="/img/circle_in_circle.svg"
                width={32}
                height={32}
                alt="success"
              />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
              Тест завершен!
            </h1>

            <p className="text-[#64748B] text-base sm:text-lg leading-relaxed max-w-xl">
              Спасибо за прохождение опросника. Ваши ответы были успешно
              сохранены. Результаты будут готовы после обработки.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/">
              <button className="cursor-pointer w-full sm:w-[186px] h-[56px] rounded-[12px] bg-[#3B82F6] text-white text-base font-semibold">
                На Главную
              </button>
            </Link>

            <Link href="/questionnaire">
              <button className="w-full cursor-pointer sm:w-[186px] h-[56px] rounded-[12px] border border-[#E2E8F0] text-[#475569] text-base font-medium">
                Пройти заново
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex items-center justify-center mt-6 w-full px-4 py-8">
      <div className="w-full max-w-3xl mx-auto p-6 sm:p-10 lg:p-12 rounded-2xl border border-gray-200 flex flex-col gap-8">
        {/* HEADER */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <p className="text-[#0F172A] text-xl sm:text-2xl font-bold">
                Тест на профориентацию
              </p>

              <p className="text-[#64748B] text-sm">
                Вопрос {currentQuestion + 1} из {questions.length}
              </p>
            </div>

            <div className="w-fit px-4 h-[40px] flex items-center justify-center rounded-[12px] bg-blue-100 gap-2">
              <Image
                src="/img/Symbol.svg"
                width={16}
                height={16}
                alt="clock img"
              />
              <p className="text-[#2563EB] text-sm sm:text-base">
                {Math.round((currentQuestion + 1) / questions.length * 100)}%
              </p>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2563EB] transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* QUESTION */}
        <div className="flex flex-col gap-6">
          <h2 className="text-[#0F172A] text-lg sm:text-xl font-semibold leading-relaxed">
            {question.text}
          </h2>

          <div className="flex flex-col gap-3">
            {question.answers.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(question.id, String(option.id))}
                className={`w-full p-4 sm:p-5 text-left rounded-xl border transition-all duration-200 ${
                  answers[question.id] === String(option.id)
                    ? "border-[#2563EB] bg-blue-50 text-[#1E40AF]"
                    : "border-gray-200 bg-white text-[#475569] hover:border-[#2563EB] hover:bg-blue-50"
                }`}
              >
                <p className="text-sm sm:text-base font-medium">
                  {option.text}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
          {currentQuestion > 0 && (
            <button
              onClick={handlePrevious}
              className="w-full sm:w-[140px] h-[56px] rounded-[12px] border border-[#E2E8F0] text-[#475569] text-base font-medium hover:bg-gray-50 transition-colors"
            >
              Назад
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!answers[question.id]}
            className={`flex-1 h-[56px] rounded-[12px] text-white text-base font-semibold transition-all duration-200 ${
              answers[question.id]
                ? "bg-[#3B82F6] hover:bg-[#2563EB]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {currentQuestion === questions.length - 1
              ? "Завершить"
              : "Далее"}
          </button>
        </div>
      </div>
    </main>
  );
}
