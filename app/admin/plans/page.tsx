import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanToggle } from "@/components/plan-toggle";
import { createPlan } from "./actions";

export default async function AdminPlansPage() {
  const session = await requireAdmin();

  const plans = await prisma.investmentPlan.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Navbar userName={session.user.name} role={session.user.role} />

      <main className="relative min-h-screen overflow-hidden bg-[#05070a] text-white">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.07),transparent_65%)]" />
        </div>

        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 py-8 sm:px-8 sm:py-10">
          {/* Header */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-5 bg-blue-500/60" />
              <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-blue-300/60">
                Administration
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
              Investment Plans
            </h1>

            <p className="mt-2 text-sm text-white/35">
              Create and manage available investment strategies.
            </p>
          </div>

          {/* Create Plan */}
          <Card className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0d11] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <CardHeader className="border-b border-white/[0.07] px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-500/[0.15] bg-blue-500/[0.05]">
                  <span className="text-sm text-blue-300/80">+</span>
                </div>

                <div>
                  <CardTitle className="text-sm font-medium text-white">
                    Create New Plan
                  </CardTitle>
                  <p className="mt-1 text-[11px] text-white/30">
                    Define the terms and parameters for a new strategy.
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-5 py-6 sm:px-6">
              <form
                action={createPlan}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">
                    Plan Name
                  </label>
                  <input
                    name="name"
                    placeholder="Plan name"
                    required
                    className="h-11 w-full rounded-lg border border-white/[0.1] bg-[#07090c] px-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/20 focus:border-blue-500/40 focus:bg-[#090c10] focus:ring-1 focus:ring-blue-500/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Description"
                    required
                    rows={3}
                    className="w-full resize-none rounded-lg border border-white/[0.1] bg-[#07090c] px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/20 focus:border-blue-500/40 focus:bg-[#090c10] focus:ring-1 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">
                    Minimum Investment
                  </label>
                  <input
                    name="minInvestment"
                    type="number"
                    placeholder="Minimum investment"
                    required
                    className="h-11 w-full rounded-lg border border-white/[0.1] bg-[#07090c] px-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/20 focus:border-blue-500/40 focus:bg-[#090c10] focus:ring-1 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">
                    Maximum Investment
                  </label>
                  <input
                    name="maxInvestment"
                    type="number"
                    placeholder="Maximum investment (optional)"
                    className="h-11 w-full rounded-lg border border-white/[0.1] bg-[#07090c] px-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/20 focus:border-blue-500/40 focus:bg-[#090c10] focus:ring-1 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">
                    Duration
                  </label>
                  <input
                    name="durationDays"
                    type="number"
                    placeholder="Duration (days)"
                    required
                    className="h-11 w-full rounded-lg border border-white/[0.1] bg-[#07090c] px-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/20 focus:border-blue-500/40 focus:bg-[#090c10] focus:ring-1 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">
                    Risk Category
                  </label>
                  <select
                    name="riskCategory"
                    required
                    defaultValue="LOW"
                    className="h-11 w-full appearance-none rounded-lg border border-white/[0.1] bg-[#07090c] px-4 text-sm text-white outline-none transition-all duration-200 focus:border-blue-500/40 focus:bg-[#090c10] focus:ring-1 focus:ring-blue-500/10"
                  >
                    <option value="LOW" className="bg-[#07090c]">
                      Low Risk
                    </option>
                    <option value="MEDIUM" className="bg-[#07090c]">
                      Medium Risk
                    </option>
                    <option value="HIGH" className="bg-[#07090c]">
                      High Risk
                    </option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">
                    Strategy
                  </label>
                  <input
                    name="strategy"
                    placeholder="Strategy"
                    required
                    className="h-11 w-full rounded-lg border border-white/[0.1] bg-[#07090c] px-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/20 focus:border-blue-500/40 focus:bg-[#090c10] focus:ring-1 focus:ring-blue-500/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">
                    Target Return
                  </label>
                  <input
                    name="targetReturnLabel"
                    placeholder="Target return label (e.g. 'Target 6-9% annually (not guaranteed)')"
                    className="h-11 w-full rounded-lg border border-white/[0.1] bg-[#07090c] px-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/20 focus:border-blue-500/40 focus:bg-[#090c10] focus:ring-1 focus:ring-blue-500/10"
                  />
                </div>

                <Button
                  type="submit"
                  className="h-11 rounded-lg bg-white text-sm font-medium text-black shadow-[0_8px_25px_rgba(255,255,255,0.06)] transition-all duration-200 hover:bg-white/90 sm:col-span-2"
                >
                  Create Plan
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing Plans */}
          <section>
            <div className="mb-5 flex items-end justify-between border-b border-white/[0.07] pb-4">
              <div>
                <div className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/25">
                  Portfolio Configuration
                </div>
                <h2 className="mt-1 text-lg font-medium text-white">
                  Existing Plans
                </h2>
              </div>

              <div className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                {plans.length} {plans.length === 1 ? "Plan" : "Plans"}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className="rounded-xl border border-white/[0.07] bg-[#0a0d11] transition-all duration-200 hover:border-white/[0.11]"
                >
                  <CardContent className="flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400/70" />

                        <p className="truncate text-sm font-medium text-white/90">
                          {plan.name}
                        </p>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.08em] text-white/30">
                        <span>
                          Min:{" "}
                          <span className="text-white/55">
                            {formatCurrency(Number(plan.minInvestment))}
                          </span>
                        </span>

                        <span className="text-white/15">·</span>

                        <span>
                          {plan.riskCategory} risk
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <PlanToggle
                        planId={plan.id}
                        status={plan.status}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}

              {plans.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.015] px-6 py-12 text-center">
                  <p className="text-sm text-white/35">
                    No investment plans created yet.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-white/[0.06] pt-6">
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/20">
              Northbridge Capital · Plan Administration
            </p>
          </div>
        </div>
      </main>
    </>
  );
}