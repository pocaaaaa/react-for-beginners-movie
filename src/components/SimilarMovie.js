import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./SimilarMovie.module.css";
import PropTypes from "prop-types";

function SmilarMovie({id, coverImg, title}) {
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