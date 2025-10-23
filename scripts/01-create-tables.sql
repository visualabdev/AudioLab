-- Create tracks table
CREATE TABLE IF NOT EXISTS tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  bpm INTEGER,
  key VARCHAR(10),
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  audio_url TEXT NOT NULL,
  cover_image_url TEXT,
  duration INTEGER, -- in seconds
  tags TEXT[], -- array of tags
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
  buyer_email VARCHAR(255) NOT NULL,
  buyer_name VARCHAR(255),
  amount DECIMAL(10, 2) NOT NULL,
  paypal_transaction_id VARCHAR(255) UNIQUE,
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tracks_genre ON tracks(genre);
CREATE INDEX IF NOT EXISTS idx_tracks_featured ON tracks(is_featured);
CREATE INDEX IF NOT EXISTS idx_purchases_track_id ON purchases(track_id);
CREATE INDEX IF NOT EXISTS idx_purchases_email ON purchases(buyer_email);
