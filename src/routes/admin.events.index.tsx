import { createFileRoute } from '@tanstack/react-router'
import { AdminEvents } from '@/pages/WorkspacePages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/admin/events')({ head:()=>meta('Pending Events','Review sample events awaiting approval.'), component:AdminEvents })
