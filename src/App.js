import { useState } from "react";

import "./App.css";
import initialData from "./initial-data";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

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

function App() {
  let [state, setState] = useState(initialData);
  return (
    <div className="App">
      <div className="DragDrop">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, state, setState)}
        >
          <div className="DragDrop-Top">
            {state.columnOrder.map((columnId) => {
              const column = state.columns[columnId];
              const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
              if (columnId !== "Anytime") {
                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    state={state}
                    setState={setState}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
          <div className="DragDrop-Bottom">
            <Column
              key={"Anytime"}
              column={state.columns["Anytime"]}
              tasks={state.columns["Anytime"].taskIds.map(
                (taskId) => state.tasks[taskId]
              )}
              state={state}
              setState={setState}
            />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
