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
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="bg-[#d4c5a9] rounded-lg p-8 border-4 border-[#8b6f47] shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-[#2c2416]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Join a League</h1>
        <p className="text-[#6b5635] mb-8" style={{ fontFamily: "'Teko', sans-serif" }}>Enter the invite code to join</p>

        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-[#6b5635]" style={{ fontFamily: "'Teko', sans-serif", fontSize: "16px" }}>Invite Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              className="w-full bg-[#f5f1e8] border-2 border-[#8b6f47] rounded-lg px-4 py-3 text-center text-2xl tracking-widest font-mono text-[#2c2416] focus:outline-none focus:border-[#d97839] placeholder-[#8b6f47]/50"
              maxLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || code.length < 6}
            className="w-full bg-[#d97839] hover:bg-[#c26830] disabled:bg-[#8b6f47]/50 text-white px-6 py-3 font-bold transition border-4 border-[#8b3a1a] shadow-xl disabled:border-[#8b6f47]/30"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "0.05em" }}
          >
            {loading ? "Joining..." : "Join League"}
          </button>
        </form>

        <p className="text-[#6b5635] text-sm mt-6 text-center">
          Ask your league creator for the 6-character invite code.
        </p>
      </div>
    </div>
  );
}
