import { Link, redirect } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

import logs from "../assets/logs.svg";
import boatload from "../assets/boatload.svg";
import hexa from "../assets/hexa.svg";
import deercliff from "../assets/deercliff.svg";
import semicircle from "../assets/semicircle.svg";
import sunrise from "../assets/sunrise.svg";

import "./styles/register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e, data) {
    redirect("/login");
    e.preventDefault();
    console.log(data);
    try {
      axios
        .post("http://localhost:3000/api/users/signup", data)
        .then((response) => {
          alert("Registration successful✅. Now Login Please. ");
          setName("");
          setEmail("");
          setPassword("");
          console.log({ response });
        });
    } catch (err) {
      console.log(err);

      alert("Registration Error ❌");
    }
  }
  return (
    <section className="login-section w-[100vw] h-[100vh] bg-green-1000 flex items-center justify-center">
      <div className="flex flex-column items-center justify-center text-off-white p-5 max-w-[45vw]">
        <h2 className="text-4xl font-black">INFOTREK'24</h2>
        <h1 className="text-center text-6xl font-black">GET STARTED</h1>
        <p className="text-xl text-center mt-3">
          Embark on a digital journey with us. Explore, learn, and connect at
          our exciting online events.
        </p>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-green-1000 px-4 py-3 rounded w-100 text-xl decoration-none outline-none mb-3"
        />

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
          disabled={
            email.length === 0 || password.length === 0 || name.length === 0
          }
          className={
            email.length === 0 || password.length === 0 || name.length === 0
              ? "p-2 w-100 rounded mt-3 text-2xl font-semibold border"
              : "p-2 w-100 rounded mt-3 text-2xl font-semibold text-green-1000 bg-neon-80 border"
          }
        >
          REGISTER
        </button>
        <div className="mt-2 text-xl">
          Have an Account?
          <Link
            className="text-neon-100 ml-2 no-underline hover:text-neon-80"
            to="/login"
          >
            Log In
          </Link>
        </div>
        <img src={logs} alt="img-1" key={uuid()} className="random-img img-1" />
        <img src={hexa} alt="img-3" key={uuid()} className="random-img img-3" />
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
    </section>
  );
}

export default Register;
