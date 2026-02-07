import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Share2, Users, Trophy } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LeaguePage({ params }: PageProps) {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) {
    return <div className="text-[#f5f1e8] text-center py-12">Please sign in</div>;
  }

  const league = await prisma.league.findUnique({
    where: { id },
    include: {
      season: true,
      owner: true,
      members: {
        include: {
          user: true,
        },
      },
      playerTeams: {
        include: {
          user: true,
        },
        orderBy: {
          totalScore: "desc",
        },
      },
    },
  });

  if (!league) {
    notFound();
  }

  const isOwner = league.ownerId === userId;
  const userTeam = league.playerTeams.find((pt) => pt.userId === userId);
  const userRank = league.playerTeams.findIndex((pt) => pt.userId === userId) + 1;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[#f5f1e8]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{league.name}</h1>
          <p className="text-[#c4b59a]" style={{ fontFamily: "'Teko', sans-serif", fontSize: "18px" }}>
            {league.season.name} &bull; {league.members.length} members
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#4a7b7c] hover:bg-[#3a6b6c] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition border-2 border-[#2c5f60]" style={{ fontFamily: "'Teko', sans-serif" }}>
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>

      {/* Invite Code */}
      {isOwner && (
        <div className="bg-[#d4c5a9] rounded-lg p-4 flex items-center justify-between border-4 border-[#8b6f47] shadow-xl">
          <div>
            <p className="text-sm text-[#6b5635] font-bold" style={{ fontFamily: "'Teko', sans-serif" }}>Invite Code</p>
            <p className="text-2xl font-mono font-bold tracking-widest text-[#d97839]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{league.code}</p>
          </div>
          <p className="text-sm text-[#6b5635]">Share this code with friends to join</p>
        </div>
      )}

      {/* Your Stats */}
      {userTeam && (
        <div className="bg-[#d4c5a9] rounded-lg p-6 border-4 border-[#8b6f47] shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6b5635] text-sm font-bold" style={{ fontFamily: "'Teko', sans-serif" }}>Your Rank</p>
              <p className="text-3xl font-bold text-[#2c2416]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>#{userRank}</p>
            </div>
            <div className="text-center">
              <p className="text-[#6b5635] text-sm font-bold" style={{ fontFamily: "'Teko', sans-serif" }}>Total Points</p>
              <p className="text-3xl font-bold text-[#d97839]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{userTeam.totalScore}</p>
            </div>
            <div className="text-right">
              <p className="text-[#6b5635] text-sm font-bold" style={{ fontFamily: "'Teko', sans-serif" }}>Status</p>
              <p className="text-lg font-bold text-[#2c2416]" style={{ fontFamily: "'Teko', sans-serif" }}>Active</p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="bg-[#d4c5a9] rounded-lg border-4 border-[#8b6f47] shadow-xl overflow-hidden">
        <div className="p-6 border-b-2 border-[#8b6f47] flex items-center gap-2">
          <Trophy className="text-[#d97839]" />
          <h2 className="text-xl font-bold text-[#2c2416]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Leaderboard</h2>
        </div>
        <div className="divide-y divide-[#8b6f47]/30">
          {league.playerTeams.length === 0 ? (
            <p className="p-6 text-[#6b5635] text-center">No teams yet</p>
          ) : (
            league.playerTeams.map((team, index) => (
              <div
                key={team.id}
                className={`p-4 flex items-center justify-between ${
                  team.userId === userId ? "bg-[#d97839]/10" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#8b6f47] text-white font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-bold text-[#2c2416]" style={{ fontFamily: "'Teko', sans-serif", fontSize: "18px" }}>
                      {team.user?.name || "Anonymous"}
                      {team.userId === userId && (
                        <span className="ml-2 text-xs bg-[#d97839] text-white px-2 py-0.5 rounded">You</span>
                      )}
                    </p>
                  </div>
                </div>
                <span className="text-xl font-bold text-[#d97839]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{team.totalScore} PTS</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Members */}
      <div className="bg-[#d4c5a9] rounded-lg border-4 border-[#8b6f47] shadow-xl overflow-hidden">
        <div className="p-6 border-b-2 border-[#8b6f47] flex items-center gap-2">
          <Users className="text-[#4a9fb8]" />
          <h2 className="text-xl font-bold text-[#2c2416]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Members</h2>
        </div>
        <div className="p-6 flex flex-wrap gap-3">
          {league.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-2 bg-[#c4b59a] px-3 py-2 rounded-lg border-2 border-[#8b6f47]"
            >
              <div className="w-8 h-8 bg-[#d97839] rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {member.user?.name?.charAt(0) || "?"}
              </div>
              <span className="text-sm text-[#2c2416] font-bold" style={{ fontFamily: "'Teko', sans-serif" }}>{member.user?.name || "Anonymous"}</span>
              {member.userId === league.ownerId && (
                <span className="text-xs bg-[#d97839] text-white px-1.5 py-0.5 rounded font-bold">Owner</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
