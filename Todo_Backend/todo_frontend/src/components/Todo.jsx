import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/Todos/');
        setTodos(response.data);
    };

    const addTodo = async () => {
        await axios.post('http://127.0.0.1:8000/api/Todos/', newTodo);
        setNewTodo({ title: '', description: '' });
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/Todos/${id}/`);
        fetchTodos();
    };

    // Internal CSS styles
    const styles = {
        container: {
            color: 'black',
            width: '500px',
            margin: '50px 470px 30px',
            padding: '20px',
            backgroundColor: 'aliceblue',
            borderRadius: '10px',
            textAlign: 'center',
            align :'center',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        },

        inputContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '15px',
        },
        input: {
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '20px',
        },
        button: {
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: '0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#088178',
        },
        todoList: {
            listStyleType: 'none',
            padding: 0,
        },
        todoItem: {
            background: 'beige',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            boxShadow: '0px 10px 4px rgba(10, 20, 60, 0.1)',
        },
        deleteButton: {
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '4px 10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: '0.4s',
        },
        deleteButtonHover: {
            backgroundColor: '#c82333',
        }
    };

    return (
        <div style={styles.container}>
            <h1>Todo App</h1>
            <div style={styles.inputContainer}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={newTodo.title} 
                    style={styles.input}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                />
                <input 
                    type="text"
                    placeholder="Description"
                    value={newTodo.description}
                    style={styles.input}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                />
                <button style={styles.button} onClick={addTodo}>Add Todo</button>
            </div>
            <ul style={styles.todoList}>
                {todos.map((todo) => (
                    <li key={todo.id} style={styles.todoItem}>
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <button style={styles.deleteButton} onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
