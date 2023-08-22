import { Link, NavLink, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as userservice from "../user-service";
import Modal from "react-modal";

const TopBar = () => {
    const { pathname } = useLocation();
    const [ignore, project, active] = pathname.split("/");
    
    const [currentUser, setCurrentUser] = useState({});
    const dispatch = useDispatch();
    const fetchUser = async () => {
      const { payload } = await dispatch(userservice.profileThunk());
      setCurrentUser(payload);
      console.log(payload);
    };

    const handleLogout = async () => {
        await dispatch(userservice.logoutThunk());
        //navigate("/project/login");
      };
      
    useEffect(() => {
        fetchUser();
    }, [active]);
   
    return (
        <div className="list-group">
            <Link to={"/project/home "} 
                  className={`list-group-item ${active === "home" ? "active" : ""}`}>
                    Home
            </Link>
            <Link to={"/project/search "} 
                  className={`list-group-item ${active === "search" ? "active" : ""}`}>
                    Search
            </Link>
            {currentUser.role === "marketer" ? (
                    <Link to={"/project/marketing "}
                        className={`list-group-item ${active === "marketing" ? "active" : ""}`}>
                            Marketing
                    </Link>
                ): null}
            {currentUser.role === "admin" ? (
                
                    <Link to={"/project/admin "}
                        className={`list-group-item ${active === "admin" ? "active" : ""}`}>
                            Admin
                    </Link>
                 
                ): null}
            {!currentUser ? (
                <div>
                    <Link to={"/project/login "} 
                        className={`list-group-item ${active === "login" ? "active" : ""}`}>
                            Login
                    </Link>
                    <Link to={"/project/register "} 
                        className={`list-group-item ${active === "register" ? "active" : ""}`}>
                            Register
                    </Link>
                </div>
                ) : (
                    <div>
                        <Link to={"/project/profile "} 
                            className={`list-group-item ${active === "profile" ? "active" : ""}`}>
                                Profile
                        </Link>
                        <Link to={"/project/login "} 
                            className={`list-group-item`}
                            onClick={handleLogout} >
                                Logout
                        </Link>
                    </div>
                )
            }


            <div style={{ marginTop: '10px', marginLeft: '10px' }}>
                    <img src = {currentUser.avatar} 
                                width="50" style={{ borderRadius: '50%', marginBottom: '10px'}}/>
            </div>
        </div>
    );
};

export default TopBar;