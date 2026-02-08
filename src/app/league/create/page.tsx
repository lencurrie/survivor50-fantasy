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
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="bg-[#d4c5a9] rounded-lg p-8 border-4 border-[#8b6f47] shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-[#2c2416]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Create a League</h1>
        <p className="text-[#6b5635] mb-8" style={{ fontFamily: "'Teko', sans-serif" }}>Start a new fantasy league for Survivor 50</p>

        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-[#6b5635]" style={{ fontFamily: "'Teko', sans-serif", fontSize: "16px" }}>League Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Currie Family League"
              className="w-full bg-[#f5f1e8] border-2 border-[#8b6f47] rounded-lg px-4 py-3 text-[#2c2416] focus:outline-none focus:border-[#d97839] placeholder-[#8b6f47]/50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !name}
            className="w-full bg-[#d97839] hover:bg-[#c26830] disabled:bg-[#8b6f47]/50 text-white px-6 py-3 font-bold transition border-4 border-[#8b3a1a] shadow-xl disabled:border-[#8b6f47]/30"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "0.05em" }}
          >
            {loading ? "Creating..." : "Create League"}
          </button>
        </form>

        <p className="text-[#6b5635] text-sm mt-6 text-center">
          You'll get an invite code to share with friends after creating.
        </p>
      </div>
    </div>
  );
}
