import React from "react";
import lightLogo from "../assets/infotreklightlogo.png";
import darkLogo from "../assets/infotrekdarklogo.png";
import { Link } from "react-router-dom";

export default function Nav({ dark }) {
  return (
    <nav
      className={`flex justify-between items-center p-3 ${
        dark ? "bg-green-1000" : "bg-off-white"
      }`}
    >
      <Link to="/">
        <div className="min-w-[240px]">
          <img src={dark ? lightLogo : darkLogo} className="nav-logo-div"></img>
        </div>
      </Link>
      <ol className="font-bold flex justify-between items-center min-w-[240px]">
        <li>
          <Link
            to="/"
            className={`no-underline ${
              dark ? "text-white nav-link-hover" : "text-green-1000"
            } `}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`no-underline ${
              dark ? "text-white nav-link-hover" : "text-green-1000"
            } `}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/team"
            className={`no-underline ${
              dark ? "text-white nav-link-hover" : "text-green-1000"
            } `}
          >
            Team
          </Link>
        </li>
      </ol>
      <div className="flex justify-around items-center min-w-[240px]">
        <Link to="/login" className="no-underline text-center">
          <div
            className={`border rounded-md py-2 px-3 ${
              dark ? "hover:bg-green-900" : ""
            }`}
          >
            <p
              className={`${
                dark ? "text-white" : "text-green-1000"
              } font-bold m-0`}
            >
              LOG IN
            </p>
          </div>
        </Link>
        <Link className="no-underline text-center">
          <div className="rounded-md py-2 px-3 bg-neon-100 hover:bg-neon-80">
            <p className="text-black font-semibold m-0">SEE EVENTS</p>
          </div>
        </Link>
      </div>
    </nav>
  );
}
