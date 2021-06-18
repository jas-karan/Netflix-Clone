import React, { useState, useEffect } from 'react'
import axios from './axios'; // default export instance
import "./Row.css";
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

//base URL to fetch images (poster_path)
const baseurl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();

    }, [fetchUrl]);
    // [] means run once


    const opts = {
        height: "390",
        width: "100%",
        playvars: {
            autoplay: 1,
        },
    }

    const [trailerUrl, setTrailerUrl] = useState("");

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            /* returns trailer url from movie name if found */
            movieTrailer(movie?.name || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }).catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">
            {/* each row has title */}
            <h2>{title}</h2>

            {/*containers with posters */}
            <div className="row_posters">

                {movies.map((movie) => {
                    return <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${baseurl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name} />
                })}
            </div>

            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
