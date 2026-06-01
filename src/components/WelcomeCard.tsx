"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Sparkles, Trophy } from "lucide-react";

export default function WelcomeCard() {
  // Typical dynamic student greeting depending on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-full relative overflow-hidden"
    >
      {/* Absolute decorative subtle glow behind - strictly simple as requested */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full pointer-events-none" />

      <div>
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Student Dashboard</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
          {getGreeting()}, <span className="text-indigo-400">Agrim</span>!
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-md leading-relaxed">
          You are doing amazing this week. Keep up the momentum and reach your learning targets!
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-800/80 pt-4">
        {/* Streak Indicator */}
        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800/60 shadow-inner">
          <div className="p-1.5 bg-amber-500/10 text-amber-500 rounded-lg">
            <Flame className="h-5 w-5 fill-amber-500/20" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Learning Streak</p>
            <p className="text-sm font-bold text-slate-200">7 Days 🔥</p>
          </div>
        </div>

        {/* Milestone Indicator */}
        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800/60 shadow-inner">
          <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Weekly Goal</p>
            <p className="text-sm font-bold text-slate-200">85% Achieved 🏆</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
