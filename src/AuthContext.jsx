// src/AuthContext.jsx
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(null);
  const [email, setEmail] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      login({
        token,
        username: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        gender: localStorage.getItem("gender"),
        dob: localStorage.getItem("dob"),
        imgUrl: localStorage.getItem("imgUrl"),
        userId: localStorage.getItem("userId"),
      });
    }
  }, []);

  const login = (data) => {
    setIsLoggedIn(true);
    setToken(data.token);
    setUsername(data.username);
    setGender(data.gender);
    setDob(data.dob);
    setEmail(data.email);
    setImgUrl(data.imgUrl);
    setUserId(data.userId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
  };

  const value = {
    isLoggedIn,
    username,
    email,
    dob,
    gender,
    imgUrl,
    userId,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };
