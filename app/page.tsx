"use client";

import { ChatInterface } from "@/components/ChatInterface";
import { HomeScreen } from "@/components/HomeScreen";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useState } from "react";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <ThemeProvider>
      <main className="min-h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff5757] to-[#8c52ff] -z-10" />

        <div className="px-4 py-8 md:py-12 min-h-screen flex flex-col items-center justify-center">
          {!started ? (
            <HomeScreen onStart={() => setStarted(true)} />
          ) : (
            <ChatInterface />
          )}
        </div>
      </main>
    </ThemeProvider>
  );
}
