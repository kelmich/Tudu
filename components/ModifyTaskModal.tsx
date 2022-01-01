import React, { useState } from "react";
import { useForm } from "@mantine/hooks";
import {
  Modal,
  Button,
  Group,
  Title,
  TextInput,
  Text,
  LoadingOverlay,
  Anchor,
  useMantineTheme,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useNotifications } from "@mantine/notifications";
import { User } from "../helpers/types";

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
      date: new Date(),
    },
  });

  const handleSubmit = async () => {
    setError("Not Implemented");
  };

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoadingOverlay visible={loading} style={{ borderRadius: 5 }} />

          <TextInput
            mt="md"
            placeholder="Title"
            label="Title"
            {...form.getInputProps("title")}
          />

          <TextInput
            mt="md"
            placeholder="Description"
            label="Description"
            {...form.getInputProps("description")}
          />

          <DatePicker placeholder="Pick date" label="Event date" required />

          {error && (
            <Text color="red" size="sm" mt="sm">
              {error}
            </Text>
          )}

          <Button color="blue" type="submit">
            {formType === "create" ? "Create" : "Update"}
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Add Task</Button>
      </Group>
    </>
  );
}

export default ModifyTaskModal;
