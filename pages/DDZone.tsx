import React, { useState } from "react";
import { Text, useMantineTheme } from "@mantine/core";
import * as openpgp from "openpgp";

function DDZone(props: { privKey: openpgp.PrivateKey }) {
  const theme = useMantineTheme();

  return <Text>Logged In</Text>;
}

export default DDZone;
