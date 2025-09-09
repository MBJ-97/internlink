
import Link from 'next/link'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import IsActiveToggle from '@/components/IsActiveToggle'

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
  const { data, error } = await supabase.from('offers').select('*, companies(name)')

  if (error) {
    console.error('Error fetching internships:', error)
    return []
  }

  return data
}

const AdminPage = async () => {
  const internships = await getInternships()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
            <Link href="/admin/entreprises" className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90">
              View Companies
            </Link>
            <Link href="/admin/ajouter-entreprise" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
              Add Company
            </Link>
            <Link href="/admin/ajouter-offre" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
              Add Internship Offer
            </Link>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Field</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {internships.map((internship) => (
            <TableRow key={internship.id}>
              <TableCell>{internship.title}</TableCell>
              <TableCell>{internship.companies.name}</TableCell>
              <TableCell>{internship.location}</TableCell>
              <TableCell>{internship.field}</TableCell>
              <TableCell>{internship.duration}</TableCell>
              <TableCell>
                <IsActiveToggle internship={internship} />
              </TableCell>
              <TableCell>
                <Link href={`/admin/offres/${internship.id}/modifier`} className="text-primary hover:underline">
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

export default AdminPage
