-- RangTix Supabase Schema Migration: 003_storage_buckets.sql
-- Storage buckets configuration and access policies

-- Create storage buckets if using Supabase Storage SQL schema
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('event-posters', 'event-posters', true),
  ('event-banners', 'event-banners', true),
  ('organizer-logos', 'organizer-logos', true),
  ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access policies for buckets
CREATE POLICY "Public read access for event posters"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-posters');

CREATE POLICY "Public read access for event banners"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-banners');

CREATE POLICY "Public read access for organizer logos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'organizer-logos');

CREATE POLICY "Public read access for avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Authenticated upload policies
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated'
    AND bucket_id IN ('event-posters', 'event-banners', 'organizer-logos', 'avatars')
  );
