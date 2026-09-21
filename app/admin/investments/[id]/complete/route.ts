import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  const { id } = await params;

  const formData = await request.formData();
  const returnAmount = Number(formData.get("returnAmount"));
  const notes = formData.get("notes") as string;

  const investment = await prisma.investment.findUnique({ where: { id } });
  if (!investment || investment.status !== "ACTIVE") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  await prisma.$transaction([
    prisma.investment.update({
      where: { id },
      data: { status: "COMPLETED" },
    }),
    prisma.return.create({
      data: {
        investmentId: id,
        amount: returnAmount,
        notes: notes || null,
      },
    }),
    prisma.auditLog.create({
      data: {
        adminId: session.user.id,
        action: "COMPLETE_INVESTMENT",
        targetType: "Investment",
        targetId: id,
        details: `Completed with return of ${returnAmount}`,
      },
    }),
  ]);

  return NextResponse.redirect(new URL("/admin", request.url));
}