import React from 'react';
import { Text, View } from 'react-native';
import AuthContext from "../contexts/AuthContext";
import RoundButton from "../components/RoundButton";
import { useTheme } from '@react-navigation/native';

function UserScreen({ navigation }) {
  const { logout } = React.useContext(AuthContext);
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>User Screen</Text>
      <RoundButton
        onPress={async () => await logout()}
        title={"Logout"}
        color={colors.primary}
      />
    </View>
  );
}

export default UserScreen;