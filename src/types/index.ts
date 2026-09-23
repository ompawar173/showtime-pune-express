export type EventStatus = 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Published'
export type EventItem = { id:string; title:string; category:string; language:string; image:string; date:string; shortDate:string; time:string; venue:string; city:string; price:number; description:string; cast:string[]; status?:EventStatus; organizer?:string }
export type Session = { id:string; day:string; date:string; time:string }
export type TicketType = { id:string; name:string; price:number; available:number }
export type Ticket = { id:string; event:EventItem; bookingId:string; customer:string; session:string; ticketType:string; quantity:number; total:number; status:'Upcoming'|'Past' }
export type Order = { id:string; customer:string; event:string; session:string; tickets:number; amount:number; status:string }
