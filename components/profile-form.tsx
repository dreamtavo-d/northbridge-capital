"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/app/settings/actions";

export function ProfileForm({ currentName }: { currentName: string }) {
  const [name, setName] = useState(currentName);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setStatus("saving");
    setError("");
    try {
      await updateProfile(formData);
      setStatus("saved");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-3">
      <label className="text-sm text-charcoal-light">Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border rounded-md px-3 py-2"
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {status === "saved" && (
        <p className="text-green-700 text-sm">Profile updated.</p>
      )}
      <Button type="submit" disabled={status === "saving"}>
        {status === "saving" ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}