import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav({search, onChangeSearch, onKeyDownSearch, searchMovies}) {
  const pathname = window.location.pathname.replaceAll('/react-for-beginners-movie', '');

  return (
    <div className={styles.search}>
      <input 
        className={styles.search__input} 
        value={search} 
        onChange={onChangeSearch} 
        type="text" 
        placeholder="Search"
        onKeyDown={onKeyDownSearch ? onKeyDownSearch : () => {}}
      />
      { (pathname === "/") ? (
        <img onClick={searchMovies} className={styles.search__img} alt="search" src={`${window.location.origin}/react-for-beginners-movie/icon/search.png`} />
        ) : null }
      <Link to="/"><img className={styles.home} alt="fav" src={`${window.location.origin}/react-for-beginners-movie/icon/home.png`} /></Link>
      <Link to="/fav"><img className={styles.fav__home} alt="fav" src={`${window.location.origin}/react-for-beginners-movie/icon/fav.png`} /></Link>
    </div>
  );
}

export default Nav;