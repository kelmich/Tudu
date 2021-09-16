import "./Column.css";

import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

function Column(props) {
  return (
    <Droppable
      droppableId={props.column.id}
      direction={props.column.id === "Anytime" ? "horizontal" : "vertical"}
    >
      {
        // note: necessary because droppable expects a function & for styling later
        (provided, snapshot) => (
          <div
            className={
              "Column " + (props.column.id === "Anytime" ? "Bottom" : "Top")
            }
            style={{
              borderColor:
                snapshot.isDraggingOver &&
                !props.column.taskIds.includes(snapshot.draggingOverWith)
                  ? "#ffffff"
                  : "transparent",
            }}
          >
            <h2>{props.column.title}</h2>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                flexDirection: props.column.id === "Anytime" ? "row" : "column",
                paddingLeft:
                  props.column.id !== "Anytime"
                    ? "calc(((100vw / 8) - (100vw / 10) - 2vh) / 2)"
                    : 0,
              }}
              className="Tasklist"
            >
              {props.tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  state={props.state}
                  setState={props.setState}
                />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )
      }
    </Droppable>
  );
}

export default Column;
