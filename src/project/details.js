import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as service from "./service";
import { useDispatch } from "react-redux";

function Details() {

    const { id } = useParams();

    const [restaurant, setRestaurant] = useState({});
    const [displayAddress, setAddress] = useState();
    const [transaction, setTransaction] = useState();
    const [currentUser, setCurrentUser] = useState({});
    const [likes, setLikes] = useState([]);
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        const reviews = await service.getReviewsForRestaurant(id);
        setReviews(reviews);
    };

    const fetchLikes = async () => {
        const likes = await service.getLikesForRestaurant(id);
        setLikes(likes);
    };

    const dispatch = useDispatch();
    const fetchUser = async () => {
      const { payload } = await dispatch(service.profileThunk());
      setCurrentUser(payload);
    };

    const fetchRestaurant = async () => {
        const restaurant = await service.getRestaurant(id);
        const restaurantReplaceJPG = {
            ...restaurant,
            photos: restaurant.photos.map((photo) => 
                photo.replace(/o\.jpg$/, "348s.jpg")
            )
        };
        setRestaurant(restaurantReplaceJPG);
        const displayAddress = restaurant.location.display_address.join(' ');
        setAddress(displayAddress);
        const transaction = restaurant.transactions.join(',');
        setTransaction(transaction);
      };

    useEffect(() => {
        fetchUser();
        fetchRestaurant();
        fetchLikes();
        //fetchReviews();
    }, []);

    const handleReviewSubmit = async () => {
        await service.userReviewsRestaurant(restaurant.id, {
            name: restaurant.name,
            restaurantId: restaurant.id,
            reviews: reviews,
    });
    };

    return ( 
    <div>
        <div className="table-responsive" style={{ marginTop: '15px' }}>
            <h5>{restaurant.name}
                {currentUser ? (
                    <button
                        onClick={() => {
                            service.userLikesRestaurant(restaurant.id, {
                                                        name: restaurant.name,
                                                        restaurantId: restaurant.id,
                            });
                        }}
                        className="btn btn-success float-end"
                        >
                        Like
                    </button>
                 ) : (
                    <p></p>
                )}
            </h5>
            <table className="table">
                <tbody>
                    <tr>
                        {restaurant.photos ? (
                            restaurant.photos.map((photo, index) => (
                                <img key={index} src={photo} width="400" />
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </tr>
                        <tr>
                            <td>
                                <p style={{ display: 'inline' }}>
                                    {restaurant.categories ? (
                                        restaurant.categories.map((category, index) => (
                                            <span key={index}>
                                                {category.title}
                                                {index !== restaurant.categories.length - 1 && ', '}
                                            </span>
                                        ))
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </p>
                            </td>
                        </tr>
                        <tr><td>Phone: {restaurant.display_phone}</td></tr>
                        <tr><td>Rating: {restaurant.rating}</td></tr>
                        <tr><td>Price: {restaurant.price}</td></tr>
                        <tr><td>Address: {displayAddress}</td></tr>
                        {transaction && (<tr><td>Transactions: {transaction}</td></tr>)}
                </tbody>
            </table>
        </div>
        <div>
            <h5>Likes</h5>
                {likes.length >0 ? (
                    likes.map((like) => (
                        <Link
                            className="list-group-item"
                            to={`/project/profile/${like.user._id}`}
                        >
                            <div style={{
                                display: 'inline-block',
                                backgroundColor: '#f2f2f2', // Background color of the rectangle
                                borderRadius: '8px', // Rounded corners
                                padding: '10px', // Padding within the rectangle
                                marginBottom: '10px', // Margin below the rectangle
                            }}
                            >
                                <img src={like.user.avatar} width="50" style={{
                                    borderRadius: '50%',  
                                    marginBottom: '10px'
                                }}/>
                                {like.user.firstName} {like.user.lastName}                           
                            </div>
                        </Link>
                        ))
                    ) : (
                        <p>Be the first reviewer!</p>
                    )}

            <h5>Submit a Review</h5>
                <div style={{ display: 'flex',   alignItems: 'flex-end' , marginBottom: '30px'}}>
                    <input className="form-control w-75"
                           placeholder="Enter your review"
                           onChange={(e) => setReviews(e.target.value)}
                           style={{ height: '150px' }}
                    />
                    <button onClick={handleReviewSubmit}
                            className="btn btn-primary float-end"
                    >Submit
                    </button>
                </div>
        </div>
    </div>
    );
}

export default Details;