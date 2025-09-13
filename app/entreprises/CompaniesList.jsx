import React from 'react';
import { createClient } from '@/lib/supabase-server';
import CompanyCard from '@/components/CompanyCard';

const CompaniesList = async () => {
  const supabase = createClient();
  const { data: companies, error } = await supabase.from('companies').select('*');

  if (error) {
    console.error('Error fetching companies:', error);
    return <p>Error loading companies.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {companies && companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};

export default CompaniesList;
