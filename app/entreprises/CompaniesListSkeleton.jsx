import React from 'react';
import CompanyCardSkeleton from '@/components/CompanyCardSkeleton';

const CompaniesListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <CompanyCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CompaniesListSkeleton;
