/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { CSSProperties } from 'styled-components';

import {
  LINK_POS_LEFT,
  LINK_POS_RIGHT,
  MODE_MOVE,
  MODE_NONE,
  MOVE_RESIZE_LEFT,
  MOVE_RESIZE_RIGHT,
} from '@constants/timeline';
import { useTimeline } from '@hooks/useTimeline';
import { IRecord } from '@interfaces/TimelineInterfaces';

import { DataTaskSide, DataTaskSideLinker } from './styles';

const style = {
  position: 'absolute',
  borderRadius: 14,
  color: 'white',
  textAlign: 'center',
  backgroundColor: 'grey',
};

const selectedStyle = {
  position: 'absolute',
  borderRadius: 14,
  border: 'solid 1px #ff00fa',
  color: 'white',
  textAlign: 'center',
  backgroundColor: 'grey',
};

interface ITimelineDataTaskProps {
  color: string;
  isSelected: boolean;
  left: number;
  width: number;
  height: number;
  item: IRecord;
  showLabel?: boolean;
  onChildDrag: (dragging: boolean) => void;
  onFinishCreateLink: (task: IRecord, position: string) => void;
  onStartCreateLink: (task: IRecord, position: string) => void;
  onTaskChanging: (changingTask: any) => void;
}

type IMouseEvent = MouseEvent<HTMLDivElement, globalThis.MouseEvent>;

const TimelineDataTask: React.FC<ITimelineDataTaskProps> = ({
  color,
  isSelected,
  left: leftProp,
  width: widthProp,
  height,
  item,
  showLabel = true,
  onChildDrag,
  onFinishCreateLink,
  onStartCreateLink,
  onTaskChanging,
}) => {
  const { nowPosition } = useTimeline();

  const draggingPosition = useRef<number>(0);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [left, setLeft] = useState<number>(leftProp);
  const [width, setWidth] = useState<number>(widthProp);
  const [mode, setMode] = useState<number>(MODE_NONE);

  const calculateStyle = useCallback((): CSSProperties => {
    const configStyle = isSelected ? selectedStyle : style;
    const backgroundColor = color || configStyle.backgroundColor;

    if (isDragging) {
      return {
        ...configStyle,
        backgroundColor,
        left,
        width,
        height: height - 5,
        top: 2,
      } as CSSProperties;
    }
    return {
      ...configStyle,
      backgroundColor,
      left,
      width,
      height: height - 5,
      top: 2,
    } as CSSProperties;
  }, [color, height, isDragging, isSelected, left, width]);

  const onDragProcess = useCallback(
    (x: number) => {
      const delta = draggingPosition.current - x;
      let newLeft = left;
      let newWidth = width;

      switch (mode) {
        case MODE_MOVE:
          newLeft = left - delta;
          break;
        case MOVE_RESIZE_LEFT:
          newLeft = left - delta;
          newWidth = width + delta;
          break;
        case MOVE_RESIZE_RIGHT:
          newWidth = width - delta;
          break;
        default:
          break;
      }

      const changeObj = {
        item,
        position: {
          start: newLeft - nowPosition,
          end: newLeft + newWidth - nowPosition,
        },
      };

      onTaskChanging(changeObj);

      setLeft(newLeft);
      setWidth(newWidth);

      draggingPosition.current = x;
    },
    [item, left, mode, nowPosition, onTaskChanging, width],
  );

  const onDragEnd = useCallback(() => {
    onChildDrag(false);

    // const new_start_date = getPixelToDate(left, nowPosition, dayWidth);
    // const new_end_date = getPixelToDate(left + width, nowPosition, dayWidth);

    // onUpdateTask(item, { start: new_start_date, end: new_end_date });

    setIsDragging(false);
    setMode(MODE_NONE);
  }, [onChildDrag]);

  const doMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (isDragging) {
        e.stopPropagation();
        onDragProcess(e.clientX);
      }
    },
    [isDragging, onDragProcess],
  );

  const doMouseUp = useCallback(() => {
    onDragEnd();
  }, [onDragEnd]);

  const doTouchMove = useCallback(
    (e: globalThis.TouchEvent) => {
      if (isDragging) {
        // console.log('move');
        e.stopPropagation();
        onDragProcess(e.changedTouches[0].clientX);
      }
    },
    [isDragging, onDragProcess],
  );

  const doTouchEnd = useCallback(() => {
    onDragEnd();
  }, [onDragEnd]);

  const dragStart = useCallback(
    (x: number, iMode: number) => {
      onChildDrag(true);

      draggingPosition.current = x;

      setIsDragging(true);
      setMode(iMode);
      setLeft(leftProp);
      setWidth(widthProp);
    },
    [leftProp, onChildDrag, widthProp],
  );

  const onMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, iMode: number) => {
      // if (!this.props.onUpdateTask) return;
      if (e.button === 0) {
        e.stopPropagation();
        dragStart(e.clientX, iMode);
      }
    },
    [dragStart],
  );

  const onTouchStart = useCallback(
    (e: TouchEvent<HTMLDivElement>, iMode: number) => {
      // if (!this.props.onUpdateTask) return;

      e.stopPropagation();

      dragStart(e.touches[0].clientX, iMode);
    },
    [dragStart],
  );

  const onCreateLinkMouseUp = useCallback(
    (e: IMouseEvent, position: string) => {
      e.stopPropagation();
      onFinishCreateLink(item, position);
    },
    [item, onFinishCreateLink],
  );

  const onCreateLinkTouchEnd = useCallback(
    (e: TouchEvent<HTMLDivElement>, position: string) => {
      e.stopPropagation();
      onFinishCreateLink(item, position);
    },
    [item, onFinishCreateLink],
  );

  const onCreateLinkMouseDown = useCallback(
    (e: IMouseEvent, position: string) => {
      if (e.button === 0) {
        e.stopPropagation();
        onStartCreateLink(item, position);
      }
    },
    [item, onStartCreateLink],
  );

  const onCreateLinkTouchStart = useCallback(
    (e: TouchEvent<HTMLDivElement>, position: string) => {
      e.stopPropagation();
      onStartCreateLink(item, position);
    },
    [item, onStartCreateLink],
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', doMouseMove);
      document.addEventListener('mouseup', doMouseUp);
      document.addEventListener('touchmove', doTouchMove);
      document.addEventListener('touchend', doTouchEnd);
    } else {
      document.removeEventListener('mousemove', doMouseMove);
      document.removeEventListener('mouseup', doMouseUp);
      document.removeEventListener('touchmove', doTouchMove);
      document.removeEventListener('touchend', doTouchEnd);
    }
  }, [doMouseMove, doMouseUp, doTouchEnd, doTouchMove, isDragging]);

  return (
    <div
      onMouseDown={e => onMouseDown(e, MODE_MOVE)}
      onTouchStart={e => onTouchStart(e, MODE_MOVE)}
      onClick={() => console.log('onSelect')}
      style={calculateStyle()}
    >
      <DataTaskSide
        style={{ top: 0, left: -4, height: height - 5 }}
        onMouseDown={e => onMouseDown(e, MOVE_RESIZE_LEFT)}
        onTouchStart={e => onTouchStart(e, MOVE_RESIZE_LEFT)}
      >
        <DataTaskSideLinker
          onMouseUp={e => onCreateLinkMouseUp(e, LINK_POS_LEFT)}
          onTouchEnd={e => onCreateLinkTouchEnd(e, LINK_POS_LEFT)}
        />
      </DataTaskSide>

      <div style={{ overflow: 'hidden' }}>{showLabel ? item.name : ''}</div>

      <DataTaskSide
        style={{ top: 0, left: width - 3, height: height - 5 }}
        onMouseDown={e => onMouseDown(e, MOVE_RESIZE_RIGHT)}
        onTouchStart={e => onTouchStart(e, MOVE_RESIZE_RIGHT)}
      >
        <DataTaskSideLinker
          onMouseDown={e => onCreateLinkMouseDown(e, LINK_POS_RIGHT)}
          onTouchStart={e => onCreateLinkTouchStart(e, LINK_POS_RIGHT)}
        />
      </DataTaskSide>
    </div>
  );
};

export { TimelineDataTask };
