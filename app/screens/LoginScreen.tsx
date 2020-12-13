import React, { useState, createRef, useContext } from "react";

// Elements
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import PasswordInput from "../components/PasswordInput";
import UsernameInput from "../components/UsernameInput";
import RoundButton from "../components/RoundButton";
// import Logo from '../components/Logo';

import AuthContext from "../contexts/AuthContext";

// styling
import { useTheme } from '@react-navigation/native';

function switchKeyboard(
  username,
  password,
  usernameInputRef,
  passwordInputRef,
  login
) {
  if (username == "") {
    usernameInputRef.current.focus();
  } else if (password == "") {
    passwordInputRef.current.focus();
  } else {
    login(username, password);
  }
}

function LoginScreen({ navigation }) {
  // Import login function from app.js
  const { login } = useContext(AuthContext);

  // theme
  const colors = useTheme().colors;

  // State variables
  const usernameInputRef = createRef();
  const passwordInputRef = createRef();
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  return (
    <View style={styles.container}>
      {/* <Logo size={80} /> */}
      <Text style={{ fontSize: 70, fontFamily: "Pacifico_400Regular",  color: colors.text }}>Tudu</Text>
      <UsernameInput
        ref={usernameInputRef}
        onChangeUsername={onChangeUsername}
        onSubmitEditing={() =>
          switchKeyboard(
            username,
            password,
            usernameInputRef,
            passwordInputRef,
            login
          )
        }
        username={username}
      />
      <PasswordInput
        ref={passwordInputRef}
        onChangePassword={onChangePassword}
        onSubmitEditing={() =>
          switchKeyboard(
            username,
            password,
            usernameInputRef,
            passwordInputRef,
            login
          )
        }
        password={password}
      />
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
          color={colors.secondary}
        />
        <RoundButton
          onPress={() => login(username, password)}
          title={"Login"}
          color={colors.primary}
        />
      </View>
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
