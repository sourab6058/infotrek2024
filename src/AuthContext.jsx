// src/AuthContext.jsx
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [gender, setGender] = useState(null);
  const [phone, setPhone] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [dob, setDob] = useState(null);
  const [email, setEmail] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [userId, setUserId] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      login({
        token,
        username: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        gender: localStorage.getItem("gender"),
        year: localStorage.getItem("year"),
        course: localStorage.getItem("course"),
        phone: localStorage.getItem("phone"),
        rollNum: localStorage.getItem("rollNum"),
        dob: localStorage.getItem("dob"),
        imgUrl: localStorage.getItem("imgUrl"),
        userId: localStorage.getItem("userId"),
        events: JSON.parse(localStorage.getItem("events")),
      });
    }
  }, []);

  const login = (data) => {
    // console.log("REq Incomeinf", data);
    setIsLoggedIn(true);
    setToken(data.token);
    setUsername(data.username);
    setGender(data.gender);
    setYear(data.year);
    setCourse(data.course);
    setPhone(data.phone);
    setRollNum(data.rollNum);
    setDob(data.dob);
    setEmail(data.email);
    setImgUrl(data.imgUrl);
    setUserId(data.userId);
    setEvents(data.events);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.clear();
  };

  const value = {
    isLoggedIn,
    username,
    email,
    dob,
    gender,
    course,
    rollNum,
    year,
    phone,
    imgUrl,
    userId,
    token,
    events,
    setEvents,
    login,
    logout,
  };

  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };
