import React from "react";
import { Link } from "react-router";

function Navbar() {
  return (
    <div className="navbar shadow bg-base-100">
      <div className="navbar-start">
        <Link to={"/"} className="btn btn-ghost text-xl">
          AI Resume Maker
        </Link>
      </div>
    </div>
  );
}

export default Navbar;