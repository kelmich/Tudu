import React from 'react';

// Elements
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// styling
import { useTheme } from '@react-navigation/native';

function TooltipButton(props) {
    const colors = useTheme().colors;
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: props.color }]}
                onPress={props.onPress}
            >
                {props.icon}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        height: 70,
        width: 70,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 18
    },
});

export default TooltipButton;