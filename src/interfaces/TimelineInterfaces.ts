export type ITimelineMode =
  | 'day'
  | 'week'
  | 'month'
  | 'year'
  | 'dayweek'
  | 'daymonth'
  | 'shorttime'
  | 'fulltime';

export interface IRecord {
  id: number;
  name: string;
  color: string;
  startDate: Date;
  endDate: Date;
}

export interface ILink {
  id: number;
  start: number;
  startPosition: number;
  end: number;
  endPosition: number;
}
