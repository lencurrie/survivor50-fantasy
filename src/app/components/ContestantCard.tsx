import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, Target, Shield } from "lucide-react";

export interface Contestant {
  id: string;
  name: string;
  age: number;
  occupation: string;
  tribe: "Red" | "Blue" | "Yellow";
  imageUrl: string;
  points: number;
  challengeWins: number;
  immunityWins: number;
  isEliminated: boolean;
  isDrafted?: boolean;
}

interface ContestantCardProps {
  contestant: Contestant;
  onDraft?: (contestant: Contestant) => void;
  onRemove?: (contestant: Contestant) => void;
  showActions?: boolean;
}

export function ContestantCard({
  contestant,
  onDraft,
  onRemove,
  showActions = true,
}: ContestantCardProps) {
  const tribeColors = {
    Red: "bg-red-600",
    Blue: "bg-blue-600",
    Yellow: "bg-yellow-600",
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <ImageWithFallback
          src={contestant.imageUrl}
          alt={contestant.name}
          className="w-full h-48 object-cover"
        />
        <div
          className={`absolute top-2 right-2 ${tribeColors[contestant.tribe]} text-white px-3 py-1 rounded-full text-sm font-medium`}
        >
          {contestant.tribe} Tribe
        </div>
        {contestant.isEliminated && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white font-bold text-xl">ELIMINATED</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg">{contestant.name}</h3>
          <p className="text-sm text-muted-foreground">
            {contestant.age} • {contestant.occupation}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Trophy className="size-4 text-yellow-600" />
            <span className="font-semibold">{contestant.points} pts</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="size-4 text-orange-600" />
            <span>{contestant.challengeWins}</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="size-4 text-blue-600" />
            <span>{contestant.immunityWins}</span>
          </div>
        </div>

        {showActions && !contestant.isEliminated && (
          <div className="pt-2">
            {contestant.isDrafted ? (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => onRemove?.(contestant)}
              >
                Remove from Team
              </Button>
            ) : (
              <Button
                size="sm"
                className="w-full bg-orange-600 hover:bg-orange-700"
                onClick={() => onDraft?.(contestant)}
              >
                Draft Player
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
