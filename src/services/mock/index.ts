import { events, myTickets, orders, sessions, ticketTypes } from '@/mock/events'
export const getEvents=async()=>events
export const getEventById=async(id:string)=>events.find(event=>event.id===id)
export const getSessions=async()=>sessions
export const getTicketTypes=async()=>ticketTypes
export const createMockOrder=async()=>({bookingId:'CMW-2026-001245',status:'confirmed' as const})
export const simulatePayment=async(status:'success'|'failed'|'pending')=>({status})
export const getMyTickets=async()=>myTickets
export const getOrganizerEvents=async()=>events.slice(0,6)
export const getOrganizerOrders=async()=>orders
export const getPendingEvents=async()=>events.filter(event=>event.status==='Pending Approval')
export const approveMockEvent=async(id:string)=>({id,status:'Approved' as const})
export const rejectMockEvent=async(id:string)=>({id,status:'Rejected' as const})
