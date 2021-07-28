import { Moment } from 'moment';

import { ITimelineMode } from '@interfaces/TimelineInterfaces';

import { daysInYear } from './daysInYear';

function getModeIncrement(date: Moment, mode: ITimelineMode): number {
  switch (mode) {
    case 'year':
      return daysInYear(date.year());
    case 'month':
      return date.daysInMonth();
    case 'week':
      return 7;
    default:
      return 1;
  }
}

export { getModeIncrement };
