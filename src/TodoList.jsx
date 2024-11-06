import React, { useState } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Low');
  const [editingTask, setEditingTask] = useState(null);
  const [editedText, setEditedText] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, isCompleted: false, priority }]);
      setNewTask('');
      setPriority('Low');  // Reset priority to Low after adding task
    }
  };

  const removeTask = (id) => {
    // Only remove tasks that aren't high priority
    setTasks(tasks.filter(task => task.id !== id || task.priority === 'High'));
  };

  const editTask = (id, text) => {
    setEditingTask(id);
    setEditedText(text);
  };

  const saveEditedTask = () => {
    setTasks(tasks.map(task =>
      task.id === editingTask ? { ...task, text: editedText } : task
    ));
    setEditingTask(null);
    setEditedText('');
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  // Sort tasks to make high-priority tasks appear first
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.priority === 'High' && b.priority !== 'High') return -1;
    if (b.priority === 'High' && a.priority !== 'High') return 1;
    return 0;
  });

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
        className="task-input"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="priority-select">
        <option value="High">High Priority</option>
        <option value="Low">Low Priority</option>
      </select>
      <button onClick={addTask} className="add-task-btn">Add Task</button>

      <ul className="task-list">
        {sortedTasks.map((task) => (
          <li key={task.id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
            {editingTask === task.id ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="task-input"
                />
                <button onClick={saveEditedTask} className="save-btn">Save</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleCompletion(task.id)}>{task.text}</span>
                <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                <button onClick={() => editTask(task.id, task.text)} className="edit-btn">Edit</button>
                {task.priority !== 'High' && (
                  <button onClick={() => removeTask(task.id)} className="remove-task-btn">Remove</button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
