import axios from 'axios';
const Review_API_BASE_URL ="http://localhost:8080/api/reviews";
class ReviewService {

    getReview(movieId){
    return axios.get(Review_API_BASE_URL+'/'+movieId);
    }
    deleteReview(reviewId){
        return axios.delete(Review_API_BASE_URL+'/'+reviewId)
    }
    postReview(movieId,review){
        return axios.post(Review_API_BASE_URL+'/'+movieId,review)
    }

}

export default new ReviewService();