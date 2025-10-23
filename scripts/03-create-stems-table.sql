-- Create stems table to store separated audio stems
CREATE TABLE IF NOT EXISTS stems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
  original_filename TEXT NOT NULL,
  vocals_url TEXT,
  drums_url TEXT,
  bass_url TEXT,
  other_url TEXT,
  status TEXT DEFAULT 'processing', -- processing, completed, failed
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_stems_track_id ON stems(track_id);
CREATE INDEX IF NOT EXISTS idx_stems_status ON stems(status);
