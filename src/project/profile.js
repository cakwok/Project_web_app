import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { profile, logout, profileThunk, logoutThunk,getUsers,removeUser,getUsersWithRole } from "./user-service";
import * as service from "./service";
import * as userService from "./user-service";
import { Link } from "react-router-dom";
import Modal from "react-modal";

function Profile() {
  const [currentUser, setCurrentUser] = useState({});
  const [likes, setLikes] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [review, setReview]=useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [canFollow, setCanFollow] = useState(currentUser.canFollow || true);
  const [canSeeFollowers, setCanSeeFollowers] = useState(currentUser.canSeeFollowers || true);
  const [canSeeReviews, setCanSeeReviews] = useState(currentUser.canSeeReviews || true);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reviewsDB, setReviewsDB] = useState([]);
  const userRole = 'admin';

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewFirstName("");
    setNewLastName("");
  };

  const openModal1 = () => {
    setShowModal(true);
  };

  const closeModal1 = () => {
    setShowModal(false);
  };

  const fetchAllReviews = async () => {
    const reviewsDB = await service.getAllReviewsForRestaurant();
    setReviewsDB(reviewsDB);
    console.log("reviewsDB", reviewsDB);
};

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
      setShowModal(false); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUserName = async (newFirstName, newLastName) => {
    try {
      const updatedUser = {
        ...currentUser,
        firstName: newFirstName,
        lastName: newLastName,
      };
      await userService.updateUser(updatedUser);
      setCurrentUser(updatedUser);
      closeModal();
    } catch (error) {
      console.error("Error updating user name:", error);
    }
  };

  const toggleFollowButtonStatus = async () => {
    try {
      const updatedUser = {
        ...currentUser,
        canFollow: !currentUser.canFollow,
      };
      await userService.updateUser(updatedUser);
      setCanFollow(!currentUser.canFollow);
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error("Error updating follow button status:", error);
    }
  };

  const toggleFollowersStatus = async () => {
    try {
      const updatedUser = {
        ...currentUser,
        canSeeFollowers: !currentUser.canSeeFollowers,
      };
      await userService.updateUser(updatedUser);
      setCanSeeFollowers(!currentUser.canSeeFollowers);
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error("Error updating followers status:", error);
    }
  };

  const toggleReviewsStatus = async () => {
    try {
      const updatedUser = {
        ...currentUser,
        canSeeReviews: !currentUser.canSeeReviews, // Toggle the canFollow status
      };
      await userService.updateUser(updatedUser);
      setCanSeeReviews(!currentUser.canSeeReviews);
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error("Error updating review status:", error);
    }
  };

  const fetchFollowed = async (follower) => {
    const followed = await userService.getFollowedUsers(follower);
    setFollowed(followed);
  };

  const fetchLikes = async (userId) => {
    const likes = await service.getLikesForUser(userId);
    setLikes(likes);
  };

  const fetchReviews = async (userId) => {
    const review = await service.getReviewsForUser(userId);
    setReview(review);
  };

  const dispatch = useDispatch();
  const fetchUser = async () => {
    // const user = await profile();
    const { payload } = await dispatch(profileThunk());
    setCurrentUser(payload);
    await fetchLikes(payload._id);
    await fetchFollowed(payload._id);
    await fetchReviews(payload._id);
  };

  useEffect(() => {
    fetchUser();
    fetchUsers();
    fetchAllReviews();
  }, [canFollow, canSeeFollowers, canSeeReviews]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    // await logout();
    await dispatch(logoutThunk());
    navigate("/project/login");
  };

  return (
    <div>
      <h1>Profile</h1>
      <img src={currentUser.avatar} width="50" style={{
                                          borderRadius: '50%',
                                          marginBottom: '10px'
                                      }}/>
      <h3>{currentUser.firstName}   {currentUser.lastName}</h3>
      <h4>{currentUser.role}</h4>
      <button className="btn btn-warning" onClick={handleLogout}>Logout</button> &nbsp;&nbsp;
      <button className="btn btn-info" onClick={openModal}>Update Details</button> &nbsp;&nbsp;
      <button
        className="btn btn-secondary"
        onClick={toggleFollowButtonStatus}
      >
        {canFollow ? "Hide Follow Button" : "Show Follow Button"}
      </button> &nbsp;&nbsp;
      <button
        className="btn btn-secondary"
        onClick={toggleFollowersStatus}
      >
        {canSeeFollowers ? "Hide Followers" : "Show Followers"}
      </button> &nbsp;&nbsp;
      <button
        className="btn btn-secondary"
        onClick={toggleReviewsStatus}
      >
        {canSeeReviews ? "Hide Reviews" : "Show Reviews"}
      </button> &nbsp;&nbsp;
      {/* Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} >
                          <h3>Update Details</h3>
                          <label htmlFor="newFirstName">New First Name:</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="New First Name"
                            value={newFirstName}
                            onChange={(e) => setNewFirstName(e.target.value)}
                          />
                          <br/>
                            <label>New Last Name:</label>
                             <input
                             className="form-control"
                             type="text"
                             placeholder="New Last Name"
                             value={newLastName}
                             onChange={(e) => setNewLastName(e.target.value)}
                             />
                          <hr/>
                          <button className="btn btn-primary" onClick={() => updateUserName(newFirstName, newLastName)}>
                            Update Details
                          </button> &nbsp;&nbsp;
                          <button className="btn btn-danger" onClick={closeModal}>Cancel</button>
                        </Modal>
      <hr />
      <h3>People I follow</h3>
      <div className="list-group">
        {followed.map((f) => (
          <Link
            className="list-group-item"
            to={`/project/profile/${f.followed._id}`}
          >
            {f.followed.firstName} {f.followed.lastName}
          </Link>
        ))}
      </div>
      <hr />
      <h3>Restaurants I like</h3>
      <div className="list-group">
        {likes.map((like) => (
          <Link
            className="list-group-item"
            to={`/project/details/${like.restaurantId}`}
          >
            {like.restaurant.name}
          </Link>
        ))}
      </div>
      <hr/>
      <h3>Reviews I have written</h3>
      <div className="list-group" style={{marginBottom:"50px"}}>
          {review.map((r) => (
              <div className="list-group-item" key={r.restaurant._id}>
                  <h5>{r.restaurant.name}</h5>
                  <h6>Review:</h6>
                  <p>{r.reviews}</p>
              </div>
          ))}
      </div>

      </div>

  );
}

export default Profile;