"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createInvestment } from "@/app/investments/actions";

export function InvestForm({
  planId,
  minInvestment,
  maxInvestment,
}: {
  planId: string;
  minInvestment: number;
  maxInvestment: number | null;
}) {
  const [amount, setAmount] = useState(minInvestment);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setLoading(true);
    try {
      await createInvestment(formData);
    } catch (e) {
      setLoading(false);
      setError(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-3">
      <input type="hidden" name="planId" value={planId} />
      <label className="text-sm text-charcoal-light">
        Amount (min {minInvestment}
        {maxInvestment ? `, max ${maxInvestment}` : ""})
      </label>
      <input
        type="number"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        min={minInvestment}
        max={maxInvestment ?? undefined}
        required
        className="border rounded-md px-3 py-2"
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Request Investment"}
      </Button>
      <p className="text-xs text-charcoal-light">
        Your request will be reviewed and approved before funds are allocated.
      </p>
    </form>
  );
}