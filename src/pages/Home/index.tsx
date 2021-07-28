import React from 'react';

import { Header } from '@components/molecules';
import { Timeline } from '@components/organisms';
import { useTimeline } from '@hooks/useTimeline';

import { Container, TimelineContainer } from './styles';

const Home: React.FC = () => {
  const { data } = useTimeline();

  return (
    <Container>
      <Header />

      <TimelineContainer>
        <Timeline data={data} />
      </TimelineContainer>
    </Container>
  );
};

export { Home };
