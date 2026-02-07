import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Contestant {
  id: string;
  name: string;
  age: number;
  occupation: string;
  tribe: "Fire" | "Water" | "Earth";
  imageUrl: string;
  points: number;
  challengeWins: number;
  immunityWins: number;
  isEliminated: boolean;
  isDrafted?: boolean;
}

interface AvailableSurvivorCardProps {
  contestant: Contestant;
  onDraft?: (contestant: Contestant) => void;
}

export function AvailableSurvivorCard({ contestant, onDraft }: AvailableSurvivorCardProps) {
  const tribeColors = {
    Fire: "#d97839",
    Water: "#4a9fb8",
    Earth: "#6b8e3f",
  };

  return (
    <button
      onClick={() => !contestant.isDrafted && onDraft?.(contestant)}
      disabled={contestant.isDrafted}
      className="flex items-center gap-3 p-2 hover:bg-[#c4b59a] rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left w-full"
    >
      {/* Avatar */}
      <div className="relative">
        <div
          className="w-12 h-12 rounded-full overflow-hidden border-3 shadow-md"
          style={{ borderColor: tribeColors[contestant.tribe] }}
        >
          <ImageWithFallback
            src={contestant.imageUrl}
            alt={contestant.name}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Tribe indicator dot */}
        <div
          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#d4c5a9]"
          style={{ backgroundColor: tribeColors[contestant.tribe] }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-bold text-[#2c2416] truncate" style={{ fontFamily: "'Teko', sans-serif", fontSize: "18px" }}>
          {contestant.name}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#6b5635] font-semibold">{contestant.points} PTS</span>
        </div>
      </div>

      {/* Status */}
      {contestant.isDrafted && (
        <div className="text-xs bg-[#8b6f47] text-white px-2 py-1 rounded">
          DRAFTED
        </div>
      )}
    </button>
  );
}
