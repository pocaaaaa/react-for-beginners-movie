import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./MovieDetail.module.css";
import { useEffect, useState } from "react";
import SmilarMovie from "./SimilarMovie";
import Cast from "./Cast";

function MovieDetail({id, coverImg, title, runtime, description, genres, rating, cast}) {
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
          {cast.length > 0 ? (
              <div className={styles.cast__warp}>
                <h3 className={styles.cast__header}>📌 Top cast</h3>
                <div className={styles.cast__flex__container}>
                  {cast.map(c => (
                    <Cast 
                      key={c.imdb_code}
                      characterName={c.character_name}
                      name={c.name}
                      urlSmallImg={c.url_small_image}
                    />
                  ))}
                </div>
              </div>
            ) : null
          }
          {smilarIsShow ? (
            <div className={styles.sugg__warp}>
              <h3 className={styles.sugg__header}>🎬 Similar Movies</h3>
              {smilarMovies.map(movie => (
                <SmilarMovie 
                  key={movie.id}
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
  runtime: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  rating: PropTypes.number.isRequired,
  cast: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MovieDetail;