import React, {
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import sizeMe from 'react-sizeme';

import { v4 } from 'uuid';

import { DATA_CONTAINER_WIDTH } from '@constants/timeline';
import { useTimeline } from '@hooks/useTimeline';
import { IRecord } from '@interfaces/TimelineInterfaces';
import { getDateToPixel } from '@utils/Timeline/getDateToPixel';

import { TimelineDataTask } from './DataTask';

import { DataViewPort, DataViewPortContainer, DataRow } from './styles';

interface ITimelineDataViewPortProps {
  onMouseDown: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  onMouseMove: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchMove: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: () => void;
  onTouchCancel: () => void;
  onFinishCreateLink: (task: IRecord, position: string) => void;
  onStartCreateLink: (task: IRecord, position: string) => void;
  onTaskChanging: (changingTask: any) => void;
}

const TimelineDataViewPort: React.FC<ITimelineDataViewPortProps> = ({
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onTouchMove,
  onTouchEnd,
  onTouchCancel,
  onFinishCreateLink,
  onStartCreateLink,
  onTaskChanging,
}) => {
  const {
    data,
    linesHeight,
    scrollLeft,
    scrollTop,
    startRow,
    endRow,
    nowPosition,
    dayWidth,
    selectedItem,
  } = useTimeline();

  const childDragging = useRef<boolean>(false);
  const dataViewPortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dataViewPortRef.current) {
      dataViewPortRef.current.scrollLeft = scrollLeft;
      dataViewPortRef.current.scrollTop = scrollTop;
    }
  }, [scrollLeft, scrollTop]);

  const onChildDrag = useCallback((dragging: boolean) => {
    childDragging.current = dragging;
  }, []);

  const onRenderRows = useCallback(() => {
    const result = [];

    for (let i = startRow; i < endRow + 1; i++) {
      const item = data[i];

      if (!item) break;

      const new_position = getDateToPixel(
        item.startDate,
        nowPosition,
        dayWidth,
      );
      const new_width =
        getDateToPixel(item.endDate, nowPosition, dayWidth) - new_position;

      const component = (
        <DataRow
          key={v4()}
          style={{ top: i * linesHeight, height: linesHeight }}
        >
          <TimelineDataTask
            color={item.color}
            isSelected={selectedItem === item}
            left={new_position}
            width={new_width}
            height={linesHeight}
            item={item}
            onChildDrag={onChildDrag}
            onFinishCreateLink={onFinishCreateLink}
            onStartCreateLink={onStartCreateLink}
            onTaskChanging={onTaskChanging}
          >
            {' '}
          </TimelineDataTask>
        </DataRow>
      );

      result.push(component);
    }

    return result;
  }, [
    data,
    dayWidth,
    endRow,
    linesHeight,
    nowPosition,
    onChildDrag,
    onFinishCreateLink,
    onStartCreateLink,
    onTaskChanging,
    selectedItem,
    startRow,
  ]);

  const doMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      if (e.button === 0 && !childDragging.current) onMouseDown(e);
    },
    [onMouseDown],
  );

  return (
    <DataViewPort
      ref={dataViewPortRef}
      onMouseDown={doMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
    >
      <DataViewPortContainer
        style={{
          height: data.length > 0 ? data.length * linesHeight : 10,
          width: DATA_CONTAINER_WIDTH,
          maxWidth: DATA_CONTAINER_WIDTH,
        }}
      >
        {onRenderRows()}
      </DataViewPortContainer>
    </DataViewPort>
  );
};

const Component = sizeMe({ monitorWidth: true, monitorHeight: true })(
  TimelineDataViewPort,
);

export { Component as TimelineDataViewPort };
