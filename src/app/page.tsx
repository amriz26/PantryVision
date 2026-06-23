import Link from "next/link";

const features = [
  {
    icon: "👁️",
    title: "Vision-Powered Detection",
    desc: "Claude's multimodal AI scans your fridge photo and identifies every ingredient — even half-used containers.",
  },
  {
    icon: "🍳",
    title: "Instant Recipe Ideas",
    desc: "Get three tailored meal suggestions generated from exactly what you have, with clear step-by-step instructions.",
  },
  {
    icon: "🔄",
    title: "Regenerate on Demand",
    desc: "Don't love the suggestions? Regenerate fresh recipes from the same ingredient list without re-uploading.",
  },
  {
    icon: "📸",
    title: "Webcam or Upload",
    desc: "Snap a photo directly in your browser or upload one from your device — no app install needed.",
  },
];

const steps = [
  {
    n: "01",
    title: "Photograph your fridge",
    desc: "Open your fridge and snap a photo, or point your webcam at it. Any angle works.",
  },
  {
    n: "02",
    title: "AI detects ingredients",
    desc: "Claude's vision model scans the image and builds a precise list of everything it sees.",
  },
  {
    n: "03",
    title: "Get personalised recipes",
    desc: "Three diverse meals are generated from your pantry in seconds — with cook times and difficulty ratings.",
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="orb absolute -top-32 -left-32 w-[600px] h-[600px] bg-violet-600/20 animate-glow" />
        <div className="orb absolute top-1/2 -right-48 w-[500px] h-[500px] bg-indigo-600/15 animate-glow delay-300" />
        <div className="orb absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-sky-600/10 animate-glow delay-600" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <span className="gradient-text font-extrabold text-xl tracking-tight">PantryVision</span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/amriz26/PantryVision"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            GitHub ↗
          </a>
          <Link
            href="/app"
            className="px-4 py-2 rounded-xl bg-surface border border-border text-sm font-semibold text-white hover:border-accent2 hover:text-accent2 transition-all"
          >
            Open App
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-28">
        <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-semibold mb-8 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Powered by Claude claude-sonnet-4-6 Vision
        </div>

        <h1 className="animate-fade-up delay-100 text-5xl sm:text-7xl font-black leading-[1.05] tracking-tighter max-w-3xl mb-6">
          Your fridge,{" "}
          <span className="gradient-text">transformed</span>
          {" "}into meals.
        </h1>

        <p className="animate-fade-up delay-200 text-slate-400 text-lg sm:text-xl max-w-xl leading-relaxed mb-10">
          Snap a photo of your fridge. PantryVision detects every ingredient
          and instantly generates personalised recipes — zero guesswork.
        </p>

        <div className="animate-fade-up delay-300 flex flex-wrap gap-3 justify-center">
          <Link
            href="/app"
            className="btn-shimmer px-7 py-3.5 rounded-xl text-white font-bold text-sm shadow-lg shadow-violet-900/40 hover:scale-105 transition-transform"
          >
            Analyse My Fridge →
          </Link>
          <a
            href="https://github.com/amriz26/PantryVision"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-xl glass text-slate-300 font-semibold text-sm hover:text-white hover:border-accent2 transition-all"
          >
            View on GitHub
          </a>
        </div>

        {/* Hero mockup */}
        <div className="animate-fade-up delay-400 relative mt-20 w-full max-w-3xl">
          <div className="glass rounded-2xl p-1 shadow-2xl shadow-violet-950/50">
            <div className="bg-[#0f1117] rounded-xl overflow-hidden">
              {/* Fake browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 flex-1 bg-surface rounded-md px-3 py-1 text-xs text-slate-500">
                  localhost:3000/app
                </span>
              </div>
              {/* Fake UI */}
              <div className="p-6 space-y-4">
                {/* Upload zone mock */}
                <div className="border-2 border-dashed border-violet-500/30 rounded-xl p-8 text-center bg-violet-500/5">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-violet-500/20 flex items-center justify-center text-xl">
                    📷
                  </div>
                  <p className="text-sm font-semibold text-slate-300">Drop your fridge photo here</p>
                  <p className="text-xs text-slate-600 mt-1">or click to browse</p>
                </div>
                {/* Ingredient chips mock */}
                <div className="flex flex-wrap gap-2">
                  {["🥚 Eggs · 6", "🥛 Milk · 1L", "🧀 Cheddar", "🥦 Broccoli", "🧅 Onion", "🫒 Olive Oil"].map((item) => (
                    <span key={item} className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/25">
                      {item}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/25">
                    🧄 Garlic · approx 3
                  </span>
                </div>
                {/* Recipe cards mock */}
                <div className="grid grid-cols-3 gap-3">
                  {["Veggie Omelette", "Broccoli Cheddar Soup", "Frittata"].map((r, i) => (
                    <div key={r} className="bg-[#1a1d27] border border-border rounded-xl p-3">
                      <p className="text-xs font-bold text-white mb-1">{r}</p>
                      <div className="flex gap-1">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-surface border border-border text-slate-400">
                          {["20 min", "35 min", "25 min"][i]}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] border ${["bg-green-500/10 border-green-500/25 text-green-400", "bg-yellow-500/10 border-yellow-500/25 text-yellow-400", "bg-green-500/10 border-green-500/25 text-green-400"][i]}`}>
                          {["Easy", "Medium", "Easy"][i]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Glow under card */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-violet-600/20 blur-3xl rounded-full" />
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Everything you need,{" "}
            <span className="gradient-text">nothing you don't</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`glass rounded-2xl p-6 card-hover animate-fade-up delay-${(i + 1) * 100}`}
            >
              <div className="w-11 h-11 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="font-bold text-white mb-2 text-sm">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Three steps to dinner
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden sm:block absolute top-8 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
          {steps.map((s, i) => (
            <div key={s.n} className={`flex flex-col items-center text-center animate-fade-up delay-${(i + 1) * 200}`}>
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <span className="text-2xl font-black gradient-text">{s.n}</span>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-violet-500/10 animate-pulse" />
              </div>
              <h3 className="font-bold text-white mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-2xl mx-auto text-center glass rounded-3xl px-10 py-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to cook smarter?
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            Open your fridge, take a photo, and let AI do the rest.
          </p>
          <Link
            href="/app"
            className="btn-shimmer inline-block px-8 py-4 rounded-xl text-white font-bold text-base shadow-lg shadow-violet-900/40 hover:scale-105 transition-transform"
          >
            Get Started — It's Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border px-6 py-10 text-center text-slate-600 text-sm">
        <p className="gradient-text font-bold text-base mb-2">PantryVision</p>
        <p>Built with Claude claude-sonnet-4-6 Vision · Next.js · FastAPI</p>
      </footer>
    </div>
  );
}
