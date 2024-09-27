import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export const Navbar = () => {
  const handleTasksClick = (e) => {
    if (!localStorage.getItem('token')) {
      alert('You need to be logged in to be able to see the tasks page.');
      e.preventDefault();
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <nav>
      <h1>TASKLY</h1>
      <div className='links-div'>
        <Link to='/'>Home</Link>
        <Link to='/tasks' onClick={handleTasksClick}>
          Tasks
        </Link>
        <Link to='/about'>About</Link>
        <Link to='/login'>Login</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
