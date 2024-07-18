// TaskList.js
import React, { useContext, useEffect } from 'react';
import TaskContext from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Task.css'; // Import CSS file for styling

const TaskList = () => {
  const navigate = useNavigate();
  const { tasks, fetchTasks, deleteTask } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
  };

  const handleCreateTask = () => {
    navigate('/tasks/create'); // Navigate to create task page
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find(task => task._id === taskId);
    if (taskToEdit) {
      navigate(`/tasks/edit/${taskId}`, { state: { id: taskToEdit._id, title: taskToEdit.title, description: taskToEdit.description } });
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Task List</h2>
        <button className="create-task-btn" onClick={handleCreateTask}>Create Task</button>
      </div>
      {tasks.map((task) => (
        <div className="task" key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: <span className="task-status">{task.status}</span></p>
          <div className="task-actions">
            <button onClick={() => handleDelete(task._id)}>Delete</button>
            <button className="edit-btn" onClick={() => handleEdit(task._id)}>Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
