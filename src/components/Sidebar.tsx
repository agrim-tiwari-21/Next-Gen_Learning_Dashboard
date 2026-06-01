"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Settings, 
  GraduationCap,
  LogOut,
  User
} from "lucide-react";

interface SidebarProps {
  // Can be extended if needed
}

export default function Sidebar({}: SidebarProps) {
  const pathname = usePathname();

  // Local sync states
  const [name, setName] = useState("Agrim Tiwari");
  const [email, setEmail] = useState("agrim.tiwari@university.edu");
  const [initials, setInitials] = useState("AT");
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const updateProfile = () => {
      const storedName = localStorage.getItem("student-name") || "Agrim Tiwari";
      const storedEmail = localStorage.getItem("student-email") || "agrim.tiwari@university.edu";
      const storedAvatar = localStorage.getItem("student-avatar");
      setName(storedName);
      setEmail(storedEmail);
      setAvatar(storedAvatar);

      const parsedInitials = storedName
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2) || "AT";
      setInitials(parsedInitials);
    };

    updateProfile();
    window.addEventListener("profile-updated", updateProfile);
    return () => window.removeEventListener("profile-updated", updateProfile);
  }, []);

  const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "My Courses", href: "/courses", icon: BookOpen },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800 bg-slate-900 text-slate-100 z-30 transition-all duration-300 w-20 lg:w-64">
      {/* Logo Header */}
      <div className="flex items-center justify-center lg:justify-start h-16 px-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <GraduationCap className="h-8 w-8 text-indigo-400 shrink-0" />
          <span className="font-bold text-lg tracking-tight hidden lg:block bg-gradient-to-r from-indigo-200 to-slate-100 bg-clip-text text-transparent">
            LearnPortal
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-indigo-950/50 text-indigo-400 border-l-2 border-indigo-500 rounded-l-none"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <Icon className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-300"
              }`} />
              <span className="hidden lg:block truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User / Bottom Section */}
      <div className="p-4 border-t border-slate-800">
        {/* Collapsed view user initials or photo */}
        <div className="flex lg:hidden justify-center py-2">
          {avatar ? (
            <img
              src={avatar}
              alt="Profile avatar"
              className="w-10 h-10 rounded-full object-cover border border-slate-700 select-none"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-[10px] font-bold text-indigo-400 select-none">
              {initials}
            </div>
          )}
        </div>

        {/* Expanded view user info */}
        <div className="hidden lg:flex items-center gap-3 p-2 rounded-lg bg-slate-800/40 border border-slate-800">
          {avatar ? (
            <img
              src={avatar}
              alt="Profile avatar"
              className="w-10 h-10 rounded-full object-cover border border-indigo-900/50 shrink-0 select-none"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-indigo-950 flex items-center justify-center border border-indigo-900/50 text-indigo-300 font-bold shrink-0 text-sm">
              {initials}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-200 truncate">{name}</h4>
            <p className="text-[10px] text-slate-400 truncate">{email}</p>
          </div>
          <button 
            title="Logout"
            className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
