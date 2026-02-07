import { Flame } from "lucide-react";

interface TribeEmblemProps {
  tribe: "Fire" | "Water" | "Earth";
  points: number;
  trend: "up" | "down" | "neutral";
}

export function TribeEmblem({ tribe, points, trend }: TribeEmblemProps) {
  const tribeConfig = {
    Fire: {
      color: "#d97839",
      bgColor: "#8b3a1a",
      icon: "🔥",
    },
    Water: {
      color: "#4a9fb8",
      bgColor: "#2c5f6d",
      icon: "💧",
    },
    Earth: {
      color: "#6b8e3f",
      bgColor: "#3d5124",
      icon: "🌿",
    },
  };

  const config = tribeConfig[tribe];

  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-[#d4c5a9] rounded-lg border-4 border-[#8b6f47] shadow-lg relative">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#6b5635]" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#6b5635]" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#6b5635]" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#6b5635]" />

      {/* Tribe emblem circle */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center text-5xl border-4 shadow-xl relative"
        style={{
          backgroundColor: config.bgColor,
          borderColor: config.color,
        }}
      >
        <div className="absolute inset-0 rounded-full opacity-30 bg-gradient-to-b from-white to-transparent" />
        <span className="relative z-10 drop-shadow-lg">{config.icon}</span>
      </div>

      {/* Tribe name */}
      <div className="text-center">
        <div
          className="font-bold text-lg tracking-wider uppercase"
          style={{ fontFamily: "'Teko', sans-serif", color: config.color }}
        >
          {tribe} Tribe
        </div>
        
        {/* Points */}
        <div className="text-3xl font-bold text-[#2c2416]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          {points} PTS
        </div>

        {/* Trend indicator */}
        <div className="flex items-center justify-center gap-1 text-xs mt-1">
          <span className={trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"}>
            {trend === "up" ? "▲" : trend === "down" ? "▼" : "●"}
          </span>
          <span className="text-[#6b5635] font-medium">TREND</span>
        </div>
      </div>
    </div>
  );
}
