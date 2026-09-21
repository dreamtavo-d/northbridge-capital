import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { markAllAsRead } from "./actions";
import {
  Bell,
  CheckCheck,
  Clock3,
  ArrowRight,
} from "lucide-react";

export default async function NotificationsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      <Navbar
        userName={session.user.name}
        role={session.user.role}
      />

      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 shadow-sm">
                  <Bell className="h-5 w-5 text-white" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Notifications
                  </h1>

                  <p className="text-sm text-slate-500">
                    Stay updated with activity on your account.
                  </p>
                </div>
              </div>
            </div>

            {unreadCount > 0 && (
              <form action={markAllAsRead}>
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="h-10 gap-2 rounded-lg border-slate-200 bg-white px-4 font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
                >
                  <CheckCheck className="h-4 w-4" />
                  Mark all as read
                </Button>
              </form>
            )}
          </div>

          {/* Notification summary */}
          {notifications.length > 0 && (
            <div className="mb-5 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                  <Bell className="h-4 w-4 text-slate-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Your notifications
                  </p>

                  <p className="text-xs text-slate-500">
                    {notifications.length} total notification
                    {notifications.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {unreadCount > 0 && (
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  {unreadCount} unread
                </span>
              )}
            </div>
          )}

          {/* Empty state */}
          {notifications.length === 0 ? (
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="flex flex-col items-center justify-center px-6 py-20 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                  <Bell className="h-7 w-7 text-slate-400" />
                </div>

                <h2 className="text-lg font-semibold text-slate-900">
                  No notifications yet
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  You&apos;re all caught up. Important account activity and
                  updates will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {notifications.map((n) => (
                <Card
                  key={n.id}
                  className={`group overflow-hidden border transition-all duration-200 ${
                    n.isRead
                      ? "border-slate-200 bg-white"
                      : "border-slate-300 bg-white shadow-sm"
                  } hover:border-slate-300 hover:shadow-md`}
                >
                  <CardContent className="p-0">
                    <div className="flex">

                      {/* Unread indicator */}
                      <div
                        className={`w-1 shrink-0 ${
                          n.isRead ? "bg-transparent" : "bg-slate-900"
                        }`}
                      />

                      <div className="flex min-w-0 flex-1 gap-4 p-5 sm:p-6">

                        {/* Icon */}
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            n.isRead
                              ? "bg-slate-100 text-slate-400"
                              : "bg-slate-900 text-white"
                          }`}
                        >
                          {n.isRead ? (
                            <Clock3 className="h-4 w-4" />
                          ) : (
                            <Bell className="h-4 w-4" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h2
                                  className={`truncate text-sm sm:text-base ${
                                    n.isRead
                                      ? "font-medium text-slate-700"
                                      : "font-semibold text-slate-900"
                                  }`}
                                >
                                  {n.title}
                                </h2>

                                {!n.isRead && (
                                  <span className="h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                                )}
                              </div>

                              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                                {n.message}
                              </p>
                            </div>

                            <ArrowRight
                              className="mt-1 hidden h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 sm:block"
                            />
                          </div>

                          {/* Date */}
                          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                            <Clock3 className="h-3.5 w-3.5" />

                            <span>
                              {n.createdAt.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>

                            <span>•</span>

                            <span>
                              {n.createdAt.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}