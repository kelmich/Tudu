import React, { useState } from "react";
import { useForm } from "@mantine/hooks";
import {
  Modal,
  Button,
  Group,
  TextInput,
  Text,
  LoadingOverlay,
  useMantineTheme,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useNotifications } from "@mantine/notifications";
import { User } from "../helpers/types";
import { encryptJSON, signJSON } from "../helpers/encription";

function ModifyTaskModal(props: { user: User }) {
  const [opened, setOpened] = useState(false);
  const [formType, setFormType] = useState<"create" | "modify">("create");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(null);

  const toggleFormType = () => {
    setFormType((current) => (current === "create" ? "modify" : "create"));
    setError(null);
  };

  const notifications = useNotifications();
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      date: null,
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    let task = form.values;
    let user = props.user;
    if (formType == "create") {
      let newTaskEnc = {
        username: user.username,
        year: task.date != null ? task.date.getFullYear() : null,
        month: task.date != null ? task.date.getMonth() : null,
        task: await encryptJSON(task, user.pubKey),
      };
      let newTaskEncSigned = await signJSON(newTaskEnc, user.privKey);
      await fetch("/api/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(newTaskEncSigned),
      });
    }
    setOpened(false);
    setError(null);
    form.reset();
    setLoading(false);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setError(null);
          form.reset();
        }}
        title={formType == "create" ? "Add Task" : "Update Task"}
      >
        <LoadingOverlay visible={loading} style={{ borderRadius: 5 }} />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoadingOverlay visible={loading} style={{ borderRadius: 5 }} />
          <Group grow>
            <TextInput
              mt="md"
              placeholder="Title"
              label="Title"
              {...form.getInputProps("title")}
            />

            <DatePicker
              placeholder="Pick date"
              label="Event date"
              mt="md"
              {...form.getInputProps("date")}
            />
          </Group>

          <TextInput
            mt="md"
            placeholder="Description"
            label="Description"
            {...form.getInputProps("description")}
          />

          {error && (
            <Text color="red" size="sm" mt="sm">
              {error}
            </Text>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button color="blue" type="submit" mt="xl">
              {formType === "create" ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Add Task</Button>
      </Group>
    </>
  );
}

export default ModifyTaskModal;
