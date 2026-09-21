
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Navbar } from "@/components/navbar";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const userId = session.user.id;

  const [investments, deposits, withdrawals, unreadCount, returns] =
    await Promise.all([
      prisma.investment.findMany({
        where: { userId },
        include: { plan: true },
        orderBy: { createdAt: "desc" },
      }),

      prisma.deposit.findMany({
        where: {
          userId,
          status: "APPROVED",
        },
      }),

      prisma.withdrawal.findMany({
        where: {
          userId,
          status: "APPROVED",
        },
      }),

      prisma.notification.count({
        where: {
          userId,
          isRead: false,
        },
      }),

      prisma.return.findMany({
        where: {
          investment: {
            userId,
          },
        },
      }),
    ]);

  const totalApprovedDeposits = deposits.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  );

  const totalApprovedWithdrawals = withdrawals.reduce(
    (sum, w) => sum + Number(w.amount),
    0
  );

  const investedCapital = investments
    .filter(
      (inv) =>
        inv.status === "ACTIVE" || inv.status === "COMPLETED"
    )
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  const reservedForPending = investments
    .filter((inv) => inv.status === "PENDING")
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  const availableBalance =
    totalApprovedDeposits -
    totalApprovedWithdrawals -
    investedCapital -
    reservedForPending;

  const activeCount = investments.filter(
    (inv) => inv.status === "ACTIVE"
  ).length;

  const totalProfitLoss = returns.reduce(
    (sum, r) => sum + Number(r.amount),
    0
  );

  const statusStyles: Record<string, string> = {
    PENDING:
      "bg-[#B8A36A]/10 text-[#B8A36A] border-[#B8A36A]/20",

    ACTIVE:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

    COMPLETED:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",

    CANCELLED:
      "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const statCards = [
    {
      label: "Available Balance",
      value: formatCurrency(availableBalance),
      accent:
        "bg-gradient-to-b from-[#B8A36A] via-[#B8A36A] to-blue-500",
      valueClass: "text-[#F3F0E8]",
      description: "Available for allocation",
    },

    {
      label: "Invested Capital",
      value: formatCurrency(investedCapital),
      accent:
        "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700",
      valueClass: "text-[#F3F0E8]",
      description: "Capital currently deployed",
    },

    {
      label: "Active Investments",
      value: String(activeCount),
      accent:
        "bg-gradient-to-b from-[#F3F0E8]/60 via-blue-400 to-blue-600",
      valueClass: "text-[#F3F0E8]",
      description: "Currently active positions",
    },

    {
      label: "Total Profit / Loss",
      value: `${totalProfitLoss > 0 ? "+" : ""}${formatCurrency(
        totalProfitLoss
      )}`,
      accent:
        totalProfitLoss > 0
          ? "bg-gradient-to-b from-emerald-400 to-blue-500"
          : totalProfitLoss < 0
          ? "bg-gradient-to-b from-red-500 to-blue-600"
          : "bg-white/20",
      valueClass:
        totalProfitLoss > 0
          ? "text-emerald-400"
          : totalProfitLoss < 0
          ? "text-red-400"
          : "text-[#F3F0E8]",
      description:
        returns.length > 0
          ? `Based on ${returns.length} completed investment${
              returns.length === 1 ? "" : "s"
            }`
          : "Tracked once investments mature",
    },
  ];

  return (
    <>
      <Navbar
        userName={session.user.name}
        role={session.user.role}
        unreadCount={unreadCount}
      />

      <main className="min-h-screen bg-[#080B10] text-[#F3F0E8] relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
          {/* Blue ambient glow */}
          <div className="absolute -right-40 -top-32 h-[620px] w-[620px] rounded-full bg-blue-600/[0.045] blur-[150px]" />

          {/* Gold ambient glow */}
          <div className="absolute left-1/3 top-0 h-[420px] w-[420px] rounded-full bg-[#B8A36A]/[0.025] blur-[140px]" />

          {/* Bottom blue glow */}
          <div className="absolute bottom-[-250px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-900/[0.035] blur-[160px]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-5 py-8 sm:px-8 lg:px-10">

          {/* HEADER */}
          <header className="border-b border-white/[0.08] pb-7">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-gradient-to-r from-[#B8A36A] to-blue-500" />

                  <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#B8A36A]">
                    Client Portal
                  </p>
                </div>

                <h1 className="text-3xl font-light tracking-[-0.035em] text-[#F3F0E8] sm:text-4xl">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-[#B8A36A] via-[#D0BD82] to-blue-400 bg-clip-text text-transparent">
                    {session.user.name}
                  </span>
                </h1>

                <p className="mt-3 text-sm text-[#F3F0E8]/35">
                  Your investment account at a glance.
                </p>
              </div>

              {/* Account status */}
              <div className="flex items-center gap-2 border border-emerald-500/15 bg-emerald-500/[0.04] px-3 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />

                <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-emerald-400/80">
                  Account Active
                </span>
              </div>
            </div>
          </header>

          {/* OVERVIEW */}
          <section>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#B8A36A]/70">
                  Portfolio Overview
                </p>

                <h2 className="mt-1 text-lg font-medium text-[#F3F0E8]">
                  Account Summary
                </h2>
              </div>

              <div className="hidden text-[9px] uppercase tracking-[0.15em] text-blue-400/25 sm:block">
                Northbridge Capital
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {statCards.map((card) => (
                <Card
                  key={card.label}
                  className="group relative overflow-hidden rounded-none border-white/[0.08] bg-[#10141B] shadow-none transition-all duration-300 hover:border-blue-500/20 hover:bg-[#121820]"
                >
                  {/* Accent line */}
                  <div
                    className={`absolute left-0 top-0 h-full w-[2px] ${card.accent}`}
                  />

                  {/* Blue hover glow */}
                  <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-blue-500/[0.025] blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <CardHeader className="px-5 pb-2 pt-5">
                    <CardTitle className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#F3F0E8]/35">
                      {card.label}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-5 pb-5">
                    <p
                      className={`text-2xl font-light tracking-[-0.025em] ${
                        card.valueClass ?? "text-[#F3F0E8]"
                      }`}
                    >
                      {card.value}
                    </p>

                    <p className="mt-2 text-[10px] text-[#F3F0E8]/25">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* INVESTMENTS */}
          <section>
            <div className="mb-5 flex items-end justify-between border-b border-white/[0.07] pb-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#B8A36A]/70">
                  Portfolio
                </p>

                <h2 className="mt-1 text-lg font-medium text-[#F3F0E8]">
                  My Investments
                </h2>
              </div>

              <span className="border border-blue-500/[0.12] bg-blue-500/[0.025] px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-blue-300/40">
                {investments.length}{" "}
                {investments.length === 1
                  ? "Investment"
                  : "Investments"}
              </span>
            </div>

            {investments.length === 0 ? (
              <Card className="rounded-none border-dashed border-blue-500/[0.14] bg-[#0E1218]">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center border border-blue-500/20 bg-blue-500/[0.025]">
                    <div className="h-4 w-4 rotate-45 border border-[#B8A36A]/60" />
                  </div>

                  <p className="text-sm font-medium text-[#F3F0E8]/55">
                    No investments yet
                  </p>

                  <p className="mt-2 max-w-sm text-xs leading-5 text-[#F3F0E8]/25">
                    Your investment activity will appear here once
                    you make your first allocation.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col gap-2">
                {investments.map((inv) => (
                  <Card
                    key={inv.id}
                    className="group relative overflow-hidden rounded-none border-white/[0.08] bg-[#10141B] shadow-none transition-all duration-300 hover:border-blue-500/25 hover:bg-[#121820]"
                  >
                    {/* Blue hover accent */}
                    <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <CardContent className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        {/* Investment marker */}
                        <div className="hidden h-9 w-9 items-center justify-center border border-white/[0.08] bg-blue-500/[0.02] sm:flex">
                          <div className="h-3 w-3 rotate-45 border border-[#B8A36A]/60 transition-all duration-300 group-hover:rotate-90 group-hover:border-blue-400" />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-[#F3F0E8]">
                            {inv.plan.name}
                          </p>

                          <p className="mt-1 text-[11px] text-[#F3F0E8]/30">
                            {formatCurrency(Number(inv.amount))}

                            <span className="mx-2 text-blue-400/20">
                              •
                            </span>

                            {new Date(
                              inv.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`w-fit border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] ${
                          statusStyles[inv.status] ??
                          "border-white/10 bg-white/[0.03] text-white/40"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* FOOTER INFORMATION */}
          <footer className="flex flex-col gap-3 border-t border-white/[0.07] pt-5 text-[8px] uppercase tracking-[0.2em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[#B8A36A]/30">
              Northbridge Capital
            </span>

            <div className="flex items-center gap-3">
              <span>Private &amp; Confidential</span>

              <span className="h-1 w-1 bg-blue-500/40" />

              <span className="text-blue-400/30">
                Client Portal
              </span>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
