"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import ImageUploader from "@/components/ImageUploader";
import IngredientList from "@/components/IngredientList";
import RecipeGrid from "@/components/RecipeGrid";
import type { AppStep, Ingredient, Recipe } from "@/types";

const API = "/api";

function StepBadge({
  label,
  state,
}: {
  label: string;
  state: "pending" | "active" | "done";
}) {
  const styles = {
    pending: "bg-[#1a1d27] border-border text-slate-600",
    active:
      "bg-violet-500/15 border-violet-500/40 text-violet-300 shadow-[0_0_12px_rgba(124,109,250,0.2)]",
    done: "bg-green-500/10 border-green-500/30 text-green-400",
  };
  return (
    <span
      className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-500 ${styles[state]}`}
    >
      {state === "done" && (
        <span className="mr-1.5">✓</span>
      )}
      {state === "active" && (
        <span className="inline-flex gap-1 mr-1.5">
          <span className="w-1 h-1 rounded-full bg-violet-400 dot" />
          <span className="w-1 h-1 rounded-full bg-violet-400 dot" />
          <span className="w-1 h-1 rounded-full bg-violet-400 dot" />
        </span>
      )}
      {label}
    </span>
  );
}

export default function AppPage() {
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Subtle background orbs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="orb absolute -top-24 -left-24 w-96 h-96 bg-violet-600/10 animate-glow" />
        <div className="orb absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/8 animate-glow delay-500" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-4xl mx-auto border-b border-border/50">
        <Link href="/" className="gradient-text font-extrabold text-lg tracking-tight hover:opacity-80 transition-opacity">
          ← PantryVision
        </Link>
        <span className="text-xs text-slate-600 font-medium">AI Recipe Generator</span>
      </nav>

      <main className="relative z-10 flex flex-col items-center px-4 py-10 pb-24">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            What's in your{" "}
            <span className="gradient-text">fridge?</span>
          </h1>
          <p className="text-slate-500 text-sm">
            Upload or snap a photo — we'll handle the rest
          </p>
        </div>

        <div className="w-full max-w-3xl flex flex-col gap-5">
          {/* Uploader */}
          <div className="animate-fade-up delay-100">
            <ImageUploader onFile={handleFile} disabled={isAnalyzing} />
          </div>

          {/* Analyze button */}
          <div className="animate-fade-up delay-200">
            <button
              onClick={analyze}
              disabled={!file || isAnalyzing}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                !file || isAnalyzing
                  ? "bg-[#1a1d27] border border-border text-slate-600 cursor-not-allowed"
                  : "btn-shimmer text-white shadow-lg shadow-violet-900/40 hover:scale-[1.01] hover:shadow-violet-900/60 active:scale-[0.99]"
              }`}
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin-slow" />
                  {step === "detecting"
                    ? "Scanning for ingredients…"
                    : "Crafting your recipes…"}
                </span>
              ) : (
                "🔍  Analyse Fridge"
              )}
            </button>
          </div>

          {/* Step indicators */}
          {step !== "idle" && step !== "error" && (
            <div className="animate-scale-in flex items-center gap-3 justify-center">
              <StepBadge label="Detecting ingredients" state={stepState("detecting")} />
              <div className="flex-1 h-px max-w-16 bg-gradient-to-r from-border to-transparent" />
              <StepBadge label="Generating recipes" state={stepState("generating")} />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="animate-scale-in bg-red-500/8 border border-red-500/25 rounded-xl px-5 py-4 flex items-start gap-3">
              <span className="text-red-400 text-lg mt-0.5">⚠</span>
              <div>
                <p className="text-red-400 font-semibold text-sm mb-0.5">Something went wrong</p>
                <p className="text-red-400/70 text-xs">{error}</p>
              </div>
            </div>
          )}

          {/* Results */}
          {ingredients.length > 0 && (
            <div className="animate-fade-up">
              <IngredientList ingredients={ingredients} />
            </div>
          )}

          {recipes.length > 0 && (
            <div className="animate-fade-up">
              <RecipeGrid
                recipes={recipes}
                onRegenerate={regenerate}
                loading={regenLoading}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
