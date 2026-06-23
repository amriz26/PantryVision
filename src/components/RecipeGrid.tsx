"use client";

import { useState } from "react";
import type { Recipe } from "@/types";

const difficultyStyle: Record<string, string> = {
  Easy: "text-green-400 border-green-500/30",
  Medium: "text-yellow-400 border-yellow-500/30",
  Hard: "text-red-400 border-red-500/30",
};

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-surface2 border border-border rounded-2xl p-5 flex flex-col gap-3 hover:border-accent2 transition-all">
      <h3 className="font-bold text-base">{recipe.title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{recipe.description}</p>

      <div className="flex gap-2 flex-wrap">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border border-border bg-surface text-slate-300">
          {recipe.cook_time}
        </span>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-surface ${
            difficultyStyle[recipe.difficulty]
          }`}
        >
          {recipe.difficulty}
        </span>
      </div>

      {recipe.missing_ingredients.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-red-400 mb-1">You may need:</p>
          <p className="text-xs text-slate-500">{recipe.missing_ingredients.join(", ")}</p>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="text-left text-xs font-semibold text-accent2 hover:text-accent transition-colors"
      >
        {open ? "▼ Hide steps" : "▶ View steps"}
      </button>

      {open && (
        <ol className="flex flex-col gap-2 mt-1">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-2.5 text-xs text-slate-400 leading-relaxed">
              <span className="min-w-5 h-5 bg-accent text-white rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

interface Props {
  recipes: Recipe[];
  onRegenerate: () => void;
  loading: boolean;
}

export default function RecipeGrid({ recipes, onRegenerate, loading }: Props) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Recipe Suggestions
        </p>
        <button
          onClick={onRegenerate}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-surface2 border border-border text-sm font-semibold text-slate-300 hover:border-accent2 hover:text-accent2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Generating…" : "🔄 Regenerate"}
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-10 text-slate-500">
          <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full spinner mb-3" />
          Generating new recipes…
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recipes.map((r, i) => (
            <RecipeCard key={i} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
