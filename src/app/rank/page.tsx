"use client";

import { Trophy, Medal, ArrowUp, ArrowDown, Minus } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar?: string;
  tribe: "buffaloes" | "flamingos";
  points: number;
  change: "up" | "down" | "same";
  isCurrentUser?: boolean;
}

export default function LeaderboardPage() {
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: "Sarah", tribe: "buffaloes", points: 3200, change: "up" },
    { rank: 2, name: "Mike", tribe: "flamingos", points: 2850, change: "same" },
    { rank: 3, name: "L Cee", tribe: "buffaloes", points: 2400, change: "down", isCurrentUser: true },
    { rank: 4, name: "Bland", tribe: "flamingos", points: 1850, change: "up" },
    { rank: 5, name: "Jessica", tribe: "buffaloes", points: 1200, change: "same" },
    { rank: 6, name: "David", tribe: "flamingos", points: 980, change: "down" },
    { rank: 7, name: "Emma", tribe: "buffaloes", points: 850, change: "up" },
    { rank: 8, name: "Tom", tribe: "flamingos", points: 720, change: "same" },
  ];

  const getRankColor = (rank: number) => {
    if (rank === 1) return "from-yellow-500 to-yellow-600";
    if (rank === 2) return "from-stone-400 to-stone-500";
    if (rank === 3) return "from-orange-700 to-orange-800";
    return "from-stone-700 to-stone-800";
  };

  const getTribeIcon = (tribe: string) => {
    return tribe === "buffaloes" ? "🦬" : "🦩";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-950 to-black pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 border-b border-stone-800">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <button className="text-stone-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-black tracking-wider text-stone-200">LEADERBOARD</h1>
            <div className="w-6" />
          </div>

          {/* Podium - Top 3 */}
          <div className="flex justify-center items-end gap-4 mb-6">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-stone-400 to-stone-500 flex items-center justify-center mb-2 shadow-lg shadow-stone-900/50">
                <span className="text-2xl">🥈</span>
              </div>
              <span className="text-stone-400 font-bold text-sm">{leaderboard[1].name}</span>
              <span className="text-stone-500 text-xs">{leaderboard[1].points.toLocaleString()}</span>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center -mt-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-2 shadow-lg shadow-yellow-900/50 ring-4 ring-yellow-500/30">
                <span className="text-3xl">👑</span>
              </div>
              <span className="text-yellow-500 font-black text-lg">{leaderboard[0].name}</span>
              <span className="text-yellow-600 text-sm font-bold">{leaderboard[0].points.toLocaleString()}</span>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-700 to-orange-800 flex items-center justify-center mb-2 shadow-lg shadow-orange-900/50">
                <span className="text-2xl">🥉</span>
              </div>
              <span className="text-orange-600 font-bold text-sm">{leaderboard[2].name}</span>
              <span className="text-stone-500 text-xs">{leaderboard[2].points.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="max-w-md mx-auto px-4 py-6">
        <h2 className="text-lg font-bold text-stone-400 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          ALL CASTAWAYS
        </h2>

        <div className="space-y-3">
          {leaderboard.map((entry) => (
            <div
              key={entry.name}
              className={`rounded-2xl p-4 flex items-center gap-4 border-2 transition ${
                entry.isCurrentUser
                  ? "bg-gradient-to-r from-orange-900/30 to-stone-900 border-orange-500/50"
                  : "bg-gradient-to-r from-stone-800 to-stone-900 border-stone-700"
              }`}
            >
              {/* Rank */}
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRankColor(entry.rank)} flex items-center justify-center font-black text-white shadow-lg`}>
                {entry.rank <= 3 ? (
                  <Medal className="w-5 h-5" />
                ) : (
                  <span className="text-sm">{entry.rank}</span>
                )}
              </div>

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-stone-700 to-stone-800 flex items-center justify-center text-xl">
                {entry.avatar ? (
                  <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span>👤</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${entry.isCurrentUser ? "text-orange-400" : "text-stone-200"}`}>
                    {entry.name}
                  </span>
                  {entry.isCurrentUser && (
                    <span className="bg-orange-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      YOU
                    </span>
                  )}
                </div>
                <div className="text-sm text-stone-500">
                  {getTribeIcon(entry.tribe)} {entry.tribe === "buffaloes" ? "Brainy Buffaloes" : "Flirty Flamingos"}
                </div>
              </div>

              {/* Points & Change */}
              <div className="text-right">
                <div className="text-xl font-black text-orange-400">{entry.points.toLocaleString()}</div>
                <div className="flex items-center justify-end gap-1">
                  {entry.change === "up" && <ArrowUp className="w-4 h-4 text-green-500" />}
                  {entry.change === "down" && <ArrowDown className="w-4 h-4 text-red-500" />}
                  {entry.change === "same" && <Minus className="w-4 h-4 text-stone-500" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-stone-900/95 backdrop-blur border-t border-stone-800">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-around">
          <button className="flex flex-col items-center gap-1 text-stone-500 hover:text-stone-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs">VOTE</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-orange-500">
            <Trophy className="w-6 h-6" />
            <span className="text-xs font-bold">RANK</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-stone-500 hover:text-stone-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs">TRIBE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
