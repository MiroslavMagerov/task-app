import { useState } from 'react';
import useTasks from '../hooks/useTasks';
import '../styles/taskPage.css';
import { TaskItem } from './TaskItem';

export const TaskPage = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const useTasksHook = useTasks();

  return (
    <div className='task-container'>
      <h1>Tasks</h1>
      {useTasksHook.isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div className='task-headers'>
            <span>Title</span>
            <span>Created By</span>
            <span>Status</span>
            <span>Created At</span>
            <span>Actions</span>
          </div>
          <ul className='task-list'>
            {useTasksHook.tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                deleteTask={useTasksHook.deleteTask}
              />
            ))}
          </ul>
        </>
      )}

      <div className='create-task-div'>
        <input
          type='text'
          value={newTaskTitle}
          placeholder='Enter the title of the new task'
          onChange={(e) => setNewTaskTitle(e.target.value)}
        ></input>
        <button
          onClick={() => (
            useTasksHook.createTask(newTaskTitle), setNewTaskTitle('')
          )}
        >
          Add task
        </button>
      </div>
    </div>
  );
};
