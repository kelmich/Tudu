import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AuthContext from "../contexts/AuthContext";

function HomeScreen({ navigation }) {
  const { logout } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
          title="Go to Details... again"
          onPress={logout}
        />
    </View>
  );
}

export default HomeScreen;