/* eslint-disable no-useless-constructor */
/* eslint-disable lines-between-class-members */

import { getPixelToDate } from '@utils/Timeline/getPixelToDate';

const HORIZON_BUFFER = 1000;
const HORIZON_BUFFER_ALERT = 750;

class TimelineController {
  private nowPosition = 0;
  private dayWidth = 0;
  private lower_limit = 0;
  private lower_data_limit = 0;
  private upper_limit = 0;
  private upper_data_limit = 0;

  constructor(private onHorizonChange: any) {}

  needData(start: number, end: number) {
    return start < this.lower_data_limit || end > this.upper_data_limit;
  }

  setLimits(start: number, end: number) {
    this.lower_limit = start - HORIZON_BUFFER;
    this.lower_data_limit = start - HORIZON_BUFFER_ALERT;
    this.upper_limit = end + HORIZON_BUFFER;
    this.upper_data_limit = end + HORIZON_BUFFER_ALERT;
  }

  loadDataHorizon() {
    const lowerLimit = getPixelToDate(
      this.lower_limit,
      this.nowPosition,
      this.dayWidth,
    );
    const uppperLimit = getPixelToDate(
      this.lower_limit,
      this.nowPosition,
      this.dayWidth,
    );

    this.onHorizonChange(lowerLimit, uppperLimit);
  }

  setStartEnd(
    start: number,
    end: number,
    nowPosition: number,
    dayWidth: number,
  ) {
    this.nowPosition = nowPosition;
    this.dayWidth = dayWidth;

    if (this.needData(start, end)) {
      this.setLimits(start, end);
    }
  }
}

export { TimelineController };
