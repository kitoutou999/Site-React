import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import Item from './Item';
import { TokenContext } from '../../../context/Context';
import getTodos from '../../../API/todos/getTodos';
import exportCSV from '../../../utils/exportCSV';
import exportJSON from '../../../utils/exportJSON';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TodoListItem(props) {
    const [newTitle, setNewTitle] = useState("");
    const [download, setDownload] = useState(false);
    const [edit, setEdit] = useState(false);
    const [token] = useContext(TokenContext);
    const [error, setError] = useState(null);

    const setTitle = (title) => {
        setNewTitle(title);
        setEdit(!edit);
    };

    const update = () => {
        props.update(props.item.id, newTitle);
        setEdit(false);
        setNewTitle("");
    };

    const csv = () => {
        getTodos(props.item.id, token)
            .then(todos => {
                exportCSV(todos, false);
                setDownload(!download);
            })
            .catch(err => {
                setError(err.message);
                console.log(error);
            });
    };

    const json = () => {
        getTodos(props.item.id, token)
            .then(todos => {
                exportJSON(todos, false);
                setDownload(!download);
            })
            .catch(err => {
                setError(err.message);
                console.log(error);
            });
    };

    const renderEditMode = () => (
        <View style={styles.container}>
            <TextInput
                onChangeText={setNewTitle}
                onSubmitEditing={update} 
                value={newTitle}
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

    const renderDownloadMode = () => (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity onPress={csv}>
                    <Image source={require('../../../assets/csv.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={json}>
                    <Image source={require('../../../assets/json.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setDownload(!download)}>
                <Icon name="times" size={30} color="#e74c3c" style={styles.icon} />
            </TouchableOpacity>
        </View>
    );

    if (edit) {
        return renderEditMode();
    } else if (download) {
        return renderDownloadMode();
    } else {
        return (
            <TouchableOpacity 
                onPress={() => props.navigation.navigate('Details', { id: props.item.id })}
                style={styles.clickContainer}
            >
                <Item 
                    id={props.item.id}
                    title={props.item.title}
                    delete={() => props.delete(props.item.id)}
                    update={() => setTitle(props.item.title)}
                    extract={() => setDownload(!download)}
                />
            </TouchableOpacity>
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
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#3498db',
        minWidth: 20,
    },
    icon: {
        height: 30,
        width: 30,
        marginLeft: 10,
    },
    clickContainer: {
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: 10,
        marginTop: 10,
    },
});
