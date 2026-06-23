"use client";

import { useState, useCallback } from "react";
import ImageUploader from "@/components/ImageUploader";
import IngredientList from "@/components/IngredientList";
import RecipeGrid from "@/components/RecipeGrid";
import type { AppStep, Ingredient, Recipe } from "@/types";

const API = "/api";

function StepBadge({ label, state }: { label: string; state: "pending" | "active" | "done" }) {
  const styles = {
    pending: "bg-surface2 border-border text-slate-500",
    active: "bg-accent border-accent text-white",
    done: "bg-green-500/10 border-green-500/30 text-green-400",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[state]}`}>
      {state === "done" ? "✓ " : ""}{label}
    </span>
  );
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<AppStep>("idle");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [regenLoading, setRegenLoading] = useState(false);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setStep("idle");
    setIngredients([]);
    setRecipes([]);
    setError(null);
  }, []);

  const analyze = async () => {
    if (!file) return;
    setError(null);
    setIngredients([]);
    setRecipes([]);
    setStep("detecting");

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch(`${API}/analyze`, { method: "POST", body: form });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail ?? `Server error ${res.status}`);
      }
      const data = await res.json();
      setIngredients(data.ingredients);
      setStep("generating");
      setRecipes(data.recipes);
      setStep("done");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("error");
    }
  };

  const regenerate = async () => {
    if (!ingredients.length) return;
    setRegenLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/regenerate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredients.map((i) => i.name) }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail ?? `Server error ${res.status}`);
      }
      const data = await res.json();
      setRecipes(data.recipes);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setRegenLoading(false);
    }
  };

  const isAnalyzing = step === "detecting" || step === "generating";

  const stepState = (target: "detecting" | "generating"): "pending" | "active" | "done" => {
    if (step === target) return "active";
    if (target === "detecting" && (step === "generating" || step === "done")) return "done";
    if (target === "generating" && step === "done") return "done";
    return "pending";
  };

  return (
    <main className="flex flex-col items-center px-4 py-12 pb-24">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent2 to-accent bg-clip-text text-transparent">
        PantryVision
      </h1>
      <p className="text-slate-500 text-sm mb-10">
        Upload a fridge photo — get recipes instantly
      </p>

      <div className="w-full max-w-3xl flex flex-col gap-5">
        {/* Uploader */}
        <ImageUploader onFile={handleFile} disabled={isAnalyzing} />

        {/* Analyze button */}
        <button
          onClick={analyze}
          disabled={!file || isAnalyzing}
          className="w-full py-3.5 rounded-xl bg-accent text-white font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinner" />
              {step === "detecting" ? "Detecting ingredients…" : "Generating recipes…"}
            </span>
          ) : (
            "🔍 Analyze Fridge"
          )}
        </button>

        {/* Step indicators */}
        {step !== "idle" && step !== "error" && (
          <div className="flex items-center gap-3">
            <StepBadge label="1 · Detecting ingredients" state={stepState("detecting")} />
            <div className="flex-1 h-px bg-border" />
            <StepBadge label="2 · Generating recipes" state={stepState("generating")} />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Results */}
        {ingredients.length > 0 && <IngredientList ingredients={ingredients} />}

        {recipes.length > 0 && (
          <RecipeGrid recipes={recipes} onRegenerate={regenerate} loading={regenLoading} />
        )}
      </div>
    </main>
  );
}
