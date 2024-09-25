// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TaskApp } from './TaskApp';
import './styles/main.css';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <TaskApp />
  // </StrictMode>
);
