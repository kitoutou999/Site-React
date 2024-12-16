import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { TokenContext, UsernameContext } from '../context/Context';
import TodoLists from '../components/UI/todoList/TodoLists';
import Input from '../components/UI/Input';
import deleteTodoList from '../API/todoLists/deleteTodoList';
import updateTodoList from '../API/todoLists/updateTodoList';
import createTodoList from '../API/todoLists/createTodoList';

export default function TodoListScreen({ navigation }) {
    const [username] = useContext(UsernameContext);
    const [token] = useContext(TokenContext);
    const [error, setError] = useState(null);
    const [todoLists, setTodoLists] = useState([]);

    const update = (todoListId, newTitle) => {
        if (newTitle.trim() !== "") {
            updateTodoList(todoListId, newTitle, token)
                .then(todoList => {
                    setTodoLists(todoLists.map(item => {
                        return item.id === todoList.id ? { id: item.id, title: todoList.title } : item;
                    }));
                })
                .catch(err => {
                    setError(err.message);
                    console.log(error);
                });
        }
    };

    const remove = (id) => {
        deleteTodoList(id, token)
            .then(() => {
                const newTodoLists = todoLists.filter(item => item.id !== id);
                setTodoLists(newTodoLists);
            })
            .catch(err => {
                setError(err.message);
                console.log(error);
            });
    };

    const create = (title) => {
        if (title.trim() !== "") {
            createTodoList(username, title, token)
                .then(todoList => {
                    setTodoLists([...todoLists, todoList]);
                })
                .catch(err => {
                    setError(err.message);
                    console.log(error);
                });
        }
    };

    return (
        <View style={styles.container}>
            <Input name = {"Add a new TodoList"} create = {create} />
            <TodoLists
                todoLists={todoLists}
                setTodoLists={setTodoLists}
                delete={remove}
                update={update}
                navigation={navigation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 10
    }
});
