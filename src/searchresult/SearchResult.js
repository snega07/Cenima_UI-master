import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MovieServices from '../Services/MovieServices';
import CastServices from '../Services/CastServices';
import { MdOutlineSearchOff } from 'react-icons/md'
const SearchResult = () => {
    let { search } = useParams();
    const navigate = useNavigate();
    const [rmovie, setRmovie] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isRole = searchParams.get('isRole');
    const isLoggedIn = searchParams.get('isLoggedIn');
    console.log(isRole + "from search result page" + isLoggedIn)
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
        navigate(`/view-movie/${movieId}`, {
            state: {
                isRole: isRole || '',
                isLoggedIn: isLoggedIn || false,
            },
        });
    };




    return (
        <div className="flex-fill">
            <h3 style={{
                color: "#999999", font: "arial, sans-serif", fontSize: "2.5rem", padding: "1.8rem", fontWeight: "bold",
                left: "13px"
            }}>  Search result for "{search}"</h3>
            <br />
            <div className="container mt-4">
                <div className="row">
                    {rmovie.length > 0 ? rmovie.map((rmovie, index) => (
                        <div className="col-md-3" key={rmovie.id} style={{ paddingBottom: '25px' }}>
                            <div className="card" >
                                <img
                                    src={rmovie.posterUrl}
                                    onClick={() => openMovie(rmovie.movieId)}
                                    className="card-img-top"
                                    alt={rmovie.title}
                                    style={{ height: '300px' }}
                                />
                                <div className="card-body" style={{ backgroundColor: 'black' }}>
                                    <h5 className="card-title" style={{
                                        color: 'wheat',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                    }}>{rmovie.title}</h5>
                                    <a className="btn btn-primary" style={{ backgroundColor: '#FFA500', borderColor: '#FFA500', color: 'black' }}>
                                        Watch Option
                                    </a>
                                </div>
                            </div>
                        </div>
                    )) : <div >
                        <div className="some-x" style={{ width: "15rem", height: "15rem", background: "#e5e5e9" }} >
                            <div className="empty ">
                                <MdOutlineSearchOff className='mt-3 mx-5' size={100} />
                                <p className='mt-3 mx-3' >Sorry We could't find it</p>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            <br />
        </div>


    );
}

export default SearchResult;
