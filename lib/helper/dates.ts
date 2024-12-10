import { endOfMonth, intervalToDuration, startOfMonth } from 'date-fns';

import { Period } from '@/types/analytics';

export function datesToDurationString(end: Date | null | undefined, start: Date | null | undefined) {
  if (!start || !end) return null;

  const timeElapsed = end.getTime() - start.getTime();
  if (timeElapsed < 1000) {
    // Less than 1 second
    return `${timeElapsed}ms`;
  }

  const duration = intervalToDuration({
    start: 0,
    end: timeElapsed,
  });

  return `${duration.minutes || 0}m ${duration.seconds || 0}s`;
}

export function periodToDateRange(period: Period) {
  const startDate = startOfMonth(new Date(period.year, period.month));
  const endDate = endOfMonth(new Date(period.year, period.month));

  return { startDate, endDate };
}
