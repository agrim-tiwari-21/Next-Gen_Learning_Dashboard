"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Flame, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Compass, 
  Lightbulb, 
  TrendingUp, 
  Sparkles,
  Award
} from "lucide-react";
import { MOCK_ACTIVITY, MOCK_STATS } from "@/lib/mockData";

// simple, elegant React Counter-Up component to show off student React scripting skills
interface CountUpProps {
  end: number;
  decimals?: number;
  duration?: number;
}

function CountUp({ end, decimals = 0, duration = 0.8 }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(progress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toFixed(decimals)}</span>;
}

export default function AnalyticsPage() {
  const totalCourses = 4;
  const completedCourses = MOCK_STATS.completedCourses;
  const currentStreak = MOCK_STATS.streak;
  const totalHours = MOCK_STATS.totalHours;

  const maxHours = Math.max(...MOCK_ACTIVITY.map((d) => d.hours));
  const chartHeight = 160;

  // Staggered entry animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  } as const;

  // Course study time distribution data
  const focusAreas = [
    { name: "Intro to Next.js", share: 50, hours: 12.2, color: "bg-indigo-500 text-indigo-400" },
    { name: "TypeScript Foundations", share: 30, hours: 7.3, color: "bg-blue-500 text-blue-400" },
    { name: "CSS Mastery", share: 15, hours: 3.7, color: "bg-emerald-500 text-emerald-400" },
    { name: "Database with Supabase", share: 5, hours: 1.3, color: "bg-amber-500 text-amber-400" },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Page Title */}
      <motion.div variants={itemVariants} className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-indigo-400" />
          Study Analytics
        </h2>
        <p className="text-xs text-slate-400">
          Analyze your coding metrics, daily streak logs, and curriculum progress details.
        </p>
      </motion.div>

      {/* Row 1: The 4 Statistics Cards */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Total Courses */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.015 }}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-[130px] hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Courses</span>
            <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/10">
              <BookOpen className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              <CountUp end={totalCourses} />
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Active curriculum</p>
          </div>
        </motion.div>

        {/* Completed Courses */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.015 }}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-[130px] hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Completed</span>
            <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/10">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              <CountUp end={completedCourses} />
            </p>
            <p className="text-[10px] text-slate-500 mt-1">1 certificate earned</p>
          </div>
        </motion.div>

        {/* Study Hours */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.015 }}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-[130px] hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Study Time</span>
            <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/10">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              <CountUp end={totalHours} decimals={1} />h
            </p>
            <p className="text-[10px] text-slate-500 mt-1">+3.2 hrs this week</p>
          </div>
        </motion.div>

        {/* Current Streak */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.015 }}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-[130px] hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Daily Streak</span>
            <div className="p-1.5 bg-amber-500/10 text-amber-500 rounded-lg border border-amber-500/10">
              <Flame className="h-4 w-4 fill-amber-500/15" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              <CountUp end={currentStreak} /> Days
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Active coding logs 🔥</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Row 2: Weekly Activity Visuals (Detailed) & Course Focus Shares */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Activity Detailed Visual (Left 2/3) */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-[300px]"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">Daily Study Hours Log</h3>
              <p className="text-[10px] text-slate-500">Hourly breakdown for the current week</p>
            </div>
            <div className="text-[10px] font-bold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-850">
              Highest Day: Saturday (6.0h)
            </div>
          </div>

          {/* SVG-free responsive bar list chart */}
          <div className="flex-1 flex items-end justify-between px-2 sm:px-6 relative h-[180px]">
            {/* Subtle horizontal grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-1">
              <div className="w-full border-t border-slate-700" />
              <div className="w-full border-t border-slate-700" />
              <div className="w-full border-t border-slate-700" />
              <div className="w-full border-t border-slate-700" />
            </div>

            {MOCK_ACTIVITY.map((item, index) => {
              const barHeight = (item.hours / maxHours) * 150;
              return (
                <div key={item.day} className="flex flex-col items-center group relative z-10 flex-1">
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-1 bg-slate-950 text-slate-200 text-[10px] font-bold py-1 px-2 rounded-md border border-slate-800 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                    {item.hours.toFixed(1)} hrs
                  </div>

                  {/* Visual Bar Track */}
                  <div className="w-6 sm:w-8 md:w-8 lg:w-10 bg-slate-950/40 border border-slate-850/40 rounded-t-md h-[150px] flex items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${barHeight}px` }}
                      transition={{
                        type: "spring",
                        stiffness: 80,
                        damping: 15,
                        delay: 0.1 + index * 0.04,
                      }}
                      className="w-full bg-gradient-to-t from-indigo-650/80 to-indigo-500/90 rounded-t-[4px] relative"
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-indigo-300/40" />
                    </motion.div>
                  </div>

                  <span className="text-[10px] font-semibold text-slate-500 mt-2">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Study Focus Areas Breakdown (Right 1/3) */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-1 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-[300px]"
        >
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Study Distribution</h3>
            <p className="text-[10px] text-slate-500">Distribution of hours across active courses</p>
          </div>

          <div className="space-y-3.5 my-4">
            {focusAreas.map((area) => (
              <div key={area.name} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400 truncate max-w-[170px]">{area.name}</span>
                  <span className="text-slate-500 font-bold shrink-0">{area.hours} hrs ({area.share}%)</span>
                </div>
                
                {/* Horizontal Progress Track */}
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-850/60">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${area.share}%` }}
                    transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
                    className={`h-full rounded-full ${area.color.split(" ")[0]}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Distribution Quote */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-850/60">
            <Compass className="h-4 w-4 text-indigo-400 shrink-0" />
            <p className="text-[10px] text-slate-500 leading-normal">
              Most of your attention is dedicated to **Next.js** this week. Good choice!
            </p>
          </div>
        </motion.div>

      </div>

      {/* Row 3: Learning Progress Summary & Student Insights */}
      <motion.div 
        variants={itemVariants}
        className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6"
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Study Insights & Recommendations</h3>
            <p className="text-[10px] text-slate-500">Automated feedback based on study logs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Insight 1: Peak Productivity */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-slate-850/40">
            <div className="flex items-center gap-2 text-indigo-400">
              <TrendingUp className="h-4 w-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Peak Productivity</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your most productive days are **Fridays & Saturdays**, averaging **5.5 hours** of coding. Consider scheduling complex database tasks on these days when your focus is highest!
            </p>
          </div>

          {/* Insight 2: Streak Consistency */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-slate-850/40">
            <div className="flex items-center gap-2 text-amber-500">
              <Sparkles className="h-4 w-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Consistency Log</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              You maintained a **7-day streak** 🔥 with at least 1.5 hours of learning every single day. Consistent study is proving to double your CSS and TypeScript retention scores.
            </p>
          </div>

          {/* Insight 3: Certificate Milestone */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-slate-850/40">
            <div className="flex items-center gap-2 text-purple-400">
              <Award className="h-4 w-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Next Milestone</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              You are currently **80% complete** with *Intro to Next.js*. At your average pace, you will finish the curriculum and unlock your second course certificate by next **Tuesday**!
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
