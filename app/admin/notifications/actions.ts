"use server";

import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { notificationSchema } from "@/lib/validations";

export async function sendNotification(formData: FormData) {
  await requireAdmin();

  const parsed = notificationSchema.safeParse({
    userEmail: formData.get("userEmail"),
    title: formData.get("title"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.userEmail.toLowerCase() },
  });
  if (!user) {
    throw new Error("No user found with that email.");
  }

  await prisma.notification.create({
    data: {
      userId: user.id,
      title: parsed.data.title,
      message: parsed.data.message,
    },
  });

  redirect("/admin/notifications?sent=1");
}