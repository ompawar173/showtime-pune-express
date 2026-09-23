import { createFileRoute } from '@tanstack/react-router'
import { OrganizerDashboard } from '@/pages/WorkspacePages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/organizer/')({ head:()=>meta('Organizer Overview','View sample organizer event activity and ticket totals.'), component:OrganizerDashboard })
