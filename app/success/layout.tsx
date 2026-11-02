import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Booking Success',
  description: 'Your practice diagnostic session has been successfully booked or requested.',
}

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
