import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Input(props) {

    const [text, setText] = useState("");

    return (
        <View style={styles.container}>
            <TextInput
                style = {styles.input}
                onChangeText = {setText}
                placeholder = {props.name}
                placeholderTextColor = "#999" 
                value = {text}
            />
            <TouchableOpacity
                onPress={() => { props.create(text); setText(""); }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: 10,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#3498db",
        padding: 10,
        height: 49,
        width:"10%",
        flex: 1,
        marginRight: 3,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        paddingLeft:20
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 8,
        paddingHorizontal: 17,
        borderRadius: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 25,
    },
});
