"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { depositSchema } from "@/lib/validations";

export async function createDeposit(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const parsed = depositSchema.safeParse({
    amount: formData.get("amount"),
    reference: formData.get("reference") || undefined,
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  await prisma.deposit.create({
    data: {
      userId: session.user.id,
      amount: parsed.data.amount,
      reference: parsed.data.reference || null,
      status: "PENDING",
    },
  });

  redirect("/dashboard?deposit=1");
}