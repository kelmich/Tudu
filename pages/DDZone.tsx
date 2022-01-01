import React, { useEffect, useState } from "react";
import { Button, useMantineTheme } from "@mantine/core";
import { User, Task, EncTask, MonthTasksQuery } from "../helpers/types";
import { encryptJSON, decryptJSON, signJSON } from "../helpers/encription";
import ModifyTaskModal from "../components/ModifyTaskModal";

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
      <ModifyTaskModal user={props.user} />
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
