import LevelLayout from './LevelLayout'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { startSession, endSession, complete } from './useLevelState'

type SharedProps = { auth: { user: { id: number } | null } }

export default function Level6() {
  const { auth } = usePage<SharedProps>().props
  const levelId = 6
  const [g1,setG1]=useState('')
  const [g2,setG2]=useState('')
  const [g3,setG3]=useState('')
  const [af,setAf]=useState('')

  useEffect(() => { if (auth?.user?.id) startSession(auth.user.id, levelId) }, [auth?.user?.id])

  async function finish(){
    const payload={g1,g2,g3,af}
    const count=[g1,g2,g3,af].filter(v=>v.trim().length>0).length
    if (auth?.user?.id){
      await endSession(auth.user.id, levelId, payload, 0)
      const stars = count>=4 ? 3 : count>=3 ? 2 : 1
      await complete(auth.user.id, levelId, stars, 70)
    }
  }

  return (
    <LevelLayout title="Level 6 · Positive Energy">
      <div className="bg-white rounded-2xl border border-purple-100 p-6 space-y-3">
        <input value={g1} onChange={e=>setG1(e.target.value)} placeholder="Bersyukur 1" className="w-full rounded-md border border-gray-300 p-2" />
        <input value={g2} onChange={e=>setG2(e.target.value)} placeholder="Bersyukur 2" className="w-full rounded-md border border-gray-300 p-2" />
        <input value={g3} onChange={e=>setG3(e.target.value)} placeholder="Bersyukur 3" className="w-full rounded-md border border-gray-300 p-2" />
        <input value={af} onChange={e=>setAf(e.target.value)} placeholder="Afirmasi" className="w-full rounded-md border border-gray-300 p-2" />
        <div className="flex gap-3 mt-2">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={finish}>Selesai</Button>
        </div>
      </div>
    </LevelLayout>
  )
}