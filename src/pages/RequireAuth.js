import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Router } from "react-router-dom";

const RequireAuth = (props) => {
  // State to hold logged in status
  const [loggedIn, setLoggedIn] = useState(null);

  const checkAuth = async () => {
    // we want to run this this function the first time they hit a protected route (so we put it in a useEffect)
    try {
      await axios.get("/check-auth");
      setLoggedIn(true);
    } catch (err) {
      setLoggedIn(false);
    }
  };

  // UseEffect
  useEffect(() => {
    // this component will mount several times for each protected route, so we add an if else to make sure that the function runs only when loggedIn is null
    if (loggedIn === null) {
      checkAuth();
    }
  }, []); // it will run only once when the component mounts

  // if (!loggedIn) {
  //   return <div>Please login</div>;
  // }

  if (loggedIn === null) {
    return <div>Loading</div>;
  }

  if (loggedIn === false) {
    return;

    <Router>
      <Navigate to="/login" />
    </Router>;
  }

  return <div>{props.children}</div>; // whatever we put in between <RequireAuth></RequireAuth> get assigned to props.children
};

export default RequireAuth;
