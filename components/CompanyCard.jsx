import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';

const CompanyCard = ({ company }) => {
  return (
    <Card className="group relative overflow-hidden transform transition-all hover:scale-105 flex flex-col items-center justify-center text-center p-6 h-full">
      <div className="transition-all duration-300 group-hover:blur-sm flex flex-col items-center justify-center">
        <div className="relative h-32 w-32 mb-4">
          <img 
            src={company.logo_url || 'https://via.placeholder.com/150'} 
            alt={`${company.name} logo`} 
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-xl font-bold">{company.name}</CardTitle>
          <CardDescription>{company.activity_domain}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-sm text-muted-foreground">{company.address}</p>
          <p className="mt-2 text-sm h-16 overflow-hidden text-ellipsis">{company.description}</p>
        </CardContent>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link href={`/entreprises/${company.id}`} className="text-white font-bold text-lg">En savoir plus</Link>
      </div>
    </Card>
  );
};

export default CompanyCard;
