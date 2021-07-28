import { ITimelineMode } from '@interfaces/TimelineInterfaces';

function getFormat(mode: ITimelineMode, position?: 'top'): string {
  switch (mode) {
    case 'year':
      return 'YYYY';
    case 'month':
      if (position === 'top') return 'MMMM YYYY';

      return 'MMMM';
    case 'week':
      if (position === 'top') return 'ww MMMM YYYY';

      return 'ww';
    case 'dayweek':
      return 'dd';
    case 'daymonth':
      return 'D';
    default:
      return '';
  }
}

export { getFormat };
