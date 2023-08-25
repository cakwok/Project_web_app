import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { profile, logout, profileThunk, logoutThunk,getUsers,removeUser,getUsersWithRole } from "./user-service";
import * as service from "./service";
import * as userService from "./user-service";
import { Link } from "react-router-dom";
import Modal from "react-modal";

function Admin() {
    const [currentUser, setCurrentUser] = useState({});
    const [users, setUsers] = useState([]);

    const dispatch = useDispatch();
    const fetchUsers = async () => {
        try {
          const usersData = await getUsers();
          setUsers(usersData);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

    const deleteUser = async (userId) => {
        try {
          await removeUser(userId);
          fetchUsers();
          
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };

    useEffect(() => {
        fetchUsers();
      }, []);

    return (
        <div>
            <h2>All Users</h2>
            <ul>
                <div className="row" style={{ marginTop: '30px' }}>
                    <div className="col-3"> <h5>Name</h5></div>
                    <div className="col-2"> <h5>Role</h5></div>
                </div>
                    {users.map((user) => (
                        user._id !== currentUser._id && (
                        <li key={user._id} style={{ marginBottom: '10px' }} className="row align-items-center mb-6"> 
                            <div className="col-3">
                                {user.firstName} {user.lastName}
                            </div>
                            <div className="col-2">
                                {user.role} 
                            </div>
                            <div className="col-2">
                                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user._id)}>Delete</button>
                            </div>
                        </li>
                        )
                    ))}
               
            </ul>
        </div>

    );
}
export default Admin;