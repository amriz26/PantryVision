"use client";

import { useRef, useState, useEffect } from "react";

interface Props {
  onCapture: (file: File) => void;
}

export default function WebcamCapture({ onCapture }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    return () => { stream?.getTracks().forEach((t) => t.stop()); };
  }, [stream]);

  const start = async () => {
    setError(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch {
      setError("Camera access denied. Please allow permissions in your browser.");
    }
  };

  const stop = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  const snap = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    setFlashing(true);
    setTimeout(() => setFlashing(false), 300);

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (blob) {
          onCapture(new File([blob], "webcam.jpg", { type: "image/jpeg" }));
          stop();
        }
      },
      "image/jpeg",
      0.92
    );
  };

  return (
    <div className="text-center">
      <div className="relative rounded-xl overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full max-h-64 object-cover"
        />
        {/* Flash overlay */}
        {flashing && (
          <div className="absolute inset-0 bg-white animate-fade-in" style={{ animationDuration: "0.15s" }} />
        )}
        {/* Viewfinder corners */}
        {stream && (
          <>
            <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-violet-400 rounded-tl" />
            <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-violet-400 rounded-tr" />
            <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-violet-400 rounded-bl" />
            <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-violet-400 rounded-br" />
          </>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />

      {error && (
        <p className="text-red-400 text-xs mt-3 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex gap-2 mt-4 justify-center">
        {!stream ? (
          <button
            onClick={start}
            className="px-5 py-2.5 rounded-xl glass text-sm font-semibold text-slate-300 hover:text-white hover:border-violet-500/40 transition-all"
          >
            Start Camera
          </button>
        ) : (
          <>
            <button
              onClick={snap}
              className="px-6 py-2.5 rounded-xl btn-shimmer text-white text-sm font-bold hover:scale-105 transition-transform"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg>
              Snap Photo
            </button>
            <button
              onClick={stop}
              className="px-5 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/25 text-sm font-semibold hover:bg-red-500/20 transition-all"
            >
              Stop
            </button>
          </>
        )}
      </div>
    </div>
  );
}
