"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service if desired
    console.error("Application-level boundary error caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
      <div className="p-4 bg-rose-500/10 text-rose-500 rounded-full border border-rose-500/20 mb-6 animate-bounce">
        <AlertCircle className="h-8 w-8" />
      </div>

      <h1 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">
        Something went wrong
      </h1>
      
      <p className="text-sm text-slate-400 mt-2 max-w-md leading-relaxed">
        An unexpected error occurred while loading this page. This could be due to a network disruption or build compile issue.
      </p>

      {error.digest && (
        <code className="mt-4 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-500 uppercase">
          Digest ID: {error.digest}
        </code>
      )}

      <button
        onClick={() => reset()}
        className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-xl border border-indigo-500/20 shadow-md shadow-indigo-650/10 transition-all cursor-pointer"
      >
        <RotateCcw className="h-4 w-4" />
        <span>Reload Dashboard</span>
      </button>
    </div>
  );
}
