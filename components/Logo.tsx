import React from "react";

// Elements
import { Text } from "react-native";

// styling
import { useTheme } from "@react-navigation/native";

const Logo = (props) => (
  <Text
    style={[{
      fontSize: props.size,
      fontFamily: "Pacifico_400Regular",
      color: "#ffffff",
    }, props.style]}
  >
    Tudu
  </Text>
);

export default Logo;
