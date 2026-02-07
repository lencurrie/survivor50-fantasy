"use client";

import { useState } from "react";
import { Trophy, Users, Vote, Crown, ChevronLeft, Menu } from "lucide-react";

interface Member {
  id: string;
  name: string;
  avatar?: string;
  role: "me" | "admin" | "member";
  tribe?: "buffaloes" | "flamingos";
  points: number;
}

interface Tribe {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  borderColor: string;
}

export default function VotingInterface() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [activeTribe, setActiveTribe] = useState<string>("buffaloes");

  const tribes: Tribe[] = [
    { 
      id: "buffaloes", 
      name: "Brainy Buffaloes", 
      icon: "🦬",
      gradient: "from-blue-900 via-blue-800 to-blue-900",
      borderColor: "border-blue-600"
    },
    { 
      id: "flamingos", 
      name: "Flirty Flamingos", 
      icon: "🦩",
      gradient: "from-purple-900 via-purple-800 to-purple-900",
      borderColor: "border-purple-600"
    },
  ];

  const members: Member[] = [
    { id: "1", name: "L Cee", role: "me", tribe: "buffaloes", points: 2400 },
    { id: "2", name: "Bland", role: "admin", tribe: "flamingos", points: 1850 },
    { id: "3", name: "Sarah", role: "member", tribe: "buffaloes", points: 1200 },
    { id: "4", name: "Mike", role: "member", tribe: "flamingos", points: 980 },
  ];

  const xpProgress = 75; // 75% to next level
  const xpSegments = 20;
  const filledSegments = Math.floor((xpProgress / 100) * xpSegments);

  return (
    <div className="min-h-screen tribal-bg">
      {/* Header */}
      <header className="header-tribal sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-white transition">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="title-tribal text-lg">TRIBAL COUNCIL</h1>
            <button className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-white transition">
              <Menu className="w-6 h-6" />
            </button>
          </div>
          
          {/* XP Progress */}
          <div className="mt-4">
            <div className="xp-bar">
              {Array.from({ length: xpSegments }).map((_, i) => (
                <div
                  key={i}
                  className={`xp-segment ${i < filledSegments ? 'filled' : ''}`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-stone-500 mt-2 font-bold">
              <span>2400 XP</span>
              <span>Next: 2500 XP</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Tribe Selection */}
        <div className="grid grid-cols-2 gap-3">
          {tribes.map((tribe) => (
            <button
              key={tribe.id}
              onClick={() => setActiveTribe(tribe.id)}
              className={`tribe-card ${activeTribe === tribe.id ? tribe.borderColor : 'border-transparent'} ${
                tribe.id === "buffaloes" ? "tribe-card-blue" : "tribe-card-purple"
              } transition hover:scale-105`}
            >
              <span className="text-4xl">{tribe.icon}</span>
              <span className="text-white font-black text-sm text-center uppercase tracking-wide">
                {tribe.name}
              </span>
            </button>
          ))}
        </div>

        {/* Members Row */}
        <div>
          <h2 className="text-stone-400 font-bold text-sm mb-4 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4" />
            Tribe Members
          </h2>
          
          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member.id)}
                className={`member-row card-hover cursor-pointer ${
                  selectedMember === member.id ? 'border-orange-500 shadow-lg shadow-orange-900/30' : ''
                }`}
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="avatar-tribal flex items-center justify-center text-2xl overflow-hidden">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>👤</span>
                    )}
                  </div>
                  {member.role === "admin" && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Crown className="w-3 h-3 text-black" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-200">{member.name}</span>
                    {member.role === "me" && (
                      <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded font-black">
                        ME
                      </span>
                    )}
                    {member.role === "admin" && (
                      <span className="bg-yellow-600 text-white text-[10px] px-2 py-0.5 rounded font-black">
                        PAY
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-stone-500">
                    {member.tribe === "buffaloes" ? "🦬 Brainy Buffaloes" : "🦩 Flirty Flamingos"}
                  </div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <div className="text-xl font-black text-orange-500">{member.points.toLocaleString()}</div>
                  <div className="text-[10px] text-stone-500 uppercase font-bold">XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Voting Section with Buff Circle */}
        <div className="bg-gradient-to-b from-stone-800/80 to-stone-900/80 rounded-3xl p-6 border border-stone-700">
          <h2 className="text-center text-stone-300 font-bold mb-6 uppercase tracking-wider">
            Who do you vote for?
          </h2>

          {/* Buff Circle with Members */}
          <div className="flex flex-col items-center mb-6">
            {/* Member Avatars Row */}
            <div className="flex items-center gap-2 mb-4">
              {members.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMember(member.id)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    selectedMember === member.id
                      ? "bg-orange-500 text-white scale-110 shadow-lg shadow-orange-500/50 ring-2 ring-orange-300"
                      : "bg-stone-700 text-stone-400 hover:bg-stone-600"
                  }`}
                >
                  {member.name.charAt(0)}
                </button>
              ))}
            </div>

            {/* Buff Circle */}
            <div className="buff-circle mb-4">
              <Vote className="w-12 h-12 text-white" />
            </div>

            {/* Selected Member Name */}
            {selectedMember && (
              <div className="text-center">
                <span className="text-stone-500 text-sm">Selected: </span>
                <span className="text-orange-400 font-black text-xl">
                  {members.find(m => m.id === selectedMember)?.name}
                </span>
              </div>
            )}
          </div>

          {/* Vote Button */}
          <button
            disabled={!selectedMember}
            className="btn-next w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            NEXT
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-stone-900/50 rounded-2xl p-4 border border-stone-800">
          <h3 className="text-stone-500 text-xs font-bold mb-3 uppercase tracking-wider">Recent Activity</h3>
          <div className="flex items-center gap-3">
            <div className="avatar-tribal w-8 h-8 flex items-center justify-center text-xs font-bold">
              LC
            </div>
            <div className="flex-1">
              <span className="text-stone-300 text-sm font-bold">L Cee</span>
              <span className="text-stone-500 text-sm"> joined the tribe</span>
            </div>
            <span className="text-stone-600 text-xs">Feb 7</span>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-stone-900/95 backdrop-blur border-t border-stone-800">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-around">
          <button className="flex flex-col items-center gap-1 text-orange-500">
            <Vote className="w-6 h-6" />
            <span className="text-xs font-black uppercase">Vote</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-stone-500 hover:text-stone-300 transition">
            <Trophy className="w-6 h-6" />
            <span className="text-xs uppercase">Rank</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-stone-500 hover:text-stone-300 transition">
            <Users className="w-6 h-6" />
            <span className="text-xs uppercase">Tribe</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
