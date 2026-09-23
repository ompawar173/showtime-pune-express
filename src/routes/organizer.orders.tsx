import { createFileRoute } from '@tanstack/react-router'
import { OrganizerOrders } from '@/pages/WorkspacePages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/organizer/orders')({ head:()=>meta('Organizer Orders','View sample orders for organizer events.'), component:OrganizerOrders })
