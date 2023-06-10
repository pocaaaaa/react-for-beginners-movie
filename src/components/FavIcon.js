import styles from "./FavIcon.module.css";

const FavIcon = ({favClick, isFav}) => {
    return (
        <div className={styles.fav}>
            <div className={`${styles.fav__fill__base} ${isFav ? styles.fav__fill : ''}`}>
                <span onClick={favClick}>❤</span>
            </div>
            <div className={styles.fav__base}>
                <span>❤</span>
            </div>
        </div>
    );
};

export default FavIcon;