import React, { forwardRef, useCallback } from 'react';

import { v4 } from 'uuid';

import { useTimeline } from '@hooks/useTimeline';

import { TimelineTasklistRow } from './TasklistRow';

import {
  TasklistContainer,
  TasklistTasksContainer,
  TasklistTitle,
  TasklistViewPort,
} from './styles';

const TimelineTasklist: React.ForwardRefRenderFunction<HTMLDivElement> = (
  _,
  ref,
) => {
  const { data, startRow, endRow, linesHeight } = useTimeline();

  const onRenderTaskRow = useCallback(() => {
    const result: JSX.Element[] = [];

    for (let index = startRow; index < endRow; index++) {
      const item = data[index];

      if (!item) break;

      result.push(
        <TimelineTasklistRow
          key={v4()}
          index={index}
          item={item}
          top={index * linesHeight}
          height={linesHeight}
        />,
      );
    }

    return result;
  }, [data, endRow, linesHeight, startRow]);

  return (
    <TasklistContainer>
      <TasklistTitle>Tarefas</TasklistTitle>

      <TasklistViewPort ref={ref}>
        <TasklistTasksContainer
          style={{ height: data.length > 0 ? data.length * linesHeight : 10 }}
        >
          {onRenderTaskRow()}
        </TasklistTasksContainer>
      </TasklistViewPort>
    </TasklistContainer>
  );
};

const Component = forwardRef(TimelineTasklist);

export { Component as TimelineTasklist };
