import fetch from 'node-fetch';

const KEEP_ALIVE_URL = 'https://task-app-3ois.onrender.com/users';
const INTERVAL = 10 * 60 * 1000;

export const keepAlive = async () => {
  try {
    const response = await fetch(KEEP_ALIVE_URL);
    if (response.ok) {
      console.log(
        'Keep-alive request successful:',
        new Date().toLocaleString()
      );
    } else {
      console.error('Keep-alive request failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error in keep-alive request:', error);
  }
};

setInterval(keepAlive, INTERVAL);

export default keepAlive;
