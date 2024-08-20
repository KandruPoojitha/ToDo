import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ref, onValue, remove, update } from 'firebase/database';
import { database } from '../firebase';
import Todo from './Todo';
import { Button } from '@mui/material';

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        const todoRef = ref(database, 'TodoList');
        onValue(todoRef, (snapshot) => {
            const todos = snapshot.val();
            const todoList = [];
            if (todos) {
                for (let id in todos) {
                    todoList.push({ id, ...todos[id] });
                }
            }
            setTodoList(todoList);
        });
    }, []);

    const deleteTodo = (id) => {
        const todoRef = ref(database, `TodoList/${id}`);
        remove(todoRef)
            .then(() => {
                console.log('Todo deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting todo:', error);
            });
    };

    const completeTodo = (id, isComplete) => {
        const todoRef = ref(database, `TodoList/${id}`);
        update(todoRef, { complete: isComplete })
            .then(() => {
                console.log('Todo updated successfully');
            })
            .catch((error) => {
                console.error('Error updating todo:', error);
            });
    };

    const clearCompletedTodos = () => {
        todoList.forEach(todo => {
            if (todo.complete) {
                const todoRef = ref(database, `TodoList/${todo.id}`);
                remove(todoRef)
                    .then(() => {
                        console.log('Completed todo removed successfully');
                    })
                    .catch((error) => {
                        console.error('Error removing completed todo:', error);
                    });
            }
        });
    };

    const renderTodos = () => {
        const todoElements = [];
        for (let i = 0; i < todoList.length; i++) {
            todoElements.push(
                <Todo
                    todo={todoList[i]}
                    key={i}
                    deleteTodo={deleteTodo}
                    completeTodo={completeTodo}
                />
            );
        }
        return todoElements;
    };

    return (
        <>
            <h2>TodoList</h2>
            <motion.div layout>
                {todoList.length > 0 ? (
                    renderTodos()
                ) : (
                    <p>No todos available</p>
                )}
            </motion.div>
            <Button
                variant="contained"
                color="secondary"
                onClick={clearCompletedTodos}
                className="clear-button"
            >
                Clear All
            </Button>
        </>
    );
};

export default TodoList;
