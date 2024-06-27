import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  // usestate for signup form
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
  });

  // Function to update login form while typing
  const updateSignupForm = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    // now we update the state
    setSignupForm({
      ...signupForm, // creates a duplicate of the signupForm object
      [name]: value, // this will find the keys (name attributes) and update its values (value attributes) to whatever is changed by the JS event.
    });
  };

  // Function to signup with the input values
  const signup = async () => {
    const res = await axios.post("/signup", signupForm);

    setSignupForm({
      email: "",
      password: "",
    });
  };

  //    Function to handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    await signup();
    navigate("/login");
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <input
          onChange={updateSignupForm}
          value={signupForm.email}
          type="email"
          name="email"
        />
        <input
          onChange={updateSignupForm}
          value={signupForm.password}
          type="password"
          name="password"
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
