import { useEffect, useState } from 'react';

const BACKEND_API = import.meta.env.VITE_BACKEND_API_URL;

export const useTasks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const getTasks = async () => {
    try {
      const resp = await fetch(`${BACKEND_API}/tasks`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!resp.ok) {
        console.error('Error in the fetch');
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
    const defaultTask = {
      title,
    };

    try {
      const resp = await fetch(`${BACKEND_API}/tasks`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(defaultTask),
      });

      if (!resp.ok) {
        console.error('Error in the fetch');
      }

      const data = await resp.json();
      console.log('Task created: ', data);
      return data;
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  return { isLoading, error, tasks, createTask };
};

export default useTasks;
