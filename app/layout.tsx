import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const  inter = Inter({ subsets: ["cyrillic", "latin"] });

export const metadata: Metadata = {
  title: "ПрофВыбор — Выбор профессии и поступление в вуз",
  description: "Пройди тест на профориентацию и найди свой путь",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="light">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${inter.className} bg-white text-slate-800 antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          {/* 🌍 NAVBAR — полупрозрачный белый с чёткой границей */}
          <Navigation />
          {/* 📦 КОНТЕНТ */}
          <main className="flex-1 pt-20 flex flex-col">{children}</main>
        </AuthProvider>
        {/* 🦶 ФУТЕР */}
        <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                  <i className="fa-solid fa-graduation-cap" />
                </div>
                <span className="font-bold text-lg text-slate-900">
                  ПрофВыбор
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <Link
                  href="/about"
                  className="hover:text-blue-600 transition-colors"
                >
                  О проекте
                </Link>
                <Link
                  href="/privacy"
                  className="hover:text-blue-600 transition-colors"
                >
                  Политика конфиденциальности
                </Link>
                <Link
                  href="/support"
                  className="hover:text-blue-600 transition-colors"
                >
                  Поддержка
                </Link>
              </div>
              <div className="text-sm text-slate-400">
                &copy; 2026 Все права защищены.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
