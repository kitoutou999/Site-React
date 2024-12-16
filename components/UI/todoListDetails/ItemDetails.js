import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ItemDetails(props) {
    const [done, setDone] = useState(props.item.done);

    useEffect(() => {
        setDone(props.item.done);
    }, [props.item.done]);

    const handleToggle = (state) => {
        setDone(state);
        props.updateDone();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleToggle(!done)}>
                <Icon 
                    name={done ? "check-square-o" : "square-o"} 
                    size={20} 
                    color="#3498db" 
                />
            </TouchableOpacity>
            <Text style={[styles.textItem, { textDecorationLine: done ? 'line-through' : 'none' }]} numberOfLines={1} ellipsizeMode="tail">
                {props.content}
            </Text>
            <TouchableOpacity onPress={props.delete}>
                <Icon name="trash" size={25} color="#3498db" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.updateContent}>
                <Icon name="pencil" size={25} color="#3498db" style={styles.icon} />
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
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: 10,
        marginTop: 10,
    },
    textItem: {
        flex: 1,
        marginLeft: 10,
        overflow: 'hidden',
    },
    icon: {
        marginLeft: 10, 
    },
});
