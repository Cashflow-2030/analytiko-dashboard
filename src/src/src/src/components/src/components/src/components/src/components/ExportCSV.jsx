import React from 'react';
import { supabase } from '../supabaseClient';
import Papa from 'papaparse';

export default function ExportCSV() {
  const exportData = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.log(error);
    else {
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'products.csv';
      link.click();
    }
  };

  return <button onClick={exportData}>Exporter CSV</button>;
}
