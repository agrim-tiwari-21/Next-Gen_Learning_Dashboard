"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Settings 
} from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900 border-t border-slate-800 text-slate-100 z-30 flex items-center justify-around px-2 shadow-lg shadow-slate-950/20">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-medium transition-colors duration-200 ${
              isActive
                ? "text-indigo-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icon className={`h-5 w-5 mb-1 transition-transform ${
              isActive ? "text-indigo-400 scale-105" : "text-slate-400"
            }`} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
