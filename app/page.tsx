
"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  TrendingUp,
  Layers3,
  Globe2,
} from "lucide-react";

const strategies = [
  {
    number: "01",
    title: "Private Equity",
    description:
      "Long-term capital focused on businesses with strong fundamentals, scalable operations, and meaningful growth opportunities.",
    icon: TrendingUp,
  },
  {
    number: "02",
    title: "Alternative Investments",
    description:
      "Structured opportunities across alternative asset classes designed to broaden access to sophisticated investment strategies.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Strategic Capital",
    description:
      "Flexible capital solutions connecting businesses, investors, and opportunities where disciplined capital can create value.",
    icon: Globe2,
  },
];

const principles = [
  "Long-term thinking",
  "Disciplined capital allocation",
  "Transparency",
  "Risk awareness",
  "Strategic relationships",
  "Measured execution",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#11110F] text-[#F3F0E8]">
      {/* ───────────────── NAVBAR ───────────────── */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.07] bg-[#11110F]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center border border-[#B8A36A]/45 transition-colors group-hover:border-[#B8A36A]">
              <div className="h-3.5 w-3.5 rotate-45 border border-[#B8A36A]" />
            </div>

            <div className="leading-none">
              <div className="text-[13px] font-semibold tracking-[0.25em] text-[#F3F0E8]">
                NORTHBRIDGE
              </div>

              <div className="mt-1.5 text-[8px] font-medium tracking-[0.5em] text-[#B8A36A]">
                CAPITAL
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden items-center gap-9 md:flex">
            <a
              href="#about"
              className="text-[11px] uppercase tracking-[0.14em] text-white/40 transition hover:text-[#F3F0E8]"
            >
              About
            </a>

            <a
              href="#philosophy"
              className="text-[11px] uppercase tracking-[0.14em] text-white/40 transition hover:text-[#F3F0E8]"
            >
              Philosophy
            </a>

            <a
              href="#strategies"
              className="text-[11px] uppercase tracking-[0.14em] text-white/40 transition hover:text-[#F3F0E8]"
            >
              Strategies
            </a>

            <a
              href="#contact"
              className="text-[11px] uppercase tracking-[0.14em] text-white/40 transition hover:text-[#F3F0E8]"
            >
              Contact
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden border border-white/[0.1] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/60 transition hover:border-white/20 hover:text-[#F3F0E8] sm:block"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="bg-[#B8A36A] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#11110F] transition hover:bg-[#C8B67F]"
            >
              Create Account
            </Link>
          </div>
        </div>
      </nav>

      {/* ───────────────── HERO ───────────────── */}
      <section className="relative flex min-h-screen items-center border-b border-white/[0.07] pt-[76px]">
        {/* Architectural grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(243,240,232,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(243,240,232,.8) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Atmospheric light */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-[#B8A36A]/[0.035] blur-[150px]" />

        {/* Bridge structure */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 w-[1200px] max-w-[130%] -translate-x-1/2 opacity-[0.07]">
          <svg
            viewBox="0 0 1200 430"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M40 330H1160"
              stroke="#B8A36A"
              strokeWidth="2"
            />

            <path
              d="M130 330C220 100 350 70 600 70C850 70 980 100 1070 330"
              stroke="#B8A36A"
              strokeWidth="4"
            />

            <path
              d="M210 330C285 150 390 125 600 125C810 125 915 150 990 330"
              stroke="#F3F0E8"
              strokeWidth="2"
            />

            <path
              d="M170 330V165M1030 330V165"
              stroke="#B8A36A"
              strokeWidth="4"
            />

            <path
              d="M300 330V140M390 330V105M480 330V82M600 330V70M720 330V82M810 330V105M900 330V140"
              stroke="#F3F0E8"
              strokeWidth="1"
            />

            <path
              d="M0 360H1200"
              stroke="#B8A36A"
              strokeWidth="1"
            />

            <path
              d="M0 390H1200"
              stroke="#F3F0E8"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-5xl">
            {/* Eyebrow */}
            <div className="mb-9 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#B8A36A]/70" />

              <span className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#B8A36A]">
                Private Capital · Strategic Investments
              </span>

              <span className="h-px w-10 bg-[#B8A36A]/70" />
            </div>

            {/* Hero title */}
            <h1 className="text-center text-5xl font-light leading-[0.98] tracking-[-0.05em] text-[#F3F0E8] sm:text-7xl lg:text-[92px]">
              Bridging Capital
              <br />
              <span className="text-[#B8A36A]">
                With Opportunity.
              </span>
            </h1>

            <p className="mx-auto mt-9 max-w-2xl text-center text-sm leading-7 text-[#F3F0E8]/35 sm:text-base">
              Northbridge Capital connects disciplined capital with strategic
              opportunities across private equity, alternative investments,
              and growth-focused ventures.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="group flex h-12 items-center justify-center gap-3 bg-[#B8A36A] px-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#11110F] transition hover:bg-[#C8B67F]"
              >
                Explore Opportunities

                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#about"
                className="flex h-12 items-center justify-center gap-3 border border-white/[0.1] px-7 text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 transition hover:border-white/20 hover:text-[#F3F0E8]"
              >
                Discover Northbridge
                <ChevronDown size={14} />
              </a>
            </div>
          </div>

          {/* Metrics */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 border border-white/[0.08] bg-[#181815]/80 sm:grid-cols-3">
            <div className="border-b border-white/[0.08] p-7 text-center sm:border-b-0 sm:border-r">
              <div className="text-xl font-light text-[#F3F0E8]">
                Strategic
              </div>

              <div className="mt-2 text-[8px] uppercase tracking-[0.25em] text-white/25">
                Capital Approach
              </div>
            </div>

            <div className="border-b border-white/[0.08] p-7 text-center sm:border-b-0 sm:border-r">
              <div className="text-xl font-light text-[#B8A36A]">
                Long-Term
              </div>

              <div className="mt-2 text-[8px] uppercase tracking-[0.25em] text-white/25">
                Investment Horizon
              </div>
            </div>

            <div className="p-7 text-center">
              <div className="text-xl font-light text-[#F3F0E8]">
                Disciplined
              </div>

              <div className="mt-2 text-[8px] uppercase tracking-[0.25em] text-white/25">
                Capital Allocation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── ABOUT ───────────────── */}
      <section
        id="about"
        className="border-b border-white/[0.07] bg-[#151513] py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#B8A36A]" />

                <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#B8A36A]">
                  01 / About
                </span>
              </div>

              <h2 className="max-w-xl text-4xl font-light tracking-[-0.04em] text-[#F3F0E8] sm:text-5xl">
                Capital built around
                <span className="text-[#B8A36A]"> perspective.</span>
              </h2>
            </div>

            <div className="max-w-2xl">
              <p className="text-lg leading-8 text-[#F3F0E8]/65">
                Northbridge Capital is built around a simple principle:
                capital should create meaningful connections between people,
                businesses, and opportunities.
              </p>

              <p className="mt-6 text-sm leading-8 text-[#F3F0E8]/35">
                Our approach combines strategic thinking, disciplined
                allocation, and a long-term perspective to evaluate
                opportunities across multiple areas of private and alternative
                capital.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <ShieldCheck
                  size={18}
                  className="text-[#B8A36A]"
                />

                <span className="text-xs font-medium text-[#F3F0E8]/50">
                  Built around discipline, transparency, and long-term thinking.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── PHILOSOPHY ───────────────── */}
      <section
        id="philosophy"
        className="border-b border-white/[0.07] bg-[#11110F] py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#B8A36A]" />

                <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#B8A36A]">
                  02 / Philosophy
                </span>
              </div>

              <h2 className="text-4xl font-light tracking-[-0.04em] text-[#F3F0E8] sm:text-5xl">
                The bridge is the
                <br />
                <span className="text-[#B8A36A]">strategy.</span>
              </h2>
            </div>

            <div className="space-y-6 text-sm leading-8 text-[#F3F0E8]/35">
              <p>
                Strong investment relationships are built by understanding
                both sides of the bridge: capital and opportunity.
              </p>

              <p>
                Northbridge focuses on creating that connection through
                structured thinking, careful analysis, and a clear view of
                long-term objectives.
              </p>

              <div className="pt-5">
                <div className="h-px w-full bg-white/[0.08]" />

                <div className="mt-6 grid grid-cols-2 gap-px border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
                  {principles.map((principle) => (
                    <div
                      key={principle}
                      className="bg-[#181815] px-4 py-5"
                    >
                      <div className="mb-3 h-1.5 w-1.5 bg-[#B8A36A]" />

                      <div className="text-[10px] font-medium leading-5 text-[#F3F0E8]/55">
                        {principle}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── STRATEGIES ───────────────── */}
      <section
        id="strategies"
        className="border-b border-white/[0.07] bg-[#151513] py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#B8A36A]" />

              <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#B8A36A]">
                03 / Strategies
              </span>
            </div>

            <h2 className="text-4xl font-light tracking-[-0.04em] text-[#F3F0E8] sm:text-5xl">
              Where capital meets
              <span className="text-[#B8A36A]"> opportunity.</span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#F3F0E8]/35">
              A focused approach to identifying and structuring opportunities
              across private and alternative markets.
            </p>
          </div>

          <div className="mt-14 grid gap-px border border-white/[0.08] bg-white/[0.08] lg:grid-cols-3">
            {strategies.map((strategy) => {
              const Icon = strategy.icon;

              return (
                <div
                  key={strategy.number}
                  className="group relative bg-[#181815] p-8 transition-colors hover:bg-[#1B1B18]"
                >
                  <div className="absolute left-0 top-0 h-px w-full bg-[#B8A36A]/60 opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center border border-[#B8A36A]/20 text-[#B8A36A]">
                      <Icon size={19} />
                    </div>

                    <span className="text-[10px] font-medium tracking-[0.2em] text-white/20">
                      {strategy.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-medium text-[#F3F0E8]">
                    {strategy.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#F3F0E8]/30">
                    {strategy.description}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#B8A36A]">
                    Learn more

                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────── PRINCIPLES ───────────────── */}
      <section className="relative overflow-hidden border-b border-white/[0.07] bg-[#11110F] py-28">
        <div className="pointer-events-none absolute right-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-[#B8A36A]/[0.025] blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#B8A36A]" />

                <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#B8A36A]">
                  04 / Principles
                </span>
              </div>

              <h2 className="text-4xl font-light tracking-[-0.04em] text-[#F3F0E8] sm:text-5xl">
                Built for the
                <br />
                <span className="text-[#B8A36A]">long view.</span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-8 text-[#F3F0E8]/35">
                We believe sustainable capital relationships are built on
                clarity, discipline, and a shared understanding of the
                destination.
              </p>
            </div>

            <div className="border border-white/[0.08] bg-[#181815] p-3">
              <div>
                {principles.map((principle, index) => (
                  <div
                    key={principle}
                    className={`flex items-center justify-between px-5 py-5 ${
                      index !== principles.length - 1
                        ? "border-b border-white/[0.07]"
                        : ""
                    }`}
                  >
                    <span className="text-xs font-medium text-[#F3F0E8]/55">
                      {principle}
                    </span>

                    <span className="h-1.5 w-1.5 bg-[#B8A36A]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── CTA ───────────────── */}
      <section
        id="contact"
        className="relative overflow-hidden border-b border-white/[0.07] bg-[#151513] py-28"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B8A36A]/[0.025] blur-[140px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <div className="mx-auto mb-7 h-px w-16 bg-[#B8A36A]" />

          <h2 className="text-4xl font-light tracking-[-0.045em] text-[#F3F0E8] sm:text-6xl">
            Build the connection.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#F3F0E8]/35">
            Explore Northbridge Capital and discover a more structured way to
            connect capital with opportunity.
          </p>

          <div className="mt-9 flex justify-center">
            <Link
              href="/signup"
              className="group flex h-12 items-center gap-3 bg-[#B8A36A] px-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#11110F] transition hover:bg-[#C8B67F]"
            >
              Create Your Account

              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── FOOTER ───────────────── */}
      <footer className="bg-[#11110F]">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center border border-[#B8A36A]/40">
                <div className="h-3.5 w-3.5 rotate-45 border border-[#B8A36A]" />
              </div>

              <div>
                <div className="text-xs font-semibold tracking-[0.2em] text-[#F3F0E8]">
                  NORTHBRIDGE
                </div>

                <div className="mt-1 text-[7px] tracking-[0.42em] text-[#B8A36A]">
                  CAPITAL
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] leading-5 text-white/20 md:text-right">
              <div>Bridging Capital With Opportunity.</div>

              <div className="mt-1">
                This is a software prototype. Not a regulated financial
                offering.
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/[0.07] pt-6 text-center text-[8px] uppercase tracking-[0.2em] text-white/20">
            © {new Date().getFullYear()} Northbridge Capital. All rights
            reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
