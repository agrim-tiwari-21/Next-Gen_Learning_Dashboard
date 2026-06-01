"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, Award } from "lucide-react";
import { MOCK_STATS } from "@/lib/mockData";

export default function StatsCard() {
  const statsItems = [
    {
      title: "Total Study Time",
      value: `${MOCK_STATS.totalHours} hrs`,
      icon: Clock,
      colorClass: "text-blue-400 bg-blue-500/10 border-blue-500/15",
      description: "+3.2 hrs this week",
    },
    {
      title: "Completed Courses",
      value: `${MOCK_STATS.completedCourses} of 4`,
      icon: CheckCircle2,
      colorClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/15",
      description: "CSS Mastery done",
    },
    {
      title: "Certificates Earned",
      value: `${MOCK_STATS.certificatesEarned}`,
      icon: Award,
      colorClass: "text-purple-400 bg-purple-500/10 border-purple-500/15",
      description: "Responsive Web Design",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  } as const;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {statsItems.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-slate-400">{stat.title}</span>
              <div className={`p-2 rounded-xl border shrink-0 ${stat.colorClass}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            
            <div>
              <p className="text-2xl font-bold text-slate-100 tracking-tight">{stat.value}</p>
              <p className="text-[11px] text-slate-500 mt-1">{stat.description}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
