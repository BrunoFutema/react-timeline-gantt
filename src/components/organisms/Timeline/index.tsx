import React, {
  MouseEvent,
  TouchEvent,
  useCallback,
  useRef,
  useState,
} from 'react';

import { CSSProperties } from 'styled-components';

import { VerticalSplitter } from '@components/quarks';
import { useTimeline } from '@hooks/useTimeline';
import { IRecord } from '@interfaces/TimelineInterfaces';

import { TimelineDataViewPort } from './DataViewPort';
import { TimelineHeader } from './Header';
import { TimelineTasklist } from './Tasklist';
import { TimelineController } from './TimelineController';

import { Container, Side, Main } from './styles';

interface ITimelineProps {
  data: IRecord[];
}

const Timeline: React.FC<ITimelineProps> = () => {
  const {
    data,
    nowPosition,
    startRow,
    endRow,
    dayWidth,
    scrollTop,
    scrollLeft,
    linesHeight,
    numVisibleRows,
    size,
    setCurrentDay,
    setNowPosition,
    setScrollLeft,
    setStartRow,
    setEndRow,
    onCreateLink,
    taskToCreate,
    setTaskToCreate,
    setInteractiveMode,
    setChangingTask,
  } = useTimeline();

  const tasklistRef = useRef<HTMLDivElement>(null);

  // const dc = new TimelineController({});

  const timelineController = useRef<TimelineController>(null);

  const dragging = useRef<boolean>(false);
  const draggingPosition = useRef<number>(0);
  const pxToScroll = useRef<number>(1900);

  const [sideStyle, setSideStyle] = useState<CSSProperties>({ width: 200 });

  const onTaskListSizing = useCallback((delta: number) => {
    setSideStyle(prevSideStyle => ({
      ...prevSideStyle,
      width: Number(prevSideStyle.width) - delta,
    }));
  }, []);

  const onHorizontalChange = useCallback(
    (newScrollLeft: number) => {
      let new_nowposition = nowPosition;
      let new_left = -1;
      let new_startRow = startRow;
      let new_endRow = endRow;

      if (newScrollLeft > pxToScroll.current) {
        new_nowposition = nowPosition - pxToScroll.current;
        new_left = 0;
      } else if (newScrollLeft <= 0) {
        new_nowposition = nowPosition + pxToScroll.current;
        new_left = pxToScroll.current;
      } else {
        new_left = newScrollLeft;
      }

      const currentIndx = Math.trunc((newScrollLeft - nowPosition) / dayWidth);

      new_startRow = Math.trunc(scrollTop / linesHeight);
      new_endRow =
        new_startRow + numVisibleRows >= data.length
          ? data.length - 1
          : new_startRow + numVisibleRows;

      timelineController.current?.setStartEnd(
        scrollLeft,
        scrollLeft + Number(size.width),
        nowPosition,
        dayWidth,
      );

      setCurrentDay(currentIndx);
      setNowPosition(new_nowposition);
      setScrollLeft(new_left);
      setStartRow(new_startRow);
      setEndRow(new_endRow);
    },
    [
      data.length,
      dayWidth,
      endRow,
      linesHeight,
      nowPosition,
      numVisibleRows,
      scrollLeft,
      scrollTop,
      setCurrentDay,
      setEndRow,
      setNowPosition,
      setScrollLeft,
      setStartRow,
      size.width,
      startRow,
    ],
  );

  /// //////////////////
  ///  MOUSE EVENTS  ///
  /// //////////////////

  const onMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      dragging.current = true;
      draggingPosition.current = e.clientX;
    },
    [],
  );

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      if (dragging.current) {
        const delta = draggingPosition.current - e.clientX;

        if (delta !== 0) {
          draggingPosition.current = e.clientX;
          onHorizontalChange(scrollLeft + delta);
        }
      }
    },
    [onHorizontalChange, scrollLeft],
  );

  const onMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const onMouseLeave = useCallback(() => {
    dragging.current = false;
  }, []);

  const onTouchMove = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (dragging.current) {
        const delta = draggingPosition.current - e.touches[0].clientX;

        if (delta !== 0) {
          draggingPosition.current = e.touches[0].clientX;
          onHorizontalChange(scrollLeft + delta);
        }
      }
    },
    [onHorizontalChange, scrollLeft],
  );

  const onTouchEnd = useCallback(() => {
    dragging.current = false;
  }, []);

  const onTouchCancel = useCallback(() => {
    dragging.current = false;
  }, []);

  const onFinishCreateLink = useCallback(
    (task: IRecord, position: string) => {
      if (task && taskToCreate && taskToCreate.task.id !== task.id) {
        onCreateLink({ start: taskToCreate, end: { task, position } });
      }

      setInteractiveMode(false);
      setTaskToCreate(null);
    },
    [onCreateLink, setInteractiveMode, setTaskToCreate, taskToCreate],
  );

  const onStartCreateLink = useCallback(
    (task: IRecord, position: string) => {
      setInteractiveMode(true);
      setTaskToCreate({ task, position });
    },
    [setInteractiveMode, setTaskToCreate],
  );

  const onTaskChanging = useCallback(
    (changingTask: any) => {
      setChangingTask(changingTask);
    },
    [setChangingTask],
  );

  return (
    <Container>
      <Side style={sideStyle}>
        <TimelineTasklist ref={tasklistRef} />

        <VerticalSplitter onTaskListSizing={onTaskListSizing} />
      </Side>

      <Main>
        <TimelineHeader />

        <TimelineDataViewPort
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchCancel}
          onFinishCreateLink={onFinishCreateLink}
          onStartCreateLink={onStartCreateLink}
          onTaskChanging={onTaskChanging}
        />
      </Main>
    </Container>
  );
};

export { Timeline };
