"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: loginError } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (loginError) {
      setError(loginError.message || "Invalid email or password.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#11110F] text-[#F3F0E8]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT — BRAND PANEL */}
        <section className="relative hidden overflow-hidden border-r border-white/[0.07] lg:flex">
          {/* Subtle architectural background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#171714]" />

            <div
              className="absolute inset-0 opacity-[0.045]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                backgroundSize: "70px 70px",
              }}
            />

            <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#B8A36A]/[0.06] blur-[130px]" />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            {/* Logo */}
            <Link href="/" className="group w-fit">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center border border-[#B8A36A]/40">
                  <div className="h-4 w-4 border border-[#B8A36A] rotate-45" />
                </div>

                <div>
                  <div className="text-[15px] font-semibold tracking-[0.25em] text-[#F3F0E8]">
                    NORTHBRIDGE
                  </div>

                  <div className="mt-1 text-[9px] tracking-[0.5em] text-[#B8A36A]">
                    CAPITAL
                  </div>
                </div>
              </div>
            </Link>

            {/* Main statement */}
            <div className="max-w-xl pb-12">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-10 bg-[#B8A36A]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B8A36A]">
                  Private Capital
                </span>
              </div>

              <h1 className="max-w-lg text-5xl font-light leading-[1.08] tracking-[-0.04em] text-[#F3F0E8] xl:text-6xl">
                Bridging
                <br />
                <span className="text-[#B8A36A]">Capital</span>
                <br />
                With Opportunity.
              </h1>

              <p className="mt-7 max-w-md text-sm leading-7 text-[#F3F0E8]/40">
                Disciplined investment. Strategic thinking. Long-term value.
              </p>
            </div>

            {/* Bottom information */}
            <div className="flex items-center justify-between border-t border-white/[0.07] pt-5 text-[9px] uppercase tracking-[0.2em] text-white/25">
              <span>Northbridge Capital</span>
              <span>Private &amp; Confidential</span>
            </div>
          </div>
        </section>

        {/* RIGHT — LOGIN */}
        <section className="relative flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
          {/* Mobile logo */}
          <div className="absolute left-6 top-7 lg:hidden">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center border border-[#B8A36A]/50">
                <div className="h-3 w-3 rotate-45 border border-[#B8A36A]" />
              </div>

              <div>
                <div className="text-xs font-semibold tracking-[0.2em]">
                  NORTHBRIDGE
                </div>
                <div className="text-[7px] tracking-[0.4em] text-[#B8A36A]">
                  CAPITAL
                </div>
              </div>
            </Link>
          </div>

          <div className="w-full max-w-[400px]">
            {/* Heading */}
            <div className="mb-9">
              <div className="mb-5 text-[10px] font-medium uppercase tracking-[0.25em] text-[#B8A36A]">
                Client Portal
              </div>

              <h2 className="text-3xl font-light tracking-[-0.035em] text-[#F3F0E8]">
                Welcome back.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#F3F0E8]/40">
                Sign in to continue to your Northbridge Capital account.
              </p>
            </div>

            {/* Login Card */}
            <Card className="rounded-none border border-white/[0.09] bg-[#181815] shadow-[0_25px_70px_rgba(0,0,0,0.28)]">
              <CardHeader className="border-b border-white/[0.07] px-7 py-6">
                <CardTitle className="text-xs font-medium uppercase tracking-[0.18em] text-[#F3F0E8]/55">
                  Account Access
                </CardTitle>
              </CardHeader>

              <CardContent className="px-7 py-7">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#F3F0E8]/40"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      placeholder="name@company.com"
                      className="h-12 w-full rounded-none border border-white/[0.1] bg-[#11110F] px-4 text-sm text-[#F3F0E8] outline-none transition-all placeholder:text-white/20 hover:border-white/[0.18] focus:border-[#B8A36A] focus:ring-1 focus:ring-[#B8A36A]/20"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#F3F0E8]/40"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-none border border-white/[0.1] bg-[#11110F] px-4 text-sm text-[#F3F0E8] outline-none transition-all placeholder:text-white/20 hover:border-white/[0.18] focus:border-[#B8A36A] focus:ring-1 focus:ring-[#B8A36A]/20"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="border border-red-500/20 bg-red-500/[0.06] px-4 py-3">
                      <p className="text-xs leading-5 text-red-300">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 w-full rounded-none border-0 bg-[#B8A36A] text-xs font-semibold uppercase tracking-[0.16em] text-[#11110F] transition-all hover:bg-[#C8B67F] hover:shadow-[0_8px_25px_rgba(184,163,106,0.12)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>

                  {/* Forgot */}
                  <div className="text-center">
                    <Link
                      href="/forgot-password"
                      className="text-xs text-[#F3F0E8]/35 transition-colors hover:text-[#B8A36A]"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Signup */}
            <div className="mt-7 border-t border-white/[0.07] pt-6 text-center">
              <p className="text-xs text-[#F3F0E8]/30">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-[#B8A36A] transition-colors hover:text-[#C8B67F]"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* Security */}
            <div className="mt-8 flex items-center justify-center gap-3 text-[8px] uppercase tracking-[0.2em] text-white/20">
              <span>Secure Access</span>
              <span className="h-1 w-1 bg-white/20" />
              <span>Private &amp; Confidential</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
