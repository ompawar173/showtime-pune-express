import { createFileRoute } from '@tanstack/react-router'
import { OrganizerEvents } from '@/pages/WorkspacePages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/organizer/events/')({ head:()=>meta('Organizer Events','Manage sample theatre events and approval statuses.'), component:OrganizerEvents })
