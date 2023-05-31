import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  /* state */
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [moviesCount, setMoviesCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("");
  
  /* function */
  const getMovies = async() => {
    const json = await (await fetch(
      `https://yts.mx/api/v2/list_movies.json?sort_by=year&order_by=desc&page=${page}&query_term=${search}`
    )).json();
    const count = json.data.movie_count;
    if(count > 0) {
      if(searchType === "P") setMovies([...movies, ...json.data.movies]);
      else setMovies([...json.data.movies]);
    } else {
      setMovies([]);
    }
    setMoviesCount(count);
    setLoading(false);
  };
  const moreMovies = () => {
    setPage(curr => curr + 1)
    setSearchType("P");
  };
  const searchMovies = () => {
    setSearch(searchValue);
    setSearchType("S");
    setPage(1);
    setLoading(true);
  };
  const searchOnChange = (event) => setSearchValue(event.target.value);
  const handleKeyDown = (event) => event.keyCode === 13 ? searchMovies() : null;

  /* useEffect */
  useEffect(() => {
    getMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  // key는 React.js에서만 map안에서 component들을 render할 때 사용.
  return (
    <div className={styles.container}>
      {loading ? (
          <div className={styles.loader}>
            <img src="/icon/camera.gif" alt="loading" className={styles.loading}/>
          </div>
        ) : (
          <div className={styles.moives__wrap}>
            <div className={styles.search}>
              <input className={styles.search__input} onChange={searchOnChange} onKeyDown={handleKeyDown} value={searchValue} type="text" placeholder="Search"/>
              <img onClick={searchMovies} className={styles.search__img} alt="search" src="./icon/search.png"/>
              <Link to="/fav"><img className={styles.fav__home} alt="fav" src="/icon/fav.png" /></Link>
            </div>
            {movies.length === 0 ? (
                <div className={styles.movies__nodata}>
                ❌ No matching search results found.
                </div>
              ) : (
                <div>
                  <div className={styles.movies}>
                    {movies.map((movie, index) => (
                      <Movie
                        key={index}
                        id={movie.id}
                        coverImg={movie.medium_cover_image}
                        year={movie.year}
                        title={movie.title}
                        summary={movie.summary}
                        genres={movie.genres}
                      />
                    ))}
                  </div>
                  {moviesCount - (page * 20) > 20 ? (
                    <div className={styles.btn__wrap}>
                      <button onClick={moreMovies} className={styles.btn}>
                        더보기 ({page})
                      </button>
                    </div>
                  ) : null}
                </div>
              )
            }
          </div>
        )}
    </div>
  );
}

export default Home;