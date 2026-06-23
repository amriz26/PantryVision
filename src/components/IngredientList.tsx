import type { Ingredient } from "@/types";

const chipStyle: Record<string, string> = {
  high: "bg-green-500/10 text-green-400 border-green-500/25 shadow-[0_0_8px_rgba(34,197,94,0.08)]",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/25",
  low: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

interface Props {
  ingredients: Ingredient[];
}

export default function IngredientList({ ingredients }: Props) {
  const high = ingredients.filter((i) => i.confidence === "high");
  const medium = ingredients.filter((i) => i.confidence === "medium");
  const low = ingredients.filter((i) => i.confidence === "low");

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Detected Ingredients
        </p>
        <span className="text-xs font-semibold text-slate-600">
          {ingredients.length} found
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {[...high, ...medium, ...low].map((ing, i) => (
          <span
            key={i}
            style={{ animationDelay: `${i * 40}ms` }}
            className={`animate-scale-in px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105 cursor-default ${chipStyle[ing.confidence]}`}
          >
            {ing.name}
            {ing.quantity ? (
              <span className="ml-1.5 opacity-60 font-normal">{ing.quantity}</span>
            ) : null}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mt-5 pt-4 border-t border-border">
        <span className="flex items-center gap-1.5 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-green-400" /> High confidence
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-yellow-400" /> Medium
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-slate-500" /> Low
        </span>
      </div>
    </div>
  );
}
