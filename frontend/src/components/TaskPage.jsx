import useTasks from '../hooks/useTasks';
import '../styles/taskPage.css';

export const TaskPage = () => {
  const useTasksHook = useTasks();

  return (
    <div className='task-list'>
      <h1>Task List</h1>
      {useTasksHook.tasks.map((task) => (
        <li key={task.title}>
          {task.title} - Created by {task.createdBy} at {task.createdAt}. Status{' '}
          {task.completed}
        </li>
      ))}

      <button onClick={useTasksHook.createTask}>Add default task</button>
    </div>
  );
};
