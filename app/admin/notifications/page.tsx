import { requireAdmin } from "@/lib/require-admin";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sendNotification } from "./actions";

export default async function AdminNotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const session = await requireAdmin();
  const { sent } = await searchParams;

  return (
    <>
      <Navbar userName={session.user.name} role={session.user.role} />
      <main className="min-h-screen bg-offwhite p-6">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Send Notification</CardTitle>
            </CardHeader>
            <CardContent>
              {sent === "1" && (
                <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2 mb-4">
                  Notification sent successfully.
                </p>
              )}
              <form action={sendNotification} className="flex flex-col gap-3">
                <label className="text-sm text-charcoal-light">
                  User email
                </label>
                <input
                  type="email"
                  name="userEmail"
                  required
                  className="border rounded-md px-3 py-2"
                />
                <label className="text-sm text-charcoal-light">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="border rounded-md px-3 py-2"
                />
                <label className="text-sm text-charcoal-light">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="border rounded-md px-3 py-2"
                />
                <Button type="submit">Send</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}