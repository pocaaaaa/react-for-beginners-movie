import { Link } from "react-router-dom";
import styles from "./SimilarMovie.module.css";
import PropTypes from "prop-types";

const SmilarMovie = ({id, coverImg, title}) => {
  return (
      <Link to={`/movie/${id}`}>
        <img 
          key={id} 
          src={coverImg} 
          alt={title} 
          className={styles.movie__sugg__img}
        />
      </Link>
  );
};

SmilarMovie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default SmilarMovie;