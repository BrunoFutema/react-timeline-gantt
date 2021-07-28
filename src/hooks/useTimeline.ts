import { useContext } from 'react';

import { TimelineContext } from '@contexts/ReactTimelineContext';

function useTimeline() {
  const context = useContext(TimelineContext);

  return context;
}

export { useTimeline };
