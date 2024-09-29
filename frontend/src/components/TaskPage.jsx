import useTasks from '../hooks/useTasks';
import '../styles/taskPage.css';

export const TaskPage = () => {
  const useTasksHook = useTasks();

  return (
    <div className='task-list'>
      <h1>Task List</h1>
      {useTasksHook.isLoading ? (
        <h2>Loading...</h2>
      ) : useTasksHook.tasks.length === 0 ? (
        <h2>Empty tasks</h2>
      ) : (
        <ul>
          {useTasksHook.tasks.map((task) => (
            <li key={task._id}>
              {' '}
              {/* Cambia `task.title` por `task._id` si estás usando IDs únicos */}
              {task.title} - Created by {task.createdBy} at{' '}
              {new Date(task.createdAt).toLocaleString()}. Status:{' '}
              {task.completed ? 'Completed' : 'Not completed'}
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => useTasksHook.createTask('Default task')}>
        Add default task
      </button>
    </div>
  );
};
