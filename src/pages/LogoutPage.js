import axios from "axios";
import React, { useEffect, useState } from "react";

const LogoutPage = () => {
  // State to hold logged in status
  const [loggedIn, setLoggedIn] = useState(null);

  const logout = async () => {
    await axios.get("/logout");

    setLoggedIn(false);
  };

  useEffect(() => {
    logout();
  }, []);

  return <h1>You are now logged out</h1>;
};

export default LogoutPage;
