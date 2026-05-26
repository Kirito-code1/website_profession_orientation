"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  GraduationCap,
  Menu,
  User,
  LogIn,
  LogOut,
  Loader2,
} from "lucide-react";

const navLinks = [
  { label: "Главная", href: "/" },
  { label: "Факультеты", href: "/faculties" },
  { label: "Поступление", href: "/admission" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    setSigningOut(false);
  };

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
          {!loading && (
            <>
              {user ? (
                <div className="hidden md:flex items-center gap-3">
                  <Link href="/profile">
                    <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/40 px-4 py-2 font-medium text-slate-700 backdrop-blur-xl transition-all hover:bg-white/70">
                      <User className="h-4 w-4" />
                      <span>Профиль</span>
                    </button>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/40 px-3 py-2 font-medium text-slate-500 backdrop-blur-xl transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    title="Выйти"
                  >
                    {signingOut ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <LogOut className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ) : (
                <Link href="/login" className="hidden md:block">
                  <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/40 px-4 py-2 font-medium text-slate-700 backdrop-blur-xl transition-all hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/30">
                    <LogIn className="h-4 w-4" />
                    <span>Войти</span>
                  </button>
                </Link>
              )}
            </>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl border border-white/20 bg-white/40 p-2 text-slate-700 backdrop-blur-xl md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-white/90 backdrop-blur-2xl px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-slate-600 hover:bg-white/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {!loading && (
            <>
              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-white/60"
                  >
                    <User className="h-4 w-4" />
                    Профиль
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Выйти
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50"
                >
                  <LogIn className="h-4 w-4" />
                  Войти
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
}
