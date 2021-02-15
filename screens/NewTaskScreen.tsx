import React from 'react';
import { Text, View } from 'react-native';
import RoundButton from "../components/RoundButton";
import { useTheme } from '@react-navigation/native';

function NewTaskScreen({ navigation }) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>New Tasks Screen</Text>
      <RoundButton 
        title="Add Task"
        color={colors.primary}
        style={{ position: "absolute", right: 20, bottom: 20 }}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

export default NewTaskScreen;