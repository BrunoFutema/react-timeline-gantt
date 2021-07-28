import { getToday } from './getToday';

const MIL_IN_HOUR = 1000 * 3600;

function getDateToPixel(input: Date, nowPosition: number, dayWidth: number) {
  const nowDate = getToday(); //
  const inputTime = new Date(input);

  const lightSavingDiff =
    (inputTime.getTimezoneOffset() - nowDate.getTimezoneOffset()) * 60 * 1000;
  const timeDiff = inputTime.getTime() - nowDate.getTime() - lightSavingDiff;
  const pixelWeight = dayWidth / 24;

  return (timeDiff / MIL_IN_HOUR) * pixelWeight + nowPosition;
}

export { getDateToPixel };
