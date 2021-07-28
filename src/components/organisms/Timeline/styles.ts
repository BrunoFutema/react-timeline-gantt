import styled from 'styled-components';

/**
 * TIMELINE
 */
export const Container = styled.div`
  width: 100%;
  height: 100%;

  border: solid 1px rgb(207, 207, 205);

  font-size: 12px;

  display: flex;
  flex-direction: row;

  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export const Side = styled.div`
  width: 108px;
  min-width: 108px;

  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
`;

export const Main = styled.div`
  position: relative;

  display: flex;
  flex: 1 1 100%;
  flex-direction: column;

  overflow-y: hidden;
`;

/**
 * TASKLIST
 */
export const TasklistContainer = styled.div`
  border-right: solid 1px rgb(207, 207, 205);

  display: flex;
  flex: 1 0 100px;
  flex-direction: column;
`;

export const TasklistTitle = styled.strong`
  border-bottom: 1px solid silver;
  background-color: #333333;

  color: white;
  text-align: center;

  display: flex;
  flex: 0 0 60px;
  align-items: center;
  justify-content: center;
`;

export const TasklistViewPort = styled.div`
  height: 100%;

  background-color: #fbf9f9;

  position: relative;

  flex: 1 1 auto;

  overflow-x: hidden;
  overflow-y: auto;
`;

export const TasklistTasksContainer = styled.div`
  position: relative;

  overflow-x: hidden;
  overflow-y: hidden;
`;

export const TasklistTaskRow = styled.div`
  width: 100%;
  height: 30px;

  outline: none;
  border-bottom-color: rgb(207, 207, 205);
  border-bottom-style: solid;
  border-bottom-width: 0.5px;
  background-color: rgb(112, 112, 112);
  background-color: #fbf9f9;

  color: grey;
  text-align: center;
  text-overflow: ellipsis;

  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  overflow: hidden;
`;

/**
 * TIMELINE HEADER
 */
export const HeaderViewPort = styled.div`
  width: 100%;
  height: 60px;

  background-color: rgb(112, 112, 112);

  position: relative;

  flex: 0 0 60px;

  overflow: hidden;
`;

export const HeaderContainer = styled.div`
  height: 100%;

  background-color: #333333;

  position: relative;
  top: 0;
  left: 0;

  display: flex;
  flex: 0 0 60px;
  flex-direction: column;

  overflow: hidden;
  user-select: none;
`;

export const HeaderTop = styled.div`
  height: 20px;

  border-bottom: solid 0.5px silver;
  background-color: #333333;

  color: white;
  font-size: 10;
  text-align: center;
`;

export const HeaderMiddle = styled.div`
  height: 20px;

  border-bottom: solid 0.5px silver;
  background-color: chocolate;

  color: white;
  font-size: 10px;
`;

export const HeaderBottom = styled.div`
  height: 20px;

  border-bottom: solid 0.5px silver;
  background: grey;

  color: white;
  font-size: 10px;
  font-size: 9px;
`;

/**
 * TIMELINE DATAVIEWPORT
 */
export const DataViewPort = styled.div`
  background-color: #fbf9f9;

  position: relative;

  flex: 1 1 auto;

  overflow: hidden;
`;

export const DataViewPortContainer = styled.div`
  height: 100%;

  background-color: rgb(255, 255, 255);

  position: relative;
  top: 0;
  left: 0;
`;

export const DataRow = styled.div`
  width: 100%;
  height: 50px;

  border-bottom: 0.5px solid #cfcfcd;
  background-color: #fbf9f9;

  position: absolute;
`;

/**
 * TIMELINE DATATADK
 */
export const DataTaskSide = styled.div`
  width: 10px;

  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: center;

  cursor: col-resize;
`;

export const DataTaskSideLinker = styled.div`
  width: 8px;
  height: 8px;

  border-radius: 4px;

  cursor: default;

  z-index: 100;

  &:hover {
    border: solid 0.5px grey;
    background-color: black;
  }
`;
