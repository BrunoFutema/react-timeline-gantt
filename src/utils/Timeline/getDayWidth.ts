import {
  DAY_DAY_MODE,
  DAY_MONTH_MODE,
  DAY_WEEK_MODE,
  DAY_YEAR_MODE,
  VIEW_MODE_DAY,
  VIEW_MODE_MONTH,
  VIEW_MODE_WEEK,
  VIEW_MODE_YEAR,
} from '@constants/timeline';
import { ITimelineMode } from '@interfaces/TimelineInterfaces';

function getDayWidth(mode: ITimelineMode) {
  switch (mode) {
    case VIEW_MODE_DAY:
      return DAY_DAY_MODE;
    case VIEW_MODE_WEEK:
      return DAY_WEEK_MODE;
    case VIEW_MODE_MONTH:
      return DAY_MONTH_MODE;
    case VIEW_MODE_YEAR:
      return DAY_YEAR_MODE;
    default:
      return DAY_MONTH_MODE;
  }
}

export { getDayWidth };
