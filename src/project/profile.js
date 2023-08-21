import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { profile, logout, profileThunk, logoutThunk } from "./user-service";
import * as service from "./service";
import * as userService from "./user-service";
import { Link } from "react-router-dom";

function Profile() {
  const [currentUser, setCurrentUser] = useState({});

  const dispatch = useDispatch();
  const fetchUser = async () => {
    // const user = await profile();
    const { payload } = await dispatch(profileThunk());
    setCurrentUser(payload);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    // await logout();
    await dispatch(logoutThunk());
    navigate("/project/login");
  };

  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;