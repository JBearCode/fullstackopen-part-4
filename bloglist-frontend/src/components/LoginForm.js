import { useState } from 'react';
import loginService from '../services/login';
import PropTypes from 'prop-types';


const LoginForm = ({
  setUser, setMessageColor, setMessageText
}) => {

  // state of login form input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    // attempt server login with given username and password
    try {
      const user = await loginService.login({
        username, password,
      });
      // save successful login to localStorage
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      );
      // provide user object to user state in app
      setUser(user);
      // reset username and password form input fields
      setUsername('');
      setPassword('');
    } catch (exception) {
      // display error message if login fails
      console.log(exception);
      setMessageColor('red');
      setMessageText('Wrong credentials');
      setTimeout(() => {
        setMessageText(null);
      }, 5000);
    }
  };

  return(
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessageColor: PropTypes.func.isRequired,
  setMessageText: PropTypes.func.isRequired,
};

export default LoginForm;