import React from 'react';

// Elements
import { View, TextInput, StyleSheet } from 'react-native';

// styling
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';


const PasswordInput = React.forwardRef((props, reference) => {
    const colors = useTheme().colors;
    const [passwordVisible, onTapEye] = React.useState(false);
    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            <TextInput
                ref={reference}
                style={[styles.input, { color: colors.inputText }]}
                selectionColor={colors.hintText}
                secureTextEntry={!passwordVisible}
                placeholder={"Password"}
                textAlign={"left"}
                placeholderTextColor={colors.hintText}
                onChangeText={text => props.onChangePassword(text)}
                onSubmitEditing={() => props.onSubmitEditing()}
                returnKeyType={"go"}
                value={props.password}
            />
            <View style={styles.eyeBox}>
                <Feather onPress={() => onTapEye(!passwordVisible)} name={passwordVisible ? "eye" : "eye-off"} size={25} color={colors.text} />
            </View>
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
        width: 260,
        paddingLeft: 20
    },
    eyeBox: {
        width: 70,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default PasswordInput;