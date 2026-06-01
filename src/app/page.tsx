"use client";

import React from "react";
import { motion } from "framer-motion";
import WelcomeCard from "@/components/WelcomeCard";
import StatsCard from "@/components/StatsCard";
import ActivityChart from "@/components/ActivityChart";
import CourseList from "@/components/CourseList";

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
  } as const;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Page Header (Subtle & clean) */}
      <motion.div variants={itemVariants} className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-slate-100 tracking-tight">Student Dashboard</h2>
        <p className="text-xs text-slate-505 text-slate-400">Track your weekly lectures, coursework, and coding streak.</p>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Welcome Card - Spans 2 columns on large screens */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <WelcomeCard />
        </motion.div>

        {/* Study Activity Chart - Spans 1 column, height matches welcome card */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <ActivityChart />
        </motion.div>

        {/* Statistics Grid - Spans 2 columns on large screens */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <StatsCard />
        </motion.div>

        {/* Course List Section - Spans all 3 columns */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <CourseList />
        </motion.div>

      </div>
    </motion.div>
  );
}
