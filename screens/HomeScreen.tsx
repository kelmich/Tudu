import React from 'react';
import { Text, View, Platform } from 'react-native';
import RoundButton from "../components/RoundButton";
import Logo from '../components/Logo';
import { useTheme } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.1, flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: Platform.OS == "ios" ? 20 : 0 }}>
        <View style={{ flex: 0.2 }}></View>
        <View style={{ flex: 0.6, alignItems: "center" }}>
          <Logo size={40} />
        </View>
        <View style={{ flex: 0.2, alignItems: "flex-end", justifyContent: "center" }}>
          <RoundButton
            icon="user"
            color="transparent"
            onPress={() => navigation.push("UserScreen")}
            style={{ padding: 20 }}
          />
        </View>
      </View>
      <View style={{ flex: 0.7, alignItems: "center", justifyContent: "center" }}>
        <Text>List of Tasks/ Events</Text>
      </View>
      <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
        <Text>Unassigned Tasks</Text>
        <RoundButton
          icon="plus"
          color={colors.primary}
          style={{ position: "absolute", bottom: 0, right: 0, padding: 20 }}
          onPress={() => navigation.push("NewTaskScreen")}
        />
      </View>
    </View>
  );
}

export default HomeScreen;