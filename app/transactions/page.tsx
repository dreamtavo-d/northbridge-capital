import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";

type UnifiedTransaction = {
  id: string;
  type: "DEPOSIT" | "WITHDRAWAL" | "INVESTMENT";
  amount: number;
  status: string;
  label: string;
  date: Date;
};

export default async function TransactionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const userId = session.user.id;

  const [deposits, withdrawals, investments] = await Promise.all([
    prisma.deposit.findMany({ where: { userId } }),
    prisma.withdrawal.findMany({ where: { userId } }),
    prisma.investment.findMany({
      where: { userId },
      include: { plan: true },
    }),
  ]);

  const unified: UnifiedTransaction[] = [
    ...deposits.map((d) => ({
      id: d.id,
      type: "DEPOSIT" as const,
      amount: Number(d.amount),
      status: d.status,
      label: "Deposit" + (d.reference ? ` (Ref: ${d.reference})` : ""),
      date: d.createdAt,
    })),

    ...withdrawals.map((w) => ({
      id: w.id,
      type: "WITHDRAWAL" as const,
      amount: Number(w.amount),
      status: w.status,
      label: "Withdrawal",
      date: w.createdAt,
    })),

    ...investments.map((i) => ({
      id: i.id,
      type: "INVESTMENT" as const,
      amount: Number(i.amount),
      status: i.status,
      label: `Investment — ${i.plan.name}`,
      date: i.createdAt,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const statusColor = (status: string) => {
    if (status === "PENDING") {
      return "bg-amber-400/10 text-amber-300 border-amber-400/20";
    }

    if (
      status === "APPROVED" ||
      status === "ACTIVE" ||
      status === "COMPLETED"
    ) {
      return "bg-emerald-400/10 text-emerald-300 border-emerald-400/20";
    }

    return "bg-rose-400/10 text-rose-300 border-rose-400/20";
  };

  const sign = (type: UnifiedTransaction["type"]) =>
    type === "DEPOSIT" ? "+" : "-";

  const typeStyles = (type: UnifiedTransaction["type"]) => {
    if (type === "DEPOSIT") {
      return {
        icon: "↓",
        iconClass:
          "bg-emerald-400/10 border-emerald-400/15 text-emerald-300",
        labelClass: "text-emerald-300",
      };
    }

    if (type === "WITHDRAWAL") {
      return {
        icon: "↑",
        iconClass: "bg-rose-400/10 border-rose-400/15 text-rose-300",
        labelClass: "text-rose-300",
      };
    }

    return {
      icon: "◆",
      iconClass: "bg-sky-400/10 border-sky-400/15 text-sky-300",
      labelClass: "text-sky-300",
    };
  };

  return (
    <>
      <Navbar userName={session.user.name} />

      <main className="min-h-screen bg-[#f5f7fa] text-[#172033]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12">

          {/* Header */}
          <header className="mb-9">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#315a8f]" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#718096]">
                    Account Activity
                  </p>
                </div>

                <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#172033]">
                  Transactions
                </h1>

                <p className="text-sm text-[#718096] mt-2 max-w-lg">
                  Review your deposits, withdrawals, and investment activity
                  in one place.
                </p>
              </div>

              {/* Transaction count */}
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <div className="px-4 py-2.5 rounded-xl bg-white border border-[#e4e8ee] shadow-sm">
                  <p className="text-[9px] uppercase tracking-[0.16em] font-semibold text-[#8b96a8]">
                    Total activity
                  </p>

                  <p className="text-lg font-semibold text-[#172033] mt-0.5">
                    {unified.length}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Main transaction container */}
          {unified.length === 0 ? (
            <div className="bg-white border border-[#e4e8ee] rounded-2xl shadow-[0_8px_30px_rgba(20,32,50,0.04)]">
              <div className="flex flex-col items-center justify-center py-20 px-6 text-center">

                <div className="w-14 h-14 rounded-2xl bg-[#f1f4f8] border border-[#e2e7ee] flex items-center justify-center mb-5">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-[#7b8798]"
                  >
                    <path d="M3 6h18" />
                    <path d="M3 10h18" />
                    <path d="M3 14h12" />
                    <path d="M3 18h9" />
                  </svg>
                </div>

                <h2 className="text-base font-semibold text-[#263247]">
                  No transactions yet
                </h2>

                <p className="text-sm text-[#8a95a5] mt-1 max-w-sm">
                  Your account activity will appear here once you make a
                  deposit, withdrawal, or investment.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#e4e8ee] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(20,32,50,0.04)]">

              {/* Desktop table header */}
              <div className="hidden sm:grid grid-cols-[1fr_180px_150px] items-center px-6 py-4 bg-[#f9fafb] border-b border-[#e9edf2]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8b96a8]">
                  Activity
                </p>

                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8b96a8]">
                  Amount
                </p>

                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8b96a8] text-right">
                  Status
                </p>
              </div>

              {/* Transactions */}
              <div className="divide-y divide-[#edf0f4]">
                {unified.map((tx) => {
                  const styles = typeStyles(tx.type);

                  return (
                    <Card
                      key={`${tx.type}-${tx.id}`}
                      className="border-0 rounded-none shadow-none bg-transparent"
                    >
                      <CardContent className="px-5 sm:px-6 py-5">

                        <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px_150px] sm:items-center gap-4">

                          {/* Activity */}
                          <div className="flex items-center gap-4 min-w-0">

                            <div
                              className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${styles.iconClass}`}
                            >
                              <span className="text-base font-medium">
                                {styles.icon}
                              </span>
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-[#202c3f] truncate">
                                  {tx.label}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 mt-1">
                                <span
                                  className={`text-[9px] font-semibold uppercase tracking-[0.12em] ${styles.labelClass}`}
                                >
                                  {tx.type}
                                </span>

                                <span className="w-1 h-1 rounded-full bg-[#c6ccd5]" />

                                <p className="text-xs text-[#8b96a8]">
                                  {tx.date.toLocaleDateString()}
                                </p>

                                <span className="hidden sm:block w-1 h-1 rounded-full bg-[#c6ccd5]" />

                                <p className="hidden sm:block text-xs text-[#8b96a8]">
                                  {tx.date.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Amount */}
                          <div className="flex items-center justify-between sm:block">
                            <span className="sm:hidden text-[10px] uppercase tracking-[0.12em] font-semibold text-[#9aa4b3]">
                              Amount
                            </span>

                            <p
                              className={`text-base font-semibold tracking-tight ${
                                tx.type === "DEPOSIT"
                                  ? "text-[#16805b]"
                                  : tx.type === "WITHDRAWAL"
                                  ? "text-[#c4515b]"
                                  : "text-[#334155]"
                              }`}
                            >
                              {sign(tx.type)}
                              {formatCurrency(tx.amount)}
                            </p>
                          </div>

                          {/* Status */}
                          <div className="flex items-center justify-between sm:justify-end">
                            <span className="sm:hidden text-[10px] uppercase tracking-[0.12em] font-semibold text-[#9aa4b3]">
                              Status
                            </span>

                            <span
                              className={`inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] font-semibold px-3 py-2 rounded-lg border ${statusColor(
                                tx.status
                              )}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  tx.status === "PENDING"
                                    ? "bg-amber-400"
                                    : tx.status === "APPROVED" ||
                                      tx.status === "ACTIVE" ||
                                      tx.status === "COMPLETED"
                                    ? "bg-emerald-400"
                                    : "bg-rose-400"
                                }`}
                              />

                              {tx.status}
                            </span>
                          </div>

                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-10 bg-[#dce1e8]" />

            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#a2abb8]">
              Northbridge Capital · Secure Account Activity
            </span>

            <div className="h-px w-10 bg-[#dce1e8]" />
          </div>
        </div>
      </main>
    </>
  );
}