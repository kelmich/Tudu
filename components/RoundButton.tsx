import React from 'react';

// Elements
import { View, Pressable, Text, StyleSheet } from 'react-native';

// styling
import { useTheme } from '@react-navigation/native';

function EmailInput(props) {
    const  { colors } = useTheme();
    return (
        <View style={styles.container}>
            <Pressable
                style={[styles.button, { backgroundColor: props.color }]}
                onPress={props.onPress}
            >
                <View><Text style={[styles.buttonText, { color: colors.text }]}>{props.title}</Text></View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    button: {
        height: 60,
        width: 140,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 18
    },
});

export default EmailInput;