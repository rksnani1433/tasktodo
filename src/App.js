import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";

const App = () => {
  const [todoList, setToDoList] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setToDoList(storedTodos);
    console.log(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  const handleToDoList = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      let count = '';
      for (let each of inputValue) {
        let value = parseInt(each);
        if (!isNaN(value)) {
          count += value;
        }
      }
      if (count === "") {
        count = 0;
      }
      let newTodo = {
        id: uuidv4(),
        name: inputValue.replace(count, ""),
        count: count
      };

      setToDoList([...todoList, newTodo]);
      setInputValue('');
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const deleteToDo = (id) => {
    setToDoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div className="main-container">
      <h1 className='text-center text-light'>Daily Goals!!!</h1>
      <form className='goal-form' onSubmit={handleToDoList}>
        <input value={inputValue} onChange={handleChange} placeholder='Enter here' type="text" className="goal-add" />
        <input value='Add ToDo' type="submit" className="goal-submit" />
      </form>

      <div className='todo-list-container'>
        <div className='todo-list-inner'>
          <ul>
            {todoList.map((todo) => (
              <li className="todo-item" key={todo.id}>
                <p className='todo-name'> {todo.name} <span>(updated {todo.count} Times)</span></p>
                <div className='d-flex'>
                  <p className='edit-icon'><MdOutlineModeEdit /></p>
                  <p onClick={() => deleteToDo(todo.id)} className='delete-icon'><MdDelete /></p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;