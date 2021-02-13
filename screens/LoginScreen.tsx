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


function LoginScreen({ navigation }) {
  // Import login function from app.js
  const { login, loginWithGoogle } = useContext(AuthContext);

  // theme
  const { colors } = useTheme();

  // State variables
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  return (
    <View style={styles.container}>
      {/* <Logo size={80} /> */}
      <Text style={{ fontSize: 70, fontFamily: "Pacifico_400Regular",  color: "#ffffff" }}>Tudu</Text>
      <UsernameInput
        onChangeUsername={onChangeUsername}
        username={username}
      />
      <PasswordInput
        onChangePassword={onChangePassword}
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
          color={colors.primary}
        />
        <RoundButton
          onPress={() => login(username, password)}
          title={"Login"}
          color={colors.primary}
        />
        {/* <button onClick={() => loginWithGoogle()}>Open Google</button> */}
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
