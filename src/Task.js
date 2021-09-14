import "./Task.css";
import { Draggable } from "react-beautiful-dnd";
import { BsCheckCircle } from "react-icons/bs";

function Task(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="Card"
            style={{
              backgroundColor: props.task.done ? "#81F495" : "#76877D",
              ...provided.draggableProps.style,
            }}
          >
            <div className="Title">
              <div>{props.task.title}</div>
              <BsCheckCircle
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  props.setState({
                    ...props.state,
                    tasks: {
                      ...props.state.tasks,
                      [props.task.id]: {
                        ...props.task,
                        done: !props.task.done,
                      },
                    },
                  });
                }}
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
