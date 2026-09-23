import { supabase } from '@/lib/supabase'
import type { EventItem, Order, Session, Ticket, TicketType } from '@/types'

// Helper to transform Supabase DB event row into frontend EventItem
function transformEvent(row: any): EventItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category || 'Theatre',
    language: row.language || 'Marathi',
    image: row.poster_url || row.banner_url || '/src/assets/theatre-hero.jpg',
    date: row.start_time
      ? new Date(row.start_time).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
      : '10 October 2026',
    shortDate: row.start_time
      ? new Date(row.start_time).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
      : '10 Oct',
    time: row.start_time
      ? new Date(row.start_time).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })
      : '7:00 PM',
    venue: row.venues?.name || 'Bal Gandharva Rang Mandir',
    city: row.venues?.city || 'Pune',
    price: row.price || 300,
    description: row.description || '',
    cast: row.cast || ['Aarav Deshmukh', 'Meera Kulkarni'],
    status:
      row.status === 'published'
        ? 'Published'
        : row.status === 'approved'
        ? 'Approved'
        : row.status === 'pending'
        ? 'Pending Approval'
        : row.status === 'rejected'
        ? 'Rejected'
        : 'Draft',
    organizer: row.organizers?.organization_name || 'Rangmanch Collective'
  }
}

// 1. PUBLIC EVENTS SERVICE
export async function getPublishedEvents(): Promise<EventItem[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*, venues(name, city), organizers(organization_name)')
    .eq('status', 'published')

  if (error) {
    console.error('Error fetching published events:', error.message)
    return []
  }

  return (data || []).map(transformEvent)
}

export async function getAllEvents(): Promise<EventItem[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*, venues(name, city), organizers(organization_name)')

  if (error) {
    console.error('Error fetching all events:', error.message)
    return []
  }

  return (data || []).map(transformEvent)
}

export async function getEventBySlug(slugOrId: string): Promise<EventItem | undefined> {
  const { data, error } = await supabase
    .from('events')
    .select('*, venues(name, city), organizers(organization_name)')
    .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
    .maybeSingle()

  if (error) {
    console.error('Error fetching event by slug/ID:', error.message)
    return undefined
  }

  return data ? transformEvent(data) : undefined
}

// 2. SESSIONS & TICKET TYPES
export async function getEventSessions(slugOrId: string): Promise<Session[]> {
  // First resolve event ID if passed a slug
  const event = await getEventBySlug(slugOrId)
  const eventId = event?.id || slugOrId

  const { data, error } = await supabase
    .from('event_sessions')
    .select('*')
    .eq('event_id', eventId)

  if (error) {
    console.error('Error fetching event sessions:', error.message)
    return []
  }

  return (data || []).map(s => {
    const dt = new Date(s.start_time)
    return {
      id: s.id,
      day: dt.toLocaleDateString('en-US', { weekday: 'long' }),
      date: dt.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }),
      time: dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    }
  })
}

export async function getSessionTicketTypes(sessionId: string): Promise<TicketType[]> {
  const { data, error } = await supabase
    .from('ticket_types')
    .select('*')
    .eq('session_id', sessionId)

  if (error) {
    console.error('Error fetching ticket types:', error.message)
    return []
  }

  return (data || []).map(t => ({
    id: t.id,
    name: t.name,
    price: Number(t.price),
    available: t.available_quantity
  }))
}

// 3. ORDER & BOOKING FLOW
export async function createOrder(
  eventSlugOrId: string,
  sessionId: string,
  items: Array<{ ticket_type_id: string; quantity: number }>
) {
  const event = await getEventBySlug(eventSlugOrId)
  const eventId = event?.id || eventSlugOrId

  const { data: userData } = await supabase.auth.getUser()
  const userId = userData.user?.id || null

  const { data, error } = await supabase.rpc('create_order_atomic', {
    p_user_id: userId,
    p_event_id: eventId,
    p_session_id: sessionId,
    p_items: items
  })

  if (error) {
    console.error('RPC create_order_atomic failed:', error.message)
    throw new Error(error.message)
  }

  return {
    bookingId: data.order_number || data.order_id,
    orderId: data.order_id,
    status: data.status,
    subtotal: Number(data.subtotal),
    fees: Number(data.fees),
    total_amount: Number(data.total_amount)
  }
}

export async function simulatePayment(orderId: string, status: 'success' | 'failed' | 'pending' = 'success', amount: number = 1100) {
  if (status !== 'success') {
    return { status: 'failed', message: 'Payment simulation failed' }
  }

  const { data, error } = await supabase.rpc('confirm_simulated_payment', {
    p_order_id: orderId,
    p_payment_reference: 'SIM-' + Date.now(),
    p_amount: amount
  })

  if (error) {
    console.error('RPC confirm_simulated_payment failed:', error.message)
    throw new Error(error.message)
  }

  return {
    status: 'success',
    bookingId: data.order_number || orderId
  }
}

// 4. MY TICKETS
export async function getMyTickets(): Promise<Ticket[]> {
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return []

  const { data, error } = await supabase
    .from('tickets')
    .select('*, orders(*, events(*, venues(*)))')

  if (error) {
    console.error('Error fetching user tickets:', error.message)
    return []
  }

  return (data || []).map(t => ({
    id: t.id,
    event: transformEvent(t.orders?.events || {}),
    bookingId: t.orders?.order_number || 'CMW-2026-001245',
    customer: userData.user.email || 'Customer',
    session: '10 October 2026 · 7:00 PM',
    ticketType: 'General Admission',
    quantity: 1,
    total: Number(t.orders?.total_amount || 0),
    status: t.status === 'active' ? 'Upcoming' : 'Past'
  }))
}

// 5. ORGANIZER SERVICE
export async function getOrganizerEvents(): Promise<EventItem[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*, venues(name, city), organizers(organization_name)')

  if (error) {
    console.error('Error fetching organizer events:', error.message)
    return []
  }

  return (data || []).map(transformEvent)
}

export async function createOrganizerEvent(payload: {
  title: string
  category: string
  description: string
  venueName: string
  venueAddress: string
  sessionDate: string
  startTime: string
  endTime?: string
  ticketTypes: Array<{ name: string; price: number; quantity: number }>
}) {
  const slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  
  const { data: venueData, error: venueError } = await supabase
    .from('venues')
    .insert({ name: payload.venueName, address: payload.venueAddress, city: 'Pune' })
    .select('id')
    .single()

  if (venueError) console.warn('Venue insert warning:', venueError.message)

  const { data: eventData, error: eventError } = await supabase
    .from('events')
    .insert({
      title: payload.title,
      slug,
      category: payload.category,
      description: payload.description,
      venue_id: venueData?.id || null,
      status: 'pending'
    })
    .select('*')
    .single()

  if (eventError) {
    console.error('Event creation error:', eventError.message)
    throw new Error(eventError.message)
  }

  return { success: true, event: transformEvent(eventData) }
}

export async function getOrganizerOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, profiles(full_name, email), events(title), event_sessions(start_time)')

  if (error) {
    console.error('Error fetching organizer orders:', error.message)
    return []
  }

  return (data || []).map(o => ({
    id: o.order_number || o.id,
    customer: o.profiles?.full_name || o.profiles?.email || 'Customer',
    event: o.events?.title || 'Ek Marathi Natak',
    session: o.event_sessions?.start_time ? new Date(o.event_sessions.start_time).toLocaleString('en-IN') : '10 Oct, 7:00 PM',
    tickets: 3,
    amount: Number(o.total_amount),
    status: o.status === 'confirmed' ? 'Confirmed' : 'Pending'
  }))
}

// 6. ADMIN MODERATION SERVICE
export async function getPendingEvents(): Promise<EventItem[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*, venues(name, city), organizers(organization_name)')
    .eq('status', 'pending')

  if (error) {
    console.error('Error fetching pending events:', error.message)
    return []
  }

  return (data || []).map(transformEvent)
}

export async function approveEvent(eventId: string) {
  const { error } = await supabase
    .from('events')
    .update({ status: 'published', updated_at: new Date().toISOString() })
    .or(`id.eq.${eventId},slug.eq.${eventId}`)

  if (error) {
    console.error('Approve event error:', error.message)
    throw new Error(error.message)
  }
  return { id: eventId, status: 'Approved' as const }
}

export async function rejectEvent(eventId: string) {
  const { error } = await supabase
    .from('events')
    .update({ status: 'rejected', updated_at: new Date().toISOString() })
    .or(`id.eq.${eventId},slug.eq.${eventId}`)

  if (error) {
    console.error('Reject event error:', error.message)
    throw new Error(error.message)
  }
  return { id: eventId, status: 'Rejected' as const }
}

// 7. AUTHENTICATION SERVICE
export async function getUserProfile() {
  const { data: authData } = await supabase.auth.getUser()
  if (!authData.user) return null

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authData.user.id)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching profile:', error.message)
  }

  return profile || {
    id: authData.user.id,
    email: authData.user.email,
    full_name: authData.user.user_metadata?.full_name || authData.user.email?.split('@')[0] || 'User',
    role: 'customer'
  }
}

// 8. STORAGE HELPER FOR FILE UPLOADS
export async function uploadStorageFile(bucket: 'event-posters' | 'event-banners' | 'organizer-logos' | 'avatars', file: File) {
  const fileExt = file.name.split('.').pop()
  const filePath = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file)

  if (uploadError) {
    console.error(`Storage upload error (${bucket}):`, uploadError.message)
    throw uploadError
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
  return data.publicUrl
}
