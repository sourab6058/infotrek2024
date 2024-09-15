import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useContext, useState } from "react";

import { AuthContext } from "../AuthContext";
import formatDateyyyyMMdd from "../../utils/formatDateyyyyMMdd";

import logs from "../assets/logs.svg";
import boatload from "../assets/boatload.svg";
import hexa from "../assets/hexa.svg";
import deercliff from "../assets/deercliff.svg";
import semicircle from "../assets/semicircle.svg";
import sunrise from "../assets/sunrise.svg";

import "./styles/login.css";
import { Button } from "react-bootstrap";

import { loginApi } from "../../api";

function Login() {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function signIn(e, data) {
    e.preventDefault();
    console.log(data);
    try {
      const response = await axios.post(loginApi, data);
      console.log(response, response.status);
      if (response.status === 200) {
        const formattedDob = formatDateyyyyMMdd(response.data.data.dob);
        console.log(response.data);
        alert("You're successfully logged in.✅");
        localStorage.setItem("email", email.toLowerCase());
        localStorage.setItem("authorized", "true");
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("dob", formattedDob);
        localStorage.setItem("imgUrl", response.data.data.img_url);
        localStorage.setItem("gender", response.data.data.gender);
        localStorage.setItem("userId", response.data.data.id);
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("role", response.data.data.role);
        localStorage.setItem(
          "events",
          JSON.stringify(response.data.data.events)
        );
        login({
          email: email.toLowerCase(),
          username: response.data.data.name,
          dob: formattedDob,
          imgUrl: response.data.data.img_url,
          gender: response.data.data.gender,
          token: response.data.token,
          userId: response.data.data.id,
          events: response.data.data.events,
        });
      }
      console.log({ response });
    } catch (err) {
      console.log("IM HERE");
      console.log(err);
      alert("Login unsuccessfull.❌");
    }
  }

  function handleLogout(e) {
    logout();
  }

  return (
    <section className="login-section w-[100vw] h-[100vh] bg-green-1000 flex items-center justify-center">
      {isLoggedIn ? (
        <div className="flex flex-column items-center justify-center gap-5">
          <h1 className="text-white">You're Logged In</h1>
          <Button onClick={handleLogout}>
            <span className="text-3xl font-bold m-2">LOG OUT</span>
          </Button>
          <Link to="/profile">
            <Button variant="outline-success">
              <span className="text-3xl font-bold m-2">View Profile</span>
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-column items-center justify-center text-off-white p-5 max-w-[45vw] z-10">
          <h2 className="text-4xl font-black">INFOTREK'24</h2>
          <h1 className="text-center text-6xl font-black">GET STARTED</h1>
          <p className="text-xl text-center mt-3">
            Embark on a digital journey with us. Explore, learn, and connect at
            our exciting online events.
          </p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-green-1000 px-4 py-3 rounded w-100 text-xl decoration-none outline-none mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-green-1000 px-4 py-3 rounded w-100 text-xl decoration-none outline-none mb-3"
          />
          <button
            disabled={email.length === 0 || password.length === 0}
            className={
              email.length === 0 || password.length === 0
                ? "p-2 w-100 rounded mt-3 text-2xl font-semibold border"
                : "p-2 w-100 rounded mt-3 text-2xl font-semibold text-green-1000 bg-neon-80 border"
            }
            onClick={(e) => signIn(e, { email, password })}
          >
            LOG IN
          </button>
          <div className="mt-2 text-xl">
            New?
            <Link
              className="text-neon-100 ml-2 no-underline hover:text-neon-80"
              to="/register"
            >
              Register
            </Link>
          </div>
          <img
            src={logs}
            alt="img-1"
            key={uuid()}
            className="random-img img-1"
          />
          <img
            src={hexa}
            alt="img-3"
            key={uuid()}
            className="random-img img-3"
          />
          <img
            src={boatload}
            alt="img-2"
            key={uuid()}
            className="random-img img-2"
          />
          <img
            src={deercliff}
            alt="img-4"
            key={uuid()}
            className="random-img img-4"
          />
          <img
            src={semicircle}
            alt="img-5"
            key={uuid()}
            className="random-img img-5"
          />
          <img
            src={sunrise}
            alt="img-6"
            key={uuid()}
            className="random-img img-6"
          />
        </div>
      )}
    </section>
  );
}

export default Login;
