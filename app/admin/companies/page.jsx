import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Companies</h1>
        <Link href="/admin" className="text-gray-500 hover:text-gray-700">
          &larr; Back to Dashboard
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>{company.name}</TableCell>
              <TableCell>
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {company.website}
                </a>
              </TableCell>
              <TableCell>
                <Link href={`/admin/companies/${company.id}/edit`} className="text-blue-500 hover:underline">
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesPage
