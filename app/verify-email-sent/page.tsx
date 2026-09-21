import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerifyEmailSentPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fa] text-[#172033] flex items-center justify-center px-5 py-10 relative overflow-hidden">

      {/* Subtle background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[700px] h-[420px] rounded-full bg-[#315a8f]/[0.05] blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-120px] w-[420px] h-[420px] rounded-full bg-[#8b96a8]/[0.06] blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Brand */}
        <Link
          href="/"
          className="flex flex-col items-center mb-8 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#172033] flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105">
              <div className="w-3.5 h-3.5 border-[1.5px] border-white rotate-45" />
            </div>

            <div className="leading-none">
              <div className="text-[13px] font-semibold tracking-[0.18em] text-[#172033]">
                NORTHBRIDGE
              </div>

              <div className="text-[8px] tracking-[0.3em] text-[#8a95a5] mt-1.5">
                CAPITAL
              </div>
            </div>
          </div>
        </Link>

        {/* Verification Card */}
        <Card className="border-[#e2e7ee] bg-white rounded-2xl shadow-[0_20px_60px_rgba(20,32,50,0.08)] overflow-hidden">

          {/* Top accent */}
          <div className="h-1 w-full bg-gradient-to-r from-[#172033] via-[#315a8f] to-[#7d8da4]" />

          <CardHeader className="items-center text-center pt-9 pb-5 px-7">

            {/* Email icon */}
            <div className="relative w-16 h-16 rounded-2xl bg-[#eef3f8] border border-[#dce4ed] flex items-center justify-center mb-5">

              <div className="absolute inset-0 rounded-2xl border border-[#315a8f]/10 scale-[1.18]" />

              <svg
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#315a8f]"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7d8999]">
                Verification required
              </span>
            </div>

            <CardTitle className="text-2xl font-semibold tracking-[-0.025em] text-[#172033]">
              Check your email
            </CardTitle>

          </CardHeader>

          <CardContent className="px-7 pb-8">

            <div className="rounded-xl bg-[#f7f9fb] border border-[#e8ecf1] px-5 py-4 mb-6">
              <p className="text-sm leading-6 text-[#657286] text-center">
                We&apos;ve sent a verification link to your email address.
                Please click the link to activate your account before logging
                in.
              </p>
            </div>

            {/* Information row */}
            <div className="flex items-start gap-3 px-1">
              <div className="w-7 h-7 rounded-lg bg-[#eef3f8] flex items-center justify-center shrink-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#657286]"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5" />
                  <path d="M12 8h.01" />
                </svg>
              </div>

              <p className="text-xs leading-5 text-[#8a95a5]">
                If you don&apos;t see the message, check your spam or junk
                folder.
              </p>
            </div>

          </CardContent>
        </Card>

        {/* Back to login */}
        <div className="text-center mt-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#315a8f] hover:text-[#172033] transition-colors"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>

            Back to log in
          </Link>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-3 mt-9">
          <div className="h-px w-8 bg-[#dce1e8]" />

          <span className="text-[8px] uppercase tracking-[0.2em] text-[#a1aab7]">
            Northbridge Capital
          </span>

          <div className="h-px w-8 bg-[#dce1e8]" />
        </div>

      </div>
    </main>
  );
}