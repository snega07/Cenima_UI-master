import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  let isRole="ADMIN"
  const navigate = useNavigate();
  const [search,setSearch] = useState({searchValue:""});

  const handleChange=(e)=>{
    setSearch({...search,[e.target.name]:e.target.value.trim()});
    console.log(search);
   
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/view-search-result/${search.searchValue}`)
  }

  return (

   
    <nav className="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: '#222021' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="https://i.pinimg.com/originals/72/e5/29/72e529e4e09f45496c470a0b47110398.jpg"
            alt=""
            width="60"
            height="60"
            style={{ borderRadius: "60%" }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" style={{ color: '#FFA500' }} aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link active" style={{ color: '#FFA500' }} aria-current="page">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link active" style={{ color: '#FFA500' }} aria-current="page">
                Profile
              </Link>
            </li>
            {isRole==="ADMIN"?
            <li className="nav-item">
              <Link to="/addmovie/_add" className="nav-link active" style={{ color: '#FFA500' }} aria-current="page">
                Add movies
              </Link>
            </li>:""}
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              name='searchValue'
              placeholder="Search"
              aria-label="Search"
              onChange={handleChange}
            />
            <button
              className="btn btn-outline"
              type="submit"
              onClick={handleSubmit}
              style={{ backgroundColor: '#FFA500', borderColor: '#FFA500' }}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
