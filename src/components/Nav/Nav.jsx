import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import logo from "../../images/BabyKnowLogo.png"
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";


function Nav() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useSelector((store) => store.user);


  return (
    <div
      className="nav"
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: `${colors.primary[500]}`,
      }}
    >
      <div>
        <Link to="/about">
          <img src={logo}/>
        </Link>
      </div>
      <div style={{ backgroundColor: `${colors.greenAccent[500]}` }}>
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
            <Link className="navLink" to="/course">
              Course
            </Link>

            <Link className="navLink" to="/registrants">
              Registrants
            </Link>

            <Link className="navLink" to="/about">
              About
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
