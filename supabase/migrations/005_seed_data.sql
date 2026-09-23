-- RangTix Supabase Schema Migration: 005_seed_data.sql
-- Seed initial Pune venues, organizers, events, sessions, and ticket types

-- 1. VENUES IN PUNE
INSERT INTO public.venues (id, name, address, area, city, state, pincode, capacity) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Bal Gandharva Rang Mandir', 'JM Road, Shivaji Nagar', 'Shivaji Nagar', 'Pune', 'Maharashtra', '411005', 800),
  ('22222222-2222-2222-2222-222222222222', 'Yashwantrao Chavan Natyagruha', 'DP Road, Karve Nagar', 'Kothrud', 'Pune', 'Maharashtra', '411038', 900),
  ('33333333-3333-3333-3333-333333333333', 'The Box, Pune', 'Opp. Westin, Koregaon Park Annexe', 'Koregaon Park', 'Pune', 'Maharashtra', '411001', 150),
  ('44444444-4444-4444-4444-444444444444', 'The Base, Erandwane', 'Near Karve Statue, Erandwane', 'Erandwane', 'Pune', 'Maharashtra', '411004', 120),
  ('55555555-5555-5555-5555-555555555555', 'Bharat Natya Mandir', 'Sadashiv Peth', 'Sadashiv Peth', 'Pune', 'Maharashtra', '411030', 500),
  ('66666666-6666-6666-6666-666666666666', 'Tilak Smarak Mandir', 'Tilak Road', 'Sadashiv Peth', 'Pune', 'Maharashtra', '411030', 600),
  ('77777777-7777-7777-7777-777777777777', 'Pandit Farms', 'Karve Nagar', 'Karve Nagar', 'Pune', 'Maharashtra', '411052', 1200),
  ('88888888-8888-8888-8888-888888888888', 'Jawahar Lal Nehru Auditorium', 'Ghole Road', 'Shivaji Nagar', 'Pune', 'Maharashtra', '411005', 700)
ON CONFLICT (id) DO NOTHING;

-- 2. ORGANIZERS
INSERT INTO public.organizers (id, organization_name, description, email, phone, status) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'Rangmanch Collective', 'Leading theatre production house in Pune', 'info@rangmanch.example', '+91 98220 12345', 'approved'),
  ('a2222222-2222-2222-2222-222222222222', 'NatyaSutra', 'Contemporary and classic Marathi plays', 'contact@natyasutra.example', '+91 98220 23456', 'approved'),
  ('a3333333-3333-3333-3333-333333333333', 'StageCraft Pune', 'Hindi theatre and experimental productions', 'hello@stagecraft.example', '+91 98220 34567', 'approved'),
  ('a4444444-4444-4444-4444-444444444444', 'Laughing Curtain', 'Comedy and live stage performances', 'laughs@curtain.example', '+91 98220 45678', 'approved')
ON CONFLICT (id) DO NOTHING;

-- 3. EVENTS
INSERT INTO public.events (
  id, organizer_id, venue_id, title, slug, description, category, language, duration_minutes, status, poster_url
) VALUES
  (
    'e1111111-1111-1111-1111-111111111111',
    'a1111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    'Ek Marathi Natak',
    'ek-marathi-natak',
    'A moving family story about memory, belonging, and the conversations that shape us. Production content for the booking experience.',
    'Marathi Theatre',
    'Marathi',
    120,
    'published',
    '/src/assets/theatre-hero.jpg'
  ),
  (
    'e2222222-2222-2222-2222-222222222222',
    'a2222222-2222-2222-2222-222222222222',
    '22222222-2222-2222-2222-222222222222',
    'Ghar Aani ApalePan',
    'ghar-aani-aplepan',
    'Three generations gather for one evening and rediscover what makes a house a home.',
    'Marathi Theatre',
    'Marathi',
    135,
    'published',
    '/src/assets/theatre-family.jpg'
  ),
  (
    'e3333333-3333-3333-3333-333333333333',
    'a3333333-3333-3333-3333-333333333333',
    '33333333-3333-3333-3333-333333333333',
    'Haste Haste',
    'haste-haste',
    'A fast-paced comedy of errors where a quiet family dinner becomes delightfully chaotic.',
    'Hindi Theatre',
    'Hindi',
    110,
    'pending',
    '/src/assets/theatre-comedy.jpg'
  ),
  (
    'e4444444-4444-4444-4444-444444444444',
    'a3333333-3333-3333-3333-333333333333',
    '44444444-4444-4444-4444-444444444444',
    'Antaraal',
    'antaraal',
    'An intimate performance about the spaces between words, memories, and choices.',
    'Experimental Theatre',
    'Hindi',
    90,
    'draft',
    '/src/assets/theatre-modern.jpg'
  ),
  (
    'e5555555-5555-5555-5555-555555555555',
    'a2222222-2222-2222-2222-222222222222',
    '55555555-5555-5555-5555-555555555555',
    'Punha Ekda',
    'punha-ekda',
    'Old friends meet again and find that time has rewritten their shared story.',
    'Marathi Theatre',
    'Marathi',
    125,
    'published',
    '/src/assets/theatre-punha-ekda.jpg'
  ),
  (
    'e6666666-6666-6666-6666-666666666666',
    'a1111111-1111-1111-1111-111111111111',
    '66666666-6666-6666-6666-666666666666',
    'Chaar Divas',
    'chaar-divas',
    'Four days, one difficult decision, and a family learning to listen.',
    'Marathi Drama',
    'Marathi',
    130,
    'rejected',
    '/src/assets/theatre-chaar-divas.jpg'
  ),
  (
    'e7777777-7777-7777-7777-777777777777',
    'a3333333-3333-3333-3333-333333333333',
    '77777777-7777-7777-7777-777777777777',
    'Aadhi Raat',
    'aadhi-raat',
    'A suspenseful chamber play unfolding over one unforgettable night.',
    'Hindi Theatre',
    'Hindi',
    115,
    'approved',
    '/src/assets/theatre-aadhi-raat.jpg'
  ),
  (
    'e8888888-8888-8888-8888-888888888888',
    'a4444444-4444-4444-4444-444444444444',
    '88888888-8888-8888-8888-888888888888',
    'Teen Tigada',
    'teen-tigada',
    'Three roommates, one unexpected guest, and absolutely no plan.',
    'Hindi Comedy',
    'Hindi',
    105,
    'published',
    '/src/assets/theatre-teen-tigada.jpg'
  )
ON CONFLICT (id) DO NOTHING;

-- 4. EVENT SESSIONS FOR ALL PUBLISHED/APPROVED EVENTS
INSERT INTO public.event_sessions (id, event_id, start_time, status) VALUES
  ('s1111111-1111-1111-1111-111111111111', 'e1111111-1111-1111-1111-111111111111', '2026-10-10T19:00:00+05:30', 'scheduled'),
  ('s2222222-2222-2222-2222-222222222222', 'e1111111-1111-1111-1111-111111111111', '2026-10-11T19:00:00+05:30', 'scheduled'),
  ('s3333333-3333-3333-3333-333333333333', 'e1111111-1111-1111-1111-111111111111', '2026-10-11T16:00:00+05:30', 'scheduled'),
  ('s4444444-4444-4444-4444-444444444444', 'e2222222-2222-2222-2222-222222222222', '2026-10-17T18:30:00+05:30', 'scheduled'),
  ('s5555555-5555-5555-5555-555555555555', 'e5555555-5555-5555-5555-555555555555', '2026-11-07T17:30:00+05:30', 'scheduled'),
  ('s8888888-8888-8888-8888-888888888888', 'e8888888-8888-8888-8888-888888888888', '2026-11-28T18:00:00+05:30', 'scheduled')
ON CONFLICT (id) DO NOTHING;

-- 5. TICKET TYPES
INSERT INTO public.ticket_types (id, session_id, name, description, price, total_quantity, available_quantity) VALUES
  ('t1111111-1111-1111-1111-111111111111', 's1111111-1111-1111-1111-111111111111', 'Silver', 'General Seating Silver tier', 300, 100, 42),
  ('t2222222-2222-2222-2222-222222222222', 's1111111-1111-1111-1111-111111111111', 'Gold', 'Premium Gold tier', 500, 50, 18),
  ('t4444444-4444-4444-4444-444444444444', 's4444444-4444-4444-4444-444444444444', 'Standard', 'General Seating', 350, 100, 50),
  ('t5555555-5555-5555-5555-555555555555', 's5555555-5555-5555-5555-555555555555', 'General', 'Entry ticket', 250, 120, 60),
  ('t8888888-8888-8888-8888-888888888888', 's8888888-8888-8888-8888-888888888888', 'Standard', 'Comedy show entry', 399, 150, 75)
ON CONFLICT (id) DO NOTHING;
