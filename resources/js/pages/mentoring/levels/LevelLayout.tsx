import { Head, usePage } from '@inertiajs/react'
import DashboardTopNav from '@/components/dashboard-top-nav'

type Props = { title: string; children: React.ReactNode }

export default function LevelLayout({ title, children }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Head title={title} />
      <DashboardTopNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}