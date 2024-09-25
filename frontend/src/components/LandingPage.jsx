import '../styles/landingPage.css';

export const LandingPage = () => {
  return (
    <div className='landing-div'>
      <h1>
        <span className='white'>Welcome to</span>{' '}
        <span className='highlight'>Taskly!</span>
      </h1>
      <p>
        Please, log in or create an account to be able to create and see others
        tasks!
      </p>
      <div className='app-description'>
        <h2>About Taskly</h2>
        <p>
          Taskly is an intuitive and easy-to-use application designed to help
          you organize and manage your daily tasks efficiently. With a focus on
          simplicity and functionality, you can:
        </p>
        <ul>
          <li>
            <strong>Manage your tasks:</strong> Add, edit, and delete tasks with
            ease.
          </li>
          <li>
            <strong>Secure access:</strong> Log in securely to keep your
            information private and access your tasks from anywhere.
          </li>
          <li>
            <strong>Intuitive navigation:</strong> Enjoy a user-friendly
            interface that makes it easy to navigate between your tasks, app
            information, and log out option.
          </li>
        </ul>
        <p>
          Optimize your productivity and stay on top of what you need to do with
          Taskly. Start managing your tasks today!
        </p>
      </div>
    </div>
  );
};
