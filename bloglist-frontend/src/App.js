import { useState, useEffect, useRef } from 'react';
// components
import Notification from './components/Notification';
import CreationForm from './components/CreationForm';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import Togglable from './components/Togglable';
import SortButtons from './components/SortButtons';
import ListedBlogs from './components/ListedBlogs';
// service to communicate with server via axios
import blogService from './services/blogs';


const App = () => {
  // set blogs to display in app
  const [blogs, setBlogs] = useState([]);
  // state for user logins
  const [user, setUser] = useState(null);
  // set message and color of notofication messages
  const [messageText, setMessageText] = useState(null);
  const [messageColor, setMessageColor] = useState('green');
  // set sorting of displayed blogs
  const [sortBy, setSortBy] = useState('default');

  // user.username == user.username
  // using useRef to change state of Togglable component's 'visible' state
  const creationFormRef = useRef();
  const creationForm = () => (
    <Togglable buttonLabel="Add a New Blog" ref={creationFormRef}>
      <h2>Add New Blog</h2>
      <CreationForm
        setBlogs={setBlogs}
        blogs={blogs}
        setMessageColor={setMessageColor}
        setMessageText={setMessageText}
        setUser={setUser}
        user={user}
        creationFormRef={creationFormRef}
      />
    </Togglable>
  );

  // get all blogs from server on initial load
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  // check if user has active session on initial load
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h2>Favorite Blogs App</h2>
      <Notification
        messageText={messageText}
        messageColor={messageColor}
      />
      {user === null ?
        <LoginForm
          setUser={setUser}
          setMessageColor={setMessageColor}
          setMessageText={setMessageText}
        /> :
        <div>
          <p>{user.name} is logged in.</p>
          <LogoutButton setUser={setUser}/>
          {creationForm()}
          <h2>Blogs</h2>
          <SortButtons
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <ListedBlogs
            blogs={blogs}
            setBlogs={setBlogs}
            sortBy={sortBy}
            user={user}
          />
        </div>
      }
    </div>
  );
};

export default App;
