
'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function updateInternshipStatus(id, newIsActive) {
  console.log('Updating internship status:', { id, newIsActive })
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { error } = await supabase
    .from('offers')
    .update({ is_active: newIsActive })
    .eq('id', id)

  if (error) {
    console.error('Error updating internship:', error)
    return { error: 'Failed to update internship' }
  }

  console.log('Internship status updated successfully')
  revalidatePath('/admin')
  revalidatePath('/internships')
  revalidatePath('/internships', 'layout')
  return { success: true }
}
