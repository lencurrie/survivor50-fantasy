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
    return <div>Please sign in</div>;
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{league.name}</h1>
          <p className="text-gray-400">
            {league.season.name} • {league.members.length} members
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 transition">
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>

      {/* Invite Code */}
      {isOwner && (
        <div className="bg-orange-900/30 border border-orange-700 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-orange-300">Invite Code</p>
            <p className="text-2xl font-mono font-bold tracking-widest">{league.code}</p>
          </div>
          <p className="text-sm text-gray-400">Share this code with friends to join</p>
        </div>
      )}

      {/* Your Stats */}
      {userTeam && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Your Rank</p>
              <p className="text-3xl font-bold">#{userRank}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Total Points</p>
              <p className="text-3xl font-bold text-orange-500">{userTeam.totalScore}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Status</p>
              <p className="text-lg font-medium">Active</p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex items-center gap-2">
          <Trophy className="text-yellow-500" />
          <h2 className="text-xl font-bold">Leaderboard</h2>
        </div>
        <div className="divide-y divide-gray-700">
          {league.playerTeams.length === 0 ? (
            <p className="p-6 text-gray-400 text-center">No teams yet</p>
          ) : (
            league.playerTeams.map((team, index) => (
              <div
                key={team.id}
                className={`p-4 flex items-center justify-between ${
                  team.userId === userId ? "bg-orange-900/20" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-gray-500 w-8">#{index + 1}</span>
                  <div>
                    <p className="font-medium">
                      {team.user?.name || "Anonymous"}
                      {team.userId === userId && (
                        <span className="ml-2 text-xs bg-orange-600 px-2 py-0.5 rounded">You</span>
                      )}
                    </p>
                  </div>
                </div>
                <span className="text-xl font-bold text-orange-500">{team.totalScore} pts</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Members */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex items-center gap-2">
          <Users className="text-blue-500" />
          <h2 className="text-xl font-bold">Members</h2>
        </div>
        <div className="p-6 flex flex-wrap gap-3">
          {league.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg"
            >
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                {member.user?.name?.charAt(0) || "?"}
              </div>
              <span className="text-sm">{member.user?.name || "Anonymous"}</span>
              {member.userId === league.ownerId && (
                <span className="text-xs bg-yellow-600 px-1.5 py-0.5 rounded">Owner</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
