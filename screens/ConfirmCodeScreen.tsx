import React, { useState, useContext } from "react";

// Elements
import { View, StyleSheet, Text, TextInput } from "react-native";
import RoundButton from "../components/RoundButton";
// import Logo from '../components/Logo';

import AuthContext from "../contexts/AuthContext";

// styling
import { useTheme } from "@react-navigation/native";

function ConfirmCodeScreen({ route, navigation }) {
  // Import login function from app.js
  const { confirmRegister } = useContext(AuthContext);

  // theme
  const { colors } = useTheme();

  // State variables
  const [code, onChangeCode] = useState("");
  return (
    <View style={styles.container}>
      {/* <Logo size={80} /> */}
      <Text
        style={{
          fontSize: 70,
          fontFamily: "Pacifico_400Regular",
          color: "#ffffff",
        }}
      >
        Tudu
      </Text>
      <View style={{ backgroundColor: colors.card, borderRadius: 35 }}>
        <TextInput
          style={[styles.input, { color: colors.background }]}
          selectionColor={colors.hintText}
          placeholder={"Enter Confirmation Code"}
          placeholderTextColor={colors.hintText}
          onChangeText={(text) => onChangeCode(text)}
          returnKeyType={"go"}
          value={code}
          keyboardType={"number-pad"}
        />
      </View>
      <RoundButton
        onPress={async () => await confirmRegister(route.params.email, code)}
        title={"Complete"}
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    width: 350,
    padding: 20,
    height: 70,
  },
});

export default ConfirmCodeScreen;
