"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, RefreshCw, Server, Wifi, WifiOff } from "lucide-react";
import { Course } from "@/lib/mockData";
import { getCourses } from "@/lib/supabase";
import CourseCard from "./CourseCard";

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState<boolean>(true);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    let active = true;

    async function loadData() {
      setLoading(true);
      setError(null);
      
      const { data, isMock: mockUsed, error: fetchError } = await getCourses();
      
      if (!active) return;
      
      if (fetchError && !mockUsed) {
        // If there was an error and no mock data came through (unlikely with our helper, but good practice)
        setError(fetchError);
      } else {
        setCourses(data);
        setIsMock(mockUsed);
        if (fetchError) {
          // Track warning but don't fail, we have mock data fallback
          console.warn("Gracefully degraded to mock data due to:", fetchError);
        }
      }
      setLoading(false);
    }

    loadData();

    return () => {
      active = false;
    };
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

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

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200">Active Courses</h3>
          <div className="h-4 w-28 bg-slate-800 rounded animate-pulse" />
        </div>
        
        {/* Skeleton grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((id) => (
            <div
              key={id}
              className="h-[180px] p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between animate-pulse"
            >
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 bg-slate-800 rounded-xl" />
                <div className="h-5 w-5 bg-slate-800 rounded-full" />
              </div>
              <div className="h-5 w-2/3 bg-slate-800 rounded mt-4" />
              <div className="w-full mt-4">
                <div className="h-3 w-1/3 bg-slate-800 rounded mb-2" />
                <div className="h-2 w-full bg-slate-800 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && courses.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-slate-900 border border-red-950/40 text-center flex flex-col items-center justify-center min-h-[300px]">
        <div className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl border border-rose-500/20 mb-4">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h4 className="font-bold text-slate-200 text-base">Failed to fetch courses</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
          {error || "An unexpected error occurred while communicating with the database."}
        </p>
        <button
          onClick={handleRetry}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-all active:scale-95"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200">Active Courses</h3>
        
        {/* Connection status badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-850 text-[10px] font-semibold text-slate-500">
          {isMock ? (
            <>
              <WifiOff className="h-3 w-3 text-amber-500" />
              <span>Demo Mode</span>
            </>
          ) : (
            <>
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>Supabase Connected</span>
            </>
          )}
        </div>
      </div>

      {/* Courses Bento Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <AnimatePresence>
          {courses.map((course) => (
            <motion.div key={course.id} variants={itemVariants} layout>
              <CourseCard course={course} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
