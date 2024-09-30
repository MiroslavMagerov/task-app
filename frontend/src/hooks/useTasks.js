import { useEffect, useState } from 'react';

const BACKEND_API = import.meta.env.VITE_BACKEND_API_URL;

export const useTasks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem('AuthenticationToken');

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const fetchedTasks = await getTasks();
        if (fetchedTasks) {
          setTasks(fetchedTasks);
        }
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getTasks = async () => {
    try {
      const resp = await fetch(`${BACKEND_API}/tasks`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!resp.ok) {
        console.error('Error in the fetch');
        return;
      }

      const data = await resp.json();
      console.log('Data: ', data);
      return data;
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (title) => {
    if (title.trim().length === 0) {
      console.error('Cannot create a task with empty title');
      return;
    }

    const defaultTask = {
      title,
    };

    try {
      const resp = await fetch(`${BACKEND_API}/tasks/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(defaultTask),
      });

      if (!resp.ok) {
        console.error('Error in the fetch');
        return;
      }

      const data = await resp.json();
      console.log('Task created: ', data);

      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      return data;
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const resp = await fetch(`${BACKEND_API}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!resp.ok) {
        console.error('Error in the fetch');
        return;
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

      console.log(`Task ${taskId} deleted successfully`);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  return { isLoading, error, tasks, createTask, deleteTask };
};

export default useTasks;
