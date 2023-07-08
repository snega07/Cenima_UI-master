import React, { useState, useRef } from 'react';
import './Trending.css';

import ViewReviewModal from '../moviemodal';

const Trending = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  let isRole = "ADMIN";
  const handleDelete = (id) => {
    alert(id);
  }


  const containerRef = useRef(null);
  const scrollLeft = () => {
    containerRef.current.scrollBy({
      left: -500,
      behavior: 'smooth'
    });
  };
  const scrollRight = () => {
    containerRef.current.scrollBy({
      left: 500,
      behavior: 'smooth'
    });
  };

  const rmovie = [
    {
      title: 'Top Gun: Maverick',
      image: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg',
      movieId: 'icemanj252-2666jsgag-16166kjag$@-agj'
    },
    {
      title: 'Avatar : Way of Water',
      image: 'https://pbs.twimg.com/media/Fv-AJxxagAASfbh.jpg:large',
      movieId: 'pandoraoj252-2666jsgag-16166kjag$@-agj'
    },
    {
      title: 'Oppenheimer',
      image: 'https://m.media-amazon.com/images/M/MV5BMDEzNDdjYTctNjA4ZS00ZDgzLTkxNmUtMTQwMzUyMmFhMWRhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
      movieId: 'openhj252-2666jsgag-16166kjag$@-agj'
    },
    {
      title: 'Better Call Saul',
      image: 'https://m.media-amazon.com/images/M/MV5BZDA4YmE0OTYtMmRmNS00Mzk2LTlhM2MtNjk4NzBjZGE1MmIyXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_FMjpg_UX1000_.jpg',
      movieId: 'bettercallj252-2666jsgag-16166kjag$@-agj'
    },

    {
      title: 'Spider-Man : Across The Spider-verse',
      image: 'https://www.dolby.com/siteassets/xf-site/content-detail-pages/sv2_1280x1920_stothard_dolby_02.jpg',
      movieId: 'spoiderj252-2666jsgag-16166kjag$@-agj'
    }, {
      title: 'Puss In Boots: The Last Wish',
      image: 'https://www.gippslandtimes.com.au/wp-content/uploads/2023/01/PussinBootsposter_68806.jpg',
      movieId: 'gatoj252-2666jsgag-16166kjag$@-agj'
    },
    
  ];


  const openMovie = (movieId) => {
    alert(movieId)
  }





  return (
    <div className="flex-fill">

      <div className="tsectionTitle">
        <h3 id="theadc">Trending Movies</h3>
        <h3 id="tviewAll">View All</h3>
      </div>
      <br />
      <div className="tscroll-buttons">
        <button className="tscroll-button left" onClick={scrollLeft}>
          <img src={'icons8-arrow-50.png'}></img>
        </button>

      </div>

      <div id='trecomm' className="container mt-4 tcontainer-scroll" ref={containerRef}>



        <div className="row trow-scroll">
          {rmovie.map((rmovie, index) => (
            <div className="col-md-3" key={index}>
              <div className="card tcards" id={rmovie.movieId} >


                {isRole == "ADMIN" ? <div className="card-delete">
                  <i
                    onClick={() => handleDelete(index)}
                  ><img src={'delete.png'} height={25} width={25} /></i>
                </div>
                  : <></>}




                <img
                  src={rmovie.image}
                  className="card-img-top"
                  alt={rmovie.title}
                  style={{ height: '400px', objectFit: 'cover', overflow: 'hidden' }}
                />
                <div className="card-body" style={{ backgroundColor: 'black' }}>
                  <h5 className="card-title" style={{ color: 'wheat', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{rmovie.title}</h5>
                  <a onClick={() => openMovie(rmovie.movieId)} className="btn btn-primary" style={{ backgroundColor: '#FFA500', borderColor: '#FFA500', color: 'black' }}>
                    Watch Option
                  </a>
                </div>
              </div>
            </div>
          ))}
          {isRole == "ADMIN" ? <div className='col-md-3 addTrendCon' >
            <div className="card addTrend" >
              <img
                src={'add\(1\).png'}
                className="card-img-top"
                alt={rmovie.title}
                style={{ height: '70px', objectFit: 'contain', overflow: 'clip' }}
              />
            </div>
          </div> : <></>}
        </div>


      </div>

      <div className="tscroll-buttons-right">
        <button className="tscroll-button right" onClick={scrollRight}>
          <img src={'icons8-right-arrow-50.png'}></img>
        </button>
      </div>




      {showModal && (
        <ViewReviewModal
          movie={rmovie[selectedId]}
          showModal={showModal}
          handleClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Trending;
