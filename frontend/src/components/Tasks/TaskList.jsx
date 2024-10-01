import { useState } from 'react';
import useTasks from '../../hooks/useTasks';
import { TaskItem } from './TaskItem';

export const TaskList = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const useTasksHook = useTasks();

  return (
    <>
      <ul className='task-list'>
        {useTasksHook.tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            deleteTask={useTasksHook.deleteTask}
          />
        ))}
      </ul>

      <div className='create-task-div'>
        <input
          type='text'
          value={newTaskTitle}
          placeholder='Enter the title of the new task'
          onChange={(e) => setNewTaskTitle(e.target.value)}
        ></input>
        <button
          className='add-task-button'
          onClick={() => (
            useTasksHook.createTask(newTaskTitle), setNewTaskTitle('')
          )}
        >
          Add task
        </button>
      </div>
    </>
  );
};
