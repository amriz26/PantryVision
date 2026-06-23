import type { Ingredient } from "@/types";

const confidenceStyle: Record<string, string> = {
  high: "bg-green-500/10 text-green-400 border-green-500/30",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  low: "bg-red-500/10 text-red-400 border-red-500/30",
};

interface Props {
  ingredients: Ingredient[];
}

export default function IngredientList({ ingredients }: Props) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
        Detected Ingredients
      </p>
      <div className="flex flex-wrap gap-2">
        {ingredients.map((ing, i) => (
          <span
            key={i}
            className={`px-3 py-1 rounded-full text-sm font-medium border ${confidenceStyle[ing.confidence]}`}
          >
            {ing.name}
            {ing.quantity ? ` · ${ing.quantity}` : ""}
          </span>
        ))}
      </div>
      <p className="text-xs text-slate-600 mt-4">
        Color indicates confidence: <span className="text-green-400">green</span> = high,{" "}
        <span className="text-yellow-400">yellow</span> = medium,{" "}
        <span className="text-red-400">red</span> = low
      </p>
    </div>
  );
}
