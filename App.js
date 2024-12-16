import { useState } from 'react';
import { StyleSheet } from 'react-native';

import Navigation from './navigation/Navigation';
import { TokenContext, UsernameContext } from './context/Context';

export default function App () {

  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  //console.log('token', token);
  //console.log('username', username);

  return (

    <UsernameContext.Provider value={[username, setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
        <Navigation />
      </TokenContext.Provider>
    </UsernameContext.Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
