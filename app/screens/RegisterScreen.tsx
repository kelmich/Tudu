import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AuthContext from "../contexts/AuthContext";

function RegisterScreen({ navigation }) {
  const { logout } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Register</Text>
      <Button
          title="Go to Details... again"
          onPress={logout}
        />
    </View>
  );
}

export default RegisterScreen;