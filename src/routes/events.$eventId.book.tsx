import { createFileRoute } from '@tanstack/react-router'
import { BookingPage } from '@/pages/CustomerPages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/events/$eventId/book')({ head:()=>meta('Select Tickets','Choose a session and ticket quantities for a sample theatre booking.'), component:BookingPage })
