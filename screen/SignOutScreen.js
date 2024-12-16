import { useContext } from 'react';
import { Button, View, StyleSheet } from 'react-native';

import { TokenContext, UsernameContext } from '../context/Context';

export default function SignOutScreen({ navigation, route }) {
    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);

    return (
        <View style={styles.container}>
            <Button 
                title='Sign me out' 
                onPress={() => {
                    setUsername(null);
                    setToken(null);
                }} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
