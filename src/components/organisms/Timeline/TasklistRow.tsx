import React, { useCallback } from 'react';

import { useTimeline } from '@hooks/useTimeline';
import { IRecord } from '@interfaces/TimelineInterfaces';

import { ContentEditable } from './ContentEditable';

import { TasklistTaskRow } from './styles';

interface ITimelineTasklistRowProps {
  index: number;
  item: IRecord;
  top: number;
  height: number;
}

const TimelineTasklistRow: React.FC<ITimelineTasklistRowProps> = ({
  index,
  item,
  top,
  height,
}) => {
  const { editableName, onSelectItem, onUpdateTask } = useTimeline();

  const onChange = useCallback(
    (name: string) => onUpdateTask(item, { name }),
    [item, onUpdateTask],
  );

  return (
    <TasklistTaskRow style={{ top, height }} onClick={() => onSelectItem(item)}>
      {!editableName ? (
        <div style={{ width: '100%' }}>{item.name}</div>
      ) : (
        <ContentEditable index={index} value={item.name} onChange={onChange} />
      )}
    </TasklistTaskRow>
  );
};

export { TimelineTasklistRow };
