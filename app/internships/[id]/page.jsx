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
    return <div>Error fetching offer</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{offer.title}</h1>
        <p className="text-xl text-gray-500 mb-8">{offer.companies.name}</p>
        <div className="flex justify-between text-lg mb-8">
          <p><span className="font-semibold">Field:</span> {offer.field}</p>
          <p><span className="font-semibold">Location:</span> {offer.location}</p>
          <p><span className="font-semibold">Duration:</span> {offer.duration}</p>
        </div>
        <div className="prose max-w-none">
          <p>{offer.description}</p>
        </div>
        <div className="mt-8">
          <Button asChild>
            <a href={offer.apply_url} target="_blank" rel="noopener noreferrer">Apply Now</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OfferDetailsPage
