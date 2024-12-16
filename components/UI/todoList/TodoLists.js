import React, { useEffect, useState, useContext } from 'react';
import { FlatList } from 'react-native-web';

import { TokenContext, UsernameContext } from '../../../context/Context';
import getTodoLists from '../../../API/todoLists/getTodoLists';
import TodoListItem from './TodoListItem';

export default function TodoLists (props) {

    const [error, setError] = useState(null);
    const [username] = useContext(UsernameContext);
    const [token] = useContext(TokenContext);

    useEffect(() => {
        getTodoLists(username, token)
        .then(todoLists => {
            props.setTodoLists(todoLists);
        })
        .catch(err => {
            setError(err.message);
            console.log(error);
        })
    }, []);

    return (

        <FlatList
            data = {props.todoLists}
            
            renderItem = {({item}) => 
                <TodoListItem 
                item={item}
                delete={props.delete}
                update={props.update}
                navigation={props.navigation} 
                />
            }
        />

    );

}




