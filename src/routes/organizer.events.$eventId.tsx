import { createFileRoute } from '@tanstack/react-router'
import { OrganizerEventDetail } from '@/pages/WorkspacePages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/organizer/events/$eventId')({ head:()=>meta('Organizer Event','Preview sample organizer event details.'), component:OrganizerEventDetail })
