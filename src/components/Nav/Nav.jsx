import { React, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../images/BK Logo.png";
import { useTheme } from "@emotion/react";
import { tokens, ColorModeContext } from "../../theme";
import { IconButton, Button, Box, Typography } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

function Nav() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useSelector((store) => store.user);
  const colorMode = useContext(ColorModeContext);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Box
      className="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: `${colors.primary[500]}`,
        "& .MuiButton-sizeMedium": {
          width: "5.7vw",
          borderRadius: "0px",
          color: "#fcfcfc",
        },
        "& .MuiButton-sizeMedium:hover": {
          backgroundColor: colors.darkTealAccent[500],
        },
        "& #color-mode-btn": {
          color: "#fcfcfc",
        },
        "& #color-mode-btn:hover": {
          color: colors.darkTealAccent[500],
        },
      }}
    >
      <Box>
        <Link to="/about">
          <img src={logo} width="130vw" />
        </Link>
      </Box>
      <Box
        sx={{
          width: "30vw",
          display: "flex",
          justifyContent: "right",
        }}
      >
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            {/* Switch Buttons depending on light or dark mode */}
            <IconButton
              onClick={colorMode.toggleColorMode}
              id="color-mode-btn"
              disableRipple
            >
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <Button
              to="/course"
              onClick={() => {
                history.push("/course");
              }}
            >
              <Typography variant="body1">Courses</Typography>
            </Button>

            {user.access === 3 ?
            <Button onClick={() => history.push("/registrants")}>
              <Typography variant="body1">Registrants</Typography>
            </Button> : user.access === 2 ?
            <Button onClick={() => history.push("/myStudents")}>
              <Typography variant="body1">My Students</Typography>
            </Button> : user.access === 1 ?
            <Button onClick={() => history.push("/myTeacher")}>
              <Typography variant="body1">My Teacher</Typography>
            </Button> :
            <Button onClick={() => history.push("/about")}>
              <Typography variant="body1">Contacts</Typography>
            </Button>}


            <Button
              onClick={() => {
                history.push("/about");
              }}
            >
              <Typography variant="body1">About</Typography>
            </Button>

            <Button onClick={() => dispatch({ type: "LOGOUT" })}>
              <Typography variant="body1">Log Out</Typography>
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Nav;
