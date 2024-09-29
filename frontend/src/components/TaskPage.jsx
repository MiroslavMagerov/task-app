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
        useTasksHook.tasks.map((task) => (
          <li key={task.title}>
            {task.title} - Created by {task.createdBy} at {task.createdAt}.
            Status {task.completed}
          </li>
        ))
      )}

      <button onClick={() => useTasksHook.createTask('Default task')}>
        Add default task
      </button>
    </div>
  );
};
