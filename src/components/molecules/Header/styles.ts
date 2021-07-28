import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 50px;

  background: -moz-linear-gradient(top, #eeeeee 0%, #cccccc 100%);
  background: -webkit-linear-gradient(top, #eeeeee 0%, #cccccc 100%);
  background: linear-gradient(to bottom, #eeeeee 0%, #cccccc 100%);

  color: grey;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 22px;
  font-family: Helvetica, sans-serif;
  font-weight: bolder;
  text-shadow: 0.5px 0.5px white;

  margin: 0px 20px;

  flex: 1 1 auto;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  justify-self: flex-end;
`;

export const OperationButton = styled.div`
  width: 30px;
  height: 30px;

  border-radius: 15px;
  background-color: #333333;

  margin: 0px 3px;

  &:hover {
    background-color: rgb(202, 33, 212);
  }
`;

export const ZoomContainer = styled.div`
  margin: 0px 20px;

  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  justify-self: flex-end;
`;

interface IZoomButtonProps {
  isActive?: boolean;
}

const zoomButtonVariations = {
  actived: css`
    border: 1px solid #223344;
    background-color: grey;
  `,
};

export const ZoomButton = styled.button<IZoomButtonProps>`
  width: 80px;

  border: solid 1px silver;
  background-color: #333333;

  color: white;
  font-size: 12px;
  text-align: center;

  padding: 5px;

  cursor: pointer;

  flex: 0 0 auto;

  ${({ isActive }) => isActive && zoomButtonVariations.actived}
`;

export const ZoomButtonLeft = styled(ZoomButton)`
  border-top-left-radius: 17px;
  border-bottom-left-radius: 17px;
`;

export const ZoomButtonRight = styled(ZoomButton)`
  border-top-right-radius: 17px;
  border-bottom-right-radius: 17px;
`;

export const EditableName = styled(ZoomButton)`
  width: 180px;

  margin-left: 20px;
`;
