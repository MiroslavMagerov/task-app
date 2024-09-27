import '../styles/loginRegisterPage.css';
import openedEyeIcon from '../images/opened_eye_icon.png';
import closedEyeIcon from '../images/closed_eye_icon.png';
import { useAuthForm } from '../hooks/useAuthForm';

export const LoginRegisterForm = () => {
  const authForm = useAuthForm();

  return (
    <main>
      <form className='login-form' onSubmit={authForm.handleSubmitForm}>
        <h1>{authForm.loginOrRegister ? 'Log in' : 'Sign up'}</h1>
        <input
          type='text'
          value={authForm.username}
          onChange={(e) => {
            authForm.setUsername(e.target.value),
              authForm.handleFocus('username');
          }}
          required
          placeholder='Username'
          onBlur={() => authForm.handleBlur('username')}
          className={`input-username ${authForm.usernameError ? 'error' : ''}`}
        />
        <p
          className={`error-message ${authForm.usernameError ? 'visible' : ''}`}
        >
          Required
        </p>
        <div className='password-div'>
          <input
            type={authForm.showPassword ? 'text' : 'password'}
            value={authForm.password}
            onChange={(e) => authForm.setPassword(e.target.value)}
            required
            placeholder='Password'
            onFocus={() => authForm.handleFocus('password')}
            onBlur={() => authForm.handleBlur('password')}
            className={`input-password ${
              authForm.passwordError ? 'error' : ''
            }`}
          />
          <img
            alt='Eye icon'
            src={authForm.showPassword ? openedEyeIcon : closedEyeIcon}
            onClick={() => authForm.setShowPassword(!authForm.showPassword)}
          />
        </div>
        <p
          className={`error-message ${authForm.passwordError ? 'visible' : ''}`}
        >
          Required
        </p>

        <button type='submit'>
          {authForm.loginOrRegister ? 'LOG IN' : 'SIGN UP'}
        </button>
        <button
          type='button'
          onClick={() => authForm.setLoginOrRegister(!authForm.loginOrRegister)}
        >
          {authForm.loginOrRegister ? 'SWITCH TO SIGN UP' : 'SWITCH TO LOG IN'}
        </button>
      </form>
      <div className='info-div'>
        {authForm.successMessage && (
          <p className='success'>{authForm.successMessage}</p>
        )}
        {authForm.error && <p className='error'>{authForm.error}</p>}
      </div>
    </main>
  );
};
