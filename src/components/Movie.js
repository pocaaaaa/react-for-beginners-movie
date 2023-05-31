import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";
import { useEffect, useState } from "react";

function Movie({id, coverImg, title, year, summary, genres, isFavPage, setFavList}) {
  /* state */
  const [isFav, setIsFav] = useState(false);
  
  /* function */
  const handleImgError = (event) => {
    event.target.src = './icon/movie.png';
  };
  const addFavList =  () => {
    let favList = localStorage.getItem('favList');
    favList = favList ? JSON.parse(favList) : [];
    const addFavItem = {id, coverImg, title, year, summary, genres};
    const newFavList = [...favList, addFavItem];
    localStorage.setItem('favList', JSON.stringify(newFavList));
  }
  const removeFavList = () => {
    let favList = localStorage.getItem('favList');
    favList = favList ? JSON.parse(favList).filter(item => item.id !== id) : [];
    localStorage.setItem('favList', JSON.stringify([...favList]));
    setFavList(favList);
  }
  const favClick = () => {
    setIsFav((curr) => {
      (curr) ? removeFavList() : addFavList();
      return !curr;  
    });
  };
  
  /* useEffect */
  useEffect(() => {
    let favList = localStorage.getItem('favList');
    favList = favList ? JSON.parse(favList).filter(item => item.id === id) : [];
    if(favList.length > 0) setIsFav(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFav]);

  return (
    <div className={`${styles.movie} ${isFavPage ? '' : styles.movie__main__temp}`}>
      <img 
        src={!coverImg ? './icon/movie.png' : coverImg} 
        alt={title} 
        className={styles.movie__img}
        onError={handleImgError} />
      <div>
        <h2 className={styles.movie__title}>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <h3 className={styles.movie__year}>{year}</h3>
        <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
        {genres ? (
          <ul className={styles.movie__genres}>
            {genres.map((g, index) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        ) : null}
      </div>
      <div></div>
      <div>
        <div className={styles.fav}>
          <div className={`${styles.fav__fill__base} ${isFav ? styles.fav__fill : ''}`}>
            <span onClick={favClick}>❤</span>
          </div>
          <div className={styles.fav__base}>
            <span>❤</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Movie.prototype = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie;