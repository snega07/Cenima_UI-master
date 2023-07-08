import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/home';
import Login from './components/Cred/Login';
import Signup from './components/Cred/signup';
import MovieForm from './components/Form/MovieForm';
import MovieDetailPage from './components/MovieDetail/MovieDetailPage';
import SearchResult from './searchresult/SearchResult';
import Navbar from './components/Header/navbar';
import Footer from './components/Footer/footer';

function App() {
  return (
    <div>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addmovie/:id" element={<MovieForm />} />
      <Route path="/view-movie/:id" element={<MovieDetailPage/>} />
      <Route path="/view-search-result/:search" element={<SearchResult/>} />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
