import React, { useState } from "react";
import { useForm } from "@mantine/hooks";
import { FiUser, FiLock, FiCheck } from "react-icons/fi";
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
  useMantineTheme,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import * as openpgp from "openpgp";

function AuthModal(props: { setPrivKey: (arg0: openpgp.PrivateKey) => void }) {
  const [opened, setOpened] = useState(false);
  const [formType, setFormType] = useState<"register" | "login">("register");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(null);

  const toggleFormType = () => {
    setFormType((current) => (current === "register" ? "login" : "register"));
    setError(null);
  };

  const notifications = useNotifications();
  const theme = useMantineTheme();

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
      let req = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          username: form.values.username,
        }),
      });
      let res = await req.json();
      if (req.status != 200) {
        setError(res.error);
      } else {
        try {
          const privateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({
              armoredKey: res.encPrivKey,
            }),
            passphrase: form.values.password,
          });
          props.setPrivKey(privateKey);
          setLoading(false);
          setOpened(false);
          notifications.showNotification({
            title: "Login Successful",
            message: "Nice to see you again!",
            autoClose: 3000,
            color: "green", // theme.colors.green[5],
            icon: <FiCheck />,
          });
        } catch (error) {
          setError("Incorrect Password");
        }
      }
    } else {
      const { privateKey, publicKey, revocationCertificate } =
        await openpgp.generateKey({
          type: "ecc", // Type of the key, defaults to ECC
          curve: "curve25519", // ECC curve name, defaults to curve25519
          userIDs: [{ name: form.values.username }], // you can pass multiple user IDs
          passphrase: form.values.password, // protects the private key
          format: "armored", // output key format, defaults to 'armored' (other options: 'binary' or 'object')
        });

      let req = await fetch("/api/register", {
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
      if (req.status != 200) {
        setError((await req.json()).error);
      } else {
        setLoading(false);
        setOpened(false);
        notifications.showNotification({
          title: "Registration Successful",
          message: "Hey there, welcome to Tudu!",
          autoClose: 3000,
          color: "green", // theme.colors.green[5],
          icon: <FiCheck />,
        });
      }
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
