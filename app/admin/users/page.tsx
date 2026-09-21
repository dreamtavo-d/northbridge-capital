import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { UserRow } from "@/components/user-row";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await requireAdmin();
  const { q } = await searchParams;

  const users = await prisma.user.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Navbar userName={session.user.name} role={session.user.role} />

      <main className="min-h-screen bg-[#05070a] text-white px-6 py-8 sm:py-10 relative overflow-hidden">
        {/* Subtle background atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[320px] bg-[radial-gradient(circle,rgba(255,255,255,0.035),transparent_65%)]" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/25 mb-2">
              Northbridge Capital · Administration
            </p>

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Users
            </h1>

            <p className="text-xs text-white/35 mt-2">
              Manage registered Northbridge Capital accounts.
            </p>
          </div>

          {/* Search */}
          <form method="GET" className="flex flex-col sm:flex-row gap-2 mb-5">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search by name or email"
              className="h-11 flex-1 bg-[#07090c] border border-white/[0.1] rounded-lg px-4 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:border-white/30 focus:bg-[#090c10] focus:ring-1 focus:ring-white/10"
            />

            <button
              type="submit"
              className="h-11 px-5 rounded-lg bg-white text-black text-xs font-medium hover:bg-white/90 transition-all duration-200 shadow-[0_8px_25px_rgba(255,255,255,0.06)]"
            >
              Search
            </button>
          </form>

          {/* User list */}
          <Card className="bg-[#0a0d11] border-white/[0.08] rounded-xl shadow-none overflow-hidden">
            <CardContent className="p-0">
              {/* List header */}
              <div className="hidden sm:grid grid-cols-[1.2fr_1.5fr_0.7fr_0.7fr] gap-4 px-5 py-3 border-b border-white/[0.07] bg-white/[0.015]">
                <span className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                  User
                </span>

                <span className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                  Email
                </span>

                <span className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                  Role
                </span>

                <span className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                  Status
                </span>
              </div>

              <div className="divide-y divide-white/[0.06]">
                {users.length === 0 ? (
                  <div className="px-5 py-12 text-center">
                    <div className="w-10 h-10 mx-auto mb-4 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center">
                      <div className="w-3.5 h-3.5 border border-white/30 rotate-45" />
                    </div>

                    <p className="text-sm text-white/45">
                      No users found.
                    </p>

                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/20 mt-2">
                      Try a different search
                    </p>
                  </div>
                ) : (
                  users.map((u) => (
                    <div
                      key={u.id}
                      className="transition-colors duration-200 hover:bg-white/[0.02]"
                    >
                      <UserRow
                        id={u.id}
                        name={u.name}
                        email={u.email}
                        role={u.role}
                        isActive={u.isActive}
                        isSelf={u.id === session.user.id}
                      />
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <div className="w-3 h-3 border border-white/20 rotate-45" />

            <span className="text-[9px] uppercase tracking-[0.22em] text-white/20">
              Northbridge Capital
            </span>

            <div className="w-3 h-3 border border-white/20 rotate-45" />
          </div>
        </div>
      </main>
    </>
  );
}