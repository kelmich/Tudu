import React from 'react';

// Elements
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// styling
import { useTheme } from '@react-navigation/native';

function EmailInput(props) {
    const colors = useTheme().colors;
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: props.color }]}
                onPress={props.onPress}
            >
                <View><Text style={[styles.buttonText, { color: colors.background }]}>{props.title}</Text></View>
            </TouchableOpacity>
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
        height: 70,
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