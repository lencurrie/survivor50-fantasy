"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Menu, Users, Vote, Trophy, Flame, Crown } from "lucide-react";

interface Member {
  id: string;
  name: string;
  avatar?: string;
  role: "me" | "admin" | "member";
  tribe: "buffaloes" | "flamingos";
  points: number;
}

export default function VotingInterface() {
  const [selectedMember, setSelectedMember] = useState<string>("2");
  const [rotation, setRotation] = useState(0);
  const [activeTribe, setActiveTribe] = useState<string>("flamingos");

  const members: Member[] = [
    { id: "1", name: "L Cee", role: "me", tribe: "buffaloes", points: 2400 },
    { id: "2", name: "Bland", role: "admin", tribe: "flamingos", points: 1850 },
    { id: "3", name: "Sarah", role: "member", tribe: "buffaloes", points: 1200 },
    { id: "4", name: "Mike", role: "member", tribe: "flamingos", points: 980 },
  ];

  const xpProgress = 75;

  // Auto-rotate voting dial
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev - 90);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex justify-center tribal-pattern" style={{ backgroundColor: "#1a3d3f" }}>
      <div className="w-full max-w-[1440px] flex flex-col min-h-screen relative">

        {/* Header */}
        <header className="bg-[#2c3e3f] border-b-2 border-[#8b6f47] sticky top-0 z-50 backdrop-blur-md">
          <div className="max-w-md mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
              <button className="text-[#c4b59a] hover:text-[#f5f1e8] transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold tracking-[0.2em] text-[#f5f1e8] uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Tribal Council
              </h1>
              <button className="text-[#c4b59a] hover:text-[#f5f1e8] transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* XP Progress */}
            <div className="xp-bar mb-2">
              <div
                className="xp-fill transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold tracking-widest text-[#c4b59a] uppercase">
              <span>2400 XP</span>
              <span>Next: 2500 XP</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-md mx-auto w-full px-4 py-6 space-y-8 pb-32">

          {/* Tribe Selection */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setActiveTribe("buffaloes")}
              className={`tribe-card rounded-2xl p-4 flex flex-col items-center gap-3 border-2 transition-all duration-300 ${
                activeTribe === "buffaloes"
                  ? "bg-[#4a9fb8] hover:bg-[#3a8fa8] border-[#4a9fb8]/50 shadow-xl"
                  : "bg-[#2c5f6d]/50 border-[#4a9fb8]/20"
              }`}
            >
              <span className={`text-4xl transition-all ${activeTribe === "buffaloes" ? "" : "grayscale"}`}>🦬</span>
              <span className="text-white font-bold text-xs tracking-tighter uppercase" style={{ fontFamily: "'Teko', sans-serif" }}>
                Brainy Buffaloes
              </span>
            </button>
            <button
              onClick={() => setActiveTribe("flamingos")}
              className={`tribe-card rounded-2xl p-4 flex flex-col items-center gap-3 border-2 transition-all duration-300 ${
                activeTribe === "flamingos"
                  ? "bg-[#d97839] hover:bg-[#c26830] border-[#d97839]/50 shadow-xl"
                  : "bg-[#8b3a1a]/50 border-[#d97839]/20"
              }`}
            >
              <span className={`text-4xl transition-all ${activeTribe === "flamingos" ? "" : "grayscale"}`}>🦩</span>
              <span className="text-white font-bold text-xs tracking-tighter uppercase" style={{ fontFamily: "'Teko', sans-serif" }}>
                Flirty Flamingos
              </span>
            </button>
          </div>

          {/* Tribe Members */}
          <section>
            <h2 className="text-lg font-bold text-[#c4b59a] mb-5 flex items-center gap-3 tracking-wide uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              <Users className="w-5 h-5 text-[#d97839]" />
              Tribe Members
            </h2>

            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member.id)}
                  className={`rounded-2xl p-4 flex items-center gap-4 border-2 transition-all cursor-pointer ${
                    selectedMember === member.id
                      ? "bg-[#2c3e3f] border-[#d97839] shadow-lg"
                      : "bg-[#2c3e3f]/80 border-[#5a7b7c]/30 hover:border-[#5a7b7c]"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#5a7b7c] to-[#4a5f60] flex items-center justify-center text-2xl overflow-hidden border-2 border-[#8b6f47]">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span>👤</span>
                      )}
                    </div>
                    {member.role === "me" && (
                      <div className="absolute -bottom-1 -right-1 bg-[#4a9fb8] rounded-full w-4 h-4 flex items-center justify-center border-2 border-[#1a3d3f]">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                    {member.role === "admin" && (
                      <div className="absolute -bottom-1 -right-1 bg-[#d97839] rounded-full p-1 border-2 border-[#1a3d3f]">
                        <Crown className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#f5f1e8] tracking-tight" style={{ fontFamily: "'Teko', sans-serif", fontSize: "18px" }}>{member.name}</span>
                      {member.role === "me" && (
                        <span className="bg-[#4a9fb8] text-white text-[9px] px-2 py-0.5 rounded-full font-bold tracking-widest uppercase">
                          ME
                        </span>
                      )}
                      {member.role === "admin" && (
                        <span className="bg-[#d97839] text-white text-[9px] px-2 py-0.5 rounded-full font-bold tracking-widest uppercase">
                          PAY
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#c4b59a] font-medium">
                      {member.tribe === "buffaloes" ? "🦬 Brainy Buffaloes" : "🦩 Flirty Flamingos"}
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <div className={`text-lg font-bold tracking-tighter ${selectedMember === member.id ? "text-[#d97839]" : "text-[#c4b59a]"}`} style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {member.points.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-[#5a7b7c] font-bold uppercase" style={{ fontFamily: "'Teko', sans-serif" }}>XP</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Voting Section */}
          <section className="bg-[#2c3e3f]/60 rounded-[40px] p-10 border-2 border-[#8b6f47]/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#d97839]/5 to-transparent pointer-events-none" />

            <h2 className="text-center text-lg font-bold text-[#f5f1e8] mb-10 flex items-center justify-center gap-3 uppercase tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              <Vote className="w-6 h-6 text-[#d97839] animate-flame" />
              Cast Your Vote
            </h2>

            {/* Voting Dial */}
            <div className="relative w-72 h-72 mx-auto mb-10">
              <div className="absolute inset-0 rounded-full border-[6px] border-[#2c3e3f] shadow-inner" />
              <div className="absolute inset-0 rounded-full border border-[#8b6f47]/50 animate-slow-spin" />

              <div
                className="absolute inset-6 rounded-full bg-[#1a3d3f] flex items-center justify-center shadow-2xl transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {members.map((member, index) => {
                  const angle = index * 90;
                  const isSelected = selectedMember === member.id;
                  return (
                    <button
                      key={member.id}
                      onClick={() => setSelectedMember(member.id)}
                      className={`absolute w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-[#d97839] text-white shadow-[0_0_20px_rgba(217,120,57,0.6)]"
                          : "bg-[#2c3e3f] text-[#c4b59a] hover:bg-[#4a5f60]"
                      }`}
                      style={{
                        transform: `rotate(${angle}deg) translateY(-100px)`,
                        fontFamily: "'Bebas Neue', sans-serif",
                      }}
                    >
                      {member.name.charAt(0)}
                    </button>
                  );
                })}

                <button className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d97839] to-[#8b3a1a] flex items-center justify-center shadow-[0_10px_30px_rgba(139,58,26,0.4)] relative group cursor-pointer">
                  <div className="absolute inset-0 rounded-full bg-[#d97839] blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                  <Flame className="relative w-10 h-10 text-white" />
                </button>
              </div>

              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-[#d97839] drop-shadow-[0_0_8px_rgba(217,120,57,0.8)]" />
              </div>
            </div>

            {/* Target Display */}
            <div className="text-center mb-8">
              <div className="text-[#c4b59a] text-[10px] font-bold uppercase tracking-[0.3em] mb-1" style={{ fontFamily: "'Teko', sans-serif" }}>
                Target Identified
              </div>
              <div className="text-[#d97839] font-bold text-3xl tracking-tighter" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {members.find(m => m.id === selectedMember)?.name}
              </div>
            </div>

            {/* Cast Vote Button */}
            <button className="btn-cast-vote w-full text-white font-bold text-lg py-5 rounded-[24px] uppercase tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Cast Final Vote
            </button>
          </section>

          {/* Tribe Feed */}
          <div className="bg-[#2c3e3f]/40 rounded-3xl p-5 border border-[#8b6f47]/30">
            <h3 className="text-[10px] font-bold text-[#5a7b7c] mb-4 tracking-[0.2em] uppercase" style={{ fontFamily: "'Teko', sans-serif" }}>
              Tribe Feed
            </h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="w-10 h-10 rounded-full bg-[#4a9fb8] flex items-center justify-center text-xs font-bold text-white border-2 border-[#1a3d3f]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                LC
              </div>
              <div className="flex-1 text-xs">
                <span className="text-[#f5f1e8] font-bold" style={{ fontFamily: "'Teko', sans-serif" }}>L Cee</span>
                <span className="text-[#c4b59a]"> established a new alliance</span>
              </div>
              <span className="text-[#5a7b7c] text-[10px] font-bold" style={{ fontFamily: "'Teko', sans-serif" }}>JUST NOW</span>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#2c3e3f]/90 backdrop-blur-xl border-t-2 border-[#8b6f47] px-6 py-4 flex justify-around z-50 nav-rounded">
          <button className="flex flex-col items-center gap-1.5 group">
            <div className="w-10 h-10 rounded-2xl bg-[#d97839]/20 flex items-center justify-center">
              <Vote className="w-6 h-6 text-[#d97839]" />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-[#d97839] uppercase" style={{ fontFamily: "'Teko', sans-serif" }}>Vote</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 group">
            <div className="w-10 h-10 rounded-2xl bg-[#4a5f60]/50 flex items-center justify-center group-hover:bg-[#4a5f60] transition-all">
              <Trophy className="w-6 h-6 text-[#5a7b7c] group-hover:text-[#c4b59a]" />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-[#5a7b7c] group-hover:text-[#c4b59a] uppercase" style={{ fontFamily: "'Teko', sans-serif" }}>Rank</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 group">
            <div className="w-10 h-10 rounded-2xl bg-[#4a5f60]/50 flex items-center justify-center group-hover:bg-[#4a5f60] transition-all">
              <Users className="w-6 h-6 text-[#5a7b7c] group-hover:text-[#c4b59a]" />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-[#5a7b7c] group-hover:text-[#c4b59a] uppercase" style={{ fontFamily: "'Teko', sans-serif" }}>Tribe</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
