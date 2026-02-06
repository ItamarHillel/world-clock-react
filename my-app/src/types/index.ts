// Types for the Time API responses and city data

export interface TimeApiResponse {
  timezone: string;
  datetime: string;
  abbreviation: string;
  utc_offset: string;
  day_of_week: number;
  day_of_year: number;
  week_number: number;
}

export interface CityData {
  name: string;
  timezone: string; // IANA timezone (e.g., "Europe/London")
}

export interface CityTimeData extends CityData {
  localTime: string; // HH:MM
  date: string; // YYYY-MM-DD
  abbreviation: string;
  utcOffset: string;
  isDaytime: boolean;
  isLoading: boolean;
  error: string | null;
}
