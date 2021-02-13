import React from 'react';

// Elements
import { View, TextInput, StyleSheet } from 'react-native';

// styling
import { useTheme } from '@react-navigation/native';

interface propType {
    onChangeUsername: Function;
    username: string;
}


const UsernameInput = React.forwardRef((props: propType) => {
    const colors = useTheme().colors;
    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            <TextInput
                style={[styles.input, { color: colors.background }]}
                selectionColor={colors.hintText}
                placeholder={"Username"}
                textAlign={"left"}
                placeholderTextColor={colors.hintText}
                onChangeText={text => props.onChangeUsername(text)}
                returnKeyType={"go"}
                value={props.username}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 35,
        width: 350,
        height: 70,
        margin: 5,
        paddingLeft: 10
    },
    input: {
        fontSize: 18,
        width: 350,
        padding: 20,
        height: 70,
        outline: "none",
    }
});

export default UsernameInput;