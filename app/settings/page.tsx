import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/profile-form";
import { PasswordForm } from "@/components/password-form";

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
    <>
      <Navbar userName={session.user.name} role={session.user.role} />

      <main className="min-h-screen bg-[#05070a] text-white px-6 py-8 sm:py-10 relative overflow-hidden">
        {/* Subtle background atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[radial-gradient(circle,rgba(255,255,255,0.035),transparent_65%)]" />
        </div>

        <div className="relative max-w-md mx-auto">
          {/* Header */}
          <div className="mb-8">
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/25 mb-2">
              Northbridge Capital
            </p>

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Settings
            </h1>

            <p className="text-xs text-white/35 mt-2">
              Manage your account information and security.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Profile */}
            <Card className="bg-[#0a0d11] border-white/[0.08] rounded-xl shadow-none">
              <CardHeader className="px-5 pt-5 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-white">
                    Profile
                  </CardTitle>

                  <span className="text-[8px] uppercase tracking-[0.18em] text-white/20">
                    Account
                  </span>
                </div>
              </CardHeader>

              <CardContent className="px-5 pb-5">
                <ProfileForm currentName={session.user.name} />
              </CardContent>
            </Card>

            {/* Password */}
            <Card className="bg-[#0a0d11] border-white/[0.08] rounded-xl shadow-none">
              <CardHeader className="px-5 pt-5 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-white">
                    Change Password
                  </CardTitle>

                  <span className="text-[8px] uppercase tracking-[0.18em] text-white/20">
                    Security
                  </span>
                </div>
              </CardHeader>

              <CardContent className="px-5 pb-5">
                <PasswordForm />
              </CardContent>
            </Card>
          </div>

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