import React from "react";
import Head from "next/head";
import {
  ColorSchemeProvider,
  MantineProvider,
  useMantineTheme,
  ColorScheme,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import AuthModal from "./components/AuthModal";
import "../public/reset.css";

function App() {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const theme = useMantineTheme();

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }}>
        <NotificationsProvider>
          <Head>
            <title>Tudu</title>
            <link rel="icon" href="/favicon.png" />
          </Head>

          <main
            style={{
              backgroundColor:
                colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[2],
              width: "100%",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AuthModal />
          </main>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
