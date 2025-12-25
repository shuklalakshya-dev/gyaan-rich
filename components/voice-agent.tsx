"use client";

import { useVoiceAgent } from "@/hooks/use-voice-agent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function VoiceAgent() {
  const {
    isListening,
    isProcessing,
    transcript,
    response,
    error,
    startListening,
    stopListening,
    reset,
  } = useVoiceAgent();

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      reset();
      startListening();
    }
  };

  return (
    <div className="min-h-screen bg-black py-8 sm:py-16 md:py-20 px-3 sm:px-4">
      <Card className="w-full max-w-3xl mx-auto bg-zinc-950 border-zinc-800 text-white">
        <CardHeader className="text-center space-y-2 sm:space-y-3 px-3 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">
            Know About Our Company by Our AI
          </CardTitle>
          <CardDescription className="text-zinc-400 text-sm sm:text-base">
            Click the logo to start speaking. Our AI assistant will respond automatically when you pause
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">,
          {/* Control Button with Logo */}
          <div className="flex justify-center">
            <button
              onClick={handleToggleListening}
              disabled={isProcessing}
              className={cn(
                "relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full transition-all duration-300 overflow-hidden border-3 sm:border-4",
                isListening 
                  ? "border-red-500 animate-pulse shadow-lg shadow-red-500/50" 
                  : "border-yellow-400 hover:border-yellow-300 hover:scale-105 shadow-lg shadow-yellow-400/30",
                isProcessing && "opacity-50 cursor-not-allowed"
              )}
              aria-label="Voice Agent Control"
            >
              {isProcessing ? (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                  <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 animate-spin text-yellow-400" />
                </div>
              ) : (
                <div className="relative w-full h-full bg-white">
                  <Image
                    src="/logo_gyanrich_withbg.png"
                    alt="Gyan Rich Logo"
                    fill
                    className="object-contain p-1 sm:p-2"
                    priority
                  />
                </div>
              )}
            </button>
          </div>

          {/* Status Text */}
          <div className="text-center px-2">
            <p className={cn(
              "text-sm sm:text-base font-medium transition-colors",
              isProcessing && "text-yellow-400 animate-pulse",
              isListening && !isProcessing && "text-green-400",
              !isListening && !isProcessing && !transcript && "text-zinc-400"
            )}>
              {isProcessing && "🔄 Processing your request..."}
              {isListening && !isProcessing && "🎤 Listening... Speak now, I'll respond when you pause"}
              {!isListening && !isProcessing && !transcript && "💬 Click the logo to start your conversation"}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 sm:p-4 bg-red-950/50 border border-red-800 text-red-300 rounded-lg">
              <p className="text-sm sm:text-base font-semibold text-red-400">Error</p>
              <p className="text-xs sm:text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Transcript Display */}
          {transcript && (
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-yellow-400">You said:</p>
              <div className="p-3 sm:p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                <p className="text-sm sm:text-base text-zinc-200">{transcript}</p>
              </div>
            </div>
          )}

          {/* Response Display */}
          {response && (
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-yellow-400">AI Response:</p>
              <div className="p-3 sm:p-4 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 border border-yellow-400/30 rounded-lg">
                <p className="text-sm sm:text-base text-zinc-100">{response}</p>
              </div>
            </div>
          )}

          {/* Reset Button */}
          {(transcript || response) && !isListening && !isProcessing && (
            <div className="flex justify-center pt-2 sm:pt-4">
              <Button 
                variant="outline" 
                onClick={reset} 
                className="bg-zinc-900 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all text-sm sm:text-base"
              >
                🔄 Start New Conversation
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
