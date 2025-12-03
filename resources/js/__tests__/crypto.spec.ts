import { describe, it, expect } from 'vitest'
import { encrypt, decrypt, makeCsv } from '@/lib/crypto'

describe('crypto util', () => {
  it('encrypt/decrypt returns original text', async () => {
    const text = 'hello world 🌿'
    const pass = 'secret'
    const enc = await encrypt(text, pass)
    const dec = await decrypt(enc, pass)
    expect(dec).toBe(text)
  })

  it('decrypt fails with wrong passphrase', async () => {
    const text = 'testing'
    const enc = await encrypt(text, 'a')
    let ok = false
    try { await decrypt(enc, 'b'); ok = true } catch {}
    expect(ok).toBe(false)
  })

  it('makeCsv produces header and rows', () => {
    const csv = makeCsv([{ date: '2025-11-23', type: 'morning', content: 'good day' }])
    expect(csv.startsWith('date,type,content')).toBe(true)
    expect(csv.includes('2025-11-23,morning,"good day"')).toBe(true)
  })
})
