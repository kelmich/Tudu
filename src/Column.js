import "./Column.css";

import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

function Column(props) {
  return (
    <div className="Column">
      <h2>{props.column.title}</h2>
      <Droppable droppableId={props.column.id}>
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
                    ? "#ffffff"
                    : null,
              }}
              className={
                "Tasklist" +
                (props.column.id === "Anytime" ? " Anytime" : " Date")
              }
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
          )
        }
      </Droppable>
    </div>
  );
}

export default Column;
