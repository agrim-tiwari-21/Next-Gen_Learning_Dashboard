"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart, Clock } from "lucide-react";
import { MOCK_ACTIVITY } from "@/lib/mockData";

export default function ActivityChart() {
  const maxHours = Math.max(...MOCK_ACTIVITY.map((d) => d.hours));
  const chartHeight = 160; // Max height of bars in pixels

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
      className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col h-full hover:border-slate-800/80 transition-colors duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Study Activity</h3>
            <p className="text-[10px] text-slate-500">Weekly study distribution</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400">Avg. 3.5h / day</p>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="relative w-full h-[160px] flex items-end justify-between px-2 sm:px-4">
          
          {/* Subtle horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="w-full border-t border-slate-700" />
            <div className="w-full border-t border-slate-700" />
            <div className="w-full border-t border-slate-700" />
            <div className="w-full border-t border-slate-700" />
          </div>

          {/* Activity Bars */}
          {MOCK_ACTIVITY.map((item, index) => {
            const barHeight = (item.hours / maxHours) * chartHeight;
            
            return (
              <div key={item.day} className="flex flex-col items-center group relative z-10 flex-1">
                {/* Custom Tooltip */}
                <div className="absolute bottom-full mb-2 bg-slate-950 text-slate-200 text-[10px] font-semibold py-1 px-2 rounded-md border border-slate-800 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap shadow-md">
                  {item.hours.toFixed(1)} hrs
                </div>

                {/* The Bar */}
                <div className="w-6 sm:w-8 md:w-6 lg:w-8 bg-slate-950/40 rounded-t-md overflow-hidden relative border border-slate-800/40 h-[160px] flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${barHeight}px` }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 15,
                      delay: 0.2 + index * 0.05,
                    }}
                    className="w-full bg-gradient-to-t from-indigo-600/80 to-indigo-500/90 rounded-t-[4px] relative"
                  >
                    {/* Tiny visual shine on top of the bar */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-indigo-300/40" />
                  </motion.div>
                </div>

                {/* Day Label */}
                <span className="text-[10px] font-medium text-slate-500 mt-2.5 transition-colors group-hover:text-slate-300">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
