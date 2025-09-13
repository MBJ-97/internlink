import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CompanyCard = ({ company }) => {
  return (
    <Card className="group relative overflow-hidden transform transition-all hover:scale-105 flex flex-col items-center justify-center text-center p-6 aspect-square w-full">
      <div className="flex flex-col items-center justify-center">
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
          {company.active_offers_count !== undefined && (
            <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black text-white text-xs font-medium rounded-full">
              {company.active_offers_count} Active Offers
            </div>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-sm text-muted-foreground">{company.address}</p>
          
        </CardContent>
      </div>
    </Card>
  );
};

export default CompanyCard;
