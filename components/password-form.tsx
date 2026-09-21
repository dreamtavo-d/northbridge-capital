"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setError("");

    const { error: changeError } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    });

    if (changeError) {
      setStatus("error");
      setError(changeError.message || "Could not change password.");
      return;
    }

    setStatus("saved");
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="current-password"
          className="text-[10px] uppercase tracking-[0.16em] text-white/40"
        >
          Current Password
        </label>

        <input
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="h-11 w-full bg-[#07090c] border border-white/[0.1] rounded-lg px-4 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:border-white/30 focus:bg-[#090c10] focus:ring-1 focus:ring-white/10"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="new-password"
          className="text-[10px] uppercase tracking-[0.16em] text-white/40"
        >
          New Password
        </label>

        <input
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={8}
          className="h-11 w-full bg-[#07090c] border border-white/[0.1] rounded-lg px-4 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:border-white/30 focus:bg-[#090c10] focus:ring-1 focus:ring-white/10"
        />

        <p className="text-[9px] text-white/20 tracking-[0.03em]">
          Minimum 8 characters
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/[0.12] bg-red-500/[0.04] px-3 py-2.5">
          <p className="text-xs text-red-300/70">{error}</p>
        </div>
      )}

      {status === "saved" && (
        <div className="rounded-lg border border-green-500/[0.12] bg-green-500/[0.04] px-3 py-2.5">
          <p className="text-xs text-green-300/70">
            Password changed successfully.
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "saving"}
        className="h-11 mt-1 rounded-lg bg-white text-black hover:bg-white/90 disabled:bg-white/50 disabled:text-black/60 font-medium text-sm transition-all duration-200 shadow-[0_8px_25px_rgba(255,255,255,0.06)]"
      >
        {status === "saving" ? "Updating..." : "Change Password"}
      </Button>
    </form>
  );
}