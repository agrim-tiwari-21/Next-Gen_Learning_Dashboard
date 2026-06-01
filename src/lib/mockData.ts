// Realistic mock data representing a student's learning progress and history.
// Used as a fallback when Supabase is not configured, providing a seamless sandbox.

export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface ActivityDay {
  day: string;
  hours: number;
}

export interface LearningStats {
  streak: number;
  totalHours: number;
  completedCourses: number;
  averageProgress: number;
  certificatesEarned: number;
}

export const MOCK_COURSES: Course[] = [
  {
    id: "1-nextjs",
    title: "Intro to Next.js",
    progress: 80,
    icon_name: "BookOpen",
    created_at: new Date().toISOString(),
  },
  {
    id: "2-ts",
    title: "TypeScript Foundations",
    progress: 45,
    icon_name: "Code",
    created_at: new Date().toISOString(),
  },
  {
    id: "3-css",
    title: "CSS Mastery",
    progress: 100,
    icon_name: "Palette",
    created_at: new Date().toISOString(),
  },
  {
    id: "4-supabase",
    title: "Database Basics with Supabase",
    progress: 10,
    icon_name: "Database",
    created_at: new Date().toISOString(),
  },
];

export const MOCK_STATS: LearningStats = {
  streak: 7,
  totalHours: 24.5,
  completedCourses: 1,
  averageProgress: 58,
  certificatesEarned: 1,
};

export const MOCK_ACTIVITY: ActivityDay[] = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 4.0 },
  { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 3.5 },
  { day: "Fri", hours: 5.0 },
  { day: "Sat", hours: 6.0 },
  { day: "Sun", hours: 2.0 },
];
