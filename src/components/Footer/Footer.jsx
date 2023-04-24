import React from "react";
import "./Footer.css";

function Footer() {
  let year = new Date().getFullYear();
  return <footer style={{ fontSize: "1.1em" }}>&copy; Baby Know {year}</footer>;
}

export default Footer;
