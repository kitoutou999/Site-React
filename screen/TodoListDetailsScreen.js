import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { TokenContext } from '../context/Context';
import TodoListDetail from '../components/UI/todoListDetails/TodoListDetails';
import Input from '../components/UI/Input';
import ButtonCheck from '../components/UI/button/ButtonCheck';
import ButtonTick from '../components/UI/button/ButtonTick';
import createTodo from '../API/todos/createTodo';
import deleteTodo from '../API/todos/deleteTodo';
import updateContentTodo from '../API/todos/updateContentTodo';
import updateDoneTodo from '../API/todos/updateDoneTodo';
import updateAllTodos from '../API/todos/updateAllTodos';

export default function TodoListDetailsScreen({ navigation, route }) {
    const [token, setToken] = useContext(TokenContext);
    const [todos, setTodos] = useState([]);
    const [copyTodos, setCopyTodos] = useState([]);
    const [error, setError] = useState(null);
    const [buttonAll, setButtonAll] = useState(false);
    const [buttonNone, setButtonNone] = useState(true);
    const [buttonDone, setButtonDone] = useState(true);
    // nombre de tâches terminées.
    const value = copyTodos.filter(item => item.done === true).length;
    // nombre total de tâches.
    const maximum = copyTodos.length;

    const checkDone = () => {
        const newTodos = copyTodos.filter(item => item.done === true);
        setTodos(newTodos);
        setButtonDone(false);
        setButtonNone(true);
        setButtonAll(true);
    };

    const checkNone = () => {
        const newTodos = copyTodos.filter(item => item.done === false);
        setTodos(newTodos);
        setButtonNone(false);
        setButtonAll(true);
        setButtonDone(true);
    };

    const checkAll = () => {
        setTodos(copyTodos);
        setButtonAll(false);
        setButtonDone(true);
        setButtonNone(true);
    };

    const tick = (done) => {
        updateAllTodos(route.params.id , done, token)
        .then(todos => {
            if (todos.length !== 0) {
                ((done && !buttonNone) || (!done && !buttonDone)) ? setTodos([]) : setTodos(copyTodos.map(item => ({id: item.id, content: item.content, done: done})));
                setCopyTodos(copyTodos.map(item => ({id: item.id, content: item.content, done: done})));
            }
        })
        .catch(err => {
            setError(err.message);
            console.log(error);
        });
    }

    const updateContent = (todoId, newContent) => {
        if (newContent.trim() !== "") {
            updateContentTodo(todoId, newContent, token)
                .then(todo => {
                    setTodos(todos.map(item => item.id === todo.id ? {id: item.id, content: todo.content, done: item.done} : item));
                    setCopyTodos(copyTodos.map(item => item.id === todo.id ? {id: item.id, content: todo.content, done: item.done} : item));
                })
                .catch(err => {
                    setError(err.message);
                    console.log(error);
                })
        }
    };

    const updateDone = (todoId, done) => {
        updateDoneTodo(todoId, done, token)
            .then(todo => {
                if (!buttonAll) {
                    setTodos(todos.map(item => item.id === todo.id ? {id: item.id, content: item.content, done: todo.done} : item));
                } else {
                    const newTodos = todos.filter(item => item.id !== todo.id);
                    setTodos(newTodos);
                }
                setCopyTodos(copyTodos.map(item => item.id === todo.id ? {id: item.id, content: item.content, done: todo.done} : item));
            })
            .catch(err => {
                setError(err.message);
                console.log(error);
            });
    };

    const remove = (id) => {
        deleteTodo(id, token)
            .then(() => {
                const newTodos = todos.filter(item => item.id !== id);
                const newCopyTodos = copyTodos.filter(item => item.id !== id);
                setTodos(newTodos);
                setCopyTodos(newCopyTodos);
            })
            .catch(err => {
                setError(err.message);
                console.log(error);
            });
    };

    const create = (content) => {
        if (content.trim() !== "") {
            createTodo(content, route.params.id, token)
                .then(todo => {
                    (!buttonAll || !buttonNone) ? setTodos([...todos, todo]) : null;
                    setCopyTodos([...copyTodos, todo]);
                })
                .catch(err => {
                    setError(err.message);
                    console.log(error);
                });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonList}>
                <ButtonCheck name={"Done"} state={buttonDone} check={checkDone} />
                <ButtonCheck name={"None"} state={buttonNone} check={checkNone} />
                <ButtonCheck name={"All"} state={buttonAll} check={checkAll} />
            </View>
            <View style={styles.buttonList}>
                <ButtonTick name={"Tick-All"} tick={() => tick(true)} />
                <ButtonTick name={"Tick-None"} tick={() => tick(false)} />
            </View>
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${(value / maximum) * 100}%` }]} />
                </View>
                <Text style={styles.progressText}>{value}/{maximum}</Text>
            </View>
            <Input name={"Add a new Todo"} create={create} />
            <TodoListDetail 
                id={route.params.id}
                todos={todos}
                setTodos={setTodos}
                setCopyTodos={setCopyTodos}
                delete={remove}
                updateContent={updateContent}
                updateDone={updateDone}
                navigation={navigation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    buttonList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 10
    },
    progressContainer: {
        alignItems: 'center',
        marginVertical: 10
    },
    progressBar: {
        width: '80%',
        height: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 5
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#3498db',
        borderRadius: 2
    },
    progressText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});
