const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Analysis",
      content: "Serie 1",
      done: false,
    },
    "task-2": {
      id: "task-2",
      title: "Analysis",
      content: "Serie 2",
      done: true,
    },
    "task-3": {
      id: "task-3",
      title: "Analysis",
      content: "Serie 3",
      done: false,
    },
    "task-4": {
      id: "task-4",
      title: "Analysis",
      content: "Serie 4",
      done: false,
    },
  },
  columns: {
    Monday: {
      id: "Monday",
      title: "Monday",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    Tuesday: {
      id: "Tuesday",
      title: "Tuesday",
      taskIds: [],
    },
    Wednesday: {
      id: "Wednesday",
      title: "Wednesday",
      taskIds: [],
    },
    Thursday: {
      id: "Thursday",
      title: "Thursday",
      taskIds: [],
    },
    Friday: {
      id: "Friday",
      title: "Friday",
      taskIds: [],
    },
    Saturday: {
      id: "Saturday",
      title: "Saturday",
      taskIds: [],
    },
    Sunday: {
      id: "Sunday",
      title: "Sunday",
      taskIds: [],
    },
    Anytime: {
      id: "Anytime",
      title: "Anytime",
      taskIds: [],
    },
  },
  columnOrder: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Anytime",
  ],
};

export default initialData;
