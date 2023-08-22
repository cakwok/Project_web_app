import { Routes, Route } from "react-router";
import Login from "./login";
import Profile from "./profile";
import Register from "./register";
import Details from "./details";
import Home from "./home";
import Search from "./search";
import ProfileOthers from "./profile-others";
import Admin from "./admin";
import TopBar from "./top-bar";
import Marketer from "./marketer";

function Project() {
  return (
    <div>
      <img src = "https://s3-media0.fl.yelpcdn.com/assets/public/developers.yji-a68f827814c0cf08bcb3.png" />

      <div className="row">
        <div className="col-2 position-relative">
            <TopBar />
        </div>

        <div className="col-10">
              <Routes>
                <Route path="home" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/:userId" element={<ProfileOthers />} />
                <Route path="search" element={<Search />} />
                <Route path="search/:searchTerm" element={<Search />} />
                <Route path="details/:id" element={<Details />} />
                <Route path="admin" element={<Admin />} />
                <Route path="marketing" element={<Marketer />} />
              </Routes>
        </div>
     </div>

    </div>
  );
}

export default Project;