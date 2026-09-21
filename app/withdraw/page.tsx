
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

import { createWithdrawal } from "./actions";

export default async function WithdrawPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  return (
    <>
      <Navbar
        userName={session.user.name}
        role={session.user.role}
      />

      <main className="min-h-screen bg-[#f5f7fa] text-[#172033] px-5 py-8 sm:px-6 sm:py-12 relative overflow-hidden">

        {/* Background atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          {/* Primary blue glow */}
          <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[700px] h-[420px] rounded-full bg-[#315a8f]/[0.06] blur-3xl" />

          {/* Secondary blue glow */}
          <div className="absolute top-[25%] right-[-180px] w-[420px] h-[420px] rounded-full bg-[#2563eb]/[0.035] blur-3xl" />

          {/* Soft navy glow */}
          <div className="absolute bottom-[-220px] left-[-140px] w-[450px] h-[450px] rounded-full bg-[#172033]/[0.04] blur-3xl" />
        </div>

        <div className="relative max-w-xl mx-auto">

          {/* Page heading */}
          <div className="mb-7">

            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#315a8f] shadow-[0_0_8px_rgba(49,90,143,0.35)]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#315a8f]">
                Capital Distribution
              </p>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-[#172033]">
              Request a Withdrawal
            </h1>

            <p className="text-sm text-[#748094] mt-2 leading-6 max-w-lg">
              Submit a withdrawal request for review and processing.
            </p>
          </div>

          {/* Withdrawal Card */}
          <Card className="bg-white border-[#dfe5ec] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(20,32,50,0.08)]">

            {/* Blue institutional accent */}
            <div className="h-1 w-full bg-gradient-to-r from-[#172033] via-[#315a8f] to-[#4f7fb5]" />

            <CardHeader className="px-6 sm:px-8 pt-7 pb-5">

              <div className="flex items-center justify-between gap-5">

                <div>
                  <CardTitle className="text-lg font-semibold text-[#172033] tracking-tight">
                    Withdrawal Details
                  </CardTitle>

                  <p className="text-xs text-[#8994a4] mt-1.5">
                    Enter the amount you would like to withdraw.
                  </p>
                </div>

                {/* Withdrawal icon */}
                <div className="w-11 h-11 shrink-0 rounded-xl bg-[#edf3fa] border border-[#d7e2ef] flex items-center justify-center">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#315a8f]"
                  >
                    <path d="M12 3v13" />
                    <path d="m7 11 5 5 5-5" />
                    <path d="M5 21h14" />
                  </svg>
                </div>

              </div>
            </CardHeader>

            <CardContent className="px-6 sm:px-8 pb-8">

              <form
                action={createWithdrawal}
                className="flex flex-col gap-6"
              >

                {/* Amount */}
                <div className="flex flex-col gap-2.5">

                  <label
                    htmlFor="amount"
                    className="text-xs font-semibold text-[#4f5d70]"
                  >
                    Withdrawal Amount
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#315a8f]">
                      Amount
                    </span>

                    <input
                      id="amount"
                      type="number"
                      name="amount"
                      min="1"
                      step="0.01"
                      required
                      className="h-13 w-full bg-[#f8fafc] border border-[#dfe5ec] rounded-xl pl-[72px] pr-4 text-sm font-medium text-[#172033] placeholder:text-[#b0b8c4] outline-none transition-all duration-200 focus:border-[#315a8f]/70 focus:bg-white focus:ring-4 focus:ring-[#315a8f]/[0.09]"
                    />

                  </div>

                  <p className="text-[11px] text-[#98a2b1]">
                    Enter the amount you wish to request for withdrawal.
                  </p>

                </div>

                {/* Review notice */}
                <div className="flex gap-3 rounded-xl border border-[#dce5ef] bg-[#f7faff] px-4 py-3.5">

                  <div className="w-7 h-7 shrink-0 rounded-lg bg-[#eaf1f8] flex items-center justify-center">

                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#315a8f]"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 11v5" />
                      <path d="M12 8h.01" />
                    </svg>

                  </div>

                  <div>
                    <p className="text-xs font-medium text-[#536174]">
                      Review &amp; processing
                    </p>

                    <p className="text-[11px] leading-5 text-[#8a95a5] mt-0.5">
                      Your withdrawal will be reviewed and processed by our
                      team.
                    </p>
                  </div>

                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-[#172033] hover:bg-[#253b5d] text-white font-medium text-sm transition-all duration-200 shadow-[0_10px_25px_rgba(23,32,51,0.12)] hover:shadow-[0_12px_28px_rgba(49,90,143,0.18)]"
                >
                  Submit Withdrawal Request

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>

                </Button>

              </form>

            </CardContent>
          </Card>

          {/* Security / institutional footer */}
          <div className="flex items-center justify-center gap-3 mt-7">

            <div className="h-px w-8 bg-[#d5deea]" />

            <span className="text-[8px] uppercase tracking-[0.2em] text-[#8f9bad]">
              Northbridge Capital · Capital Distribution
            </span>

            <div className="h-px w-8 bg-[#d5deea]" />

          </div>

        </div>
      </main>
    </>
  );
}