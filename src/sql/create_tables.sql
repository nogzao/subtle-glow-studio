-- Create before_after_cases table
CREATE TABLE IF NOT EXISTS public.before_after_cases (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  age TEXT NOT NULL,
  description TEXT NOT NULL,
  before_image TEXT,
  after_image TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER before_after_cases_updated_at
  BEFORE UPDATE ON public.before_after_cases
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE public.before_after_cases ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access to published cases
CREATE POLICY "Enable read access for published cases" ON public.before_after_cases
  FOR SELECT USING (is_published = true);

-- Create policies to allow all operations for authenticated users
CREATE POLICY "Enable all operations for authenticated users" ON public.before_after_cases
  FOR ALL USING (true);