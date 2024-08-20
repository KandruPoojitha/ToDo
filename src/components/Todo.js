import React from 'react';
import {database} from '../firebase';
import {ref,remove,update} from 'firebase/database';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

import { motion } from 'framer-motion';
const Todo = ({ todo }) => {
    const deleteTodo = () => {
        const todoRef = ref(database, `TodoList/${todo.id}`);
        remove(todoRef)
        .then(() => {
            console.log('Todo deleted successfully');
        })
        .catch((error) => {
            console.error('Error deleting todo:', error);
        });
    }
    const completeTodo = () => {
        const todoRef = ref(database, `TodoList/${todo.id}`);
        update(todoRef, { complete: !todo.complete  })
        .then(() => {
            console.log('Todo updated successfully');
        })
        .catch((error) => {
            console.error('Error updating todo:', error);
        });
    }

    return (
        <>
            <div
                className='todo'>
                <li
                    className='list'>
                    {
                        todo.complete ?
                            <CheckCircleRoundedIcon
                                className='icon'
                                onClick={completeTodo}
                                fontSize='large'
                            /> :
                            <CheckCircleOutlineRoundedIcon
                                className='icon'
                                onClick={completeTodo}
                                fontSize='large'
                            />
                    }
                    <motion.div>
                        <HighlightOffRoundedIcon
                            className='icon'
                            onClick={deleteTodo}
                            fontSize='large'
                        />
                    </motion.div>
                    <h5 className={todo.complete ? 'complete' : 'pending  '}>{todo.title}</h5>
                </li>
            </div>
        </>
    );
}
export default Todo;