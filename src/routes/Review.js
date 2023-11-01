import React, { useState } from "react";
import styles from "./Review.module.css";
import Nav from "../components/Nav";
import Login from "../components/Login";
import ReviewDetail from "../components/ReviewDetail";
import styled from "@emotion/styled";

const LoginBody = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const ReviewBody = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
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
          {/* <LoginBody>
            <Login />
          </LoginBody> */}
          <ReviewBody>
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
          </ReviewBody>
        </div>
      )}
    </div>
  )
};

export default Review;