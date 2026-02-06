import { useState, useEffect, useCallback } from 'react';
import type { CityData, CityTimeData } from '../types';
import { fetchTimeByTimezone, parseTime, parseDate, isDaytime } from '../utils/api';

interface UseTimeDataResult {
  citiesData: CityTimeData[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Custom hook to fetch time data for multiple cities
 * Includes auto-refresh every 60 seconds
 */
export const useTimeData = (
  cities: CityData[],
  autoRefresh: boolean = true
): UseTimeDataResult => {
  const [citiesData, setCitiesData] = useState<CityTimeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllCities = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await Promise.all(
        cities.map(async (city) => {
          try {
            const data = await fetchTimeByTimezone(city.timezone);
            return {
              name: city.name,
              timezone: city.timezone,
              localTime: parseTime(data.datetime),
              date: parseDate(data.datetime),
              abbreviation: data.abbreviation,
              utcOffset: data.utc_offset,
              isDaytime: isDaytime(data.datetime),
              isLoading: false,
              error: null,
            } as CityTimeData;
          } catch {
            return {
              name: city.name,
              timezone: city.timezone,
              localTime: '--:--',
              date: '----/--/--',
              abbreviation: '---',
              utcOffset: '---',
              isDaytime: true,
              isLoading: false,
              error: `שגיאה בטעינת השעה עבור ${city.name}`,
            } as CityTimeData;
          }
        })
      );

      setCitiesData(results);
      
      // Check if all cities failed
      const allFailed = results.every((r) => r.error !== null);
      if (allFailed) {
        setError('שגיאה בטעינת הנתונים. אנא בדוק את החיבור לאינטרנט.');
      }
    } catch {
      setError('אירעה שגיאה בלתי צפויה. אנא נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  }, [cities]);

  useEffect(() => {
    fetchAllCities();

    // Auto-refresh every 60 seconds
    let intervalId: number | undefined;
    if (autoRefresh) {
      intervalId = window.setInterval(() => {
        fetchAllCities();
      }, 60000);
    }

    // Cleanup interval on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [fetchAllCities, autoRefresh]);

  return {
    citiesData,
    isLoading,
    error,
    refetch: fetchAllCities,
  };
};
