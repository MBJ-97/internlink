import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CompanyCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-1/4 mb-2" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
};

export default CompanyCardSkeleton;
