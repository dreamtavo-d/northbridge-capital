
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function Navbar({
  userName,
  role,
  unreadCount = 0,
}: {
  userName: string;
  role?: string;
  unreadCount?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/investments", label: "Investments" },
    { href: "/deposit", label: "Deposit" },
    { href: "/withdraw", label: "Withdraw" },
    { href: "/transactions", label: "Transactions" },
    ...(role === "ADMIN" ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return (
    <nav className="relative z-50 border-b border-white/[0.07] bg-[#11110F]/95 text-[#F3F0E8] backdrop-blur-xl">
      {/* Top architectural line */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B8A36A]/30 to-transparent" />

      <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* ───────────────── BRAND ───────────────── */}
        <Link
          href="/dashboard"
          className="group flex shrink-0 items-center gap-3.5"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center border border-[#B8A36A]/35 bg-[#181815] transition-colors duration-300 group-hover:border-[#B8A36A]/70">
            <div className="h-3.5 w-3.5 rotate-45 border border-[#B8A36A] transition-transform duration-500 group-hover:rotate-[135deg]" />
          </div>

          <div className="leading-none">
            <div className="text-[12px] font-semibold tracking-[0.22em] text-[#F3F0E8] sm:text-[13px]">
              NORTHBRIDGE
            </div>

            <div className="mt-1.5 text-[7px] tracking-[0.5em] text-[#B8A36A]/70 sm:text-[8px]">
              CAPITAL
            </div>
          </div>
        </Link>

        {/* ───────────────── DESKTOP NAV ───────────────── */}
        <div className="hidden items-center gap-1 xl:flex">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative px-3.5 py-2.5 text-[10px] font-medium uppercase tracking-[0.11em] transition-colors duration-200 ${
                  active
                    ? "text-[#F3F0E8]"
                    : "text-[#F3F0E8]/35 hover:text-[#F3F0E8]/80"
                }`}
              >
                {link.label}

                {/* Active indicator */}
                <span
                  className={`absolute bottom-0 left-3 right-3 h-px bg-[#B8A36A] transition-all duration-300 ${
                    active
                      ? "opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-40"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* ───────────────── DESKTOP ACCOUNT ───────────────── */}
        <div className="hidden items-center gap-5 sm:flex">
          {/* Notifications */}
          <Link
            href="/notifications"
            aria-label="Notifications"
            className="group relative flex h-9 w-9 items-center justify-center border border-white/[0.08] bg-white/[0.015] transition-colors hover:border-[#B8A36A]/30 hover:bg-[#B8A36A]/[0.04]"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.35"
              className="text-white/40 transition-colors group-hover:text-[#B8A36A]"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M10 21h4" />
            </svg>

            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping bg-[#B8A36A] opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 bg-[#B8A36A]" />
              </span>
            )}
          </Link>

          <div className="h-7 w-px bg-white/[0.08]" />

          {/* Account */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end leading-none">
              <span className="mb-1.5 text-[7px] font-medium uppercase tracking-[0.25em] text-white/25">
                Account
              </span>

              <span className="max-w-[150px] truncate text-[11px] font-medium text-white/65">
                {userName}
              </span>
            </div>

            <div className="flex h-8 w-8 items-center justify-center border border-[#B8A36A]/25 bg-[#181815]">
              <span className="text-[10px] font-medium uppercase text-[#B8A36A]">
                {userName?.charAt(0) || "U"}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="h-9 rounded-none border-white/[0.1] bg-transparent px-4 text-[9px] font-medium uppercase tracking-[0.12em] text-white/45 transition-all duration-200 hover:border-[#B8A36A]/35 hover:bg-[#B8A36A]/[0.04] hover:text-[#F3F0E8]"
          >
            Log Out
          </Button>
        </div>

        {/* ───────────────── MOBILE MENU BUTTON ───────────────── */}
        <button
          className="flex h-9 w-9 items-center justify-center border border-white/[0.1] bg-white/[0.02] text-white/50 transition-colors hover:border-[#B8A36A]/30 hover:text-[#B8A36A] sm:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* ───────────────── MOBILE MENU ───────────────── */}
      {menuOpen && (
        <div className="border-t border-white/[0.07] bg-[#151513] px-5 pb-6 sm:hidden">
          {/* Mobile account header */}
          <div className="flex items-center justify-between border-b border-white/[0.07] py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border border-[#B8A36A]/25 bg-[#181815]">
                <span className="text-[10px] uppercase text-[#B8A36A]">
                  {userName?.charAt(0) || "U"}
                </span>
              </div>

              <div className="min-w-0">
                <div className="mb-1 text-[7px] uppercase tracking-[0.25em] text-white/25">
                  Account
                </div>

                <div className="max-w-[180px] truncate text-xs text-white/65">
                  {userName}
                </div>
              </div>
            </div>

            <Link
              href="/notifications"
              onClick={() => setMenuOpen(false)}
              className="relative flex h-9 w-9 items-center justify-center border border-white/[0.08]"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.35"
                className="text-white/45"
              >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
              </svg>

              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 bg-[#B8A36A]" />
              )}
            </Link>
          </div>

          {/* Mobile links */}
          <div className="py-3">
            {links.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`group flex items-center justify-between border-b border-white/[0.05] px-2 py-4 text-[10px] font-medium uppercase tracking-[0.13em] transition-colors ${
                    active
                      ? "text-[#F3F0E8]"
                      : "text-white/40 hover:text-white/75"
                  }`}
                >
                  <span>{link.label}</span>

                  <span
                    className={`h-1.5 w-1.5 transition-all ${
                      active
                        ? "bg-[#B8A36A]"
                        : "bg-white/10 group-hover:bg-white/30"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobile logout */}
          <div className="border-t border-white/[0.07] pt-5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="h-10 w-full rounded-none border-white/[0.1] bg-transparent text-[9px] font-medium uppercase tracking-[0.14em] text-white/45 hover:border-red-400/20 hover:bg-red-400/[0.03] hover:text-red-300"
            >
              Log Out
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
