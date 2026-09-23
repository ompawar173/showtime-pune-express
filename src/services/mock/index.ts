import {
  approveEvent,
  createOrder,
  getAllEvents,
  getEventBySlug,
  getMyTickets as fetchMyTickets,
  getOrganizerEvents as fetchOrganizerEvents,
  getOrganizerOrders as fetchOrganizerOrders,
  getPendingEvents as fetchPendingEvents,
  getPublishedEvents,
  getEventSessions as fetchSessions,
  getSessionTicketTypes as fetchTicketTypes,
  getUserProfile,
  rejectEvent,
  simulatePayment as runSimulatedPayment
} from '../supabase'

export const getEvents = async () => getPublishedEvents()
export const getEventById = async (id: string) => getEventBySlug(id)
export const getSessions = async (eventId?: string) => fetchSessions(eventId || 'ek-marathi-natak')
export const getTicketTypes = async (sessionId?: string) => fetchTicketTypes(sessionId || 's1')
export const createMockOrder = async (eventId = 'ek-marathi-natak', sessionId = 's1', items = [{ ticket_type_id: 'silver', quantity: 1 }]) => createOrder(eventId, sessionId, items)
export const simulatePayment = async (status: 'success' | 'failed' | 'pending' = 'success', amount = 1100, orderId = 'CMW-2026-001245') => runSimulatedPayment(orderId, status, amount)
export const getMyTickets = async () => fetchMyTickets()
export const getOrganizerEvents = async () => fetchOrganizerEvents()
export const getOrganizerOrders = async () => fetchOrganizerOrders()
export const getPendingEvents = async () => fetchPendingEvents()
export const approveMockEvent = async (id: string) => approveEvent(id)
export const rejectMockEvent = async (id: string) => rejectEvent(id)
export { getUserProfile }
