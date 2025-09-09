import React from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button"

const OfferDetailsPage = async ({ params }) => {
  const { data: offer, error } = await supabase
    .from('offers')
    .select('*, companies(*)')
    .eq('id', params.id)
    .single()

  if (error) {
    console.error('Error fetching offer:', error)
    return <div>Erreur lors de la récupération de l'offre</div>
  }

  if (!offer) {
    return <div>Offre introuvable</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{offer.title}</h1>
        <p className="text-xl text-muted-foreground mb-8">{offer.companies.name}</p>
        <div className="flex justify-between text-lg mb-8">
          <p><span className="font-semibold">Domaine :</span> {offer.field}</p>
          <p><span className="font-semibold">Lieu :</span> {offer.location}</p>
          <p><span className="font-semibold">Durée :</span> {offer.duration}</p>
        </div>
        <div className="prose max-w-none">
          <p>{offer.description}</p>
        </div>
        <div className="mt-8">
          <Button asChild>
            <a href={offer.apply_url.includes('@') ? `mailto:${offer.apply_url}` : offer.apply_url} target="_blank" rel="noopener noreferrer">Postuler Maintenant</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OfferDetailsPage
