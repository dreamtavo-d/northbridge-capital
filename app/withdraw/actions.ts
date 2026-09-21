"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { withdrawalSchema } from "@/lib/validations";

export async function createWithdrawal(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const parsed = withdrawalSchema.safeParse({
    amount: formData.get("amount"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  await prisma.withdrawal.create({
    data: {
      userId: session.user.id,
      amount: parsed.data.amount,
      status: "PENDING",
    },
  });

  redirect("/dashboard?withdraw=1");
}