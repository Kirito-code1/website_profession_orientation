"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import {
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
  LogIn,
  UserPlus,
  Loader2,
  Briefcase,
  Building2,
  GraduationCap,
  AlertCircle,
} from "lucide-react";

interface TestResult {
  id: number;
  user_id: string;
  score: number;
  result_category: string | null;
  result_profession: string | null;
  created_at: string;
}

interface SavedFaculty {
  id: number;
  faculty_id: number;
  faculty: {
    faculty_id: number;
    faculty_name: string;
    university: string;
    town: string;
    faculty_desc: string | null;
  } | null;
}

interface SavedProfession {
  id: number;
  faculty_id: number;
  proffesion: {
    profession_id: number;
    profession_name: string;
    proffesion_description: string | null;
    category: string | null;
  } | null;
}

type TabType = "saved" | "results" | "settings";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("saved");
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [savedFaculties, setSavedFaculties] = useState<SavedFaculty[]>([]);
  const [savedProfessions, setSavedProfessions] = useState<SavedProfession[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // User data из auth.users
        const { data: userRow, error: userError } = await supabase
          .from("users")
          .select("name, email")
          .eq("id", user.id)
          .maybeSingle();

        if (userError) {
          console.error("[Profile] users error:", {
            code: userError.code,
            message: userError.message,
            details: (userError as any).details,
            hint: (userError as any).hint,
          });
        }

        if (userRow) {
          setUserData(userRow);
        } else {
          setUserData({
            name:
              user.user_metadata?.name ||
              user.user_metadata?.full_name ||
              "Пользователь",
            email: user.email || user.user_metadata?.email || "",
          });
        }

        // Test results
        const { data: results, error: resultsError } = await supabase
          .from("career_test_results")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (resultsError) {
          console.error("Error fetching results:", resultsError);
        }
        setTestResults(results || []);

        // Saved faculties - исправленный запрос
        const { data: faculties, error: facultiesError } = await supabase
          .from("saved_faculty")
          .select("id, faculty_id")
          .eq("user_id", user.id);

        if (facultiesError) {
          console.error("[Profile] saved_faculty error:", {
            code: facultiesError.code,
            message: facultiesError.message,
            details: (facultiesError as any).details,
            hint: (facultiesError as any).hint,
          });
        }

        // Получаем данные факультетов отдельно
        if (faculties && faculties.length > 0) {
          const facultyIds = faculties.map((f) => f.faculty_id);
          const { data: facultyData } = await supabase
            .from("faculty")
            .select("faculty_id, faculty_name, university, town, faculty_desc")
            .in("faculty_id", facultyIds);

          const facultiesWithDetails = faculties.map((f) => ({
            ...f,
            faculty:
              facultyData?.find((fd) => fd.faculty_id === f.faculty_id) || null,
          }));
          setSavedFaculties(facultiesWithDetails);
        } else {
          setSavedFaculties([]);
        }

        // Saved professions - исправленный запрос
        const { data: professions, error: professionsError } = await supabase
          .from("saved_proffession")
          .select("id, faculty_id")
          .eq("user_id", user.id);

        if (professionsError) {
          console.error("[Profile] saved_proffession error:", {
            code: professionsError.code,
            message: professionsError.message,
            details: (professionsError as any).details,
            hint: (professionsError as any).hint,
          });
        }

        // Получаем данные профессий отдельно
        if (professions && professions.length > 0) {
          const professionIds = professions.map((p) => p.faculty_id);
          const { data: professionData } = await supabase
            .from("proffesions")
            .select(
              "profession_id, profession_name, proffesion_description, category",
            )
            .in("profession_id", professionIds);

          const professionsWithDetails = professions.map((p) => ({
            ...p,
            proffesion:
              professionData?.find((pd) => pd.profession_id === p.faculty_id) ||
              null,
          }));
          setSavedProfessions(professionsWithDetails);
        } else {
          setSavedProfessions([]);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, authLoading]);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    setSigningOut(false);
    router.push("/");
  };

  const handleRemoveFaculty = async (id: number) => {
    await supabase.from("saved_faculty").delete().eq("id", id);
    setSavedFaculties((prev) => prev.filter((f) => f.id !== id));
  };

  const handleRemoveProfession = async (id: number) => {
    await supabase.from("saved_proffession").delete().eq("id", id);
    setSavedProfessions((prev) => prev.filter((p) => p.id !== id));
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          <p className="text-slate-500 font-medium">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-[28px] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            Доступ ограничен
          </h1>
          <p className="text-slate-500 mb-6">
            Войдите в аккаунт, чтобы просматривать свой профиль, результаты
            тестов и сохранённые материалы
          </p>
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
        </div>
      </div>
    );
  }

  const latestResult = testResults[0];
  const hasSavedItems =
    savedFaculties.length > 0 || savedProfessions.length > 0;

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 overflow-x-hidden">
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
                <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-200 shadow-inner mb-4 bg-blue-50 flex items-center justify-center">
                  <GraduationCap className="w-12 h-12 text-blue-500" />
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  {userData?.name || "Пользователь"}
                </h2>

                <p className="text-sm text-slate-500 font-medium mt-1">
                  {userData?.email || ""}
                </p>
              </div>

              <div className="mt-8 space-y-2">
                <button
                  onClick={() => setActiveTab("saved")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition ${
                    activeTab === "saved"
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                  Сохранённое
                </button>

                <button
                  onClick={() => setActiveTab("results")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition ${
                    activeTab === "results"
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <ChartPie className="w-5 h-5" />
                  Результаты тестов
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition ${
                    activeTab === "settings"
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Настройки
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50 transition font-semibold disabled:opacity-60"
                >
                  {signingOut ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                  Выйти из аккаунта
                </button>
              </div>
            </div>
          </aside>

          {/* CONTENT */}
          <section className="flex-1 flex flex-col gap-10">
            {activeTab === "saved" && (
              <>
                {/* LATEST RESULT */}
                <div>
                  <div className="mb-6">
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
                      Ваш профиль
                    </h1>
                    <p className="text-slate-500 font-medium">
                      Последние результаты и сохраненные материалы
                    </p>
                  </div>

                  {latestResult ? (
                    <div className="relative overflow-hidden rounded-[30px] bg-white border border-slate-200 p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] flex flex-col md:flex-row gap-8 items-center md:items-start">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full" />

                      <div className="relative w-36 h-36 shrink-0">
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
                            strokeDasharray={`${latestResult.score || 0}, 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl font-black text-slate-900">
                            {latestResult.score || 0}%
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        {latestResult.result_category && (
                          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-4">
                            {latestResult.result_category}
                          </div>
                        )}

                        <h2 className="text-3xl font-black text-slate-900 mb-3">
                          {latestResult.result_profession || "Результат теста"}
                        </h2>

                        <p className="text-slate-500 leading-relaxed max-w-2xl mb-7">
                          Вы завершили тест на профориентацию. Ваши ответы
                          проанализированы и сохранены.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                          <Link href="/test">
                            <button className="px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 transition text-white font-semibold shadow-lg shadow-blue-500/30">
                              Пройти тест заново
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-[30px] bg-white border border-slate-200 p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] text-center">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full" />
                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                          <ChartPie className="w-8 h-8 text-slate-400" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">
                          Вы ещё не проходили тест
                        </h2>
                        <p className="text-slate-500 mb-6">
                          Пройдите профориентационный тест, чтобы получить
                          персональные рекомендации
                        </p>
                        <Link href="/test">
                          <button className="px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 transition text-white font-semibold shadow-lg shadow-blue-500/30">
                            Пройти тест
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* SAVED PROFESSIONS */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-black text-slate-900">
                      Сохранённые профессии
                    </h2>
                  </div>

                  {savedProfessions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedProfessions.map((item) => {
                        const prof = item.proffesion;
                        if (!prof) return null;
                        const Icon = prof.category
                          ?.toLowerCase()
                          .includes("дизайн")
                          ? Paintbrush
                          : Code2;
                        return (
                          <div
                            key={item.id}
                            className="group relative overflow-hidden rounded-[28px] bg-white border border-slate-200 p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-2xl transition duration-300"
                          >
                            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full" />
                            <div className="relative flex items-start justify-between mb-5">
                              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Icon className="w-7 h-7" />
                              </div>
                              <button
                                onClick={() => handleRemoveProfession(item.id)}
                                className="text-red-500 hover:scale-110 transition"
                              >
                                <Heart className="fill-red-500 w-5 h-5" />
                              </button>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition">
                              {prof.profession_name}
                            </h3>
                            <p className="text-slate-500 leading-relaxed mb-5">
                              {prof.proffesion_description ||
                                "Описание профессии"}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-500">
                              <div className="flex items-center gap-2 text-blue-600">
                                <TrendingUp className="w-4 h-4" />
                                {prof.category || "Без категории"}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-[28px] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] text-center">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-7 h-7 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        Нет сохранённых профессий
                      </h3>
                      <p className="text-slate-500 mb-4">
                        Вы ещё не добавили ни одной профессии в избранное
                      </p>
                      <Link href="/faculties">
                        <button className="px-5 py-2.5 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition font-semibold">
                          Исследовать профессии
                        </button>
                      </Link>
                    </div>
                  )}
                </div>

                {/* FACULTIES */}
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-6">
                    Сохранённые факультеты
                  </h2>

                  {savedFaculties.length > 0 ? (
                    <div className="space-y-4">
                      {savedFaculties.map((item) => {
                        const fac = item.faculty;
                        if (!fac) return null;
                        return (
                          <div
                            key={item.id}
                            className="bg-white border border-slate-200 rounded-[28px] p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row gap-5 items-center hover:shadow-xl transition"
                          >
                            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-900 text-sm">
                              {fac.university?.slice(0, 3).toUpperCase() ||
                                "ВУЗ"}
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                              <h3 className="text-xl font-bold text-slate-900 mb-1">
                                {fac.faculty_name}
                              </h3>
                              <p className="text-slate-500 font-medium">
                                {fac.university} • {fac.town}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                              <button className="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition font-semibold">
                                Подробнее
                              </button>
                              <button
                                onClick={() => handleRemoveFaculty(item.id)}
                                className="w-11 h-11 rounded-2xl hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-[28px] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] text-center">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-7 h-7 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        Нет сохранённых факультетов
                      </h3>
                      <p className="text-slate-500 mb-4">
                        Вы ещё не добавили ни одного факультета в избранное
                      </p>
                      <Link href="/faculties">
                        <button className="px-5 py-2.5 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition font-semibold">
                          Исследовать факультеты
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === "results" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
                    Результаты тестов
                  </h1>
                  <p className="text-slate-500 font-medium">
                    История прохождения профориентационных тестов
                  </p>
                </div>

                {testResults.length > 0 ? (
                  <div className="space-y-4">
                    {testResults.map((result) => (
                      <div
                        key={result.id}
                        className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row gap-6 items-center"
                      >
                        <div className="relative w-24 h-24 shrink-0">
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
                              strokeDasharray={`${result.score || 0}, 100`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-black text-slate-900">
                              {result.score || 0}%
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <p className="text-sm text-slate-400 mb-1">
                            {new Date(result.created_at).toLocaleDateString(
                              "ru-RU",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                          <h3 className="text-xl font-bold text-slate-900">
                            {result.result_profession ||
                              "Профориентационный тест"}
                          </h3>
                          {result.result_category && (
                            <p className="text-blue-600 font-medium mt-1">
                              {result.result_category}
                            </p>
                          )}
                        </div>
                        <Link href="/test">
                          <button className="px-5 py-2.5 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition font-semibold whitespace-nowrap">
                            Пройти снова
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-[28px] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] text-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                      <ChartPie className="w-7 h-7 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Нет результатов тестов
                    </h3>
                    <p className="text-slate-500 mb-6">
                      Вы ещё не проходили профориентационный тест
                    </p>
                    <Link href="/test">
                      <button className="px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 transition text-white font-semibold shadow-lg shadow-blue-500/30">
                        Пройти тест
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
                    Настройки
                  </h1>
                  <p className="text-slate-500 font-medium">
                    Управление аккаунтом
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-[28px] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Имя
                    </label>
                    <input
                      type="text"
                      value={userData?.name || ""}
                      disabled
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userData?.email || ""}
                      disabled
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                  </div>
                  <div className="pt-6 border-t border-slate-100">
                    <button
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 transition text-white font-semibold shadow-lg shadow-red-500/30 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {signingOut ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                      Выйти из аккаунта
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
