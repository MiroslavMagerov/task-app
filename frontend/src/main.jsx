// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TaskApp } from './TaskApp';
import './styles/main.css';
import AuthProvider from './components/AuthProvider';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthProvider>
    <TaskApp />
  </AuthProvider>
  // </StrictMode>
);
