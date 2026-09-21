
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
import { PortfolioChart } from "@/components/portfolio-chart";

export default async function PortfolioPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login");

  const investments = await prisma.investment.findMany({
    where: {
      userId: session.user.id,
      status: { in: ["ACTIVE", "COMPLETED"] },
    },
    include: { plan: true },
    orderBy: { startedAt: "asc" },
  });

  // Build cumulative invested-capital-over-time data points
  let running = 0;

  const chartData = investments.map((inv) => {
    running += Number(inv.amount);

    return {
      date: inv.startedAt
        ? inv.startedAt.toLocaleDateString()
        : inv.createdAt.toLocaleDateString(),
      value: running,
    };
  });

  // Breakdown by risk category
  const byRisk: Record<string, number> = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
  };

  investments.forEach((inv) => {
    byRisk[inv.plan.riskCategory] += Number(inv.amount);
  });

  const totalInvested = investments.reduce(
    (s, i) => s + Number(i.amount),
    0
  );

  return (
    <>
      <Navbar
        userName={session.user.name}
        role={session.user.role}
      />

      <main className="relative min-h-screen overflow-hidden bg-[#11110F] text-[#F3F0E8]">
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(243,240,232,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(243,240,232,.8) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-48 left-1/2 h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-[#B8A36A]/[0.025] blur-[140px]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-10 sm:px-8 sm:py-14 lg:px-10">

          {/* ───────────────── HEADER ───────────────── */}
          <header className="border-b border-white/[0.07] pb-9">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#B8A36A]" />

              <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#B8A36A]">
                Portfolio
              </span>
            </div>

            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-3xl font-light tracking-[-0.04em] text-[#F3F0E8] sm:text-5xl">
                  Your
                  <span className="text-[#B8A36A]"> Portfolio</span>
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-7 text-[#F3F0E8]/35">
                  Overview of your invested capital and current holdings.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-[#B8A36A]" />

                <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                  {investments.length}{" "}
                  {investments.length === 1 ? "Position" : "Positions"}
                </span>
              </div>
            </div>
          </header>

          {/* ───────────────── CAPITAL HISTORY ───────────────── */}
          <section>
            <Card className="overflow-hidden rounded-none border border-white/[0.08] bg-[#181815] shadow-2xl shadow-black/10">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8A36A]/70 to-transparent" />

              <CardHeader className="border-b border-white/[0.07] px-6 py-6 sm:px-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="mb-2 text-[8px] font-medium uppercase tracking-[0.28em] text-[#B8A36A]">
                      Capital History
                    </div>

                    <CardTitle className="text-lg font-light tracking-[-0.02em] text-[#F3F0E8]">
                      Invested Capital Over Time
                    </CardTitle>
                  </div>

                  <div className="hidden items-center gap-3 sm:flex">
                    <span className="h-1.5 w-1.5 bg-[#B8A36A]" />

                    <span className="text-[8px] uppercase tracking-[0.18em] text-white/25">
                      Invested Capital
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-5 py-6 sm:px-8 sm:py-8">
                {chartData.length === 0 ? (
                  <div className="flex min-h-[280px] flex-col items-center justify-center border border-dashed border-white/[0.1] bg-[#11110F] px-6 text-center">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center border border-white/[0.08]">
                      <div className="h-4 w-4 rotate-45 border border-[#B8A36A]/50" />
                    </div>

                    <p className="max-w-md text-sm leading-6 text-white/35">
                      No active investments yet — this chart will populate
                      once your first investment is approved.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-hidden border border-white/[0.06] bg-[#11110F] p-3 sm:p-5">
                    <PortfolioChart data={chartData} />
                  </div>
                )}

                <div className="mt-5 flex items-start gap-3 border-t border-white/[0.07] pt-5">
                  <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#B8A36A]/50" />

                  <p className="text-[10px] leading-5 text-white/25">
                    Reflects your actual account activity, not a performance
                    projection.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* ───────────────── RISK ALLOCATION ───────────────── */}
          <section>
            <div className="mb-7 flex items-end justify-between border-b border-white/[0.07] pb-5">
              <div>
                <div className="mb-2 text-[8px] font-medium uppercase tracking-[0.28em] text-[#B8A36A]">
                  Allocation
                </div>

                <h2 className="text-xl font-light tracking-[-0.02em] text-[#F3F0E8]">
                  Risk Breakdown
                </h2>
              </div>

              <div className="text-right">
                <div className="mb-1 text-[8px] uppercase tracking-[0.2em] text-white/20">
                  Total Invested
                </div>

                <div className="text-sm font-medium text-[#B8A36A]">
                  {formatCurrency(totalInvested)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-px border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">

              {/* LOW */}
              <Card className="rounded-none border-0 bg-[#181815] transition-colors duration-300 hover:bg-[#1B1B18]">
                <CardHeader className="px-6 pb-3 pt-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/35">
                      Low Risk
                    </CardTitle>

                    <span className="h-1.5 w-1.5 bg-emerald-400/70" />
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-6 pt-1">
                  <p className="text-2xl font-light tracking-[-0.03em] text-[#F3F0E8]">
                    {formatCurrency(byRisk.LOW)}
                  </p>

                  <div className="mt-4 h-px w-full bg-white/[0.06]">
                    <div
                      className="h-px bg-emerald-400/50"
                      style={{
                        width:
                          totalInvested > 0
                            ? `${Math.min(
                                (byRisk.LOW / totalInvested) * 100,
                                100
                              )}%`
                            : "0%",
                      }}
                    />
                  </div>

                  <p className="mt-3 text-[8px] uppercase tracking-[0.16em] text-white/20">
                    {totalInvested > 0
                      ? `${Math.round(
                          (byRisk.LOW / totalInvested) * 100
                        )}% of portfolio`
                      : "—"}
                  </p>
                </CardContent>
              </Card>

              {/* MEDIUM */}
              <Card className="rounded-none border-0 bg-[#181815] transition-colors duration-300 hover:bg-[#1B1B18]">
                <CardHeader className="px-6 pb-3 pt-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/35">
                      Medium Risk
                    </CardTitle>

                    <span className="h-1.5 w-1.5 bg-[#B8A36A]" />
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-6 pt-1">
                  <p className="text-2xl font-light tracking-[-0.03em] text-[#F3F0E8]">
                    {formatCurrency(byRisk.MEDIUM)}
                  </p>

                  <div className="mt-4 h-px w-full bg-white/[0.06]">
                    <div
                      className="h-px bg-[#B8A36A]"
                      style={{
                        width:
                          totalInvested > 0
                            ? `${Math.min(
                                (byRisk.MEDIUM / totalInvested) * 100,
                                100
                              )}%`
                            : "0%",
                      }}
                    />
                  </div>

                  <p className="mt-3 text-[8px] uppercase tracking-[0.16em] text-white/20">
                    {totalInvested > 0
                      ? `${Math.round(
                          (byRisk.MEDIUM / totalInvested) * 100
                        )}% of portfolio`
                      : "—"}
                  </p>
                </CardContent>
              </Card>

              {/* HIGH */}
              <Card className="rounded-none border-0 bg-[#181815] transition-colors duration-300 hover:bg-[#1B1B18]">
                <CardHeader className="px-6 pb-3 pt-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/35">
                      High Risk
                    </CardTitle>

                    <span className="h-1.5 w-1.5 bg-red-400/70" />
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-6 pt-1">
                  <p className="text-2xl font-light tracking-[-0.03em] text-[#F3F0E8]">
                    {formatCurrency(byRisk.HIGH)}
                  </p>

                  <div className="mt-4 h-px w-full bg-white/[0.06]">
                    <div
                      className="h-px bg-red-400/60"
                      style={{
                        width:
                          totalInvested > 0
                            ? `${Math.min(
                                (byRisk.HIGH / totalInvested) * 100,
                                100
                              )}%`
                            : "0%",
                      }}
                    />
                  </div>

                  <p className="mt-3 text-[8px] uppercase tracking-[0.16em] text-white/20">
                    {totalInvested > 0
                      ? `${Math.round(
                          (byRisk.HIGH / totalInvested) * 100
                        )}% of portfolio`
                      : "—"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* ───────────────── HOLDINGS ───────────────── */}
          <section>
            <div className="mb-7 border-b border-white/[0.07] pb-5">
              <div className="mb-2 text-[8px] font-medium uppercase tracking-[0.28em] text-[#B8A36A]">
                Positions
              </div>

              <h2 className="text-xl font-light tracking-[-0.02em] text-[#F3F0E8]">
                Holdings
              </h2>
            </div>

            {investments.length === 0 ? (
              <div className="border border-dashed border-white/[0.1] bg-[#181815] px-6 py-16 text-center">
                <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center border border-white/[0.08]">
                  <div className="h-3.5 w-3.5 rotate-45 border border-white/20" />
                </div>

                <p className="text-sm text-white/30">
                  No active or completed investments yet.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-px border border-white/[0.08] bg-white/[0.08]">
                {investments.map((inv) => (
                  <Card
                    key={inv.id}
                    className="rounded-none border-0 bg-[#181815] transition-colors duration-300 hover:bg-[#1B1B18]"
                  >
                    <CardContent className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="h-1.5 w-1.5 shrink-0 bg-[#B8A36A]" />

                          <p className="truncate text-sm font-medium text-[#F3F0E8]/90">
                            {inv.plan.name}
                          </p>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[8px] uppercase tracking-[0.12em] text-white/25">
                          <span>{inv.plan.riskCategory} Risk</span>

                          <span className="text-white/10">·</span>

                          <span>
                            Started{" "}
                            <span className="text-white/45">
                              {inv.startedAt?.toLocaleDateString() ?? "—"}
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 border-l border-[#B8A36A]/30 pl-5 sm:text-right">
                        <div className="mb-1.5 text-[8px] uppercase tracking-[0.18em] text-white/20">
                          Invested
                        </div>

                        <p className="text-lg font-light tracking-[-0.02em] text-[#F3F0E8]">
                          {formatCurrency(Number(inv.amount))}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* ───────────────── FOOTER ───────────────── */}
          <footer className="flex items-center justify-center gap-3 border-t border-white/[0.07] pt-8 pb-3">
            <span className="h-1.5 w-1.5 bg-[#B8A36A]/60" />

            <p className="text-[8px] uppercase tracking-[0.24em] text-white/20">
              Northbridge Capital · Portfolio
            </p>

            <span className="h-1.5 w-1.5 bg-white/10" />
          </footer>
        </div>
      </main>
    </>
  );
}
