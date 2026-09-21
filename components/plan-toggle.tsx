"use client";

import { useState } from "react";
import { togglePlanStatus } from "@/app/admin/plans/actions";

export function PlanToggle({
  planId,
  status,
}: {
  planId: string;
  status: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    await togglePlanStatus(planId, status);
    setLoading(false);
  };

  const isActive = status === "ACTIVE";

  return (
    <div className="flex items-center gap-3">
      {/* Status */}
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-[9px] font-medium uppercase tracking-[0.14em] ${
          isActive
            ? "bg-blue-500/[0.06] border-blue-500/[0.15] text-blue-300/80"
            : "bg-white/[0.025] border-white/[0.08] text-white/30"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isActive ? "bg-blue-400/80" : "bg-white/20"
          }`}
        />

        {status}
      </span>

      {/* Toggle */}
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`h-9 px-3.5 rounded-lg border text-[11px] font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
          isActive
            ? "border-white/[0.1] bg-white/[0.025] text-white/55 hover:bg-white/[0.07] hover:text-white hover:border-white/[0.18]"
            : "border-blue-500/[0.2] bg-blue-500/[0.06] text-blue-300/80 hover:bg-blue-500/[0.12] hover:text-blue-200 hover:border-blue-500/[0.3]"
        }`}
      >
        {loading
          ? "Updating..."
          : isActive
            ? "Deactivate"
            : "Activate"}
      </button>
    </div>
  );
}