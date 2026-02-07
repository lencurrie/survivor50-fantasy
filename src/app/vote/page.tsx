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
    <div className="min-h-screen bg-stone-950 flex justify-center tribal-pattern">
      <div className="w-full max-w-[1440px] flex flex-col min-h-screen relative">
        
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-900/10 via-stone-900 to-purple-900/10 border-b border-stone-800/60 sticky top-0 z-50 backdrop-blur-md">
          <div className="max-w-md mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
              <button className="text-stone-400 hover:text-white transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-black tracking-[0.2em] text-stone-200 uppercase">
                Tribal Council
              </h1>
              <button className="text-stone-400 hover:text-white transition-colors">
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
            <div className="flex justify-between text-[10px] font-bold tracking-widest text-stone-500 uppercase">
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
              className={`tribe-card rounded-2xl p-4 flex flex-col items-center gap-3 border transition-all duration-300 ${
                activeTribe === "buffaloes"
                  ? "bg-blue-600 hover:bg-blue-500 border-blue-400/20 shadow-xl shadow-blue-900/40"
                  : "bg-blue-800/50 border-blue-400/10"
              }`}
            >
              <span className={`text-4xl transition-all ${activeTribe === "buffaloes" ? "" : "grayscale"}`}>🦬</span>
              <span className="text-white font-black text-xs tracking-tighter uppercase">
                Brainy Buffaloes
              </span>
            </button>
            <button
              onClick={() => setActiveTribe("flamingos")}
              className={`tribe-card rounded-2xl p-4 flex flex-col items-center gap-3 border transition-all duration-300 ${
                activeTribe === "flamingos"
                  ? "bg-purple-600 hover:bg-purple-500 border-purple-400/20 shadow-xl shadow-purple-900/40"
                  : "bg-purple-800/50 border-purple-400/10"
              }`}
            >
              <span className={`text-4xl transition-all ${activeTribe === "flamingos" ? "" : "grayscale"}`}>🦩</span>
              <span className="text-white font-black text-xs tracking-tighter uppercase">
                Flirty Flamingos
              </span>
            </button>
          </div>

          {/* Tribe Members */}
          <section>
            <h2 className="text-lg font-black text-stone-300 mb-5 flex items-center gap-3 tracking-wide uppercase">
              <Users className="w-5 h-5 text-orange-500" />
              Tribe Members
            </h2>
            
            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member.id)}
                  className={`rounded-3xl p-4 flex items-center gap-4 border-2 transition-all cursor-pointer ${
                    selectedMember === member.id
                      ? "bg-stone-900 border-orange-500 shadow-lg shadow-orange-950/20"
                      : "bg-stone-900/80 border-stone-800 hover:border-stone-700"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-stone-700 to-stone-800 flex items-center justify-center text-2xl overflow-hidden border border-stone-600">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span>👤</span>
                      )}
                    </div>
                    {member.role === "me" && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full w-4 h-4 flex items-center justify-center border-2 border-stone-900">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                    {member.role === "admin" && (
                      <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-1 border-2 border-stone-900">
                        <Crown className="w-2.5 h-2.5 text-black" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-stone-200 tracking-tight">{member.name}</span>
                      {member.role === "me" && (
                        <span className="bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded-full font-black tracking-widest uppercase">
                          ME
                        </span>
                      )}
                      {member.role === "admin" && (
                        <span className="bg-yellow-600 text-white text-[9px] px-2 py-0.5 rounded-full font-black tracking-widest uppercase">
                          PAY
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-500 font-medium">
                      {member.tribe === "buffaloes" ? "🦬 Brainy Buffaloes" : "🦩 Flirty Flamingos"}
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <div className={`text-lg font-black tracking-tighter ${selectedMember === member.id ? "text-orange-400" : "text-stone-500"}`}>
                      {member.points.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-stone-600 font-black uppercase">XP</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Voting Section */}
          <section className="bg-stone-900/60 rounded-[40px] p-10 border border-stone-800/80 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
            
            <h2 className="text-center text-lg font-black text-stone-200 mb-10 flex items-center justify-center gap-3 uppercase tracking-widest">
              <Vote className="w-6 h-6 text-orange-500 animate-flame" />
              Cast Your Vote
            </h2>

            {/* Voting Dial */}
            <div className="relative w-72 h-72 mx-auto mb-10">
              {/* Outer Rings */}
              <div className="absolute inset-0 rounded-full border-[6px] border-stone-800 shadow-inner" />
              <div className="absolute inset-0 rounded-full border border-stone-700 animate-slow-spin" />
              
              {/* Rotating Dial */}
              <div 
                className="absolute inset-6 rounded-full bg-stone-950 flex items-center justify-center shadow-2xl transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {/* Member Letters */}
                {members.map((member, index) => {
                  const angle = index * 90;
                  const isSelected = selectedMember === member.id;
                  return (
                    <button
                      key={member.id}
                      onClick={() => setSelectedMember(member.id)}
                      className={`absolute w-10 h-10 rounded-full font-black flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.6)]"
                          : "bg-stone-800 text-stone-500 hover:bg-stone-700"
                      }`}
                      style={{
                        transform: `rotate(${angle}deg) translateY(-100px)`,
                      }}
                    >
                      {member.name.charAt(0)}
                    </button>
                  );
                })}
                
                {/* Center Flame Button */}
                <button className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-600 to-red-700 flex items-center justify-center shadow-[0_10px_30px_rgba(220,38,38,0.4)] relative group cursor-pointer">
                  <div className="absolute inset-0 rounded-full bg-orange-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                  <Flame className="relative w-10 h-10 text-white" />
                </button>
              </div>
              
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
              </div>
            </div>

            {/* Target Display */}
            <div className="text-center mb-8">
              <div className="text-stone-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">
                Target Identified
              </div>
              <div className="text-orange-500 font-black text-3xl tracking-tighter">
                {members.find(m => m.id === selectedMember)?.name}
              </div>
            </div>

            {/* Cast Vote Button */}
            <button className="btn-cast-vote w-full text-white font-black text-lg py-5 rounded-[24px] uppercase tracking-widest">
              Cast Final Vote
            </button>
          </section>

          {/* Tribe Feed */}
          <div className="bg-stone-900/40 rounded-3xl p-5 border border-stone-800/60">
            <h3 className="text-[10px] font-black text-stone-600 mb-4 tracking-[0.2em] uppercase">
              Tribe Feed
            </h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black text-white border-2 border-stone-900 ring-1 ring-blue-900/50">
                LC
              </div>
              <div className="flex-1 text-xs">
                <span className="text-stone-200 font-bold">L Cee</span>
                <span className="text-stone-500"> established a new alliance</span>
              </div>
              <span className="text-stone-700 text-[10px] font-bold">JUST NOW</span>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-stone-950/90 backdrop-blur-xl border-t border-stone-800/80 px-6 py-4 flex justify-around z-50 nav-rounded">
          <button className="flex flex-col items-center gap-1.5 group">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
              <Vote className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-[10px] font-black tracking-widest text-orange-500 uppercase">Vote</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 group">
            <div className="w-10 h-10 rounded-2xl bg-stone-800/50 flex items-center justify-center group-hover:bg-stone-800 transition-all">
              <Trophy className="w-6 h-6 text-stone-600 group-hover:text-stone-400" />
            </div>
            <span className="text-[10px] font-black tracking-widest text-stone-600 group-hover:text-stone-400 uppercase">Rank</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 group">
            <div className="w-10 h-10 rounded-2xl bg-stone-800/50 flex items-center justify-center group-hover:bg-stone-800 transition-all">
              <Users className="w-6 h-6 text-stone-600 group-hover:text-stone-400" />
            </div>
            <span className="text-[10px] font-black tracking-widest text-stone-600 group-hover:text-stone-400 uppercase">Tribe</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
