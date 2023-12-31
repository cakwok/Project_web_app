import React, { useState } from "react";
import { login, loginThunk } from "./user-service";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    // const currentUser = await login(user);
    await dispatch(loginThunk(user));
    //navigate("/project/profile");
    navigate("/project/member");
    // console.log(currentUser);
    // setUser(currentUser);
  };

  return (
    <div>
      <h1>Login</h1>
      {/* <form> */}
      <div>
        <label>Username</label>
        <input
          className="form-control"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          type="text"
          name="username"
          placeholder="Username"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          className="form-control"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>

      <input onClick={handleLogin} className="btn btn-primary" value="Login" />
    </div>
  );
}

export default Login;