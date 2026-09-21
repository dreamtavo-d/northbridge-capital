"use server";

import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleUserActive(userId: string, currentlyActive: boolean) {
  const session = await requireAdmin();

  // Prevent an admin from accidentally locking themselves out
  if (userId === session.user.id) {
    throw new Error("You cannot suspend your own account.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { isActive: !currentlyActive },
  });

  await prisma.auditLog.create({
    data: {
      adminId: session.user.id,
      action: currentlyActive ? "SUSPEND_USER" : "ACTIVATE_USER",
      targetType: "User",
      targetId: userId,
      details: currentlyActive ? "User suspended" : "User activated",
    },
  });

  revalidatePath("/admin/users");
}