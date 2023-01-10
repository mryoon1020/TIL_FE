import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

function Movie({id, coverImg, title, summary, genres}){
    return (

        <div>
        <img src={coverImg} alt={title}/>
            <h2>
                <Link to={`/movie/${id}`}>{title}</Link>
            </h2>
        <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
        <ul>
        {genres.map((g) => (
        <li key={g}>{g}</li>
        ))}
        </ul>
        </div>

    )
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;

/*
react-router 설치
npm install react-router-dom

router는 react에서 페이지 전환을 해주게 해주는 도구임
ex)
http://localhost:3000/ => http://localhost:3000/movie/1232
*/