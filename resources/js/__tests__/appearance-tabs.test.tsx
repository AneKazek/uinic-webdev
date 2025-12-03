import { describe, it, expect, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppearanceToggleTab from '@/components/appearance-tabs'

describe('AppearanceToggleTab', () => {
  // Mock matchMedia untuk lingkungan jsdom
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
        onchange: null,
      }),
    })
  })
  it('mengubah tema ke dark saat tombol Dark diklik', async () => {
    const user = userEvent.setup()
    render(<AppearanceToggleTab />)

    const darkBtn = await screen.findByRole('button', { name: /dark/i })
    await user.click(darkBtn)

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('mengubah tema ke light saat tombol Light diklik', async () => {
    const user = userEvent.setup()
    render(<AppearanceToggleTab />)

    const lightBtns = await screen.findAllByRole('button', { name: /light/i })
    await user.click(lightBtns[0])

    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})