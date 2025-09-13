
import { createClient } from "@/lib/supabase-server";

import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Globe, Building, Users, Calendar } from "lucide-react";
import Link from "next/link";

import { Suspense } from "react";

async function CompanyDetails({ params }) {
  const supabase = createClient();
  const { data: company, error } = await supabase
    .from("companies")
    .select("*, offers(id, title, location, duration, created_at, is_active)")
    .eq("id", params.id)
    .single();

  if (error || !company) {
    notFound();
  }

  const activeOffers = company.offers.filter(offer => offer.is_active);
  const activeOffersCount = activeOffers.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 relative">
          {activeOffersCount > 0 && (
            <span className="absolute top-2 right-2 z-10 inline-flex items-center rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground ring-1 ring-inset ring-primary/10">
              {activeOffersCount} Offres Actives
            </span>
          )}
          <Card className="relative shadow-md bg-neutral-50">
            <CardHeader>
              <div className="flex flex-col items-center">
                <Image
                  src={company.logo_url || "/internlink_logo.png"}
                  alt={`${company.name} logo`}
                  width={128}
                  height={128}
                  className="rounded-full mb-4 object-cover"
                />
                <CardTitle className="text-2xl font-bold text-center">{company.name}</CardTitle>
                
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 pt-4">
                  <div className="flex items-start space-x-3">
                    <Briefcase className="w-5 h-5 mt-1 text-primary" />
                    <div>
                      <p className="font-semibold">Secteur</p>
                      <p className="text-muted-foreground">{company.sector}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Globe className="w-5 h-5 mt-1 text-primary" />
                    <div>
                      <p className="font-semibold">Site web</p>
                      <a href={company.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">{company.website}</a>
                    </div>
                  </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card className="shadow-md bg-neutral-50">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-justify">{company.description}</p>
            </CardContent>
            <CardHeader>
              <CardTitle>Valeurs et Culture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-justify">{company.values_culture}</p>
            </CardContent>
          </Card>

          {activeOffersCount > 0 ? (
            <Card className="mt-8 shadow-md bg-neutral-50">
              <CardHeader>
                <CardTitle>Offres Actives ({activeOffersCount})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeOffers.map((offer) => (
                    <Link href={`/stages/${offer.id}`} key={offer.id}>
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">{offer.title}</CardTitle>
                          <CardContent className="p-4 pt-0">
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              <span>{offer.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                              <Briefcase className="w-3 h-3" />
                              <span>Durée : {offer.duration}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                              <Calendar className="w-3 h-3" />
                              <span>Publié le : {new Date(offer.created_at).toLocaleDateString()}</span>
                            </div>
                          </CardContent>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="mt-8 shadow-md bg-neutral-50">
              <CardContent className="p-6 text-center text-muted-foreground">
                Aucune offre active pour le moment.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CompanyPage({ params }) {
    return (
        <Suspense fallback={<CompanyPageSkeleton />}>
            <CompanyDetails params={params} />
        </Suspense>
    )
}

function CompanyPageSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse mb-4"></div>
                                <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-6 w-full bg-gray-200 animate-pulse rounded"></div>
                            <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mt-2"></div>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <div className="h-8 w-64 bg-gray-200 animate-pulse rounded"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-2"></div>
                                    <div className="h-20 w-full bg-gray-200 animate-pulse rounded"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="flex items-start space-x-3">
                                            <div className="w-5 h-5 bg-gray-200 animate-pulse rounded"></div>
                                            <div>
                                                <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
                                                <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mt-2"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
