import React, { useEffect, useState } from "react";
import { Button, useMantineTheme } from "@mantine/core";
import { User, Task, EncTask, MonthTasksQuery } from "../helpers/types";
import { encryptJSON, decryptJSON, signJSON } from "../helpers/encription";

async function addTask(user: User, task: Task) {
  let newTaskEnc = {
    username: user.username,
    year: task.date.getFullYear(),
    month: task.date.getMonth(),
    task: await encryptJSON(task, user.pubKey),
  };
  let req = await fetch("/api/addTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(await signJSON(newTaskEnc, user.privKey)),
  });
}

async function getTasks(user: User, query: MonthTasksQuery) {
  let q = {
    username: user.username,
    data: query,
  };
  let req = await fetch("/api/getTasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(await signJSON(q, user.privKey)),
  });
  let tasks: Task[] = [];
  (await req.json()).forEach(async (encTask) => {
    tasks.push({
      id: encTask.id,
      ...(await decryptJSON(encTask.task, user.privKey)),
    });
  });
  console.log(tasks);
}

function DDZone(props: { user: User }) {
  const theme = useMantineTheme();
  const [tasks, setTasks] = useState<Task[]>(null);

  return (
    <div>
      <Button
        onClick={async () =>
          await addTask(props.user, {
            title: "Hello Task",
            description: "Description",
            date: new Date(),
          })
        }
      >
        Add a basic Task
      </Button>
      <Button
        onClick={async () =>
          await getTasks(props.user, {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
          })
        }
      >
        Get Tasks
      </Button>
    </div>
  );
}

export default DDZone;
