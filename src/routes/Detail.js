import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import styles from "./Detail.module.css";

function Detail() {
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const getMovie = async() => {
    const json = await (await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    )).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div>
      {loading ? (
        <div className={styles.loader}>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div 
          className={styles.movies} 
          style={{backgroundImage: `url(${movie.background_image_original})`}}>
          <MovieDetail
            id={id}
            coverImg={movie.medium_cover_image}
            runtime={movie.runtime}
            title={movie.title_long}
            description={movie.description_full}
            genres={movie.genres}
            rating={movie.rating}
          />
        </div>
      )}
    </div>
  );
}

export default Detail;