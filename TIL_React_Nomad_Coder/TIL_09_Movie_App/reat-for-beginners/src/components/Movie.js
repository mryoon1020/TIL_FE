import PropTypes from "prop-types";

function Movie({coverImg, title, summary, genres}){
    return (

        <div>
        <img src={coverImg} alt={title}/>
        <h2>{title}</h2>
        <p>{summary}</p>
        <ul>
        {genres.map((g) => (
        <li key={g}>{g}</li>
        ))}
        </ul>
        </div>

    )
}

Movie.propTypes = {
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