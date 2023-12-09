import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './AuthView.css';

function AuthView({ handleLogIn }) {
  const [signInMode, setSignInMode] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onFormSubmit(event) {
    event.preventDefault();

    if (signInMode) signIn();
    else signUp();
  }

  function handleSignSwitch() {
    setError(null);
    setSignInMode(!signInMode);
  }

  function signIn() {
    axios
      .post(`http://localhost:3000/users/signin`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem('email', email);
        localStorage.setItem('token', res.data.token);
        handleLogIn(true);
        toast.success('Zalogowano!');
      })
      .catch((err) => {
        setError({
          message: err.response.data.message,
          status: err.response.status,
        });
        toast.error(err.response.data.message);
      });
  }

  function signUp() {
    axios
      .post(`http://localhost:3000/users/signup`, {
        email,
        password,
      })
      .then((res) => {
        setSignInMode(true);
        setEmail('');
        setPassword('');
        toast.success('Utworzono konto!');
      })
      .catch((err) => {
        setError({
          message: err.response.data.message,
          status: err.response.status,
        });
        toast.error(err.response.data.message);
      });
  }

  return (
    <div>
      <div>
        <p className="sign-in-up-label">
          {signInMode ? 'Logowanie' : 'Rejestracja'}
        </p>
        <form onSubmit={onFormSubmit}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Login"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Hasło"
            required
          />
          <button type="submit">
            {signInMode ? 'Zaloguj się' : 'Zarejestruj się'}
          </button>
          {error &&
            (error.status === 401 || error.status === 400 ? (
              <p className="error">{error.message}</p>
            ) : (
              <p className="error">Problem z serwerem</p>
            ))}
        </form>
      </div>
      <div>
        {!signInMode ? (
          <span
            className="sign-in-up-switch"
            onClick={() => handleSignSwitch()}
          >
            Przełącz na logowanie
          </span>
        ) : (
          <span
            className="sign-in-up-switch"
            onClick={() => handleSignSwitch()}
          >
            Przełącz na rejestrację
          </span>
        )}
      </div>
    </div>
  );
}

export default AuthView;
