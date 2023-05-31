import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Fav.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Fav() {
  /* state */
  const [loading, setLoading] = useState(true);
  const [favList, setFavList] = useState([]);
  const [search, setSearch] = useState("");
  
  /* function */
  const getFav = async() => {
    let favList = localStorage.getItem('favList');
    favList = favList ? JSON.parse(favList) : []; 
    setFavList(favList);
    setLoading(false);
  };

  /* useEffect */
  useEffect(() => {
    getFav();
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
              <Link to="/"><img className={styles.home} alt="fav" src="../icon/home.png" /></Link>
            </div>
            {favList.length === 0 ? (
                <div className={styles.movies__nodata}>
                🙏 Please make a favorite.
                </div>
              ) : (
                <div>
                  <div className={styles.movies}>
                    {favList.map((movie, index) => (
                      <Movie
                        key={index}
                        id={movie.id}
                        coverImg={movie.coverImg}
                        year={movie.year}
                        title={movie.title}
                        summary={movie.summary}
                        genres={movie.genres}
                        isFavPage={true}
                        setFavList={setFavList}
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