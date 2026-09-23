import { createFileRoute } from '@tanstack/react-router'
import { PaymentPage } from '@/pages/CustomerPages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/payment')({ head:()=>meta('Payment Status','Preview successful, failed and pending sample payment states.'), component:PaymentPage })
