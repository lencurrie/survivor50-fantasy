import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Plus, Users, Trophy } from "lucide-react";
import { prisma } from "@/lib/db";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    return <div className="text-[#f5f1e8] text-center py-12">Please sign in</div>;
  }

  // Fetch leagues where user is a member
  const memberships = await prisma.leagueMember.findMany({
    where: { userId },
    include: {
      league: {
        include: {
          season: true,
          playerTeams: {
            orderBy: { totalScore: "desc" },
            include: { user: true },
          },
          _count: { select: { members: true } },
        },
      },
    },
  });

  const leagues = memberships.map((m) => {
    const userTeam = m.league.playerTeams.find((pt) => pt.userId === userId);
    const userRank = m.league.playerTeams.findIndex((pt) => pt.userId === userId) + 1;
    return {
      id: m.league.id,
      name: m.league.name,
      memberCount: m.league._count.members,
      yourRank: userRank || m.league.playerTeams.length,
      yourPoints: userTeam?.totalScore || 0,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#f5f1e8]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Your Dashboard</h1>
          <p className="text-[#c4b59a]">Manage your leagues and track your performance</p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/league/create"
            className="bg-[#d97839] hover:bg-[#c26830] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition border-2 border-[#8b3a1a]"
            style={{ fontFamily: "'Teko', sans-serif" }}
          >
            <Plus size={20} />
            Create League
          </Link>
          <Link
            href="/league/join"
            className="bg-[#4a7b7c] hover:bg-[#3a6b6c] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition border-2 border-[#2c5f60]"
            style={{ fontFamily: "'Teko', sans-serif" }}
          >
            <Users size={20} />
            Join League
          </Link>
        </div>
      </div>

      {leagues.length === 0 ? (
        <div className="bg-[#d4c5a9] rounded-lg p-12 text-center border-4 border-[#8b6f47] shadow-2xl">
          <Trophy className="w-16 h-16 text-[#d97839] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-[#2c2416]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>No Leagues Yet</h2>
          <p className="text-[#6b5635] mb-6 max-w-md mx-auto">
            Create your first league or join one with an invite code to start playing Survivor Fantasy.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/league/create"
              className="bg-[#d97839] hover:bg-[#c26830] text-white px-6 py-3 rounded-lg font-bold transition border-2 border-[#8b3a1a]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Create League
            </Link>
            <Link
              href="/league/join"
              className="bg-[#4a7b7c] hover:bg-[#3a6b6c] text-white px-6 py-3 rounded-lg font-bold transition border-2 border-[#2c5f60]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Join League
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leagues.map((league) => (
            <Link
              key={league.id}
              href={`/league/${league.id}`}
              className="bg-[#d4c5a9] rounded-lg p-6 border-4 border-[#8b6f47] hover:border-[#d97839] transition group shadow-xl"
            >
              <h3 className="text-xl font-bold text-[#2c2416] group-hover:text-[#d97839] transition" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{league.name}</h3>
              <p className="text-[#6b5635] text-sm mt-1" style={{ fontFamily: "'Teko', sans-serif" }}>{league.memberCount} members</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-[#6b5635]" style={{ fontFamily: "'Teko', sans-serif" }}>Your rank: #{league.yourRank}</span>
                <span className="text-[#d97839] font-bold text-lg" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{league.yourPoints} PTS</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Survivor 50 Info Card */}
      <div className="bg-[#d4c5a9] rounded-lg p-8 border-4 border-[#8b6f47] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-[#d97839] px-6 py-2 border-4 border-[#8b3a1a] shadow-xl" style={{
            clipPath: "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)"
          }}>
            <h2 className="text-xl font-bold text-white tracking-wider" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              SURVIVOR 50: LEGENDS
            </h2>
          </div>
        </div>
        <div className="flex items-start gap-6 mt-6">
          <div className="text-5xl">🏝️</div>
          <div>
            <p className="text-[#2c2416] mb-4">
              The 50th season featuring 20 returning players competing for $1 million.
              Celebrate the milestone with our fantasy league!
            </p>
            <div className="flex gap-3 text-sm">
              <span className="bg-[#8b6f47] text-white px-3 py-1 rounded-full font-bold" style={{ fontFamily: "'Teko', sans-serif" }}>20 Castaways</span>
              <span className="bg-[#8b6f47] text-white px-3 py-1 rounded-full font-bold" style={{ fontFamily: "'Teko', sans-serif" }}>39 Days</span>
              <span className="bg-[#8b6f47] text-white px-3 py-1 rounded-full font-bold" style={{ fontFamily: "'Teko', sans-serif" }}>1 Sole Survivor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
