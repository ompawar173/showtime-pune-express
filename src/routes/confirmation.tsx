import { createFileRoute } from '@tanstack/react-router'
import { ConfirmationPage } from '@/pages/CustomerPages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/confirmation')({ head:()=>meta('Booking Confirmed','Review the confirmation details for your sample booking.'), component:ConfirmationPage })
