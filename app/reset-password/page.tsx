"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("This reset link is invalid or has expired.");
      return;
    }

    setStatus("saving");
    setError("");

    const { error: resetError } = await authClient.resetPassword({
      newPassword,
      token,
    });

    if (resetError) {
      setStatus("error");
      setError(resetError.message || "Could not reset password.");
      return;
    }

    router.push("/login?reset=1");
  };

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="w-full max-w-sm">
        <Link href="/" className="flex flex-col items-center gap-1 mb-8">
          <span className="text-gold font-bold tracking-[0.18em] text-sm">
            NORTHBRIDGE
          </span>
          <span className="text-offwhite/30 text-[10px] tracking-[0.28em]">
            CAPITAL
          </span>
        </Link>

        <Card className="border-white/10 bg-white/[0.03] backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-offwhite">Set a new password</CardTitle>
          </CardHeader>
          <CardContent>
            {!token ? (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                <p className="text-sm text-red-300">
                  This reset link is invalid or has expired. Please request a
                  new one.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium uppercase tracking-wide text-offwhite/50">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                    className="bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-offwhite placeholder:text-offwhite/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={status === "saving"}
                  className="bg-gold hover:bg-gold-light text-navy font-semibold mt-1"
                >
                  {status === "saving" ? "Saving..." : "Reset Password"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}