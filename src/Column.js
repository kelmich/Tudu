import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

function Column(props) {
  return (
    <div>
      <h2>{props.column.title}</h2>
      <Droppable droppableId={props.column.id}>
        {
          // note: necessary because droppable expects a function & for styling later
          (provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
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
