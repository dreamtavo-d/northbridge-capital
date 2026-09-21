import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  const { id } = await params;

  const deposit = await prisma.deposit.findUnique({ where: { id } });
  if (!deposit || deposit.status !== "PENDING") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  await prisma.$transaction([
    prisma.deposit.update({ where: { id }, data: { status: "REJECTED" } }),
    prisma.auditLog.create({
      data: {
        adminId: session.user.id,
        action: "REJECT_DEPOSIT",
        targetType: "Deposit",
        targetId: id,
        details: `Rejected deposit of ${deposit.amount}`,
      },
    }),
  ]);

  return NextResponse.redirect(new URL("/admin", request.url));
}