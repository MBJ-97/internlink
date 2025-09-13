import React, { Suspense } from 'react';
import CompaniesList from './CompaniesList';
import CompaniesListSkeleton from './CompaniesListSkeleton';

const CompaniesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Ces entreprises nous font confiance</h1>
        <p className="text-lg text-muted-foreground">Découvrez les entreprises qui recrutent activement des talents via notre plateforme.</p>
      </div>
      <Suspense fallback={<CompaniesListSkeleton />}>
        <CompaniesList />
      </Suspense>
    </div>
  );
};

export default CompaniesPage;
