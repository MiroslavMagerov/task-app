import useTasks from '../../hooks/useTasks';
import '../../styles/taskPage.css';
import { TaskList } from './TaskList';

export const TaskPage = () => {
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
          <TaskList></TaskList>
        </>
      )}
    </div>
  );
};
