import React, { useState } from "react";
import './MovieForm.css';
import { useEffect } from "react";
import Select from 'react-select';
import { useNavigate, useParams } from "react-router-dom";
import GenreServices from "../../Services/GenreServices";
import MovieServices from "../../Services/MovieServices";

const MovieForm = (props) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    id: id,
    title: "",
    director: "",
    producer: "",
    motionPictureRating: "",
    movieDesc: "",
    casts: [],
    genres: [],
    runtime: "",
    collection: "",
    language: "",
    posterUrl: "",
    releaseDate: "",
  });

  const [genresFromApi, setGenresFromApi] = useState([{}])
  const [selectedValue, setSelectedValue] = useState([]);
  const fetchGenre = async () => {
    GenreServices.getGenre().then(
      res => setGenresFromApi(res.data)
    )
  }
  useEffect(() => {
    fetchGenre();
    if(movieData.id ==='_add')
    {
        return;
    }
    else{
    MovieServices.getMovieById(movieData.id).then( (res)=>{
        let existingMovieData= res.data;
        setMovieData({ title: existingMovieData.title,
          director: existingMovieData.director,
          producer: existingMovieData.producer,
          motionPictureRating: existingMovieData.motionPictureRating,
          movieDesc: existingMovieData.movieDesc,
          casts: [],
          genres: [],
          genreId: existingMovieData.genreId,
          runtime: existingMovieData.runtime,
          collection: existingMovieData.collection,
          language: existingMovieData.language,
          posterUrl: existingMovieData.posterUrl,
          releaseDate: existingMovieData.releaseDate})
    })
}
  }, [])

  const data = genresFromApi.map(genre => ({
    value: genre.genreId,
    label: genre.category
  }));

  const handleGenreChange = (selectedOptions) => {
    const selectedGenres = selectedOptions.map(option => option.value);
    setSelectedValue(selectedGenres);
    console.log(selectedValue);

    setMovieData((prevState) => ({
      ...prevState,
      genreId: selectedGenres
    }));

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCastChange = (index, field, value) => {
    const newCast = [...movieData.casts];
    newCast[index][field] = value;
    setMovieData((prevState) => ({
      ...prevState,
      casts: newCast,
    }));
  };
  const genreChange = (index, field, value) => {
    const newGenre = [...movieData.genres];
    newGenre[index][field] = value;
    setMovieData((prevState) => ({
      ...prevState,
      genres: newGenre,
    }));
  };

 
  const handleAddCast = () => {
    setMovieData((prevState) => ({
      ...prevState,
      casts: [...prevState.casts, { castName: "", castUrl: "", roleName: "" }],
    }));
  };

  const handleAddGenre = () => {
    setMovieData((prevState) => ({
      ...prevState,
      genres: [...prevState.genres, { category: ""}],
    }));
  };



  const handleRatingChange = (e) => {
    const selectedRating = e.target.value;
    setMovieData((prevState) => ({
      ...prevState,
      motionPictureRating: selectedRating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newMovie = {
      title: movieData.title,
      director: movieData.director,
      producer: movieData.producer,
      motionPictureRating: movieData.motionPictureRating,
      movieDesc: movieData.movieDesc,
      casts: movieData.casts,
      genres: movieData.genres,
      genreId: movieData.genreId,
      runtime: movieData.runtime,
      collection: movieData.collection,
      language: movieData.language,
      posterUrl: movieData.posterUrl,
      releaseDate: movieData.releaseDate
    }

    console.log('newMovie => ' + JSON.stringify(newMovie));
if(movieData.id==='_add'){
    MovieServices.createMovie(newMovie).then(res => {
      console.log(res.data)
      navigate('/')
    });
   
  }
  else{
    MovieServices.updateMovie(newMovie,id).then(res=>{
      console.log(res.data);
      navigate('/')
     })
     
  }
    setMovieData({
      title: "",
      director: "",
      producer: "",
      motionPictureRating: "",
      movieDesc: "",
      casts: [],
      genres: [],
      genreId: [],
      runtime: "",
      collection: "",
      language: "",
      posterUrl: "",
      releaseDate: "",
    });
   
  };

  return (
    <div className="bg-image">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h3 className="py-4 text-warning text-center">Add Movie Form</h3>
          <form>
            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  value={movieData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6">
                <label className="movieLabel">Director</label>
                <input
                  className="form-control"
                  type="text"
                  name="director"
                  value={movieData.director}
                  onChange={handleChange}
                />
              </div>
            </div>


            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Producer</label>
                <input
                  className="form-control"
                  type="text"
                  name="producer"
                  value={movieData.producer}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6">
                <label className="movieLabel">Image URL</label>
                <input
                  className="form-control"
                  type="url"
                  name="posterUrl"
                  value={movieData.imageURL}
                  onChange={handleChange}
                />
              </div>
            </div>


            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Release Date</label>
                <input
                  className="form-control"
                  type="date"
                  min="1990-01-01"
                  max="2023-06-23"
                  name="releaseDate"
                  value={movieData.releaseDate}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 p-3">
                <label className="movieLabel">Genre</label>
                {movieData.genres.map((genre, index) => (
                  <div key={index}>
                    <label className="movieLabel">Category</label>
                    <input
                      className="form-control"
                      type="text"
                      value={genre.category}
                      onChange={(e) =>
                        genreChange(index, "category", e.target.value)
                      }
                    />
                
                  </div>
                ))}
                <br />
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={handleAddGenre}
                >
                  Add Genre
                </button>
              </div>
              <div className="col-sm-6 p-3">
                <label className="movieLabel">Cast</label>
                {movieData.casts.map((castMember, index) => (
                  <div key={index}>
                    <label className="movieLabel">Star Name</label>
                    <input
                      className="form-control"
                      type="text"
                      value={castMember.castName}
                      onChange={(e) =>
                        handleCastChange(index, "castName", e.target.value)
                      }
                    />
                    <div>
                      <label className="movieLabel">Star Image URL</label>
                      <input
                        className="form-control"
                        type="text"
                        value={castMember.castUrl}
                        onChange={(e) =>
                          handleCastChange(index, "castUrl", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="movieLabel">Star Role</label>
                      <input
                        className="form-control"
                        type="text"
                        value={castMember.roleName}
                        onChange={(e) =>
                          handleCastChange(index, "roleName", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
                <br />
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={handleAddCast}
                >
                  Add Cast
                </button>
              </div>
             
              <div className="col-sm-6">
                <Select
                  className="dropdown"
                  placeholder="Select Genre"
                  value={data.filter(obj => selectedValue.includes(obj.value))} // set selected values
                  options={data} // set list of the data
                  onChange={handleGenreChange} // assign onChange function
                  isMulti
                  isClearable
                />
              </div>
            </div>


            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Plot Summary</label>
                <textarea
                  rows="3"
                  cols="3"
                  className="form-control"
                  name="movieDesc"
                  value={movieData.movieDesc}
                  onChange={handleChange}
                />
              </div>

            </div>
            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Rating</label>
                <select
                  className="form-control"
                  name="motionPictureRating"
                  value={movieData.motionPictureRating}
                  onChange={handleRatingChange}
                >
                  <option value="">Choose one</option>
                  <option value="PG">PG</option>
                  <option value="M">M</option>
                  <option value="E">E</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="movieLabel">Runtime</label>
                <input
                  className="form-control"
                  type="text"
                  name="runtime"
                  value={movieData.runtime}
                  onChange={handleChange}
                />
              </div>
            </div>


            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Language</label>
                <input
                  className="form-control"
                  type="text"
                  name="language"
                  value={movieData.language}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6">
                <label className="movieLabel">Box Office Collection</label>
                <input
                  className="form-control"
                  type="text"
                  name="collection"
                  value={movieData.collection}
                  onChange={handleChange}
                />
              </div>
            </div>


            <div className="col text-center m-4">
              <button
                className="btn btn-warning btn1"
                type="submit"
                onClick={handleSubmit}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;

