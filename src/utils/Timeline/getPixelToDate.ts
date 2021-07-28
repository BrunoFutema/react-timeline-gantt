import { getToday } from './getToday';

const MIL_IN_HOUR = 1000 * 3600;

function getPixelToDate(
  position: number,
  nowPosition: number,
  dayWidth: number,
) {
  const hoursInPixel = 24 / dayWidth;
  const pixelsFromNow = position - nowPosition;
  const today = getToday();
  const milisecondsFromNow =
    today.getTime() + pixelsFromNow * hoursInPixel * MIL_IN_HOUR;
  const result = new Date(milisecondsFromNow);
  const lightSavingDiff =
    (result.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
  result.setTime(result.getTime() + lightSavingDiff);

  return result;
}

export { getPixelToDate };
