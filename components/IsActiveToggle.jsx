
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { updateInternshipStatus } from '@/app/admin/actions'

export default function IsActiveToggle({ internship }) {
  const [isActive, setIsActive] = useState(internship.is_active)

  const handleToggle = async () => {
    const newIsActive = !isActive
    setIsActive(newIsActive)

    const result = await updateInternshipStatus(internship.id, newIsActive)

    if (result.error) {
      console.error('Error updating internship:', result.error)
      // Revert the state if there was an error
      setIsActive(!newIsActive)
    }
  }

  return (
    <Button onClick={handleToggle} variant={isActive ? 'outline' : 'default'}>
      {isActive ? 'Active' : 'Inactive'}
    </Button>
  )
}
