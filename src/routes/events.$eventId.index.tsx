import { createFileRoute } from '@tanstack/react-router'
import { EventDetailsPage } from '@/pages/CustomerPages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/events/$eventId/')({ head:()=>meta('Event Details','View event information, cast, venue and available sessions.'), component:EventDetailsPage })
