import React, { useState, useContext, createRef } from "react";

// Elements
import { View, StyleSheet, Text } from "react-native";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import RoundButton from "../components/RoundButton";
// import Logo from '../components/Logo';

import AuthContext from "../contexts/AuthContext";

// styling
import { useTheme } from "@react-navigation/native";


import Amplify, { Auth, Hub } from "aws-amplify";

function LoginScreen({ navigation }) {
  // Import login function from app.js
  const { login, loginWithGoogle } = useContext(AuthContext);

  // theme
  const { colors } = useTheme();

  // State variables
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
      <View
        style={{
          width: 350,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <RoundButton
          onPress={() => navigation.push("Register")}
          title={"Register"}
          color={colors.primary}
        />
        <RoundButton
          onPress={() => login(email, password)}
          title={"Login"}
          color={colors.primary}
        />
      </View>
      <Text style={{ color: colors.text, paddingTop: 20 }}>Or Login With</Text>
      <RoundButton
          onPress={() => loginWithGoogle()}
          icon={"logo-google"}
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

export default LoginScreen;
