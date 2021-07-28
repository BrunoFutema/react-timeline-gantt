import React, { useCallback, useEffect, useRef } from 'react';

import moment from 'moment';
import { v4 } from 'uuid';

import {
  BUFFER_DAYS,
  DATA_CONTAINER_WIDTH,
  VIEW_MODE_DAY,
  VIEW_MODE_MONTH,
  VIEW_MODE_WEEK,
  VIEW_MODE_YEAR,
} from '@constants/timeline';
import { useTimeline } from '@hooks/useTimeline';
import { ITimelineMode } from '@interfaces/TimelineInterfaces';
import { getBox } from '@utils/Timeline/getBox';
import { getFormat } from '@utils/Timeline/getFormat';

import {
  HeaderBottom,
  HeaderContainer,
  HeaderMiddle,
  HeaderTop,
  HeaderViewPort,
} from './styles';

type ILastLeft = {
  top: number;
  middle: number;
  bottom: number;
};

type IResult = {
  top: JSX.Element[];
  middle: JSX.Element[];
  bottom: JSX.Element[];
};

const TimelineHeader: React.FC = () => {
  const {
    mode,
    currentDay,
    numVisibleDays,
    dayWidth,
    nowPosition,
    scrollLeft,
  } = useTimeline();

  const timelineHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineHeaderRef.current) {
      timelineHeaderRef.current.scrollLeft = scrollLeft;
    }
  }, [scrollLeft]);

  const onRenderTime = useCallback(
    (left: number, width: number, iMode: ITimelineMode) => {
      const result = [];
      const hourWidth = width / 24;
      let iterLeft = 0;

      for (let i = 0; i < 24; i++) {
        const component = (
          <div
            key={v4()}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderLeft: 'solid 1px white',
              position: 'absolute',
              height: 20,
              left: iterLeft,
              width: hourWidth,
            }}
          >
            <div>{iMode === 'shorttime' ? i : `${i}:00`}</div>
          </div>
        );

        result.push(component);

        iterLeft += hourWidth;
      }

      return (
        <div
          key={v4()}
          style={{ position: 'absolute', height: 20, left, width }}
        >
          {' '}
          {result}
        </div>
      );
    },
    [],
  );

  const onRenderHeaderRows = useCallback(
    (top: ITimelineMode, middle: ITimelineMode, bottom: ITimelineMode) => {
      const result: IResult = { top: [], middle: [], bottom: [] };
      const lastLeft: Partial<ILastLeft> = {};

      let currentTop = '';
      let currentMiddle = '';
      let currentBottom = '';
      let currentDate = null;
      let box = null;

      const start = currentDay;
      const end = currentDay + numVisibleDays;

      for (let i = start - BUFFER_DAYS; i < end + BUFFER_DAYS; i++) {
        currentDate = moment().add(i, 'days');

        if (currentTop !== currentDate.format(getFormat(top, 'top'))) {
          currentTop = currentDate.format(getFormat(top, 'top'));

          box = getBox({
            date: currentDate,
            mode: top,
            dayWidth,
            nowPosition,
            lastLeft: lastLeft.top,
          });

          lastLeft.top = box.left + box.width;

          const component = (
            <div
              key={v4()}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderLeft: 'solid 1px white',
                position: 'absolute',
                height: 20,
                left: box.left,
                width: box.width,
              }}
            >
              <div>{currentTop}</div>
            </div>
          );

          result.top.push(component);
        }

        if (currentMiddle !== currentDate.format(getFormat(middle))) {
          currentMiddle = currentDate.format(getFormat(middle));

          box = getBox({
            date: currentDate,
            mode: middle,
            dayWidth,
            nowPosition,
            lastLeft: lastLeft.middle,
          });

          lastLeft.middle = box.left + box.width;

          const component = (
            <div
              key={v4()}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderLeft: 'solid 1px white',
                position: 'absolute',
                height: 20,
                left: box.left,
                width: box.width,
              }}
            >
              <div>{currentMiddle}</div>
            </div>
          );

          result.middle.push(component);
        }

        if (currentBottom !== currentDate.format(getFormat(bottom))) {
          currentBottom = currentDate.format(getFormat(bottom));

          box = getBox({
            date: currentDate,
            mode: bottom,
            dayWidth,
            nowPosition,
            lastLeft: lastLeft.bottom,
          });

          lastLeft.bottom = box.left + box.width;

          if (bottom === 'shorttime' || bottom === 'fulltime') {
            result.bottom.push(onRenderTime(box.left, box.width, bottom));
          } else {
            const component = (
              <div
                key={v4()}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderLeft: 'solid 1px white',
                  position: 'absolute',
                  height: 20,
                  left: box.left,
                  width: box.width,
                }}
              >
                <div>{currentBottom}</div>
              </div>
            );

            result.bottom.push(component);
          }
        }
      }

      return (
        <HeaderContainer
          style={{
            width: DATA_CONTAINER_WIDTH,
            maxWidth: DATA_CONTAINER_WIDTH,
          }}
        >
          <HeaderTop>{result.top}</HeaderTop>

          <HeaderMiddle>{result.middle}</HeaderMiddle>

          <HeaderBottom>{result.bottom}</HeaderBottom>
        </HeaderContainer>
      );
    },
    [currentDay, dayWidth, nowPosition, numVisibleDays, onRenderTime],
  );

  const onRenderHeader = useCallback(() => {
    switch (mode) {
      case VIEW_MODE_DAY:
        return onRenderHeaderRows('week', 'dayweek', 'fulltime');
      case VIEW_MODE_WEEK:
        return onRenderHeaderRows('week', 'dayweek', 'shorttime');
      case VIEW_MODE_MONTH:
        return onRenderHeaderRows('month', 'dayweek', 'daymonth');
      case VIEW_MODE_YEAR:
        return onRenderHeaderRows('year', 'month', 'week');
      default:
        return onRenderHeaderRows('month', 'dayweek', 'daymonth');
    }
  }, [mode, onRenderHeaderRows]);

  return (
    <HeaderViewPort ref={timelineHeaderRef}>{onRenderHeader()}</HeaderViewPort>
  );
};

export { TimelineHeader };
