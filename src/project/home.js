import { useEffect, useState } from "react";
import * as service from "./service.js";
import { Link, useParams, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [results, setResults] = useState({});
  const [query, setQuery] = useState("milpitas");
  const [reviewsDB, setReviewsDB] = useState([]);

  const fetchReviews = async () => {
    const reviewsDB = await service.getAllReviewsForRestaurant();
    setReviewsDB(reviewsDB);
    console.log("reviewsDB", reviewsDB);
};

  const search = async () => {
     const qwe =  query;
     const response = await service.fullSearch(qwe);
     const results  = response;
     const modifiedResults = {
          ...response,
          businesses: results.businesses.map((business) => ({
              ...business,
              image_url: business.image_url.replace(/o\.jpg$/, "348s.jpg")
          }))
      };
      setResults(modifiedResults);
      console.log(results);
  };

  useEffect(() => {
        search();
        fetchReviews();
  }, []);

  return (
    <div>
      <h1>Home for the best taste!</h1>
      <div>
        <table className="table">
                  <tbody>
                      <tr>
                      {results.businesses ? (
                          results.businesses.map((business) => (                           
                                      <td>
                                          <Link to={`/project/details/${business.id}`}>
                                              <div key={business.id}>
                                                  <img src={business.image_url} width="300" />     
                                              </div>
                                          </Link>
                                      </td>
                              ))
                      ) : (
                          <p>Loading...</p>
                      )}
                      </tr>
                  </tbody>
              </table>
        </div>
        <div style={{ marginTop: '10px' }}>
            <h5>User Reviews</h5>
            {reviewsDB ? (
                        reviewsDB.map((reviewDB, index) => (
                            <tr><td>
                                <span key={index}> 
                                    {reviewDB.user.firstName} ': ' {reviewDB.reviews} 
                                </span>  
                            </td></tr>
                        ))
                    ) : (
                        <p>Be the first one to submit a review!</p>
                    )}  
        </div>
    </div>
  );
}

export default Home;