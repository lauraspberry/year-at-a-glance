import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/AuthContext';

interface EntryDatesProviderProps {
  children: (datesWithEntries: Set<string>) => React.ReactNode;
}

export default function EntryDatesProvider({ children }: EntryDatesProviderProps) {
  const [datesWithEntries, setDatesWithEntries] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  useEffect(() => {
    const fetchDatesWithEntries = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('entries')
          .select('date')
          .eq('user_id', user.id)
          .order('date', { ascending: true });

        if (error) throw error;
        
        // Create a Set of unique dates that have entries
        const uniqueDates = new Set(data?.map(entry => entry.date) || []);
        setDatesWithEntries(uniqueDates);
      } catch (err) {
        console.error('Error fetching dates with entries:', err);
      }
    };

    fetchDatesWithEntries();
  }, [user]);

  return <>{children(datesWithEntries)}</>;
} 