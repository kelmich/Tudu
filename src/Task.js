import { Draggable } from "react-beautiful-dnd";

function Task(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {props.task.content}
          </div>
        );
      }}
    </Draggable>
  );
}

export default Task;
