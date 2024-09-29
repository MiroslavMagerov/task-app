import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { LoginRegisterForm } from './components/LoginRegisterForm';
import { TaskPage } from './components/TaskPage';
import { About } from './components/About';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Footer } from './components/Footer';

export const TaskApp = () => {
  

  return (
    <Router>
      <Navbar />
      <div className='content'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginRegisterForm />} />
          <Route
            path='/tasks'
            element={
              <ProtectedRoute>
                <TaskPage />
              </ProtectedRoute>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default TaskApp;
