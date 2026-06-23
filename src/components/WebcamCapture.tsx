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

  useEffect(() => {
    return () => { stream?.getTracks().forEach((t) => t.stop()); };
  }, [stream]);

  const start = async () => {
    setError(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (err) {
      setError("Camera access denied. Please allow camera permissions.");
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
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) {
        onCapture(new File([blob], "webcam.jpg", { type: "image/jpeg" }));
        stop();
      }
    }, "image/jpeg", 0.92);
  };

  return (
    <div className="text-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full max-h-72 rounded-xl bg-black object-cover"
      />
      <canvas ref={canvasRef} className="hidden" />

      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

      <div className="flex gap-2 mt-3 justify-center">
        {!stream ? (
          <button
            onClick={start}
            className="px-5 py-2.5 rounded-xl bg-surface2 border border-border text-sm font-semibold hover:border-accent2 hover:text-accent2 transition-all"
          >
            Start Camera
          </button>
        ) : (
          <>
            <button
              onClick={snap}
              className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:brightness-110 transition-all"
            >
              📸 Snap
            </button>
            <button
              onClick={stop}
              className="px-5 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 text-sm font-semibold hover:bg-red-500/20 transition-all"
            >
              Stop
            </button>
          </>
        )}
      </div>
    </div>
  );
}
