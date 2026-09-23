import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/pages/CustomerPages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/')({ head:()=>meta('Home','Discover Marathi and Hindi theatre performances in Pune.'), component:HomePage })
