import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


const ViewAll=()=>{
    const navigate = useNavigate();
    const location = useLocation();
const { rmovie,isRole,isLoggedIn,title} = location.state ;
  
      const openMovie = (movieId) => {
        navigate(`/view-movie/${movieId}`, { state: { isRole: isRole,isLoggedIn: isLoggedIn}});
      };
    
    return(
        <div className="flex-fill" >
          
          <h2 style={{ color: "gray", paddingLeft:"1.8rem" }}>{title}</h2>
          <br />
           <div className="container mt-4" >
           <div className="row" >
            {rmovie.map((rmovie) => (
            <div className="col-md-3" key={rmovie.id} style={{paddingBottom:'25px'}}>
              <div className="card" >
                <img
                  src={rmovie.posterUrl}
                  onClick={()=>openMovie(rmovie.movieId)}
                  className="card-img-top"
                  alt={rmovie.title}
                  style={{ height: '300px'}}
                />
                <div className="card-body" style={{ backgroundColor: 'black' }}>
                  <h5 className="card-title" style={{
                      color: 'wheat',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}>{rmovie.title}</h5>
                  <a  className="btn btn-primary" style = {{ backgroundColor: '#FFA500', borderColor: '#FFA500', color:'black' }}>
                    Watch Option
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    );
};
export default ViewAll;