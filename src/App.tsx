import React from 'react';

import { GlobalStyles } from '@styles/global';

import { AppProvider } from './contexts';
import { Routes } from './routes';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes />
      <GlobalStyles />
    </AppProvider>
  );
};

export { App };
