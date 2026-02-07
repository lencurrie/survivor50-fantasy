"use client";

import { useState } from "react";
import { Contestant, AvailableSurvivorCard } from "./components/AvailableSurvivorCard";
import { TribeEmblem } from "./components/TribeEmblem";
import { TeamRosterCard } from "./components/TeamRosterCard";
import { Button } from "./components/ui/button";
import { Users } from "lucide-react";

// Mock contestant data
const initialContestants: Contestant[] = [
  {
    id: "1",
    name: "Sarah Martinez",
    age: 32,
    occupation: "Firefighter",
    tribe: "Fire",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    points: 36,
    challengeWins: 3,
    immunityWins: 2,
    isEliminated: false,
  },
  {
    id: "2",
    name: "Marcus Chen",
    age: 28,
    occupation: "Software Engineer",
    tribe: "Water",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    points: 42,
    challengeWins: 4,
    immunityWins: 2,
    isEliminated: false,
  },
  {
    id: "3",
    name: "Jessica Thompson",
    age: 35,
    occupation: "Teacher",
    tribe: "Earth",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    points: 38,
    challengeWins: 2,
    immunityWins: 3,
    isEliminated: false,
  },
  {
    id: "4",
    name: "David Rodriguez",
    age: 41,
    occupation: "Chef",
    tribe: "Fire",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    points: 45,
    challengeWins: 5,
    immunityWins: 3,
    isEliminated: false,
  },
  {
    id: "5",
    name: "Emily Watson",
    age: 26,
    occupation: "Nurse",
    tribe: "Water",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    points: 34,
    challengeWins: 2,
    immunityWins: 1,
    isEliminated: false,
  },
  {
    id: "6",
    name: "James Anderson",
    age: 39,
    occupation: "Construction Worker",
    tribe: "Earth",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    points: 40,
    challengeWins: 4,
    immunityWins: 2,
    isEliminated: false,
  },
  {
    id: "7",
    name: "Amanda Brooks",
    age: 30,
    occupation: "Marketing Director",
    tribe: "Fire",
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    points: 35,
    challengeWins: 3,
    immunityWins: 1,
    isEliminated: false,
  },
  {
    id: "8",
    name: "Tyler Jackson",
    age: 24,
    occupation: "Personal Trainer",
    tribe: "Water",
    imageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
    points: 43,
    challengeWins: 5,
    immunityWins: 2,
    isEliminated: false,
  },
];

const mockStandings = [
  { rank: 1, name: "TEAM NAME", points: 1420, wins: 12, tieBreaker: "+1" },
  { rank: 2, name: "SURVIVOR 1", points: 1320, wins: 9, tieBreaker: "-3" },
  { rank: 3, name: "SURVIVOR 2", points: 1230, wins: 6, tieBreaker: "-1" },
  { rank: 4, name: "SURVIVOR 3", points: 1203, wins: 1, tieBreaker: "-2" },
];

export default function App() {
  const [contestants, setContestants] = useState<Contestant[]>(initialContestants);
  const [myTeam, setMyTeam] = useState<Contestant[]>([]);

  const handleDraft = (contestant: Contestant) => {
    if (myTeam.length >= 6) {
      alert("You can only draft up to 6 players!");
      return;
    }

    setMyTeam([...myTeam, contestant]);
    setContestants(
      contestants.map((c) =>
        c.id === contestant.id ? { ...c, isDrafted: true } : c
      )
    );
  };

  const handleRemove = (contestant: Contestant) => {
    setMyTeam(myTeam.filter((c) => c.id !== contestant.id));
    setContestants(
      contestants.map((c) =>
        c.id === contestant.id ? { ...c, isDrafted: false } : c
      )
    );
  };

  const firePoints = contestants.filter(c => c.tribe === "Fire").reduce((sum, c) => sum + c.points, 0);
  const waterPoints = contestants.filter(c => c.tribe === "Water").reduce((sum, c) => sum + c.points, 0);
  const earthPoints = contestants.filter(c => c.tribe === "Earth").reduce((sum, c) => sum + c.points, 0);

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative overflow-hidden border-b-4 border-[#8b6f47]">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1672841828482-45faa4c70e50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGlzbGFuZCUyMHN1bnNldCUyMGJlYWNofGVufDF8fHx8MTc3MDQ4NTk0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-12 flex items-center justify-between">
          {/* Hero Image Section */}
          <div className="flex items-center gap-8 flex-1">
            <img src="/survivor-contestants.png" alt="Survivor Contestants" className="h-48 rounded-lg shadow-2xl border-4 border-[#8b6f47]" />

            {/* Logo */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-[#d97839] rounded-full blur-xl opacity-50" />
                <div className="relative bg-[#2c3e3f] border-8 border-[#d97839] rounded-full w-48 h-48 flex flex-col items-center justify-center shadow-2xl">
                  <div className="text-7xl font-bold text-[#f5f1e8]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    50
                  </div>
                  <div className="text-4xl font-bold text-[#f5f1e8] -mt-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    SURVIVOR
                  </div>
                  <div className="text-sm text-[#d97839] font-semibold tracking-widest mt-1" style={{ fontFamily: "'Teko', sans-serif" }}>
                    FANTASY LEAGUE
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            <Button className="bg-[#d97839] hover:bg-[#c26830] text-white px-8 py-6 text-xl font-bold shadow-xl border-4 border-[#8b3a1a]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              JOIN NOW
            </Button>
            <Button className="bg-[#4a7b7c] hover:bg-[#3a6b6c] text-white px-8 py-6 text-xl font-bold shadow-xl border-4 border-[#2c5f60]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              DRAFT YOUR TEAM
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Tribal Council Update */}
            <div className="bg-[#d4c5a9] rounded-lg p-6 shadow-2xl border-4 border-[#8b6f47] relative">
              {/* Decorative tribal pattern border */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-[#d97839] px-6 py-2 border-4 border-[#8b3a1a] shadow-xl" style={{
                  clipPath: "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)"
                }}>
                  <h2 className="text-2xl font-bold text-white tracking-wider" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    LIVE TRIBAL COUNCIL UPDATE
                  </h2>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <TribeEmblem tribe="Fire" points={firePoints} trend="up" />
                <TribeEmblem tribe="Water" points={waterPoints} trend="neutral" />
                <TribeEmblem tribe="Earth" points={earthPoints} trend="down" />
              </div>
            </div>

            {/* Available Survivors */}
            <div className="bg-[#d4c5a9] rounded-lg p-6 shadow-2xl border-4 border-[#8b6f47]">
              <h2 className="text-3xl font-bold text-[#2c2416] mb-4 pb-3 border-b-2 border-[#8b6f47]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                AVAILABLE SURVIVORS
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {contestants.map((contestant) => (
                  <AvailableSurvivorCard
                    key={contestant.id}
                    contestant={contestant}
                    onDraft={handleDraft}
                  />
                ))}
              </div>
            </div>

            {/* Standings Table */}
            <div className="bg-[#d4c5a9] rounded-lg p-6 shadow-2xl border-4 border-[#8b6f47]">
              <h2 className="text-3xl font-bold text-[#2c2416] mb-4 pb-3 border-b-2 border-[#8b6f47]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                STANDINGS TABLE
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-[#8b6f47]">
                      <th className="text-left py-2 px-2 text-[#6b5635] font-bold" style={{ fontFamily: "'Teko', sans-serif" }}>RANK</th>
                      <th className="text-left py-2 px-2 text-[#6b5635] font-bold" style={{ fontFamily: "'Teko', sans-serif" }}>TEAM NAME</th>
                      <th className="text-right py-2 px-2 text-[#6b5635] font-bold" style={{ fontFamily: "'Teko', sans-serif" }}>TOTAL POINTS</th>
                      <th className="text-right py-2 px-2 text-[#6b5635] font-bold" style={{ fontFamily: "'Teko', sans-serif" }}>WINS</th>
                      <th className="text-right py-2 px-2 text-[#6b5635] font-bold" style={{ fontFamily: "'Teko', sans-serif" }}>TIE-BREAKER</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStandings.map((standing) => (
                      <tr key={standing.rank} className="border-b border-[#8b6f47]/30">
                        <td className="py-3 px-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#8b6f47] text-white font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                            {standing.rank}
                          </span>
                        </td>
                        <td className="py-3 px-2 font-bold text-[#2c2416]" style={{ fontFamily: "'Teko', sans-serif", fontSize: "18px" }}>
                          {standing.name}
                        </td>
                        <td className="py-3 px-2 text-right font-bold text-[#2c2416]" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px" }}>
                          {standing.points}
                        </td>
                        <td className="py-3 px-2 text-right font-bold text-[#2c2416]" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px" }}>
                          {standing.wins}
                        </td>
                        <td className="py-3 px-2 text-right font-bold text-[#2c2416]" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px" }}>
                          {standing.tieBreaker}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - My Team Roster */}
          <div className="space-y-6">
            <div className="bg-[#d4c5a9] rounded-lg p-6 shadow-2xl border-4 border-[#8b6f47] sticky top-20">
              <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#8b6f47]">
                <h2 className="text-3xl font-bold text-[#2c2416]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  MY TEAM ROSTER
                </h2>
                <div className="text-right">
                  <div className="text-sm text-[#6b5635] font-semibold">CAPTAIN</div>
                </div>
              </div>

              {myTeam.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-[#8b6f47] mx-auto mb-3" />
                  <p className="text-[#6b5635] font-semibold">Draft players to build your team</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {myTeam.map((contestant, index) => (
                    <TeamRosterCard
                      key={contestant.id}
                      contestant={contestant}
                      position={index + 1}
                      onRemove={handleRemove}
                    />
                  ))}

                  {/* Empty slots */}
                  {Array.from({ length: 6 - myTeam.length }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="flex items-center gap-3 p-2 bg-[#c4b59a]/50 rounded border-2 border-dashed border-[#8b6f47]"
                    >
                      <div className="text-2xl font-bold text-[#8b6f47] w-8 text-center" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        {myTeam.length + index + 1}
                      </div>
                      <div className="text-[#8b6f47] italic">Empty Slot</div>
                    </div>
                  ))}
                </div>
              )}

              {myTeam.length > 0 && (
                <Button className="w-full mt-6 bg-[#d97839] hover:bg-[#c26830] text-white py-6 text-xl font-bold shadow-xl border-4 border-[#8b3a1a]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  SAVE LINEUP
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
