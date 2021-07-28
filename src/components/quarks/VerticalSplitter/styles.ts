import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;

  border-right: solid 1px rgb(207, 207, 205);
  background-color: #333333;

  cursor: col-resize;

  display: flex;
  flex: 0 0 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SquareGrip = styled.div`
  width: 5px;
  height: 5px;

  border-radius: 50%;
  background: #cfcfcd;

  margin: 3px 0;

  flex: 0 0 auto;
`;
