import type { TimeApiResponse } from '../types';

/**
 * Gets current time data for a given IANA timezone using native JavaScript Intl API
 * This is reliable, accurate, and doesn't depend on external services
 * @param timezone - IANA timezone string (e.g., "Europe/London")
 * @returns Promise with the time data
 */
export const fetchTimeByTimezone = async (
  timezone: string
): Promise<TimeApiResponse> => {
  // Simulate async behavior for consistency with the hook
  await Promise.resolve();
  
  const now = new Date();
  
  // Get the formatted date/time parts for the specific timezone
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  
  const parts = formatter.formatToParts(now);
  const getPart = (type: string) => parts.find(p => p.type === type)?.value || '';
  
  const year = getPart('year');
  const month = getPart('month');
  const day = getPart('day');
  const hour = getPart('hour');
  const minute = getPart('minute');
  const second = getPart('second');
  
  // Build ISO-like datetime string
  const datetime = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  
  // Get timezone abbreviation and offset
  const abbrevFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'short',
  });
  const abbrevParts = abbrevFormatter.formatToParts(now);
  const abbreviation = abbrevParts.find(p => p.type === 'timeZoneName')?.value || timezone.split('/').pop() || '';
  
  // Calculate UTC offset
  const utcFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const localFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  
  const utcStr = utcFormatter.format(now).replace(', ', 'T');
  const localStr = localFormatter.format(now).replace(', ', 'T');
  const utcDate = new Date(utcStr);
  const localDate = new Date(localStr);
  const offsetMinutes = (localDate.getTime() - utcDate.getTime()) / 60000;
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  const offsetMins = Math.abs(offsetMinutes) % 60;
  const offsetSign = offsetMinutes >= 0 ? '+' : '-';
  const utc_offset = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMins).padStart(2, '0')}`;
  
  // Calculate day of week (0 = Sunday)
  const dayOfWeekFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'short',
  });
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = dayOfWeekFormatter.format(now);
  const day_of_week = dayNames.findIndex(d => dayName.startsWith(d));
  
  return {
    timezone,
    datetime,
    abbreviation,
    utc_offset,
    day_of_week,
    day_of_year: Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000),
    week_number: Math.ceil((((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 86400000) + 1) / 7),
  };
};

/**
 * Parses datetime string and extracts time in HH:MM format
 * @param datetime - datetime string (e.g., "2026-02-05T14:30:00")
 * @returns Time in HH:MM format
 */
export const parseTime = (datetime: string): string => {
  const timeMatch = datetime.match(/T(\d{2}):(\d{2})/);
  if (timeMatch) {
    return `${timeMatch[1]}:${timeMatch[2]}`;
  }
  return '--:--';
};

/**
 * Parses datetime string and extracts date in DD/MM/YYYY format
 * @param datetime - datetime string from API
 * @returns Date in DD/MM/YYYY format
 */
export const parseDate = (datetime: string): string => {
  const dateMatch = datetime.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (dateMatch) {
    const year = dateMatch[1];
    const month = dateMatch[2];
    const day = dateMatch[3];
    return `${day}/${month}/${year}`;
  }
  return '--/--/----';
};

/**
 * Determines if it's daytime based on the hour
 * Daytime: 06:00 - 17:59
 * @param datetime - datetime string
 * @returns true if daytime, false if nighttime
 */
export const isDaytime = (datetime: string): boolean => {
  const timeMatch = datetime.match(/T(\d{2}):/);
  if (timeMatch) {
    const hour = parseInt(timeMatch[1], 10);
    return hour >= 6 && hour < 18;
  }
  return true;
};
