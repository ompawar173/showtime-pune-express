import { createFileRoute } from '@tanstack/react-router'
import { AdminDashboard } from '@/pages/WorkspacePages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/admin')({ head:()=>meta('Admin Overview','View a basic sample event moderation overview.'), component:AdminDashboard })
