import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  const handleTasksClick = (e) => {
    if (!localStorage.getItem('token')) {
      alert('Por favor, inicia sesión para acceder a esta página.');
      e.preventDefault();
    }
  };

  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/login'>Login</Link>
      <Link to='/tasks' onClick={handleTasksClick}>
        Tasks
      </Link>
      <Link to='/about'>About</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
