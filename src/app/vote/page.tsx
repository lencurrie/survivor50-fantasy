"use client";

import { useState } from "react";
import { Trophy, Users, Vote, Crown } from "lucide-react";

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
  color: string;
  bgColor: string;
  icon: string;
}

export default function VotingInterface() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const tribes: Tribe[] = [
    { id: "buffaloes", name: "Brainy Buffaloes", color: "text-blue-400", bgColor: "bg-blue-600", icon: "🦬" },
    { id: "flamingos", name: "Flirty Flamingos", color: "text-purple-400", bgColor: "bg-purple-600", icon: "🦩" },
  ];

  const members: Member[] = [
    { id: "1", name: "L Cee", role: "me", tribe: "buffaloes", points: 2400 },
    { id: "2", name: "Bland", role: "admin", tribe: "flamingos", points: 1850 },
    { id: "3", name: "Sarah", role: "member", tribe: "buffaloes", points: 1200 },
    { id: "4", name: "Mike", role: "member", tribe: "flamingos", points: 980 },
  ];

  const handleDialClick = (index: number) => {
    const angle = (index / members.length) * 360;
    setRotation(angle);
    setSelectedMember(members[index].id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-950 to-black">
      {/* Header with tribal pattern */}
      <div className="bg-gradient-to-r from-blue-900/20 via-stone-900 to-purple-900/20 border-b border-stone-800">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <button className="text-stone-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-black tracking-wider text-stone-200">TRIBAL COUNCIL</h1>
            <button className="text-stone-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* XP Progress */}
          <div className="bg-stone-800/50 rounded-full h-2 mb-4 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-full w-3/4 rounded-full" />
          </div>
          <div className="flex justify-between text-xs text-stone-500">
            <span>2400 XP</span>
            <span>Next: 2500 XP</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Tribes Selection */}
        <div className="grid grid-cols-2 gap-3">
          {tribes.map((tribe) => (
            <button
              key={tribe.id}
              className={`${tribe.bgColor} rounded-2xl p-4 flex flex-col items-center gap-2 transition hover:scale-105`}
            >
              <span className="text-3xl">{tribe.icon}</span>
              <span className="text-white font-bold text-sm text-center">{tribe.name}</span>
            </button>
          ))}
        </div>

        {/* Members Section */}
        <div>
          <h2 className="text-lg font-bold text-stone-300 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Tribe Members
          </h2>
          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                onClick={() => handleDialClick(members.indexOf(member))}
                className={`bg-gradient-to-r from-stone-800 to-stone-900 rounded-2xl p-4 flex items-center gap-4 border-2 transition cursor-pointer ${
                  selectedMember === member.id
                    ? "border-orange-500 shadow-lg shadow-orange-900/30"
                    : "border-stone-700 hover:border-stone-600"
                }`}
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-stone-700 to-stone-800 flex items-center justify-center text-2xl overflow-hidden">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>👤</span>
                    )}
                  </div>
                  {member.role === "admin" && (
                    <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-1">
                      <Crown className="w-3 h-3 text-black" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-200">{member.name}</span>
                    {member.role === "me" && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        ME
                      </span>
                    )}
                    {member.role === "admin" && (
                      <span className="bg-yellow-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        PAY
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-stone-500">
                    {member.tribe === "buffaloes" ? "🦬 Brainy Buffaloes" : "🦩 Flirty Flamingos"}
                  </div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <div className="text-lg font-black text-orange-400">{member.points.toLocaleString()}</div>
                  <div className="text-xs text-stone-500">XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Voting Dial */}
        <div className="bg-gradient-to-b from-stone-800 to-stone-900 rounded-3xl p-8 border border-stone-700">
          <h2 className="text-center text-lg font-bold text-stone-300 mb-6 flex items-center justify-center gap-2">
            <Vote className="w-5 h-5" />
            Who do you vote for?
          </h2>

          {/* Circular Dial */}
          <div className="relative w-64 h-64 mx-auto mb-6">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-stone-700" />
            
            {/* Inner circle with members */}
            <div 
              className="absolute inset-4 rounded-full bg-gradient-to-br from-stone-800 to-stone-950 flex items-center justify-center transition-transform duration-500"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {members.map((member, index) => {
                const angle = (index / members.length) * 360 - 90;
                const radius = 80;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                
                return (
                  <button
                    key={member.id}
                    onClick={() => handleDialClick(index)}
                    className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      selectedMember === member.id
                        ? "bg-orange-500 text-white scale-125 shadow-lg shadow-orange-500/50"
                        : "bg-stone-700 text-stone-400 hover:bg-stone-600"
                    }`}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    {member.name.charAt(0)}
                  </button>
                );
              })}
              
              {/* Center */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-600 to-red-700 flex items-center justify-center shadow-xl">
                <Vote className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-orange-500" />
            </div>
          </div>

          {/* Selected Name */}
          {selectedMember && (
            <div className="text-center mb-4">
              <span className="text-stone-400">Selected: </span>
              <span className="text-orange-400 font-bold text-xl">
                {members.find(m => m.id === selectedMember)?.name}
              </span>
            </div>
          )}

          {/* Vote Button */}
          <button
            disabled={!selectedMember}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 disabled:from-stone-700 disabled:to-stone-700 disabled:text-stone-500 text-white font-black text-lg py-4 rounded-2xl transition hover:shadow-lg hover:shadow-orange-900/30"
          >
            CAST VOTE
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-stone-900/50 rounded-2xl p-4 border border-stone-800">
          <h3 className="text-sm font-bold text-stone-500 mb-3">RECENT ACTIVITY</h3>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
              LC
            </div>
            <div className="flex-1">
              <span className="text-stone-300">L Cee</span>
              <span className="text-stone-500"> joined the tribe</span>
            </div>
            <span className="text-stone-600 text-xs">Feb 7, 2026</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-stone-900/95 backdrop-blur border-t border-stone-800">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-around">
          <button className="flex flex-col items-center gap-1 text-orange-500">
            <Vote className="w-6 h-6" />
            <span className="text-xs font-bold">VOTE</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-stone-500 hover:text-stone-300">
            <Trophy className="w-6 h-6" />
            <span className="text-xs">RANK</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-stone-500 hover:text-stone-300">
            <Users className="w-6 h-6" />
            <span className="text-xs">TRIBE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
