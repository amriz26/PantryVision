import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PantryVision — Fridge to Recipe",
  description: "Upload a fridge photo and get AI-powered meal suggestions instantly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg antialiased">{children}</body>
    </html>
  );
}
