import '../../styles/taskItem.css';

export const TaskItem = ({ task, deleteTask }) => {
  console.log(task);
  return (
    <li className='task-item'>
      <span>{task.title}</span>
      <span>{task.createdBy ? task.createdBy.username : 'ERROR'}</span>
      <span>{task.completed ? '✅' : '❌'}</span>
      <span>{new Date(task.createdAt).toLocaleString()}</span>
      <button onClick={() => deleteTask(task._id)}>Delete</button>
    </li>
  );
};
