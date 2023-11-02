import React, { useState, useEffect } from "react";
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
  display: grid;
  grid-template-columns: repeat(2, minmax(400px, 1fr));
  grid-gap: 40px;
  padding: 15px 50px 0px 50px;
`;

const Review = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userKey, setUserKey] = useState("");

  /* function */
  const getCookie = (name) => {
    const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
  };

  /* useEffect */
  useEffect(() => {
    if(!userKey && getCookie("userKey")) {
      setIsLogin(true);
      setUserKey(getCookie("userKey"));
    }
  }, [isLogin])

  return (
    <div>
      {loading? (
        <div className={styles.loader}>
          <img src={`${window.location.origin}/react-for-beginners-movie/icon/camera.gif`} alt="loading" className={styles.loading}/>
        </div>
      ) : (
        <div>
          <Nav />
          {isLogin? (
            <ReviewBody>
              <ReviewDetail />
              <ReviewDetail />
              <ReviewDetail />
              <ReviewDetail />
              <ReviewDetail />
            </ReviewBody>
          ) : (
            <LoginBody>
              <Login 
                setIsLogin={setIsLogin} 
                setUserKey={setUserKey}
              />
            </LoginBody>
          )}
        </div>
      )}
    </div>
  )
};

export default Review;