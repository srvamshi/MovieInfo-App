import React, {useEffect, useState} from 'react';
import Card from './Card';

let API_key = "&api_key=87bf37cf491328bf28f47fcdc880ddb5";
let base_url = "https://api.themoviedb.org/3";
let url = base_url+"/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"+API_key
let arr = ["Popular", "Top Rated", "Now Playing", "Upcoming"]

const Main = () => {

    const [movieData, setData] = useState([]);
    const [url_set, setUrl] = useState(url);
    const [search, setSearch] = useState();

    useEffect(() => {
        fetch(url_set).then(res=>res.json()).then(data => {
            // console.log(data.results);
            setData(data.results)
        });
    }, [url_set])

    const getData = ((movieType) => {
        if(movieType == "Popular"){
            url = ""; 
            setData([]);
            // url = base_url+"/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"+API_key;
        }
        if(movieType == "Top Rated"){
            url = base_url+"/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200"+API_key;
        }
        if(movieType == "Now Playing"){
            url = base_url+"/movie/now_playing?language=en-US"+API_key;
        }
        if(movieType == "Upcoming"){
            url = base_url+"/movie/upcoming?language=en-US"+API_key;
        }
        setUrl(url);
    })

    const searchMovie = (e) => {
        if(e.key=="Enter"){
            url = base_url+"/search/movie?query="+search+API_key;
        }
        setUrl(url);
        // setSearch(" ");
    }

    return (
        <>
            <div className='header'>
                <nav>
                    <ul>
                        {
                            arr.map((value) => {
                                return(
                                    <li><a href="#" name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                )
                            })
                        }
                    </ul>
                </nav>

                <form>
                    <div className='search-btn'>
                        <input type="text" placeholder='Search' className='inputText' onChange={(e)=>{setSearch(e.target.value)}} value={search} onKeyPress={searchMovie}>
                        </input>
                        {/* <i class="fa-brands fa-searchengin"></i> */}
                        
                        <button><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </form>
            </div>

            <div className='container'>
                {
                    (movieData.length == 0) ? <p className='notfound'>Data Not found</p> : movieData.map((res, pos) => {
                        return(
                            <Card info = {res} key = {pos}/>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Main;
