import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Container, SquareGrip } from './styles';

interface IVerticalSplitterProps {
  onTaskListSizing: (delta: number) => void;
}

const VerticalSplitter: React.FC<IVerticalSplitterProps> = ({
  onTaskListSizing,
}) => {
  const draggingPosition = useRef<number>(0);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const onMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      if (e.button === 0) {
        draggingPosition.current = e.clientX;

        setIsDragging(true);
      }
    },
    [],
  );

  const onMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      e.stopPropagation();

      const delta = draggingPosition.current - e.clientX;

      draggingPosition.current = e.clientX;

      onTaskListSizing(delta);
    },
    [onTaskListSizing],
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }, [isDragging, onMouseMove, onMouseUp]);

  return (
    <Container onMouseDown={onMouseDown}>
      <SquareGrip />
      <SquareGrip />
      <SquareGrip />
      <SquareGrip />
    </Container>
  );
};

export { VerticalSplitter };
