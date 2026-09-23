import { createFileRoute } from '@tanstack/react-router'
import { AdminReview } from '@/pages/WorkspacePages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/admin/events/$eventId')({ head:()=>meta('Event Review','Approve or reject a sample event using local controls.'), component:AdminReview })
