import Link from "next/link";

function IconEye() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconChef() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513M15 20.188l-.39-2.6a3 3 0 00-2.954-2.564H12.35a3 3 0 00-2.954 2.563L9 20.188M7.5 14.25a3 3 0 006 0v-2.625m-6 2.625h6" />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  );
}

const features = [
  {
    Icon: IconEye,
    title: "Vision-Powered Detection",
    desc: "Claude's multimodal AI scans your fridge photo and identifies every ingredient — even half-used containers.",
  },
  {
    Icon: IconChef,
    title: "Instant Recipe Ideas",
    desc: "Get three tailored meal suggestions generated from exactly what you have, with clear step-by-step instructions.",
  },
  {
    Icon: IconRefresh,
    title: "Regenerate on Demand",
    desc: "Don't love the suggestions? Regenerate fresh recipes from the same ingredient list without re-uploading.",
  },
  {
    Icon: IconCamera,
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
            className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            GitHub
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
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
          Powered by Claude Vision AI
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
            className="btn-shimmer px-7 py-3.5 rounded-xl text-white font-bold text-sm shadow-lg shadow-violet-900/40 hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            Analyse My Fridge
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <a
            href="https://github.com/amriz26/PantryVision"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-xl glass text-slate-300 font-semibold text-sm hover:text-white hover:border-accent2 transition-all inline-flex items-center gap-2"
          >
            View on GitHub
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
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
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-slate-300">Drop your fridge photo here</p>
                  <p className="text-xs text-slate-600 mt-1">or click to browse</p>
                </div>
                {/* Ingredient chips mock */}
                <div className="flex flex-wrap gap-2">
                  {["Eggs · 6", "Milk · 1L", "Cheddar", "Broccoli", "Onion", "Olive Oil"].map((item) => (
                    <span key={item} className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/25">
                      {item}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/25">
                    Garlic · approx 3
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
              <div className="w-11 h-11 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4">
                <f.Icon />
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
            className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-base shadow-lg shadow-violet-900/40 hover:scale-105 transition-transform"
          >
            Get Started — It's Free
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border px-6 py-10 text-center text-slate-600 text-sm">
        <p className="gradient-text font-bold text-base mb-2">PantryVision</p>
        <p>Built with Claude Vision AI · Next.js · FastAPI</p>
      </footer>
    </div>
  );
}
