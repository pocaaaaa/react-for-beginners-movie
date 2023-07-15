import React, { useRef, useState } from "react";
import styles from "./ReviewModal.module.css";
import StarRating from "./StarRating";

const ReviewModal = ({ onClose, id, title, coverImg, year }) => {
  /* state */
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [review, setReview] = useState("");
  const [date, setDate] = useState("");
  const [rating, setRating] = useState("");

  /* ref */
  const userIdRef = useRef();
  const passwordRef = useRef();
  const reviewRef = useRef();
  const dateRef = useRef();
  const ratingRef = useRef();

  /* function */
  const handleImgError = (event) => {
    event.target.src = `${window.location.origin}/react-for-beginners-movie/icon/movie.png`;
  };

  const handleIdChange = (event) => {
    const value = event.target.value.replace(/[^0-9A-Za-z~!@#$%^&*()_+|<>?:{}.]/ig, '');
    setUserId(value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if(!isValid()) return false;

    // 1. 사용자 조회 (존재하지 않으면 추가)
    let userList = localStorage.getItem('userList');
    userList = userList ? JSON.parse(userList) : [];
    userList = userList.filter(user => user?.id === userId && user?.password === password);
    
    let userInfo;
    if(userList && userList.length > 0) {
      userInfo = userList[0]; 
    } else {
      userInfo = {id: userId, password: password, key: getUserKey()};
      localStorage.setItem('userList', JSON.stringify([...userList, userInfo]));
    }

    // 2. 리뷰 추가
    let reviewList = localStorage.getItem('reviewList');
    reviewList = reviewList ? JSON.parse(reviewList) : [];
    const addReviewItem = setReviewData(userInfo?.key);
    const newReviewList = [...reviewList, addReviewItem];
    localStorage.setItem('reviewList', JSON.stringify(newReviewList));

    // 3. 팝업 닫기
    alert("You have registered.");
    onClose();
  };

  const isValid = () => {
    if(!userId) {
      alert("Please enter your ID (email format).");
      userIdRef.current.focus();
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(userId)) {
      alert("This is not a valid ID format. Please make sure it's in email format.");
      userIdRef.current.focus();
      return false;
    }

    if(!password) {
      alert("Please enter your password.");
      passwordRef.current.focus();
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    if(!passwordRegex.test(password)) {
      alert("Please enter 8 to 16 characters, including English, numbers, and special characters.");
      passwordRef.current.focus();
      return false;
    }

    if(!date) {
      alert("Please enter a date.");
      dateRef.current.focus();
      return false;
    }

    if(review.length < 50) {
      alert("Review is at least 50 characters.");
      reviewRef.current.focus();
      return false;
    }

    if(!rating) {
      alert("Please select it star rating.");
      ratingRef.current.focus();
      return false;
    }
    
    return true;
  };

  const setReviewData = (userKey) => {
    return {
      movieInfo: {
        id: id,
        title: title,
        coverImg: coverImg, 
        year: year
      },
      userKey: userKey,
      review: review,
      date: date,
      rating: rating
    }
  };

  const getUserKey = () => {
    const date = new Date();
    const year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();
    let day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();
    let hour = date.getHours();
    hour = hour < 10 ? '0' + hour.toString() : hour.toString();
    let minites = date.getMinutes();
    minites = minites < 10 ? '0' + minites.toString() : minites.toString();
    let seconds = date.getSeconds();
    seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();
    return userId + '__' + year + month + day + hour + minites + seconds;
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <div className={styles.review__header}>
          <div className={styles.review__image__wrap}>
            <img 
              src={!coverImg ? `${window.location.origin}/react-for-beginners-movie/icon/movie.png` : coverImg} 
              alt={title}
              onError={handleImgError}
              className={styles.review__image}
            />
          </div>
          <div>
            <h2>{title}{`${year ? ' ('+year+')' : ''}`}</h2>
            <div className={styles.input__container}>
              <label htmlFor="id">ID (Email format)</label>
              <input
                type="email"
                id="userId"
                value={userId}
                onChange={handleIdChange}
                required
                style={{ width: "70%" }}
                ref={userIdRef}
              />
            </div>
            <div className={styles.input__container}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
                style={{ width: "70%" }}
                ref={passwordRef}
              />
            </div>
            <div className={styles.input__container}>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={handleDateChange}
                required
                style={{ width: "70%" }}
                ref={dateRef}
              />
            </div>
          </div>
        </div>
        <div className={styles.input__container}>
          <label htmlFor="review">Review (Characters: {review.length})</label>
          <textarea
            id="review"
            value={review}
            onChange={handleReviewChange}
            required
            rows={8}
            ref={reviewRef}
          />
        </div>
        <div className={styles.input__container}>
          <label ref={ratingRef}>Star Rating</label>
          <StarRating starClick={handleRatingChange} />
        </div>
        <button type="submit" onClick={onSubmit} className={styles.btn__register}>
          Register
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;