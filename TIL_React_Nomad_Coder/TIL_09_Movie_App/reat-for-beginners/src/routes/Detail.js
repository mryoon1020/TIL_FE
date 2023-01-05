import { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
function Detail(){
    const [detailLoading, setrDetailLoading] = useState(true);
    const [detail, setDetail] = useState([]);
    const {chili} = useParams();
    const getMovie = async () => {
        const json = await(
            await fetch (`https://yts.mx/api/v2/movie_details.json?movie_id=${chili}`)
            ).json();
            setDetail(json.data.movie);
            setrDetailLoading(false);
    }
useEffect(()=>{
    getMovie();
}, []);
    return (
        <div>
        {detailLoading ? (<h1>Loading...</h1>) : (
            <div>
                {detail.genre}
                {console.log(detail)}
            </div>
        )}
        </div>
    );
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