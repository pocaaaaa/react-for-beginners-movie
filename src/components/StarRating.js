import React from "react";
import styles from "./StarRating.module.css";

const StarRating = ({starClick}) => {
  return (
    <div className={styles.star__rating}>
      <input
        type="radio"
        id="5-stars"
        name="rating"
        value="5"
        v-model="ratings"
        onClick={starClick}
      />
      <label htmlFor="5-stars">
        ★
      </label>
      <input
        type="radio"
        id="4-stars"
        name="rating"
        value="4"
        v-model="ratings"
        onClick={starClick}
      />
      <label htmlFor="4-stars">
        ★
      </label>
      <input
        type="radio"
        id="3-stars"
        name="rating"
        value="3"
        v-model="ratings"
        onClick={starClick}
      />
      <label htmlFor="3-stars">
        ★
      </label>
      <input
        type="radio"
        id="2-stars"
        name="rating"
        value="2"
        v-model="ratings"
        onClick={starClick}
      />
      <label htmlFor="2-stars">
        ★
      </label>
      <input
        type="radio"
        id="1-star"
        name="rating"
        value="1"
        v-model="ratings"
        onClick={starClick}
      />
      <label htmlFor="1-star">
        ★
      </label>
    </div>
  );
}

export default StarRating; 