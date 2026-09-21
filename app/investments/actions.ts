"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createInvestment(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const planId = formData.get("planId") as string;
  const amount = Number(formData.get("amount"));

  const plan = await prisma.investmentPlan.findUnique({
    where: { id: planId },
  });

  if (!plan || plan.status !== "ACTIVE") {
    throw new Error("This investment plan is not available.");
  }

  if (amount < Number(plan.minInvestment)) {
    throw new Error(
      `Minimum investment for this plan is ${plan.minInvestment}.`
    );
  }

  if (plan.maxInvestment && amount > Number(plan.maxInvestment)) {
    throw new Error(
      `Maximum investment for this plan is ${plan.maxInvestment}.`
    );
  }

  await prisma.investment.create({
    data: {
      userId: session.user.id,
      planId: plan.id,
      amount,
      status: "PENDING",
    },
  });

  redirect("/dashboard?invested=1");
}