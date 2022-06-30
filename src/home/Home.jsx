import React, { useEffect, useState } from 'react'
import { server } from "../imports"
import { MovieCard } from "../imports"
import searchIcon from "../assets/search.svg"
import "./home.css";
export default function Home() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const searchMovies = async (title) => {
        try {
            await fetch(`${server.SERVER_URL}&s=${title}`).then(async (response) => {
                const data = await response.json();
                setMovies(data.Search);
                console.log(movies);

            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        searchMovies("spiderman");
    }, []);
    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input type="search" value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder='Search for movies' />
                <img src={searchIcon} alt={searchIcon} onClick={() => { searchMovies(search) }} />
            </div>
            {
                movies?.length > 0
                    ? (<div className="container">
                        {
                            movies.map((el) => {
                                return <MovieCard movie={el} />
                            })
                        }
                    </div>) :
                    (
                        <div className='empty'>
                            <h2>No movies found!!!</h2>
                        </div>
                    )
            }

        </div>
    )
}
