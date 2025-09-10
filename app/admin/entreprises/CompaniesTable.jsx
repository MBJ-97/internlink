'use client'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { deleteCompany } from '@/app/admin/actions'
import { useActionState } from 'react'
import { DeleteButton } from '@/components/DeleteButton';

const CompaniesTable = ({ companies }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Entreprises</h1>
        <Link href="/admin" className="text-muted-foreground hover:text-foreground">
          &larr; Retour au tableau de bord
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Site web</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>{company.name}</TableCell>
              <TableCell>
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {company.website}
                </a>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/admin/entreprises/${company.id}/edit`} className="text-primary hover:underline inline-flex items-center h-9 px-3 py-2">
                    Modifier
                  </Link>
                  <DeleteButton
                    itemId={company.id}
                    onDelete={deleteCompany}
                    itemType="company"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable