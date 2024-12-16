import React, { useState, useContext } from 'react';
import { View, Button, TextInput, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import signUp from '../API/auth/signUp';
import { TokenContext, UsernameContext } from '../context/Context';

export default function SignUpScreen({ navigation, route }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [displayError, setDisplayError] = useState(false);
    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);

    const onSignUp = () => {
        signUp(login, password)
            .then(token => {
                setToken(token);
                setUsername(login);
                setDisplayError(false);
            })
            .catch(err => {
                setError(err.message);
                console.log(error);
                setDisplayError(true);
            });
    };

    return (
        <View style={styles.container1}>
            <Text style={styles.mainText}>Inscription</Text>

            <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#999" style={styles.icon} />
                <TextInput 
                    style={styles.container2}
                    placeholder="Username"
                    onChangeText={setLogin}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#999" style={styles.icon} />
                <TextInput
                    style={styles.container2}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
            </View>

            <Text
                style={{ display: (displayError ? 'flex' : 'none'), color: 'red', fontSize: 12, marginBottom: 10 }}
            >
                Account not available
            </Text>
            <Button onPress={onSignUp} title="Sign-Up" />
        </View>
    );
}

const styles = StyleSheet.create({
    container1: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    container2: {
        paddingLeft: '20%',
        width: '100%',
        height: '100%'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        height: 40,
        position: 'relative'
    },
    icon: {
        position: 'absolute',
        left: 10
    },
    mainText: {
        margin: 20,
        marginBottom: 55,
        fontSize: 50,
        textAlign: 'center'
    }
});
