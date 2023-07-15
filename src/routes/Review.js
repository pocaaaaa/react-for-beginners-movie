import React, { useState } from "react";
import styles from "./Review.module.css";
import Nav from "../components/Nav";

const Review = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading? (
        <div className={styles.loader}>
          <img src={`${window.location.origin}/react-for-beginners-movie/icon/camera.gif`} alt="loading" className={styles.loading}/>
        </div>
      ) : (
        <div>
          <Nav />
          <div className={styles.reviews__nodata}>
            준비중입니다.
          </div>
        </div>
      )}
    </div>
  )
};

export default Review;