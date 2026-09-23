import { createFileRoute } from '@tanstack/react-router'
import { CheckoutPage } from '@/pages/CustomerPages'
import { meta } from '@/components/app/PageMeta'
export const Route = createFileRoute('/checkout')({ head:()=>meta('Checkout','Enter customer details and review your sample theatre booking.'), component:CheckoutPage })
