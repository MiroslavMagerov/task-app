import '../styles/about.css';

export const About = () => {
  return (
    <div className='about-container'>
      <h1>About This Application 🌟</h1>
      <p>
        This app is a{' '}
        <span className='highlight black-text'>full stack project</span>{' '}
        developed as part of a practical learning experience in programming. It
        is designed to serve as an educational resource for beginners who wish
        to explore full stack web development. 🚀
      </p>
      <h2>Technologies Used 🛠️</h2>
      <ul>
        <li>
          <strong>Frontend:</strong> React and Vite for building an interactive
          and responsive user interface. 🎨
        </li>
        <li>
          <strong>Backend:</strong> Node.js, used to create a robust API that
          handles server logic. ⚙️
        </li>
        <li>
          <strong>Database:</strong> MongoDB Atlas, providing a cloud-based
          non-relational database solution for data storage and management. ☁️
        </li>
      </ul>
      <h2>Features ✨</h2>
      <p>
        The application allows users to log in, manage tasks, and access
        different sections of the application. Authentication is handled using
        JSON Web Tokens (JWT) to ensure that{' '}
        <span className='highlight black-text'>
          only authenticated users can access protected routes.
        </span>{' '}
        🔒
      </p>
      <h2>Hosting 🌐</h2>
      <p>
        This application is hosted using two reliable platforms:
        <strong> Netlify</strong> for the frontend and <strong>Render</strong>{' '}
        for the backend. By leveraging these cloud services, we ensure{' '}
        <span className='highlight black-text'>
          fast performance and easy deployment
        </span>{' '}
        , allowing users to access the application seamlessly from anywhere in
        the world. ☁️
      </p>
      <h2>Project Goal 🎯</h2>
      <p>
        The goal of this project is to provide beginners with a solid foundation
        in full stack web development. Through this project, users are expected
        to gain hands-on experience in application development and understand
        the complete flow from the frontend to the backend. 🌐
      </p>
    </div>
  );
};

export default About;
