import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <nav>
      <Link to='/tasks'>Tasks</Link>
      <Link to='/login'>Login</Link>
      <Link to='/about'>About</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
