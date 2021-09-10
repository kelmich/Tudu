import "./Column.css";

import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

function Column(props) {
  return (
    <div
      className={
        "Column" + (props.column.id === "Anytime" ? " Bottom" : " Top")
      }
      style={{ textAlign: props.column.id === "Anytime" ? "left" : "center" }}
    >
      <h2>{props.column.title}</h2>
      <Droppable
        droppableId={props.column.id}
        direction={props.column.id === "Anytime" ? "horizontal" : "vertical"}
      >
        {
          // note: necessary because droppable expects a function & for styling later
          (provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                backgroundColor:
                  snapshot.isDraggingOver &&
                  !props.column.taskIds.includes(snapshot.draggingOverWith)
                    ? "#2d5ec2"
                    : "transparent",
                flexDirection: props.column.id === "Anytime" ? "row" : "column",
              }}
              className="Tasklist"
            >
              {props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </div>
  );
}

export default Column;
