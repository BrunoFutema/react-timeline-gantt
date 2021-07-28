import moment, { Moment } from 'moment';

import { ITimelineMode } from '@interfaces/TimelineInterfaces';

import { dayToPosition } from './dayToPosition';
import { getModeIncrement } from './getModeIncrement';
import { getStartDate } from './getStartDate';

interface IGetBoxProps {
  date: Moment;
  mode: ITimelineMode;
  nowPosition: number;
  dayWidth: number;
  lastLeft?: number;
}

interface IResponse {
  left: number;
  width: number;
}

function getBox({
  date,
  mode,
  dayWidth,
  nowPosition,
  lastLeft,
}: IGetBoxProps): IResponse {
  const increment = getModeIncrement(date, mode) * dayWidth;

  if (!lastLeft) {
    const startDate = getStartDate(date, mode).startOf('day');
    const now = moment().startOf('day');
    const daysInBetween = startDate.diff(now, 'days');

    lastLeft = dayToPosition(daysInBetween, nowPosition, dayWidth);
  }

  return { left: lastLeft, width: increment };
}

export { getBox };
