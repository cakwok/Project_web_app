import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { profile, logout, profileThunk, logoutThunk } from "./user-service";
import * as service from "./user-service";
import { Link } from "react-router-dom";
import * as Rservice from "./service";


function ProfileOthers() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [followers, setFollowers] = useState([]);
  const [review, setReview] = useState([]);
  const fullNames = followers.map((entry) => `${entry.follower.firstName} ${entry.follower.lastName}`);

  const fetchCurrentUser = async () =>{
    const { payload } = await dispatch(profileThunk());
    setCurrentUser(payload);
    console.log(currentUser)
  }
  const fetchUser = async () => {
    const user = await service.getUserById(userId);
    setUser(user);
  };

  const fetchReviews = async () => {
    const reviews = await Rservice.getReviewsForUser(userId);
    setReview(reviews);
  };

  const fetchFollowers = async () => {
    const followers = await service.getFollowerUsers(userId);
    setFollowers(followers);
  };

  const followUser = async () => {
    const follow = await service.userFollowsAnotherUser(userId);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    fetchCurrentUser();
    fetchUser();
    fetchFollowers();
    fetchReviews();
  }, []);

  return (
    <div>
      <h1>
        <img
          src={user.avatar}
          width="50"
          style={{
            borderRadius: '50%',
            marginBottom: '10px',
          }}
        />
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        {/*<h4> {user.role} </h4>*/}
        {currentUser && user.canFollow ? (
          <button onClick={followUser} className="btn btn-primary float-end">
            Follow
          </button>
        ):null}
      </h1>
      <br />
      <hr />
      {user.canSeeFollowers ? (
        <div>
          <h3> Followers </h3>
          <div className="list-group">
            {fullNames.map((fullName, index) => (
              <h5 className="list-group-item" key={index}>
                {fullName}
              </h5>
            ))}
          </div>
          <hr />
        </div>
      ):null}
      {user.canSeeReviews ? (
        <div>
          <h3>Users Reviews</h3>
          <div className="list-group">
            {review.map((r) => (
              <div className="list-group-item" key={r.restaurant._id}>
                <h5>{r.restaurant.name}</h5>
                <h6>Review:</h6>
                <p>{r.reviews}</p>
              </div>
            ))}
          </div>
        </div>
      ): null}
    </div>
  );
}

export default ProfileOthers;