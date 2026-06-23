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
            {t === "upload" ? (
              <span className="inline-flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                Upload
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg>
                Webcam
              </span>
            )}
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
                {isDragging ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                )}
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
