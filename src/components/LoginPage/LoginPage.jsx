import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Button, TextField, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const errors = useSelector((store) => store.errors);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const login = (event) => {
    event.preventDefault();

    if (email && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          email: email,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <Box
      pt="10%"
      width="25vw"
      margin="auto"
      sx={{
        "& .MuiButton-sizeMedium": {
          backgroundColor: colors.tealAccent[500],
        },
        "& .MuiButton-sizeMedium:hover": {
          backgroundColor: colors.tealAccent[700],
        },
      }}
    >
      <form className="formPanel" onSubmit={login}>
        <Typography variant="h2" textAlign="center">
          Login
        </Typography>
        {errors.loginMessage && (
          <Typography varaint="h3" className="alert" role="alert">
            {errors.loginMessage}
          </Typography>
        )}
        <Box>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            type="email"
            label="E-Mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Box>
        <Box>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button
            onClick={() => {
              history.push("/registration");
            }}
          >
            Register
          </Button>
          <Button type="submit" name="submit" value="Log In">
            Log In
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default LoginPage;
