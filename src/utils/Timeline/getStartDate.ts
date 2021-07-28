import moment, { Moment } from 'moment';

import { ITimelineMode } from '@interfaces/TimelineInterfaces';

function getStartDate(date: Moment, mode: ITimelineMode): Moment {
  switch (mode) {
    case 'year':
      return moment([date.year(), 0, 1]);
    case 'month':
      return moment([date.year(), date.month(), 1]);
    case 'week':
      return date.subtract(date.day(), 'days');
    default:
      return date;
  }
}

export { getStartDate };
