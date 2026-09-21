import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  const { id } = await params;

  const withdrawal = await prisma.withdrawal.findUnique({ where: { id } });
  if (!withdrawal || withdrawal.status !== "PENDING") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  await prisma.$transaction([
    prisma.withdrawal.update({ where: { id }, data: { status: "APPROVED" } }),
    prisma.auditLog.create({
      data: {
        adminId: session.user.id,
        action: "APPROVE_WITHDRAWAL",
        targetType: "Withdrawal",
        targetId: id,
        details: `Approved withdrawal of ${withdrawal.amount}`,
      },
    }),
  ]);

  return NextResponse.redirect(new URL("/admin", request.url));
}