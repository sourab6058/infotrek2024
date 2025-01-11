import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

import logs from "../assets/logs.svg";
import boatload from "../assets/boatload.svg";
import hexa from "../assets/hexa.svg";
import deercliff from "../assets/deercliff.svg";
import semicircle from "../assets/semicircle.svg";
import sunrise from "../assets/sunrise.svg";

import "./styles/register.css";

import { registerApi } from "../../api";
import { AuthContext } from "../AuthContext";

import { emailRegex, passwordRegex } from "../../utils/constants";
import AlertMini from "../components/AlertMini";

function Register() {
  const { isLoggedIn } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [variant, setVariant] = useState("primary");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const navigate = useNavigate();
  function handleSubmit(e, data) {
    e.preventDefault();

    if (!passwordRegex.test(password) || !emailRegex.test(email)) {
      setVariant("warning");
      setAlertTitle("Invalid email/password format.");
      setAlertMsg("Password and/or email doesn't meet the criteria.");
      setShow(true);
      return;
    }

    setLoading(true);

    // console.log(data);
    try {
      axios
        .post(registerApi, data)
        .then((response) => {
          setVariant("success");
          setAlertTitle("Successfully Registered.");
          setAlertMsg("You have successfully registered.");
          setShow(true);

          setName("");
          setEmail("");
          setPassword("");
          navigate("/login");
          // console.log({ response });
        })
        .catch((err) => {
          console.log("EEEEE", err);
          setLoading(false);

          setVariant("danger");
          setAlertTitle("Registration Error.");
          setAlertMsg(
            "There registration was unsuccessful. Email might have been used already, try another email id."
          );
          setShow(true);
        });
    } catch (err) {
      console.log("EEEEE", err);
      setLoading(false);
      setVariant("danger");
      setAlertTitle("Registration Error.");
      setAlertMsg(
        "There registration was unsuccessful. Email might have been used already, try another email id."
      );
      setShow(true);
    }
  }

  return (
    <>
      <section className="login-section flex items-center justify-center min-h-screen bg-green-1000">
        <div className="flex flex-col items-center justify-center text-off-white p-5 max-w-[90vw] sm:max-w-[60vw] lg:max-w-[45vw]">
          <h2 className="text-4xl sm:text-5xl font-black">INFOTREK'24</h2>
          <h1 className="text-6xl sm:text-7xl font-black mt-6 text-center">
            GET STARTED
          </h1>
          <p className="text-xl sm:text-2xl text-center mt-3">
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
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            className="text-green-1000 px-4 py-3 rounded w-100 text-xl decoration-none outline-none mb-3"
          />
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-green-1000 px-4 py-3 rounded w-100 text-xl decoration-none outline-none mb-3"
            ></input>
            <span>
              Password must be atleast 8 characters long, contain atleast 1
              uppercase alphabet, 1 lowercase alphabet and one of the special
              characters ($#@()!%^&*).
            </span>
          </div>

          <button
            disabled={
              email.length === 0 || password.length === 0 || name.length === 0
            }
            className={
              email.length === 0 || password.length === 0 || name.length === 0
                ? "p-2 w-100 rounded mt-3 text-2xl font-semibold border"
                : "p-2 w-100 rounded mt-3 text-2xl font-semibold text-green-1000 bg-neon-80 border"
            }
            onClick={(e) => handleSubmit(e, { name, email, password })}
          >
            {loading ? <div className="loader"></div> : "REGISTER"}
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
      </section>
      <AlertMini
        message={alertMsg}
        title={alertTitle}
        show={show}
        setShow={setShow}
        variant={variant}
        setVariant={setVariant}
      />
    </>
  );
}

export default Register;
