import React from "react";
import styles from "./StarRating.module.css";

// 출처 : melthleeth님의 블로그 (https://melthleeth.tistory.com/entry/HTML-CSS%EB%A1%9C-%EB%B3%84%EC%B0%8D%EA%B8%B0-Star-Rating) 를
// 인용해서 만들었습니다.
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