import { createClient } from "@supabase/supabase-js";
import { Course, MOCK_COURSES } from "./mockData";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if credentials exist and are not placeholder strings
export const isSupabaseConfigured = 
  !!supabaseUrl && 
  !!supabaseAnonKey && 
  supabaseUrl !== "https://your-project-id.supabase.co" && 
  supabaseAnonKey !== "your-supabase-anon-key";

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Helper to simulate network latency for a more realistic demo experience
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCourses(): Promise<{ data: Course[]; isMock: boolean; error: string | null }> {
  // If not configured, immediately return mock data with simulated latency
  if (!isSupabaseConfigured || !supabase) {
    await sleep(1000); // 1s delay to showcase the loading skeleton
    return { data: MOCK_COURSES, isMock: true, error: null };
  }

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.warn("Supabase fetch failed, falling back to mock data:", error.message);
      // Fail gracefully: fall back to mock data but return the error message for status indicator
      return { data: MOCK_COURSES, isMock: true, error: error.message };
    }

    // In case table is empty, return the mock data so it doesn't look blank
    if (!data || data.length === 0) {
      return { data: MOCK_COURSES, isMock: false, error: null };
    }

    return { data: data as Course[], isMock: false, error: null };
  } catch (err: any) {
    console.error("An unexpected database error occurred:", err);
    return { data: MOCK_COURSES, isMock: true, error: err.message || "Connection refused" };
  }
}
