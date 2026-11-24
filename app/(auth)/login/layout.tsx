import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Login · Mercian Wealth',
  description: 'Sign in to your Mercian Wealth client dashboard or administrator control panel.',
  alternates: {
    canonical: 'https://mercianwealth.com/login',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
