import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `cookies()` helper can be called only from a Server Component or Server Action. 
            // This error is typically caused by an attempt to set a cookie from a Client Component.
          }
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `cookies()` helper can be called only from a Server Component or Server Action. 
            // This error is typically caused by an attempt to remove a cookie from a Client Component.
          }
        },
      },
    }
  )
}
