import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import DashboardTopNav from '@/components/dashboard-top-nav'

// Mock minimal @inertiajs/react agar komponen dapat dirender di test
vi.mock('@inertiajs/react', () => ({
  Link: (props: any) => {
    const { href, children, ...rest } = props
    return <a href={href} {...rest}>{children}</a>
  },
  usePage: () => ({ props: {} }),
}))

describe('DashboardTopNav', () => {
  it('menampilkan quick action dengan href yang benar', () => {
    render(
      <DashboardTopNav
        items={[
          { icon: () => null, label: 'Belajar', href: '/mentoring' },
          { icon: () => null, label: 'Skor', href: '/leaderboard' },
          { icon: () => null, label: 'Misi', href: '/missions' },
          { icon: () => null, label: 'Toko', href: '/shop' },
        ]}
      />
    )

    const belajar = screen.getByRole('link', { name: /belajar/i })
    const skor = screen.getByRole('link', { name: /skor/i })
    const misi = screen.getByRole('link', { name: /misi/i })
    const toko = screen.getByRole('link', { name: /toko/i })

    expect(belajar.getAttribute('href')).toBe('/mentoring')
    expect(skor.getAttribute('href')).toBe('/leaderboard')
    expect(misi.getAttribute('href')).toBe('/missions')
    expect(toko.getAttribute('href')).toBe('/shop')
  })
})