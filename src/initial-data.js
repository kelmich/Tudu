const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Analysis Serie 1" },
    "task-2": { id: "task-2", content: "Analysis Serie 2" },
    "task-3": { id: "task-3", content: "Analysis Serie 3" },
    "task-4": { id: "task-4", content: "Analysis Serie 4" },
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
  },
  columnOrder: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
};

export default initialData;
