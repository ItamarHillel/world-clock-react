import type { CityData } from '../types';

// רשימת ערים פופולריות עם אזורי הזמן שלהן
export const CITIES: CityData[] = [
  { name: 'תל אביב', timezone: 'Asia/Jerusalem' },
  { name: 'לונדון', timezone: 'Europe/London' },
  { name: 'ניו יורק', timezone: 'America/New_York' },
  { name: 'טוקיו', timezone: 'Asia/Tokyo' },
  { name: 'פריז', timezone: 'Europe/Paris' },
  { name: 'סידני', timezone: 'Australia/Sydney' },
  { name: 'דובאי', timezone: 'Asia/Dubai' },
  { name: 'סינגפור', timezone: 'Asia/Singapore' },
  { name: 'לוס אנג\'לס', timezone: 'America/Los_Angeles' },
  { name: 'ברלין', timezone: 'Europe/Berlin' },
  { name: 'מוסקבה', timezone: 'Europe/Moscow' },
  { name: 'הונג קונג', timezone: 'Asia/Hong_Kong' },
];

// Helper to find city name by timezone
export const getCityNameByTimezone = (timezone: string): string => {
  const city = CITIES.find((c) => c.timezone === timezone);
  return city?.name || timezone.split('/').pop()?.replace('_', ' ') || timezone;
};
