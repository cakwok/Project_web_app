import React, { useState } from "react";
import { useNavigate } from "react-router";
import { register, registerThunk } from "./user-service";
import { useDispatch } from "react-redux";

function Register() {
  const [user, setUser] = useState({
    firstName:"",
    lastName:"",
    username: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    // const newUser = await register(user);
    await dispatch(registerThunk(user));
    navigate("/project/profile");
    // console.log(newUser);
    // setUser(newUser);
  };

  const handleUserTypeChange = (e) => {
      setUser({ ...user, role: e.target.value });
    };

  return (
    <div>
      <h1>Register</h1>
      {/* <form> */}
      <div>
              <label>First Name</label>
              <input
                className="form-control"
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                type="text"
                name="firstName"
                placeholder="Firstname"
              />
      </div>
      <div>
              <label>Last Name</label>
              <input
                className="form-control"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                type="text"
                name="lastname"
                placeholder="Lastname"
              />
      </div>
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
      <div>
        <label>Confirm Password</label>
        <input
          className="form-control"
          type="password"
          name="password2"
          placeholder="Confirm Password"
        />
      </div>
      <div>
              <label>Role</label>
              <select
                className="form-control"
                value={user.usertype}
                onChange={handleUserTypeChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
              </select>
            </div>
      <input
        onClick={handleRegister}
        className="btn btn-primary"
        value="Register"
      />
    </div>
  );
}

export default Register;