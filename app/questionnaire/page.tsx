"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { QuestionWithAnswers } from "@/lib/types/questionnaire";
import { LogIn, UserPlus, Loader2, ArrowRight, School } from "lucide-react";

// Категории профессий
type ProfessionCategory =
  | "tech"
  | "creative"
  | "social"
  | "science"
  | "business";

interface ProfessionResult {
  category: ProfessionCategory;
  name: string;
  description: string;
  icon: string;
}

// Карта ответов к категориям
const ANSWER_CATEGORY_MAP: Record<number, ProfessionCategory> = {
  // Вопрос 1 - хобби
  1: "tech",
  2: "creative",
  3: "social",
  4: "science",
  5: "business",
  // Вопрос 2 - предмет
  6: "tech",
  7: "creative",
  8: "social",
  9: "science",
  10: "business",
  // Вопрос 3 - работа
  11: "tech",
  12: "creative",
  13: "business",
  14: "science",
  15: "social",
  // Вопрос 4 - важно в профессии
  16: "business",
  17: "creative",
  18: "business",
  19: "social",
  20: "business",
  // Вопрос 5 - решение задач
  21: "tech",
  22: "creative",
  23: "social",
  24: "science",
  25: "business",
  // Вопрос 6 - работа в команде
  26: "tech",
  27: "social",
  28: "tech",
  29: "tech",
  30: "tech",
  // Вопрос 7 - вдохновение
  31: "tech",
  32: "creative",
  33: "social",
  34: "science",
  35: "business",
  // Вопрос 8 - творчество
  36: "creative",
  37: "creative",
  38: "creative",
  39: "creative",
  40: "creative",
  // Вопрос 9 - технологии
  41: "tech",
  42: "tech",
  43: "tech",
  44: "tech",
  45: "tech",
  // Вопрос 10 - что подходит
  46: "tech",
  47: "creative",
  48: "social",
  49: "business",
  50: "social",
  // Вопрос 11 - выходные
  51: "tech",
  52: "science",
  53: "social",
  54: "science",
  55: "creative",
  // Вопрос 12 - стиль общения
  56: "business",
  57: "social",
  58: "business",
  59: "science",
  60: "creative",
  // Вопрос 13 - изучать
  61: "tech",
  62: "social",
  63: "business",
  64: "creative",
  65: "science",
  // Вопрос 14 - качества
  66: "tech",
  67: "creative",
  68: "business",
  69: "social",
  70: "science",
  // Вопрос 15 - через 5 лет
  71: "tech",
  72: "creative",
  73: "business",
  74: "science",
  75: "business",
};

const PROFESSION_RESULTS: Record<ProfessionCategory, ProfessionResult> = {
  tech: {
    category: "tech",
    name: "IT и Технологии",
    description:
      "Разработка программного обеспечения, веб-дизайн, аналитика данных",
    icon: "💻",
  },
  creative: {
    category: "creative",
    name: "Креатив и Дизайн",
    description: "Графический дизайн, искусство, медиа-производство",
    icon: "🎨",
  },
  social: {
    category: "social",
    name: "Социальная сфера",
    description: "Психология, педагогика, социальная работа",
    icon: "🤝",
  },
  science: {
    category: "science",
    name: "Наука и Исследования",
    description: "Научные исследования, аналитика, академическая деятельность",
    icon: "🔬",
  },
  business: {
    category: "business",
    name: "Бизнес и Управление",
    description: "Менеджмент, предпринимательство, маркетинг",
    icon: "💼",
  },
};

function determineCategory(
  answers: Record<number, string>,
): ProfessionCategory {
  const categoryCounts: Record<ProfessionCategory, number> = {
    tech: 0,
    creative: 0,
    social: 0,
    science: 0,
    business: 0,
  };

  Object.entries(answers).forEach(([questionIdStr, answerIdStr]) => {
    const questionId = parseInt(questionIdStr);
    const answerId = parseInt(answerIdStr);
    const answerKey = (questionId - 1) * 5 + answerId;

    const category = ANSWER_CATEGORY_MAP[answerKey];
    if (category) {
      categoryCounts[category]++;
    }
  });

  let maxCategory: ProfessionCategory = "tech";
  let maxCount = 0;

  (Object.keys(categoryCounts) as ProfessionCategory[]).forEach((category) => {
    if (categoryCounts[category] > maxCount) {
      maxCount = categoryCounts[category];
      maxCategory = category;
    }
  });

  return maxCategory;
}

export default function QuestionnairePage() {
  const { user, loading: authLoading } = useAuth();
  const [questions, setQuestions] = useState<QuestionWithAnswers[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resultCategory, setResultCategory] =
    useState<ProfessionCategory | null>(null);

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

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSaving(true);
      if (user) {
        try {
          const score = Math.round(
            (Object.keys(answers).length / questions.length) * 100,
          );
// echo "# website_zero1" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin git@github.com:zero1-st/website_zero1.git
// git push -u origin main
          // Определяем категорию профессии
          const category = determineCategory(answers);
          setResultCategory(category);

          const professionResult = PROFESSION_RESULTS[category];

          const response = await fetch("/api/test/results", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user.id,
              answers,
              score,
              result_category: category,
              result_profession: professionResult?.name ?? null,
            }),
          });

          const result = await response.json();

          if (!response.ok) {
            console.error("Error saving test result:", result);
          } else {
            console.log("Test result saved:", result);
          }
        } catch (err) {
          console.error("Error saving test result:", err);
        }
      }
      setSaving(false);
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Показываем загрузку
  if (authLoading || loading) {
    return (
      <main className="flex-1 flex items-center justify-center mt-6 w-full px-4 py-12">
        <div className="w-full max-w-3xl mx-auto p-6 sm:p-10 lg:p-12 rounded-2xl border border-gray-200 flex flex-col gap-10 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB]" />
            <p className="text-[#64748B] text-base">Загрузка...</p>
          </div>
        </div>
      </main>
    );
  }

  // Если пользователь не авторизован
  if (!user) {
    return (
      <main className="flex-1 flex items-center justify-center mt-6 w-full px-4 py-12">
        <div className="w-full max-w-md mx-auto p-8 sm:p-10 rounded-[28px] border border-slate-200 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] flex flex-col gap-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <LogIn className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">
              Требуется авторизация
            </h1>
            <p className="text-slate-500 leading-relaxed">
              Чтобы пройти тест и сохранить результаты, пожалуйста, войдите в
              аккаунт или зарегистрируйтесь
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/login">
              <button className="w-full py-3.5 rounded-2xl bg-blue-500 hover:bg-blue-600 transition text-white font-semibold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5" />
                Войти
              </button>
            </Link>
            <Link href="/register">
              <button className="w-full py-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-center gap-2 transition">
                <UserPlus className="w-5 h-5" />
                Зарегистрироваться
              </button>
            </Link>
          </div>

          <Link href="/">
            <button className="text-slate-500 hover:text-slate-700 font-medium transition">
              На Главную
            </button>
          </Link>
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
    const score = Math.round(
      (Object.keys(answers).length / questions.length) * 100,
    );
    const result = resultCategory ? PROFESSION_RESULTS[resultCategory] : null;

    return (
      <main className="flex-1 flex items-center justify-center mt-6 w-full px-4 py-12">
        <div className="w-full max-w-3xl mx-auto p-6 sm:p-10 lg:p-12 rounded-2xl border border-gray-200 flex flex-col gap-8 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center text-4xl">
              {result?.icon || "✅"}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
              Тест завершен!
            </h1>

            <div className="w-36 h-36 relative">
              <svg
                className="w-full h-full rotate-[-90deg]"
                viewBox="0 0 36 36"
              >
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${score}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-black text-slate-900">
                  {score}%
                </span>
              </div>
            </div>

            {result && (
              <div className="w-full flex flex-col items-center gap-4">
                <div className="bg-blue-50 rounded-2xl p-6 w-full">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-2">
                    Вам подходит: {result.name}
                  </h2>
                  <p className="text-[#64748B] text-base leading-relaxed">
                    {result.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[#64748B] text-sm">
                  <School className="w-4 h-4" />
                  <span>Узнайте больше о направлениях в вузах</span>
                </div>
              </div>
            )}

            <p className="text-[#64748B] text-base sm:text-lg leading-relaxed max-w-xl">
              Ваши ответы были успешно сохранены и доступны в профиле.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/profile">
              <button className="cursor-pointer w-full sm:w-[186px] h-[56px] rounded-[12px] bg-[#3B82F6] text-white text-base font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2">
                В профиль
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link href="/">
              <button className="w-full cursor-pointer sm:w-[186px] h-[56px] rounded-[12px] border border-[#E2E8F0] text-[#475569] text-base font-medium hover:bg-slate-50 transition">
                На Главную
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
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
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
            {question.question_text}
          </h2>

          <div className="flex flex-col gap-3">
            {question.answers.map((option) => (
              <button
                key={option.answer_id}
                onClick={() =>
                  handleAnswer(question.question_id, String(option.answer_id))
                }
                className={`w-full p-4 sm:p-5 text-left rounded-xl border transition-all duration-200 ${
                  answers[question.question_id] === String(option.answer_id)
                    ? "border-[#2563EB] bg-blue-50 text-[#1E40AF]"
                    : "border-gray-200 bg-white text-[#475569] hover:border-[#2563EB] hover:bg-blue-50"
                }`}
              >
                <p className="text-sm sm:text-base font-medium">
                  {option.answer_text}
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
            disabled={!answers[question.question_id] || saving}
            className={`flex-1 h-[56px] rounded-[12px] text-white text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              answers[question.question_id] && !saving
                ? "bg-[#3B82F6] hover:bg-[#2563EB]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Сохранение...
              </>
            ) : currentQuestion === questions.length - 1 ? (
              "Завершить"
            ) : (
              "Далее"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
