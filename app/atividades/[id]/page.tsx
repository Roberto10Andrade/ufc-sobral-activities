'use client'

import { use } from 'react'
import ActivityDetails from '@/app/components/ActivityDetails'

interface ActivityPageProps {
  params: Promise<{ id: string }>
}

export default function ActivityPage({ params }: ActivityPageProps) {
  const { id } = use(params)

  return (
    <div className="container mx-auto px-4 py-8">
      <ActivityDetails id={id} />
    </div>
  )
}
