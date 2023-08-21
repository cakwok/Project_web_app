import { Link, NavLink, useLocation } from "react-router-dom";
import React from "react";

const TopBar = () => {
    const { pathname } = useLocation();
    const [ignore, project, active] = pathname.split("/");
   
    return (
        <div className="list-group">
            <Link to={"/project/home "} 
                  className={`list-group-item ${active === "home" ? "active" : ""}`}>
                    Home
            </Link>
            <Link to={"/project/search "} 
                  className={`list-group-item${active === "search" ? "active" : ""}`}>
                    Search
            </Link>
            <Link to={"/project/login "} 
                  className={`list-group-item${active === "login" ? "active" : ""}`}>
                    Login
            </Link>
            <Link to={"/project/register "} 
                  className={`list-group-item${active === "register" ? "active" : ""}`}>
                    Register
            </Link>
        </div>
    );
};

export default TopBar;