"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateCode } from "@/lib/utils";

export default function CreateLeague() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const code = generateCode();
      
      const res = await fetch("/api/league", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, code }),
      });

      if (!res.ok) throw new Error("Failed to create league");

      const data = await res.json();
      router.push(`/league/${data.id}`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-2">Create a League</h1>
      <p className="text-gray-400 mb-8">Start a new fantasy league for Survivor 50</p>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">League Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Currie Family League"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !name}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition"
        >
          {loading ? "Creating..." : "Create League"}
        </button>
      </form>

      <p className="text-gray-500 text-sm mt-6 text-center">
        You'll get an invite code to share with friends after creating.
      </p>
    </div>
  );
}
