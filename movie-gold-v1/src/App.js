import './App.css';
import api from './api/axiosconfig';
import {useState, useEffect} from 'react';
import Layout from './component/Layout';
import { Routes,Route } from 'react-router-dom';
import Home from './component/home/Home';
import Header from './component/header/Header';
import Trailer from './component/tailer/Trailer';
import Reviews from './component/reviews/Reviews';
import NotFound from './component/notFound/NotFound';
function App() {
  const [movies,setMovies]=useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const getMovies= async()=>{
    try{
      const response=await api.get("api/v1/movies");
    setMovies(response.data);
  }
    catch(err){
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
    try 
    {
        const response = await api.get(`/api/v1/movies/${movieId}`);
        const singleMovie = response.data;
        setMovie(singleMovie);
        setReviews(singleMovie.reviewIds);
    } 
    catch (error) 
    {
      console.error(error);
    }
  }

  useEffect(()=>{
    getMovies();
  },[])

  return (
    <div className="App">
      <Header />
    <Routes>
       <Route path='/' element={<Layout movies={movies}/>}> 
         <Route path='/' element={<Home movies={movies}/>}/>
         <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
         <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
         <Route path="*" element = {<NotFound/>}></Route>
       </Route> 
      </Routes>

    </div>
  );
}

export default App;
