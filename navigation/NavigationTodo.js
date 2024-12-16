import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TodoListsScreen from '../screen/TodoListsScreen';
import TodoListDetailsScreen from '../screen/TodoListDetailsScreen';

const Stack = createNativeStackNavigator()

export default function NavigationTodo () {

  return (
      <Stack.Navigator initialRouteName='List'>
        <Stack.Screen name='List' component={TodoListsScreen} />
        <Stack.Screen name='Details' component={TodoListDetailsScreen} />
      </Stack.Navigator>
  )

}