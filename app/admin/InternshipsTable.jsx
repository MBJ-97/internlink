'use client'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import IsActiveToggle from '@/components/IsActiveToggle'
import { Button } from '@/components/ui/button'
import { deleteInternship } from '@/app/admin/actions'
import { useActionState } from 'react'
import { DeleteButton } from '@/components/DeleteButton';

const InternshipsTable = ({ internships }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord administrateur</h1>
        <div className="flex gap-4">
            <Link href="/admin/entreprises" className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90">
              Voir les entreprises
            </Link>
            <Link href="/admin/ajouter-entreprise" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
              Ajouter une entreprise
            </Link>
            <Link href="/admin/ajouter-offre" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
              Ajouter une offre de stage
            </Link>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Entreprise</TableHead>
            <TableHead>Lieu</TableHead>
            <TableHead>Domaine</TableHead>
            <TableHead>Durée</TableHead>
            <TableHead>Actif</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {internships.map((internship) => (
            <TableRow key={internship.id}>
              <TableCell>{internship.title}</TableCell>
              <TableCell>{internship.companies?.name || 'N/A'}</TableCell>
              <TableCell>{internship.location}</TableCell>
              <TableCell>{internship.field}</TableCell>
              <TableCell>{internship.duration}</TableCell>
              <TableCell>
                <IsActiveToggle internship={internship} />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/admin/offres/${internship.id}/edit`} className="text-primary hover:underline inline-flex items-center h-9 px-3 py-2">
                    Modifier
                  </Link>
                  <DeleteButton
                    itemId={internship.id}
                    onDelete={deleteInternship}
                    itemType="internship"
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

export default InternshipsTable