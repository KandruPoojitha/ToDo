import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { TextField } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { database } from '../firebase';

const Form = () => {
    const [title, setTitle] = useState('');

    const handleOnChange = (e) => {
        setTitle(e.target.value);
    };

    const createTodo = () => {
        if (title.trim() === '') return; // Prevent empty todos
        const todoRef = ref(database, 'TodoList');
        const todo = {
            title,
            complete: false,
        };
        console.log('Pushing todo:', todo); // Debug output
        push(todoRef, todo)
            .then(() => {
                setTitle('');
                console.log('Todo added successfully'); // Debug output
            })
            .catch((error) => {
                console.error('Error adding todo:', error);
            });
    };

    return (
        <div className='form'>
            <TextField
                variant='standard'
                label='Add Todo'
                type='text'
                value={title}
                onChange={handleOnChange}
                className='textfield'
                size='medium'
            />
            <div className='add'>
                {title === '' ? (
                    <AddCircleOutlineOutlinedIcon fontSize='large' className='icon' />
                ) : (
                    <AddCircleRoundedIcon
                        onClick={createTodo}
                        fontSize='large'
                        className='icon'
                    />
                )}
            </div>
        </div>
    );
};

export default Form;
