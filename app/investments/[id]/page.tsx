import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvestForm } from "@/components/invest-form";

export default async function InvestmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  const plan = await prisma.investmentPlan.findUnique({
    where: { id },
  });

  if (!plan || plan.status !== "ACTIVE") {
    notFound();
  }

  return (
    <>
      <Navbar userName={session.user.name} role={session.user.role} />

      <main className="min-h-screen bg-[#05070a] text-white px-6 py-8 sm:py-10 relative overflow-hidden">
        {/* Subtle background atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle,rgba(255,255,255,0.045),transparent_65%)]" />
        </div>

        <div className="relative max-w-3xl mx-auto flex flex-col gap-6">

          {/* Plan Details */}
          <Card className="bg-[#0a0d11] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            <CardHeader className="px-6 pt-7 pb-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 mb-3">
                    Investment Strategy
                  </p>

                  <CardTitle className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                    {plan.name}
                  </CardTitle>
                </div>

                <div className="w-9 h-9 shrink-0 rounded-lg border border-white/[0.1] bg-white/[0.03] flex items-center justify-center">
                  <div className="w-4 h-4 border-[1.5px] border-white/60 rotate-45" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-7 flex flex-col gap-6">

              <p className="text-sm sm:text-[15px] leading-7 text-white/50 max-w-2xl">
                {plan.description}
              </p>

              {/* Key terms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <div className="rounded-xl border border-white/[0.07] bg-[#07090c] p-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/30 mb-2">
                    Investment Range
                  </p>

                  <p className="text-sm font-medium text-white/85">
                    {formatCurrency(Number(plan.minInvestment))}
                    {plan.maxInvestment &&
                      ` — ${formatCurrency(Number(plan.maxInvestment))}`}
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-[#07090c] p-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/30 mb-2">
                    Duration
                  </p>

                  <p className="text-sm font-medium text-white/85">
                    {plan.durationDays} days
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-[#07090c] p-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/30 mb-2">
                    Risk Category
                  </p>

                  <p className="text-sm font-medium text-white/85">
                    {plan.riskCategory}
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-[#07090c] p-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/30 mb-2">
                    Strategy
                  </p>

                  <p className="text-sm font-medium text-white/85">
                    {plan.strategy}
                  </p>
                </div>

              </div>

              {plan.targetReturnLabel && (
                <div className="border-t border-white/[0.07] pt-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-2">
                    Target Return
                  </p>

                  <p className="text-sm text-white/60">
                    {plan.targetReturnLabel}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Investment Form */}
          <Card className="bg-[#0a0d11] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.3)]">
            <CardHeader className="px-6 pt-7 pb-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 mb-2">
                Capital Allocation
              </p>

              <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                Invest in this plan
              </CardTitle>

              <p className="text-sm text-white/35 mt-1">
                Enter the amount you would like to allocate to this strategy.
              </p>
            </CardHeader>

            <CardContent className="px-6 pb-7">
              <div className="rounded-xl border border-white/[0.07] bg-[#07090c] p-4 sm:p-5">
                <InvestForm
                  planId={plan.id}
                  minInvestment={Number(plan.minInvestment)}
                  maxInvestment={
                    plan.maxInvestment ? Number(plan.maxInvestment) : null
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Institutional footer */}
          <div className="flex items-center justify-center gap-2 pt-2 pb-4">
            <div className="w-2.5 h-2.5 border border-white/25 rotate-45" />
            <span className="text-[9px] uppercase tracking-[0.22em] text-white/20">
              Northbridge Capital · Investment Strategy
            </span>
          </div>

        </div>
      </main>
    </>
  );
}