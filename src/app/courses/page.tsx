"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  BookOpen, 
  Code, 
  Palette, 
  Database, 
  AlertTriangle, 
  RefreshCw,
  Play, 
  CheckCircle2, 
  BookOpenCheck,
  Wifi,
  WifiOff,
  SlidersHorizontal,
  X
} from "lucide-react";
import { Course } from "@/lib/mockData";
import { getCourses } from "@/lib/supabase";

// Resolves a string icon name to its corresponding Lucide icon component
const getIconComponent = (name: string) => {
  switch (name) {
    case "BookOpen":
      return BookOpen;
    case "Code":
      return Code;
    case "Palette":
      return Palette;
    case "Database":
      return Database;
    default:
      return BookOpen;
  }
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState<boolean>(true);
  const [retryCount, setRetryCount] = useState<number>(0);

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  useEffect(() => {
    let active = true;

    async function loadData() {
      setLoading(true);
      setError(null);
      
      const { data, isMock: mockUsed, error: fetchError } = await getCourses();
      
      if (!active) return;
      
      if (fetchError && !mockUsed) {
        setError(fetchError);
      } else {
        setCourses(data);
        setIsMock(mockUsed);
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

  // Helper to determine the course status string
  const getCourseStatus = (progress: number): "Not Started" | "In Progress" | "Completed" => {
    if (progress === 0) return "Not Started";
    if (progress === 100) return "Completed";
    return "In Progress";
  };

  // Filter Courses based on search text and selected status badge
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === "All") return matchesSearch;
    const status = getCourseStatus(course.progress);
    return matchesSearch && status === statusFilter;
  });

  // Snappy, instant page entry animation variants (reduced staggering for ultra-responsive feel)
  const pageVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "tween",
        duration: 0.2,
        ease: "easeOut",
        staggerChildren: 0.02
      }
    }
  } as const;

  // Faster, lightweight transition for cards (prevents lagging entry)
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "tween", duration: 0.2, ease: "easeOut" } 
    }
  } as const;

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <BookOpenCheck className="h-6 w-6 text-indigo-400" />
            My Courses
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Browse, search, and continue where you left off on your curriculum.
          </p>
        </div>

        {/* Database Connectivity Badge */}
        <div className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-400">
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

      {/* Interactive Toolbar: Search & Filtering Tabs */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Search Bar Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-500 hover:text-slate-300 transition-colors"
              title="Clear search"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          )}
        </div>

        {/* Filter Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <div className="flex items-center gap-1 text-slate-500 mr-2 shrink-0">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Status:</span>
          </div>
          {["All", "Not Started", "In Progress", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                statusFilter === status
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-650/15"
                  : "bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-850"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Container Area */}
      {loading ? (
        /* Loading Skeletons */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((id) => (
            <div
              key={id}
              className="h-[210px] p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between animate-pulse"
            >
              <div className="flex justify-between items-start">
                <div className="h-10 w-10 bg-slate-800 rounded-xl" />
                <div className="h-6 w-20 bg-slate-800 rounded-full" />
              </div>
              <div className="h-5 w-2/3 bg-slate-800 rounded mt-4" />
              <div className="w-full mt-4 space-y-2">
                <div className="h-3 w-1/4 bg-slate-800 rounded" />
                <div className="h-2 w-full bg-slate-800 rounded-full" />
              </div>
              <div className="h-9 w-full bg-slate-800 rounded-xl mt-4" />
            </div>
          ))}
        </div>
      ) : error && courses.length === 0 ? (
        /* Error view */
        <div className="p-12 rounded-2xl bg-slate-900 border border-red-950/40 text-center flex flex-col items-center justify-center min-h-[300px]">
          <div className="p-3.5 bg-rose-500/10 text-rose-500 rounded-2xl border border-rose-500/20 mb-4 animate-pulse">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h4 className="font-bold text-slate-200 text-base">Unable to load courses</h4>
          <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
            {error || "An unexpected error occurred while loading your courses."}
          </p>
          <button
            onClick={handleRetry}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-all active:scale-95 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      ) : filteredCourses.length === 0 ? (
        /* Empty results state */
        <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center justify-center min-h-[250px]">
          <BookOpen className="h-8 w-8 text-slate-600 mb-3" />
          <h4 className="font-semibold text-slate-300 text-sm">No courses found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            No courses match "{searchQuery}" under the status filter "{statusFilter}".
          </p>
          {(searchQuery || statusFilter !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("All");
              }}
              className="mt-4 text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        /* Course Grid Cards list */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredCourses.map((course) => {
              const Icon = getIconComponent(course.icon_name);
              const status = getCourseStatus(course.progress);
              
              // Dynamic status badge styling
              let badgeStyle = "bg-slate-950 text-slate-400 border-slate-800/80";
              if (status === "In Progress") {
                badgeStyle = "bg-blue-500/10 text-blue-400 border-blue-500/15";
              } else if (status === "Completed") {
                badgeStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/15";
              }

              // Dynamic button labels
              let buttonLabel = "Continue Learning";
              if (status === "Not Started") buttonLabel = "Start Learning";
              else if (status === "Completed") buttonLabel = "Review Course";

              return (
                <motion.div
                  key={course.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.015, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700/80 transition-colors duration-200 flex flex-col justify-between h-[230px] relative group overflow-hidden cursor-pointer"
                >
                  {/* Subtle card hover ambient background glow */}
                  <div className="absolute inset-0 bg-indigo-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Header Row: Icon and Status Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl border shrink-0 ${
                      status === "Completed"
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/15"
                        : "text-indigo-400 bg-indigo-500/10 border-indigo-500/15"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-tight shrink-0 uppercase ${badgeStyle}`}>
                      {status}
                    </span>
                  </div>

                  {/* Body Content Row: Course Title */}
                  <div className="mt-4 flex-1">
                    <h3 className="font-semibold text-slate-200 text-base group-hover:text-slate-100 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                  </div>

                  {/* Footer Row: Progress indicator bar and Continue Button */}
                  <div className="mt-4 space-y-4 w-full">
                    {/* Progress Bar Label and Percentage */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-500">Course Progress</span>
                        <span className={status === "Completed" ? "text-emerald-400 font-bold" : "text-slate-300"}>
                          {course.progress}%
                        </span>
                      </div>
                      
                      {/* Spring-animated progress bar track */}
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-850">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ type: "spring", stiffness: 180, damping: 18 }}
                          className={`h-full rounded-full ${
                            status === "Completed"
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                              : "bg-gradient-to-r from-indigo-600 to-indigo-500"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Navigation/Action Button */}
                    <button className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold transition-all border outline-none bg-slate-950 border-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-800/80 group-hover:border-slate-700/80 group-hover:bg-slate-800 active:scale-95 pointer-events-none">
                      {status === "Completed" ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Play className="h-3 w-3 fill-current text-slate-400 group-hover:text-indigo-400 transition-colors" />
                      )}
                      <span>{buttonLabel}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
