import { createFileRoute } from '@tanstack/react-router'
import { TicketPage } from '@/pages/CustomerPages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/ticket')({ head:()=>meta('Digital Ticket','View a mobile-friendly sample digital theatre ticket.'), component:TicketPage })
