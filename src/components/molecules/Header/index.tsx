import React from 'react';

import { Add, Del } from '@assets/index';
import { useTimeline } from '@hooks/useTimeline';

import {
  Actions,
  Container,
  OperationButton,
  Title,
  ZoomButtonLeft,
  ZoomButton,
  ZoomContainer,
  ZoomButtonRight,
  EditableName,
} from './styles';

const Header: React.FC = () => {
  const {
    mode,
    setMode,
    editableName,
    setEditableName,
    onAddNewTask,
    onDeleteTask,
  } = useTimeline();

  return (
    <Container>
      <Title>Full Demo</Title>

      <Actions>
        <OperationButton onClick={onAddNewTask}>
          <Add />
        </OperationButton>

        <OperationButton onClick={onDeleteTask}>
          <Del />
        </OperationButton>
      </Actions>

      <ZoomContainer>
        <ZoomButtonLeft
          isActive={mode === 'day'}
          onClick={() => setMode('day')}
        >
          Dia
        </ZoomButtonLeft>

        <ZoomButton isActive={mode === 'week'} onClick={() => setMode('week')}>
          Semana
        </ZoomButton>

        <ZoomButton
          isActive={mode === 'month'}
          onClick={() => setMode('month')}
        >
          Mês
        </ZoomButton>

        <ZoomButtonRight
          isActive={mode === 'year'}
          onClick={() => setMode('year')}
        >
          Ano
        </ZoomButtonRight>

        <EditableName
          style={{ marginLeft: '20px' }}
          onClick={() => setEditableName(!editableName)}
        >
          {!editableName ? 'Habilitar' : 'Desabilitar'} edição da tarefa
        </EditableName>
      </ZoomContainer>
    </Container>
  );
};

export { Header };
