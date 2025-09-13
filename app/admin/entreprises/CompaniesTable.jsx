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
            <TableHead>Logo</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Secteur</TableHead>
            <TableHead>Nom du contact</TableHead>
            <TableHead>Email du contact</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>
                {company.logo_url ? (
                  <img src={company.logo_url} alt={`Logo of ${company.name}`} className="h-10 w-10 object-contain rounded-md" />
                ) : (
                  <div className="h-10 w-10 bg-muted rounded-md" />
                )}
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.sector}</TableCell>
              <TableCell>{company.contact_name}</TableCell>
              <TableCell>{company.contact_email}</TableCell>
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
