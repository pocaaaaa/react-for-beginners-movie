import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Fav.module.css";

function Fav() {
  /* state */
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  
  /* function */
  const getFav = async() => {
    let favList = localStorage.getItem('favList');
    favList = favList ? JSON.parse(favList) : []; 
    setMovies(favList);
    setLoading(false);
  };

  /* useEffect */
  useEffect(() => {
    getFav()
  }, [search]);

  // key는 React.js에서만 map안에서 component들을 render할 때 사용.
  return (
    <div className={styles.container}>
      {loading ? (
          <div className={styles.loader}>
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className={styles.moives__wrap}>
            <div className={styles.search}>
              <input className={styles.search__input} value={search} onChange={setSearch} type="text" placeholder="Search"/>
              <img className={styles.search__img} alt="search" src="../icon/search.png"/>
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
                        coverImg={movie.coverImg}
                        year={movie.year}
                        title={movie.title}
                        summary={movie.summary}
                        genres={movie.genres}

                      />
                    ))}
                  </div>
                </div>
              )
            }
          </div>
        )}
    </div>
  );
}

export default Fav;