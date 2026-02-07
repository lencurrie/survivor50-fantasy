import { Card } from "./ui/card";
import { Trophy, Target, Shield, Star, Users, Flame } from "lucide-react";

const scoringRules = [
  {
    icon: Target,
    label: "Challenge Win",
    points: "+15 points",
    color: "text-orange-600",
  },
  {
    icon: Shield,
    label: "Immunity Win",
    points: "+20 points",
    color: "text-blue-600",
  },
  {
    icon: Star,
    label: "Find Hidden Idol",
    points: "+25 points",
    color: "text-purple-600",
  },
  {
    icon: Users,
    label: "Make the Merge",
    points: "+50 points",
    color: "text-green-600",
  },
  {
    icon: Flame,
    label: "Survive Tribal Council",
    points: "+10 points",
    color: "text-red-600",
  },
  {
    icon: Trophy,
    label: "Sole Survivor",
    points: "+100 points",
    color: "text-yellow-600",
  },
];

export function ScoringRules() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Scoring Rules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scoringRules.map((rule) => {
          const Icon = rule.icon;
          return (
            <div
              key={rule.label}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
            >
              <Icon className={`size-6 ${rule.color}`} />
              <div className="flex-1">
                <p className="font-semibold">{rule.label}</p>
                <p className="text-sm text-muted-foreground">{rule.points}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
