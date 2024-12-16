import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemDetails from './ItemDetails';

export default function TodoListDetailsItem(props) {
    const [newContent, setNewContent] = useState("");
    const [edit, setEdit] = useState(false);

    const setContent = (content) => {
        setNewContent(content);
        setEdit(!edit);
    };

    const update = () => {
        props.updateContent(props.item.id, newContent);
        setEdit(false);
        setNewContent("");
    };

    if (edit) {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={setNewContent}
                    onSubmitEditing={update}
                    value={newContent}
                    style={styles.input}
                />
                <TouchableOpacity onPress={update}>
                    <Icon name="check" size={30} color="#3498db" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEdit(false)}>
                    <Icon name="times" size={30} color="#e74c3c" style={styles.icon} />
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <ItemDetails
                item={props.item}
                content={props.item.content}
                delete={() => props.delete(props.item.id)}
                updateContent={() => setContent(props.item.content)}
                updateDone={() => props.updateDone(props.item.id, !props.item.done)}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        marginLeft: '10%',
        marginRight: '10%',
        backgroundColor: '#e5e7e9',
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#3498db',
        minWidth:20
       

    },
    icon: {
        marginLeft: 10,
    },
});
