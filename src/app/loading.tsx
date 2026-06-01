import React from "react";

export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-6 w-48 bg-slate-800 rounded-md" />
        <div className="h-4 w-72 bg-slate-800 rounded-md" />
      </div>

      {/* Bento Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Welcome Card Skeleton */}
        <div className="lg:col-span-2 h-[220px] p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="h-4 w-28 bg-slate-800 rounded" />
            <div className="h-8 w-2/3 bg-slate-800 rounded" />
            <div className="h-4 w-1/2 bg-slate-800 rounded" />
          </div>
          <div className="flex gap-4 pt-4 border-t border-slate-800">
            <div className="h-12 w-32 bg-slate-800 rounded-xl" />
            <div className="h-12 w-32 bg-slate-800 rounded-xl" />
          </div>
        </div>

        {/* Activity Chart Skeleton */}
        <div className="lg:col-span-1 h-[220px] p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-5 w-24 bg-slate-800 rounded" />
              <div className="h-3 w-16 bg-slate-800 rounded" />
            </div>
            <div className="h-4 w-16 bg-slate-800 rounded" />
          </div>
          <div className="flex items-end justify-between h-[100px] px-2 pt-4">
            <div className="w-6 h-10 bg-slate-800 rounded-t" />
            <div className="w-6 h-16 bg-slate-800 rounded-t" />
            <div className="w-6 h-8 bg-slate-800 rounded-t" />
            <div className="w-6 h-12 bg-slate-800 rounded-t" />
            <div className="w-6 h-20 bg-slate-800 rounded-t" />
            <div className="w-6 h-24 bg-slate-800 rounded-t" />
            <div className="w-6 h-6 bg-slate-800 rounded-t" />
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="h-[120px] p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
            >
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-slate-800 rounded" />
                <div className="h-8 w-8 bg-slate-800 rounded-xl" />
              </div>
              <div className="space-y-1">
                <div className="h-6 w-16 bg-slate-800 rounded" />
                <div className="h-3 w-24 bg-slate-800 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Course List Skeleton Section */}
        <div className="lg:col-span-3 space-y-4 mt-2">
          <div className="flex justify-between">
            <div className="h-5 w-32 bg-slate-800 rounded" />
            <div className="h-5 w-24 bg-slate-800 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((id) => (
              <div
                key={id}
                className="h-[180px] p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
              >
                <div className="flex justify-between">
                  <div className="h-10 w-10 bg-slate-800 rounded-xl" />
                  <div className="h-5 w-5 bg-slate-800 rounded-full" />
                </div>
                <div className="h-5 w-1/2 bg-slate-800 rounded mt-4" />
                <div className="w-full mt-4">
                  <div className="h-3 w-16 bg-slate-800 rounded mb-2" />
                  <div className="h-2 w-full bg-slate-800 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
