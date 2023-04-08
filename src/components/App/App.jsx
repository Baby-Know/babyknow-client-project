import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import CoursePage from "../CoursePage/CoursePage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import RegistrantsPage from "../RegistrantsPage/RegistrantsPage";

function App() {
  //giving app access to theme and color mode
  const [theme, colorMode] = useMode();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* resets css to baseline */}
          <CssBaseline />
          <div className="app">
            <Nav />
            <div className="content">
              <Switch>
                {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
                <Redirect exact from="/" to="/registration" />

                <ProtectedRoute
                  // logged in shows CoursePage else shows LoginPage
                  exact
                  path="/course"
                >
                  <CoursePage />
                </ProtectedRoute>

                <ProtectedRoute
                  // logged in shows RegistrantsPage else shows LoginPage
                  exact
                  path="/registrants"
                >
                  <RegistrantsPage />
                </ProtectedRoute>

                <ProtectedRoute
                  // logged in shows AboutPage else shows LoginPage
                  exact
                  path="/about"
                >
                  <AboutPage />
                </ProtectedRoute>

                <Route exact path="/login">
                  {user.id ? (
                    // If the user is already logged in,
                    // redirect to the /course page
                    <Redirect to="/course" />
                  ) : (
                    // Otherwise, show the login page
                    <LoginPage />
                  )}
                </Route>

                <Route exact path="/registration">
                  {user.id ? (
                    // If the user is already logged in,
                    // redirect them to the /user page
                    <Redirect to="/course" />
                  ) : (
                    // Otherwise, show the registration page
                    <RegisterPage />
                  )}
                </Route>

                {/* If none of the other routes matched, we will show a 404. */}
                <Route>
                  <h1>404</h1>
                </Route>
              </Switch>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Router>
  );
}

export default App;
