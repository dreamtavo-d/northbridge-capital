
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createDeposit } from "./actions";

export default async function DepositPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login");

  return (
    <>
      <Navbar userName={session.user.name} role={session.user.role} />

      <main className="min-h-screen bg-[#f4f7fb] text-[#111827]">
        {/* Background atmosphere */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-[#2563eb]/[0.07] blur-3xl" />
          <div className="absolute top-[35%] left-[-180px] h-[420px] w-[420px] rounded-full bg-[#172033]/[0.045] blur-3xl" />
          <div className="absolute bottom-[-180px] right-[20%] h-[400px] w-[400px] rounded-full bg-[#60a5fa]/[0.035] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">

          {/* Page heading */}
          <div className="mb-8 max-w-2xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#2563eb]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2563eb]">
                Capital Funding
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#111827] sm:text-4xl">
              Fund your account
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#667085]">
              Submit a deposit request and provide the relevant payment
              reference. Your funding will be reviewed before being credited
              to your account.
            </p>
          </div>

          {/* Main layout */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">

            {/* Deposit form */}
            <Card className="overflow-hidden rounded-2xl border-[#dfe5ee] bg-white shadow-[0_12px_40px_rgba(16,24,40,0.06)]">

              {/* Blue + gold institutional accent */}
              <div className="h-[3px] w-full bg-gradient-to-r from-[#172033] via-[#2563eb] to-[#b89552]" />

              <CardHeader className="border-b border-[#edf0f5] px-6 py-6 sm:px-8">
                <div className="flex items-start justify-between gap-5">

                  <div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#dbe7ff] bg-[#eff5ff]">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        className="text-[#2563eb]"
                      >
                        <path d="M12 3v18" />
                        <path d="M17 7H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" />
                      </svg>
                    </div>

                    <CardTitle className="text-xl font-semibold tracking-tight text-[#111827]">
                      Deposit details
                    </CardTitle>

                    <p className="mt-1.5 text-sm text-[#667085]">
                      Enter the amount you have transferred and your payment
                      reference.
                    </p>
                  </div>

                  {/* Status */}
                  <div className="hidden rounded-xl border border-[#dfe5ee] bg-[#f8fafc] px-3 py-2 text-right sm:block">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#98a2b3]">
                      Status
                    </p>

                    <div className="mt-1 flex items-center justify-end gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.45)]" />

                      <span className="text-xs font-medium text-[#475467]">
                        Ready
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-6 py-7 sm:px-8">
                <form action={createDeposit} className="flex flex-col gap-6">

                  {/* Amount */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="amount"
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-[#475467]"
                    >
                      Deposit amount
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#98a2b3]">
                        $
                      </span>

                      <input
                        id="amount"
                        type="number"
                        name="amount"
                        min="1"
                        step="0.01"
                        required
                        placeholder="0.00"
                        className="h-14 w-full rounded-xl border border-[#dfe3e8] bg-[#fafbfc] pl-9 pr-4 text-base font-medium text-[#111827] outline-none transition-all placeholder:text-[#b4bbc5] focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
                      />
                    </div>

                    <p className="text-xs text-[#98a2b3]">
                      Enter the amount you transferred to Northbridge Capital.
                    </p>
                  </div>

                  {/* Reference */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="reference"
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-[#475467]"
                    >
                      Payment reference

                      <span className="ml-1.5 font-normal normal-case tracking-normal text-[#98a2b3]">
                        Optional
                      </span>
                    </label>

                    <input
                      id="reference"
                      type="text"
                      name="reference"
                      placeholder="e.g. bank transfer ID"
                      className="h-14 w-full rounded-xl border border-[#dfe3e8] bg-[#fafbfc] px-4 text-sm text-[#111827] outline-none transition-all placeholder:text-[#b4bbc5] focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
                    />

                    <p className="text-xs text-[#98a2b3]">
                      Adding the reference can help our team identify your
                      payment.
                    </p>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-[#172033] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(23,32,51,0.15)] transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-[0_10px_28px_rgba(37,99,235,0.2)]"
                  >
                    Submit Deposit Request

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="ml-2"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </Button>

                  {/* Review notice */}
                  <div className="flex gap-3 rounded-xl border border-[#dbe7ff] bg-[#f4f8ff] px-4 py-4">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="mt-0.5 shrink-0 text-[#2563eb]"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 10v6" />
                      <path d="M12 7h.01" />
                    </svg>

                    <p className="text-xs leading-5 text-[#667085]">
                      Deposits are reviewed and confirmed by the Northbridge
                      Capital team before funds appear in your account.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Information panel */}
            <aside className="flex flex-col gap-4">

              {/* Funding review */}
              <div className="rounded-2xl border border-[#dfe5ee] bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.04)]">

                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#172033] text-white shadow-[0_6px_18px_rgba(23,32,51,0.12)]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>

                <h2 className="text-sm font-semibold text-[#111827]">
                  Funding review
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#667085]">
                  Every deposit request is reviewed before the funds are
                  credited to your Northbridge Capital account.
                </p>

                <div className="mt-5 space-y-4">

                  {/* Step 1 */}
                  <div className="flex gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eff5ff] text-[9px] font-bold text-[#2563eb]">
                      1
                    </span>

                    <div>
                      <p className="text-xs font-semibold text-[#344054]">
                        Submit request
                      </p>

                      <p className="mt-0.5 text-[11px] text-[#98a2b3]">
                        Provide your transfer details.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eff5ff] text-[9px] font-bold text-[#2563eb]">
                      2
                    </span>

                    <div>
                      <p className="text-xs font-semibold text-[#344054]">
                        Verification
                      </p>

                      <p className="mt-0.5 text-[11px] text-[#98a2b3]">
                        Our team reviews the payment.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eff5ff] text-[9px] font-bold text-[#2563eb]">
                      3
                    </span>

                    <div>
                      <p className="text-xs font-semibold text-[#344054]">
                        Account credited
                      </p>

                      <p className="mt-0.5 text-[11px] text-[#98a2b3]">
                        Approved funds appear in your account.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Northbridge information */}
              <div className="relative overflow-hidden rounded-2xl border border-[#1e3a5f] bg-[#172033] p-6 text-white">

                {/* Blue glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#2563eb]/20 blur-3xl" />

                <div className="relative">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7db3ff]">
                    Northbridge Capital
                  </p>

                  <p className="mt-3 text-sm leading-6 text-white/65">
                    Disciplined investment. Strategic thinking. Long-term value.
                  </p>

                  <div className="mt-5 h-px bg-white/10" />

                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#60a5fa] shadow-[0_0_8px_rgba(96,165,250,0.7)]" />

                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/35">
                      Secure capital management
                    </p>
                  </div>
                </div>
              </div>

              {/* Institutional note */}
              <div className="rounded-2xl border border-[#dfe5ee] bg-white p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-[#2563eb] shadow-[0_0_8px_rgba(37,99,235,0.4)]" />

                  <div>
                    <p className="text-xs font-semibold text-[#344054]">
                      Capital operations
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-[#98a2b3]">
                      Funding requests remain subject to internal review and
                      account verification procedures.
                    </p>
                  </div>
                </div>
              </div>

            </aside>
          </div>

          {/* Footer */}
          <footer className="mt-8 flex flex-col gap-3 border-t border-[#dfe3e8] pt-5 text-[8px] uppercase tracking-[0.2em] text-[#98a2b3] sm:flex-row sm:items-center sm:justify-between">
            <span>Northbridge Capital</span>

            <div className="flex items-center gap-3">
              <span>Private &amp; Confidential</span>
              <span className="h-1 w-1 bg-[#2563eb]/50" />
              <span>Client Portal</span>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
