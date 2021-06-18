import React, { useState, useEffect } from 'react'
import axios from './axios'; // from our axios, not library
import requests from './requests';
import './Banner.css'

const baseurl = "https://image.tmdb.org/t/p/original/";

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            // basically for banner, select a random from netflix original
            return request;
        }

        fetchData();

    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(${baseurl}${movie?.backdrop_path})`,
                backgroundPosition: "center center"
            }}
        >  {/* << background image to this header */}
            <div className="banner_contents">
                {/*title ,note- some movies have name,some have original,,, handled those*/}
                <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>

                {/*div > 2 buttons*/}
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">List</button>
                </div>

                {/*description */}
                <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
            </div>

            {/*----just empty div-- handling header fading from bottom */}
            <div className="banner--fadeBottom" />
            {/* this div is at end of header and not whole page*/}
        </header>
    )
}

export default Banner
