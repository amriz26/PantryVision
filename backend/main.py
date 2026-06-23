import base64
import json
import re
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import anthropic

app = FastAPI(title="PantryVision API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic()
MODEL = "claude-sonnet-4-6"


class RegenerateRequest(BaseModel):
    ingredients: list[str]


def extract_json(text: str) -> any:
    match = re.search(r"```(?:json)?\s*([\s\S]*?)```", text)
    if match:
        return json.loads(match.group(1).strip())
    return json.loads(text.strip())


def detect_ingredients(image_b64: str, media_type: str) -> list[dict]:
    response = client.messages.create(
        model=MODEL,
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": media_type,
                            "data": image_b64,
                        },
                    },
                    {
                        "type": "text",
                        "text": (
                            "You are a kitchen inventory expert. Analyze this fridge/pantry image "
                            "and identify all visible food ingredients and items. "
                            "Respond ONLY with a JSON array of objects. Each object must have exactly: "
                            '{"name": "ingredient name", "quantity": "estimated amount or null", "confidence": "high|medium|low"}. '
                            "No extra text, no markdown, just the JSON array."
                        ),
                    },
                ],
            }
        ],
    )
    return extract_json(response.content[0].text)


def generate_recipes(ingredients: list[str]) -> list[dict]:
    ingredient_list = ", ".join(ingredients)
    response = client.messages.create(
        model=MODEL,
        max_tokens=4096,
        messages=[
            {
                "role": "user",
                "content": (
                    f"You are a creative chef. Given these ingredients: {ingredient_list}\n\n"
                    "Generate exactly 3 diverse meal recipes. Respond ONLY with a JSON array of objects. "
                    "Each object must have exactly: "
                    '{"title": "recipe name", "description": "one sentence description", '
                    '"ingredients_needed": ["list", "of", "ingredients"], '
                    '"missing_ingredients": ["ingredients not in the pantry but needed"], '
                    '"cook_time": "e.g. 30 minutes", "difficulty": "Easy|Medium|Hard", '
                    '"steps": ["step 1", "step 2", ...]}. '
                    "No extra text, no markdown, just the JSON array."
                ),
            }
        ],
    )
    return extract_json(response.content[0].text)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    data = await file.read()
    image_b64 = base64.standard_b64encode(data).decode("utf-8")
    media_type = file.content_type

    try:
        ingredients = detect_ingredients(image_b64, media_type)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ingredient detection failed: {e}")

    ingredient_names = [i["name"] for i in ingredients]

    try:
        recipes = generate_recipes(ingredient_names)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recipe generation failed: {e}")

    return {"ingredients": ingredients, "recipes": recipes}


@app.post("/regenerate")
def regenerate(body: RegenerateRequest):
    if not body.ingredients:
        raise HTTPException(status_code=400, detail="Ingredients list is empty")
    try:
        recipes = generate_recipes(body.ingredients)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recipe generation failed: {e}")
    return {"recipes": recipes}
