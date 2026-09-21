"use server";

import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { investmentPlanSchema } from "@/lib/validations";

export async function createPlan(formData: FormData) {
  await requireAdmin();

  const parsed = investmentPlanSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    minInvestment: formData.get("minInvestment"),
    maxInvestment: formData.get("maxInvestment") || undefined,
    durationDays: formData.get("durationDays"),
    riskCategory: formData.get("riskCategory"),
    strategy: formData.get("strategy"),
    targetReturnLabel: formData.get("targetReturnLabel") || undefined,
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  await prisma.investmentPlan.create({
    data: {
      ...parsed.data,
      maxInvestment: parsed.data.maxInvestment ?? null,
      targetReturnLabel: parsed.data.targetReturnLabel ?? null,
      status: "ACTIVE",
    },
  });

  redirect("/admin/plans");
}

export async function togglePlanStatus(planId: string, currentStatus: string) {
  await requireAdmin();

  const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

  await prisma.investmentPlan.update({
    where: { id: planId },
    data: { status: newStatus },
  });

  revalidatePath("/admin/plans");
}