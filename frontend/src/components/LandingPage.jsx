import '../styles/landingPage.css';

export const LandingPage = () => {
  return (
    <div className='landing-div'>
      <h1>
        <span className='white'>Welcome to</span>{' '}
        <span className='highlight'>Taskly!</span>🌟
      </h1>
      <p>
        Taskly is your go-to{' '}
        <span className='highlight black-text'>productivity partner!</span> Log
        in or create an account to embark on your journey to manage tasks
        effectively and achieve your goals. 🔑
      </p>
      <div className='app-description'>
        <h2>About Taskly 📋</h2>
        <p>
          Taskly is designed to help you{' '}
          <span className='highlight black-text'>
            organize and manage your daily tasks with ease.
          </span>{' '}
          In today’s fast-paced world, it can be overwhelming to keep track of
          everything you need to do, but Taskly simplifies this process. With
          our user-friendly interface, you’ll find that staying organized has
          never been easier! 🌍
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Manage your tasks:</strong> Effortlessly add, edit, and
            delete tasks. Whether it&apos;s personal errands, work projects, or
            collaborative efforts, Taskly helps you stay on top of it all. ✏️
          </li>
          <li>
            <strong>Secure access:</strong>{' '}
            <span className='highlight black-text'>Log in safely</span> to
            protect your personal information while accessing your tasks from
            any device. We prioritize your data security and privacy. 🔒
          </li>
          <li>
            <strong>Intuitive navigation:</strong> Enjoy a smooth user
            experience that allows you to quickly find what you need, from your
            task list to app settings. 🧭
          </li>
        </ul>
        <p>
          At Taskly,{' '}
          <span className='highlight black-text'>
            we believe that staying organized leads to increased productivity
            and less stress.
          </span>{' '}
          Our application is designed to fit seamlessly into your busy
          lifestyle, making task management simple and effective. 📅
        </p>
        <p>
          Start managing your tasks today with Taskly and take the first step
          toward a more organized, productive, and fulfilling life! 🚀
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
