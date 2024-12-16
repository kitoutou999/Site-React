import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Item(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <TouchableOpacity onPress={props.delete}>
                <Icon name="trash" size={22} color="#3498db" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.update}>
                <Icon name="pencil" size={22} color="#3498db" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.extract}>
                <Icon name="download" size={22} color="#3498db" style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#3498db",
    },
    title: {
        flex: 1,
        marginLeft: 10,
    },
    icon: {
        marginRight: 5, 
    }
});
