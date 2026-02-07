"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinLeague() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/league/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.toUpperCase() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to join league");
      }

      const data = await res.json();
      router.push(`/league/${data.leagueId}`);
    } catch (err: any) {
      setError(err.message || "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-2">Join a League</h1>
      <p className="text-gray-400 mb-8">Enter the invite code to join</p>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Invite Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="ABC123"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-center text-2xl tracking-widest font-mono focus:outline-none focus:border-orange-500"
            maxLength={6}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || code.length < 6}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition"
        >
          {loading ? "Joining..." : "Join League"}
        </button>
      </form>

      <p className="text-gray-500 text-sm mt-6 text-center">
        Ask your league creator for the 6-character invite code.
      </p>
    </div>
  );
}
