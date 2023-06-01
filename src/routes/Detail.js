import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import styles from "./Detail.module.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Detail() {
  const location = useLocation();

  /* state */
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  /* function */
  const getMovie = async() => {
    const json = await (await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`
    )).json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  /* useEffect */
  useEffect(() => {
    getMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className={styles.loader}>
          <img src={`${window.location.origin}/react-for-beginners-movie/icon/camera.gif`} alt="loading" className={styles.loading}/>
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
            cast={movie.cast}
          />
          <div className={styles.btn__wrap}>
            <Link to={location.state && location.state.isFavPage ? "/fav" : "/"}>
              <button className={styles.btn}>목록</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;