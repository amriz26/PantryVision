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
    <div className="bg-surface border border-border rounded-2xl p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
        Add Image
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {(["upload", "webcam"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
              tab === t
                ? "bg-accent border-accent text-white"
                : "bg-transparent border-border text-slate-400 hover:border-accent2 hover:text-accent2"
            }`}
          >
            {t === "upload" ? "📁 Upload" : "📷 Webcam"}
          </button>
        ))}
      </div>

      {tab === "upload" && (
        <>
          {!preview ? (
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-slate-500 hover:border-accent hover:text-accent hover:bg-accent/5"
              }`}
            >
              <svg
                className="w-10 h-10 mx-auto mb-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  d="M4 16l4-4 4 4 4-8 4 8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="3" y="3" width="18" height="18" rx="3" />
              </svg>
              <p className="font-semibold mb-1">Drop image here or click to browse</p>
              <p className="text-xs">PNG, JPG, WEBP supported</p>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { if (e.target.files?.[0]) loadFile(e.target.files[0]); }}
              />
            </div>
          ) : (
            <div className="text-center">
              <img
                src={preview}
                alt="Preview"
                className="max-w-full max-h-72 mx-auto rounded-xl border border-border object-contain"
              />
              <button
                onClick={clear}
                className="mt-3 px-4 py-1.5 rounded-lg text-sm text-slate-400 border border-border hover:border-red-500 hover:text-red-400 transition-all"
              >
                ✕ Remove
              </button>
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

      {preview && disabled && (
        <p className="text-xs text-slate-500 mt-3 text-center">Analysis in progress…</p>
      )}
    </div>
  );
}
