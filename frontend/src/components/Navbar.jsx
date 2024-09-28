import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import useAlert from '../hooks/useAlert';

export const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { notLoggedInTaskPageAlert } = useAlert();

  const handleTasksPageClick = (e) => {
    if (!isAuthenticated) {
      console.log(isAuthenticated);
      notLoggedInTaskPageAlert();
      e.preventDefault();
      return;
    }
  };

  return (
    <nav>
      <h1>TASKLY</h1>
      <div className='links-div'>
        <Link to='/'>Home</Link>
        <Link to='/tasks' onClick={handleTasksPageClick}>
          Tasks
        </Link>
        <Link to='/about'>About</Link>
        {isAuthenticated ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
