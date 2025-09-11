import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import InternshipsTable from './InternshipsTable' // Import the new Client Component

async function getInternships() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
  const { data, error } = await supabase.from('offers').select('*, companies(name)').order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching internships:', error)
    return []
  }

  return data
}

const AdminPage = async () => {
  const internships = await getInternships()

  return (
    <InternshipsTable internships={internships} />
  )
}

export default AdminPage