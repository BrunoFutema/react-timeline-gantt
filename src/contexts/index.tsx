import React from 'react';

import { TimelineProvider } from './ReactTimelineContext';

const AppProvider: React.FC = ({ children }) => {
  return <TimelineProvider>{children}</TimelineProvider>;
};

export { AppProvider };
