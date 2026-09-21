import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";

export default async function AdminOverviewPage() {
  const session = await requireAdmin();

  const [
    totalUsers,
    pendingInvestments,
    activeInvestments,
    pendingDeposits,
    pendingWithdrawals,
    activeInvestmentsList,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.investment.findMany({
      where: { status: "PENDING" },
      include: { plan: true, user: true },
      orderBy: { createdAt: "asc" },
    }),

    prisma.investment.count({
      where: { status: "ACTIVE" },
    }),

    prisma.deposit.findMany({
      where: { status: "PENDING" },
      include: { user: true },
      orderBy: { createdAt: "asc" },
    }),

    prisma.withdrawal.findMany({
      where: { status: "PENDING" },
      include: { user: true },
      orderBy: { createdAt: "asc" },
    }),

    prisma.investment.findMany({
      where: { status: "ACTIVE" },
      include: { plan: true, user: true },
      orderBy: { maturesAt: "asc" },
    }),
  ]);

  const pendingCapital = pendingInvestments.reduce(
    (sum, investment) => sum + Number(investment.amount),
    0
  );

  return (
    <>
      <Navbar userName={session.user.name} role={session.user.role} />

      <main className="min-h-screen bg-[#05070a] text-white px-6 py-8 sm:py-10 relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-[radial-gradient(circle,rgba(255,255,255,0.04),transparent_65%)]" />
        </div>

        <div className="relative max-w-6xl mx-auto flex flex-col gap-10">
          {/* Header */}
          <section className="border-b border-white/[0.07] pb-7">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 mb-3">
                  Northbridge Capital · Administration
                </p>

                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                  Admin Overview
                </h1>

                <p className="text-sm text-white/35 mt-2 max-w-xl">
                  Monitor users, capital requests, active investments, and
                  account activity.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href="/admin/users"
                  className="h-9 inline-flex items-center px-4 rounded-lg border border-white/[0.1] bg-white/[0.025] text-xs font-medium text-white/55 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.18] transition-all duration-200"
                >
                  Manage Users
                  <span className="ml-2 text-white/30">→</span>
                </a>

                <a
                  href="/admin/plans"
                  className="h-9 inline-flex items-center px-4 rounded-lg border border-white/[0.1] bg-white/[0.025] text-xs font-medium text-white/55 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.18] transition-all duration-200"
                >
                  Manage Plans
                  <span className="ml-2 text-white/30">→</span>
                  </a>
                  <a
                  href="/admin/notifications"
                  className="h-9 inline-flex items-center px-4 rounded-lg border border-white/[0.1] bg-white/[0.025] text-xs font-medium text-white/55 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.18] transition-all duration-200"
                >
                  Send Notifications
                  <span className="ml-2 text-white/30">→</span>
                </a>
              </div>
            </div>
          </section>

          {/* Overview Metrics */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-[#0a0d11] border border-white/[0.08] rounded-xl overflow-hidden">
              <CardHeader className="px-5 pt-5 pb-2">
                <CardTitle className="text-[10px] uppercase tracking-[0.16em] font-medium text-white/30">
                  Total Users
                </CardTitle>
              </CardHeader>

              <CardContent className="px-5 pb-5">
                <p className="text-3xl font-semibold tracking-tight text-white">
                  {totalUsers}
                </p>

                <p className="text-xs text-white/25 mt-1">
                  Registered accounts
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#0a0d11] border border-white/[0.08] rounded-xl overflow-hidden">
              <CardHeader className="px-5 pt-5 pb-2">
                <CardTitle className="text-[10px] uppercase tracking-[0.16em] font-medium text-white/30">
                  Pending Investments
                </CardTitle>
              </CardHeader>

              <CardContent className="px-5 pb-5">
                <p className="text-3xl font-semibold tracking-tight text-white">
                  {pendingInvestments.length}
                </p>

                <p className="text-xs text-white/30 mt-1">
                  {formatCurrency(pendingCapital)} total requested
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#0a0d11] border border-white/[0.08] rounded-xl overflow-hidden">
              <CardHeader className="px-5 pt-5 pb-2">
                <CardTitle className="text-[10px] uppercase tracking-[0.16em] font-medium text-white/30">
                  Active Investments
                </CardTitle>
              </CardHeader>

              <CardContent className="px-5 pb-5">
                <p className="text-3xl font-semibold tracking-tight text-white">
                  {activeInvestments}
                </p>

                <p className="text-xs text-white/25 mt-1">
                  Currently active
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Pending Investments */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/25 mb-1">
                  Capital Allocation
                </p>

                <h2 className="text-lg font-semibold text-white">
                  Pending Investment Requests
                </h2>
              </div>

              <span className="text-[10px] uppercase tracking-[0.14em] text-white/25">
                {pendingInvestments.length} Pending
              </span>
            </div>

            {pendingInvestments.length === 0 ? (
              <div className="rounded-xl border border-white/[0.07] bg-[#0a0d11] px-5 py-10 text-center">
                <div className="w-10 h-10 mx-auto mb-4 rounded-xl border border-white/[0.1] bg-white/[0.025] flex items-center justify-center">
                  <div className="w-4 h-4 border-[1.5px] border-white/40 rotate-45" />
                </div>

                <p className="text-sm text-white/30">
                  No pending investment requests.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {pendingInvestments.map((inv) => (
                  <Card
                    key={inv.id}
                    className="bg-[#0a0d11] border border-white/[0.08] rounded-xl overflow-hidden hover:border-white/[0.13] transition-colors duration-200"
                  >
                    <CardContent className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 py-5 px-5">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-2 h-2 rounded-full bg-white/50" />

                          <p className="font-medium text-white/90">
                            {inv.plan.name}
                          </p>
                        </div>

                        <p className="text-sm text-white/35 break-all">
                          {inv.user.name} ({inv.user.email})
                        </p>

                        <p className="text-xs text-white/25 mt-1">
                          Requested{" "}
                          <span className="text-white/55">
                            {formatCurrency(Number(inv.amount))}
                          </span>
                        </p>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <form
                          action={`/admin/investments/${inv.id}/approve`}
                          method="POST"
                        >
                          <button
                            type="submit"
                            className="h-9 px-4 rounded-lg bg-white text-black text-xs font-medium hover:bg-white/90 transition-all duration-200 shadow-[0_6px_18px_rgba(255,255,255,0.06)]"
                          >
                            Approve
                          </button>
                        </form>

                        <form
                          action={`/admin/investments/${inv.id}/reject`}
                          method="POST"
                        >
                          <button
                            type="submit"
                            className="h-9 px-4 rounded-lg border border-white/[0.12] bg-white/[0.025] text-white/60 text-xs font-medium hover:bg-white/[0.07] hover:text-white hover:border-white/[0.2] transition-all duration-200"
                          >
                            Reject
                          </button>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Active Investments */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/25 mb-1">
                  Portfolio Management
                </p>

                <h2 className="text-lg font-semibold text-white">
                  Active Investments
                </h2>
              </div>

              <span className="text-[10px] uppercase tracking-[0.14em] text-white/25">
                {activeInvestmentsList.length} Active
              </span>
            </div>

            {activeInvestmentsList.length === 0 ? (
              <div className="rounded-xl border border-white/[0.07] bg-[#0a0d11] px-5 py-10 text-center">
                <p className="text-sm text-white/30">
                  No active investments.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {activeInvestmentsList.map((inv) => (
                  <Card
                    key={inv.id}
                    className="bg-[#0a0d11] border border-white/[0.08] rounded-xl overflow-hidden"
                  >
                    <CardContent className="py-5 px-5">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-5">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-2 h-2 rounded-full bg-white/60" />

                            <p className="font-medium text-white/90">
                              {inv.plan.name}
                            </p>
                          </div>

                          <p className="text-sm text-white/35">
                            {inv.user.name}
                          </p>

                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                            <span className="text-xs text-white/45">
                              Capital:{" "}
                              <span className="text-white/70">
                                {formatCurrency(Number(inv.amount))}
                              </span>
                            </span>

                            <span className="text-xs text-white/45">
                              Matures:{" "}
                              <span className="text-white/70">
                                {inv.maturesAt?.toLocaleDateString() ?? "—"}
                              </span>
                            </span>
                          </div>
                        </div>

                        <span className="self-start text-[10px] uppercase tracking-[0.12em] font-medium px-3 py-1.5 rounded-lg border border-emerald-500/[0.12] bg-emerald-500/[0.06] text-emerald-300/70">
                          Active
                        </span>
                      </div>

                      <form
                        action={`/admin/investments/${inv.id}/complete`}
                        method="POST"
                        className="grid grid-cols-1 sm:grid-cols-[140px_1fr_auto] gap-3 items-end"
                      >
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-[0.14em] text-white/30">
                            Return Amount
                          </label>

                          <input
                            type="number"
                            name="returnAmount"
                            step="0.01"
                            required
                            className="h-10 w-full bg-[#07090c] border border-white/[0.1] rounded-lg px-3 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:border-white/30 focus:ring-1 focus:ring-white/10"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-[0.14em] text-white/30">
                            Notes
                            <span className="normal-case tracking-normal text-white/20 ml-1">
                              (optional)
                            </span>
                          </label>

                          <input
                            type="text"
                            name="notes"
                            placeholder="Add completion notes..."
                            className="h-10 w-full bg-[#07090c] border border-white/[0.1] rounded-lg px-3 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:border-white/30 focus:ring-1 focus:ring-white/10"
                          />
                        </div>

                        <button
                          type="submit"
                          className="h-10 px-5 rounded-lg bg-white text-black text-xs font-medium hover:bg-white/90 transition-all duration-200 shadow-[0_6px_18px_rgba(255,255,255,0.06)]"
                        >
                          Complete
                        </button>
                      </form>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Pending Deposits */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/25 mb-1">
                  Capital Funding
                </p>

                <h2 className="text-lg font-semibold text-white">
                  Pending Deposits
                </h2>
              </div>

              <span className="text-[10px] uppercase tracking-[0.14em] text-white/25">
                {pendingDeposits.length} Pending
              </span>
            </div>

            {pendingDeposits.length === 0 ? (
              <div className="rounded-xl border border-white/[0.07] bg-[#0a0d11] px-5 py-10 text-center">
                <p className="text-sm text-white/30">
                  No pending deposits.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {pendingDeposits.map((dep) => (
                  <Card
                    key={dep.id}
                    className="bg-[#0a0d11] border border-white/[0.08] rounded-xl overflow-hidden"
                  >
                    <CardContent className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 py-5 px-5">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-2 h-2 rounded-full bg-white/50" />

                          <p className="font-medium text-white/90">
                            {formatCurrency(Number(dep.amount))}
                          </p>
                        </div>

                        <p className="text-sm text-white/35 break-all">
                          {dep.user.name} ({dep.user.email})
                        </p>

                        {dep.reference && (
                          <p className="text-xs text-white/25 mt-1">
                            Reference:{" "}
                            <span className="text-white/50">
                              {dep.reference}
                            </span>
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <form
                          action={`/admin/deposits/${dep.id}/approve`}
                          method="POST"
                        >
                          <button
                            type="submit"
                            className="h-9 px-4 rounded-lg bg-white text-black text-xs font-medium hover:bg-white/90 transition-all duration-200 shadow-[0_6px_18px_rgba(255,255,255,0.06)]"
                          >
                            Approve
                          </button>
                        </form>

                        <form
                          action={`/admin/deposits/${dep.id}/reject`}
                          method="POST"
                        >
                          <button
                            type="submit"
                            className="h-9 px-4 rounded-lg border border-white/[0.12] bg-white/[0.025] text-white/60 text-xs font-medium hover:bg-white/[0.07] hover:text-white hover:border-white/[0.2] transition-all duration-200"
                          >
                            Reject
                          </button>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Pending Withdrawals */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/25 mb-1">
                  Capital Distribution
                </p>

                <h2 className="text-lg font-semibold text-white">
                  Pending Withdrawals
                </h2>
              </div>

              <span className="text-[10px] uppercase tracking-[0.14em] text-white/25">
                {pendingWithdrawals.length} Pending
              </span>
            </div>

            {pendingWithdrawals.length === 0 ? (
              <div className="rounded-xl border border-white/[0.07] bg-[#0a0d11] px-5 py-10 text-center">
                <p className="text-sm text-white/30">
                  No pending withdrawals.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {pendingWithdrawals.map((withdrawal) => (
                  <Card
                    key={withdrawal.id}
                    className="bg-[#0a0d11] border border-white/[0.08] rounded-xl overflow-hidden"
                  >
                    <CardContent className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 py-5 px-5">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-2 h-2 rounded-full bg-white/40" />

                          <p className="font-medium text-white/90">
                            {formatCurrency(Number(withdrawal.amount))}
                          </p>
                        </div>

                        <p className="text-sm text-white/35 break-all">
                          {withdrawal.user.name} ({withdrawal.user.email})
                        </p>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <form
                          action={`/admin/withdrawals/${withdrawal.id}/approve`}
                          method="POST"
                        >
                          <button
                            type="submit"
                            className="h-9 px-4 rounded-lg bg-white text-black text-xs font-medium hover:bg-white/90 transition-all duration-200 shadow-[0_6px_18px_rgba(255,255,255,0.06)]"
                          >
                            Approve
                          </button>
                        </form>

                        <form
                          action={`/admin/withdrawals/${withdrawal.id}/reject`}
                          method="POST"
                        >
                          <button
                            type="submit"
                            className="h-9 px-4 rounded-lg border border-white/[0.12] bg-white/[0.025] text-white/60 text-xs font-medium hover:bg-white/[0.07] hover:text-white hover:border-white/[0.2] transition-all duration-200"
                          >
                            Reject
                          </button>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Footer */}
          <div className="flex items-center justify-center gap-2 pt-2 pb-4">
            <div className="w-2.5 h-2.5 border border-white/20 rotate-45" />

            <span className="text-[9px] uppercase tracking-[0.22em] text-white/20">
              Northbridge Capital · Administration
            </span>
          </div>
        </div>
      </main>
    </>
  );
}