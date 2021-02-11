import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AuthContext from "../contexts/AuthContext";

// styling
import { useTheme } from '@react-navigation/native';

function RegisterScreen({ navigation }) {
  const { logout } = React.useContext(AuthContext);
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Register</Text>
      <Button
          title="Go to Details... again"
          onPress={() => navigation.goBack()}
        />
    </View>
  );
}

export default RegisterScreen;