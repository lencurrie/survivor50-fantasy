import { Contestant } from "./AvailableSurvivorCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { X } from "lucide-react";

interface TeamRosterCardProps {
  contestant: Contestant;
  position: number;
  onRemove?: (contestant: Contestant) => void;
}

export function TeamRosterCard({ contestant, position, onRemove }: TeamRosterCardProps) {
  const tribeColors = {
    Fire: "#d97839",
    Water: "#4a9fb8",
    Earth: "#6b8e3f",
  };

  return (
    <div className="flex items-center gap-3 p-2 bg-[#c4b59a] rounded border-2 border-[#8b6f47] relative group">
      {/* Position number */}
      <div className="text-2xl font-bold text-[#6b5635] w-8 text-center" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        {position}
      </div>

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
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-bold text-[#2c2416]" style={{ fontFamily: "'Teko', sans-serif", fontSize: "18px" }}>
          {contestant.name}
        </div>
        <div className="text-sm text-[#6b5635] font-semibold">
          {contestant.points} PTS
        </div>
      </div>

      {/* Remove button */}
      {onRemove && (
        <button
          onClick={() => onRemove(contestant)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
