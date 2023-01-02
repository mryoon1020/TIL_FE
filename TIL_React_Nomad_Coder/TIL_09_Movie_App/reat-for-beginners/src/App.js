import { useEffect, useState } from 'react';
import Movie from './components/Movie';

function App() {
  return null;
}

export default App;

/*
.then() 사용코드
  useEffect(() => {
    fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year')
    .then((response) => response.json())
    .then((json) => {
      setMovies(json.data.movies)
      setrLoading(false);
    });
  }, []);

.then() 보다 더 많이 쓰이는것

  const getMovies = async() => {
    const response = await fetch(
      'https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year'
      );
      const json = await response.json();
      setMovies(json.data.movies)
      setrLoading(false);
  };

  좀더 축약형

const getMovies = async() => {
    const json = await (
      await fetch(
      'https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year'
      )
    ).json();
      setMovies(json.data.movies);
      setrLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  ---1차 코딩

  function App() {
  const[loading, setrLoading]=useState(true);
  const[movies, setMovies] = useState([])
  const getMovies = async() => {
    const json = await (
      await fetch(
      'https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year'
      )
    ).json();
      setMovies(json.data.movies);
      setrLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  return (
    <div>
      {loading ? <h1>Lodaing...</h1> : <div>{movies.map(movie => (      
      <div key={movie.id}>
        <img src={movie.medium_cover_image}/>
        <h2>{movie.title}</h2>
        <p>{movie.summary}</p>
        <ul>
          {movie.genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        </div>
        ))}
        </div>}
    </div>
  );
}
*/