import React, { useState } from "react";
import { Button, useMantineTheme } from "@mantine/core";
import { User, Task } from "./types";
import { encryptJSON, signJSON } from "./helpers/encription";

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

function DDZone(props: { user: User }) {
  const theme = useMantineTheme();

  return (
    <Button
      onClick={async () =>
        await addTask(props.user, {
          id: "1",
          title: "Hello Task",
          description: "Description",
          date: new Date(),
        })
      }
    >
      Add a basic Task
    </Button>
  );
}

export default DDZone;
