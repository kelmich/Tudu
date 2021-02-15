import React from 'react';

// Elements
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

// styling
import { useTheme } from '@react-navigation/native';

function RoundButton(props) {
    const  { colors } = useTheme();
    return (
        <View style={[props.style, styles.container]}>
            <TouchableHighlight
                style={[styles.button, { backgroundColor: props.color, width: props.icon ? 60 : 140 }]}
                onPress={props.onPress}
            >
                <View style={{ flexDirection: "row" }}>
                    {props.icon ? props.ionicons ? <Ionicons name={props.icon} size={25} color={colors.text} /> : <Feather name={props.icon} size={25} color={colors.text} /> : <></>}
                    <Text style={[styles.buttonText, { color: colors.text }]}>{props.title}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
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

export default RoundButton;