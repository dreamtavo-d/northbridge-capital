"use client";

import { useState } from "react";
import { toggleUserActive } from "@/app/admin/users/actions";
import Link from "next/link";

export function UserRow({
  id,
  name,
  email,
  role,
  isActive,
  isSelf,
}: {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  isSelf: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleToggle = async () => {
    setLoading(true);
    setError("");
    try {
      await toggleUserActive(id, isActive);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update user.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div>
              <Link href={`/admin/users/${id}`} className="hover:underline">
        <p className="font-semibold">
          {name}{" "}
          <span className="text-xs text-charcoal-light font-normal">
            ({role})
          </span>
        </p>
        <p className="text-sm text-charcoal-light">{email}</p>
      </Link>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${
            isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {isActive ? "Active" : "Suspended"}
        </span>
        {!isSelf && (
          <button
            onClick={handleToggle}
            disabled={loading}
            className="border border-charcoal text-charcoal text-sm px-3 py-1.5 rounded-md"
          >
            {loading ? "..." : isActive ? "Suspend" : "Activate"}
          </button>
        )}
      </div>
    </div>
  );
}