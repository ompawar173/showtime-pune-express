import { createFileRoute } from '@tanstack/react-router'
import { ProfilePage } from '@/pages/CustomerPages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/profile')({ head:()=>meta('Profile','Manage sample profile information and bookings.'), component:ProfilePage })
