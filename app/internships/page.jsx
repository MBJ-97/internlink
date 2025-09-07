import React from 'react'
import { supabase } from '@/lib/supabase'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const InternshipsPage = async () => {
  const { data: offers, error } = await supabase.from('offers').select('*, companies(*)').eq('is_active', true)

  if (error) {
    console.error('Error fetching offers:', error)
    return <div>Error fetching offers</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Offres de Stage</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <Card key={offer.id}>
            <CardHeader>
              <CardTitle>{offer.title}</CardTitle>
              <CardDescription>{offer.companies.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{offer.field}</p>
              <p className="text-sm text-gray-500">{offer.location}</p>
              <p className="text-sm text-gray-500">Durée : {offer.duration}</p>
              <p className="mt-4">{offer.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">Publié le : {new Date(offer.created_at).toLocaleDateString()}</p>
              <Button asChild>
                <a href={`/internships/${offer.id}`}>Postuler</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default InternshipsPage
