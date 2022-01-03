import React, { useEffect, useState } from "react";
import { Button, useMantineTheme, Group } from "@mantine/core";
import { User, Task, MonthTasksQuery, Col, EncTask } from "../helpers/types";
import { decryptJSON, signJSON } from "../helpers/encription";
import ModifyTaskModal from "../components/ModifyTaskModal";
import Column from "../components/Column";
import { DragDropContext } from "react-beautiful-dnd";

function onDragEnd(result, state, setState) {
  const { destination, source, draggableId } = result;

  // sanity checks
  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  // update state
  const columnA = state.columns[source.droppableId];
  let newTaskIdsA = Array.from(columnA.taskIds);
  newTaskIdsA.splice(source.index, 1);
  const newColumnA = {
    ...columnA,
    taskIds: newTaskIdsA,
  };
  let newState = {
    ...state,
    columns: {
      ...state.columns,
      [newColumnA.id]: newColumnA,
    },
  };

  const columnB = newState.columns[destination.droppableId];
  let newTaskIdsB = Array.from(columnB.taskIds);
  newTaskIdsB.splice(destination.index, 0, draggableId);
  const newColumnB = {
    ...columnB,
    taskIds: newTaskIdsB,
  };

  newState = {
    ...newState,
    columns: {
      ...newState.columns,
      [newColumnB.id]: newColumnB,
    },
  };

  setState(newState);
}

async function getTasks(user: User, query: MonthTasksQuery) {
  let q = {
    username: user.username,
    data: query,
  };
  let req = await fetch("/api/getTasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(await signJSON(q, user.privKey)),
  });
  let res = await req.json();
  let tasks: Task[] = [];
  for (let encTask of res) {
    let task = await decryptJSON(encTask.task, user.privKey);
    task.date = new Date(task.date);
    tasks.push({
      id: task.id,
      ...task,
    });
  }
  return tasks;
}

async function init(user: User, setColumns) {
  const monday = new Date();
  monday.setDate(monday.getDate() - (monday.getDay() || 7) + 1);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  let tasks = await getTasks(user, {
    year: monday.getFullYear(),
    month: monday.getMonth(),
  });

  // handle case where a week is in two months
  if (monday.getMonth() != sunday.getMonth()) {
    let nextTasks = await getTasks(user, {
      year: sunday.getFullYear(),
      month: sunday.getMonth(),
    });
    tasks = tasks.concat(nextTasks);
  }

  let columns: Col[] = [];
  for (let i = 0; i < 7; i++) {
    let day = new Date(monday);
    columns.push({
      date: new Date(day.setDate(day.getDate() + i)),
      tasks: [],
    });
  }
  columns.push({
    date: null,
    tasks: [],
  });

  console.log(tasks);

  tasks.forEach((task) => {
    console.log(monday, task);
    if (monday <= task.date && task.date <= sunday) {
      let t2 = task.date.getTime();
      let t1 = monday.getTime();
      columns[Math.floor((t2 - t1) / (24 * 3600 * 1000))].tasks.push(task);
    }
  });
  console.log(columns);
  setColumns(columns);
}

function DDZone(props: { user: User }) {
  const theme = useMantineTheme();
  const [columns, setColumns] = useState<Col[]>([]);

  let [state, setState] = useState({});

  useEffect(() => {
    let timer = setTimeout(() => {
      init(props.user, setColumns);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <ModifyTaskModal user={props.user} />
      <Button onClick={async () => await init(props.user, setColumns)}>
        Get Tasks
      </Button>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, state, setState)}
      >
        <Group grow>
          {columns.map((c) => {
            if (c.date) {
              return (
                <Column
                  key={c.date.toString()}
                  id={c.date.toDateString("de-CH")}
                  tasks={c.tasks}
                />
              );
            } else {
              return null;
            }
          })}
        </Group>
        <Column
          id={"Anytime"}
          tasks={columns.length == 8 ? columns[7].tasks : []}
        />
      </DragDropContext>
    </div>
  );
}

export default DDZone;
