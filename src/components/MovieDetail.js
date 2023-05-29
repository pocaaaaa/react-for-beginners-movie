import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./MovieDetail.module.css";
import { useEffect, useState } from "react";
import SmilarMovie from "./SimilarMovie";

function MovieDetail({id, coverImg, title, runtime, description, genres, rating}) {
  const [smilarMovies, setSmilarMovies] = useState([]);
  const [smilarIsShow, setSmilarIsShow] = useState(false);
  const getSmilarMovies = async() => {
    const json = await (await fetch(
      `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`
    )).json();
    if(json.data.movie_count === 0) return;
    setSmilarMovies(json.data.movies);
    setSmilarIsShow(true);
  };
  useEffect(() => {
    getSmilarMovies(smilarMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div>
      <div className={styles.movie}>
        <img src={coverImg} alt={title} className={styles.movie__img}/>
        <div>
          <h2 className={styles.movie__title}>{title}</h2>
          <h3 className={styles.movie__runtime}>
            {runtime} Minutes
            <div className={styles.star__ratings}>
              <div className={`${styles.star__ratings__fill} ${styles.space__x__2}`} style={{width: `${rating * 10}%`}}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div className={`${styles.star__ratings__base} ${styles.space__x__2}`}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </h3>
          <p>{description}</p>
          {genres ? (
            <ul>
              {genres.map((g, index) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          ) : null}
          {smilarIsShow ? (
            <div className={styles.sugg__warp}>
              <hr/>
              <h3 className={styles.sugg__header}>🎬 Similar Movies</h3>
              {smilarMovies.map(movie => (
                <SmilarMovie 
                  id={movie.id}
                  coverImg={movie.medium_cover_image}
                  title={movie.title}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.btn__wrap}>
        <Link to="/">
          <button className={styles.btn}>목록</button>
        </Link>
      </div>
    </div>
  );
}

MovieDetail.prototype = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default MovieDetail;