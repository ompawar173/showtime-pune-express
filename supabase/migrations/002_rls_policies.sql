-- RangTix Supabase Schema Migration: 002_rls_policies.sql
-- Row Level Security (RLS) policies for secure data access control

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user role safely
CREATE OR REPLACE FUNCTION public.get_user_role(p_user_id UUID)
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = p_user_id;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 1. PROFILES POLICIES
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can update own profile (excluding role)"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id OR public.get_user_role(auth.uid()) = 'admin')
  WITH CHECK (
    auth.uid() = id AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
    OR public.get_user_role(auth.uid()) = 'admin'
  );

-- 2. ORGANIZERS POLICIES
CREATE POLICY "Public can view approved organizers"
  ON public.organizers FOR SELECT
  USING (status = 'approved' OR profile_id = auth.uid() OR public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Authenticated users can register as organizer"
  ON public.organizers FOR INSERT
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Organizers can update own details"
  ON public.organizers FOR UPDATE
  USING (profile_id = auth.uid() OR public.get_user_role(auth.uid()) = 'admin');

-- 3. VENUES POLICIES
CREATE POLICY "Public can view all venues"
  ON public.venues FOR SELECT
  USING (true);

CREATE POLICY "Organizers and Admins can create venues"
  ON public.venues FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- 4. EVENTS POLICIES
CREATE POLICY "Public can view published events"
  ON public.events FOR SELECT
  USING (
    status = 'published'
    OR (
      organizer_id IN (SELECT id FROM public.organizers WHERE profile_id = auth.uid())
    )
    OR public.get_user_role(auth.uid()) = 'admin'
  );

CREATE POLICY "Organizers can create events"
  ON public.events FOR INSERT
  WITH CHECK (
    organizer_id IN (SELECT id FROM public.organizers WHERE profile_id = auth.uid())
    OR public.get_user_role(auth.uid()) = 'admin'
  );

CREATE POLICY "Organizers and Admins can update own events"
  ON public.events FOR UPDATE
  USING (
    organizer_id IN (SELECT id FROM public.organizers WHERE profile_id = auth.uid())
    OR public.get_user_role(auth.uid()) = 'admin'
  );

-- 5. EVENT SESSIONS POLICIES
CREATE POLICY "Public can view sessions for published events"
  ON public.event_sessions FOR SELECT
  USING (
    event_id IN (SELECT id FROM public.events WHERE status = 'published')
    OR event_id IN (
      SELECT id FROM public.events WHERE organizer_id IN (
        SELECT id FROM public.organizers WHERE profile_id = auth.uid()
      )
    )
    OR public.get_user_role(auth.uid()) = 'admin'
  );

CREATE POLICY "Organizers can manage sessions for own events"
  ON public.event_sessions FOR ALL
  USING (
    event_id IN (
      SELECT id FROM public.events WHERE organizer_id IN (
        SELECT id FROM public.organizers WHERE profile_id = auth.uid()
      )
    )
    OR public.get_user_role(auth.uid()) = 'admin'
  );

-- 6. TICKET TYPES POLICIES
CREATE POLICY "Public can view ticket types for published events"
  ON public.ticket_types FOR SELECT
  USING (
    session_id IN (
      SELECT id FROM public.event_sessions WHERE event_id IN (
        SELECT id FROM public.events WHERE status = 'published'
      )
    )
    OR session_id IN (
      SELECT id FROM public.event_sessions WHERE event_id IN (
        SELECT id FROM public.events WHERE organizer_id IN (
          SELECT id FROM public.organizers WHERE profile_id = auth.uid()
        )
      )
    )
    OR public.get_user_role(auth.uid()) = 'admin'
  );

CREATE POLICY "Organizers can manage ticket types"
  ON public.ticket_types FOR ALL
  USING (
    session_id IN (
      SELECT id FROM public.event_sessions WHERE event_id IN (
        SELECT id FROM public.events WHERE organizer_id IN (
          SELECT id FROM public.organizers WHERE profile_id = auth.uid()
        )
      )
    )
    OR public.get_user_role(auth.uid()) = 'admin'
  );

-- 7. ORDERS POLICIES
CREATE POLICY "Customers can view own orders"
  ON public.orders FOR SELECT
  USING (
    user_id = auth.uid()
    OR event_id IN (
      SELECT id FROM public.events WHERE organizer_id IN (
        SELECT id FROM public.organizers WHERE profile_id = auth.uid()
      )
    )
    OR public.get_user_role(auth.uid()) = 'admin'
  );

CREATE POLICY "Customers can create own orders"
  ON public.orders FOR INSERT
  WITH CHECK (user_id = auth.uid() OR auth.uid() IS NOT NULL);

-- 8. ORDER ITEMS POLICIES
CREATE POLICY "Users can view order items for viewable orders"
  ON public.order_items FOR SELECT
  USING (
    order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid())
    OR order_id IN (
      SELECT id FROM public.orders WHERE event_id IN (
        SELECT id FROM public.events WHERE organizer_id IN (
          SELECT id FROM public.organizers WHERE profile_id = auth.uid()
        )
      )
    )
    OR public.get_user_role(auth.uid()) = 'admin'
  );

-- 9. PAYMENTS POLICIES
CREATE POLICY "Users can view payments for own orders"
  ON public.payments FOR SELECT
  USING (
    order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid())
    OR public.get_user_role(auth.uid()) = 'admin'
  );

-- 10. TICKETS POLICIES
CREATE POLICY "Customers can view own tickets"
  ON public.tickets FOR SELECT
  USING (
    order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid())
    OR order_id IN (
      SELECT id FROM public.orders WHERE event_id IN (
        SELECT id FROM public.events WHERE organizer_id IN (
          SELECT id FROM public.organizers WHERE profile_id = auth.uid()
        )
      )
    )
    OR public.get_user_role(auth.uid()) = 'admin'
  );
