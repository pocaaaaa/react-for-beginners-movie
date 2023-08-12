import React, { useState } from "react";
import styles from "./Review.module.css";
import Nav from "../components/Nav";
import Login from "../components/Login";
import styled from "@emotion/styled";

const Body = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

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
          {/* <div className={styles.reviews__nodata}>
            준비중입니다.
          </div> */}
          <Body>
            <Login />
          </Body>
        </div>
      )}
    </div>
  )
};

export default Review;