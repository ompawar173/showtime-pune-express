import { createFileRoute } from '@tanstack/react-router'
import { CreateEvent } from '@/pages/WorkspacePages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/organizer/events/create')({ head:()=>meta('Create Event','Create a sample theatre event with sessions and ticket types.'), component:CreateEvent })
