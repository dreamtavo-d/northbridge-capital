
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function InvestmentsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const plans = await prisma.investmentPlan.findMany({
    where: { status: "ACTIVE" },
    orderBy: { minInvestment: "asc" },
  });

  return (
    <>
      <Navbar
        userName={session.user.name}
        role={session.user.role}
      />

      <main className="min-h-screen bg-[#11110F] text-[#F3F0E8]">
        {/* Background atmosphere */}
        <div className="pointer-events-none fixed inset-0 opacity-[0.018]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(243,240,232,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(243,240,232,.8) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          {/* ───────────────── HEADER ───────────────── */}
          <header className="border-b border-white/[0.07] pb-9">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#B8A36A]" />

              <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#B8A36A]">
                Northbridge Capital · Opportunities
              </span>
            </div>

            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div>
                <h1 className="text-3xl font-light tracking-[-0.04em] text-[#F3F0E8] sm:text-5xl">
                  Investment
                  <span className="text-[#B8A36A]"> Plans</span>
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#F3F0E8]/35">
                  Explore available investment strategies and select an
                  opportunity aligned with your capital objectives.
                </p>
              </div>

              <div className="hidden items-center gap-3 lg:flex">
                <span className="h-1.5 w-1.5 bg-[#B8A36A]" />

                <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                  {plans.length}{" "}
                  {plans.length === 1 ? "Strategy" : "Strategies"} Available
                </span>
              </div>
            </div>
          </header>

          {/* ───────────────── STRATEGIES ───────────────── */}
          <section>
            <div className="mb-7 flex items-end justify-between">
              <div>
                <div className="mb-2 text-[8px] font-medium uppercase tracking-[0.28em] text-white/25">
                  Available Strategies
                </div>

                <h2 className="text-xl font-light tracking-[-0.02em] text-[#F3F0E8] sm:text-2xl">
                  Investment Opportunities
                </h2>
              </div>

              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-white/20 sm:hidden">
                <span className="h-1.5 w-1.5 bg-[#B8A36A]" />
                {plans.length}
              </div>
            </div>

            {plans.length === 0 ? (
              <div className="border border-dashed border-white/[0.1] bg-[#151513] py-20 text-center">
                <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center border border-white/[0.08]">
                  <div className="h-3.5 w-3.5 rotate-45 border border-white/25" />
                </div>

                <p className="text-sm font-medium text-white/45">
                  No investment strategies are currently available.
                </p>

                <p className="mt-2 text-xs text-white/20">
                  Please check back later for new opportunities.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-px border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan) => (
                  <Card
                    key={plan.id}
                    className="group relative overflow-hidden rounded-none border-0 bg-[#181815] transition-colors duration-300 hover:bg-[#1B1B18]"
                  >
                    {/* Hover accent */}
                    <div className="absolute left-0 right-0 top-0 h-px bg-[#B8A36A] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <CardHeader className="px-7 pb-5 pt-7">
                      <div className="mb-7 flex items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center border border-[#B8A36A]/20 bg-[#11110F]">
                          <div className="h-4 w-4 rotate-45 border-[1.5px] border-[#B8A36A]/70 transition-colors group-hover:border-[#B8A36A]" />
                        </div>

                        <span className="text-[9px] font-medium tracking-[0.2em] text-white/15">
                          INVESTMENT
                        </span>
                      </div>

                      <CardTitle className="text-xl font-light tracking-[-0.02em] text-[#F3F0E8]">
                        {plan.name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-6 px-7 pb-7">
                      <p className="min-h-[52px] text-sm leading-7 text-white/30">
                        {plan.description}
                      </p>

                      {/* Investment range */}
                      <div className="border-t border-white/[0.07] pt-5">
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <p className="mb-1.5 text-[8px] font-medium uppercase tracking-[0.2em] text-white/20">
                              Minimum
                            </p>

                            <p className="text-sm font-medium text-[#F3F0E8]/75">
                              {formatCurrency(Number(plan.minInvestment))}
                            </p>
                          </div>

                          {plan.maxInvestment && (
                            <div>
                              <p className="mb-1.5 text-[8px] font-medium uppercase tracking-[0.2em] text-white/20">
                                Maximum
                              </p>

                              <p className="text-sm font-medium text-[#F3F0E8]/75">
                                {formatCurrency(Number(plan.maxInvestment))}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Duration / Risk */}
                      <div className="grid grid-cols-2 gap-px border border-white/[0.07] bg-white/[0.07]">
                        <div className="bg-[#11110F] px-4 py-4">
                          <p className="mb-2 text-[8px] font-medium uppercase tracking-[0.18em] text-white/20">
                            Duration
                          </p>

                          <p className="text-xs text-white/60">
                            {plan.durationDays} days
                          </p>
                        </div>

                        <div className="bg-[#11110F] px-4 py-4">
                          <p className="mb-2 text-[8px] font-medium uppercase tracking-[0.18em] text-white/20">
                            Risk
                          </p>

                          <p className="text-xs text-white/60">
                            {plan.riskCategory}
                          </p>
                        </div>
                      </div>

                      {/* Target return */}
                      {plan.targetReturnLabel && (
                        <div className="border-l border-[#B8A36A]/50 pl-4">
                          <p className="text-xs leading-5 text-white/35">
                            {plan.targetReturnLabel}
                          </p>
                        </div>
                      )}

                      {/* CTA */}
                      <Link
                        href={`/investments/${plan.id}`}
                        className="w-full"
                      >
                        <Button className="group/button mt-1 h-12 w-full rounded-none border border-[#B8A36A]/40 bg-[#B8A36A] text-[10px] font-semibold uppercase tracking-[0.16em] text-[#11110F] transition-all duration-200 hover:border-[#C8B67F] hover:bg-[#C8B67F]">
                          <span>View Plan</span>

                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="ml-2 transition-transform duration-200 group-hover/button:translate-x-1"
                          >
                            <path d="M5 12h14" />
                            <path d="m13 6 6 6-6 6" />
                          </svg>
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* ───────────────── FOOTER INDICATOR ───────────────── */}
          <div className="flex items-center justify-center gap-3 border-t border-white/[0.07] pt-8 pb-3">
            <span className="h-1.5 w-1.5 bg-[#B8A36A]/60" />

            <span className="text-[8px] uppercase tracking-[0.22em] text-white/20">
              Northbridge Capital · Investment Strategies
            </span>

            <span className="h-1.5 w-1.5 bg-[#B8A36A]/20" />
          </div>
        </div>
      </main>
    </>
  );
}
