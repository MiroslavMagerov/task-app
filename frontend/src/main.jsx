import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TaskApp } from './TaskApp';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskApp></TaskApp>
  </StrictMode>
);
