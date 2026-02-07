import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, Medal } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  userName: string;
  totalPoints: number;
  teamName: string;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userName: "SurvivorFan2024", totalPoints: 485, teamName: "Island Legends" },
  { rank: 2, userName: "TorchSnuffer", totalPoints: 462, teamName: "Tribal Council" },
  { rank: 3, userName: "OutwitOutplay", totalPoints: 441, teamName: "Immunity Idols" },
  { rank: 4, userName: "JeffProbstFan", totalPoints: 428, teamName: "Fire Tokens" },
  { rank: 5, userName: "VoteThemOut", totalPoints: 415, teamName: "Hidden Idols" },
  { rank: 6, userName: "SoleSurvivor", totalPoints: 398, teamName: "Merge Warriors" },
  { rank: 7, userName: "TribalCouncil", totalPoints: 387, teamName: "Challenge Beasts" },
  { rank: 8, userName: "YourTeam", totalPoints: 374, teamName: "Dream Team" },
];

export function Leaderboard() {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="size-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="size-5 text-gray-400" />;
    if (rank === 3) return <Medal className="size-5 text-amber-700" />;
    return <span className="font-bold text-muted-foreground">#{rank}</span>;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="size-6 text-orange-600" />
        <h2 className="text-2xl font-bold">Leaderboard</h2>
      </div>

      <div className="space-y-3">
        {mockLeaderboard.map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
              entry.userName === "YourTeam"
                ? "bg-orange-100 border-2 border-orange-600"
                : "bg-muted/50 hover:bg-muted"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 flex justify-center">{getRankIcon(entry.rank)}</div>
              <div>
                <p className="font-semibold">{entry.userName}</p>
                <p className="text-sm text-muted-foreground">{entry.teamName}</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {entry.totalPoints} pts
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
