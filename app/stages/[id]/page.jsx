import React, { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Clock } from 'lucide-react'

function OfferDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-6 w-1/4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg mb-8">
          <div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          <div>
            <div className="flex items-center mb-2">
                <Skeleton className="h-4 w-4 mr-2" />
                <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-2" />
                <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
          <div className="prose max-w-none">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}

async function OfferDetails({ offerId }) {
  const { data: offer, error } = await supabase
    .from('offers')
    .select('*, companies(*)')
    .eq('id', offerId)
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
        <div className="flex items-center gap-4 mb-8">
          {offer.companies.logo_url && (
            <img src={offer.companies.logo_url} alt={`${offer.companies.name} logo`} className="h-12 w-12 object-contain rounded-full" />
          )}
          <p className="text-xl text-muted-foreground">{offer.companies.name}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg mb-8">
          <div>
            <p><span className="font-semibold">Domaine :</span> {offer.domain}</p>
            <p><span className="font-semibold">Spécialité :</span> {offer.speciality}</p>
          </div>
          <div>
            <p className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> <span className="font-semibold">Lieu :</span> {offer.location}</p>
            <p className="flex items-center"><Clock className="mr-2 h-4 w-4" /> <span className="font-semibold">Durée :</span> {offer.duration}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
          <div className="prose max-w-none">
            <p>{offer.description}</p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild>
            <a href={offer.apply_url.includes('@') ? `mailto:${offer.apply_url}` : offer.apply_url} target="_blank" rel="noopener noreferrer">Postuler Maintenant</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

const OfferDetailsPage = ({ params }) => {
  return (
    <Suspense fallback={<OfferDetailsSkeleton />}>
      <OfferDetails offerId={params.id} />
    </Suspense>
  )
}

export default OfferDetailsPage