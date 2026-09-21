
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const { error: reqError } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });

    if (reqError) {
      setStatus("idle");
      setError(reqError.message || "Something went wrong.");
      return;
    }

    setStatus("sent");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#11110F] px-5 py-10 text-[#F3F0E8]">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(243,240,232,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(243,240,232,.8) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B8A36A]/[0.025] blur-[140px]" />

      {/* Top architectural line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B8A36A]/40 to-transparent" />

      <div className="relative z-10 w-full max-w-[430px]">
        {/* ───────────────── BRAND ───────────────── */}
        <Link
          href="/"
          className="group mb-10 flex flex-col items-center"
        >
          <div className="mb-5 flex h-10 w-10 items-center justify-center border border-[#B8A36A]/40 bg-[#181815] transition-colors group-hover:border-[#B8A36A]/70">
            <div className="h-3.5 w-3.5 rotate-45 border border-[#B8A36A] transition-transform duration-500 group-hover:rotate-[135deg]" />
          </div>

          <span className="text-[13px] font-semibold tracking-[0.25em] text-[#F3F0E8]">
            NORTHBRIDGE
          </span>

          <span className="mt-1.5 text-[8px] tracking-[0.5em] text-[#B8A36A]">
            CAPITAL
          </span>
        </Link>

        {/* ───────────────── CARD ───────────────── */}
        <Card className="rounded-none border-white/[0.08] bg-[#181815]/90 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <CardHeader className="border-b border-white/[0.07] px-7 pb-6 pt-7 sm:px-8 sm:pt-8">
            {/* Section label */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-7 bg-[#B8A36A]" />

              <span className="text-[8px] font-medium uppercase tracking-[0.28em] text-[#B8A36A]">
                Account Security
              </span>
            </div>

            <CardTitle className="text-2xl font-light tracking-[-0.025em] text-[#F3F0E8]">
              Reset your password
            </CardTitle>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[#F3F0E8]/35">
              Enter the email associated with your account and we&apos;ll send
              you a secure password reset link.
            </p>
          </CardHeader>

          <CardContent className="px-7 py-7 sm:px-8 sm:py-8">
            {status === "sent" ? (
              /* ───────────────── SENT STATE ───────────────── */
              <div>
                <div className="border border-[#B8A36A]/20 bg-[#B8A36A]/[0.04] px-5 py-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center border border-[#B8A36A]/30">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      className="text-[#B8A36A]"
                    >
                      <path d="M4 4h16v16H4z" />
                      <path d="m4 5 8 7 8-7" />
                    </svg>
                  </div>

                  <p className="text-sm leading-6 text-[#F3F0E8]/65">
                    If an account exists for that email, a reset link has been
                    sent. Please check your inbox and follow the instructions.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-5">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                    Didn&apos;t receive it?
                  </span>

                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#B8A36A] transition-colors hover:text-[#C8B67F]"
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : (
              /* ───────────────── FORM ───────────────── */
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/35"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="h-12 rounded-none border border-white/[0.1] bg-[#11110F] px-4 text-sm text-[#F3F0E8] outline-none transition-all placeholder:text-white/15 focus:border-[#B8A36A]/50 focus:bg-[#151513] focus:ring-1 focus:ring-[#B8A36A]/15"
                  />
                </div>

                {error && (
                  <div className="border border-red-400/20 bg-red-400/[0.04] px-4 py-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-red-400" />

                      <p className="text-xs leading-5 text-red-300/80">
                        {error}
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="group mt-1 h-12 rounded-none border-0 bg-[#B8A36A] text-[10px] font-semibold uppercase tracking-[0.16em] text-[#11110F] transition-all hover:bg-[#C8B67F] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "sending" ? (
                    <span className="flex items-center gap-3">
                      <span className="h-3.5 w-3.5 animate-spin border border-[#11110F]/30 border-t-[#11110F]" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      Send Reset Link

                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </span>
                  )}
                </Button>
              </form>
            )}

            {/* Security note */}
            <div className="mt-7 flex items-start gap-3 border-t border-white/[0.07] pt-5">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.35"
                className="mt-0.5 shrink-0 text-[#B8A36A]/70"
              >
                <path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>

              <p className="text-[10px] leading-5 text-white/25">
                Password reset links are delivered securely to your registered
                email address.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ───────────────── BACK TO LOGIN ───────────────── */}
        <div className="mt-7 text-center">
          <Link
            href="/login"
            className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/35 transition-colors hover:text-[#F3F0E8]"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform group-hover:-translate-x-1"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>

            Back to Log In
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-[8px] uppercase tracking-[0.2em] text-white/15">
          Northbridge Capital · Secure Client Portal
        </p>
      </div>
    </main>
  );
}
