'use client'
import React, { useState, useEffect } from 'react'
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
import { domains } from '@/lib/domains'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Skeleton } from "@/components/ui/skeleton";

const InternshipsPage = () => {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOffers() {
      setLoading(true);
      const { data, error } = await supabase.from('offers').select('*, companies(*)').eq('is_active', true);
      if (error) {
        console.error('Error fetching offers:', error);
      } else {
        setOffers(data);
        setFilteredOffers(data);
      }
      setLoading(false);
    }
    fetchOffers();
  }, []);

  const handleDomainChange = (value) => {
    setSelectedDomain(value);
    setSelectedSpeciality(''); // Reset speciality
    if (value && value !== 'all') {
      const domainData = domains.find(d => d.domain === value);
      setSpecialities(domainData ? domainData.specialties : []);
    } else {
      setSpecialities([]);
    }
  };

  useEffect(() => {
    let newFilteredOffers = offers;
    if (selectedDomain && selectedDomain !== 'all') {
      newFilteredOffers = newFilteredOffers.filter(o => o.domain === selectedDomain);
    }
    if (selectedSpeciality && selectedSpeciality !== 'all') {
      newFilteredOffers = newFilteredOffers.filter(o => o.speciality === selectedSpeciality);
    }
    setFilteredOffers(newFilteredOffers);
  }, [selectedDomain, selectedSpeciality, offers]);


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Offres de Stage</h1>
      <div>
        <h2 className="text-xl font-semibold">Filtres</h2>
        <div className="flex flex-col md:flex-row gap-4 my-4">
          <Select onValueChange={handleDomainChange} value={selectedDomain}>
            <SelectTrigger className="w-full md:w-[280px]">
              <SelectValue placeholder="Sélectionner un domaine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les domaines</SelectItem>
              {domains.map((d) => (
                <SelectItem key={d.domain} value={d.domain}>
                  {d.domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedSpeciality} value={selectedSpeciality} disabled={!selectedDomain || selectedDomain === 'all'}>
            <SelectTrigger className="w-full md:w-[280px]">
              <SelectValue placeholder="Sélectionner une spécialité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les spécialités</SelectItem>
              {specialities.map((speciality) => (
                <SelectItem key={speciality} value={speciality}>
                  {speciality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/4 mb-4" />
                <Skeleton className="h-12 w-full" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-10 w-24" />
              </CardFooter>
            </Card>
          ))
        ) : filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => (
            <Card key={offer.id}>
              <CardHeader>
                <CardTitle>{offer.title}</CardTitle>
                <CardDescription>{offer.companies?.name || 'N/A'}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{offer.domain}</p>
                <p className="text-sm text-muted-foreground">{offer.speciality}</p>
                <p className="text-sm text-muted-foreground">{offer.location}</p>
                <p className="text-sm text-muted-foreground">Durée : {offer.duration}</p>
                <p className="mt-4">{offer.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">Publié le : {new Date(offer.created_at).toLocaleDateString()}</p>
                <Button asChild>
                  <a href={`/stages/${offer.id}`}>Postuler</a>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground">Il n'y a pas d'offres dans ce domaine pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default InternshipsPage
