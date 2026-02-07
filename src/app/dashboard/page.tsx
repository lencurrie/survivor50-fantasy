import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Plus, Users, Trophy } from "lucide-react";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    return <div>Please sign in</div>;
  }

  // Static data for now - will connect to DB later
  const leagues: any[] = []; 

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <p className="text-gray-400">Manage your leagues and track your performance</p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/league/create"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <Plus size={20} />
            Create League
          </Link>
          <Link
            href="/league/join"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <Users size={20} />
            Join League
          </Link>
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl p-12 text-center border border-gray-700">
        <Trophy className="w-16 h-16 text-orange-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Coming Soon!</h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Database connection pending. Create your first league or join one with an invite code to start playing Survivor Fantasy.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/league/create"
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Create League
          </Link>
          <Link
            href="/league/join"
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Join League
          </Link>
        </div>
      </div>

      {/* Survivor 50 Info Card */}
      <div className="bg-gradient-to-r from-orange-900 to-red-900 rounded-2xl p-8 border border-orange-700">
        <div className="flex items-start gap-6">
          <div className="text-5xl">🏝️</div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Survivor 50: Legends</h2>
            <p className="text-orange-200 mb-4">
              The 50th season featuring 20 returning players competing for $1 million. 
              Celebrate the milestone with our fantasy league!
            </p>
            <div className="flex gap-4 text-sm">
              <span className="bg-orange-800 px-3 py-1 rounded-full">20 Castaways</span>
              <span className="bg-orange-800 px-3 py-1 rounded-full">39 Days</span>
              <span className="bg-orange-800 px-3 py-1 rounded-full">1 Sole Survivor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
