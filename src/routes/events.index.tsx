import { createFileRoute } from '@tanstack/react-router'
import { EventsPage } from '@/pages/CustomerPages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/events/')({ head:()=>meta('Events in Pune','Discover sample Marathi and Hindi theatre events in Pune.'), component:EventsPage })
