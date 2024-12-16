import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { TokenContext, UsernameContext } from '../context/Context';
import getAllTodos from '../API/todos/getAllTodos';
import exportCSV from '../utils/exportCSV';
import exportJSON from '../utils/exportJSON';

export default function HomeScreen({ navigation, route }) {
    const [username] = useContext(UsernameContext);
    const [token] = useContext(TokenContext);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");
    const [popupVisible, setPopupVisible] = useState(false);

    const handleExport = (format) => {
        getAllTodos(username, token)
            .then(todos => {
                if (format === 'csv') {
                    exportCSV(todos, true);
                } else {
                    exportJSON(todos, true);
                }
                setSuccess(`${format.toUpperCase()} exporté avec succès !`);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setPopupVisible(false);
            });
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <Text style={styles.welcome}>Welcome, {username}!</Text>
                <Text style={styles.smallTitle}>You are connected.</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.smallTitle}>Download your todoLists :</Text>
                <TouchableOpacity style={styles.button} onPress={() => setPopupVisible(true)}>
                <View style={styles.subsubContainer}>
                    <Icon name="rocket" size={17} style={styles.rocket}/>
                    <Text style={styles.buttonText}>Export</Text>
                </View>
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    visible={popupVisible}
                    animationType="slide"
                    onRequestClose={() => setPopupVisible(false)}
                >
                    <View style={styles.popupContainer}>
                        <View style={styles.popupContent}>
                            <Text style={styles.popupTitle}>Choose the format :</Text>
                            <TouchableOpacity style={styles.optionButton} onPress={() => handleExport('csv')}>
                                <Icon name="download" size={17} style={styles.rocket}/>
                                <Text style={styles.optionText}>CSV</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={() => handleExport('json')}>
                                <Icon name="download" size={17} style={styles.rocket}/>
                                <Text style={styles.optionText}>JSON</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setPopupVisible(false)}>
                                <Text style={styles.optionText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {success ? <Text style={styles.successText}>{success}</Text> : null}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    subContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subsubContainer: {//Logo exporter
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#32a873',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    },
    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    popupContent: {
        width: '95%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center'
    },
    popupTitle: {
        fontSize: 18,
        marginBottom: 20
    },
    optionButton: {
        padding: 10,
        borderRadius: 5,
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#3498db',
        marginVertical: 5,
        width: '60%',
        alignItems: 'center',
        justifyContent:'center'
    },
    cancelButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#d70b0b',
        marginVertical: 5,
        width: '30%',
        alignItems: 'center'
    },
    optionText: {
        color: '#fff',
        fontSize: 16
    }
    ,
    welcome: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    smallTitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
        textAlign: 'center'
    },
    successText: {
        color: 'green',
        marginTop: 10
    },
    errorText: {
        color: 'red',
        marginTop: 10
    },
    rocket: {
        color: '#fff',
        marginRight:4
    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 10
    }
});
