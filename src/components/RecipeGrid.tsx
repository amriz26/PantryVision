"use client";

import { useState } from "react";
import type { Recipe } from "@/types";

const difficultyConfig: Record<string, { color: string; dot: string }> = {
  Easy:   { color: "text-green-400 border-green-500/25 bg-green-500/8",  dot: "bg-green-400" },
  Medium: { color: "text-yellow-400 border-yellow-500/25 bg-yellow-500/8", dot: "bg-yellow-400" },
  Hard:   { color: "text-red-400 border-red-500/25 bg-red-500/8",          dot: "bg-red-400" },
};

function RecipeCard({ recipe, index }: { recipe: Recipe; index: number }) {
  const [open, setOpen] = useState(false);
  const diff = difficultyConfig[recipe.difficulty] ?? difficultyConfig.Medium;

  return (
    <div
      style={{ animationDelay: `${index * 100}ms` }}
      className="animate-fade-up glass rounded-2xl p-5 flex flex-col gap-4 card-hover group"
    >
      {/* Header */}
      <div>
        <h3 className="font-bold text-white text-base leading-snug mb-1.5 group-hover:text-accent2 transition-colors">
          {recipe.title}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed">{recipe.description}</p>
      </div>

      {/* Meta badges */}
      <div className="flex gap-2 flex-wrap">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#0f1117] border border-border text-slate-400">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {recipe.cook_time}
        </span>
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${diff.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
          {recipe.difficulty}
        </span>
      </div>

      {/* Missing ingredients */}
      {recipe.missing_ingredients.length > 0 && (
        <div className="bg-orange-500/5 border border-orange-500/15 rounded-xl px-3 py-2.5">
          <p className="text-xs font-semibold text-orange-400 mb-1">You may also need:</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            {recipe.missing_ingredients.join(" · ")}
          </p>
        </div>
      )}

      {/* Steps accordion */}
      <div className="border-t border-border pt-3">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center justify-between w-full text-left group/btn"
        >
          <span className="text-xs font-semibold text-slate-500 group-hover/btn:text-violet-400 transition-colors">
            {open ? "Hide" : "View"} {recipe.steps.length} steps
          </span>
          <svg
            className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <ol className="mt-4 flex flex-col gap-3">
            {recipe.steps.map((step, i) => (
              <li
                key={i}
                style={{ animationDelay: `${i * 50}ms` }}
                className="animate-slide-right flex gap-3 text-xs text-slate-400 leading-relaxed"
              >
                <span className="min-w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
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
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Recipe Suggestions
        </p>
        <button
          onClick={onRegenerate}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 border border-border hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg
            className={`w-3.5 h-3.5 ${loading ? "animate-spin-slow" : ""}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {loading ? "Generating…" : "Regenerate"}
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-16 text-slate-600">
          <div className="flex gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 dot" />
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 dot" />
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 dot" />
          </div>
          <p className="text-sm">Crafting new recipe ideas…</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recipes.map((r, i) => (
            <RecipeCard key={i} recipe={r} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
