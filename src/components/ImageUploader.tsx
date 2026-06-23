"use client";

import { useRef, useState, useCallback } from "react";
import WebcamCapture from "./WebcamCapture";

interface Props {
  onFile: (file: File) => void;
  disabled: boolean;
}

export default function ImageUploader({ onFile, disabled }: Props) {
  const [tab, setTab] = useState<"upload" | "webcam">("upload");
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      setPreview(URL.createObjectURL(file));
      onFile(file);
    },
    [onFile]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  };

  const clear = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="glass rounded-2xl p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">
        Add Image
      </p>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-[#0f1117] rounded-xl mb-5 border border-border">
        {(["upload", "webcam"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              tab === t
                ? "bg-violet-500/20 text-violet-300 border border-violet-500/30 shadow-[0_0_12px_rgba(124,109,250,0.15)]"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {t === "upload" ? "📁  Upload" : "📷  Webcam"}
          </button>
        ))}
      </div>

      {tab === "upload" && (
        <>
          {!preview ? (
            <div
              onClick={() => !disabled && inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                disabled
                  ? "border-border text-slate-700 cursor-not-allowed"
                  : isDragging
                  ? "border-violet-400 bg-violet-500/10 text-violet-300 scale-[1.01]"
                  : "border-border text-slate-600 cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 hover:text-slate-400"
              }`}
            >
              {/* Animated corner accents */}
              <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-violet-500/30 rounded-tl-md" />
              <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-violet-500/30 rounded-tr-md" />
              <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-violet-500/30 rounded-bl-md" />
              <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-violet-500/30 rounded-br-md" />

              <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl transition-all duration-200 ${isDragging ? "bg-violet-500/20 scale-110" : "bg-[#1a1d27]"}`}>
                {isDragging ? "✨" : "🖼️"}
              </div>
              <p className="font-semibold text-sm mb-1">
                {isDragging ? "Release to upload" : "Drop your fridge photo here"}
              </p>
              <p className="text-xs opacity-60">or click to browse · PNG, JPG, WEBP</p>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { if (e.target.files?.[0]) loadFile(e.target.files[0]); }}
              />
            </div>
          ) : (
            <div className="relative animate-scale-in">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-72 mx-auto rounded-xl border border-border object-contain bg-[#0f1117]"
              />
              {/* Overlay actions */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                <button
                  onClick={clear}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-red-500/80 text-white hover:bg-red-500 transition-colors"
                >
                  ✕ Remove image
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {tab === "webcam" && (
        <WebcamCapture
          onCapture={(file) => {
            loadFile(file);
            setTab("upload");
          }}
        />
      )}
    </div>
  );
}
