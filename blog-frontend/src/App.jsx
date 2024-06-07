import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import { initializeBlogs } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import storage from './services/storage'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import Users from "./pages/Users";
import userService from "./services/users"
import User from "./pages/User"
import Blogs from "./pages/Blogs"
import Blog from './pages/Blog'
import Home from './pages/Home'
import { AppBar, Container, Toolbar, Button, ThemeProvider, createTheme, Typography } from '@mui/material'
import { lime, orange } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: orange
  }
})

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([])

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      setUser(user)
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initializeBlogs(blogs))
    })
  }, [dispatch])

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  const blogsToShow = useSelector(({blogs}) => {
    console.log(blogs)
    return blogs
  })

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      setUser(user)
      storage.saveUser(user)
      dispatch(setNotification("Logged in!", 5, "notification"))
    } catch (exception) {
      dispatch(setNotification("Wrong username or password", 5, "notification-error"))
    }
  };

  const handleLogout = () => {
    setUser(null);
    storage.removeUser()
    dispatch(setNotification("Logged out!", 5, "notification"))
  };

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm doLogin={handleLogin} />
      </div>
    )
  }

  return (
    <Container>
      <Router>
        <AppBar position="static" disableGutters>
          <Toolbar>
            <ThemeProvider theme={theme}>
              <Button color="primary" variant="contained" component={Link} to="/">
                home
              </Button>
              <Button color="primary" variant="contained" component={Link} to="/blogs">
                blogs
              </Button>
              <Button color="primary" variant="contained" component={Link} to="/users">
                users
              </Button>
              {user
                ?
                <div>
                  <em>{user.name} logged in</em> {' '}
                  <Button
                    onClick={handleLogout}
                    variant="contained"
                    color="secondary"
                  >
                    logout
                  </Button>
                </div>
                :
                <Button color="inherit" component={Link} to="/login">
                  login
                </Button>
              }
            </ThemeProvider>
          </Toolbar>
        </AppBar>

        <Notification />
        <div>
          <div>
            <Typography sx={{ mt: 4, mb: 2, fontWeight: 'bold' }} variant="h4">
              Welcome to blog app
            </Typography>
          </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="users" element={<Users users={users} />} />
              <Route path="users/:id" element={<User users={users} />} />
              <Route path="blogs" element={<Blogs blogs={blogsToShow} />} />
              <Route path="blogs/:id" element={<Blog blogs={blogsToShow} user={user} />} />
            </Routes>
            <div>
            </div>
        </div>
      </Router>
    </Container>
  );
};

export default App;
