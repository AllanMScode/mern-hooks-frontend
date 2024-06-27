import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  // State to hold logged in status
  const [loggedIn, setLoggedIn] = useState(null);

  // state to hold the values of login form inputs
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Function to update login form while typing
  const updateLoginForm = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    // now we update the state
    setLoginForm({
      ...loginForm, // creates a duplicate of the loginForm object
      [name]: value, // this will find the keys (name attributes) and update its values (value attributes) to whatever is changed by the JS event.
    });
  };

  // Function to login with the input values
  const login = async () => {
    const res = await axios.post("/login", loginForm);

    setLoggedIn(true);

    setLoginForm({
      email: "",
      password: "",
    });
  };

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    await login();
    // Navigate to homepage
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          onChange={updateLoginForm}
          value={loginForm.email}
          type="email"
          name="email"
        />
        <input
          onChange={updateLoginForm}
          value={loginForm.password}
          type="password"
          name="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
