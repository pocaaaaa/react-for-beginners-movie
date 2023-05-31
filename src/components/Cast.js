import PropTypes from "prop-types";
import styles from "./Cast.module.css";

function Cast({characterName, name, urlSmallImg}) {
    /* function */
    const handleImgError = (event) => {
        event.target.src = '/../icon/user.png';
    };
    
    return (
        <div className={styles.flex__item}>
            <div className={styles.box}>
                <img 
                    src={!urlSmallImg ? '/../icon/user.png' : urlSmallImg} 
                    alt={characterName} 
                    className={styles.profile} 
                    onError={handleImgError}
                />
            </div>
            <div className={styles.name}>
                <span className={styles.text__1}>{name}</span>
                <span className={styles.text__2}> as </span>
                <span className={styles.text__3}>{characterName}</span>
            </div>
        </div>
    )
}

Cast.propTypes = {
    characterName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    urlSmallImg: PropTypes.string.isRequired
};

export default Cast;