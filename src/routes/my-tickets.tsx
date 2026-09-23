import { createFileRoute } from '@tanstack/react-router'
import { MyTicketsPage } from '@/pages/CustomerPages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/my-tickets')({ head:()=>meta('My Tickets','View upcoming and past sample theatre tickets.'), component:MyTicketsPage })
