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
import UnitPage from "../UnitPage/UnitPage";
import ContentPage from "../ContentPage/ContentPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import RegistrantsPage from "../RegistrantsPage/RegistrantsPage";
import MyPathPage from "../MyPages/MyPath";
import MyStudentsPage from "../MyPages/MyStudentsPage";
<<<<<<< HEAD
=======
import Messages from "../Messages/Messages";
>>>>>>> d7ac8347c15723e169cb50c45d7dd8e5f44677f1

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

                <ProtectedRoute exact path="/course">
                  <CoursePage />
                </ProtectedRoute>

                <ProtectedRoute exact path="/unit/:id">
                  <UnitPage />
                </ProtectedRoute>

                <ProtectedRoute
                  exact
                  path="/unit/:unitId/lesson/:lessonId/content/:contentId"
                >
                  <ContentPage />
                </ProtectedRoute>

                <ProtectedRoute exact path="/registrants">
                  {user.access === 3 ? (
                    <RegistrantsPage />
                  ) : (
                    <Redirect to="/about" />
                  )}
                </ProtectedRoute>

                <ProtectedRoute exact path="/myStudents">
                  {user.access === 2 ? (
                    <MyStudentsPage />
                  ) : (
                    <Redirect to="/about" />
                  )}
                </ProtectedRoute>

                <ProtectedRoute exact path="/myPath">
                  {user.access === 1 ? (
                    <MyPathPage />
                  ) : (
                    <Redirect to="/about" />
                  )}
                </ProtectedRoute>

                <ProtectedRoute exact path="/about">
                  <AboutPage />
                </ProtectedRoute>

                <Route exact path="/login">
                  {user.id ? (
                    // If the user is already logged in,
                    <Redirect to="/course" />
                  ) : (
                    // Otherwise, show the login page
                    <LoginPage />
                  )}
                </Route>

                <Route exact path="/registration">
                  {user.id ? (
                    // If the user is already logged in,
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
