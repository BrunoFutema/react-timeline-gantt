import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { CSSProperties } from 'styled-components';

import { ILink, IRecord, ITimelineMode } from '@interfaces/TimelineInterfaces';
import { getDayWidth } from '@utils/Timeline/getDayWidth';

interface ITimelineContext {
  data: IRecord[];
  setData: Dispatch<SetStateAction<IRecord[]>>;
  links: ILink[];
  setLinks: Dispatch<SetStateAction<ILink[]>>;

  mode: ITimelineMode;
  setMode: Dispatch<SetStateAction<ITimelineMode>>;
  dayWidth: number;
  setDayWidth: Dispatch<SetStateAction<number>>;
  nowPosition: number;
  setNowPosition: Dispatch<SetStateAction<number>>;
  editableName: boolean;
  setEditableName: Dispatch<SetStateAction<boolean>>;
  interactiveMode: boolean;
  setInteractiveMode: Dispatch<SetStateAction<boolean>>;
  linesHeight: number;
  setLinesHeight: Dispatch<SetStateAction<number>>;
  startRow: number;
  setStartRow: Dispatch<SetStateAction<number>>;
  endRow: number;
  setEndRow: Dispatch<SetStateAction<number>>;
  currentDay: number;
  setCurrentDay: Dispatch<SetStateAction<number>>;
  numVisibleRows: number;
  setNumVisibleRows: Dispatch<SetStateAction<number>>;
  numVisibleDays: number;
  setNumVisibleDays: Dispatch<SetStateAction<number>>;
  scrollTop: number;
  setScrollTop: Dispatch<SetStateAction<number>>;
  scrollLeft: number;
  setScrollLeft: Dispatch<SetStateAction<number>>;
  size: CSSProperties;
  setSize: Dispatch<SetStateAction<CSSProperties>>;

  selectedItem: IRecord | null;
  taskToCreate: any;
  setTaskToCreate: Dispatch<SetStateAction<any>>;
  changingTask: any;
  setChangingTask: Dispatch<SetStateAction<any>>;

  onSelectItem: (item: IRecord) => void;
  onAddNewTask: () => void;
  onDeleteTask: () => void;
  onUpdateTask: (task: IRecord, update: Partial<IRecord>) => void;
  onCreateLink: (item: any) => void;
}

const TimelineContext = createContext<ITimelineContext>({} as ITimelineContext);

const TimelineProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IRecord[]>([
    {
      id: 1,
      color: 'red',
      name: 'Tarefa 1',
      startDate: new Date(2021, 6, 30),
      endDate: new Date(2021, 7, 10),
    },
    {
      id: 2,
      color: 'green',
      name: 'Tarefa 2',
      startDate: new Date(2021, 7, 11),
      endDate: new Date(2021, 7, 30),
    },
  ]);
  const [links, setLinks] = useState<ILink[]>([]);

  const [mode, setMode] = useState<ITimelineMode>('month');
  const [dayWidth, setDayWidth] = useState<number>(getDayWidth(mode));
  const [nowPosition, setNowPosition] = useState<number>(0);
  const [editableName, setEditableName] = useState<boolean>(false);
  const [interactiveMode, setInteractiveMode] = useState<boolean>(false);
  const [linesHeight, setLinesHeight] = useState<number>(20);
  const [startRow, setStartRow] = useState<number>(0);
  const [endRow, setEndRow] = useState<number>(10);
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [numVisibleRows, setNumVisibleRows] = useState<number>(40);
  const [numVisibleDays, setNumVisibleDays] = useState<number>(60);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [size, setSize] = useState<CSSProperties>({
    width: 1,
    height: 1,
  });

  const [selectedItem, setSelectedItem] = useState<IRecord | null>(null);
  const [taskToCreate, setTaskToCreate] = useState<any | null>(null);
  const [changingTask, setChangingTask] = useState<any | null>(null);

  const onSelectItem = useCallback((item: IRecord) => {
    setSelectedItem(item);
  }, []);

  const onAddNewTask = useCallback(() => {
    setData(prevData => {
      const id =
        prevData.length === 0 ? 1 : prevData[prevData.length - 1].id + 1;

      return [
        ...prevData,
        {
          id,
          name: `Nova tarefa ${id}`,
          color: '#1B203C',
          startDate: new Date(),
          endDate: new Date(),
        },
      ];
    });
  }, []);

  const onUpdateTask = useCallback(
    (task: IRecord, update: Partial<IRecord>) => {
      setData(prevData => {
        const updatedData = [...prevData].map(item => {
          if (item.id === task.id) return { ...item, ...update };

          return item;
        });

        return updatedData;
      });
    },
    [],
  );

  const onDeleteTask = useCallback(() => {
    setData(prevData => {
      if (prevData.length === 0) return [];

      const lastId = prevData[prevData.length - 1].id;

      return prevData.filter(item => item.id !== lastId);
    });
  }, []);

  const onCreateLink = useCallback((item: any) => {
    setLinks(prevLinks => [
      ...prevLinks,
      {
        id: prevLinks.length === 0 ? 1 : prevLinks[prevLinks.length - 1].id + 1,
        start: item.start.task.id,
        startPosition: item.start.position,
        end: item.end.task.id,
        endPosition: item.end.position,
      },
      // {
      //   id: 1,
      //   start: item.start,
      //   startPosition: 1,
      //   end: item.end,
      //   endPosition: 0,
      // },
    ]);
  }, []);

  const value = useMemo(
    () => ({
      data,
      setData,
      links,
      setLinks,

      mode,
      setMode,
      dayWidth,
      setDayWidth,
      nowPosition,
      setNowPosition,
      editableName,
      setEditableName,
      interactiveMode,
      setInteractiveMode,
      linesHeight,
      setLinesHeight,
      startRow,
      setStartRow,
      endRow,
      setEndRow,
      currentDay,
      setCurrentDay,
      numVisibleRows,
      setNumVisibleRows,
      numVisibleDays,
      setNumVisibleDays,
      scrollTop,
      setScrollTop,
      scrollLeft,
      setScrollLeft,
      size,
      setSize,

      selectedItem,
      taskToCreate,
      setTaskToCreate,
      changingTask,
      setChangingTask,

      onSelectItem,
      onAddNewTask,
      onUpdateTask,
      onDeleteTask,
      onCreateLink,
    }),
    [
      data,
      setData,
      links,
      setLinks,

      mode,
      setMode,
      dayWidth,
      setDayWidth,
      nowPosition,
      setNowPosition,
      editableName,
      setEditableName,
      interactiveMode,
      setInteractiveMode,
      linesHeight,
      setLinesHeight,
      startRow,
      setStartRow,
      endRow,
      setEndRow,
      currentDay,
      setCurrentDay,
      numVisibleRows,
      setNumVisibleRows,
      numVisibleDays,
      setNumVisibleDays,
      scrollTop,
      setScrollTop,
      scrollLeft,
      setScrollLeft,
      size,
      setSize,

      selectedItem,
      taskToCreate,
      setTaskToCreate,
      changingTask,
      setChangingTask,

      onSelectItem,
      onAddNewTask,
      onUpdateTask,
      onDeleteTask,
      onCreateLink,
    ],
  );

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
};

export { TimelineContext, TimelineProvider };
