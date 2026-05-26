"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { GraduationCap, Eye, EyeOff, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов");
      setLoading(false);
      return;
    }

    const { error, user } = await signUp(email, password, name);

    if (error) {
      setError(
        error.message.includes("already")
          ? "Пользователь с таким email уже зарегистрирован"
          : error.message,
      );
      setLoading(false);
      return;
    }

    if (user) {
      // Если email подтверждение отключено - сразу в профиль
      setSuccess(true);
      setTimeout(() => router.push("/profile"), 1500);
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-12">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-100 blur-3xl rounded-full opacity-40" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-100 blur-3xl rounded-full opacity-40" />
        </div>
        <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 rounded-[28px] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            Регистрация успешна!
          </h1>
          <p className="text-slate-500">
            Подтвердите email и войдите в аккаунт. Перенаправляем...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-100 blur-3xl rounded-full opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-100 blur-3xl rounded-full opacity-40" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(59,130,246,0.08) 2px, transparent 2px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/30">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              ПрофПуть
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-[28px] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-slate-900 mb-2">
              Регистрация
            </h1>
            <p className="text-slate-500 font-medium">
              Создайте аккаунт, чтобы сохранять прогресс
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Имя
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Алексей"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Минимум 6 символов"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-blue-500 hover:bg-blue-600 transition text-white font-semibold shadow-lg shadow-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Регистрация...
                </>
              ) : (
                "Зарегистрироваться"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Уже есть аккаунт?{" "}
              <Link
                href="/login"
                className="text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
