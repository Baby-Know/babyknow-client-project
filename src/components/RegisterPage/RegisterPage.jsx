import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Button, TextField, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useHistory } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organization, setOrganization] = useState("");

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const theme = useTheme();
  const history = useHistory();
  const colors = tokens(theme.palette.mode);

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        organization: organization,
      },
    });
  }; // end registerUser

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
      <form className="formPanel" onSubmit={registerUser}>
        <Typography variant="h2" textAlign="center">
          Register User
        </Typography>
        {errors.registrationMessage && (
          <Typography variant="h3" className="alert" role="alert">
            {errors.registrationMessage}
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
        <Box>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            required
            type="text"
            label="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Box>
        <Box>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            required
            type="text"
            label="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </Box>
        <Box>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            required
            type="text"
            label="Organization"
            value={organization}
            onChange={(event) => setOrganization(event.target.value)}
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </Button>
          <Button type="submit" name="submit" value="Register">
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default RegisterPage;
