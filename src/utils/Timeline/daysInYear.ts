import { isLeapYear } from './isLeapYear';

function daysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}

export { daysInYear };
