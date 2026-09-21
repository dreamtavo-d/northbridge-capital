import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { UserRow } from "@/components/user-row";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireAdmin();
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      investments: { include: { plan: true }, orderBy: { createdAt: "desc" } },
      deposits: { orderBy: { createdAt: "desc" } },
      withdrawals: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!user) notFound();

  const totalDeposits = user.deposits
    .filter((d) => d.status === "APPROVED")
    .reduce((s, d) => s + Number(d.amount), 0);

  const totalWithdrawals = user.withdrawals
    .filter((w) => w.status === "APPROVED")
    .reduce((s, w) => s + Number(w.amount), 0);

  const totalInvested = user.investments
    .filter((i) => i.status === "ACTIVE" || i.status === "COMPLETED")
    .reduce((s, i) => s + Number(i.amount), 0);

  return (
    <>
      <Navbar userName={session.user.name} role={session.user.role} />

      <main className="min-h-screen bg-[#f7f9fc] text-slate-900">
        <div className="mx-auto flex max-w-5xl flex-col gap-7 px-5 py-8 sm:px-8 sm:py-10">

          {/* Header */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:px-7">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-green-500" />

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Account Profile
                  </span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {user.name}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  {user.email}
                </p>
              </div>

              <div
                className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] ${
                  user.isActive
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-slate-200 bg-slate-50 text-slate-500"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    user.isActive ? "bg-green-500" : "bg-slate-400"
                  }`}
                />
                {user.isActive ? "Active Account" : "Inactive Account"}
              </div>
            </div>
          </div>

          {/* User Controls */}
          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
            <UserRow
              id={user.id}
              name={user.name}
              email={user.email}
              role={user.role}
              isActive={user.isActive}
              isSelf={user.id === session.user.id}
            />
          </div>

          {/* Financial Overview */}
          <section>
            <div className="mb-4 flex items-end justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Financial Overview
                </div>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">
                  Account Summary
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              {/* Deposited */}
              <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_6px_24px_rgba(15,23,42,0.04)]">
                <div className="h-1 bg-blue-500" />

                <CardHeader className="px-5 pb-2 pt-5">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Total Deposited
                    </CardTitle>

                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
                      <span className="text-xs font-bold text-blue-600">+</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-5 pb-5 pt-2">
                  <p className="text-xl font-bold tracking-tight text-slate-900">
                    {formatCurrency(totalDeposits)}
                  </p>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-green-600">
                    Approved capital
                  </p>
                </CardContent>
              </Card>

              {/* Withdrawn */}
              <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_6px_24px_rgba(15,23,42,0.04)]">
                <div className="h-1 bg-green-500" />

                <CardHeader className="px-5 pb-2 pt-5">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Total Withdrawn
                    </CardTitle>

                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-50">
                      <span className="text-xs font-bold text-green-600">
                        −
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-5 pb-5 pt-2">
                  <p className="text-xl font-bold tracking-tight text-slate-900">
                    {formatCurrency(totalWithdrawals)}
                  </p>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-slate-400">
                    Approved distributions
                  </p>
                </CardContent>
              </Card>

              {/* Invested */}
              <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_6px_24px_rgba(15,23,42,0.04)]">
                <div className="h-1 bg-blue-600" />

                <CardHeader className="px-5 pb-2 pt-5">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Total Invested
                    </CardTitle>

                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
                      <span className="text-xs font-bold text-blue-600">
                        ◆
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-5 pb-5 pt-2">
                  <p className="text-xl font-bold tracking-tight text-slate-900">
                    {formatCurrency(totalInvested)}
                  </p>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-blue-600">
                    Active & completed
                  </p>
                </CardContent>
              </Card>

            </div>
          </section>

          {/* Investments */}
          <section>
            <div className="mb-4 flex items-end justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Portfolio
                </div>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">
                  Investments
                </h2>
              </div>

              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {user.investments.length}{" "}
                {user.investments.length === 1 ? "Position" : "Positions"}
              </span>
            </div>

            {user.investments.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
                <p className="text-sm text-slate-400">None yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {user.investments.map((inv) => (
                  <Card
                    key={inv.id}
                    className="rounded-xl border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.035)] transition-all duration-200 hover:border-blue-200"
                  >
                    <CardContent className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            inv.status === "ACTIVE"
                              ? "bg-green-500"
                              : inv.status === "COMPLETED"
                                ? "bg-blue-500"
                                : "bg-slate-300"
                          }`}
                        />

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {inv.plan.name}
                          </p>

                          <p className="mt-1 text-[9px] uppercase tracking-[0.1em] text-slate-400">
                            {inv.plan.riskCategory} risk
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:text-right">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${
                            inv.status === "ACTIVE"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : inv.status === "COMPLETED"
                                ? "border-blue-200 bg-blue-50 text-blue-700"
                                : "border-slate-200 bg-slate-50 text-slate-500"
                          }`}
                        >
                          {inv.status}
                        </span>

                        <span className="text-sm font-bold text-slate-900">
                          {formatCurrency(Number(inv.amount))}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Deposits */}
          <section>
            <div className="mb-4 border-b border-slate-200 pb-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Capital Inflows
              </div>

              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                Deposits
              </h2>
            </div>

            {user.deposits.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
                <p className="text-sm text-slate-400">None yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {user.deposits.map((d) => (
                  <Card
                    key={d.id}
                    className="rounded-xl border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.035)]"
                  >
                    <CardContent className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                          +
                        </span>

                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            {d.reference || "Deposit"}
                          </p>

                          <p className="mt-1 text-[9px] uppercase tracking-[0.1em] text-slate-400">
                            Capital deposit
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${
                            d.status === "APPROVED"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : d.status === "REJECTED"
                                ? "border-red-200 bg-red-50 text-red-600"
                                : "border-yellow-200 bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {d.status}
                        </span>

                        <span className="text-sm font-bold text-slate-900">
                          {formatCurrency(Number(d.amount))}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Withdrawals */}
          <section>
            <div className="mb-4 border-b border-slate-200 pb-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Capital Outflows
              </div>

              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                Withdrawals
              </h2>
            </div>

            {user.withdrawals.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
                <p className="text-sm text-slate-400">None yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {user.withdrawals.map((w) => (
                  <Card
                    key={w.id}
                    className="rounded-xl border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.035)]"
                  >
                    <CardContent className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-sm font-bold text-green-600">
                          −
                        </span>

                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            Withdrawal
                          </p>

                          <p className="mt-1 text-[9px] uppercase tracking-[0.1em] text-slate-400">
                            Capital distribution
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${
                            w.status === "APPROVED"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : w.status === "REJECTED"
                                ? "border-red-200 bg-red-50 text-red-600"
                                : "border-yellow-200 bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {w.status}
                        </span>

                        <span className="text-sm font-bold text-slate-900">
                          {formatCurrency(Number(w.amount))}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Footer */}
          <div className="border-t border-slate-200 pt-6">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-slate-400">
              Northbridge Capital · Account Administration
            </p>
          </div>
        </div>
      </main>
    </>
  );
}