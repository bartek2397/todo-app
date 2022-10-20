import React, { useState, useEffect } from 'react'
import './index.css'
import Form from './components/Form'
import TodoList from './components/TodoList';

function App() {
  let todoLocal = JSON.parse(localStorage.getItem('todos')) || [];

  const saveLocalTodos = () => {
    if (todos.length > 0) { 

      localStorage.setItem('todos',JSON.stringify(todos)) 

    } else {
      localStorage.setItem('todos', JSON.stringify([]))
    };
  }
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      
      setTodos(todoLocal);
    }
  }
  
  useEffect(() => {
    getLocalTodos();
  }, [])
  
  
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState(todoLocal)
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])
  
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }


  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form  status={status} setStatus={setStatus} setInputText={setInputText} inputText={inputText} setTodos={setTodos} todos={todos}/>
      <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;
