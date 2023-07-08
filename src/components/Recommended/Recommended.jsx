import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { useRef } from "react";
import { FaStar } from "react-icons/fa";
import MovieServices from "../../Services/MovieServices";
import { useNavigate } from "react-router-dom";

const Recommended = (props) => {
  const [rmovie, setRmovie] = useState([]);
  const navigate = useNavigate();

  let isRole = "ADMIN";
  const handleDelete = (id) => {
    alert(id);
  };

  const fetchMovies = async () => {
    MovieServices.getRecommendation()
      .then((res) => {
        if (Array.isArray(res.data)) {
          setRmovie(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  const containerRef = useRef(null);
  const scrollLeft = () => {
    containerRef.current.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    containerRef.current.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  /*const rmovie = [
    {
      title: 'Charulata',
      image: 'http://7artcinema.online.fr/imagesbg/Satyajit_Ray_Charulata_1964_Poster_07.jpg',
      movieId: 'amichinigoj252-2666jsgag-16166kjag$@-agj'
    },
    {
      title: 'Inception',
      image: 'https://irs.www.warnerbros.com/gallery-v2-jpeg/inception_posterlarge_8-1308772917.jpg',
      movieId: 'timegoj252-2666jsgag-16166kjag$@-agj'
    },
    {
      title: 'Interstellar',
      image: 'https://posterspy.com/wp-content/uploads/2022/08/Interstellar_poster.jpg',
      movieId: 'internj252-2666jsgag-16166kjag$@-agj'
    },
    {
      title: 'Spider-Man',
      image: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/d2284deb1c651f0678555eeb30cc10a51726b8e8d6a1eb4b2d12b55d5d0e003c._RI_TTW_.jpg',
      movieId: 'spoiderj252-2666jsgag-16166kjag$@-agj'
    }, {
      title: 'Puss In Boots: The Last Wish',
      image: 'https://www.gippslandtimes.com.au/wp-content/uploads/2023/01/PussinBootsposter_68806.jpg',
      movieId: 'gatoj252-2666jsgag-16166kjag$@-agj'
    }, {
      title: 'Predator 1987',
      image: 'https://image.tmdb.org/t/p/original/9XibNLfmUWCg0PPydmyoCl1KxvF.jpg',
      movieId: 'predatorgoj252-2666jsgag-16166kjag$@-agj'
    },
  ];*/

  const openMovie = (movieId) => {
    navigate(`/view-movie/${movieId}`);
  };

  return (
    <>
      <div className="flex-fill">
        <div className="sectionTitle">
          <h3 id="headc">Recommended Movies</h3>
          <h3 id="viewAll">View All</h3>
        </div>
        <br />
        <div className="scroll-buttons">
          <button className="scroll-button left" onClick={scrollLeft}>
            <img src={"icons8-arrow-50.png"}></img>
          </button>
        </div>

        <div
          id="recomm"
          className="container mt-4 container-scroll"
          ref={containerRef}
        >
          <div className="row row-scroll">
            {rmovie.map((rmovie, index) => (
              <div className="col-md-3" key={index}>
                <div className="card rcards" id={rmovie.movieId}>
                  {isRole == "ADMIN" ? (
                    <div className="card-delete">
                      <i onClick={() => handleDelete(index)}>
                        <img src={"delete.png"} height={25} width={25} />
                      </i>
                    </div>
                  ) : (
                    <></>
                  )}

                  <img
                    src={rmovie.posterUrl}
                    className="card-img-top"
                    onClick={() => openMovie(rmovie.movieId)}
                    alt={rmovie.title}
                    style={{
                      height: "400px",
                      objectFit: "cover",
                      overflow: "hidden",
                    }}
                  />
                  <div
                    className="card-body"
                    style={{ backgroundColor: "black" }}
                  >
                    <div className="row">
                      <div className="col">
                        <h5
                          className="card-title"
                          style={{
                            color: "wheat",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          {rmovie.title}
                        </h5>
                      </div>
                      <div className="col">
                        <span>
                          {rmovie.rating + " "}
                          <FaStar style={{ marginBottom: "4px" }} />
                        </span>
                      </div>
                    </div>
                    <a
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "#FFA500",
                        borderColor: "#FFA500",
                        color: "black",
                      }}
                    >
                      Watch Option
                    </a>
                  </div>
                </div>
              </div>
            ))}
            {isRole == "ADMIN" ? (
              <div className="col-md-3 addRecommCon">
                <div className="card addRecomm">
                  <img
                    src={"add(1).png"}
                    className="card-img-top"
                    alt={rmovie.title}
                    style={{
                      height: "70px",
                      objectFit: "contain",
                      overflow: "clip",
                    }}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="scroll-buttons-right">
          <button className="scroll-button right" onClick={scrollRight}>
            <img src={"icons8-right-arrow-50.png"}></img>
          </button>
        </div>
      </div>
    </>
  );
};

export default Recommended;
