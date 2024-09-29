import useTasks from '../hooks/useTasks';
import '../styles/taskPage.css';

export const TaskPage = () => {
  const useTasksHook = useTasks();

  return (
    <div className='task-list'>
      <h1>Task List</h1>
      {useTasksHook.isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {useTasksHook.tasks.length === 0 ? (
            <h2>Empty tasks</h2>
          ) : (
            <ul>
              {useTasksHook.tasks.map((task) => (
                <li key={task._id}>
                  {' '}
                  {/* Usar un ID único en lugar de title */}
                  {task.title} - Created by {task.createdBy} at{' '}
                  {new Date(task.createdAt).toLocaleString()}. Status:{' '}
                  {task.completed ? 'Completed' : 'Not completed'}
                  <button onClick={() => useTasksHook.deleteTask(task._id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <button onClick={() => useTasksHook.createTask('Default task')}>
        Add default task
      </button>
    </div>
  );
};
