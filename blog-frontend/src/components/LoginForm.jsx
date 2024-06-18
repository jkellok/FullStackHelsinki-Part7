import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = ({ doLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    doLogin({ username, password });
    setUsername("");
    setPassword("");
    dispatch(setNotification("Logged in!", 5, "notification"));
  };

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "20ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              variant="filled"
              required
            />
          </div>
          <div>
            <TextField
              label="password"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
              required
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default LoginForm;
