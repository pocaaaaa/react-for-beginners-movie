import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";
import { useEffect, useState } from "react";
import FavIcon from "./FavIcon";
import ReviewModal from "./ReviewModal";

function Movie({id, coverImg, title, year, summary, genres, isFavPage, setFavList}) {
  const pathname = window.location.pathname.replaceAll('/react-for-beginners-movie', '');

  /* state */
  const [isFav, setIsFav] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  /* function */
  const handleImgError = (event) => {
    event.target.src = `${window.location.origin}/react-for-beginners-movie/icon/movie.png`;
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
    if(setFavList) {
      setFavList(favList);
    }
  }
  const favClick = () => {
    setIsFav((curr) => {
      (curr) ? removeFavList() : addFavList();
      return !curr;  
    });
  };
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  
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
        src={!coverImg ? `${window.location.origin}/react-for-beginners-movie/icon/movie.png` : coverImg} 
        alt={title} 
        className={styles.movie__img}
        onError={handleImgError} />
      <div>
        {pathname === "/" ? (
          <FavIcon 
            favClick={favClick} 
            isFav={isFav}
          />
        ) : null}
        <h2 className={styles.movie__title}>
          <Link to={{pathname: `/movie/${id}`, state: {isFavPage: isFavPage}}}>
            {title}
          </Link>
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
        {pathname === "/fav" ? (
            <FavIcon 
              favClick={favClick} 
              isFav={isFav}
            />
          ) : null}
        {pathname === "/" ? (
          <div className={styles.review}>
            <button className={styles.review__button} onClick={handleModalOpen}>등록</button>
            {modalOpen && (
              <ReviewModal 
                onClose={handleModalClose}
                id={id}
                title={title}
                coverImg={coverImg}
                year={year}
              />
            )}
          </div>
        ) : null}
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