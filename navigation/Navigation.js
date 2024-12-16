import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screen/HomeScreen';
import SignOutScreen from '../screen/SignOutScreen';
import SignUpScreen from '../screen/SignUpScreen';
import SignInScreen from '../screen/SignInScreen';
import { TokenContext, UsernameContext } from '../context/Context';
import NavigationTodo from './NavigationTodo';

import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator()

export default function Navigation () {

  const [token, setToken] = useContext(TokenContext);

  return (
    
    <NavigationContainer>
      {token == null ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'SignIn') {
                iconName = focused
                  ? 'enter'
                  : 'enter-outline';
              } else if (route.name === 'SignUp') {
                iconName = focused
                  ? 'add-circle'
                  : 'add-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#3498db',
            tabBarInactiveTintColor: 'gray',
          })}
        
        >
        <Tab.Screen name='SignIn' component={SignInScreen} />
        <Tab.Screen name='SignUp' component={SignUpScreen} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'TodoLists') {
                iconName = focused
                  ? 'layers'
                  : 'layers-outline';
              }else if (route.name === 'SignOut') {
                iconName = focused
                  ? 'log-out'
                  : 'log-out-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#3498db',
            tabBarInactiveTintColor: 'gray',
          })}
        >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='TodoLists' component={NavigationTodo} />
        <Tab.Screen name='SignOut' component={SignOutScreen} />
        </Tab.Navigator>
      )}

    </NavigationContainer>

  )
}