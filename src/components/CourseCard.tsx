"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Code, 
  Palette, 
  Database, 
  CheckCircle2, 
  Play
} from "lucide-react";
import { Course } from "@/lib/mockData";

interface CourseCardProps {
  course: Course;
}

// Icon mapper helper
const getIcon = (name: string) => {
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

export default function CourseCard({ course }: CourseCardProps) {
  const Icon = getIcon(course.icon_name);
  const isCompleted = course.progress === 100;

  return (
    <motion.div
      whileHover={{ scale: 1.015, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700/80 transition-colors duration-200 flex flex-col justify-between h-[180px] group cursor-pointer relative overflow-hidden"
    >
      {/* subtle hover overlay */}
      <div className="absolute inset-0 bg-indigo-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl border shrink-0 ${
          isCompleted 
            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/15" 
            : "text-indigo-400 bg-indigo-500/10 border-indigo-500/15"
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        
        {/* Play/Complete indicator */}
        <div className="text-slate-500 group-hover:text-slate-300 transition-colors">
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          ) : (
            <Play className="h-4 w-4 fill-current text-slate-500 group-hover:text-indigo-400 transition-colors" />
          )}
        </div>
      </div>

      {/* Course Title */}
      <div className="mt-4">
        <h4 className="font-semibold text-slate-200 text-sm md:text-base group-hover:text-slate-100 transition-colors line-clamp-1">
          {course.title}
        </h4>
      </div>

      {/* Progress Section */}
      <div className="mt-4 w-full">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-slate-500 font-medium">Progress</span>
          <span className={`font-bold ${isCompleted ? "text-emerald-400" : "text-slate-300"}`}>
            {course.progress}%
          </span>
        </div>
        
        {/* Progress Track */}
        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/40">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
            className={`h-full rounded-full ${
              isCompleted 
                ? "bg-gradient-to-r from-emerald-500 to-emerald-400" 
                : "bg-gradient-to-r from-indigo-600 to-indigo-500"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}
