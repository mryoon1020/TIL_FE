import { useEffect } from 'react';
import {useParams} from "react-router-dom";
function Detail(){
    const {chili} = useParams();
    const getMovie = async () => {
        const json = await(
            await fetch (`https://yts.mx/api/v2/movie_details.json?movie_id=${chili}`)
            ).json();
            console.log(json);
    };

useEffect(()=>{
    getMovie();
}, []);
    return <h1>Detail</h1>
}
export default Detail;

/*
    <Route path="/movie/:chili">
        <Detail />
    </Route> 
    
    상기와 같을 때,

    const {chili} = useParams();
    console.log(chili);

    const x = useParams();
    console.log(x);

    둘다 가능
*/