import React, { useState, useContext } from "react";

// Elements
import { View, StyleSheet, Text } from "react-native";
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import RoundButton from "../components/RoundButton";
// import Logo from '../components/Logo';

import AuthContext from "../contexts/AuthContext";

// styling
import { useTheme } from "@react-navigation/native";

function RegisterScreen({ navigation }) {
  // Import login function from app.js
  const { register } = useContext(AuthContext);

  // theme
  const { colors } = useTheme();

  // State variables
  const [username, onChangeUsername] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
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
      <EmailInput onChangeEmail={onChangeEmail} email={email} />
      <PasswordInput onChangePassword={onChangePassword} password={password} />
      <RoundButton
        onPress={async () => {
          await register(email, password);
          navigation.push("ConfirmCodeScreen", {
            email: email
          });
        }}
        title={"Continue"}
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
});

export default RegisterScreen;
