import React, { useEffect, useState } from "react";
import ReviewService from "../../Services/ReviewService";
import './MovieDetail.css';
import { FaStar } from 'react-icons/fa';
const Review = ({ movieId,isRole }) => {
   
    const movId = movieId;
    const [reviewRes, setReviewRes] = useState([]);
    const [list, setList] = useState([1, 2, 3, 4, 5]);
    const [rating, setRating] = useState(null);
    const [review,setReview]=useState();
    const [hover, setHover] = useState(null);
    const [reviewslist,setReviewslist]=useState([]);
    var i = 0;


    const fetchReviews = async () => {
        ReviewService.getReview(movId)
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setReviewRes(res.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            })
    }
    useEffect(() => {
        fetchReviews();
    }, [movieId])


   
    const handleDelete = (reviewId) => {
       ReviewService.deleteReview(reviewId) .then((res) => {
        console.log("Review deleted");
        // Remove the deleted review from the state
        const updatedReviews = reviewRes.filter((review) => review.reviewId !== reviewId);
        setReviewRes(updatedReviews);
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
      });
    };

    const handlesubmit=(e)=>{
 
        e.preventDefault();

        console.log("rating :"+rating);
        console.log("review : "+review);
        
        const newReview = {
        userId:"2febf2c1-87a9-4d2e-b17a-8a73506ff09b",
          rating: rating,
          reviewText: review, 
        }; 
        setReviewslist(newReview);

        ReviewService.postReview(movieId,newReview).then((res=>{
            setReviewRes((prevReviews) => [...prevReviews, newReview]);
        }))
    
        setRating(' ');
        setReview(' '); 
}

    return (
        <div style={{ textAlign: "left", marginBottom: "30px" }}>
             <div   style={{padding: "30px",  border : "2px solid black" , borderRadius:"2rem"}}>
            <h6><strong>Rating</strong></h6>
            <div className='m-2'>
                {list.map((ele, i) => {
                    // console.log(i + " bro ");
                    const ratingvalue = i + 1;
                    return (
                        <label>

                            <input
                                type="radio"
                                name="rating"
                                value={ratingvalue}
                                onClick={() => setRating(ratingvalue)}
                             
                            />

                            <FaStar
                                className="star"
                                color={ratingvalue <= (hover || rating) ? '#ffc107' : "#e4e5e9"}
                                size={30}
                                onMouseEnter={() => setHover(ratingvalue)}
                                onMouseLeave={() => setHover(null)}
                            />

                        </label>
                    );
                })}

            </div>

            <div className="mb-3">
                <label htmlFor="review" className="form-label"><strong>Review</strong></label>
                <textarea className="form-control"  
                placeholder='Write your review here...'
                 id="review" 
                 cols="2"
                  rows="4"
                  name="review"
                  value={review}
                  onChange={(e)=>setReview(e.target.value)}
                  >
                  </textarea>
            </div>

            <button className='btn btn-success ' type='submit' onClick={handlesubmit} >Save </button>
            <button className='btn btn-danger mx-4' >Cancle</button>


                
        </div>

            {reviewRes.length > 0 ? reviewRes.map((rev, index) => (
                <div className="reviewbox" key={index}>
                    <div className="row">
                        <div className="col"><span>{rev.username}</span></div>
                        <div className="col" style={{ color: "#ffffff", }}>Rating:{rev.rating}</div>
                       { isRole==="ADMIN"?<div className="col"
                        ><button variant="primary"
                            className="btn"
                            type="Submit"
                            style={{
                                backgroundColor: "#FFA500",
                                borderColor: "#FFA500",
                                color: "black",
                            }} onClick={()=>handleDelete(rev.reviewId)}>Delete</button></div>:""}
                    </div>
                    <div className="row">
                        <div className="col" style={{ color: "#ffffff", }}>{rev.reviewText}</div>
                    </div>
                    <div className="row">
                        <div className="col"><span>Source: </span> {rev.source}</div>
                        <div className="col"><span>Source: </span> {rev.reviewDate}</div>
                    </div>
                </div>
            )) : <p>no reviews yet</p>}



        </div>
    )
}

export default Review;