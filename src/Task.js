import "./Task.css";
import { Draggable } from "react-beautiful-dnd";
import { BsCheckCircle } from "react-icons/bs";
import { useState } from "react";

function Task(props) {
  const [done, setDone] = useState(false);
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            className="Card"
            style={{
              backgroundColor: done ? "#81F495" : "#76877D",
              ...provided.draggableProps.style,
            }}
          >
            <div className="Title">
              <div>{props.task.title}</div>
              <BsCheckCircle
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setDone(!done)}
              />
            </div>
            <div className="Description">{props.task.content}</div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default Task;
