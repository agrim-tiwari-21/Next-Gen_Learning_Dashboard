"use client";

import React, { useState, useEffect } from "react";

export default function MobileAvatar() {
  const [initials, setInitials] = useState("AT");
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const updateAvatar = () => {
      const storedName = localStorage.getItem("student-name") || "Agrim Tiwari";
      const storedAvatar = localStorage.getItem("student-avatar");
      
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

    updateAvatar();
    window.addEventListener("profile-updated", updateAvatar);
    return () => window.removeEventListener("profile-updated", updateAvatar);
  }, []);

  return avatar ? (
    <img
      src={avatar}
      alt="Profile avatar"
      className="w-8 h-8 rounded-full object-cover border border-indigo-900/50 shrink-0 select-none"
    />
  ) : (
    <div className="w-8 h-8 rounded-full bg-indigo-950 flex items-center justify-center border border-indigo-900/50 text-indigo-300 font-bold text-xs shrink-0 select-none">
      {initials}
    </div>
  );
}
