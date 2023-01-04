import{
  BrowserRouter as Router,
  Route,
  Switch,
}from "react-router-dom";

import Home from"./routes/Home";
import Detail from"./routes/Detail";

function App() {
  return <Router>
    <Switch>
      <Route path ="/hello">
        <h1>Hello World!!</h1>
      </Route>
      <Route path="/movie/:chili">
        <Detail />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    </Router>;
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

이후 수정 코드는 모두 Home.js 로 이동
react에서 페이지 이동을 위한 기능인 router를 사용하기 위함

router는 페이지 전체 로딩없이 다른페이지로 이동처리해줌
router 사용법은 아주 간단함
return 안에 하기와 같은 형식으로 추가해주면됨.
<Router>
    <Switch>

      <Route path ="/hello">
        <h1>Hello World!!</h1>
      </Route>

      <Route path="/movie">
        <Detail />
      </Route>

      <Route path="/">
        <Home />
      </Route>

      </Switch>
</Router>;

/movie/:chili 는 chili 라는 이름으로 변수를 받아 오겠다는 뜻(:는 필수, 없으면 주소가 그냥 단순 주소명임)
실제 변수를 console창에 출력해보면
{chili: '47943'} 이렇게 변수명과 변수 값이 출력됨

변수를 출력해주는 router내부 함수는
import {useParams} from "react-router-dom"; 작성 후
const x = useParams(); 이런식으로 사용해줄수 있음
const {chili} = useParams(); 도 가능 (단, 주소의 변수명과 일치해야함)
*/