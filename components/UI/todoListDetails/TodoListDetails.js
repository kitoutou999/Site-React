import React, { useEffect, useState, useContext } from 'react';
import { FlatList, Text } from 'react-native-web';

import { TokenContext } from '../../../context/Context';
import getTodos from '../../../API/todos/getTodos';
import TodoListDetailsItem from './TodoListDetailsItem';

export default function TodoListDetail (props) {

    const [error, setError] = useState(null);
    const [token, setToken] = useContext(TokenContext);

    useEffect(() => {
        getTodos(props.id, token)
            .then(todoItems => {
                props.setTodos(todoItems);
                props.setCopyTodos(todoItems);
            })
            .catch(err => {
                setError(err.message);
                console.log(error);
            })
    }, []);

    return (

        <FlatList
            data = {props.todos}
            renderItem = {({item}) => <TodoListDetailsItem
                                        item={item}
                                        navigation={props.navigation}
                                        delete={props.delete}
                                        updateContent={props.updateContent}
                                        updateDone={props.updateDone}
                                        />
                        }
        />

    );

}