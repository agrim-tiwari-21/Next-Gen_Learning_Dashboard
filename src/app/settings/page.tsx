"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Bell, 
  ShieldAlert, 
  Settings, 
  Check, 
  Loader2, 
  Camera, 
  KeyRound, 
  LogOut,
  Save
} from "lucide-react";

// simple, visual toggle switch component utilizing Framer Motion springs
interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
  description: string;
}

function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/40 border border-slate-850 hover:border-slate-800/80 transition-colors">
      <div className="space-y-0.5">
        <label className="text-xs font-semibold text-slate-200">{label}</label>
        <p className="text-[10px] text-slate-500">{description}</p>
      </div>
      
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 outline-none cursor-pointer shrink-0 ${
          checked ? "bg-indigo-600" : "bg-slate-850"
        }`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-5 h-5 rounded-full bg-white shadow-sm"
          animate={{ x: checked ? 16 : 0 }}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  // Profile Info States (dynamic loading on client mount)
  const [name, setName] = useState("Agrim Tiwari");
  const [email, setEmail] = useState("agrim.tiwari@university.edu");
  const [avatar, setAvatar] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("student-name");
    const storedEmail = localStorage.getItem("student-email");
    const storedAvatar = localStorage.getItem("student-avatar");
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedAvatar) setAvatar(storedAvatar);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
        
        // Persist immediately and notify components
        localStorage.setItem("student-avatar", base64String);
        window.dispatchEvent(new Event("profile-updated"));
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Notification States
  const [emailNotif, setEmailNotif] = useState(true);
  const [courseRemind, setCourseRemind] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);



  // Save states
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passwordResetting, setPasswordResetting] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);



  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    // Save to local storage for state persistence
    localStorage.setItem("student-name", name);
    localStorage.setItem("student-email", email);
    if (avatar) {
      localStorage.setItem("student-avatar", avatar);
    }

    // Broadcast custom event to sync sidebar and header instantly
    window.dispatchEvent(new Event("profile-updated"));

    // Simulate saving settings changes with 1-second timeout
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      
      // Clear success badge after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleResetPassword = () => {
    setPasswordResetting(true);
    setPasswordSuccess(false);

    setTimeout(() => {
      setPasswordResetting(false);
      setPasswordSuccess(true);
      setTimeout(() => setPasswordSuccess(false), 3000);
    }, 1200);
  };

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Title Header */}
      <motion.div variants={itemVariants} className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
          <Settings className="h-6 w-6 text-indigo-400" />
          Portal Settings
        </h2>
        <p className="text-xs text-slate-400">
          Manage your personal dashboard profile, notification switches, and account safety.
        </p>
      </motion.div>

      {/* Main Settings Panel Grid */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Profile Card Panel (Col-span 1) */}
        <motion.div 
          variants={itemVariants} 
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 lg:col-span-1"
        >
          <div className="flex items-center gap-2 text-indigo-400 pb-2 border-b border-slate-800/80">
            <User className="h-4.5 w-4.5" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Profile Information</h3>
          </div>

          {/* Profile Photo Area */}
          <div className="flex flex-col items-center justify-center space-y-3 pt-2">
            <div className="relative group">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              {avatar ? (
                <img
                  src={avatar}
                  alt="Student profile photo"
                  className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500 select-none"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-indigo-950 flex items-center justify-center border-2 border-indigo-500 text-indigo-300 text-3xl font-bold select-none cursor-pointer group-hover:opacity-80 transition-opacity">
                  {name
                    .split(" ")
                    .filter(Boolean)
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .substring(0, 2) || "AT"}
                </div>
              )}
              
              {/* Camera upload trigger overlay */}
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                title="Change Photo"
                className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white border-2 border-slate-900 shadow transition-transform hover:scale-105 cursor-pointer"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-slate-500">
              {avatar ? "Custom photo uploaded!" : "Avatar initials generated from name."}
            </p>
          </div>

          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </motion.div>

        {/* Right Column: Settings configuration cards (Col-span 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Notifications Card Section */}
          <motion.div 
            variants={itemVariants} 
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
          >
            <div className="flex items-center gap-2 text-indigo-400 pb-2 border-b border-slate-800/80">
              <Bell className="h-4.5 w-4.5" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Course Notifications</h3>
            </div>

            <div className="space-y-3.5 pt-2">
              <Toggle
                checked={emailNotif}
                onChange={setEmailNotif}
                label="Email Alerts"
                description="Receive updates on active courses, grading reviews, and messages."
              />
              <Toggle
                checked={courseRemind}
                onChange={setCourseRemind}
                label="Course Reminders"
                description="Receive daily push reminders 1 hour before your streak deadline."
              />
              <Toggle
                checked={weeklyReport}
                onChange={setWeeklyReport}
                label="Weekly Analytics Digest"
                description="Receive a Sunday summary breakdown of study hours and active milestones."
              />
            </div>
          </motion.div>



          {/* Account Security Card Section */}
          <motion.div 
            variants={itemVariants} 
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
          >
            <div className="flex items-center gap-2 text-indigo-400 pb-2 border-b border-slate-800/80">
              <ShieldAlert className="h-4.5 w-4.5" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Account Credentials</h3>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-slate-200">Change password</h4>
                <p className="text-[10px] text-slate-500">Update security keys to secure your coursework logs.</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <AnimatePresence mode="wait">
                  {passwordSuccess && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] font-bold text-emerald-400"
                    >
                      Reset code sent! 📬
                    </motion.span>
                  )}
                </AnimatePresence>
                
                <button
                  type="button"
                  onClick={handleResetPassword}
                  disabled={passwordResetting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-slate-350 hover:text-slate-100 rounded-xl border border-slate-800 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
                >
                  {passwordResetting ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <KeyRound className="h-3.5 w-3.5" />
                  )}
                  <span>Reset Security Key</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-850 flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-slate-200">Session Management</h4>
                <p className="text-[10px] text-slate-500">Sign out of the LearnPortal on this browser.</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-rose-950/20 hover:bg-rose-950/40 text-rose-400 hover:text-rose-350 rounded-xl border border-rose-950/40 hover:border-rose-950/60 transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout Session</span>
              </button>
            </div>
          </motion.div>

          {/* Form Actions footer */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-end gap-4 pt-2"
          >
            <AnimatePresence>
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Changes saved successfully! 🎉</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl border border-indigo-500/20 shadow-md shadow-indigo-650/10 transition-all cursor-pointer disabled:opacity-50 active:scale-95 shrink-0"
            >
              {saving ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Saving Updates...</span>
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </motion.div>

        </div>
      </form>
    </motion.div>
  );
}
