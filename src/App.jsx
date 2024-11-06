import React from 'react';
import './App.css';
import TodoList from './TodoList';

function App() {
  return (
    <div className="app-container">
      <h1 className="header">Todo List App</h1>
      <TodoList />
    </div>
  );
}

export default App;
