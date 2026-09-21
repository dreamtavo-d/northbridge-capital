import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  const { id } = await params;

  const investment = await prisma.investment.findUnique({ where: { id } });

  if (!investment || investment.status !== "PENDING") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  await prisma.$transaction([
    prisma.investment.update({
      where: { id },
      data: { status: "CANCELLED" },
    }),
    prisma.auditLog.create({
      data: {
        adminId: session.user.id,
        action: "REJECT_INVESTMENT",
        targetType: "Investment",
        targetId: id,
        details: `Rejected investment of ${investment.amount}`,
      },
    }),
  ]);

  return NextResponse.redirect(new URL("/admin", request.url));
}