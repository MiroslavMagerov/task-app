import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { LoginRegisterForm } from './components/LoginRegisterForm';
import { TaskPage } from './components/TaskPage';
import { About } from './components/About';
import { ProtectedRoute } from './components/ProtectedRoute';

export const TaskApp = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginRegisterForm />} />
        <Route
          path='/tasks'
          element={<ProtectedRoute component={TaskPage} />}
        />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
  );
};
