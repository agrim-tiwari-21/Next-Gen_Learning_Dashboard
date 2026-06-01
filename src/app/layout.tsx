import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import MobileAvatar from "@/components/MobileAvatar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Student Learning Dashboard | Internship Challenge",
  description: "A clean, modern dark-themed learning portal for tracking active courses, study hours, statistics, and daily streak progress.",
  keywords: ["frontend internship", "next.js", "dashboard", "supabase", "react", "typescript"],
  authors: [{ name: "Agrim Tiwari", url: "https://github.com/agrim-tiwari" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} font-sans bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col md:flex-row`}
      >
        {/* Left Desktop Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Layout Container */}
        <main className="flex-1 flex flex-col min-h-screen md:pl-20 lg:pl-64 pb-20 md:pb-6">
          {/* Top subtle bar for visual branding on mobile */}
          <header className="md:hidden flex items-center justify-between px-6 h-16 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
            <span className="font-bold text-base bg-gradient-to-r from-indigo-300 to-slate-200 bg-clip-text text-transparent">
              LearnPortal
            </span>
            <MobileAvatar />
          </header>
          
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>

        {/* Bottom Mobile/Tablet Navigation */}
        <BottomNav />
      </body>
    </html>
  );
}
