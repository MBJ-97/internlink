import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import CompaniesTable from './CompaniesTable' // Import the new Client Component

async function getCompanies() {
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
  const { data, error } = await supabase.from('companies').select('*')

  if (error) {
    console.error('Error fetching companies:', error)
    return []
  }

  return data
}

const CompaniesPage = async () => {
  const companies = await getCompanies()

  return (
    <CompaniesTable companies={companies} />
  )
}

export default CompaniesPage