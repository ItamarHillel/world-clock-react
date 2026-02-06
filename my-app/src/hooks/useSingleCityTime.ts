import { useState, useEffect, useCallback } from 'react';
import type { TimeApiResponse } from '../types';
import { fetchTimeByTimezone, parseTime, parseDate, isDaytime } from '../utils/api';

interface CityDetailData {
  localTime: string;
  date: string;
  timezone: string;
  abbreviation: string;
  utcOffset: string;
  isDaytime: boolean;
}

interface UseSingleCityTimeResult {
  data: CityDetailData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Custom hook to fetch time data for a single city
 * Includes auto-refresh every 60 seconds
 */
export const useSingleCityTime = (
  timezone: string,
  autoRefresh: boolean = true
): UseSingleCityTimeResult => {
  const [data, setData] = useState<CityDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!timezone) return;

    setIsLoading(true);
    setError(null);

    try {
      const response: TimeApiResponse = await fetchTimeByTimezone(timezone);
      setData({
        localTime: parseTime(response.datetime),
        date: parseDate(response.datetime),
        timezone: response.timezone,
        abbreviation: response.abbreviation,
        utcOffset: response.utc_offset,
        isDaytime: isDaytime(response.datetime),
      });
    } catch {
      setError(`שגיאה בטעינת נתוני השעה. אנא נסה שוב.`);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [timezone]);

  useEffect(() => {
    fetchData();

    // Auto-refresh every 60 seconds
    let intervalId: number | undefined;
    if (autoRefresh) {
      intervalId = window.setInterval(() => {
        fetchData();
      }, 60000);
    }

    // Cleanup interval on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [fetchData, autoRefresh]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
};
