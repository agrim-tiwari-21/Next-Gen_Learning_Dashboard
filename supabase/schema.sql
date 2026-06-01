-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed with 4 example courses
INSERT INTO courses (title, progress, icon_name)
VALUES 
  ('Intro to Next.js', 80, 'BookOpen'),
  ('TypeScript Foundations', 45, 'Code'),
  ('CSS Mastery', 100, 'Palette'),
  ('Database Basics with Supabase', 10, 'Database');
