import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const getMovies = async() => {
    const json = await (await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=5&sort_by=year&order_by=desc&page=${page}`
    )).json();
    setMovies([...movies, ...json.data.movies]);
    setLoading(false);
  };
  const moreMovies = () => setPage(curr => curr + 1);
  useEffect(() => {
    getMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // key는 React.js에서만 map안에서 component들을 render할 때 사용.
  return (
    <div className={styles.container}>
      {loading ? (
          <div className={styles.loader}>
            <h1>Loading...</h1>
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
            <div className={styles.btn__wrap}>
              <button onClick={moreMovies} className={styles.btn}>
                더보기 ({page})
              </button>
            </div>
          </div>
        )}
    </div>
  );
}

export default Home;