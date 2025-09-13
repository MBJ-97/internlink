import React from 'react';
import { createClient } from '@/lib/supabase-server';
import CompanyCard from '@/components/CompanyCard';
import Link from 'next/link';

const CompaniesList = async () => {
  const supabase = createClient();
  const { data: companiesData, error } = await supabase.from('companies').select('*, offers(id, is_active)');

  if (error) {
    console.error('Error fetching companies:', error);
    return <p>Error loading companies.</p>;
  }

  const companies = companiesData.map(company => {
    const activeOffersCount = company.offers.filter(offer => offer.is_active).length;
    return { ...company, active_offers_count: activeOffersCount };
  });

  if (error) {
    console.error('Error fetching companies:', error);
    return <p>Error loading companies.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {companies && companies.map((company) => (
        <Link href={`/entreprises/${company.id}`} key={company.id}>
          <CompanyCard company={company} />
        </Link>
      ))}
    </div>
  );
};

export default CompaniesList;
