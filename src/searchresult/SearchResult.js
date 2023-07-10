import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieServices from '../Services/MovieServices';
import CastServices from '../Services/CastServices';

const SearchResult = () => {
    let { search } = useParams();
    const navigate = useNavigate();
    const [rmovie, setRmovie] = useState([]);
    const fetchMovies = async () => {

        try {
            const [genreRes, titleRes, castRes] = await Promise.all([
                MovieServices.getMovieByGenre(search),
                MovieServices.getMovieByTitle(search),
                CastServices.getMovieByCast(search),
            ]);
            console.log(genreRes)
            console.log(castRes)
            console.log(titleRes)
            if (Array.isArray(genreRes.data)) {
                setRmovie(genreRes.data);
            }
            else if (Array.isArray(titleRes.data) && titleRes.data.length > 0) {
                setRmovie(titleRes.data);
            }
            else if (Array.isArray(castRes.data)) {
                setRmovie(castRes.data);
            }

            else {
                console.log("no data found")
            }

        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };


    useEffect(() => {
        fetchMovies();

    }, [search])
    const openMovie = (movieId) => {
       // call movie detail page here
    };

    return (
        <div className="flex-fill">
            <h3> SearchResult Results</h3>
            <br />
            <div className="container mt-4">
                <div className="row">
                    {rmovie.length > 0 ? rmovie.map((rmovie, index) => (
                        <div className="col-md-3" key={index}>
                            <div className="card">
                                <img
                                    src={rmovie.posterUrl}
                                    className="card-img-top"
                                    alt={rmovie.title}
                                    style={{ height: '400px' }}
                                />
                                <div className="card-body" style={{ backgroundColor: 'black' }}>
                                    <div className='row'>
                                        <div className='col'>
                                            <h5 className="card-title" style={{ color: 'white' }}>{rmovie.title}</h5>

                                        </div>
                                        <div className="col" style={{ color: "wheat" }}>{rmovie.rating}</div>
                                    </div>
                                    <a href="#" onClick={() => openMovie(rmovie.movieId)} className="btn btn-primary" style={{ backgroundColor: '#FFA500', borderColor: '#FFA500', color: 'black' }}>
                                        Watch Option
                                    </a>
                                </div>
                            </div>
                        </div>
                    )) : <h3>No Results found</h3>}
                </div>
            </div>
            <br/>
        </div>
        

    );
}

export default SearchResult;
