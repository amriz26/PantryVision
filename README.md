# PantryVision

A Fridge-to-Recipe Vision Pipeline powered by Claude's vision API. Upload a photo of your fridge (or snap one with your webcam), and the app detects your ingredients and generates three tailored meal recipes — all in your browser, no build step required.

---

## Features

- **Fridge photo analysis** — drag-and-drop or file picker upload
- **Live webcam capture** — snap directly from your camera
- **Ingredient detection** — Claude vision identifies items with name, quantity, and confidence level
- **Recipe generation** — three diverse meal suggestions with cook time, difficulty, step-by-step instructions, and a list of any missing ingredients
- **Regenerate** — get three new recipes from the same ingredient list without re-uploading
- **Single-file frontend** — plain HTML + vanilla JS, no build toolchain

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Backend  | Python · FastAPI · Uvicorn        |
| AI       | Anthropic Claude (`claude-sonnet-4-6`) |
| Frontend | Vanilla JS · Single `index.html`  |
| Images   | Base64 encoding · Multipart upload |

---

## Project Structure

```
PantryVision/
├── main.py          # FastAPI backend (API routes + Claude calls)
├── index.html       # Frontend (served by FastAPI at /)
└── requirements.txt # Python dependencies
```

---

## Getting Started

### Prerequisites

- Python 3.10+
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
git clone https://github.com/amriz26/PantryVision.git
cd PantryVision
pip install -r requirements.txt
```

### Configuration

```bash
export ANTHROPIC_API_KEY=your_api_key_here
```

### Run

```bash
uvicorn main:app --reload
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## API Reference

| Method | Endpoint      | Description                                              |
|--------|---------------|----------------------------------------------------------|
| GET    | `/`           | Serves the frontend (`index.html`)                       |
| GET    | `/health`     | Health check — returns `{"status": "ok"}`                |
| POST   | `/analyze`    | Accepts an image (multipart), returns ingredients + recipes |
| POST   | `/regenerate` | Accepts `{"ingredients": [...]}`, returns 3 new recipes  |

### `/analyze` response shape

```json
{
  "ingredients": [
    { "name": "eggs", "quantity": "6", "confidence": "high" }
  ],
  "recipes": [
    {
      "title": "Veggie Omelette",
      "description": "A quick and fluffy omelette.",
      "ingredients_needed": ["eggs", "bell pepper", "onion"],
      "missing_ingredients": ["bell pepper"],
      "cook_time": "10 minutes",
      "difficulty": "Easy",
      "steps": ["Beat the eggs...", "Heat a pan..."]
    }
  ]
}
```

---

## How It Works

1. **Upload** a fridge photo or snap one with the webcam.
2. The image is base64-encoded and sent to `POST /analyze`.
3. Claude's vision model scans the image and returns a structured JSON list of detected ingredients.
4. A second Claude call takes the ingredient list and generates three recipes.
5. Results are rendered in the browser — ingredient chips (color-coded by confidence) and expandable recipe cards.
6. Hit **Regenerate Recipes** to get fresh suggestions without re-analyzing the image.

---

## License

MIT
