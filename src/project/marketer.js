import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { profile, logout, profileThunk, logoutThunk,getUsers,removeUser,getUsersWithRole } from "./user-service";
import * as service from "./service";
import * as userService from "./user-service";
import { Link } from "react-router-dom";
import Modal from "react-modal";

function Marketer() {

    const [reviewsDB, setReviewsDB] = useState([]);

    const fetchAllReviews = async () => {
        const reviewsDB = await service.getAllReviewsForRestaurant();
        setReviewsDB(reviewsDB);
        console.log("reviewsDB", reviewsDB);
    };

    useEffect(() => {
        fetchAllReviews();
      }, []);

    return (
        <div>
                <h2>Marketing Data</h2>
                <ul>
                  <div style={{ marginTop: '30px' }}>
                      <h5>Total number of reviews:</h5>
                      {reviewsDB ? (
                                  <span>{reviewsDB.length}</span>
                              ) : (
                                  <p>There's no user reviews in the system.</p>
                      )}  
                  </div>
                </ul>
        </div>
    );
}
export default Marketer;