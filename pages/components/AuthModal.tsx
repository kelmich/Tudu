import React, { useState } from "react";
import { useForm } from "@mantine/hooks";
import { FiUser, FiLock } from "react-icons/fi";
import {
  Modal,
  Button,
  Group,
  Title,
  TextInput,
  PasswordInput,
  Text,
  LoadingOverlay,
  Anchor,
} from "@mantine/core";
import * as openpgp from "openpgp";

function AuthModal() {
  const [opened, setOpened] = useState(false);
  const [formType, setFormType] = useState<"register" | "login">("register");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(null);

  const toggleFormType = () => {
    setFormType((current) => (current === "register" ? "login" : "register"));
    setError(null);
  };

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validationRules: {
      username: (value) => formType === "login" || value.trim().length >= 2,
      password: (value) => value.length >= 15,
    },

    errorMessages: {
      password: "Your password is too short",
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    if (formType === "login") {
      setError("Not supported yet");
    } else {
      const { privateKey, publicKey, revocationCertificate } =
        await openpgp.generateKey({
          type: "ecc", // Type of the key, defaults to ECC
          curve: "curve25519", // ECC curve name, defaults to curve25519
          userIDs: [{ name: form.values.username }], // you can pass multiple user IDs
          passphrase: form.values.password, // protects the private key
          format: "armored", // output key format, defaults to 'armored' (other options: 'binary' or 'object')
        });

      await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          username: form.values.username,
          pubKey: publicKey,
          encPrivKey: privateKey,
        }),
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title style={{ fontFamily: "Pacifico", height: 60 }}>Tudu</Title>
        </div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoadingOverlay visible={loading} style={{ borderRadius: 5 }} />

          <TextInput
            mt="md"
            required
            placeholder="Username"
            label="Username"
            icon={<FiUser />}
            {...form.getInputProps("username")}
          />

          <PasswordInput
            mt="md"
            required
            placeholder="Password"
            label="Password"
            icon={<FiLock />}
            {...form.getInputProps("password")}
          />

          {error && (
            <Text color="red" size="sm" mt="sm">
              {error}
            </Text>
          )}

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="gray"
              onClick={toggleFormType}
              size="sm"
            >
              {formType === "register"
                ? "Have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>

            <Button color="blue" type="submit">
              {formType === "register" ? "Register" : "Login"}
            </Button>
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Register</Button>
      </Group>
    </>
  );
}

export default AuthModal;
