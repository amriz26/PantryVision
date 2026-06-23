export type Confidence = "high" | "medium" | "low";

export interface Ingredient {
  name: string;
  quantity: string | null;
  confidence: Confidence;
}

export interface Recipe {
  title: string;
  description: string;
  ingredients_needed: string[];
  missing_ingredients: string[];
  cook_time: string;
  difficulty: "Easy" | "Medium" | "Hard";
  steps: string[];
}

export interface AnalyzeResponse {
  ingredients: Ingredient[];
  recipes: Recipe[];
}

export interface RegenerateResponse {
  recipes: Recipe[];
}

export type AppStep = "idle" | "detecting" | "generating" | "done" | "error";
