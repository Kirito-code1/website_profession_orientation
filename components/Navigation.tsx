"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, User } from "lucide-react";

const navLinks = [
  {
    label: "Главная",
    href: "/",
  },
  {
    label: "Факультеты",
    href: "/faculties",
  },
  {
    label: "Поступление",
    href: "/admission",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/60 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/30">
            <GraduationCap className="h-5 w-5" />
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            ПрофПуть
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/40 p-2 shadow-lg shadow-black/5 backdrop-blur-xl md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                    : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/profile">
            <button className="hidden cursor-pointer items-center gap-2 rounded-xl border border-white/20 bg-white/40 px-4 py-2 font-medium text-slate-700 backdrop-blur-xl transition-all hover:bg-white/70 md:flex">
              <User className="h-4 w-4" />
              <span>Профиль</span>
            </button>
          </Link>

          <button className="rounded-xl border border-white/20 bg-white/40 p-2 text-slate-700 backdrop-blur-xl md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
