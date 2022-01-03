import TaskTile from "./TaskTile";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "../helpers/types";

function Column(props: { id: string; tasks: Task[] }) {
  return (
    <Droppable
      droppableId={props.id}
      direction={props.id === "null" ? "horizontal" : "vertical"}
    >
      {
        // note: necessary because droppable expects a function & for styling later
        (provided, snapshot) => (
            <h2>{props.id}</h2>
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {props.tasks.map((task, index) => (
                // <TaskTile key={task.id} task={task} index={index} />
                <p key={task.id}>{task.id}</p>
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
