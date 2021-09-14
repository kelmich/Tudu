var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", title: "Analysis", content: "Serie 1" },
    "task-2": { id: "task-2", title: "Analysis", content: "Serie 2" },
    "task-3": { id: "task-3", title: "Analysis", content: "Serie 3" },
    "task-4": { id: "task-4", title: "Analysis", content: "Serie 4" },
  },
  columns: {
    [weekday[d.getDay()]]: {
      id: weekday[d.getDay()],
      title: weekday[d.getDay()],
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    [weekday[(d.getDay() + 1) % 7]]: {
      id: weekday[(d.getDay() + 1) % 7],
      title: weekday[(d.getDay() + 1) % 7],
      taskIds: [],
    },
    [weekday[(d.getDay() + 2) % 7]]: {
      id: weekday[(d.getDay() + 2) % 7],
      title: weekday[(d.getDay() + 2) % 7],
      taskIds: [],
    },
    [weekday[(d.getDay() + 3) % 7]]: {
      id: weekday[(d.getDay() + 3) % 7],
      title: weekday[(d.getDay() + 3) % 7],
      taskIds: [],
    },
    [weekday[(d.getDay() + 4) % 7]]: {
      id: weekday[(d.getDay() + 4) % 7],
      title: weekday[(d.getDay() + 4) % 7],
      taskIds: [],
    },
    Anytime: {
      id: "Anytime",
      title: "Anytime",
      taskIds: [],
    },
  },
  columnOrder: [
    weekday[d.getDay()],
    weekday[(d.getDay() + 1) % 7],
    weekday[(d.getDay() + 2) % 7],
    weekday[(d.getDay() + 3) % 7],
    weekday[(d.getDay() + 4) % 7],
    "Anytime",
  ],
};

export default initialData;
